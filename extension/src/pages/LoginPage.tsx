import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { auth, db } from '@shared/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithCredential } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getUserHoles } from '@shared/services/holeService';
import { signInWithGoogle as extensionSignIn } from '../services/auth';

// 환경 확인 함수
const isExtensionEnvironment = (): boolean => {
  return (
    typeof window !== 'undefined' && 
    !!window.chrome?.runtime && 
    !!window.chrome?.identity
  );
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let user;
      
      // 환경에 따른 로그인 로직 실행
      if (isExtensionEnvironment()) {
        console.log("Using Chrome extension auth flow");
        // 익스텐션 환경에서는 기존 서비스 사용
        user = await extensionSignIn();
      } else {
        console.log("Using web auth flow");
        // 웹 환경에서는 Firebase Popup 인증 사용
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        user = result.user;
        
        // Firestore에 사용자 정보 저장
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp(),
        }, { merge: true });
      }
      
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
    <div className="w-80 h-[400px] px-2 pb-2 bg-color-surface-bg inline-flex flex-col justify-between items-center font-pretendard">
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