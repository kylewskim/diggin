import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import * as Icons from '@shared/icons';
import './scrollbar.css'; // 스크롤바 스타일을 위한 CSS 파일

// 아이콘 ID로 아이콘 가져오기
const getIconById = (iconId: string): React.ReactNode => {
  console.log('Getting icon by ID:', iconId);
  
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

interface LocationState {
  selectedIconId?: string;
  holeName?: string;
}

const CreateHolePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  console.log('Received state in CreateHolePage:', state);
  
  const [holeName, setHoleName] = useState(state?.holeName || '');
  const [icon, setIcon] = useState<string | null>(state?.selectedIconId || null);

  useEffect(() => {
    console.log('CreateHolePage useEffect triggered with state:', state);
    
    // SelectIconPage에서 전달받은 아이콘 ID로 아이콘 생성
    if (state?.selectedIconId) {
      console.log('Setting icon ID:', state.selectedIconId);
      setIcon(state.selectedIconId);
    } else {
      console.log('No selectedIconId found in state');
    }
    
    // MainPage 또는 이전 상태에서 전달받은 홀 이름 설정
    if (state?.holeName) {
      setHoleName(state.holeName);
    }
  }, [state]);

  const handleHoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoleName(e.target.value);
  };

  const handleCreateHole = () => {
    if (holeName.trim()) {
      // 홀 생성 로직 구현
      // 데이터베이스에 저장하거나 다른 작업 수행 후 이동
      navigate('/main'); // 예시로 메인 페이지로 이동
    }
  };

  const handleSelectIcon = () => {
    console.log('Navigating to select-icon with holeName:', holeName);
    navigate('/select-icon', { state: { holeName } });
  };

  console.log('Current icon state in CreateHolePage render:', icon);

  return (
    <div className="dark w-80 h-96 pt-8 bg-surface-bg-dark inline-flex flex-col justify-start items-start overflow-hidden font-pretendard">
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        <div className="text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-lg-md">
          What do you diggin?
        </div>
        <div className="self-stretch flex-1 flex flex-col justify-center items-center">
          <div 
            className="w-40 h-40 bg-gray-200 rounded-[100px] flex items-center justify-center cursor-pointer"
            onClick={handleSelectIcon}
          >
            {icon && (
              <div className="w-24 h-24 flex items-center justify-center">
                {getIconById(icon)}
              </div>
            )}
          </div>
        </div>
        <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2">
          <TextField 
            size="lg"
            isDisabled={false}
            error={false}
            placeholder="Write a new hole name"
            value={holeName}
            onChange={handleHoleNameChange}
            className="self-stretch"
          />
          <Button
            variant="primary"
            size="lg"
            disabled={!holeName.trim() || !icon} // 홀 이름과 아이콘이 모두 있어야 활성화
            onClick={handleCreateHole}
            className="self-stretch"
          >
            Create a Hole
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateHolePage; 