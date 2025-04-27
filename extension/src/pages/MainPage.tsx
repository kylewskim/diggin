import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from '@shared/services/auth';
import { getHole } from '@shared/services/holeService';
import { Hole } from '@shared/models/types';

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
      <div className="w-80 h-[400px] pt-4 bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard">
        <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
          <div className="w-full flex justify-between items-center px-4 mb-4">
            <button 
              onClick={() => navigate('/hole-list')}
              className="text-sm text-text-primary-light hover:underline"
            >
              ← Back to Holes
            </button>
            <h1 className="text-body-lg-md font-bold text-text-primary-light">
              {selectedHole.name}
            </h1>
            <div className="w-4"></div> {/* 오른쪽 여백용 */}
          </div>
          
          <div className="self-stretch flex-1 flex flex-col justify-center items-center">
            <div className="text-center text-text-secondary-light mb-4">
              No active sessions found
            </div>
          </div>
          
          <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartSession}
              className="self-stretch"
            >
              Start New Session
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 선택된 hole이 없는 경우 새 hole 생성 화면 표시
  return (
    <div className="w-80 h-[400px] pt-8 bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard">
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        <div className="w-full flex justify-between items-center px-4">
          <div className="text-body-lg-md text-center justify-center text-text-primary-light text-base leading-snug">
            What do you diggin?
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Log out
          </button>
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
        </div>
      </div>
    </div>
  );
};

export default MainPage; 