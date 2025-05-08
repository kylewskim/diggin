import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getHole } from '@shared/services/holeService';
import { getSession } from '@shared/services/sessionService';
import { Hole, Session } from '@shared/models/types';

interface LocationState {
  holeId: string;
  sessionId: string;
  sessionName: string;
  duration: number;
  insightCount: number;
}

// 시간 포맷팅 함수
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':');
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

const FinishSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [hole, setHole] = useState<Hole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleCheckHoleClick = () => {
    navigate('/hole-list');
  };

  const handleBackToHomeClick = () => {
    navigate('/hole-list');
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
    <div className="w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-center overflow-hidden">
      {/* Top Navigation */}
      <div className="self-stretch h-12 px-3 inline-flex justify-between items-center">
        <div className="flex justify-center items-center gap-3 flex-1">
          <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
            {hole.icon && getIconById(hole.icon)}
          </div>
          <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug">
            {hole.name}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[348px] rounded-2xl flex flex-col justify-between items-center w-full">
        <div className="self-stretch flex-1 p-2">
          <div className="self-stretch px-3 py-2 bg-gray-50 rounded-lg flex flex-col justify-start items-center gap-2">
            <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-lg-md
             leading-none">
              {state.sessionName}
            </div>
            <div className="inline-flex justify-center items-center gap-2">
              <div className="flex justify-center items-center gap-1">
                <div className="w-4 h-4">
                    <Icons.TimeIcon className="w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" />
                </div>
                <div className="text-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-body-md-md leading-none">
                  Time Spent
                </div>
              </div>
              <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-md-md leading-none">
                {formatDuration(state.duration)}
              </div>
            </div>
            <div className="inline-flex justify-center items-center gap-2">
              <div className="flex justify-center items-center gap-1">
                <div className="w-4 h-4">
                    <Icons.TripleStarsIcon className="w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" />
                </div>
                <div className="text-center text-text-secondary-light dark:text-text-secondary-dark text-body-md-md leading-none">
                  Insights Collected
                </div>
              </div>
              <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-md-md leading-none">
                {state.insightCount}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-center gap-2.5">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCheckHoleClick}
            className="w-[304px] h-12 px-5 rounded-lg flex justify-center items-center"
          >
            Check the hole
          </Button>
          <Button
            variant="tertiary"
            size="lg"
            onClick={handleBackToHomeClick}
            className="w-[304px] h-12 px-5 rounded-lg flex justify-center items-center"
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinishSessionPage; 