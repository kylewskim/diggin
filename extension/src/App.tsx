import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SelectIconPage from './pages/SelectIconPage';
import CreateHolePage from './pages/CreateHolePage';
import HoleListPage from './pages/HoleListPage';
import EmptySessionPage from './pages/EmptySessionPage';
import CreateSessionPage from './pages/CreateSessionPage';
import SessionListPage from './pages/SessionListPage';
import OnSessionPage from './pages/OnSessionPage';
import FinishSessionPage from './pages/FinishSessionPage';
import TemplateListPage from './pages/TemplateListPage';
import { auth } from './firebase';
import { onAuthStateChange } from './services/auth';
import { getUserHoles } from '@shared/services/holeService';
import { useAuthState } from 'react-firebase-hooks/auth';

// 환경 확인 함수
function isExtensionEnvironment() {
  return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
}

// 활성 세션 확인 함수
function checkActiveSession(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!isExtensionEnvironment()) {
      console.log('Not in extension environment, skipping active session check');
      resolve({ hasActiveSession: false });
      return;
    }
    
    chrome.runtime.sendMessage({
      action: 'CHECK_ACTIVE_SESSION'
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error checking active session:', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }
      
      if (response?.success) {
        resolve({
          hasActiveSession: response.hasActiveSession,
          sessionId: response.activeSession?.sessionId,
          holeId: response.activeSession?.holeId,
          sessionName: response.activeSession?.sessionName,
          elapsedTimeInSeconds: response.activeSession?.elapsedTimeInSeconds
        });
      } else {
        console.error('Failed to check active session:', response?.error);
        resolve({ hasActiveSession: false });
      }
    });
  });
}

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string>('/');
  const [activeSession, setActiveSession] = useState<{
    sessionId?: string;
    holeId?: string;
    sessionName?: string;
    elapsedTimeInSeconds?: number;
  } | null>(null);

  console.log('App 컴포넌트 렌더링', {
    isExtension: isExtensionEnvironment(),
    hasRuntime: !!window.chrome?.runtime
  });

  useEffect(() => {
    console.log('App useEffect 실행');
    
    // 간소화된 인증 상태 확인
    const checkAuth = async () => {
      console.log("직접 Firebase 인증 상태 확인");
      
      try {
        // Firebase의 onAuthStateChange를 직접 사용
        const unsubscribe = onAuthStateChange(handleAuthChange);
        
        // 타임아웃 설정 (안전장치)
        const timeoutId = setTimeout(() => {
          console.log("🚨 Auth check timed out after 5 seconds, forcing loading to false");
          setLoading(false);
        }, 5000);
        
        return () => {
          unsubscribe();
          clearTimeout(timeoutId);
        };
      } catch (error) {
        console.error("Error checking auth state:", error);
        setLoading(false);
      }
    };
    
    // Firebase 인증 상태 변경 핸들러
    const handleAuthChange = async (currentUser: any) => {
      console.log("Auth state changed:", currentUser ? "Logged in" : "Logged out");
      setUser(currentUser);
      
      if (currentUser) {
        // 백그라운드에서 활성 세션 확인 - 가장 높은 우선순위
        try {
          console.log("[DIGGIN] App: Checking for active session...");
          const activeSessionResult = await checkActiveSession();
          
          if (activeSessionResult.hasActiveSession && activeSessionResult.sessionId) {
            console.log("[DIGGIN] App: Found active session:", activeSessionResult);
            // 활성 세션 정보 저장
            const sessionData = {
              sessionId: activeSessionResult.sessionId,
              holeId: activeSessionResult.holeId,
              sessionName: activeSessionResult.sessionName,
              elapsedTimeInSeconds: activeSessionResult.elapsedTimeInSeconds
            };
            
            setActiveSession(sessionData);
            console.log("[DIGGIN] App: Redirecting to active session page with data:", sessionData);
            
            // 활성 세션으로 바로 이동
            setInitialRoute('/session');
            setLoading(false);
            return;
          } else {
            console.log("[DIGGIN] App: No active session found");
          }
        } catch (error) {
          console.error("[DIGGIN] App: Error checking active session:", error);
        }
      
        // 활성 세션이 없는 경우, 사용자의 Hole 목록 확인
        try {
          console.log("Fetching user holes in handleAuthChange...");
          const userHoles = await getUserHoles(currentUser.uid);
          console.log("User holes in handleAuthChange:", userHoles);
          
          if (userHoles.length > 0) {
            console.log("User has holes, navigating to /hole-list");
            setInitialRoute('/hole-list');
          } else {
            console.log("User has no holes, navigating to /main");
            setInitialRoute('/main');
          }
        } catch (error) {
          console.error("Error checking user holes:", error);
          setInitialRoute('/');
        }
      } else {
        console.log("No user, navigating to /");
        setInitialRoute('/');
      }
      
      console.log("Setting loading to false in handleAuthChange");
      setLoading(false);
    };

    // 인증 상태 확인 및 복구
    checkAuth();
  }, []);

  console.log('App 렌더링 상태:', { loading, user, initialRoute, activeSession });

  if (loading) {
    return (
      <div className="w-[320px] h-[400px] font-pretendard flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // 초기 진입 경로와 상태 설정
  let initialEntryState = null;
  if (initialRoute === '/session' && activeSession) {
    initialEntryState = {
      pathname: '/session',
      state: {
        sessionId: activeSession.sessionId,
        holeId: activeSession.holeId,
        sessionName: activeSession.sessionName || ''
      }
    };
  }

  return (
    <Router initialEntries={initialEntryState ? [initialEntryState] : [initialRoute]}>
      <div className="w-[320px] h-[400px] font-pretendard">
        <Routes>
          <Route path="/" element={
            user ? <Navigate to={initialRoute} replace /> : <LoginPage />
          } />
          <Route path="/main" element={
            user ? <MainPage /> : <Navigate to="/" replace />
          } />
          <Route path="/hole-list" element={
            user ? (
              activeSession && activeSession.sessionId && !localStorage.getItem('sessionEnded')
                ? <Navigate to="/session" state={{
                    sessionId: activeSession.sessionId,
                    holeId: activeSession.holeId,
                    sessionName: activeSession.sessionName
                  }} replace />
                : <HoleListPage />
            ) : <Navigate to="/" replace />
          } />
          <Route path="/select-icon" element={
            user ? <SelectIconPage /> : <Navigate to="/" replace />
          } />
          <Route path="/create-hole" element={
            user ? <CreateHolePage /> : <Navigate to="/" replace />
          } />
          <Route path="/empty-session" element={
            user ? <EmptySessionPage /> : <Navigate to="/" replace />
          } />
          <Route path="/create-session" element={
            user ? <CreateSessionPage /> : <Navigate to="/" replace />
          } />
          <Route path="/session-list" element={
            user ? <SessionListPage /> : <Navigate to="/" replace />
          } />
          <Route path="/session" element={
            user 
              ? <OnSessionPage />
              : <Navigate to="/" replace />
          } />
          <Route path="/finish-session" element={
            user ? <FinishSessionPage /> : <Navigate to="/" replace />
          } />
          <Route path="/template-list" element={<TemplateListPage />} />
          <Route path="*" element={<Navigate to={user ? initialRoute : "/"} replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 