import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { signInWithGoogle } from '@shared/services/auth';

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
      
      // 로그인 성공 시 메인 페이지로 이동
      navigate('/main');
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
          To start diggin,<br/>log in or create a new account.
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