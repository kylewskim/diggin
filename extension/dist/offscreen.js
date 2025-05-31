/* eslint-disable no-undef */
// DIGGIN Extension v4.8 - Firebase Iframe Offscreen Document (Gem Pattern)
// Using proven gem-signin iframe approach for reliable authentication

console.log('[DIGGIN] Offscreen: Firebase Iframe v4.8 - Using Gem Pattern');

// This URL must point to the public Firebase site
const _URL = 'https://offscreen.firebaseapp.com/';
const iframe = document.createElement('iframe');
iframe.src = _URL;
document.documentElement.appendChild(iframe);

chrome.runtime.onMessage.addListener(handleChromeMessages);

function handleChromeMessages(message, sender, sendResponse) {
  console.log('[DIGGIN] Offscreen: Received message:', message.type);
  
  // Extensions may have an number of other reasons to send messages, so you
  // should filter out any that are not meant for the offscreen document.
  if (message.target !== 'offscreen') {
    return false;
  }

  function handleIframeMessage({ data }) {
    try {
      if (data.startsWith('!_{')) {
        // Other parts of the Firebase library send messages using postMessage.
        // You don't care about them in this context, so return early.
        return;
      }
      data = JSON.parse(data);
      self.removeEventListener('message', handleIframeMessage);

      console.log('[DIGGIN] Offscreen: Authentication result received:', data.user ? 'success' : 'failed');
      sendResponse(data);
    } catch (e) {
      console.error('[DIGGIN] Offscreen: JSON parse failed:', e.message);
      sendResponse({ error: e.message, success: false });
    }
  }

  globalThis.addEventListener('message', handleIframeMessage, false);

  // Initialize the authentication flow in the iframed document. You must set the
  // second argument (targetOrigin) of the message in order for it to be successfully
  // delivered.
  console.log('[DIGGIN] Offscreen: Initializing Firebase auth in iframe');
  iframe.contentWindow.postMessage({ initAuth: true }, new URL(_URL).origin);
  return true;
}

console.log('[DIGGIN] Offscreen: Firebase Iframe v4.8 initialization completed'); 