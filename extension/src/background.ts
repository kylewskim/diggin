import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { 
  getDatabase, 
  ref, 
  set, 
  update, 
  onValue, 
  push,
  get,
  DatabaseReference,
  DataSnapshot,
  serverTimestamp as rtdbTimestamp
} from 'firebase/database';

import { DigginState, InsightType, B_TO_C, C_TO_B } from './types/enums';
import { C_TO_B_DATA } from './types/interfaces';

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
export const db = getFirestore(app);
export const database = getDatabase(app);

console.log('[DIGGIN] Background: Firebase initialized with config:', {
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId
});

// DB 연결 테스트
const testDbConnection = async (): Promise<boolean> => {
  console.log('[DIGGIN] Background: Testing database connection to URL:', firebaseConfig.databaseURL);
  
  try {
    // 테스트 참조 생성
    const testRef = ref(database, 'connection_test');
    console.log('[DIGGIN] Background: Created test reference:', testRef.toString());
    
    // 인증 상태 확인
    const authUser = auth.currentUser;
    console.log('[DIGGIN] Background: Current auth state:', authUser ? `Authenticated as ${authUser.uid}` : 'Not authenticated');
    
    // 테스트 데이터 쓰기
    const testData = {
      test: true,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      authState: authUser ? 'authenticated' : 'anonymous'
    };
    
    console.log('[DIGGIN] Background: Attempting to write test data:', testData);
    await set(testRef, testData);
    console.log('[DIGGIN] Background: Successfully wrote test data to database');
    
    // 데이터 읽기
    const snapshot = await get(testRef);
    if (snapshot.exists()) {
      console.log('[DIGGIN] Background: Successfully read test data:', snapshot.val());
      return true;
    } else {
      console.warn('[DIGGIN] Background: Test data not found after writing');
      return false;
    }
  } catch (error) {
    console.error('[DIGGIN] Background: Database connection test failed:', error);
    
    // 오류 유형 분석
    if (error instanceof Error) {
      console.error('[DIGGIN] Background: Error type:', error.name);
      console.error('[DIGGIN] Background: Error message:', error.message);
      console.error('[DIGGIN] Background: Error stack:', error.stack);
      
      // Firebase 인증 오류 처리
      if (error.message.includes('permission_denied')) {
        console.error('[DIGGIN] Background: Permission denied error. Possible causes:');
        console.error('- Database rules may be restricting access');
        console.error('- User may not be authenticated properly');
        console.error('- Project ID or Database URL may be incorrect');
      }
      
      // 연결 오류 처리
      if (error.message.includes('network error')) {
        console.error('[DIGGIN] Background: Network error. Possible causes:');
        console.error('- Internet connection may be unavailable');
        console.error('- Database URL may be incorrect');
        console.error('- CORS issues may exist');
      }
    }
    
    return false;
  }
};

// 앱 시작시 DB 연결 테스트 실행
testDbConnection();

// 세션 상태 객체 타입 정의
interface SessionData {
  userId?: string;
  sessionId?: string;
  holeId?: string;
  sessionName?: string;
  state?: DigginState;
  elapsedTimeInSeconds?: number;
  numInsights?: number;
  lastUpdated?: number;
}

// 세션 상태 객체 
const session: {
  data: SessionData | null;
  location: string | null;
  timer: ReturnType<typeof setInterval> | null;
  isActive: boolean;
} = {
  data: null,
  location: null,
  timer: null,
  isActive: false
};

console.log('[DIGGIN] Background: Script initialized');

// 타이머 시작 함수
function startTimer(seconds: number, onTick: (seconds: number) => void): ReturnType<typeof setInterval> {
  if (session.timer) {
    clearInterval(session.timer);
  }
  
  console.log('[DIGGIN] Background: Starting timer at', seconds, 'seconds');
  
  let currentSeconds = seconds || 0;
  const timer = setInterval(() => {
    currentSeconds += 1;
    onTick(currentSeconds);
  }, 1000);
  
  session.timer = timer;
  return timer;
}

// 타이머 중지 함수
function stopTimer(): void {
  if (session.timer) {
    clearInterval(session.timer);
    session.timer = null;
    console.log('[DIGGIN] Background: Timer stopped');
  }
}

// 사용자 세션 시작 함수
async function startSession(uid: string): Promise<void> {
  console.log('[DIGGIN] Background: Starting session for user:', uid);
  
  try {
    // 데이터베이스 연결 테스트
    console.log('[DIGGIN] Background: Testing database connection before session start');
    await testDbConnection();
    
    // 데이터베이스 참조 경로 로깅
    const path = uid;
    console.log('[DIGGIN] Background: Creating database reference at path:', path);
    
    // 현재 Firebase 구성 상세 로그
    console.log('[DIGGIN] Background: Current Firebase config:', {
      projectId: firebaseConfig.projectId,
      databaseURL: firebaseConfig.databaseURL,
      authDomain: firebaseConfig.authDomain
    });
    
    // 사용자 노드 참조 생성
    const userRef = ref(database, path);
    
    // 테스트 데이터 작성 시도
    try {
      const testPath = `${uid}/test`;
      const testRef = ref(database, testPath);
      await set(testRef, {
        timestamp: Date.now(),
        message: 'Test write before session start'
      });
      console.log('[DIGGIN] Background: Test write to user path successful');
    } catch (writeError) {
      console.error('[DIGGIN] Background: Test write to user path failed:', writeError);
    }
    
    // 노드 변경 이벤트 리스너 추가
    onValue(userRef, async (snapshot: DataSnapshot) => {
      try {
        console.log('[DIGGIN] Background: Received data from Firebase:', 
          snapshot.exists() ? 'data exists' : 'data does not exist',
          'key:', snapshot.key,
          'ref:', snapshot.ref.toString());
        
        // 노드 내용 로깅 (디버깅용)
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('[DIGGIN] Background: Data content:', JSON.stringify(data, null, 2));
        }
        
        // 노드가 존재하지 않으면 기본 상태로 초기화
        if (!snapshot.exists()) {
          console.log('[DIGGIN] Background: Creating new user session node');
          
          const initialData: SessionData = {
            userId: uid,
            state: DigginState.IDLE,
            elapsedTimeInSeconds: 0,
            numInsights: 0,
            lastUpdated: Date.now()
          };
          
          try {
            console.log('[DIGGIN] Background: Writing initial data:', initialData);
            await set(userRef, initialData);
            
            // 데이터 확인
            const checkSnapshot = await get(userRef);
            if (checkSnapshot.exists()) {
              console.log('[DIGGIN] Background: Created and verified initial session data successfully');
            } else {
              console.warn('[DIGGIN] Background: Initial session data was written but not found on read-back');
            }
          } catch (error) {
            console.error('[DIGGIN] Background: Error creating initial session:', error);
          }
          
          return;
        }
        
        // 세션 데이터 가져오기 및 처리
        const newSessionData = snapshot.val() as SessionData;
        console.log('[DIGGIN] Background: Session data updated:', newSessionData);
        
        // 상태 변경에 따른 작업
        if (session.data?.state !== newSessionData.state) {
          console.log(`[DIGGIN] Background: Session state changed: ${session.data?.state || 'none'} -> ${newSessionData.state}`);
        }
        
        // 세션 데이터 업데이트
        session.data = newSessionData;
        
        // 상태에 따른 처리
        if (newSessionData.state === DigginState.DIGGIN) {
          console.log('[DIGGIN] Background: DIGGIN state detected, starting/updating timer');
          
          session.isActive = true;
          
          // 타이머가 실행 중이 아니면 시작
          if (!session.timer) {
            startTimer(newSessionData.elapsedTimeInSeconds || 0, (seconds: number) => {
              // 타이머 틱마다 Realtime DB 업데이트
              const userRef = ref(database, uid);
              console.log('[DIGGIN] Background: Updating timer to', seconds, 'seconds');
              
              update(userRef, {
                elapsedTimeInSeconds: seconds,
                lastUpdated: Date.now()
              }).then(() => {
                if (seconds % 10 === 0) { // 10초마다 로그 기록 (너무 많은 로그 방지)
                  console.log('[DIGGIN] Background: Timer updated to', seconds, 'seconds in database');
                }
              }).catch(error => {
                console.error('[DIGGIN] Background: Error updating timer:', error);
              });
            });
          }
        } else {
          // DIGGIN 상태가 아니면 타이머 중지
          session.isActive = false;
          stopTimer();
        }
      } catch (callbackError) {
        console.error('[DIGGIN] Background: Error in onValue callback:', callbackError);
      }
    }, (error) => {
      console.error('[DIGGIN] Background: Error in session data listener:', error);
    });
    
    console.log('[DIGGIN] Background: Session initialization completed for user:', uid);
  } catch (error) {
    console.error('[DIGGIN] Background: Failed to start session:', error);
  }
}

