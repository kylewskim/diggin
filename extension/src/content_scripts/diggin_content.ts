import { animate } from './diggin_animation';
import { send_C_to_B_message } from './messaging_integration';
import { B_TO_C, C_TO_B, InsightType } from '../types/enums';
import { C_TO_B_DATA } from '../types/interfaces';

/**
 * Background Script로부터 오는 메시지 타입
 */
type MessageFromBackgroundScript = {
  type: B_TO_C;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

/**
 * 복사된 항목을 로컬 스토리지에 저장하는 함수
 */
function saveCopyToLocalStorage(content: string, url: string, title: string): void {
  const copiedItem = {
    content,
    url,
    title,
    timestamp: Date.now(),
  };

  try {
    chrome.storage.local.get('pendingCopiedItems', (result) => {
      if (chrome.runtime.lastError) {
        console.error('Content Script: Error accessing local storage:', chrome.runtime.lastError);
        return;
      }

      const pendingItems = result.pendingCopiedItems || [];
      pendingItems.push(copiedItem);

      chrome.storage.local.set({ pendingCopiedItems: pendingItems }, () => {
        if (chrome.runtime.lastError) {
          console.error('Content Script: Error saving to local storage:', chrome.runtime.lastError);
          return;
        }
        console.log('Content Script: Saved copy to pending queue (size:', pendingItems.length, ')');
      });
    });
  } catch (error) {
    console.error('Content Script: Error in saveCopyToLocalStorage:', error);
  }
}

/**
 * 데이터를 백그라운드 스크립트로 보내는 함수
 */
const sendToServiceWorker = ({ type, value }: { type: InsightType; value: string }) => {
  console.log('Content Script: Sending to service worker', { type, value });

  try {
    send_C_to_B_message({
      key: C_TO_B.C_TO_B_DATA,
      data: {
        type,
        value,
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString(),
        highlight: false,
      } as C_TO_B_DATA,
    });
  } catch (error) {
    console.error('Content Script: Failed to send to background, saving locally:', error);
    saveCopyToLocalStorage(value, window.location.href, document.title);
  }
};

/**
 * 복사 이벤트 리스너
 */
document.addEventListener('copy', () => {
  const copiedText = window.getSelection()?.toString();

  if (!copiedText) {
    console.log('Content Script: No text selected for copying');
    return;
  }

  console.log('Content Script: Copy event detected', copiedText.substring(0, 30) + (copiedText.length > 30 ? '...' : ''));

  try {
    sendToServiceWorker({
      type: InsightType.TEXT,
      value: copiedText,
    });
  } catch (error) {
    console.error('Content Script: Error in copy event handler, saving locally:', error);
    saveCopyToLocalStorage(copiedText, window.location.href, document.title);
  }
});

// 키보드 복사 이벤트도 감지하기 위한 핸들러 (Ctrl+C / Cmd+C)
document.addEventListener('keydown', (e) => {
  // Ctrl+C 또는 Cmd+C (맥)
  if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
    console.log('Content Script: Keyboard copy handler activated');
    
    // 선택된 텍스트 가져오기
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      // 약간의 지연을 두고 처리 (복사 이벤트가 제대로 처리되도록)
      setTimeout(() => {
        try {
          sendToServiceWorker({
            type: InsightType.TEXT,
            value: selectedText,
          });
        } catch (error) {
          console.error('Content Script: Error in keyboard copy handler, saving locally:', error);
          saveCopyToLocalStorage(selectedText, window.location.href, document.title);
        }
      }, 100);
    }
  }
});

/**
 * 백그라운드 스크립트로부터 메시지 수신
 */
try {
  chrome.runtime.onMessage.addListener((message: MessageFromBackgroundScript) => {
    console.log('Content Script: Message from background script', message);

    try {
      switch (message.type) {
        case B_TO_C.B_TO_C_ANIMATE: {
          const { color, numInsights } = message.data;
          console.log('Content Script: Animating with', { color, numInsights });
          animate({ color, numInsights });
          break;
        }
        
        // 기타 메시지 타입 처리
        default:
          console.log('Content Script: Unhandled message type', message.type);
          break;
      }
    } catch (error) {
      console.error('Content Script: Error processing message:', error);
    }
  });
} catch (error) {
  console.error('Content Script: Error setting up message listener:', error);
}

