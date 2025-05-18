import { ref, onValue, update, set, get, push } from 'firebase/database';
import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, firestore, database } from './firebase_instances';
import { SessionInformation, TextEntry } from '../types/interfaces';
import { DigginState, B_TO_P } from '../types/enums';
import { timer } from './timer';
import { send_B_to_P_message } from './messaging_integration';
import { iconManager } from './icon';

/**
 * 세션 상태 객체
 */
export const session: {
  data?: SessionInformation;
  location?: string;
} = {};

/**
 * 세션 시작 함수 - 사용자 ID를 기반으로 세션을 초기화
 */
export const startSession = async (uid: string) => {
  console.log('Starting session for user:', uid);

  // 사용자 노드 참조 생성
  const userRef = ref(database, uid);

  // 노드 변경 이벤트 리스너 추가
  onValue(userRef, async (snapshot) => {
    // 노드가 존재하지 않으면 기본 상태로 초기화
    if (!snapshot.exists()) {
      console.log('Session data does not exist for user, creating new session node');
      
      set(userRef, {
        userId: uid,
        state: DigginState.IDLE,
        elapsedTimeInSeconds: 0,
        numInsights: 0,
        lastUpdated: Date.now()
      } as SessionInformation);
      
      return;
    }

    // 세션 데이터 가져오기 및 처리
    const newSessionData = snapshot.val() as SessionInformation;
    
    console.log('[BackgroundScript] Session data changed:', newSessionData);
    
    // 상태 변경에 따른 작업
    if (session.data?.state !== newSessionData.state) {
      console.log(`Session state changed: ${session.data?.state} -> ${newSessionData.state}`);
    }
    
    // 세션 데이터 업데이트
    session.data = newSessionData;
    
    // 상태에 따른 처리
    processByState();
    
    // 팝업에 세션 정보 전송
    syncBackgroundSessionInformationToPopUp();
  });
};

/**
 * 팝업에 세션 정보 동기화
 */
const syncBackgroundSessionInformationToPopUp = async () => {
  if (!session.data) {
    console.error('No session data to sync to popup');
    return;
  }
  
  await send_B_to_P_message({
    key: B_TO_P.B_TO_P_SESSION_INFORMATION_CHANGED,
    data: session.data,
  });
};

/**
 * 세션 상태에 따른 처리
 */
const processByState = () => {
  if (!session.data) {
    console.error('No session data to process');
    return;
  }
  
  if (!auth.currentUser) {
    console.error('No authenticated user');
    return;
  }
  
  const { uid } = auth.currentUser;
  const { state, elapsedTimeInSeconds } = session.data;
  
  switch (state) {
    case DigginState.DIGGIN:
      // 아이콘 설정
      iconManager.setIcon(session.data.shapeId);
      
      // 타이머가 이미 시작된 경우 초 업데이트
      if (timer.isOn) {
        timer.seconds = elapsedTimeInSeconds;
        break;
      }
      
      // 타이머 시작
      timer.startTimer({
        seconds: elapsedTimeInSeconds,
        onChange: (seconds) => {
          // 경과 시간 업데이트
          const userRef = ref(database, uid);
          update(userRef, {
            elapsedTimeInSeconds: seconds,
          });
        },
      });
      break;
      
    case DigginState.PAUSED:
      // 아이콘 초기화
      iconManager.clearIcon();
      
      // 타이머 중지
      timer.stopTimer();
      break;
      
    case DigginState.IDLE:
      // 아이콘 초기화
      iconManager.clearIcon();
      
      // 타이머 중지
      timer.stopTimer();
      break;
  }
};

/**
 * 세션 상태 변경 함수
 */
export const changeSessionState = async (newState: DigginState, sessionData?: Partial<SessionInformation>) => {
  if (!auth.currentUser) {
    console.error('No authenticated user');
    return;
  }
  
  const { uid } = auth.currentUser;
  const userRef = ref(database, uid);
  
  // 현재 세션 데이터 가져오기
  const snapshot = await get(userRef);
  
  if (!snapshot.exists()) {
    console.error('No session data exists');
    return;
  }
  
  const currentData = snapshot.val() as SessionInformation;
  
  // 업데이트할 데이터
  const updateData: Partial<SessionInformation> = {
    state: newState,
    lastUpdated: Date.now(),
    ...sessionData
  };
  
  // 세션 데이터 업데이트
  await update(userRef, updateData);
  
  console.log(`Session state changed to ${newState}`);
  
  return { ...currentData, ...updateData };
};

/**
 * 세션 데이터 가져오기
 */
export const getSessionData = async (): Promise<SessionInformation | null> => {
  if (!auth.currentUser) {
    console.error('No authenticated user');
    return null;
  }
  
  const { uid } = auth.currentUser;
  const userRef = ref(database, uid);
  
  try {
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return snapshot.val() as SessionInformation;
  } catch (error) {
    console.error('Error getting session data:', error);
    return null;
  }
};

/**
 * 세션 시간을 업데이트하는 함수
 */
export const updateSessionDuration = async () => {
  if (!auth.currentUser || !session.data) {
    console.error('No authenticated user or session data');
    return;
  }
  
  const { uid } = auth.currentUser;
  const userRef = ref(database, uid);
  
  try {
    const now = Date.now();
    
    // 업데이트할 데이터
    const updateData = {
      elapsedTimeInSeconds: session.data.elapsedTimeInSeconds,
      lastUpdated: now
    };
    
    // Realtime Database 업데이트
    await update(userRef, updateData);
    
    console.log(`Session duration updated to ${session.data.elapsedTimeInSeconds} seconds`);
    return true;
  } catch (error) {
    console.error('Error updating session duration:', error);
    return false;
  }
};

/**
 * 텍스트 데이터 저장 함수
 */
export const saveTextEntry = async (textEntry: Omit<TextEntry, 'id'>) => {
  if (!auth.currentUser || !session.data) {
    console.error('No authenticated user or active session');
    return null;
  }
  
  if (session.data.state !== DigginState.DIGGIN) {
    console.warn('Session is not in DIGGIN state, cannot save text');
    return null;
  }
  
  const { uid } = auth.currentUser;
  const userRef = ref(database, `${uid}/textEntries`);
  const newEntryRef = push(userRef);
  const entryId = newEntryRef.key;
  
  if (!entryId) {
    console.error('Failed to generate entry ID');
    return null;
  }
  
  const entryData = {
    id: entryId,
    ...textEntry,
    createdAt: Date.now()
  };
  
  try {
    await set(newEntryRef, entryData);
    
    // 인사이트 카운트 증가
    if (session.data) {
      const numInsights = (session.data.numInsights || 0) + 1;
      await update(ref(database, uid), { numInsights });
    }
    
    console.log('Text entry saved:', entryData);
    return entryData;
  } catch (error) {
    console.error('Error saving text entry:', error);
    return null;
  }
}; 