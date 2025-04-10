import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Google 로그인 로직 구현
    console.log('Google login clicked');
    // 로그인 성공 시 메인 페이지로 이동
    navigate('/main');
  };

  return (
    <div className="w-80 h-96 px-2 pb-2 bg-color-surface-bg outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-between items-center">
      <div className="self-stretch flex-1 flex flex-col justify-center items-center gap-6">
        <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
        <div className="text-center justify-center text-zinc-800 text-base font-medium font-['Pretendard'] leading-snug">
          To start diggin,<br/>log in or create a new account.
        </div>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="self-stretch h-12 min-w-24 px-5 bg-color-fill-primary rounded-lg inline-flex justify-center items-center gap-2"
      >
        <div className="flex-1 text-center justify-center text-color-text-inverted text-base font-medium font-['Pretendard'] leading-snug">
          Log in with Google
        </div>
      </button>
    </div>
  );
};

export default LoginPage; 