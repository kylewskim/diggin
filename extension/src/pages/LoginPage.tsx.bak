import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Google 로그인 로직 구현
    console.log('Google login clicked');
    // 로그인 성공 시 메인 페이지로 이동
    navigate('/main');
  };

  return (
    <div className="w-80 h-96 px-2 pb-2 bg-color-surface-bg inline-flex flex-col justify-between items-center font-pretendard">
      <div className="self-stretch flex-1 flex flex-col justify-center items-center gap-6">
        <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
        <div className="text-body-lg-md text-center justify-center leading-snug text-text-primary-light">
          To start diggin,<br/>log in or create a new account.
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        onClick={handleGoogleLogin}
        className="self-stretch"
      >
        Log in with Google
      </Button>
    </div>
  );
};

export default LoginPage; 