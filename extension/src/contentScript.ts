// Background Script와의 연결 설정
const port = chrome.runtime.connect({ name: 'clipboard-monitor' });
let insightCount = 0;

// 백그라운드 스크립트에서 메시지 수신
port.onMessage.addListener((message) => {
  if (message.type === 'TEXT_SAVED' && message.success) {
    console.log('Content Script: Text saved successfully');
    insightCount = message.insightCount || (insightCount + 1);
  }
});

// 복사 이벤트 리스너
document.addEventListener('copy', async (e) => {
  try {
    console.log('Content Script: Copy event detected');
    
    // 권한 요청 (필요한 경우)
    try {
      await navigator.clipboard.readText();
    } catch (error) {
      console.log('Content Script: Clipboard permission not granted');
    }
    
    // ClipboardEvent에서 텍스트 데이터 가져오기
    const clipboardData = (e as ClipboardEvent).clipboardData;
    if (!clipboardData) {
      console.log('Content Script: No clipboard data available');
      return;
    }
    
    const text = clipboardData.getData('text/plain');
    if (!text) {
      console.log('Content Script: No text content in clipboard');
      return;
    }
    
    console.log('Content Script: Copied text:', text.substring(0, 50) + (text.length > 50 ? '...' : ''));
    
    // 백그라운드 스크립트로 복사된 텍스트 전송
    port.postMessage({
      type: 'COPIED_TEXT',
      text: text,
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString(),
      insightCount: insightCount
    });
  } catch (error) {
    console.error('Content Script: Error handling copy event:', error);
  }
});

// 세션 상태 확인
function checkSessionStatus() {
  chrome.runtime.sendMessage({ type: 'GET_SESSION_STATUS' }, (response) => {
    if (response && response.sessionId && response.isActive) {
      console.log('Content Script: Active session detected', response);
    } else {
      console.log('Content Script: No active session');
    }
  });
}

// 초기화 시 세션 상태 확인
checkSessionStatus();

console.log('Content Script: Clipboard monitor initialized');

// 페이지가 언로드될 때 연결 종료
window.addEventListener('beforeunload', () => {
  port.disconnect();
}); 