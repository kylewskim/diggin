import { 
  GoogleAuthProvider, 
  signInWithCredential,
  signOut as firebaseSignOut,
  onAuthStateChanged, 
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@shared/firebase';

// Chrome API를 위한 타입 정의 추가
interface ChromeRuntime {
  sendMessage: (
    message: any,
    responseCallback?: (response: any) => void
  ) => void;
  lastError?: {
    message: string;
  };
}

interface GoogleAuthResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}

// Chrome 객체 타입 정의
declare global {
  interface Window {
    chrome: {
      runtime: ChromeRuntime;
    };
  }
}

// Firebase 웹 클라이언트 ID
const WEB_CLIENT_ID = "492982442570-28e3lccep11l5a37ib4e8g2t2pnjcf2l.apps.googleusercontent.com";

/**
 * Google 로그인 후 Firebase에 인증
 */
export const signInWithGoogle = async () => {
  try {
    console.log("Starting Google sign-in with launchWebAuthFlow");
    
    // 구글 로그인 URL 구성
    const authURL = new URL("https://accounts.google.com/o/oauth2/auth");
    authURL.searchParams.append("client_id", WEB_CLIENT_ID);
    authURL.searchParams.append("response_type", "token id_token");
    authURL.searchParams.append("redirect_uri", `https://${chrome.runtime.id}.chromiumapp.org/`);
    authURL.searchParams.append("scope", "email profile openid");
    authURL.searchParams.append("prompt", "select_account");
    
    // launchWebAuthFlow로 로그인 페이지 표시
    const responseUrl = await new Promise<string>((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        { url: authURL.toString(), interactive: true },
        (responseUrl) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message || "인증 오류가 발생했습니다."));
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
    
    console.log("Received auth response");
    
    // URL에서 id_token 추출
    const url = new URL(responseUrl);
    const params = new URLSearchParams(url.hash.substring(1));
    const idToken = params.get("id_token");
    
    if (!idToken) {
      throw new Error("ID 토큰을 찾을 수 없습니다.");
    }
    
    console.log("ID token obtained");
    
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
  return onAuthStateChanged(auth, callback);
}; 