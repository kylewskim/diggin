import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getHole } from '@shared/services/holeService';
import { getHoleSessions } from '@shared/services/sessionService';
import { getSessionEntriesCount } from '@shared/services/textEntryService';
import { Hole, Session } from '@shared/models/types';
import { List } from '@shared/components/ui/List';

interface LocationState {
  holeId: string;
}

interface SessionItem {
  id: string;
  name: string;
  insightCount: number;
}

const SessionListPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [hole, setHole] = useState<Hole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [listHoverState, setListHoverState] = useState<string | null>(null);

  // 세션별 인사이트 카운트 로딩 함수
  const loadSessionInsightCounts = async (sessionsList: Session[]) => {
    console.log('🔍 [DEBUG] SessionListPage: Starting to load insight counts for', sessionsList.length, 'sessions');
    
    try {
      // 모든 세션의 인사이트 카운트를 병렬로 가져오기
      const sessionCountPromises = sessionsList.map(async (session) => {
        console.log(`🔍 [DEBUG] SessionListPage: Loading count for session ${session.id} (${session.name})`);
        try {
          const count = await getSessionEntriesCount(session.id);
          console.log(`✅ [DEBUG] SessionListPage: Session ${session.id} has ${count} insights`);
          return {
            id: session.id,
            name: session.name,
            insightCount: count
          };
        } catch (error) {
          console.error(`❌ [DEBUG] SessionListPage: Failed to load count for session ${session.id}:`, error);
          return {
            id: session.id,
            name: session.name,
            insightCount: 0
          };
        }
      });

      // 모든 Promise가 완료될 때까지 기다림
      const sessionsWithCounts = await Promise.all(sessionCountPromises);
      
      console.log('✅ [DEBUG] SessionListPage: All session counts loaded, setting sessions');
      setSessions(sessionsWithCounts);
    } catch (error) {
      console.error('❌ [DEBUG] SessionListPage: Failed to load session counts:', error);
      // 에러 발생 시 0으로 설정
      const fallbackSessions: SessionItem[] = sessionsList.map(session => ({
        id: session.id,
        name: session.name,
        insightCount: 0
      }));
      setSessions(fallbackSessions);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/', { replace: true });
        return;
      }

      if (!state?.holeId) {
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
        
        // 홀에 속한 세션 목록 가져오기
        const sessionsList = await getHoleSessions(state.holeId);
        
        // 세션별 인사이트 카운트 로딩 (점진적 업데이트)
        await loadSessionInsightCounts(sessionsList);
      } catch (err) {
        console.error('홀 정보 가져오기 실패:', err);
        setError('홀 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, state]);

  const handleBackClick = () => {
    navigate('/hole-list');
  };

  const handleAddClick = () => {
    navigate('/create-session', { state: { holeId: state.holeId } });
  };

  const handleSessionClick = (id: string) => {
    setSelectedSessionId(id === selectedSessionId ? null : id);
    // 호버 상태도 업데이트
    setListHoverState(prevState => prevState === id ? null : id);
  };

  const handleStartDiggin = () => {
    if (selectedSessionId) {
      const selectedSession = sessions.find(s => s.id === selectedSessionId);
      if (selectedSession) {
        navigate('/session', { 
          state: { 
            holeId: state.holeId,
            sessionId: selectedSession.id,
            sessionName: selectedSession.name
          } 
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center">
        <p className="text-text-primary-light dark:text-text-primary-dark">로딩 중...</p>
      </div>
    );
  }

  if (error || !hole) {
    return (
      <div className="w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4">{error || '홀을 찾을 수 없습니다.'}</p>
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
          <div className="flex justify-start items-center gap-3">
            <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug">
              {hole.name}
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <Button
            variant="tertiary"
            size="sm"
            isIconOnly
            onClick={handleAddClick}
            leftIcon={<Icons.AddIcon />}
            showLeftIcon
          />
          <Button
            variant="tertiary"
            size="sm"
            isIconOnly
            onClick={() => {}}
            leftIcon={<Icons.OverflowIcon />}
            showLeftIcon
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="h-80 rounded-2xl flex flex-col justify-between items-center w-full">
        <div className="w-80 flex-1 inline-flex justify-center items-start">
          <div className="flex-1 px-2 pt-2 inline-flex flex-col justify-start items-start gap-2 overflow-auto max-h-full">
            {sessions.map(session => (
              <List
                key={session.id}
                type="default"
                state={selectedSessionId === session.id ? 'selected' : (listHoverState === session.id ? 'hover' : 'default')}
                label={session.name}
                count={session.insightCount}
                onClick={() => handleSessionClick(session.id)}
              />
            ))}
          </div>
        </div>

        <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedSessionId}
            onClick={handleStartDiggin}
            className="self-stretch h-12 min-w-[240px] px-5 rounded-lg flex justify-center items-center"
          >
            Start Diggin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionListPage; 