import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getHole } from '@shared/services/holeService';
import { Hole } from '@shared/models/types';

interface LocationState {
  holeId: string;
}

const EmptySessionPage: React.FC = () => {
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

      if (!state?.holeId) {
        navigate('/hole-list', { replace: true });
        return;
      }

      try {
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

  const handleCreateSession = () => {
    // 세션 생성 페이지로 이동
    navigate('/create-session', { state: { holeId: state.holeId } });
  };

  const handleSeeAllTemplates = () => {
    // 모든 템플릿 보기 페이지로 이동
    console.log('See all templates');
  };

  const handleTemplateSelect = (templateId: string) => {
    // 템플릿 선택 처리
    console.log('Selected template:', templateId);
  };

  if (loading) {
    return (
      <div className="w-80 h-96 bg-white dark:bg-black flex items-center justify-center">
        <p className="text-text-primary-light dark:text-text-primary-dark">로딩 중...</p>
      </div>
    );
  }

  if (error || !hole) {
    return (
      <div className="w-80 h-96 bg-white dark:bg-black flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4">{error || '홀을 찾을 수 없습니다.'}</p>
        <Button variant="secondary" size="md" onClick={handleBackClick}>
          Back to Holes
        </Button>
      </div>
    );
  }

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

  return (
    <div className="w-80 h-96 bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Top Navigation */}
      <div className="self-stretch h-12 px-3 border-b border-color-line-tertiary inline-flex justify-start items-center gap-2.5">
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
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        {/* Empty State */}
        <div className="self-stretch flex-1 flex flex-col justify-center items-center gap-1">
            <Button
                variant="tertiary"
                size="sm"
                onClick={handleBackClick}
                leftIcon={<Icons.AddIcon />}
                showLeftIcon
            >
                Create a session
            </Button>
        </div>

        {/* Templates Section */}
        <div className="self-stretch p-3 flex flex-col justify-start items-start gap-3">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-none">
              Templates
            </div>
            <div 
              className="flex justify-center items-center gap-0.5 cursor-pointer"
              onClick={handleSeeAllTemplates}
            >
              <div className="text-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-none">
                See all
              </div>
              <div className="w-4 h-4 relative overflow-hidden">
                <Icons.ChevronRightIcon className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
              </div>
            </div>
          </div>
          
          {/* Template Cards */}
          <div className="self-stretch inline-flex justify-start items-center gap-3 overflow-x-auto">
            <div 
              className="w-36 h-24 p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer"
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
              <div className="text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden">
                Empathize, Define, Ideate, Prototype, Test
              </div>
            </div>
            
            <div 
              className="w-36 h-24 p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer"
              onClick={() => handleTemplateSelect('double-diamond')}
            >
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate">
                  💎 💎
                </div>
                <div className="self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-xs font-medium leading-none truncate">
                  Double Diamond
                </div>
              </div>
              <div className="text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden">
                Discover, Define, Develop, Deliver
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptySessionPage; 