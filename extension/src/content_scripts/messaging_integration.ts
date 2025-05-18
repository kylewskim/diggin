import { C_TO_B } from '../types/enums';

/**
 * 확장 프로그램 컨텍스트 유효성 확인 함수
 */
export const isExtensionContextValid = (): boolean => {
  try {
    // 간단한 API 호출로 컨텍스트 유효성 검사
    chrome.runtime.getURL('');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.warn('[DIGGIN DEBUG] Content Script: Extension context invalid - ' + error.message);
    } else {
      console.warn('[DIGGIN DEBUG] Content Script: Extension context invalid - unknown reason');
    }
    return false;
  }
};

/**
 * 복사된 항목을 로컬 스토리지에 저장하는 함수
 */
const saveCopyDataToLocalStorage = (data: any): void => {
  try {
    if (!data || !data.type || !data.value) {
      console.error('[DIGGIN DEBUG] Content Script: Invalid data for local storage save');
      return;
    }
    
    const copiedItem = {
      content: data.value,
      url: data.url || window.location.href,
      title: data.title || document.title,
      timestamp: Date.now(),
    };
    
    // 로컬 스토리지 접근 시 오류 처리 강화
    try {
      chrome.storage.local.get('pendingCopiedItems', (result) => {
        if (chrome.runtime.lastError) {
          console.error('[DIGGIN DEBUG] Content Script: Error accessing local storage:', chrome.runtime.lastError);
          return;
        }
        
        const pendingItems = result.pendingCopiedItems || [];
        pendingItems.push(copiedItem);
        
        chrome.storage.local.set({ pendingCopiedItems: pendingItems }, () => {
          if (chrome.runtime.lastError) {
            console.error('[DIGGIN DEBUG] Content Script: Error saving to local storage:', chrome.runtime.lastError);
            return;
          }
          console.log('[DIGGIN DEBUG] Content Script: Saved copy to pending queue (size:', pendingItems.length, ')');
        });
      });
    } catch (storageError) {
      console.error('[DIGGIN DEBUG] Content Script: Failed to save to local storage:', storageError);
      
      // 최후의 수단: sessionStorage에 임시 저장 시도
      try {
        const pendingItems = JSON.parse(sessionStorage.getItem('diggin_pendingItems') || '[]');
        pendingItems.push(copiedItem);
        sessionStorage.setItem('diggin_pendingItems', JSON.stringify(pendingItems));
        console.log('[DIGGIN DEBUG] Content Script: Saved copy to session storage as fallback (size:', pendingItems.length, ')');
      } catch (sessionStorageError) {
        console.error('[DIGGIN DEBUG] Content Script: Failed to save to session storage fallback:', sessionStorageError);
      }
    }
  } catch (error) {
    console.error('[DIGGIN DEBUG] Content Script: Error in saveCopyDataToLocalStorage:', error);
  }
};

/**
 * Content Script에서 Background Script로 메시지를 보내는 함수
 */
export const send_C_to_B_message = ({ key, data }: { key: C_TO_B; data: any }): void => {
  // 컨텍스트 유효성 먼저 확인
  if (!isExtensionContextValid()) {
    console.warn('[DIGGIN DEBUG] Content Script: Extension context invalid, saving to local storage only');
    
    // 오류가 발생한 데이터를 로컬 스토리지에 저장
    if (key === C_TO_B.C_TO_B_DATA) {
      saveCopyDataToLocalStorage(data);
    }
    
    return;
  }
  
  // 컨텍스트가 유효한 경우 메시지 전송
  try {
    chrome.runtime.sendMessage({
      key,
      data
    }, (response) => {
      // 응답 처리 (옵션)
      if (chrome.runtime.lastError) {
        console.error('[DIGGIN DEBUG] Content Script: Error in message response:', chrome.runtime.lastError);
        
        // 메시지 전송 실패 시 로컬 스토리지에 저장
        if (key === C_TO_B.C_TO_B_DATA) {
          saveCopyDataToLocalStorage(data);
        }
      } else if (response) {
        console.log('[DIGGIN DEBUG] Content Script: Message sent successfully, response:', response);
      }
    });
  } catch (error) {
    console.error('[DIGGIN DEBUG] Content Script: Error sending message to background script:', error);
    
    // 백그라운드로 메시지 전송에 실패한 경우에도 로컬 스토리지에 저장 시도
    if (key === C_TO_B.C_TO_B_DATA) {
      saveCopyDataToLocalStorage(data);
    }
  }
}; 