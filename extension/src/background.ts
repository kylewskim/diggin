chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_CLIPBOARD_DATA') {
    // 클립보드 데이터 가져오기
    navigator.clipboard.readText()
      .then(text => {
        sendResponse({ success: true, text });
      })
      .catch(error => {
        console.error('Failed to read clipboard:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // 비동기 응답을 위해 true 반환
  }
}); 