// 주기적으로 익스텐션 컨텍스트 유효성 검사 및 오류 복구
let periodicCheckActive = true;

// 주기적 검사 실행 전 확장 프로그램 컨텍스트 유효성 검증
function isExtensionContextValid(): boolean {
  try {
    // 간단한 API 호출로 컨텍스트 유효성 검사
    chrome.runtime.getURL('');
    return true;
  } catch (error) {
    console.warn('[DIGGIN DEBUG] Content Script: Extension context invalid in periodic check');
    return false;
  }
}

// 주기적 검사 시작
const startPeriodicCheck = () => {
  if (!periodicCheckActive) return;
  
  const checkInterval = setInterval(() => {
    try {
      // 확장 프로그램 컨텍스트 유효성 검사
      if (!isExtensionContextValid()) {
        console.log('Content Script: Extension context invalid, skipping periodic check');
        
        // 확장 프로그램 컨텍스트가 무효화되면 주기적 검사 중지
        clearInterval(checkInterval);
        periodicCheckActive = false;
        
        // 3초 후 다시 시작 시도
        setTimeout(() => {
          console.log('Content Script: Attempting to restart periodic check');
          periodicCheckActive = true;
          startPeriodicCheck();
        }, 3000);
        
        return;
      }
      
      // 보류 중인 항목 처리 시도
      chrome.storage.local.get('pendingCopiedItems', (result) => {
        if (chrome.runtime.lastError) {
          console.error('Content Script: Error accessing local storage in periodic check:', chrome.runtime.lastError);
          return;
        }
        
        const pendingItems = result.pendingCopiedItems || [];
        if (pendingItems.length === 0) return;
        
        console.log('Content Script: Found', pendingItems.length, 'pending items to process');
        
        // 첫 번째 항목만 처리 시도 (실패 시 나머지는 다음 주기에)
        if (pendingItems.length > 0) {
          const item = pendingItems[0];
          try {
            send_C_to_B_message({
              key: C_TO_B.C_TO_B_DATA,
              data: {
                type: InsightType.TEXT,
                value: item.content,
                url: item.url,
                title: item.title,
                timestamp: new Date(item.timestamp).toISOString(),
                highlight: false,
              } as C_TO_B_DATA,
            });
            
            // 성공적으로 처리된 항목 제거
            pendingItems.shift();
            chrome.storage.local.set({ pendingCopiedItems: pendingItems }, () => {
              if (chrome.runtime.lastError) {
                console.error('Content Script: Error updating pending items:', chrome.runtime.lastError);
                return;
              }
              console.log('Content Script: Successfully processed 1 pending item,', pendingItems.length, 'remaining');
            });
          } catch (error) {
            console.error('Content Script: Failed to process pending item:', error);
          }
        }
      });
    } catch (error) {
      // 오류 처리 개선 - 원인과 조치 사항 로깅
      if (error instanceof Error) {
        if (error.message.includes('Extension context invalidated')) {
          console.warn('Content Script: Extension context invalidated in periodic check, will retry later');
          
          // 확장 프로그램 컨텍스트가 무효화되면 기존 인터벌 중지
          clearInterval(checkInterval);
          periodicCheckActive = false;
          
          // 일정 시간 후 다시 시작 시도
          setTimeout(() => {
            console.log('Content Script: Attempting to restart periodic check after context invalidation');
            periodicCheckActive = true;
            startPeriodicCheck();
          }, 5000);
        } else {
          console.error('Content Script: Error in periodic check:', error.message);
        }
      } else {
        console.error('Content Script: Unknown error in periodic check');
      }
    }
  }, 30000); // 30초마다 실행
  
  return checkInterval;
};

// 주기적 검사 초기 시작
startPeriodicCheck();

console.log('Content Script: Diggin content script initialized'); 