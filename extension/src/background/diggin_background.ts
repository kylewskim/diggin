import { CollectionName } from '../types/interfaces';
import { B_TO_C, B_TO_P, C_TO_B, DigginState, InsightType, P_TO_B } from '../types/enums';
import { auth, firestore, signInWithOffscreenPopUp, checkAuthStatus } from './firebase_instances';
import { signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { session, startSession, updateSessionDuration } from './session_management';
import { send_B_to_P_message, send_B_to_C_message } from './messaging_integration';

/* -------------------------------------------------------------------------- */
/*                                    0. 인증                                   */
/* -------------------------------------------------------------------------- */

// 인증 상태 확인 메시지 처리
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('🟢 Background: Received message:', message);
  
  if (message.type === 'GET_AUTH_STATUS') {
    console.log('🟢 Background: GET_AUTH_STATUS request received');
    
    // 인증 상태 확인
    const isAuthenticated = !!auth.currentUser;
    console.log('🟢 Background: Auth status:', { isAuthenticated, user: auth.currentUser?.uid });
    
    // 응답 보내기
    const response = {
      isAuthenticated,
      user: auth.currentUser ? {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL
      } : null
    };
    
    console.log('🟢 Background: Sending GET_AUTH_STATUS response:', response);
    sendResponse(response);
    console.log('🟢 Background: GET_AUTH_STATUS response sent');
    
    return true; // 비동기 응답을 위해 true 반환
  }
});

// 인증 세션 복구 메시지 처리
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('🔵 Background: Received message:', message);
  
  if (message.type === 'RESTORE_AUTH') {
    console.log('🔵 Background: RESTORE_AUTH request received');
    
    // 현재 인증 상태 확인
    if (auth.currentUser) {
      console.log('🔵 Background: User already authenticated, returning current user', auth.currentUser.uid);
      const response = {
        success: true,
        user: {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL
        }
      };
      console.log('🔵 Background: Sending RESTORE_AUTH response for existing user:', response);
      sendResponse(response);
      console.log('🔵 Background: RESTORE_AUTH response for existing user sent');
    } else {
      console.log('🔵 Background: No user authenticated, trying to authenticate...');
      // 인증 시도
      signInWithOffscreenPopUp()
        .then(user => {
          if (user) {
            console.log('🔵 Background: Authentication successful', user.uid);
            const response = {
              success: true,
              user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
              }
            };
            console.log('🔵 Background: Sending RESTORE_AUTH success response:', response);
            sendResponse(response);
            console.log('🔵 Background: RESTORE_AUTH success response sent');
          } else {
            console.log('🔵 Background: Authentication failed, no user returned');
            const response = {
              success: false,
              error: 'Authentication failed'
            };
            console.log('🔵 Background: Sending RESTORE_AUTH failure response:', response);
            sendResponse(response);
            console.log('🔵 Background: RESTORE_AUTH failure response sent');
          }
        })
        .catch(error => {
          console.error('🔵 Background: Authentication error', error);
          const response = {
            success: false,
            error: error.message
          };
          console.log('🔵 Background: Sending RESTORE_AUTH error response:', response);
          sendResponse(response);
          console.log('🔵 Background: RESTORE_AUTH error response sent');
        });
    }
    
    return true; // 비동기 응답을 위해 true 반환
  }
});

// 로그인 요청 처리
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.key !== P_TO_B.P_TO_B_SIGN_IN_REQUEST) return;

  console.log('Background: Sign in request received', { message, sender });

  try {
    await signInWithOffscreenPopUp();
  } catch (error) {
    console.error('Background: Sign in failed', error);
  }
});

// 로그아웃 요청 처리
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.key !== P_TO_B.P_TO_B_SIGN_OUT_REQUEST) return;

  console.log('Background: Sign out request received', { message, sender });

  try {
    await signOut(auth);
  } catch (error) {
    console.error('Background: Sign out failed', error);
  }
});

/* -------------------------------------------------------------------------- */
/*                                1. 데이터 수집                                */
/* -------------------------------------------------------------------------- */

// Content Script로부터 데이터 수신
chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.key !== C_TO_B.C_TO_B_DATA) return;

  if (!session.data || session.data.state !== DigginState.DIGGIN) {
    console.warn('Background: Not in DIGGIN state, ignoring data');
    return;
  }

  console.log('Background: Received data from content script', message);

  if (!auth.currentUser) {
    console.error('Background: No authenticated user');
    return;
  }

  if (!session.data.selectedGemId) {
    console.error('Background: No selected gem');
    return;
  }

  const { uid } = auth.currentUser;
  
  // 애니메이션 효과를 Content Script에 전달
  const tellToContentScript = async ({ numInsights, color }: { numInsights: number; color: string }) => {
    console.log('Background: Sending animation data to content script', { numInsights, color });

    if (!sender.tab?.id) {
      console.error('Background: No tab ID available');
      return;
    }

    await send_B_to_C_message(sender.tab.id, {
      type: B_TO_C.B_TO_C_ANIMATE,
      data: {
        numInsights,
        color: color || '#4CAF50',
      },
    });
  };

  // 인사이트 수 업데이트
  const newNumInsights = (session.data.numInsights || 0) + 1;
  if (session.data) {
    session.data.numInsights = newNumInsights;
  }

  // 애니메이션 트리거
  tellToContentScript({
    numInsights: newNumInsights,
    color: session.data.color || '#4CAF50',
  });

  // Firestore에 데이터 저장
  const data = message.data;
  
  try {
    const insightsCollection = collection(firestore, CollectionName.User, uid, CollectionName.Insight);
    
    await addDoc(insightsCollection, {
      createdAt: Timestamp.now(),
      gemId: session.data.selectedGemId,
      type: data.type,
      value: data.value,
      url: data.url,
      title: data.title || document.title,
      highlight: data.highlight || false
    });
    
    console.log('Background: Insight saved successfully');
    
    // 세션 업데이트 - 최신 정보 반영
    updateSessionDuration();
  } catch (error) {
    console.error('Background: Failed to save insight', error);
  }
});

