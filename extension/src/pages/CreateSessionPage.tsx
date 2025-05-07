import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getHole } from '@shared/services/holeService';
import { createSession, getHoleSessions } from '@shared/services/sessionService';
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

const CreateSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [hole, setHole] = useState<Hole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState('');
  const [isCreatingMode, setIsCreatingMode] = useState(true);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [listHoverState, setListHoverState] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
        
        // SessionItem 형식으로 변환
        const sessionItems: SessionItem[] = sessionsList.map(session => ({
          id: session.id,
          name: session.name,
          insightCount: 0 // TODO: insight 수를 가져오는 로직 추가 필요
        }));
        
        setSessions(sessionItems);
        
        // 세션이 있으면 생성 모드 해제
        if (sessionItems.length > 0) {
          setIsCreatingMode(false);
        }
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
    // navigate('/empty-session', { state: { holeId: state.holeId } });
    navigate('/hole-list');
  };

  const handleSessionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value);
  };

  const handleCancelClick = () => {
    setSessionName('');
  };

  const handleSubmitClick = async (value: string) => {
    if (value.trim() && !submitting && hole) {
      try {
        setSubmitting(true);

        // Firebase에 세션 생성
        const sessionId = await createSession(hole.id, value.trim());
        
        // 세션 목록에 추가
        const newSession: SessionItem = {
          id: sessionId,
          name: value.trim(),
          insightCount: 0
        };
        
        setSessions(prevSessions => [...prevSessions, newSession]);
        setSessionName('');
        setIsCreatingMode(false);
      } catch (error) {
        console.error('세션 생성 실패:', error);
        alert('세션을 생성하는데 실패했습니다.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleStartDiggin = () => {
    if (sessions.length > 0) {
      // 마지막으로 생성한 세션으로 디깅 시작
      const lastSession = sessions[sessions.length - 1];
      
      // 세션 페이지로 이동
      navigate('/session', { 
        state: { 
          holeId: state.holeId,
          sessionId: lastSession.id,
          sessionName: lastSession.name
        } 
      });
    }
  };

  const handleAddClick = () => {
    setIsCreatingMode(true);
  };

  const handleListClick = (id: string) => {
    // Toggle hover state for the clicked list item
    setListHoverState(prevState => prevState === id ? null : id);
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
      <div className="self-stretch h-[52px] px-3 border-b border-color-line-tertiary inline-flex justify-between items-center">
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
        
        {!isCreatingMode && sessions.length > 0 && (
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
        )}
      </div>

      {/* Main Content */}
      <div className="h-[348px] rounded-2xl flex flex-col justify-between items-center w-full">
        {/* 스크롤 가능한 리스트 영역 - 남은 공간 모두 차지 */}
        <div className="self-stretch flex-1 overflow-hidden">
          {/* 스크롤바를 위한 오른쪽 여백 */}
          <div className="h-full flex mr-1">
            {/* 스크롤 영역 */}
            <div className="h-full w-full overflow-y-auto custom-scrollbar">
              <div className="p-2 flex flex-col justify-start items-start gap-2">
                {isCreatingMode ? (
                  <List
                    type="add"
                    state={sessionName ? 'active' : 'default'}
                    label=""
                    value={sessionName}
                    onChange={handleSessionNameChange}
                    onCancel={handleCancelClick}
                    onSubmit={handleSubmitClick}
                    placeholder="Write a new session name"
                  />
                ) : null}

                {sessions.map(session => (
                  <List
                    key={session.id}
                    type="default"
                    state={listHoverState === session.id ? 'hover' : 'default'}
                    label={session.name}
                    count={session.insightCount}
                    onClick={() => handleListClick(session.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button - 고정 */}
        {!isCreatingMode && sessions.length > 0 && (
          <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartDiggin}
              className="self-stretch h-12 min-w-[240px] px-5 rounded-lg flex justify-center items-center"
            >
              Start Diggin
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSessionPage; 