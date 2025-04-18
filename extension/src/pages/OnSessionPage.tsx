import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getHole } from '@shared/services/holeService';
import { getSession, updateSessionDuration, updateSessionActiveStatus } from '@shared/services/sessionService';
import { createTextEntry, getSessionEntries } from '@shared/services/textEntryService';
import { Hole, Session, TextEntry } from '@shared/models/types';

interface LocationState {
  holeId: string;
  sessionId: string;
  sessionName: string;
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

  // 시간 추적을 위한 Ref
  const timerRef = useRef<number | null>(null);
  const savedDurationRef = useRef<number>(0); // Firebase에 저장된 총 누적 시간
  const sessionStartTimeRef = useRef<number>(0); // 현재 세션 시작 시간
  
  // 현재 세션 시간 계산
  const calculateCurrentDuration = useCallback(() => {
    if (!isActive || sessionStartTimeRef.current === 0) {
      return savedDurationRef.current;
    }
    
    const currentTime = Date.now();
    const sessionElapsedMs = currentTime - sessionStartTimeRef.current;
    const sessionElapsedSeconds = Math.floor(sessionElapsedMs / 1000);
    
    return savedDurationRef.current + sessionElapsedSeconds;
  }, [isActive]);

  // 시간 포맷팅 함수
  const formatDuration = (seconds: number): string => {
    console.log("Formatting duration (seconds):", seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');

    console.log(`Formatted time: ${formattedTime} (${hours}h ${minutes}m ${secs}s)`);
    return formattedTime;
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
        
        // 기존 시간 설정
        console.log("Session loaded, totalDuration from Firebase:", sessionData.totalDuration);
        if (typeof sessionData.totalDuration === 'number') {
          console.log(`Setting initial duration to ${sessionData.totalDuration} seconds`);
          const storedDuration = sessionData.totalDuration;
          savedDurationRef.current = storedDuration;
          setDisplayDuration(storedDuration);
        } else {
          // totalDuration이 없는 경우 0으로 초기화
          console.log("No totalDuration found, initializing to 0");
          savedDurationRef.current = 0;
          setDisplayDuration(0);
          // Firebase에 초기 시간 데이터 저장
          await updateSessionDuration(state.sessionId, 0);
        }
        
        // 세션을 활성 상태로 설정
        await updateSessionActiveStatus(state.sessionId, true);
        setIsActive(true);
        
        // 현재 세션 시작 시간 설정
        sessionStartTimeRef.current = Date.now();
        
        // 인사이트 로드
        const insightData = await getSessionEntries(state.sessionId);
        setInsights(insightData.entries);
        setInsightCount(insightData.entries.length);
        
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
        console.log(`Timer tick: ${prev} → ${newDuration} seconds`);
        
        // Firebase에 업데이트 (1분마다)
        if (newDuration % 60 === 0) {
          console.log(`Updating Firebase duration to ${newDuration} seconds`);
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

  // 타이머 정지 
  const stopTimer = useCallback(async () => {
    console.log(`Stopping timer. Current timer ID: ${timerRef.current}`);

    if (timerRef.current === null) {
      console.log("Timer not running, nothing to stop");
      return;
    }
    
    window.clearInterval(timerRef.current);
    timerRef.current = null;
    
    // 현재 표시 시간을 기준으로 저장
    const currentDuration = displayDuration;
    console.log(`Current total duration: ${currentDuration} seconds`);
    
    // 누적 시간 업데이트
    savedDurationRef.current = currentDuration;
    
    // Firebase에 시간 업데이트
    if (session) {
      try {
        console.log(`Saving final duration to Firebase: ${currentDuration} seconds`);
        await updateSessionDuration(session.id, currentDuration);
        await updateSessionActiveStatus(session.id, false);
        console.log("Duration saved and session marked as inactive");
      } catch (error) {
        console.error('세션 시간 업데이트 실패:', error);
      }
    }
  }, [session, displayDuration]);

  // 세션 활성/비활성 토글
  const toggleSession = async () => {
    try {
      if (isActive) {
        console.log(`Pausing session. Current duration: ${displayDuration} seconds`);
        await stopTimer();
        
        // 세션 비활성화 상태로 변경
        if (session) {
          console.log(`Saving current duration to Firebase: ${displayDuration} seconds`);
          await updateSessionDuration(session.id, displayDuration);
          await updateSessionActiveStatus(session.id, false);
        }
      } else {
        console.log(`Resuming session. Saved duration: ${savedDurationRef.current} seconds`);
        if (session) {
          await updateSessionActiveStatus(session.id, true);
        }
        
        // 타이머 재시작
        startTimer();
      }
      setIsActive(!isActive);
    } catch (error) {
      console.error("Error toggling session:", error);
    }
  };

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

  // 페이지 언마운트 시 시간 저장
  useEffect(() => {
    return () => {
      console.log("Component unmounting, saving final duration");
      if (session && isActive) {
        const finalDuration = displayDuration;
        console.log(`Final duration on unmount: ${finalDuration} seconds`);
        
        // 비동기 함수를 직접 호출하는 대신 즉시 실행 함수 사용
        (async () => {
          try {
            console.log(`Saving duration on unmount: ${finalDuration} seconds`);
            await updateSessionDuration(session.id, finalDuration);
            console.log("Duration saved on unmount");
          } catch (err) {
            console.error("Failed to save duration on unmount:", err);
          }
        })();
      }
    };
  }, [session, isActive, displayDuration]);

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

  // 텍스트 복사 감지 및 저장
  useEffect(() => {
    const handleCopy = async (event: ClipboardEvent) => {
      if (!session || !isActive) return;
      
      const text = event.clipboardData?.getData('text/plain');
      if (!text || text.trim() === '') return;
      
      try {
        // 임시 구현: chrome API 대신 직접 텍스트만 저장
        await createTextEntry(session.id, text, "unknown");
        setInsightCount(prev => prev + 1);
      } catch (error) {
        console.error('텍스트 저장 실패:', error);
      }
    };

    document.addEventListener('copy', handleCopy);
    
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [session, isActive]);

  const handleBackClick = () => {
    // 뒤로 가기 시 현재 시간 저장
    if (session && isActive) {
      updateSessionDuration(session.id, displayDuration).catch(console.error);
    }
    
    navigate('/session-list', { state: { holeId: state.holeId } });
  };

  if (loading) {
    return (
      <div className="w-80 h-96 bg-white dark:bg-black flex items-center justify-center">
        <p className="text-text-primary-light dark:text-text-primary-dark">로딩 중...</p>
      </div>
    );
  }

  if (error || !hole || !session) {
    return (
      <div className="w-80 h-96 bg-white dark:bg-black flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4">{error || '세션 정보를 찾을 수 없습니다.'}</p>
        <Button variant="secondary" size="md" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 h-96 bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden">
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
              className="w-12 h-12 p-3 bg-fill-primary-light dark:bg-fill-primary-dark rounded-[20px] flex justify-center items-center gap-2.5"
            >
              {isActive ? (
                <Icons.PauseIcon className="w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" />
              ) : (
                <Icons.PlayIcon className="w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" />
              )}
            </button>
            
            <button
              className="w-12 h-12 p-2.5 bg-fill-onsurface-light dark:bg-fill-onsurface-dark rounded-[20px] flex justify-center items-center gap-2.5"
            >
              <Icons.LightbulbIcon className="w-6 h-6 text-icon-primary-light dark:text-icon-primary-dark" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default OnSessionPage; 