// 텍스트 엔트리 저장 함수
async function saveTextEntry({
  userId,
  sessionId,
  holeId,
  content,
  sourceUrl,
  sourceTitle
}: {
  userId: string,
  sessionId?: string,
  holeId?: string,
  content: string,
  sourceUrl: string,
  sourceTitle: string
}): Promise<{ id: string, createdAt: number } | null> {
  console.log('[DIGGIN] Background: Saving text entry, content length:', content.length);
  
  try {
    if (!session.isActive) {
      console.warn('[DIGGIN] Background: Session not active, cannot save text');
      return null;
    }
    
    // Realtime Database에 텍스트 엔트리 저장
    const path = `${userId}/textEntries`;
    console.log('[DIGGIN] Background: Creating text entry at path:', path);
    
    const textEntriesRef = ref(database, path);
    const newEntryRef = push(textEntriesRef);
    const entryId = newEntryRef.key;
    
    if (!entryId) {
      throw new Error('Failed to generate entry ID');
    }
    
    // 도메인 추출
    let sourceDomain = 'unknown';
    try {
      sourceDomain = new URL(sourceUrl).hostname;
    } catch (error) {
      console.error('[DIGGIN] Background: Failed to extract domain:', error);
    }
    
    const timestamp = Date.now();
    const entryData = {
      id: entryId,
      userId,
      sessionId: sessionId || userId,
      holeId: holeId || 'default',
      content,
      sourceUrl,
      sourceTitle,
      sourceDomain,
      capturedAt: timestamp,
      createdAt: timestamp,
      sessionTime: session.data?.elapsedTimeInSeconds || 0,
      isBookmarked: false
    };
    
    console.log('[DIGGIN] Background: Entry data prepared:', {
      id: entryId,
      contentLength: content.length,
      sessionId: sessionId || userId,
      holeId: holeId || 'default',
      timestamp: new Date(timestamp).toISOString(),
      sourceDomain
    });
    
    console.log('[DIGGIN] Background: Attempting to save entry with ID:', entryId);
    await set(newEntryRef, entryData);
    console.log('[DIGGIN] Background: Entry saved successfully with ID:', entryId);
    
    // Firestore에도 저장 (필요한 경우)
    try {
      const entriesCollection = collection(db, 'textEntries');
      const firestoreData = {
        sessionId: sessionId || userId,
        holeId: holeId || 'default',
        content,
        sourceUrl,
        sourceDomain,
        capturedAt: serverTimestamp(),
        isBookmarked: false
      };
      
      const docRef = await addDoc(entriesCollection, firestoreData);
      console.log('[DIGGIN] Background: Entry also saved to Firestore with ID:', docRef.id);
    } catch (firestoreError) {
      console.error('[DIGGIN] Background: Failed to save to Firestore, but saved to Realtime DB:', firestoreError);
    }
    
    // 인사이트 카운트 증가
    const userRef = ref(database, userId);
    const numInsights = (session.data?.numInsights || 0) + 1;
    
    console.log('[DIGGIN] Background: Updating insight count to:', numInsights);
    await update(userRef, { 
      numInsights,
      lastUpdated: timestamp
    });
    
    console.log('[DIGGIN] Background: Insight count updated to:', numInsights);
    
    // 저장된 엔트리 확인
    try {
      const entrySnapshot = await get(newEntryRef);
      if (entrySnapshot.exists()) {
        console.log('[DIGGIN] Background: Verified entry exists in database');
      } else {
        console.warn('[DIGGIN] Background: Entry verification failed - entry not found after saving');
      }
    } catch (verifyError) {
      console.error('[DIGGIN] Background: Error verifying saved entry:', verifyError);
    }
    
    return {
      id: entryId,
      createdAt: timestamp
    };
  } catch (error) {
    console.error('[DIGGIN] Background: Error saving text entry:', error);
    return null;
  }
}

// 사용자 정보 저장
async function saveUserInfo(user: User): Promise<User | null> {
  try {
    console.log('[DIGGIN] Background: Saving user info for:', user.uid);
    
    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp()
    }, { merge: true });
    
    console.log('[DIGGIN] Background: User info saved to Firestore');
    
    // 사용자 세션 시작
    await startSession(user.uid);
    
    return user;
  } catch (error) {
    console.error('[DIGGIN] Background: Error saving user info:', error);
    return null;
  }
}

// 설치/업데이트 시에도 세션 복원 시도
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('[DIGGIN] Background: Extension installed/updated:', details.reason);
  
  if (details.reason === 'update' || details.reason === 'chrome_update') {
    // 인증 상태 확인 후 세션 복원
    const user = auth.currentUser;
    if (user) {
      console.log('[DIGGIN] Background: User authenticated after update:', user.uid);
      await checkAndRestoreSession();
    } else {
      console.log('[DIGGIN] Background: No authenticated user after update');
    }
  }
  
  // 보류 중인 복사 데이터 확인 및 처리
  processPendingCopiedItems();
});

// 확장 프로그램 시작 시 세션 복원 호출
chrome.runtime.onStartup.addListener(async () => {
  console.log('[DIGGIN] Background: Extension started');
  
  // 인증 상태 확인 후 세션 복원
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log('[DIGGIN] Background: User authenticated on startup:', user.uid);
      await checkAndRestoreSession();
    } else {
      console.log('[DIGGIN] Background: No authenticated user on startup');
    }
  });
  
  // 보류 중인 복사 데이터 확인 및 처리
  processPendingCopiedItems();
});

// 인증 상태 변경 리스너
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('[DIGGIN] Background: User signed in:', user.uid);
    await saveUserInfo(user);
  } else {
    console.log('[DIGGIN] Background: User signed out');
    
    // 타이머 정리
    stopTimer();
    
    // 세션 데이터 초기화
    session.data = null;
    session.isActive = false;
  }
});

// 컨텐츠 스크립트와의 통신 처리 - clipboard 모니터링
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "clipboard") {
    console.log('[DIGGIN] Background: Connected to clipboard monitor');
    
    port.onMessage.addListener((message) => {
      console.log('[DIGGIN] Background: Received message from content script:', message.action);
      
      if (message.action === 'COPY_EVENT') {
        console.log('[DIGGIN] Background: Copy event detected, content length:', message.text.length);
        
        if (!auth.currentUser) {
          console.error('[DIGGIN] Background: No authenticated user');
          port.postMessage({ action: 'COPY_SAVED', success: false, error: 'Not authenticated' });
          return;
        }
        
        if (!session.isActive) {
          console.warn('[DIGGIN] Background: Session not active');
          port.postMessage({ action: 'COPY_SAVED', success: false, error: 'No active digging session' });
          return;
        }
        
        console.log('[DIGGIN] Background: Proceeding with text entry save');
        
        // 텍스트 엔트리 저장
        saveTextEntry({
          userId: auth.currentUser.uid,
          sessionId: session.data?.sessionId || auth.currentUser.uid,
          holeId: session.data?.holeId || 'default',
          content: message.text,
          sourceUrl: message.url,
          sourceTitle: message.title
        })
        .then(entry => {
          if (entry) {
            console.log('[DIGGIN] Background: Text entry saved successfully:', entry.id);
            port.postMessage({ 
              action: 'COPY_SAVED', 
              success: true,
              insightCount: session.data?.numInsights || 0,
              entryId: entry.id
            });
          } else {
            console.error('[DIGGIN] Background: Failed to save text entry');
            port.postMessage({ 
              action: 'COPY_SAVED', 
              success: false,
              error: 'Failed to save to database'
            });
          }
        })
        .catch(error => {
          console.error('[DIGGIN] Background: Error saving text entry:', error);
          port.postMessage({ 
            action: 'COPY_SAVED', 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        });
      } else if (message.action === 'CONNECTION_TEST') {
        console.log('[DIGGIN] Background: Received connection test from content script');
        
        // 인증 및 세션 상태 확인
        const authStatus = auth.currentUser ? true : false;
        const sessionStatus = {
          isActive: session.isActive,
          state: session.data?.state,
          elapsedTime: session.data?.elapsedTimeInSeconds || 0
        };
        
        console.log('[DIGGIN] Background: Connection test - Auth status:', authStatus, 'Session status:', sessionStatus);
        
        // 테스트 응답 전송
        port.postMessage({
          action: 'CONNECTION_TEST_RESPONSE',
          success: true,
          authStatus,
          sessionStatus,
          timestamp: Date.now(),
          databaseURL: firebaseConfig.databaseURL
        });
        
        // DB 상태 확인
        testDbConnection()
          .then(() => {
            console.log('[DIGGIN] Background: Database test completed during connection test');
          })
          .catch(error => {
            console.error('[DIGGIN] Background: Database test failed during connection test:', error);
          });
      }
    });
    
    port.onDisconnect.addListener(() => {
      console.log('[DIGGIN] Background: Disconnected from clipboard monitor');
    });
  }
});

// 세션 활성 상태 저장 함수
async function saveSessionState(): Promise<void> {
  try {
    // 인증된 상태일 때 Realtime DB에 저장
    if (auth.currentUser && session.isActive && session.data) {
      const uid = auth.currentUser.uid;
      const stateRef = ref(database, `${uid}/activeSession`);
      
      console.log('[DIGGIN] Background: Saving active session state to DB:', {
        sessionId: session.data.sessionId,
        holeId: session.data.holeId,
        sessionName: session.data.sessionName,
        elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
      });
      
      await set(stateRef, {
        sessionId: session.data.sessionId,
        holeId: session.data.holeId,
        sessionName: session.data.sessionName,
        elapsedTimeInSeconds: session.data.elapsedTimeInSeconds,
        state: session.data.state,
        lastUpdated: Date.now()
      });
      
      console.log('[DIGGIN] Background: Active session state saved successfully to DB');
    } 
    
    // 모든 상태에서 로컬 스토리지에 저장 (인증 상태와 무관)
    if (session.isActive && session.data) {
      // 로컬 저장소에도 세션 상태 저장
      const localSessionData = {
        sessionId: session.data.sessionId,
        holeId: session.data.holeId,
        sessionName: session.data.sessionName,
        elapsedTimeInSeconds: session.data.elapsedTimeInSeconds,
        state: session.data.state,
        lastUpdated: Date.now()
      };
      
      console.log('[DIGGIN] Background: Saving active session state to local storage:', localSessionData);
      
      // 로컬 스토리지에 저장
      chrome.storage.local.set({ 'activeSession': localSessionData }, () => {
        console.log('[DIGGIN] Background: Active session state saved successfully to local storage');
      });
    } else {
      console.log('[DIGGIN] Background: No active session to save');
    }
  } catch (error) {
    console.error('[DIGGIN] Background: Failed to save session state:', error);
  }
}

// 세션 활성 상태 로드 함수
async function loadSessionState(): Promise<{ 
  sessionId?: string; 
  holeId?: string; 
  sessionName?: string;
  elapsedTimeInSeconds?: number;
} | null> {
  try {
    let activeSession = null;
    
    // 인증된 상태일 때 Realtime DB에서 먼저 시도
    if (auth.currentUser) {
      try {
        const uid = auth.currentUser.uid;
        const stateRef = ref(database, `${uid}/activeSession`);
        const snapshot = await get(stateRef);
        
        if (snapshot.exists()) {
          activeSession = snapshot.val();
          console.log('[DIGGIN] Background: Loaded active session from DB:', activeSession);
        }
      } catch (dbError) {
        console.error('[DIGGIN] Background: Error loading from DB, falling back to local storage:', dbError);
      }
    }
    
    // DB에서 세션을 찾지 못했거나 인증되지 않은 경우 로컬 스토리지에서 로드
    if (!activeSession) {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get('activeSession', (result) => {
          if (chrome.runtime.lastError) {
            console.error('[DIGGIN] Background: Error reading from local storage:', chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
            return;
          }
          
          if (result.activeSession) {
            console.log('[DIGGIN] Background: Loaded active session from local storage:', result.activeSession);
            resolve({
              sessionId: result.activeSession.sessionId,
              holeId: result.activeSession.holeId,
              sessionName: result.activeSession.sessionName,
              elapsedTimeInSeconds: result.activeSession.elapsedTimeInSeconds
            });
          } else {
            console.log('[DIGGIN] Background: No active session found in local storage');
            resolve(null);
          }
        });
      });
    }
    
    // 로드된 세션이 활성 상태인지 확인
    if (activeSession && activeSession.state === DigginState.DIGGIN) {
      return {
        sessionId: activeSession.sessionId,
        holeId: activeSession.holeId,
        sessionName: activeSession.sessionName,
        elapsedTimeInSeconds: activeSession.elapsedTimeInSeconds
      };
    } else if (activeSession) {
      console.log('[DIGGIN] Background: Found session but not in DIGGIN state');
    }
    
    return null;
  } catch (error) {
    console.error('[DIGGIN] Background: Failed to load session state:', error);
    return null;
  }
}

// 주기적으로 세션 상태 저장 (매 20초마다)
setInterval(() => {
  if (session.isActive) {
    saveSessionState().catch(console.error);
  }
}, 20000);

