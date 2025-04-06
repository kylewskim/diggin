import { useState, useEffect } from 'react'
import { auth } from '@shared/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Firebase 연결 테스트
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Firebase 연결 상태:', !!auth)
      console.log('현재 사용자:', user)
      setIsConnected(!!auth)
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Diggin Firebase 연결 테스트</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Firebase 연결 상태:</span>
            {isConnected === null ? (
              <span className="text-yellow-500">확인 중...</span>
            ) : isConnected ? (
              <span className="text-green-500">연결됨 ✓</span>
            ) : (
              <span className="text-red-500">연결 실패 ✗</span>
            )}
          </div>
          {user && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h2 className="font-medium mb-2">사용자 정보:</h2>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 