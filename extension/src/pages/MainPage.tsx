import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from '@shared/services/auth';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [holeName, setHoleName] = useState('');
  const [loading, setLoading] = useState(true);
  
  // 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      if (!user) {
        navigate('/', { replace: true });
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

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

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="w-80 h-96 flex items-center justify-center bg-Surface-Main">
        <p className="text-body-lg-md">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-96 pt-8 bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard">
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        <div className="w-full flex justify-between items-center px-4">
          <div className="text-body-lg-md text-center justify-center text-text-primary-light text-base leading-snug">
            What do you diggin?
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700"
          >
            로그아웃
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