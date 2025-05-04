import { useState, useEffect } from 'react'
import { auth } from '@shared/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signInWithGoogle, signOut } from '@shared/services/auth'
import { createHole, getUserHoles } from '@shared/services/holeService'
import { Hole } from '@shared/models/types'

function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [holes, setHoles] = useState<Hole[]>([])
  const [newHoleName, setNewHoleName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('utility-1') // Default icon

  useEffect(() => {
    // Firebase 연결 테스트
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Firebase 연결 상태:', !!auth)
      console.log('현재 사용자:', user)
      setIsConnected(!!auth)
      setUser(user)
      
      if (user) {
        loadUserHoles(user.uid)
      } else {
        setHoles([])
      }
    })

    return () => unsubscribe()
  }, [])

  const loadUserHoles = async (userId: string) => {
    try {
      const userHoles = await getUserHoles(userId)
      setHoles(userHoles)
    } catch (err) {
      console.error('홀 로딩 실패:', err)
      setError('홀을 불러오는 중 오류가 발생했습니다.')
    }
  }

  const handleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      await signInWithGoogle()
    } catch (err) {
      console.error('로그인 실패:', err)
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setLoading(true)
      setError(null)
      await signOut()
    } catch (err) {
      console.error('로그아웃 실패:', err)
      setError('로그아웃 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateHole = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newHoleName.trim()) return
    
    try {
      setLoading(true)
      setError(null)
      
      await createHole(user.uid, newHoleName, selectedIcon)
      setNewHoleName('')
      
      // 홀 목록 리로드
      await loadUserHoles(user.uid)
    } catch (err) {
      console.error('홀 생성 실패:', err)
      setError('홀을 생성하는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

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

          <div className="mt-4">
            {!user ? (
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? '로그인 중...' : 'Google로 로그인'}
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? '로그아웃 중...' : '로그아웃'}
              </button>
            )}
          </div>

          {error && (
            <div className="mt-2 text-red-500 text-sm">{error}</div>
          )}
          
          {user && (
            <>
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <h2 className="font-medium mb-2">사용자 정보:</h2>
                <div className="flex items-center space-x-4 mb-4">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">{user.displayName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded">
                <h2 className="font-medium mb-4">내 홀 목록</h2>
                
                <form onSubmit={handleCreateHole} className="mb-4 flex space-x-2">
                  <input
                    type="text"
                    value={newHoleName}
                    onChange={(e) => setNewHoleName(e.target.value)}
                    placeholder="새 홀 이름"
                    className="flex-1 px-3 py-2 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading || !newHoleName.trim()}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    {loading ? '생성 중...' : '홀 생성'}
                  </button>
                </form>
                
                {holes.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">아직 생성된 홀이 없습니다.</p>
                ) : (
                  <ul className="space-y-2">
                    {holes.map((hole) => (
                      <li 
                        key={hole.id}
                        className="p-3 bg-white rounded border flex justify-between items-center"
                      >
                        <span>{hole.name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(hole.createdAt.toDate()).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 
 
 
 
 
 