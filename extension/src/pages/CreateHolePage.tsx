import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import * as Icons from '@shared/icons';
import './scrollbar.css'; // 스크롤바 스타일을 위한 CSS 파일
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createHole } from '@shared/services/holeService';

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
  
  const [holeName, setHoleName] = useState(state?.holeName || '');
  const [icon, setIcon] = useState<string | null>(state?.selectedIconId || null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      if (!user) {
        navigate('/', { replace: true });
        return;
      }
      
      // SelectIconPage에서 전달받은 아이콘 ID로 아이콘 생성
      if (state?.selectedIconId) {
        setIcon(state.selectedIconId);
      } else {
        // 아이콘 ID가 없으면 아이콘 선택 페이지로 이동
        navigate('/select-icon', { 
          state: { holeName: state?.holeName || '' },
          replace: true
        });
      }
      
      // 홀 이름 설정
      if (state?.holeName) {
        setHoleName(state.holeName);
      }
    });
    
    return () => unsubscribe();
  }, [state, navigate]);

  const handleHoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoleName(e.target.value);
  };

  const handleCreateHole = async () => {
    if (holeName.trim() && icon && auth.currentUser) {
      try {
        setCreating(true);
        setError(null);
        
        // 홀 생성 로직 구현
        await createHole(auth.currentUser.uid, holeName, icon);
        
        // 생성 성공 후 메인 페이지로 이동
        navigate('/main', { replace: true });
      } catch (err) {
        console.error('홀 생성 실패:', err);
        setError('홀 생성에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setCreating(false);
      }
    }
  };

  const handleSelectIcon = () => {
    navigate('/select-icon', { state: { holeName } });
  };

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="dark w-80 h-96 bg-surface-bg-dark flex items-center justify-center">
        <p className="text-text-primary-light dark:text-text-primary-dark">로딩 중...</p>
      </div>
    );
  }

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
            isDisabled={creating}
            error={false}
            placeholder="Write a new hole name"
            value={holeName}
            onChange={handleHoleNameChange}
            className="self-stretch"
          />
          
          {error && (
            <div className="text-red-500 text-sm w-full text-center mb-2">
              {error}
            </div>
          )}
          
          <Button
            variant="primary"
            size="lg"
            disabled={!holeName.trim() || !icon || creating}
            onClick={handleCreateHole}
            className="self-stretch"
          >
            {creating ? '생성 중...' : 'Create a Hole'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateHolePage; 