// 메시지 핸들러 추가 (일회성 메시지용)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[DIGGIN] Background: Received message:', message.action || message.key);
  
  // C_TO_B_DATA 메시지 처리 (콘텐츠 스크립트에서 복사 이벤트 수신)
  if (message.key === C_TO_B.C_TO_B_DATA) {
    const data = message.data as C_TO_B_DATA;
    console.log('[DIGGIN] Background: Received data from content script:', {
      type: data.type,
      contentLength: data.value.length,
      url: data.url
    });
    
    // 인사이트가 텍스트인 경우
    if (data.type === InsightType.TEXT) {
      // 텍스트 엔트리 저장 처리
      if (!session.isActive) {
        console.warn('[DIGGIN] Background: Not saving text entry - no active session');
        return true;
      }
      
      if (!auth.currentUser) {
        console.warn('[DIGGIN] Background: Not saving text entry - not authenticated');
        
        // 로컬 스토리지에 저장
        const textEntry = {
          content: data.value,
          sourceUrl: data.url,
          title: data.title || 'No title',
          timestamp: Date.now()
        };
        
        chrome.storage.local.get('pendingTextEntries', (result) => {
          const entries = result.pendingTextEntries || [];
          entries.push(textEntry);
          
          chrome.storage.local.set({ pendingTextEntries: entries }, () => {
            console.log('[DIGGIN] Background: Saved to local storage - pending entries count:', entries.length);
          });
        });
        
        return true;
      }
      
      // 도메인 추출
      let sourceDomain = 'unknown';
      try {
        sourceDomain = new URL(data.url).hostname;
      } catch (error) {
        console.error('[DIGGIN] Background: Failed to extract domain:', error);
      }
      
      // Firebase Firestore에 저장
      console.log('[DIGGIN] Background: Creating text entry in Firebase with data:', {
        sessionId: session.data?.sessionId,
        contentLength: data.value.length,
        sourceUrl: data.url,
        sourceDomain
      });
      
      const entriesCollection = collection(db, 'textEntries');
      addDoc(entriesCollection, {
        sessionId: session.data?.sessionId || (auth.currentUser ? auth.currentUser.uid : 'anonymous'),
        holeId: session.data?.holeId || 'default',
        content: data.value,
        sourceUrl: data.url,
        sourceDomain,
        capturedAt: serverTimestamp(),
        isBookmarked: false
      })
      .then(docRef => {
        console.log('[DIGGIN] Background: Text entry successfully saved to Firestore with ID:', docRef.id);
        
        // 인사이트 카운트 증가
        if (session.data && auth.currentUser) {
          const numInsights = (session.data.numInsights || 0) + 1;
          const userRef = ref(database, auth.currentUser.uid);
          
          update(userRef, { 
            numInsights,
            lastUpdated: Date.now()
          })
            .then(() => {
              console.log('[DIGGIN] Background: Updated insight count to:', numInsights);
              
              // 애니메이션 트리거
              if (sender.tab?.id) {
                chrome.tabs.sendMessage(sender.tab.id, {
                  type: B_TO_C.B_TO_C_ANIMATE,
                  data: {
                    color: '#4CAF50', // 녹색 기본값
                    numInsights
                  }
                }).catch(error => {
                  console.error('[DIGGIN] Background: Failed to send animation trigger:', error);
                });
              }
            })
            .catch(error => {
              console.error('[DIGGIN] Background: Failed to update insight count:', error);
            });
        }
      })
      .catch(error => {
        console.error('[DIGGIN] Background: Failed to save text entry to Firestore:', error);
      });
    }
    
    return true;
  }
  
  // 기존 타입 형식 메시지도 지원
  if (message.type && !message.action) {
    const action = message.type;
    const data = { ...message };
    delete data.type;
    
    // 일관성을 위해 메시지 형식 변환
    message = { action, data };
    console.log('[DIGGIN] Background: Converting legacy message format to new format:', message);
  }
  
  if (message.action === 'GET_SESSION_STATE') {
    console.log('[DIGGIN] Background: Sending session state');
    
    // 세션 상태 반환
    sendResponse({
      success: true,
      isActive: session.isActive,
      data: session.data,
      authenticated: !!auth.currentUser,
      userId: auth.currentUser?.uid
    });
    
    return true; // 비동기 응답 사용을 위해 true 반환
  }
  
  // 이전 GET_SESSION_STATUS 메시지도 지원
  if (message.action === 'GET_SESSION_STATUS' || message.type === 'GET_SESSION_STATUS') {
    console.log('[DIGGIN] Background: Legacy GET_SESSION_STATUS requested, sending data');
    
    const sessionId = message.data?.sessionId || message.sessionId;
    
    if (sessionId && session.data?.sessionId === sessionId) {
      sendResponse({
        sessionId: sessionId,
        isActive: session.isActive,
        duration: session.data?.elapsedTimeInSeconds || 0
      });
    } else {
      sendResponse(null);
    }
    
    return true;
  }
  
  if (message.action === 'START_SESSION') {
    console.log('[DIGGIN] Background: Request to start session with data:', message.data);
    
    // 인증 체크 없이 진행하도록 변경
    if (!auth.currentUser) {
      console.warn('[DIGGIN] Background: No authenticated user, but continuing session anyway');
      // 인증 상태가 아니더라도 세션 데이터 임시 저장
      session.isActive = true;
      if (!session.data) {
        session.data = {};
      }
      
      const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
      if (!sessionId) {
        console.error('[DIGGIN] Background: Cannot start session - missing sessionId');
        sendResponse({ success: false, error: 'Missing sessionId' });
        return true;
      }
      
      // 세션 데이터 업데이트
      session.data.sessionId = sessionId;
      session.data.holeId = holeId || 'default';
      session.data.sessionName = sessionName || '';
      session.data.state = DigginState.DIGGIN;
      
      if (typeof savedDuration === 'number') {
        session.data.elapsedTimeInSeconds = savedDuration;
      }
      
      // 타이머 시작
      if (!session.timer) {
        console.log('[DIGGIN] Background: Starting non-authenticated timer');
        const startSeconds = savedDuration || session.data.elapsedTimeInSeconds || 0;
        startTimer(startSeconds, (seconds: number) => {
          console.log('[DIGGIN] Background: Non-authenticated timer tick:', seconds);
          if (session.data) {
            session.data.elapsedTimeInSeconds = seconds;
            
            // 10초마다 스토리지에 세션 정보 저장 (타이머 계속 유지를 위해)
            if (seconds % 10 === 0) {
              immediatelySaveSessionToLocalStorage();
            }
          }
        });
      }
      
      // 세션 정보 즉시 로컬 스토리지에 저장
      immediatelySaveSessionToLocalStorage();
      
      sendResponse({ 
        success: true,
        isActive: session.isActive,
        elapsedTimeInSeconds: session.data?.elapsedTimeInSeconds || 0,
        message: 'Session started without authentication'
      });
      return true;
    }
    
    const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
    if (!sessionId) {
      console.error('[DIGGIN] Background: Cannot start session - missing sessionId');
      sendResponse({ success: false, error: 'Missing sessionId' });
      return true;
    }
    
    const uid = auth.currentUser.uid;
    
    // 세션 데이터 업데이트
    const userRef = ref(database, uid);
    
    const updateData: Record<string, any> = {
      sessionId: sessionId,
      holeId: holeId || 'default',
      state: DigginState.DIGGIN,
      lastUpdated: Date.now()
    };
    
    if (sessionName) {
      updateData.sessionName = sessionName;
    }
    
    if (typeof savedDuration === 'number') {
      updateData.elapsedTimeInSeconds = savedDuration;
    }
    
    update(userRef, updateData)
    .then(() => {
      console.log('[DIGGIN] Background: Session started successfully');
      
      // 세션 활성화
      session.isActive = true;
      
      // 세션 데이터 초기화
      if (!session.data) {
        session.data = {};
      }
      
      // 세션 데이터 업데이트
      session.data.sessionId = sessionId;
      session.data.holeId = holeId || session.data.holeId;
      session.data.sessionName = sessionName || session.data.sessionName;
      session.data.state = DigginState.DIGGIN;
      
      if (typeof savedDuration === 'number') {
        session.data.elapsedTimeInSeconds = savedDuration;
      }
      
      // 타이머 시작 (기존 타이머가 없는 경우)
      if (!session.timer) {
        console.log('[DIGGIN] Background: Starting new timer');
        const startSeconds = savedDuration || session.data.elapsedTimeInSeconds || 0;
        startTimer(startSeconds, (seconds: number) => {
          // 타이머 틱마다 Realtime DB 업데이트
          const userRef = ref(database, uid);
          console.log('[DIGGIN] Background: Timer tick, updating to', seconds, 'seconds');
          
          update(userRef, {
            elapsedTimeInSeconds: seconds,
            lastUpdated: Date.now()
          }).catch(error => {
            console.error('[DIGGIN] Background: Error updating timer:', error);
          });
          
          if (session.data) {
            session.data.elapsedTimeInSeconds = seconds;
          }
        });
      }
      
      // 현재 활성 세션 상태 저장
      saveSessionState();
      
      sendResponse({ 
        success: true,
        isActive: session.isActive,
        elapsedTimeInSeconds: session.data?.elapsedTimeInSeconds || 0
      });
    })
    .catch(error => {
      console.error('[DIGGIN] Background: Failed to start session:', error);
      sendResponse({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to start session'
      });
    });
    
    return true; // 비동기 응답 사용을 위해 true 반환
  }
  
  if (message.action === 'SESSION_CONTINUE') {
    console.log('[DIGGIN] Background: Request to continue session with data:', message.data);
    
    // 인증 체크 없이 진행하도록 변경
    if (!auth.currentUser) {
      console.warn('[DIGGIN] Background: No authenticated user, but continuing session anyway');
      
      const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
      if (!sessionId) {
        console.error('[DIGGIN] Background: Cannot continue session - missing sessionId');
        sendResponse({ success: false, error: 'Missing sessionId' });
        return true;
      }
      
      // 세션 활성 상태 유지
      session.isActive = true;
      
      // 세션 데이터 갱신
      if (!session.data) {
        session.data = {};
      }
      
      session.data.sessionId = sessionId;
      session.data.holeId = holeId || session.data.holeId;
      session.data.sessionName = sessionName || session.data.sessionName;
      session.data.state = DigginState.DIGGIN;
      
      // 기존에 저장된 시간 갱신
      if (typeof savedDuration === 'number' && (
        !session.data.elapsedTimeInSeconds || 
        savedDuration > session.data.elapsedTimeInSeconds
      )) {
        session.data.elapsedTimeInSeconds = savedDuration;
      }
      
      console.log('[DIGGIN] Background: Non-authenticated session state after continue:', {
        isActive: session.isActive,
        sessionId: session.data.sessionId,
        elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
      });
      
      // 타이머 상태 확인 및 필요 시 재시작
      if (!session.timer) {
        const initialSeconds = session.data.elapsedTimeInSeconds || 0;
        console.log('[DIGGIN] Background: Starting non-authenticated timer at', initialSeconds, 'seconds');
        
        startTimer(initialSeconds, (seconds: number) => {
          console.log('[DIGGIN] Background: Non-authenticated timer tick:', seconds);
          
          if (session.data) {
            session.data.elapsedTimeInSeconds = seconds;
            
            // 10초마다 스토리지에 세션 정보 저장 (타이머 계속 유지를 위해)
            if (seconds % 10 === 0) {
              immediatelySaveSessionToLocalStorage();
            }
          }
        });
      } else {
        console.log('[DIGGIN] Background: Non-authenticated timer already running, continuing');
      }
      
      // 세션 정보 즉시 로컬 스토리지에 저장
      immediatelySaveSessionToLocalStorage();
      
      // 비인증 상태에서도 응답 반환
      sendResponse({ 
        success: true,
        isActive: session.isActive,
        elapsedTimeInSeconds: session.data?.elapsedTimeInSeconds || 0,
        message: 'Session continued without authentication'
      });
      
      return true;
    }
    
    const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
    if (!sessionId) {
      console.error('[DIGGIN] Background: Cannot continue session - missing sessionId');
      sendResponse({ success: false, error: 'Missing sessionId' });
      return true;
    }
    
    // 세션 활성 상태 유지 - 매우 중요!
    session.isActive = true;
    
    // 세션 데이터 갱신
    if (!session.data) {
      session.data = {};
    }
    
    session.data.sessionId = sessionId;
    session.data.holeId = holeId || session.data.holeId;
    session.data.sessionName = sessionName || session.data.sessionName;
    session.data.state = DigginState.DIGGIN;
    
    // 기존에 저장된 시간 갱신
    if (typeof savedDuration === 'number' && (
      !session.data.elapsedTimeInSeconds || 
      savedDuration > session.data.elapsedTimeInSeconds
    )) {
      session.data.elapsedTimeInSeconds = savedDuration;
    }
    
    console.log('[DIGGIN] Background: Session state after continue:', {
      isActive: session.isActive,
      sessionId: session.data.sessionId,
      elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
    });
    
    const uid = auth.currentUser.uid;
    
    // Realtime DB 업데이트
    const userRef = ref(database, uid);
    
    const updateData: Record<string, any> = {
      sessionId: sessionId,
      state: DigginState.DIGGIN,
      lastUpdated: Date.now()
    };
    
    if (holeId) {
      updateData.holeId = holeId;
    }
    
    if (sessionName) {
      updateData.sessionName = sessionName;
    }
    
    if (typeof savedDuration === 'number') {
      updateData.elapsedTimeInSeconds = savedDuration;
    }
    
    // DB 업데이트
    update(userRef, updateData).catch(error => {
      console.error('[DIGGIN] Background: Error updating session data:', error);
    });
    
    // 타이머 상태 확인 및 필요 시 재시작
    if (!session.timer) {
      const initialSeconds = session.data.elapsedTimeInSeconds || 0;
      console.log('[DIGGIN] Background: Starting/continuing timer at', initialSeconds, 'seconds');
      
      startTimer(initialSeconds, (seconds: number) => {
        // 타이머 틱마다 Realtime DB 업데이트
        if (!auth.currentUser) return;
        
        const uid = auth.currentUser.uid;
        const userRef = ref(database, uid);
        
        update(userRef, {
          elapsedTimeInSeconds: seconds,
          lastUpdated: Date.now()
        }).catch(error => {
          console.error('[DIGGIN] Background: Error updating timer:', error);
        });
        
        // 세션 데이터도 업데이트
        if (session.data) {
          session.data.elapsedTimeInSeconds = seconds;
        }
      });
    } else {
      console.log('[DIGGIN] Background: Timer already running, continuing');
    }
    
    // 활성 세션 상태 저장
    saveSessionState().then(() => {
      console.log('[DIGGIN] Background: Session continuation state saved');
      sendResponse({ 
        success: true,
        isActive: session.isActive,
        elapsedTimeInSeconds: session.data?.elapsedTimeInSeconds
      });
    }).catch(error => {
      console.error('[DIGGIN] Background: Failed to save continuation state:', error);
      sendResponse({ success: false, error: 'Failed to save session state' });
    });
    
    return true; // 비동기 응답 사용을 위해 true 반환
  }
  
  // PAUSE_SESSION 메시지 처리
  if (message.action === 'PAUSE_SESSION') {
    console.log('[DIGGIN] Background: Request to pause session with data:', message.data);
    
    if (!auth.currentUser) {
      console.error('[DIGGIN] Background: Cannot pause session - not authenticated');
      sendResponse({ success: false, error: 'Not authenticated' });
      return true;
    }
    
    const { sessionId } = message.data || {};
    if (!sessionId) {
      console.error('[DIGGIN] Background: Cannot pause session - missing sessionId');
      sendResponse({ success: false, error: 'Missing sessionId' });
      return true;
    }
    
    const uid = auth.currentUser.uid;
    
    // 세션 상태 업데이트
    session.isActive = false;
    if (session.data) {
      session.data.state = DigginState.PAUSED;
    }
    
    // 타이머 일시 중지
    if (session.timer) {
      stopTimer();
    }
    
    // Realtime DB 업데이트
    const userRef = ref(database, uid);
    update(userRef, {
      state: DigginState.PAUSED,
      lastUpdated: Date.now()
    })
    .then(() => {
      console.log('[DIGGIN] Background: Session paused successfully');
      sendResponse({
        success: true,
        savedDuration: session.data?.elapsedTimeInSeconds || 0
      });
    })
    .catch(error => {
      console.error('[DIGGIN] Background: Failed to pause session:', error);
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to pause session'
      });
    });
    
    return true;
  }
  
  // RESUME_SESSION 메시지 처리
  if (message.action === 'RESUME_SESSION') {
    console.log('[DIGGIN] Background: Request to resume session with data:', message.data);
    
    if (!auth.currentUser) {
      console.error('[DIGGIN] Background: Cannot resume session - not authenticated');
      sendResponse({ success: false, error: 'Not authenticated' });
      return true;
    }
    
    const { sessionId, savedDuration } = message.data || {};
    if (!sessionId) {
      console.error('[DIGGIN] Background: Cannot resume session - missing sessionId');
      sendResponse({ success: false, error: 'Missing sessionId' });
      return true;
    }
    
    // 세션 상태 활성화
    session.isActive = true;
    if (session.data) {
      session.data.state = DigginState.DIGGIN;
    }
    
    // 저장된 시간 업데이트
    if (typeof savedDuration === 'number' && session.data) {
      session.data.elapsedTimeInSeconds = savedDuration;
    }
    
    const uid = auth.currentUser.uid;
    const userRef = ref(database, uid);
    
    // Realtime DB 업데이트
    update(userRef, {
      state: DigginState.DIGGIN,
      elapsedTimeInSeconds: savedDuration || session.data?.elapsedTimeInSeconds || 0,
      lastUpdated: Date.now()
    })
    .then(() => {
      // 타이머 시작
      if (!session.timer && session.data) {
        const startSeconds = session.data.elapsedTimeInSeconds || 0;
        startTimer(startSeconds, (seconds: number) => {
          // 타이머 틱마다 Realtime DB 업데이트
          const userRef = ref(database, uid);
          
          update(userRef, {
            elapsedTimeInSeconds: seconds,
            lastUpdated: Date.now()
          }).catch(error => {
            console.error('[DIGGIN] Background: Error updating timer:', error);
          });
          
          if (session.data) {
            session.data.elapsedTimeInSeconds = seconds;
          }
        });
      }
      
      console.log('[DIGGIN] Background: Session resumed successfully');
      sendResponse({
        success: true,
        isActive: true,
        elapsedTimeInSeconds: session.data?.elapsedTimeInSeconds || 0
      });
    })
    .catch(error => {
      console.error('[DIGGIN] Background: Failed to resume session:', error);
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to resume session'
      });
    });
    
    return true;
  }
  
  if (message.action === 'END_SESSION') {
    console.log('[DIGGIN] Background: Request to end session with data:', message.data);
    
    // 인증 상태에 관계없이 세션 종료 처리
    if (!session.isActive) {
      console.warn('[DIGGIN] Background: No active session to end');
      
      // 로컬 스토리지에서 세션 정보 제거 및 세션 종료 상태 설정
      chrome.storage.local.remove('activeSession', () => {
        console.log('[DIGGIN] Background: Removed active session data from local storage');
        
        // 종료된 세션 상태를 로컬 스토리지에 저장 (App.tsx에서 리디렉션 방지를 위해)
        chrome.storage.local.set({ 'sessionEnded': true, 'sessionEndedTimestamp': Date.now() }, () => {
          console.log('[DIGGIN] Background: Set sessionEnded flag in local storage');
          
          // 5분 후 자동 세션 종료 플래그 삭제
          setTimeout(() => {
            chrome.storage.local.remove('sessionEnded', () => {
              console.log('[DIGGIN] Background: Automatically cleared sessionEnded flag after timeout');
            });
          }, 300000); // 5분
        });
      });
      
      sendResponse({ success: true, message: 'No active session' });
      return true;
    }
    
    const finalDuration = session.data?.elapsedTimeInSeconds || 0;
    const sessionInfo = { ...session.data }; // 로그용 복사본
    
    // 타이머 중지 및 세션 정보 리셋
    stopTimer();
    session.isActive = false;
    session.data = null;
    
    // 로컬 스토리지에서 세션 정보 제거
    chrome.storage.local.remove('activeSession', () => {
      console.log('[DIGGIN] Background: Removed active session data from local storage');
    });

    // 인증된 상태인 경우 Realtime DB도 업데이트
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      
      // 세션 종료
      const userRef = ref(database, uid);
      update(userRef, {
        state: DigginState.IDLE,
        lastUpdated: Date.now()
      })
      .then(() => {
        console.log('[DIGGIN] Background: Session ended successfully in Realtime DB');
        
        // 활성 세션 정보 삭제
        const activeSessionRef = ref(database, `${uid}/activeSession`);
        return set(activeSessionRef, null);
      })
      .then(() => {
        console.log('[DIGGIN] Background: Active session info cleared from Realtime DB');
        sendResponse({ 
          success: true,
          finalDuration: finalDuration
        });
      })
      .catch(error => {
        console.error('[DIGGIN] Background: Error updating Realtime DB, but session was ended locally:', error);
        sendResponse({ 
          success: true, // 로컬에서는 성공했으므로 true 반환
          finalDuration: finalDuration,
          dbError: error instanceof Error ? error.message : 'Failed to update database'
        });
      });
    } else {
      // 인증되지 않은 상태에서도 성공 응답
      console.log('[DIGGIN] Background: Session ended successfully (non-authenticated)');
      sendResponse({ 
        success: true,
        finalDuration: finalDuration,
        sessionInfo: sessionInfo // 디버깅용으로 마지막 세션 정보 포함
      });
    }
    
    return true; // 비동기 응답 사용을 위해 true 반환
  }
  
  if (message.action === 'CHECK_ACTIVE_SESSION') {
    console.log('[DIGGIN] Background: Checking for active session');
    
    // 세션 종료 플래그가 있는지 먼저 확인
    chrome.storage.local.get('sessionEnded', (result) => {
      if (result.sessionEnded) {
        console.log('[DIGGIN] Background: Session ended flag found, reporting no active session');
        sendResponse({
          success: true,
          hasActiveSession: false,
          sessionEnded: true
        });
        return;
      }
      
      // 현재 메모리에 있는 세션이 활성 상태인지 확인
      if (session.isActive && session.data && session.data.sessionId) {
        console.log('[DIGGIN] Background: Using currently active session from memory:', {
          sessionId: session.data.sessionId,
          holeId: session.data.holeId,
          sessionName: session.data.sessionName,
          elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
        });
        
        // 반환하기 전에 한 번 더 세션 정보 저장 (중요)
        immediatelySaveSessionToLocalStorage();
        
        sendResponse({
          success: true,
          hasActiveSession: true,
          activeSession: {
            sessionId: session.data.sessionId,
            holeId: session.data.holeId,
            sessionName: session.data.sessionName,
            elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
          }
        });
        
        return;
      }
      
      // 아래 로직 계속 진행
      continueCheckingActiveSession();
    });
    
    // 로컬 스토리지 확인 후 계속 진행할 함수
    function continueCheckingActiveSession() {
      // 활성 세션이 아니면 저장된 세션을 로드
      console.log('[DIGGIN] Background: No active session in memory, checking direct local storage...');
      
      // 로컬 스토리지에서 직접 로드
      getFromLocalStorage<{
        sessionId: string;
        holeId: string;
        sessionName?: string;
        elapsedTimeInSeconds: number;
        state: DigginState;
      }>('activeSession')
        .then(localSession => {
          if (localSession && localSession.sessionId) {
            console.log('[DIGGIN] Background: Found active session in local storage:', localSession);
            
            // 세션 데이터 메모리에 복원
            session.isActive = true;
            if (!session.data) {
              session.data = {};
            }
            
            session.data.sessionId = localSession.sessionId;
            session.data.holeId = localSession.holeId;
            session.data.sessionName = localSession.sessionName || '';
            session.data.state = DigginState.DIGGIN;
            
            if (localSession.elapsedTimeInSeconds) {
              session.data.elapsedTimeInSeconds = localSession.elapsedTimeInSeconds;
            }
            
            // 타이머가 실행 중이 아니면 시작
            if (!session.timer && session.data.elapsedTimeInSeconds !== undefined) {
              const startSeconds = session.data.elapsedTimeInSeconds;
              console.log('[DIGGIN] Background: Starting timer for restored session at', startSeconds, 'seconds');
              
              startTimer(startSeconds, (seconds: number) => {
                console.log('[DIGGIN] Background: Timer tick for restored session:', seconds);
                if (session.data) {
                  session.data.elapsedTimeInSeconds = seconds;
                  
                  // 10초마다 저장 (너무 자주 저장하지 않도록)
                  if (seconds % 10 === 0) {
                    immediatelySaveSessionToLocalStorage();
                  }
                }
              });
              
              // 정보 저장
              immediatelySaveSessionToLocalStorage();
            }
            
            const activeSession = {
              sessionId: localSession.sessionId,
              holeId: localSession.holeId,
              sessionName: localSession.sessionName,
              elapsedTimeInSeconds: localSession.elapsedTimeInSeconds
            };
            
            sendResponse({ 
              success: true, 
              hasActiveSession: true,
              activeSession
            });
          } else {
            // 마지막으로 DB에서 시도
            console.log('[DIGGIN] Background: No active session in local storage, trying database...');
            
            loadSessionState()
              .then(dbSession => {
                if (dbSession && dbSession.sessionId) {
                  console.log('[DIGGIN] Background: Found active session in database:', dbSession);
                  
                  // 세션 데이터 메모리에 복원
                  session.isActive = true;
                  if (!session.data) {
                    session.data = {};
                  }
                  
                  session.data.sessionId = dbSession.sessionId;
                  session.data.holeId = dbSession.holeId;
                  session.data.sessionName = dbSession.sessionName || '';
                  session.data.state = DigginState.DIGGIN;
                  
                  if (dbSession.elapsedTimeInSeconds) {
                    session.data.elapsedTimeInSeconds = dbSession.elapsedTimeInSeconds;
                  }
                  
                  // 타이머 시작
                  if (!session.timer && session.data.elapsedTimeInSeconds !== undefined) {
                    const startSeconds = session.data.elapsedTimeInSeconds;
                    startTimer(startSeconds, (seconds: number) => {
                      console.log('[DIGGIN] Background: Timer tick for DB-restored session:', seconds);
                      if (session.data) {
                        session.data.elapsedTimeInSeconds = seconds;
                        
                        // 10초마다 저장
                        if (seconds % 10 === 0) {
                          immediatelySaveSessionToLocalStorage();
                        }
                      }
                    });
                  }
                  
                  // 로컬 스토리지에도 저장
                  immediatelySaveSessionToLocalStorage();
                  
                  sendResponse({ 
                    success: true, 
                    hasActiveSession: true,
                    activeSession: dbSession
                  });
                } else {
                  console.log('[DIGGIN] Background: No active session found anywhere');
                  sendResponse({ 
                    success: true, 
                    hasActiveSession: false
                  });
                }
              })
              .catch(dbError => {
                console.error('[DIGGIN] Background: Error checking database session:', dbError);
                sendResponse({ 
                  success: false, 
                  error: 'Failed to check active session in database'
                });
              });
          }
        })
        .catch(error => {
          console.error('[DIGGIN] Background: Error checking active session in local storage:', error);
          sendResponse({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to check active session in storage'
          });
        });
    }
    
    return true; // 비동기 응답 사용을 위해 true 반환
  }
  
  return false; // 기본 응답
});

