import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getHole } from '@shared/services/holeService';
import { getSession, updateSessionDuration, updateSessionActiveStatus, updateSession } from '@shared/services/sessionService';
import { createTextEntry, getSessionEntries } from '@shared/services/textEntryService';
import { Hole, Session, TextEntry } from '@shared/models/types';
import { doc, updateDoc, Timestamp, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@shared/firebase';

interface LocationState {
  holeId: string;
  sessionId: string;
  sessionName: string;
}

// Chrome API 타입 선언
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        sendMessage?: (message: any, responseCallback?: (response: any) => void) => void;
      };
      storage?: {
        local?: {
          get?: (keys: string | string[] | null, callback: (result: any) => void) => void;
          set?: (items: any, callback?: () => void) => void;
          remove?: (keys: string | string[], callback?: () => void) => void;
        };
      };
    };
  }
}

const OnSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [hole, setHole] = useState<Hole | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true); // 세션 실행 상태
  const [displayDuration, setDisplayDuration] = useState(0); // 화면에 표시할 시간 (초)
  const [insights, setInsights] = useState<TextEntry[]>([]); // 인사이트 목록
  const [insightCount, setInsightCount] = useState(0); // 인사이트 개수
  const [isFirstStart, setIsFirstStart] = useState(true); // 첫 시작 여부 플래그

  // 시간 추적을 위한 Ref
  const timerRef = useRef<number | null>(null);
  const savedDurationRef = useRef<number>(0); // Firebase에 저장된 총 누적 시간
  const sessionStartTimeRef = useRef<Date>(new Date()); // 현재 세션 시작 시간
  
  // 세션이 의도적으로 종료되었는지 추적하는 ref
  const sessionIntentionallyEndedRef = useRef(false);
  
  // 현재 세션 시간 계산
  const calculateCurrentDuration = useCallback(() => {
    if (!isActive || !sessionStartTimeRef.current) {
      return savedDurationRef.current;
    }
    
    const currentTime = Date.now();
    const sessionElapsedMs = currentTime - sessionStartTimeRef.current.getTime();
    const sessionElapsedSeconds = Math.floor(sessionElapsedMs / 1000);
    
    return savedDurationRef.current + sessionElapsedSeconds;
  }, [isActive]);

  // 시간 포맷팅 함수
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');

    return formattedTime;
  };

  // Extension context 체크 함수들 (강화된 버전)
  const isExtensionEnvironment = (): boolean => {
    try {
      return typeof chrome !== 'undefined' && 
             chrome.runtime && 
             chrome.runtime.sendMessage && 
             typeof chrome.runtime.sendMessage === 'function';
    } catch (error) {
      console.warn('[DIGGIN] OnSessionPage: Extension environment check failed:', error);
      return false;
    }
  };

  const isChromeRuntimeAvailable = (): boolean => {
    try {
      return typeof chrome !== 'undefined' && 
             !!chrome.runtime && 
             !!chrome.runtime.sendMessage;
    } catch (error) {
      console.warn('[DIGGIN] OnSessionPage: Chrome runtime not available:', error);
      return false;
    }
  };

  // Chrome API 호출을 위한 안전한 래퍼 함수
  const safeChromeMessage = (message: any, callback?: (response: any) => void): Promise<any> => {
    return new Promise((resolve) => {
      if (!isChromeRuntimeAvailable()) {
        console.warn('[DIGGIN] OnSessionPage: Chrome runtime not available, skipping message:', JSON.stringify(message));
        resolve(null);
        return;
      }

      try {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            // Properly serialize the error message to prevent [object Object]
            const errorMessage = chrome.runtime.lastError.message || 'Unknown Chrome runtime error';
            console.warn('[DIGGIN] OnSessionPage: Chrome runtime error:', errorMessage);
            
            // Ensure all error details are properly serialized
            const errorDetails = {
              message: JSON.stringify(message),
              error: errorMessage,
              timestamp: new Date().toISOString()
            };
            console.warn('[DIGGIN] OnSessionPage: Error details:', JSON.stringify(errorDetails));
            resolve(null);
          } else {
            if (callback) callback(response);
            resolve(response);
          }
        });
        
        // 타임아웃 설정 (응답이 없는 경우 대비)
        setTimeout(() => {
          console.warn('[DIGGIN] OnSessionPage: Message timeout after 2 seconds:', JSON.stringify(message));
          resolve(null);
        }, 2000);
      } catch (error) {
        // Properly serialize any caught errors
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('[DIGGIN] OnSessionPage: Error sending Chrome message:', errorMessage);
        
        // Ensure all error details are properly serialized
        const errorDetails = {
          message: JSON.stringify(message),
          error: errorMessage,
          timestamp: new Date().toISOString()
        };
        console.error('[DIGGIN] OnSessionPage: Error details:', JSON.stringify(errorDetails));
        resolve(null);
      }
    });
  };

  // 세션 정보 로드
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/', { replace: true });
        return;
      }

      if (!state?.holeId || !state?.sessionId) {
        navigate('/hole-list', { replace: true });
        return;
      }

      try {
        setLoading(true);
        
        // 먼저 백그라운드에서 세션 상태 가져오기 시도 (안전한 방식)
        const getBackgroundSessionState = async (): Promise<{isActive: boolean, duration: number} | null> => {
          if (!isChromeRuntimeAvailable()) {
            console.warn('[DIGGIN] OnSessionPage: Chrome runtime not available, skipping background session check');
            return null;
          }

          try {
            const response = await safeChromeMessage({ 
              action: 'GET_SESSION_STATUS',
              sessionId: state.sessionId
            });
            
            console.log('Background session status response:', response);
            if (response && response.sessionId === state.sessionId) {
              return {
                isActive: response.isActive,
                duration: response.duration
              };
            }
            return null;
          } catch (error) {
            console.error('[DIGGIN] OnSessionPage: Error getting background session state:', error);
            return null;
          }
        };
        
        const backgroundState = await getBackgroundSessionState();
        
        // 홀 정보 가져오기
        const holeData = await getHole(state.holeId);
        if (!holeData) {
          throw new Error('Hole not found');
        }
        
        setHole(holeData);
        
        // 세션 정보 가져오기
        const sessionData = await getSession(state.sessionId);
        if (!sessionData) {
          throw new Error('Session not found');
        }
        
        setSession(sessionData);
        
        // 기존 시간 설정 - 백그라운드 상태와 Firestore 중 더 큰 값 사용
        let initialDuration = 0;
        
        if (backgroundState && typeof backgroundState.duration === 'number') {
          console.log(`Using duration from background: ${backgroundState.duration} seconds`);
          initialDuration = backgroundState.duration;
        } 
        
        if (typeof sessionData.totalDuration === 'number') {
          console.log(`Using duration from Firestore: ${sessionData.totalDuration} seconds`);
          initialDuration = Math.max(initialDuration, sessionData.totalDuration);
        }
        
        console.log(`Setting initial duration to ${initialDuration} seconds`);
        savedDurationRef.current = initialDuration;
        setDisplayDuration(initialDuration);
        
        // 세션이 백그라운드에서 이미 활성화 상태인지 확인
        const isAlreadyActive = backgroundState ? backgroundState.isActive : false;
        
        if (!isAlreadyActive) {
          // 세션을 활성 상태로 설정
          await updateSessionActiveStatus(state.sessionId, true);
          setIsActive(true);
          
          // 현재 세션 시작 시간 설정
          sessionStartTimeRef.current = new Date();
          
          // 백그라운드 스크립트에 세션 시작 알림 (안전한 방식)
          const startResponse = await safeChromeMessage({ 
            action: 'START_SESSION',
            data: {
              sessionId: state.sessionId,
              holeId: state.holeId,
              sessionName: state.sessionName,
              savedDuration: initialDuration
            }
          });
          
          if (startResponse && startResponse.success) {
            console.log('[DIGGIN] OnSessionPage: Session started in background script');
            setIsFirstStart(false);
          } else {
            console.warn('[DIGGIN] OnSessionPage: Failed to start session in background, continuing without extension features');
          }
        } else {
          // 이미 활성화된 세션이면 상태만 동기화
          setIsActive(true);
          sessionStartTimeRef.current = new Date();
          console.log('Session is already active in background, syncing state');
          
          // 백그라운드에 세션 계속 요청 (안전한 방식)
          await safeChromeMessage({ 
            action: 'SESSION_CONTINUE',
            data: {
              sessionId: state.sessionId,
              holeId: state.holeId,
              sessionName: state.sessionName,
              savedDuration: initialDuration
            }
          });
        }
        
        // 인사이트 로드
        const insightData = await getSessionEntries(state.sessionId);
        setInsights(insightData.entries);
        setInsightCount(insightData.entries.length);
        
        // Log detailed information for each entry
        if (insightData.entries.length > 0) {
          console.log('📋 Detailed insights list:');
          const entriesCollection = collection(db, 'textEntries');
          
          // Use for...of loop to allow sequential async execution
          for (const [index, entry] of insightData.entries.entries()) {
            console.log(`  ${index + 1}. Content: "${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}"`);
            console.log(`     URL: ${entry.sourceUrl || 'No URL'}`);
            console.log(`     Domain: ${entry.sourceDomain || 'No domain'}`);
            console.log(`     Timestamp: ${entry.capturedAt ? new Date(entry.capturedAt.toDate()).toLocaleString() : 'No timestamp'}`);
            console.log(`     Entry ID: ${entry.id || 'No ID'}`);
            console.log('     ---');
            
            try {
              const docRef = await addDoc(entriesCollection, {
                sessionId: sessionData.id,
                holeId: holeData.id,
                content: `${entry.content || 'No content'}`,
                sourceUrl: `${entry.sourceUrl || 'No URL'}`,
                sourceDomain: `${entry.sourceDomain || 'No domain'}`,
                capturedAt: serverTimestamp(),
                isBookmarked: false
              });
              console.log(`✅ Successfully saved entry ${index + 1} with ID: ${docRef.id}`);
            } catch (error) {
              console.error(`❌ Failed to save entry ${index + 1}:`, error);
            }
          }
        } else {
          console.log('📋 No insights found in the list');
        }
        
      } catch (err) {
        console.error('데이터 로드 실패:', err);
        setError('세션 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, state]);

  // 타이머 시작
  const startTimer = useCallback(() => {
    if (timerRef.current !== null) {
      console.log("Timer already running, clearing previous timer");
      window.clearInterval(timerRef.current);
    }
    
    // 현재 표시 시간 (초) 가져오기
    const startingDuration = savedDurationRef.current;
    console.log(`Starting timer with saved duration: ${startingDuration} seconds`);
    
    // 시작 시간 설정
    setDisplayDuration(startingDuration);
    
    // 정확히 1초씩 증가하는 타이머 설정
    timerRef.current = window.setInterval(() => {
      setDisplayDuration(prev => {
        const newDuration = prev + 1;
        
        // Firebase에 업데이트 (1분마다)
        if (newDuration % 60 === 0) {
          if (session?.id) {
            updateSessionDuration(session.id, newDuration).catch(console.error);
          }
          savedDurationRef.current = newDuration;
        }
        
        return newDuration;
      });
    }, 1000);
    
    console.log("Timer started with interval ID:", timerRef.current);
  }, [session]);

  const handleBackClick = () => {
    // 뒤로 가기 시 현재 시간 저장
    if (session && isActive) {
      updateSessionDuration(session.id, displayDuration).catch(console.error);
    }
    
    navigate('/session-list', { state: { holeId: state.holeId } });
  };

  const saveCurrentTime = async () => {
    if (!session) return;
    
    try {
      const currentDuration = calculateCurrentDuration();
      await updateSessionDuration(session.id, currentDuration);
      savedDurationRef.current = currentDuration;
    } catch (err) {
      console.error('시간 저장 실패:', err);
    }
  };

  const finishSession = async () => {
    try {
      // 세션이 의도적으로 종료되었음을 표시
      sessionIntentionallyEndedRef.current = true;
      console.log('[DIGGIN] OnSessionPage: Session intentionally ended by user (Stop button)');
      
      setLoading(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // 세션 비활성화
      setIsActive(false);

      // 브라우저 로컬 스토리지에서 활성 세션 정보 삭제 및 세션 종료 표시
      localStorage.removeItem('activeSession');
      localStorage.setItem('sessionEnded', 'true');

      // 1분 후에 sessionEnded 플래그 자동 제거
      setTimeout(() => {
        localStorage.removeItem('sessionEnded');
        console.log('[DIGGIN] OnSessionPage: Cleared sessionEnded flag after timeout');
      }, 60000);

      const sessionRef = doc(db, 'sessions', state.sessionId);
      
      // 최종 세션 시간 계산
      let finalDuration = savedDurationRef.current;
      if (sessionStartTimeRef.current) {
        const now = new Date();
        finalDuration += Math.floor((now.getTime() - sessionStartTimeRef.current.getTime()) / 1000);
      }
      
      // Firestore에 최종 세션 정보 업데이트
      await updateDoc(sessionRef, {
        totalDuration: finalDuration,
        isActive: false,
        endedAt: Timestamp.now()
      });
      
      // 백그라운드 서비스에 세션 종료 알림 (안전한 방식)
      const endResponse = await safeChromeMessage({
        action: 'END_SESSION',
        data: { sessionId: state.sessionId }
      });
      
      if (endResponse?.success) {
        console.log('[DIGGIN] OnSessionPage: Session ended with final duration:', endResponse.finalDuration);
      } else {
        console.warn('[DIGGIN] OnSessionPage: Extension not available, session ended locally only');
      }
      
      // 다이얼로그 표시
      navigate('/finish-session', {
        state: {
          holeId: state.holeId,
          sessionId: state.sessionId,
          sessionName: state.sessionName,
          duration: finalDuration,
          insightCount: insightCount
        }
      });
    } catch (error) {
      console.error('[DIGGIN] OnSessionPage: Error finishing session:', error);
      setError('Failed to finish the session');
    } finally {
      setLoading(false);
    }
  };

  // 세션 상태 관리
  const toggleSession = useCallback(async () => {
    if (!session) return;

    try {
      if (isActive) {
        // 세션 일시 정지
        setIsActive(false);
        
        // 타이머 정지
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        
        // 현재 시간 계산
        const currentTime = new Date();
        const startTime = new Date(sessionStartTimeRef.current);
        const elapsedTime = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
        const totalDuration = savedDurationRef.current + elapsedTime;
        savedDurationRef.current = totalDuration;
        
        // Firestore에 세션 상태 업데이트
        console.log('[DIGGIN] OnSessionPage: Updating Firestore - Setting session inactive, duration:', totalDuration);
        await updateSessionActiveStatus(session.id, false);
        await updateSessionDuration(session.id, totalDuration);
        console.log('[DIGGIN] OnSessionPage: Firestore update completed - Session paused');
        
        // 백그라운드 스크립트에 세션 일시 정지 알림 (안전한 방식)
        console.log('[DIGGIN] OnSessionPage: Sending PAUSE_SESSION to Realtime Database');
        const pauseResponse = await safeChromeMessage({ 
          action: 'PAUSE_SESSION',
          data: {
            sessionId: session.id,
            holeId: hole?.id || '',
            sessionName: session.name
          }
        });
        
        if (pauseResponse && pauseResponse.savedDuration !== undefined) {
          savedDurationRef.current = pauseResponse.savedDuration;
          console.log('[DIGGIN] OnSessionPage: Updated savedDuration from Realtime DB:', pauseResponse.savedDuration);
        }
        
        // 추가: 현재 상태 확인을 위한 명시적 쿼리 (안전한 방식)
        await safeChromeMessage({ action: 'GET_SESSION_STATE' });
      } else {
        // 세션 시작/재개
        setIsActive(true);
        
        // 시작 시간 설정
        sessionStartTimeRef.current = new Date();
        
        // 타이머 시작
        if (!timerRef.current) {
          timerRef.current = setInterval(() => {
            const now = new Date();
            const startTime = new Date(sessionStartTimeRef.current);
            const elapsedTime = Math.floor((now.getTime() - startTime.getTime()) / 1000);
            const totalDuration = savedDurationRef.current + elapsedTime;
            setDisplayDuration(totalDuration);
          }, 1000);
        }
        
        // Firestore에 세션 상태 업데이트
        console.log('[DIGGIN] OnSessionPage: Updating Firestore - Setting session active');
        await updateSessionActiveStatus(session.id, true);
        console.log('[DIGGIN] OnSessionPage: Firestore update completed - Session resumed');
        
        // 백그라운드 스크립트에 세션 시작/재개 알림 (안전한 방식)
        console.log('[DIGGIN] OnSessionPage: Sending RESUME_SESSION to Realtime Database');
        await safeChromeMessage({ 
          action: 'RESUME_SESSION',
          data: {
            sessionId: session.id,
            holeId: hole?.id || '',
            sessionName: session.name,
            savedDuration: savedDurationRef.current
          }
        });
        
        // 추가: 현재 상태 확인을 위한 명시적 쿼리 (안전한 방식)
        await safeChromeMessage({ action: 'GET_SESSION_STATE' });
      }
    } catch (err) {
      console.error('세션 상태 변경 실패:', err);
      alert('세션 상태를 변경하는데 실패했습니다.');
    }
  }, [isActive, session, saveCurrentTime]);

  // 세션 정지
  const stopTimer = useCallback(async () => {
    if (!session) return;

    try {
      setIsActive(false);
      
      // 타이머 정지
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // 현재 시간 계산
      const currentTime = new Date();
      let totalDuration = savedDurationRef.current;
      
      if (isActive && sessionStartTimeRef.current) {
        const startTime = new Date(sessionStartTimeRef.current);
        const elapsedTime = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
        totalDuration += elapsedTime;
      }
      
      // Firestore에 세션 상태 업데이트
      await updateSessionActiveStatus(session.id, false);
      await updateSessionDuration(session.id, totalDuration);
      
      // 백그라운드 스크립트에 세션 중지 알림 (안전한 방식)
      const stopResponse = await safeChromeMessage({ 
        action: 'END_SESSION',
        data: {
          sessionId: session.id,
          holeId: hole?.id || ''
        }
      });
      
      if (stopResponse && stopResponse.finalDuration !== undefined) {
        const finalDuration = stopResponse.finalDuration;
        console.log('[DIGGIN] OnSessionPage: Final session duration:', finalDuration);
      }
      
      // 클립보드 연결 요청 및 로깅 (안전한 방식)
      if (isChromeRuntimeAvailable()) {
        try {
          const port = chrome.runtime.connect({ name: "clipboard" });
          port.postMessage({ 
            action: 'CONNECTION_TEST',
            timestamp: Date.now()
          });
          console.log('[DIGGIN] OnSessionPage: Clipboard connection established before unmount');
        } catch (err) {
          console.error('[DIGGIN] OnSessionPage: Failed to establish clipboard connection:', err);
        }
      }
    } catch (err) {
      console.error('Failed to stop timer:', err);
    }
  }, [isActive, session, navigate]);

  // 세션 시작 시 타이머 시작
  useEffect(() => {
    console.log("Session timer effect triggered", { 
      hasSession: !!session, 
      loading, 
      isActive, 
      timerRunning: timerRef.current !== null
    });
    
    if (session && !loading && isActive) {
      console.log("Starting timer from effect");
      startTimer();
    }
    
    return () => {
      if (timerRef.current !== null) {
        console.log("Clearing timer on unmount from timer effect");
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [session, loading, isActive, startTimer]);

  // 페이지 가시성 변경 감지 (탭 전환 등)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 페이지가 백그라운드로 갔을 때 세션 시간 저장
        if (session && isActive) {
          console.log(`Saving duration on visibility change: ${displayDuration} seconds`);
          updateSessionDuration(session.id, displayDuration).catch(console.error);
          
          // 누적 시간 업데이트
          savedDurationRef.current = displayDuration;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [session, isActive, displayDuration]);

  // 클립보드 이벤트 핸들러
  const handleCopy = useCallback(async (e: ClipboardEvent) => {
    console.log('Copy event detected!');
    
    if (!session || !hole || !auth.currentUser) {
      console.log('Missing required data:', { 
        hasSession: !!session, 
        hasHole: !!hole, 
        hasUser: !!auth.currentUser 
      });
      return;
    }

    try {
      // 복사된 텍스트 가져오기
      let copiedText;
      try {
        copiedText = await navigator.clipboard.readText();
      } catch (clipboardError) {
        console.log('Failed to read clipboard:', clipboardError);
        // clipboardData로 폴백
        copiedText = e.clipboardData?.getData('text/plain');
      }

      if (!copiedText) {
        console.log('No text content found in clipboard');
        return;
      }
      console.log('Copied text:', copiedText);

      // 현재 URL 및 도메인 가져오기
      const currentUrl = window.location.href;
      let sourceDomain;
      try {
        sourceDomain = new URL(currentUrl).hostname;
      } catch (error) {
        console.error('Failed to extract domain:', error);
        sourceDomain = 'unknown';
      }
      
      console.log('Current URL:', currentUrl, 'Domain:', sourceDomain);

      // Firebase에 직접 저장
      console.log('Creating text entry in Firebase with data:', {
        sessionId: session.id,
        content: copiedText,
        sourceUrl: currentUrl,
        sourceDomain
      });
      
      // Firestore 컬렉션 참조
      const entriesCollection = collection(db, 'textEntries');
      const docRef = await addDoc(entriesCollection, {
        sessionId: session.id,
        holeId: hole.id,
        content: copiedText,
        sourceUrl: currentUrl,
        sourceDomain,
        capturedAt: serverTimestamp(),
        isBookmarked: false
      });
      
      console.log('Text entry successfully saved to Firebase with ID:', docRef.id);

      // 인사이트 목록 새로고침
      console.log('Refreshing insights list...');
      const insightData = await getSessionEntries(session.id);
      setInsights(insightData.entries);
      setInsightCount(insightData.entries.length);
      console.log('Insights list updated:', { 
        totalInsights: insightData.entries.length,
        latestInsight: insightData.entries[0]
      });
      
      // Log detailed information for each entry
      if (insightData.entries.length > 0) {
        console.log('📋 Detailed insights list:');
        const entriesCollection = collection(db, 'textEntries');
        
        // Use for...of loop to allow sequential async execution
        for (const [index, entry] of insightData.entries.entries()) {
          console.log(`  ${index + 1}. Content: "${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}"`);
          console.log(`     URL: ${entry.sourceUrl || 'No URL'}`);
          console.log(`     Domain: ${entry.sourceDomain || 'No domain'}`);
          console.log(`     Timestamp: ${entry.capturedAt ? new Date(entry.capturedAt.toDate()).toLocaleString() : 'No timestamp'}`);
          console.log(`     Entry ID: ${entry.id || 'No ID'}`);
          console.log('     ---');
          
          try {
            const docRef = await addDoc(entriesCollection, {
              sessionId: session.id,
              holeId: hole.id,
              content: `${entry.content || 'No content'}`,
              sourceUrl: `${entry.sourceUrl || 'No URL'}`,
              sourceDomain: `${entry.sourceDomain || 'No domain'}`,
              capturedAt: serverTimestamp(),
              isBookmarked: false
            });
            console.log(`✅ Successfully saved entry ${index + 1} with ID: ${docRef.id}`);
          } catch (error) {
            console.error(`❌ Failed to save entry ${index + 1}:`, error);
          }
        }

      console.log('Refreshing insights list...');
      const insightData = await getSessionEntries(session.id);
      setInsights(insightData.entries);
      setInsightCount(insightData.entries.length);
      console.log('Insights list updated:', { 
        totalInsights: insightData.entries.length,
        latestInsight: insightData.entries[0]
      });

      insightData.entries = [];
      console.log('🗑️ Cleared insightData.entries array');
        
      } else {
        console.log('📋 No insights found in the list');
      }
    } catch (err) {
      console.error('Failed to save copied text:', err);
    }
  }, [session, hole]);

  // 컴포넌트 마운트 시 이벤트 리스너 추가
  useEffect(() => {
    if (isActive) {
      document.addEventListener('copy', handleCopy);
    }

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [isActive, handleCopy]);

  // Process pending items from Chrome storage and send to Firebase
  const processPendingItems = useCallback(async () => {
    console.log('🔍 [DEBUG] processPendingItems called in OnSessionPage');
    
    // Check if Chrome extension API is available
    if (!window.chrome?.runtime?.sendMessage) {
      console.log('🚫 [DEBUG] Chrome extension API not available');
      return;
    }
    console.log('✅ [DEBUG] Chrome extension API is available');

    // Check if we have session data
    if (!session || !hole) {
      console.log('❌ [DEBUG] No session or hole data available:', { hasSession: !!session, hasHole: !!hole });
      return;
    }
    console.log('✅ [DEBUG] Session and hole data available');

    try {
      console.log('🔄 [DEBUG] Starting to process pending items...');
      
      // Get pending items from background script
      console.log('📤 [DEBUG] Sending GET_PENDING_ITEMS message to background');
      const response = await new Promise<any>((resolve) => {
        window.chrome!.runtime!.sendMessage(
          { action: 'GET_PENDING_ITEMS' },
          (response) => {
            console.log('📥 [DEBUG] Received response from background:', response);
            resolve(response);
          }
        );
      });

      if (!response?.success) {
        console.log('❌ [DEBUG] Response not successful:', response);
        return;
      }

      if (!response.pendingItems) {
        console.log('📋 [DEBUG] No pendingItems in response');
        return;
      }

      if (!response.pendingItems.length) {
        console.log('📋 [DEBUG] pendingItems array is empty');
        return;
      }

      console.log(`📋 [DEBUG] Found ${response.pendingItems.length} pending items to process`);
      console.log('📋 [DEBUG] Pending items:', response.pendingItems);
      
      let successCount = 0;
      let failCount = 0;

      console.log(`🎯 [DEBUG] Target session ID: ${session.id}`);

      // Process each pending item using the same logic as copy event
      for (const item of response.pendingItems) {
        try {
          console.log(`⚙️ [DEBUG] Processing item: ${item.content.substring(0, 50)}...`);
          console.log(`⚙️ [DEBUG] Item URL: ${item.url || 'No URL'}`);
          
          // Save directly to Firebase using the same logic as in the copy handler
          const entriesCollection = collection(db, 'textEntries');
          const docRef = await addDoc(entriesCollection, {
            sessionId: session.id,
            holeId: hole.id,
            content: item.content,
            sourceUrl: item.url || '',
            sourceDomain: item.url ? new URL(item.url).hostname : 'unknown',
            capturedAt: serverTimestamp(),
            isBookmarked: false
          });
          
          successCount++;
          console.log(`✅ [DEBUG] Successfully processed item with ID ${docRef.id}: ${item.content.substring(0, 30)}...`);
        } catch (error) {
          failCount++;
          console.error(`❌ [DEBUG] Failed to process item: ${item.content.substring(0, 30)}...`, error);
        }
      }

      console.log(`📊 [DEBUG] Processing complete: ${successCount} success, ${failCount} failed`);

      // Clear pending items if all were processed successfully
      if (failCount === 0) {
        console.log('🧹 [DEBUG] Clearing pending items from storage...');
        await new Promise<void>((resolve) => {
          window.chrome!.runtime!.sendMessage(
            { action: 'CLEAR_PENDING_ITEMS' },
            (clearResponse: any) => {
              console.log('🧹 [DEBUG] Clear response:', clearResponse);
              if (clearResponse?.success) {
                console.log('✅ [DEBUG] Pending items cleared from storage');
              } else {
                console.error('❌ [DEBUG] Failed to clear pending items:', clearResponse?.error);
              }
              resolve();
            }
          );
        });

        // Refresh insights list to show newly added items
        console.log('🔄 [DEBUG] Refreshing insights list...');
        const insightData = await getSessionEntries(session.id);
        setInsights(insightData.entries);
        setInsightCount(insightData.entries.length);
        console.log('✅ [DEBUG] Insights list refreshed - new count:', insightData.entries.length);
        
        // Log detailed information for each entry
        if (insightData.entries.length > 0) {
          console.log('📋 [DEBUG] Detailed insights list after processing pending items:');
          insightData.entries.forEach((entry, index) => {
            console.log(`  ${index + 1}. Content: "${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}"`);
            console.log(`     URL: ${entry.sourceUrl || 'No URL'}`);
            console.log(`     Domain: ${entry.sourceDomain || 'No domain'}`);
            console.log(`     Timestamp: ${entry.capturedAt ? new Date(entry.capturedAt.toDate()).toLocaleString() : 'No timestamp'}`);
            console.log(`     Entry ID: ${entry.id || 'No ID'}`);
            console.log('     ---');
          });
        } else {
          console.log('📋 [DEBUG] No insights found in the list after processing');
        }
      }
    } catch (error) {
      console.error('💥 [DEBUG] Error processing pending items:', error);
    }
  }, [session, hole]);

  // Auto-process pending items when session and hole data are loaded
  useEffect(() => {
    console.log('🔍 [DEBUG] useEffect for processPendingItems triggered in OnSessionPage');
    console.log('🔍 [DEBUG] Conditions - session:', !!session, 'hole:', !!hole, 'loading:', loading);
    
    if (session && hole && !loading) {
      console.log('✅ [DEBUG] All conditions met, calling processPendingItems in OnSessionPage');
      processPendingItems();
    } else {
      console.log('❌ [DEBUG] Conditions not met for processPendingItems in OnSessionPage');
    }
  }, [session, hole, loading, processPendingItems]);

  // 컴포넌트 로드 시 세션 시작
  useEffect(() => {
    console.log('[DIGGIN] OnSessionPage: Component mounted');
    
    async function initSession() {
      let sessionId = state?.sessionId;
      let holeId = state?.holeId;
      let sessionName = state?.sessionName;
      
      // state가 없는 경우 (직접 /session 접근 또는 활성 세션 자동 로드)
      if (!sessionId || !holeId) {
        console.log('[DIGGIN] OnSessionPage: Missing state, checking for active session');
        
        try {
          // 활성 세션 확인 (안전한 방식)
          const activeSession = await safeChromeMessage({ action: 'CHECK_ACTIVE_SESSION' });
          
          if (activeSession?.success && activeSession?.hasActiveSession && activeSession?.activeSession) {
            const sessionData = activeSession.activeSession;
            sessionId = sessionData.sessionId;
            holeId = sessionData.holeId;
            sessionName = sessionData.sessionName || '';
            console.log('[DIGGIN] OnSessionPage: Using active session data:', { sessionId, holeId, sessionName });
          } else {
            console.log('[DIGGIN] OnSessionPage: No active session found');
            navigate('/');
            return;
          }
        } catch (error) {
          console.error('[DIGGIN] OnSessionPage: Error getting active session:', error);
          navigate('/');
          return;
        }
      }
      
      // Realtime Database 세션 상태 확인 (안전한 방식)
      await safeChromeMessage({ action: 'GET_SESSION_STATE' });

      // 백그라운드 스크립트에 세션 시작 알림 (안전한 방식)
      const startResponse = await safeChromeMessage({
        action: 'START_SESSION',
        data: {
          sessionId,
          holeId,
          sessionName
        }
      });
      
      if (startResponse?.success) {
        console.log('[DIGGIN] OnSessionPage: Session started in Realtime Database successfully');
      } else {
        console.warn('[DIGGIN] OnSessionPage: Extension not available, continuing without extension features');
      }
    }
    
    initSession();
    
    // 컴포넌트 언마운트 시 세션 종료 대신 계속 유지 메시지 전송
    return () => {
      console.log('[DIGGIN] OnSessionPage: Component unmounting');
      
      // 세션이 의도적으로 종료된 경우 (Stop 버튼 클릭) SESSION_CONTINUE 메시지를 보내지 않음
      if (sessionIntentionallyEndedRef.current) {
        console.log('[DIGGIN] OnSessionPage: Session was intentionally ended, not sending SESSION_CONTINUE');
        return;
      }
      
      console.log('[DIGGIN] OnSessionPage: Session was not ended, sending SESSION_CONTINUE');
      
      if (!session) {
        console.log('[DIGGIN] OnSessionPage: No session data available on unmount');
        if (state?.sessionId) {
          // state만 있는 경우 (세션 데이터 로드 전에 언마운트 된 경우) - 안전한 방식
          safeChromeMessage({
            action: 'SESSION_CONTINUE',
            data: {
              sessionId: state.sessionId,
              holeId: state.holeId,
              sessionName: state.sessionName
            }
          });
        }
        return;
      }
      
      const finalDuration = calculateCurrentDuration();
      console.log('[DIGGIN] OnSessionPage: Final duration on unmount:', finalDuration, 'seconds');
      
      // Firestore에 마지막 시간 저장 (선택적)
      if (session.id) {
        updateSessionDuration(session.id, finalDuration)
          .then(() => {
            console.log('[DIGGIN] OnSessionPage: Duration saved to Firestore on unmount');
          })
          .catch(error => {
            console.error('[DIGGIN] OnSessionPage: Error saving duration to Firestore on unmount:', error);
          });
      }
      
      // 백그라운드 스크립트에 세션 계속 유지 신호 전송 (안전한 방식)
      safeChromeMessage({
        action: 'SESSION_CONTINUE',
        data: {
          sessionId: session.id,
          holeId: hole?.id || state?.holeId,
          sessionName: session.name || state?.sessionName,
          savedDuration: finalDuration
        }
      });
      
      // 클립보드 연결 요청 및 로깅 (안전한 방식)
      if (isChromeRuntimeAvailable()) {
        try {
          const port = chrome.runtime.connect({ name: "clipboard" });
          port.postMessage({ 
            action: 'CONNECTION_TEST',
            timestamp: Date.now()
          });
          console.log('[DIGGIN] OnSessionPage: Clipboard connection established before unmount');
        } catch (err) {
          console.error('[DIGGIN] OnSessionPage: Failed to establish clipboard connection:', err);
        }
      }
    };
  }, [calculateCurrentDuration, navigate, state, session, hole]);

  // 아이콘 ID로 아이콘 가져오기
  const getIconById = (iconId: string): React.ReactNode => {
    // Utility 아이콘
    if (iconId === 'utility-1') return <Icons.SearchIcon />;
    if (iconId === 'utility-2') return <Icons.AddIcon />;
    if (iconId === 'utility-3') return <Icons.EditIcon />;
    if (iconId === 'utility-4') return <Icons.TrashIcon />;
    if (iconId === 'utility-5') return <Icons.CheckIcon />;
    if (iconId === 'utility-6') return <Icons.CloseIcon />;
    if (iconId === 'utility-7') return <Icons.InfoIcon />;
    if (iconId === 'utility-8') return <Icons.LinkIcon />;
    if (iconId === 'utility-9') return <Icons.SettingIcon />;
    if (iconId === 'utility-10') return <Icons.FilterIcon />;
    
    // Media 아이콘
    if (iconId === 'media-1') return <Icons.PlayIcon />;
    if (iconId === 'media-2') return <Icons.PauseIcon />;
    if (iconId === 'media-3') return <Icons.StopIcon />;
    if (iconId === 'media-4') return <Icons.ArchiveIcon />;
    if (iconId === 'media-5') return <Icons.HideTabIcon />;
    if (iconId === 'media-6') return <Icons.HighlightIcon />;
    if (iconId === 'media-7') return <Icons.SortIcon />;
    if (iconId === 'media-8') return <Icons.ReorderIcon />;
    if (iconId === 'media-9') return <Icons.OverflowIcon />;
    if (iconId === 'media-10') return <Icons.ChevronRightIcon />;
    
    // Other 아이콘
    if (iconId === 'other-1') return <Icons.TimeIcon />;
    if (iconId === 'other-2') return <Icons.HourglassIcon />;
    if (iconId === 'other-3') return <Icons.LightbulbIcon />;
    if (iconId === 'other-4') return <Icons.TripleStarsIcon />;
    if (iconId === 'other-5') return <Icons.BackIcon />;

    return <Icons.InfoIcon />; // Default icon as fallback
  };

  if (loading) {
    return (
      <div className="w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center">
        <p className="text-text-primary-light dark:text-text-primary-dark">로딩 중...</p>
      </div>
    );
  }

  if (error || !hole || !session) {
    return (
      <div className="w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4">{error || '세션 정보를 찾을 수 없습니다.'}</p>
        <Button variant="secondary" size="md" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Top Navigation */}
      <div className="self-stretch h-12 px-3 border-b border-line-tertiary-light dark:border-line-tertiary-dark inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <div className="rounded flex justify-start items-center gap-2">
            <Button
              variant="tertiary"
              size="sm"
              isIconOnly
              onClick={handleBackClick}
              leftIcon={<Icons.BackIcon />}
              showLeftIcon
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
            {hole.icon && getIconById(hole.icon)}
          </div>
          <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug">
            {hole.name}
          </div>
        </div>
        <div className="rounded flex justify-start items-center gap-2"></div>
      </div>

      {/* Main Content */}
      <div className="self-stretch flex-1 py-5 rounded-2xl flex flex-col justify-center items-center gap-10">
        <div className="self-stretch flex-1 flex flex-col justify-start items-center gap-5">
          <div className="self-stretch text-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium leading-snug">
            {session.name}
          </div>
          
          <div className="self-stretch flex-1 flex flex-col justify-center items-center">
            <div className="w-28 h-28 bg-gray-200 rounded-[100px]"></div>
          </div>
          
          <div className="self-stretch flex flex-col justify-start items-center gap-2">
            <div className="self-stretch px-2 inline-flex justify-start items-start gap-2 flex-wrap content-start">
              <div className="flex-1 px-3 py-2 bg-fill-onsurface-light dark:bg-fill-onsurface-dark rounded-lg inline-flex flex-col justify-start items-center gap-2">
                <div className="inline-flex justify-center items-center gap-1">
                  <div className="w-4 h-4 relative flex items-center justify-center">
                    <Icons.TimeIcon className="w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" />
                  </div>
                  <div className="text-center text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-none">
                    Time Spent
                  </div>
                </div>
                <div className={`text-center text-base font-medium leading-snug ${
                  isActive 
                    ? 'text-text-primary-light dark:text-text-primary-dark' 
                    : 'text-text-tertiary-light dark:text-text-tertiary-dark'
                }`}>
                  {formatDuration(displayDuration)}
                </div>
              </div>
              
              <div className="flex-1 px-3 py-2 bg-fill-onsurface-light dark:bg-fill-onsurface-dark rounded-lg inline-flex flex-col justify-start items-center gap-2">
                <div className="inline-flex justify-center items-center gap-1">
                  <div className="w-4 h-4 relative flex items-center justify-center">
                    <Icons.LightbulbIcon className="w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" />
                  </div>
                  <div className="text-center text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-none">
                    Insights Collected
                  </div>
                </div>
                <div className={`text-center text-base font-medium leading-snug ${
                  isActive 
                    ? 'text-text-primary-light dark:text-text-primary-dark' 
                    : 'text-text-tertiary-light dark:text-text-tertiary-dark'
                }`}>
                  {insightCount}
                </div>
              </div>
            </div>
          </div>
          
          <div className="inline-flex justify-start items-center gap-3">
            <button
              onClick={toggleSession}
              className="w-12 h-12 p-3 bg-fill-primary-light dark:bg-fill-primary-dark text-icon-inverted-light dark:text-icon-inverted-dark rounded-[20px] flex justify-center items-center gap-2.5"
            >
              {isActive ? (
                <Icons.PauseIcon className="w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" />
              ) : (
                <Icons.PlayIcon className="w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" />
              )}
            </button>
            
            <button
              className="w-12 h-12 p-3 bg-fill-onsurface-light dark:bg-fill-onsurface-dark rounded-[20px] flex justify-center items-center"
              onClick={finishSession}
            >
              <Icons.StopIcon className="w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnSessionPage;