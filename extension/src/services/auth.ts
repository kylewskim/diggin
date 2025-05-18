import { 
  GoogleAuthProvider, 
  signInWithCredential,
  signOut as firebaseSignOut,
  onAuthStateChanged, 
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@shared/firebase';

// Firebase web client ID
const WEB_CLIENT_ID = "492982442570-28e3lccep11l5a37ib4e8g2t2pnjcf2l.apps.googleusercontent.com";

// Type check functions
const isChromeAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.chrome;
};

const isChromeStorageAvailable = (): boolean => {
  return isChromeAvailable() && !!window.chrome?.storage && !!window.chrome?.storage?.local;
};

const isChromeIdentityAvailable = (): boolean => {
  return isChromeAvailable() && !!window.chrome?.identity;
};

const isChromeRuntimeAvailable = (): boolean => {
  return isChromeAvailable() && !!window.chrome?.runtime;
};

/**
 * Google 로그인 후 Firebase에 인증
 */
export const signInWithGoogle = async () => {
  try {
    console.log("Starting Google sign-in with web auth flow");
    
    if (!isChromeIdentityAvailable() || !isChromeRuntimeAvailable()) {
      throw new Error("Chrome identity 또는 runtime API를 사용할 수 없습니다.");
    }
    
    // Google OAuth URL 생성
    const authURL = new URL("https://accounts.google.com/o/oauth2/auth");
    authURL.searchParams.append("client_id", WEB_CLIENT_ID);
    authURL.searchParams.append("response_type", "token id_token");
    authURL.searchParams.append("redirect_uri", `https://${chrome.runtime.id}.chromiumapp.org/`);
    authURL.searchParams.append("scope", "email profile openid");
    
    // Chrome launchWebAuthFlow 사용
    const responseUrl = await new Promise<string>((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        { url: authURL.toString(), interactive: true },
        (responseUrl) => {
          if (chrome.runtime.lastError) {
            console.error('Identity API error:', chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
            return;
          }
          
          if (!responseUrl) {
            reject(new Error('인증 응답을 받지 못했습니다.'));
            return;
          }
          
          resolve(responseUrl);
        }
      );
    });
    
    // URL에서 id_token 추출
    const url = new URL(responseUrl);
    const params = new URLSearchParams(url.hash.substring(1));
    const idToken = params.get("id_token");
    
    if (!idToken) {
      throw new Error("ID 토큰을 찾을 수 없습니다.");
    }
    
    console.log("Got id_token from Google Auth");
    
    // ID 토큰으로 Firebase 인증
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    
    console.log("Firebase authentication successful");
    
    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp(),
    }, { merge: true });
    
    console.log("User document updated in Firestore");
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

/**
 * 로그아웃
 */
export const signOut = async () => {
  try {
    // 백그라운드 스크립트에 로그아웃 알림
    if (isChromeRuntimeAvailable()) {
      await window.chrome?.storage?.local.remove(['userToken', 'userInfo']);
    }
    
    // Firebase 로그아웃
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Firestore에서 사용자 데이터 가져오기
 */
export const getCurrentUserData = async (user: User) => {
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No user data found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

/**
 * 인증 상태 변경 감지
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  // Firebase 인증 상태 변경 리스너 설정
  return onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed:", user ? "User logged in" : "No user");
    callback(user);
  });
};

/**
 * Try to sign in with the remembered user session
 */
const restoreUserSession = async (savedUser: any) => {
  if (!isChromeIdentityAvailable() || !isChromeRuntimeAvailable()) {
    console.warn("Chrome APIs not available, can't restore session");
    return;
  }

  try {
    console.log("Attempting to restore user session for:", savedUser.email);
    // We need to trigger a silent token refresh to get a new ID token
    // This uses the user's refresh token which Chrome should have stored
    const authURL = new URL("https://accounts.google.com/o/oauth2/auth");
    authURL.searchParams.append("client_id", WEB_CLIENT_ID);
    authURL.searchParams.append("response_type", "token id_token");
    authURL.searchParams.append("redirect_uri", `https://${window.chrome?.runtime?.id}.chromiumapp.org/`);
    authURL.searchParams.append("scope", "email profile openid");
    authURL.searchParams.append("prompt", "none"); // Prevents user interaction
    authURL.searchParams.append("login_hint", savedUser.email); // Use the saved email

    const responseUrl = await new Promise<string>((resolve, reject) => {
      window.chrome?.identity?.launchWebAuthFlow(
        { url: authURL.toString(), interactive: false }, // non-interactive mode
        (responseUrl) => {
          if (window.chrome?.runtime?.lastError) {
            reject(new Error(window.chrome.runtime.lastError.message || "인증 오류가 발생했습니다."));
            return;
          }
          
          if (!responseUrl) {
            reject(new Error("인증 응답을 받지 못했습니다."));
            return;
          }
          
          resolve(responseUrl);
        }
      );
    });

    // URL에서 id_token 추출
    const url = new URL(responseUrl);
    const params = new URLSearchParams(url.hash.substring(1));
    const idToken = params.get("id_token");
    
    if (!idToken) {
      throw new Error("ID 토큰을 찾을 수 없습니다.");
    }
    
    // ID 토큰으로 Firebase 인증
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
    console.log("Successfully restored user session");
    
  } catch (error) {
    console.error("Failed to restore user session:", error);
    // If we can't restore the session, clear the stored auth state
    await window.chrome?.storage?.local.remove('user');
  }
};

// Save auth state to Chrome storage
export const saveAuthStateToStorage = async (user: User | null) => {
  if (!isChromeStorageAvailable()) {
    console.warn('Chrome storage API not available');
    return;
  }
  
  try {
    if (user) {
      // Save only the necessary user information
      const userToStore = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      
      await window.chrome?.storage?.local.set({ user: userToStore });
      console.log('Auth state saved to Chrome storage');
    } else {
      // Clear stored user when null is passed
      await window.chrome?.storage?.local.remove('user');
      console.log('Auth state cleared from Chrome storage');
    }
  } catch (error) {
    console.error('Error saving auth state to Chrome storage:', error);
  }
};

// Retrieve auth state from Chrome storage
export const getAuthStateFromStorage = async (): Promise<any | null> => {
  if (!isChromeStorageAvailable()) {
    console.warn('Chrome storage API not available');
    return null;
  }
  
  try {
    const result = await window.chrome?.storage?.local.get('user');
    return result.user || null;
  } catch (error) {
    console.error('Error retrieving auth state from Chrome storage:', error);
    return null;
  }
}; 