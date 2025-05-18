// 클립보드 모니터링을 위한 content script
console.log('[DIGGIN] Content Script: Initializing clipboard monitor');

// 백그라운드 스크립트 연결 상태
let clipboardPort: chrome.runtime.Port | null = null;
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000; // 3초

// 백그라운드 스크립트에 연결
function connectToBackground() {
  try {
    console.log('[DIGGIN] Content Script: Connecting to background script');
    clipboardPort = chrome.runtime.connect({ name: "clipboard" });
    isConnected = true;
    reconnectAttempts = 0;
    
    console.log('[DIGGIN] Content Script: Connection established');
    
    // 테스트 메시지 전송
    clipboardPort.postMessage({
      action: 'CONNECTION_TEST',
      timestamp: Date.now()
    });
    
    // 메시지 수신 처리
    clipboardPort.onMessage.addListener((message) => {
      console.log('[DIGGIN] Content Script: Received message from background:', message.action);
      
      if (message.action === 'COPY_SAVED') {
        if (message.success) {
          console.log('[DIGGIN] Content Script: Copy saved successfully, insight count:', message.insightCount);
        } else {
          console.warn('[DIGGIN] Content Script: Failed to save copy:', message.error);
        }
      } else if (message.action === 'CONNECTION_TEST_RESPONSE') {
        console.log('[DIGGIN] Content Script: Connection test successful, auth status:', 
          message.authStatus ? 'Authenticated' : 'Not authenticated', 
          'Session status:', 
          message.sessionStatus
        );
      }
    });
    
    // 연결 해제 처리
    clipboardPort.onDisconnect.addListener(() => {
      console.warn('[DIGGIN] Content Script: Disconnected from background');
      isConnected = false;
      clipboardPort = null;
      
      // 연결 해제 시 자동 재연결 시도
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        console.log(`[DIGGIN] Content Script: Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
        
        setTimeout(() => {
          connectToBackground();
        }, RECONNECT_DELAY);
      } else {
        console.error('[DIGGIN] Content Script: Maximum reconnect attempts reached');
      }
    });
  } catch (error) {
    console.error('[DIGGIN] Content Script: Failed to connect to background script:', error);
    isConnected = false;
    clipboardPort = null;
    
    // 연결 실패 시 자동 재연결 시도
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      console.log(`[DIGGIN] Content Script: Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
      
      setTimeout(() => {
        connectToBackground();
      }, RECONNECT_DELAY);
    } else {
      console.error('[DIGGIN] Content Script: Maximum reconnect attempts reached');
    }
  }
}

// 초기 연결 설정
connectToBackground();

// 클립보드 copy 이벤트 핸들러
async function handleCopy(event: ClipboardEvent) {
  console.log('[DIGGIN] Content Script: Copy event detected');
  
  try {
    // 클립보드에서 텍스트 가져오기
    let text = '';
    
    // clipboardData API에서 텍스트 가져오기 시도
    if (event.clipboardData && event.clipboardData.getData) {
      text = event.clipboardData.getData('text/plain');
    }
    
    // clipboardData에서 텍스트를 가져오지 못한 경우 navigator.clipboard API 시도
    if (!text && navigator.clipboard && navigator.clipboard.readText) {
      try {
        text = await navigator.clipboard.readText();
      } catch (err) {
        console.warn('[DIGGIN] Content Script: Failed to read from clipboard API:', err);
      }
    }
    
    if (!text) {
      console.warn('[DIGGIN] Content Script: No text found in clipboard');
      return;
    }
    
    console.log('[DIGGIN] Content Script: Copied text length:', text.length);
    
    // 백그라운드 스크립트 연결 확인
    if (!isConnected || !clipboardPort) {
      console.warn('[DIGGIN] Content Script: Not connected to background, reconnecting...');
      connectToBackground();
      
      // 연결이 성공하지 않으면 종료
      if (!isConnected || !clipboardPort) {
        console.error('[DIGGIN] Content Script: Failed to reconnect to background');
        return;
      }
    }
    
    // 복사된 텍스트 정보 전송
    clipboardPort.postMessage({
      action: 'COPY_EVENT',
      text: text,
      url: window.location.href,
      title: document.title,
      timestamp: Date.now()
    });
    
    console.log('[DIGGIN] Content Script: Copy event sent to background');
  } catch (err) {
    console.error('[DIGGIN] Content Script: Error handling copy event:', err);
  }
}

// Copy 이벤트 리스너 등록
document.addEventListener('copy', handleCopy);

// 페이지 가시성 변경 시 연결 상태 확인
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('[DIGGIN] Content Script: Page became visible, checking connection...');
    
    // 연결 상태 확인 및 필요시 재연결
    if (!isConnected || !clipboardPort) {
      console.log('[DIGGIN] Content Script: Not connected, reconnecting...');
      connectToBackground();
    } else {
      console.log('[DIGGIN] Content Script: Connection already active');
      
      // 테스트 메시지 전송
      clipboardPort.postMessage({
        action: 'CONNECTION_TEST',
        timestamp: Date.now()
      });
    }
  }
});

// 주기적으로 연결 상태 확인 (매 5분마다)
setInterval(() => {
  if (!isConnected || !clipboardPort) {
    console.log('[DIGGIN] Content Script: Connection check failed, reconnecting...');
    connectToBackground();
  } else {
    console.log('[DIGGIN] Content Script: Connection check passed');
    
    // 테스트 메시지 전송
    clipboardPort.postMessage({
      action: 'CONNECTION_TEST',
      timestamp: Date.now()
    });
  }
}, 5 * 60 * 1000);

// 페이지 언로드 시 이벤트 처리
window.addEventListener('beforeunload', () => {
  console.log('[DIGGIN] Content Script: Page unloading, final connection check');
  
  if (clipboardPort) {
    clipboardPort.postMessage({
      action: 'PAGE_UNLOAD',
      timestamp: Date.now()
    });
  }
}); 