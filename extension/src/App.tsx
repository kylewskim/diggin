import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SelectIconPage from './pages/SelectIconPage';
import CreateHolePage from './pages/CreateHolePage';
import HoleListPage from './pages/HoleListPage';
import EmptySessionPage from './pages/EmptySessionPage';
import CreateSessionPage from './pages/CreateSessionPage';
import SessionListPage from './pages/SessionListPage';
import OnSessionPage from './pages/OnSessionPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-[320px] h-[400px] font-pretendard">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/hole-list" element={<HoleListPage />} />
          <Route path="/select-icon" element={<SelectIconPage />} />
          <Route path="/create-hole" element={<CreateHolePage />} />
          <Route path="/empty-session" element={<EmptySessionPage />} />
          <Route path="/create-session" element={<CreateSessionPage />} />
          <Route path="/session-list" element={<SessionListPage />} />
          <Route path="/session" element={<OnSessionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 