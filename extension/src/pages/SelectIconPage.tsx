import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from '@shared/icons';
import { IconSelector } from '@shared/components/ui/IconSelector';
import './scrollbar.css'; // 스크롤바 스타일을 위한 CSS 파일
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// 실제 아이콘 데이터
const iconCategories = [
  {
    id: 'utility',
    name: 'Utility',
    icons: [
      { id: 'utility-1', icon: <Icons.SearchIcon /> },
      { id: 'utility-2', icon: <Icons.AddIcon /> },
      { id: 'utility-3', icon: <Icons.EditIcon /> },
      { id: 'utility-4', icon: <Icons.TrashIcon /> },
      { id: 'utility-5', icon: <Icons.CheckIcon /> },
      { id: 'utility-6', icon: <Icons.CloseIcon /> },
      { id: 'utility-7', icon: <Icons.InfoIcon /> },
      { id: 'utility-8', icon: <Icons.LinkIcon /> },
      { id: 'utility-9', icon: <Icons.SettingIcon /> },
      { id: 'utility-10', icon: <Icons.FilterIcon /> },
    ]
  },
  {
    id: 'media',
    name: 'Media',
    icons: [
      { id: 'media-1', icon: <Icons.PlayIcon /> },
      { id: 'media-2', icon: <Icons.PauseIcon /> },
      { id: 'media-3', icon: <Icons.StopIcon /> },
      { id: 'media-4', icon: <Icons.ArchiveIcon /> },
      { id: 'media-5', icon: <Icons.HideTabIcon /> },
      { id: 'media-6', icon: <Icons.HighlightIcon /> },
      { id: 'media-7', icon: <Icons.SortIcon /> },
      { id: 'media-8', icon: <Icons.ReorderIcon /> },
      { id: 'media-9', icon: <Icons.OverflowIcon /> },
      { id: 'media-10', icon: <Icons.ChevronRightIcon /> },
    ]
  },
  {
    id: 'other',
    name: 'Other',
    icons: [
      { id: 'other-1', icon: <Icons.TimeIcon /> },
      { id: 'other-2', icon: <Icons.HourglassIcon /> },
      { id: 'other-3', icon: <Icons.LightbulbIcon /> },
      { id: 'other-4', icon: <Icons.TripleStarsIcon /> },
      { id: 'other-5', icon: <Icons.BackIcon /> },
    ]
  }
];

interface IconData {
  id: string;
  icon: React.ReactNode;
}

interface LocationState {
  holeName?: string;
}

const SelectIconPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedIconData, setSelectedIconData] = useState<IconData | null>(null);
  const [holeName, setHoleName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      if (!user) {
        navigate('/', { replace: true });
        return;
      }
      
      // MainPage에서 전달받은 홀 이름 설정
      if (state?.holeName) {
        setHoleName(state.holeName);
      } else {
        // 홀 이름이 없으면 메인 페이지로 이동
        navigate('/main', { replace: true });
      }
    });
    
    return () => unsubscribe();
  }, [state, navigate]);

  const handleIconSelect = (icon: IconData) => {
    console.log('Selected icon:', icon);
    setSelectedIcon(icon.id);
    setSelectedIconData(icon);
  };

  const handleBackClick = () => {
    console.log('Going back to previous page');
    navigate(-1);
  };

  const handleSelectClick = () => {
    console.log('Selected icon ID:', selectedIcon);
    console.log('Sending state to create-hole:', { selectedIconId: selectedIcon, holeName });
    navigate('/create-hole', { 
      state: { 
        selectedIconId: selectedIcon, 
        holeName 
      },
      replace: true
    });
  };

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="dark w-80 h-96 bg-surface-bg-dark flex items-center justify-center">
        <p className="text-text-primary-dark">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="dark w-80 h-96 bg-surface-bg-dark inline-flex flex-col justify-between items-center overflow-hidden">
      {/* 헤더 */}
      <div className="self-stretch h-12 px-3 py-3 border-b border-color-line-tertiary dark:border-color-line-tertiary inline-flex justify-between items-center">
        <Button
          variant="tertiary"
          size="sm"
          isIconOnly
          onClick={handleBackClick}
          leftIcon={<Icons.BackIcon />}
          showLeftIcon
        />
        <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-lg-md">
          Select Icon
        </div>
        <div className="w-7 h-7" />
      </div>

      {/* 아이콘 그리드 */}
      <div className="self-stretch flex-1 overflow-hidden">
        {/* 스크롤바를 위한 오른쪽 여백 */}
        <div className="h-full flex mr-1">
          {/* 스크롤 영역 */}
          <div className="h-full pl-3 pt-4 flex-1 overflow-y-auto custom-scrollbar">
            <div className="w-[292px] flex flex-col justify-start items-start gap-6 pb-4 pr-4">
              {iconCategories.map((category) => (
                <div key={category.id} className="w-[292px] flex flex-col justify-start items-start gap-3">
                  <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md">
                    {category.name}
                  </div>
                  <div className="w-[292px] inline-flex justify-start items-start gap-2 flex-wrap content-start">
                    {category.icons.map((icon) => (
                      <IconSelector
                        key={icon.id}
                        icon={icon.icon}
                        selected={selectedIcon === icon.id}
                        onClick={() => handleIconSelect(icon)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5">
        <Button
          variant="primary"
          size="lg"
          disabled={!selectedIcon}
          onClick={handleSelectClick}
          className="self-stretch"
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default SelectIconPage; 