// 확장 프로그램 일시 중단(suspend) 이벤트 처리 - 세션 상태 유지를 위해 중요
chrome.runtime.onSuspend.addListener(async () => {
  console.log('[DIGGIN] Background: Extension suspending');
  
  // 활성 세션 상태를 저장하여 나중에 복원할 수 있도록 함
  if (session.isActive && session.data && auth.currentUser) {
    console.log('[DIGGIN] Background: Saving active session state before suspension');
    
    try {
      await saveSessionState();
      console.log('[DIGGIN] Background: Session state successfully saved before suspension');
    } catch (error) {
      console.error('[DIGGIN] Background: Failed to save session state before suspension:', error);
    }
  } else {
    console.log('[DIGGIN] Background: No active session to save before suspension');
  }
});

// 주기적으로 세션 상태 저장 - 더 자주 실행 (10초마다)
setInterval(() => {
  if (session.isActive && session.data && auth.currentUser) {
    console.log('[DIGGIN] Background: Periodic session state saving...');
    saveSessionState()
      .then(() => console.log('[DIGGIN] Background: Periodic save completed'))
      .catch(error => console.error('[DIGGIN] Background: Periodic save failed:', error));
  }
}, 10000); // 10초마다 실행

// 확장 프로그램 초기화 시 항상 세션 상태 확인 및 복원
async function checkAndRestoreSession() {
  if (!auth.currentUser) {
    console.log('[DIGGIN] Background: No authenticated user to restore session');
    return;
  }
  
  try {
    console.log('[DIGGIN] Background: Checking for previous active session');
    const activeSession = await loadSessionState();
    
    if (activeSession && activeSession.sessionId) {
      console.log('[DIGGIN] Background: Found previous active session, restoring:', activeSession);
      
      // 세션 데이터 복원
      session.isActive = true;
      if (!session.data) {
        session.data = {};
      }
      
      session.data.sessionId = activeSession.sessionId;
      session.data.holeId = activeSession.holeId;
      session.data.sessionName = activeSession.sessionName;
      session.data.state = DigginState.DIGGIN;
      session.data.elapsedTimeInSeconds = activeSession.elapsedTimeInSeconds;
      
      // 사용자 상태 업데이트
      const uid = auth.currentUser.uid;
      const userRef = ref(database, uid);
      
      await update(userRef, {
        sessionId: activeSession.sessionId,
        holeId: activeSession.holeId,
        sessionName: activeSession.sessionName,
        state: DigginState.DIGGIN,
        elapsedTimeInSeconds: activeSession.elapsedTimeInSeconds,
        lastUpdated: Date.now()
      });
      
      // 타이머 시작
      if (!session.timer) {
        const startSeconds = activeSession.elapsedTimeInSeconds || 0;
        console.log('[DIGGIN] Background: Starting timer for restored session at', startSeconds, 'seconds');
        
        startTimer(startSeconds, (seconds: number) => {
          if (!auth.currentUser) return;
          
          const uid = auth.currentUser.uid;
          const userRef = ref(database, uid);
          
          update(userRef, {
            elapsedTimeInSeconds: seconds,
            lastUpdated: Date.now()
          }).catch(error => {
            console.error('[DIGGIN] Background: Error updating timer:', error);
          });
          
          if (session.data) {
            session.data.elapsedTimeInSeconds = seconds;
          }
        });
      }
      
      console.log('[DIGGIN] Background: Session restoration completed');
    } else {
      console.log('[DIGGIN] Background: No previous active session found');
    }
  } catch (error) {
    console.error('[DIGGIN] Background: Error restoring session:', error);
  }
}

