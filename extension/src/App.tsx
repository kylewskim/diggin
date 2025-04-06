import { useState } from 'react'
import { Button } from '@shared/components/ui/button'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="w-[320px] h-[400px] bg-white flex flex-col">
      {/* 헤더 */}
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">Diggin</h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-4 overflow-y-auto">
        {isLoggedIn ? (
          <div className="space-y-4">
            {/* 로그인된 상태의 UI */}
            <div className="space-y-2">
              <h2 className="font-medium">Recent Clips</h2>
              {/* 클립 목록 */}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-center text-gray-600">
              Please log in to start clipping
            </p>
            <Button onClick={() => setIsLoggedIn(true)}>
              Log In
            </Button>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="p-4 border-t">
        <Button variant="ghost" size="sm" className="w-full">
          Settings
        </Button>
      </footer>
    </div>
  )
}

export default App 