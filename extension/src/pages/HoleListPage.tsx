import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DBList } from 'shared/src/components/ui/DBList';
import { Button } from 'shared/src/components/ui/button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserHoles } from '@shared/services/holeService';
import { Hole } from '@shared/models/types';

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

  console.warn('Icon ID not found:', iconId);
  return <Icons.InfoIcon />; // Default icon as fallback
};

const HoleListPage = () => {
  const navigate = useNavigate();
  const [selectedHole, setSelectedHole] = useState<string | null>(null);
  const [holes, setHoles] = useState<Hole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 로그인 상태 확인 및 사용자의 hole 목록 가져오기
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        navigate('/', { replace: true });
        return;
      }

      try {
        // 사용자의 hole 목록 가져오기
        const userHoles = await getUserHoles(user.uid);
        setHoles(userHoles);
        
        // hole이 없으면 메인 페이지로 이동
        if (userHoles.length === 0) {
          navigate('/main', { replace: true });
        }
      } catch (err) {
        console.error('Hole 목록 가져오기 실패:', err);
        setError('Hole 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleHoleSelect = (holeId: string) => {
    setSelectedHole(holeId);
  };

  const handleNext = () => {
    if (selectedHole) {
      // TODO: 나중에 세션이 있는지 확인하는 로직 추가 필요
      // 지금은 단순히 EmptySessionPage로 이동
      navigate('/empty-session', { state: { holeId: selectedHole } });
    }
  };

  const handleFilterClick = () => {
    // 필터 기능 구현
    console.log('Filter clicked');
  };

  const handleAddClick = () => {
    // 새 Hole 생성을 위해 메인 페이지로 이동
    navigate('/main');
  };

  // 아이콘 컴포넌트 생성
  const getIconComponent = (iconId: string) => {
    return () => (
      <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
        {getIconById(iconId)}
      </div>
    );
  };

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="w-80 h-96 bg-white dark:bg-black flex items-center justify-center">
        <p className="text-text-primary-light dark:text-text-primary-dark">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-96 bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Top Navigation */}
      <div className="self-stretch h-12 pl-5 pr-3 border-b border-color-line-tertiary inline-flex justify-between items-center">
        <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug">
          Diggin
        </div>
        <div className="flex justify-start items-center gap-[8px]">
          <Button
            variant="tertiary"
            size="sm"
            isIconOnly
            onClick={handleFilterClick}
            leftIcon={<Icons.FilterIcon />}
            showLeftIcon
          />
          <Button
            variant="tertiary"
            size="sm"
            isIconOnly
            onClick={handleAddClick}
            leftIcon={<Icons.AddIcon />}
            showLeftIcon
          />
        </div>
      </div>

      {/* Database List */}
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        {error ? (
          <div className="text-red-500 text-sm text-center px-4 py-8">
            {error}
          </div>
        ) : (
          <>
            <div className="self-stretch p-2 relative flex flex-col justify-start items-start gap-2 overflow-auto max-h-[calc(100%-60px)]">
              {holes.length > 0 ? (
                holes.map((hole) => (
                  <DBList
                    key={hole.id}
                    icon={getIconComponent(hole.icon)}
                    name={hole.name}
                    insightCount={0} // TODO: 실제 인사이트 수를 가져와야 함
                    selected={selectedHole === hole.id}
                    onClick={() => handleHoleSelect(hole.id)}
                    className="rounded-lg w-full"
                  />
                ))
              ) : (
                <div className="self-stretch py-8 flex justify-center items-center">
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    No holes found. Create a new one!
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Button */}
            <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5">
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedHole}
                onClick={handleNext}
                className="self-stretch h-[52px] min-w-24 px-5 rounded-lg flex justify-center items-center"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HoleListPage; 