// 인터페이스 정의
interface PendingCopiedItem {
  content: string;
  url: string;
  title: string;
  timestamp: number;
}

// 로컬 스토리지에 저장된 보류 중인 복사 데이터 처리 함수
function processPendingCopiedItems(): void {
  console.log('[DIGGIN] Background: Checking for pending copied items in local storage');
  
  chrome.storage.local.get('pendingCopiedItems', (result) => {
    if (chrome.runtime.lastError) {
      console.error('[DIGGIN] Background: Error getting pending items from storage:', chrome.runtime.lastError);
      return;
    }
    
    const pendingItems = result.pendingCopiedItems || [] as PendingCopiedItem[];
    
    if (pendingItems.length === 0) {
      console.log('[DIGGIN] Background: No pending copied items to process');
      return;
    }
    
    console.log('[DIGGIN] Background: Found', pendingItems.length, 'pending copied items to process');
    
    // 현재 상태 확인
    const isAuthenticated = !!auth.currentUser;
    const isSessionActive = session.isActive;
    
    if (!isSessionActive) {
      console.log('[DIGGIN] Background: No active session, keeping items for later processing');
      return;
    }
    
    // 항목 처리 (최대 10개)
    const itemsToProcess = pendingItems.slice(0, 10);
    const remainingItems = pendingItems.slice(10);
    
    // 각 항목 처리
    Promise.all(
      itemsToProcess.map(async (item: PendingCopiedItem) => {
        try {
          // 도메인 추출
          let sourceDomain = 'unknown';
          try {
            sourceDomain = new URL(item.url).hostname;
          } catch (error) {
            console.error('[DIGGIN] Background: Failed to extract domain:', error);
          }
          
          if (isAuthenticated && session.data) {
            // Firebase Firestore에 저장
            console.log('[DIGGIN] Background: Saving pending item to Firestore:', {
              contentLength: item.content.length,
              url: item.url,
              timestamp: new Date(item.timestamp).toISOString()
            });
            
            const entriesCollection = collection(db, 'textEntries');
            await addDoc(entriesCollection, {
              sessionId: session.data.sessionId || (auth.currentUser ? auth.currentUser.uid : 'anonymous'),
              holeId: session.data.holeId || 'default',
              content: item.content,
              sourceUrl: item.url,
              sourceDomain,
              capturedAt: serverTimestamp(),
              isBookmarked: false
            });
            
            // 인사이트 카운트 증가
            if (auth.currentUser) {
              const numInsights = (session.data.numInsights || 0) + 1;
              const userRef = ref(database, auth.currentUser.uid);
              
              await update(userRef, { 
                numInsights,
                lastUpdated: Date.now()
              });
              
              console.log('[DIGGIN] Background: Updated insight count to:', numInsights);
              session.data.numInsights = numInsights;
            }
            
            console.log('[DIGGIN] Background: Successfully processed pending copied item');
            return true;
          } else {
            console.log('[DIGGIN] Background: User not authenticated or no session data, keeping item for later');
            return false;
          }
        } catch (error) {
          console.error('[DIGGIN] Background: Error processing pending copied item:', error);
          return false;
        }
      })
    ).then((results) => {
      // 성공적으로 처리된 항목 수 계산
      const successCount = results.filter(Boolean).length;
      
      // 실패한 항목을 남은 항목 목록에 다시 추가
      const newPendingItems = [
        ...itemsToProcess.filter((_: PendingCopiedItem, index: number) => !results[index]),
        ...remainingItems
      ];
      
      // 업데이트된 목록 저장
      chrome.storage.local.set({ pendingCopiedItems: newPendingItems }, () => {
        if (chrome.runtime.lastError) {
          console.error('[DIGGIN] Background: Error updating pending items list:', chrome.runtime.lastError);
          return;
        }
        
        console.log('[DIGGIN] Background: Processed', successCount, 'pending items,', newPendingItems.length, 'remaining');
      });
    });
  });
}

