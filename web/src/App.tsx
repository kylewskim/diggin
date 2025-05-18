import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { auth } from '@shared/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import HoleListPage from './pages/HoleListPage'
import InsightsPage from './pages/InsightsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setInitializing(false)
    })

    return () => unsubscribe()
  }, [])

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-color-surface-bg">
        <div className="text-center">
          <div className="text-color-text-primary text-xl font-medium">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/holes" element={
            <ProtectedRoute>
              <HoleListPage />
            </ProtectedRoute>
          } />
          <Route path="/holes/:holeId/insights" element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App 
 
 
 
 
 
 