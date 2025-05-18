import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithCredential, 
  GoogleAuthProvider,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore,
  connectFirestoreEmulator
} from 'firebase/firestore';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectAuthEmulator } from 'firebase/auth';

/**
 * 로컬 개발 환경에서는 Firebase 에뮬레이터를 사용할 수 있습니다.
 * 프로덕션 환경에서는 실제 Firebase 서비스를 사용합니다.
 */

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCeRpnwsBHPsyeWVAWSXEzHmVHLDNIJdYE",
  authDomain: "diggin-a08f8.firebaseapp.com",
  projectId: "diggin-a08f8",
  storageBucket: "diggin-a08f8.appspot.com",
  messagingSenderId: "175967632049",
  appId: "1:175967632049:web:6c6df57a1546f8b30dd4c8",
  databaseURL: "https://diggin-a08f8-default-rtdb.firebaseio.com"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);

// Google OAuth 클라이언트 ID
const CLIENT_ID = '492982442570-28e3lccep11l5a37ib4e8g2t2pnjcf2l.apps.googleusercontent.com';

// Firebase 인증 함수
export const signInWithOffscreenPopUp = async (): Promise<User | null> => {
  try {
    console.log('🔶 Background: Starting Google authentication with identity API');
    
    // Chrome identity API를 사용하여 Google 인증 토큰 가져오기
    const token = await new Promise<string>((resolve, reject) => {
      console.log('🔶 Background: Calling chrome.identity.getAuthToken');
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          console.error('🔶 Identity API error:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
          return;
        }
        if (!token) {
          console.error('🔶 No token returned from identity API');
          reject(new Error('Failed to get auth token'));
          return;
        }
        // token을 string 타입으로 확실하게 처리
        console.log('🔶 Background: Got auth token from Chrome identity API');
        resolve(token as string);
      });
    });
    
    console.log('🔶 Background: Creating credential with token');
    
    // Google 인증 제공자 생성
    const credential = GoogleAuthProvider.credential(null, token);
    
    // Firebase에 인증 정보로 로그인
    console.log('🔶 Background: Signing in with credential to Firebase');
    const userCredential = await signInWithCredential(auth, credential);
    console.log('🔶 Background: Successfully authenticated with Firebase', userCredential.user.uid);
    
    return userCredential.user;
  } catch (error) {
    console.error('🔶 Firebase authentication error:', error);
    return null;
  }
};

// 현재 인증 상태 확인
export const checkAuthStatus = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}; 