// 주기적으로 보류 중인 복사 데이터 처리 (60초마다)
setInterval(processPendingCopiedItems, 60000);

// 로컬 스토리지 저장 및 로드 함수 추가
function saveToLocalStorage(key: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: data }, () => {
      if (chrome.runtime.lastError) {
        console.error(`[DIGGIN] Background: Error saving to local storage (${key}):`, chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        console.log(`[DIGGIN] Background: Saved to local storage (${key}):`, data);
        resolve();
      }
    });
  });
}

function getFromLocalStorage<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        console.error(`[DIGGIN] Background: Error reading from local storage (${key}):`, chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        console.log(`[DIGGIN] Background: Read from local storage (${key}):`, result[key] || null);
        resolve(result[key] || null);
      }
    });
  });
}

// 세션 시작 완료 후 세션 정보를 로컬 스토리지에 즉시 저장
function immediatelySaveSessionToLocalStorage(): void {
  if (session.isActive && session.data) {
    const sessionData = {
      sessionId: session.data.sessionId,
      holeId: session.data.holeId,
      sessionName: session.data.sessionName,
      elapsedTimeInSeconds: session.data.elapsedTimeInSeconds || 0,
      state: session.data.state || DigginState.DIGGIN,
      lastUpdated: Date.now()
    };
    
    console.log('[DIGGIN] Background: Immediately saving active session to local storage:', sessionData);
    
    saveToLocalStorage('activeSession', sessionData)
      .then(() => console.log('[DIGGIN] Background: Session saved to local storage successfully'))
      .catch(error => console.error('[DIGGIN] Background: Failed to save session to local storage:', error));
  }
} 