/* -------------------------------------------------------------------------- */
/*                                2. 세션 관리                                  */
/* -------------------------------------------------------------------------- */

// Popup과의 통신 처리
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const uid = auth.currentUser?.uid;

  console.log('Background: Message from popup', message);

  if (!message.key) {
    console.warn('Background: Message with no key received');
    return;
  }

  switch (message.key) {
    // 팝업이 열렸을 때
    case P_TO_B.P_TO_B_OPEN: {
      if (!uid) {
        send_B_to_P_message({
          key: B_TO_P.B_TO_P_CHANGE_URL,
          data: {
            location: '/signin',
          },
        });
        return;
      }

      if (!session.data) {
        await startSession(uid);
      }

      send_B_to_P_message({
        key: B_TO_P.B_TO_P_HERE_IS_USER_ID,
        data: {
          userId: uid,
        },
      });
      break;
    }
      
    // URL 변경 알림
    case P_TO_B.P_TO_B_URL_CHANGED: {
      session.location = message.data.location;
      break;
    }

    // 세션 정보 요청
    case P_TO_B.P_TO_B_GIVE_ME_SESSION_INFORMATION: {
      if (session.data) {
        send_B_to_P_message({
          key: B_TO_P.B_TO_P_SESSION_INFORMATION_CHANGED,
          data: session.data,
        });
      }
      break;
    }
      
    // 사용자 로드 완료
    case P_TO_B.P_TO_B_LOADED_USER: {
      send_B_to_P_message({
        key: B_TO_P.B_TO_P_CHANGE_URL,
        data: {
          location: session.location || '/home',
        },
      });
      break;
    }
      
    // 세션 일시 중지
    case P_TO_B.P_TO_B_PAUSE_DIGGIN: {
      if (!uid || !session.data) {
        console.error('Background: No user or session data for pause request');
        return;
      }

      if (session.data.state === DigginState.DIGGIN) {
        session.data.state = DigginState.PAUSED;
        updateSessionDuration();
      }
      break;
    }
      
    // Gem 선택
    case P_TO_B.P_TO_B_SELECTED_GEM: {
      const gemId = message.data.gemId;

      if (!uid || !session.data) {
        console.error('Background: No user or session data for gem selection');
        return;
      }

      session.data.selectedGemId = gemId;
      
      // 세션 상태 업데이트
      updateSessionDuration();
      break;
    }

    // 세션 시작
    case P_TO_B.P_TO_B_START_DIGGIN: {
      if (!uid || !session.data) {
        console.error('Background: No user or session data for start request');
        return;
      }

      if (!session.data.selectedGemId) {
        console.error('Background: No selected gem for start request');
        return;
      }

      const gemId = session.data.selectedGemId;

      try {
        // Gem 정보 가져오기
        const gemDoc = await getDoc(doc(firestore, CollectionName.User, uid, CollectionName.Gem, gemId));

        if (!gemDoc.exists()) {
          console.error('Background: Selected gem does not exist');
          return;
        }

        const gemData = gemDoc.data();
        
        // 세션 상태 업데이트
        session.data.state = DigginState.DIGGIN;
        session.data.color = gemData.color;
        session.data.shapeId = gemData.shapeId;
        
        // 관련된 인사이트 조회 (기존 수 파악)
        const insightsRef = collection(firestore, CollectionName.User, uid, CollectionName.Insight);
        const insightsSnapshot = await getDocs(insightsRef);
        
        // 이 Gem에 연결된 인사이트만 필터링
        const gemInsights = insightsSnapshot.docs.filter(doc => {
          const insightData = doc.data();
          return insightData.gemId === gemId;
        });
        
        session.data.numInsights = gemInsights.length;
        
        // 세션 정보 동기화
        updateSessionDuration();
        
        // 팝업에 업데이트된 정보 전송
        send_B_to_P_message({
          key: B_TO_P.B_TO_P_SESSION_INFORMATION_CHANGED,
          data: session.data,
        });
        
        console.log('Background: Session started', session.data);
      } catch (error) {
        console.error('Background: Failed to start session', error);
      }
      break;
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                                3. 확장 이벤트                                */
/* -------------------------------------------------------------------------- */

// 확장 설치 또는 업데이트 시
chrome.runtime.onInstalled.addListener(() => {
  console.log('Background: Extension installed or updated');
  
  // 이미 로그인한 사용자가 있다면 세션 시작
  if (auth.currentUser) {
    startSession(auth.currentUser.uid);
  }
});

// 확장 시작 시
chrome.runtime.onStartup.addListener(() => {
  console.log('Background: Extension started');
  
  // 이미 로그인한 사용자가 있다면 세션 시작
  if (auth.currentUser) {
    startSession(auth.currentUser.uid);
  }
});

// 사용자 인증 상태 변경 시
auth.onAuthStateChanged((user) => {
  console.log('Background: Auth state changed', user ? user.uid : 'No user');
  
  if (user) {
    startSession(user.uid);
  } else {
    // 사용자가 로그아웃했거나 인증이 만료됨
    session.data = undefined;
  }
}); 