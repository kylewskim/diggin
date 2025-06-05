import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DBList } from '@shared/components/ui/DBList';
import { Button } from '@shared/components/ui/button';
import * as Icons from '@shared/icons';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserHoles } from '@shared/services/holeService';
import { getHoleSessions } from '@shared/services/sessionService';
import { getSessionEntriesCount } from '@shared/services/textEntryService';
import { Hole } from '@shared/models/types';
import { signOut } from '@shared/services/auth';
import './scrollbar.css'; // 스크롤바 스타일 추가

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
  const [holeInsightCounts, setHoleInsightCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInsightCounts = async (holesData: Hole[]) => {
    // 1. 즉시 UI 응답성 확보
    const initialCounts: Record<string, number> = {};
    holesData.forEach(hole => {
      initialCounts[hole.id] = 0;
    });
    setHoleInsightCounts(initialCounts);

    // 2. 백그라운드에서 병렬 처리
    const promises = holesData.map(async (hole) => {
      try {
        const sessions = await getHoleSessions(hole.id);
        if (sessions.length === 0) return { holeId: hole.id, count: 0 };

        const countPromises = sessions.map(session => getSessionEntriesCount(session.id));
        const sessionCounts = await Promise.all(countPromises);
        const totalInsights = sessionCounts.reduce((sum, count) => sum + count, 0);
        
        return { holeId: hole.id, count: totalInsights };
      } catch (error) {
        console.error(`Hole ${hole.id} 카운트 로딩 실패:`, error);
        return { holeId: hole.id, count: 0 };
      }
    });

    // 3. 완료되는 대로 즉시 업데이트
    promises.forEach(async (promise) => {
      const { holeId, count } = await promise;
      setHoleInsightCounts(prev => ({ ...prev, [holeId]: count }));
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/', { replace: true });
        return;
      }

      try {
        const userHoles = await getUserHoles(user.uid);
        setHoles(userHoles);
        
        // 인사이트 카운트 로딩
        await loadInsightCounts(userHoles);
        
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

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };


  const handleNext = async () => {
    if (selectedHole) {
      try {
        // 선택한 Hole의 세션 목록 가져오기
        const sessions = await getHoleSessions(selectedHole);
        
        // 세션이 있으면 SessionListPage로, 없으면 EmptySessionPage로 이동
        if (sessions.length > 0) {
          // navigate('/session-list', { state: { holeId: selectedHole } });
          navigate('/create-session', { state: { holeId: selectedHole } });
        } else {
          navigate('/empty-session', { state: { holeId: selectedHole } });
        }
      } catch (error) {
        console.error('세션 목록 가져오기 실패:', error);
        // 에러 발생 시 기본적으로 EmptySessionPage로 이동
        navigate('/empty-session', { state: { holeId: selectedHole } });
      }
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
      <div className="w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center">
        <p className="text-text-primary-light dark:text-text-primary-dark">Loading</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-between items-center overflow-hidden">
      {/* Top Navigation - 고정 */}
      <div className="self-stretch h-[52px] pl-5 pr-3 border-b border-color-line-tertiary inline-flex justify-between items-center">
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
          <Button
            variant="tertiary"
            size="sm"
            isIconOnly
            onClick={handleLogout}
            leftIcon={<Icons.LogOutIcon />}
            showLeftIcon
          />
        </div>
      </div>

      {/* 스크롤 가능한 리스트 영역 - 남은 공간 모두 차지 */}
      <div className="self-stretch flex-1 overflow-hidden">
        {/* 스크롤바를 위한 오른쪽 여백 */}
        <div className="h-full flex mr-1">
          {/* 스크롤 영역 */}
          <div className="h-full w-full overflow-y-auto custom-scrollbar">
            <div className="p-2 flex flex-col justify-start items-start gap-2">
              {error ? (
                <div className="text-red-500 text-sm text-center px-4 py-8 w-full">
                  {error}
                </div>
              ) : holes.length > 0 ? (
                holes.map((hole) => (
                  <DBList
                    key={hole.id}
                    icon={getIconComponent(hole.icon)}
                    name={hole.name}
                    insightCount={holeInsightCounts[hole.id] || 0}
                    selected={selectedHole === hole.id}
                    onClick={() => handleHoleSelect(hole.id)}
                    className="rounded-lg w-full"
                  />
                ))
              ) : (
                <div className="self-stretch py-8 flex justify-center items-center w-full">
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    No holes found. Create a new one!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button - 고정 */}
      <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5">
        <Button
          variant="primary"
          size="lg"
          disabled={!selectedHole}
          onClick={handleNext}
          className="self-stretch"
          // className="self-stretch h-[52px] min-w-[240px] px-5 rounded-lg flex justify-center items-center"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default HoleListPage; 