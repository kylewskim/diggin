import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { auth } from '@shared/firebase';
import { onAuthStateChange, getAuthStateFromStorage } from './services/auth';
import { getUserHoles } from '@shared/services/holeService';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string>('/');

  useEffect(() => {
    // Check auth state on app load
    const unsubscribe = onAuthStateChange(async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        console.log("User is authenticated, checking holes");
        // If user is logged in, check if they have any holes
        try {
          const userHoles = await getUserHoles(currentUser.uid);
          if (userHoles.length > 0) {
            setInitialRoute('/hole-list'); // Redirect to hole list
          } else {
            setInitialRoute('/main'); // Redirect to main page
          }
        } catch (error) {
          console.error("Error checking user holes:", error);
          setInitialRoute('/');
        }
      } else {
        setInitialRoute('/');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-[320px] h-[400px] font-pretendard flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Router initialEntries={[initialRoute]}>
      <div className="w-[320px] h-[400px] font-pretendard">
        <Routes>
          <Route path="/" element={
            user ? <Navigate to={initialRoute} replace /> : <LoginPage />
          } />
          <Route path="/main" element={
            user ? <MainPage /> : <Navigate to="/" replace />
          } />
          <Route path="/hole-list" element={
            user ? <HoleListPage /> : <Navigate to="/" replace />
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
            user ? <OnSessionPage /> : <Navigate to="/" replace />
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