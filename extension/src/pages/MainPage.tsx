import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from '@shared/services/auth';
import { getHole } from '@shared/services/holeService';
import { Hole } from '@shared/models/types';
import * as Icons from '@shared/icons';


interface LocationState {
  holeId?: string;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [holeName, setHoleName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedHole, setSelectedHole] = useState<Hole | null>(null);
  
  // 로그인 상태 확인 및 선택된 hole 정보 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        navigate('/', { replace: true });
        return;
      }

      try {
        // HoleListPage에서 선택된 hole 정보 가져오기
        if (state?.holeId) {
          const hole = await getHole(state.holeId);
          setSelectedHole(hole);
          // 여기서 hole의 session 목록을 가져오거나 다른 작업을 수행할 수 있습니다.
        }
      } catch (err) {
        console.error('Hole 정보 가져오기 실패:', err);
      } finally {
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [navigate, state]);

  const handleHoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoleName(e.target.value);
  };

  const handleCreateHole = () => {
    if (holeName.trim()) {
      // 홀 이름을 저장하고 아이콘 선택 화면으로 이동
      navigate('/select-icon', { state: { holeName } });
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  // Chrome Identity API 로그아웃 (테스트용)
  const handleChromeLogout = async () => {
    try {
      console.log('[DIGGIN] MainPage: Triggering Chrome Identity API logout');
      
      // 백그라운드 스크립트에 로그아웃 메시지 전송
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
        chrome.runtime.sendMessage({
          action: 'TRIGGER_LOGOUT'
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('[DIGGIN] MainPage: Logout message error:', chrome.runtime.lastError);
            return;
          }
          
          if (response?.success) {
            console.log('[DIGGIN] MainPage: Chrome Identity API logout successful');
            // 페이지 새로고침하여 상태 초기화
            window.location.reload();
          } else {
            console.error('[DIGGIN] MainPage: Chrome Identity API logout failed:', response?.error);
          }
        });
      } else {
        console.warn('[DIGGIN] MainPage: Not in extension environment');
      }
    } catch (error) {
      console.error('[DIGGIN] MainPage: Chrome logout failed:', error);
    }
  };

  // 홀 리스트로 돌아가기
  const handleBackClick = () => {
    navigate('/hole-list');
  };

  // 선택된 Hole로 새 세션 시작
  const handleStartSession = () => {
    if (selectedHole) {
      // 세션 시작 페이지로 이동 또는 세션 시작 로직 구현
      console.log('Starting session for hole:', selectedHole.name);
      // TODO: 세션 시작 구현
    }
  };

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="w-80 h-[400px] flex items-center justify-center bg-Surface-Main">
        <p className="text-body-lg-md">로딩 중...</p>
      </div>
    );
  }

  // 선택된 hole이 있는 경우 hole 정보 표시
  if (selectedHole) {
    return (
      <div className="w-80 h-[400px] pt-8 bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard">
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        <div className="w-full flex justify-between items-center px-4">
          <div className="w-full text-body-lg-md text-center justify-center text-text-primary-light text-base leading-snug">
            What do you diggin?
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col justify-center items-center">
          <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
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
            disabled={!holeName.trim()} // 홀 이름이 비어있으면 비활성화
            onClick={handleCreateHole}
            className="self-stretch"
          >
            Create a Hole
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleChromeLogout}
            className="self-stretch mt-2"
          >
            🧪 Test Chrome Logout
          </Button>
        </div>
      </div>
    </div>
    );
  }

  // 선택된 hole이 없는 경우 새 hole 생성 화면 표시
  return (
    <div className="w-80 h-[400px] bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard">
      {/* Top Navigation */}
      <div className="self-stretch h-[52px] px-3 border-b border-line-tertiary-light dark:border-line-tertiary-dark inline-flex justify-between items-center">
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
              What do you diggin?
            </div>
          </div>
        </div>
      </div>
      
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        <div className="self-stretch flex-1 flex flex-col justify-center items-center">
          <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
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
            disabled={!holeName.trim()} // 홀 이름이 비어있으면 비활성화
            onClick={handleCreateHole}
            className="self-stretch"
          >
            Create a Hole
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleChromeLogout}
            className="self-stretch mt-2"
          >
            🧪 Test Chrome Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 