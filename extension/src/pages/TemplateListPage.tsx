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

// 템플릿별 세션 정의
const TEMPLATE_SESSIONS = {
  'design-thinking': [
    'Empathize',
    'Define',
    'Ideate',
    'Prototype',
    'Test'
  ],
  'double-diamond': [
    'Discover',
    'Define',
    'Develop',
    'Deliver'
  ],
  'bm-canvas': [
    'Customer Segments',
    'Value Propositions',
    'Channels',
    'Customer Relationships',
    'Revenue Streams',
    'Key Activities',
    'Key Resources',
    'Key Partners',
    'Cost Structure'
  ],
  'jtbd': [
    'Situations',
    'Motivations',
    'Desired Outcomes',
    'Functional Jobs',
    'Emotional Jobs',
    'Social Jobs'
  ]
};

const TemplateListPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [hole, setHole] = useState<Hole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [listHoverState, setListHoverState] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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
        const sessionItems: SessionItem[] = sessionsList.map((session: Session) => ({
          id: session.id,
          name: session.name,
          insightCount: 0 // TODO: insight 수를 가져오는 로직 추가 필요
        }));
        
        setSessions(sessionItems);
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
    navigate('/empty-session', { state: { holeId: state.holeId } });
  };

  const handleAddClick = () => {
    navigate('/create-session', { state: { holeId: state.holeId } });
  };

  const handleSessionClick = (id: string) => {
    setSelectedSessionId(id === selectedSessionId ? null : id);
    // 호버 상태도 업데이트
    setListHoverState(prevState => prevState === id ? null : id);
  };

  const handleStartDiggin = async () => {
    if (!selectedTemplateId || !hole) return;

    try {
      setIsCreating(true);
      const sessions = TEMPLATE_SESSIONS[selectedTemplateId as keyof typeof TEMPLATE_SESSIONS];
      console.log(sessions);
      
      // 모든 세션 생성
      for (const sessionName of sessions) {
        try {
          await createSession(hole.id, sessionName);
          console.log(sessionName);
        } catch (err) {
          console.error(`세션 "${sessionName}" 생성 실패:`, err);
          throw err; // 에러를 상위로 전파
        }
      }

      // 세션 생성이 완료되면 세션 목록 페이지로 이동
      navigate('/session-list', { 
        state: { 
          holeId: hole.id,
          refresh: true // 세션 목록을 새로고침하도록 표시
        } 
      });
    } catch (err) {
      console.error('세션 생성 실패:', err);
      setError('세션 생성에 실패했습니다.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId === selectedTemplateId ? null : templateId);
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
      </div>

      {/* Main Content */}
      <div className="h-80 rounded-2xl flex flex-col justify-between items-center w-full">
        {/* 스크롤 가능한 리스트 영역 - 남은 공간 모두 차지 */}
        <div className="self-stretch flex-1 overflow-hidden">
          {/* 스크롤바를 위한 오른쪽 여백 */}
          <div className="h-full flex mr-1">
            {/* 스크롤 영역 */}
            <div className="h-full w-full overflow-y-auto custom-scrollbar">
              <div className="px-3 pt-3 flex flex-col justify-start items-start gap-2">
                {/* Template Cards Grid */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div 
                    className={`w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${
                      selectedTemplateId === 'design-thinking' ? 'bg-gray-50 outline-line-secondary-light' : ''
                    }`}
                    onClick={() => handleTemplateSelect('design-thinking')}
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-1">
                      <div className="text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate">
                        🎨 💭
                      </div>
                      <div className="text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate">
                        Design Thinking
                      </div>
                    </div>
                    <div className="text-caption-md-rg self-stretch h-[32px] justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden">
                      Empathize, Define, Ideate, Prototype, Test
                    </div>
                  </div>
                  
                  <div 
                    className={`w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${
                      selectedTemplateId === 'double-diamond' ? 'bg-gray-50 outline-line-secondary-light' : ''
                    }`}
                    onClick={() => handleTemplateSelect('double-diamond')}
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-1">
                      <div className="text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate">
                        💎 💎
                      </div>
                      <div className="self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md leading-none truncate">
                        Double Diamond
                      </div>
                    </div>
                    <div className="text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden">
                      Discover, Define, Develop, Deliver
                    </div>
                  </div>

                  <div 
                    className={`w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${
                      selectedTemplateId === 'bm-canvas' ? 'bg-gray-50 outline-line-secondary-light' : ''
                    }`}
                    onClick={() => handleTemplateSelect('bm-canvas')}
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-1">
                      <div className="text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate">
                        💼 📋
                      </div>
                      <div className="self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md leading-none truncate">
                        BM Canvas
                      </div>
                    </div>
                    <div className="text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden">
                      Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Activities, Key Resources, Key Partners, Cost Structure
                    </div>
                  </div>

                  <div 
                    className={`w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${
                      selectedTemplateId === 'jtbd' ? 'bg-gray-50 outline-line-secondary-light' : ''
                    }`}
                    onClick={() => handleTemplateSelect('jtbd')}
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-1">
                      <div className="text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate">
                        📎 ✅
                      </div>
                      <div className="self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md leading-none truncate">
                        JTBD
                      </div>
                    </div>
                    <div className="text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden">
                      Situations, Motivations, Desired Outcomes, Functional Jobs, Emotional Jobs, Social Jobs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedTemplateId || isCreating}
            onClick={handleStartDiggin}
            className="self-stretch h-12 min-w-[240px] px-5 rounded-lg flex justify-center items-center"
          >
            {isCreating ? 'Creating Sessions...' : 'Select'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateListPage; 