import { Message } from '../types/interfaces';
import { B_TO_P, B_TO_C } from '../types/enums';

/**
 * 백그라운드에서 팝업으로 메시지 전송
 */
export const send_B_to_P_message = async (message: { key: B_TO_P; data?: any }) => {
  console.log('Background sending message to popup:', message);
  
  return new Promise<void>((resolve) => {
    try {
      chrome.runtime.sendMessage(message, () => {
        if (chrome.runtime.lastError) {
          console.warn('Failed to send message to popup:', chrome.runtime.lastError);
        }
        resolve();
      });
    } catch (error) {
      console.error('Error sending message to popup:', error);
      resolve();
    }
  });
};

/**
 * 백그라운드에서 콘텐츠 스크립트로 메시지 전송
 */
export const send_B_to_C_message = async (tabId: number, message: { type: B_TO_C; data?: any }) => {
  console.log('Background sending message to content script:', { tabId, message });
  
  return new Promise<void>((resolve) => {
    try {
      chrome.tabs.sendMessage(tabId, message, () => {
        if (chrome.runtime.lastError) {
          console.warn('Failed to send message to content script:', chrome.runtime.lastError);
        }
        resolve();
      });
    } catch (error) {
      console.error('Error sending message to content script:', error);
      resolve();
    }
  });
}; 