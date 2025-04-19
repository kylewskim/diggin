import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
// 확장 프로그램 서비스 import
import { signInWithGoogle } from '../services/auth';
import { getUserHoles } from '@shared/services/holeService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Google 로그인 실행
      const user = await signInWithGoogle();
      console.log('로그인 성공:', user);
      
      // 사용자의 Hole 목록 확인
      const userHoles = await getUserHoles(user.uid);
      
      // Hole 존재 여부에 따라 라우팅
      if (userHoles.length > 0) {
        navigate('/hole-list'); // Hole이 있으면 목록 페이지로
      } else {
        navigate('/main'); // Hole이 없으면 메인 페이지로
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 h-96 px-2 pb-2 bg-color-surface-bg inline-flex flex-col justify-between items-center font-pretendard">
      <div className="self-stretch flex-1 flex flex-col justify-center items-center gap-6">
        <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
        <div className="text-body-lg-md text-center justify-center leading-snug text-text-primary-light">
          To start diggin,<br/>log in with your Google account.
        </div>
        
        {error && (
          <div className="text-red-500 text-sm text-center px-4">
            {error}
          </div>
        )}
      </div>
      
      <Button
        variant="primary"
        size="lg"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="self-stretch"
      >
        {loading ? '로그인 중...' : 'Log in with Google'}
      </Button>
    </div>
  );
};

export default LoginPage; 