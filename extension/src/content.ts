console.log("[DIGGIN] Content Script: Initializing clipboard monitor v4.4");

// Extension context validation - prevent invalidation errors
function isExtensionContextValid(): boolean {
  try {
    // Multiple checks to ensure extension context is valid
    if (typeof chrome === 'undefined' || !chrome.runtime) {
      return false;
    }
    
    // Check if runtime ID exists
    if (!chrome.runtime.id) {
      return false;
    }
    
    // Try to access extension URL - this will throw if context is invalid
    chrome.runtime.getURL('');
    
    // Additional check for sendMessage function
    if (typeof chrome.runtime.sendMessage !== 'function') {
      return false;
    }
    
    return true;
  } catch (error) {
    // Context is invalid - this is expected behavior, not an error
    console.log('[DIGGIN] Content Script: Extension context invalid (expected during navigation)');
    return false;
  }
}

// Simplified safe message sending - no response expected for copy events
function safeSendMessage(message: any): void {
  // Check extension context before sending
  if (!isExtensionContextValid()) {
    console.log('[DIGGIN] Content Script: Extension context invalid, storing message for recovery');
    
    // Store failed message data locally for potential recovery
    try {
      const failedMessages = JSON.parse(localStorage.getItem('diggin_failed_messages') || '[]');
      failedMessages.push({
        message,
        timestamp: Date.now(),
        url: window.location.href
      });
      
      // Keep only last 10 failed messages to prevent storage bloat
      if (failedMessages.length > 10) {
        failedMessages.splice(0, failedMessages.length - 10);
      }
      
      localStorage.setItem('diggin_failed_messages', JSON.stringify(failedMessages));
      console.log('[DIGGIN] Content Script: Message stored locally for recovery');
    } catch (storageError) {
      console.warn('[DIGGIN] Content Script: Failed to store message locally:', storageError);
    }
    
    return;
  }

  // Context is valid, send message safely - NO RESPONSE EXPECTED
  try {
    chrome.runtime.sendMessage(message);
    console.log("[DIGGIN] Content Script: Message sent successfully");
  } catch (error) {
    // Only log actual errors, not context invalidation
    if (error instanceof Error && error.message.includes('Extension context invalidated')) {
      console.log('[DIGGIN] Content Script: Extension context became invalid during send');
    } else {
      console.error('[DIGGIN] Content Script: Error sending message:', error);
    }
    
    // Store message locally on any send error
    try {
      const failedMessages = JSON.parse(localStorage.getItem('diggin_failed_messages') || '[]');
      failedMessages.push({
        message,
        timestamp: Date.now(),
        url: window.location.href,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      localStorage.setItem('diggin_failed_messages', JSON.stringify(failedMessages));
    } catch (storageError) {
      console.warn('[DIGGIN] Content Script: Failed to store error message:', storageError);
    }
  }
}

// Enhanced copy event handler with safe messaging
const handleCopy = () => {
  console.log("[DIGGIN] Content Script: Copy event detected");
  
  const copiedText = window.getSelection()?.toString();
  
  if (!copiedText || copiedText.trim().length === 0) {
    console.log("[DIGGIN] Content Script: No text selected");
    return;
  }
  
  console.log("[DIGGIN] Content Script: Copied text length:", copiedText.length);
  
  // Use safe message sending - fire and forget, no response expected
  safeSendMessage({
    action: "COPY_EVENT",
    text: copiedText.trim(),
    url: window.location.href,
    title: document.title,
    timestamp: Date.now()
  });
};

// Register copy event listener
document.addEventListener("copy", handleCopy);

// Enhanced message listener with context validation
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Validate context before processing messages
  if (!isExtensionContextValid()) {
    console.log('[DIGGIN] Content Script: Cannot process message - extension context invalid (expected during navigation)');
    return false;
  }
  
  console.log("[DIGGIN] Content Script: Received message:", message);
  
  if (message.type === "ANIMATE" || message.action === "ANIMATE") {
    console.log("[DIGGIN] Content Script: Animation requested");
    sendResponse({ success: true });
  }
  
  return true;
});

// Recovery mechanism - attempt to send failed messages when context becomes valid
function attemptMessageRecovery(): void {
  if (!isExtensionContextValid()) {
    return;
  }
  
  try {
    const failedMessages = JSON.parse(localStorage.getItem('diggin_failed_messages') || '[]');
    
    if (failedMessages.length > 0) {
      console.log(`[DIGGIN] Content Script: Attempting to recover ${failedMessages.length} failed messages`);
      
      failedMessages.forEach((failedMessage: any, index: number) => {
        // Only retry messages from the last 5 minutes to avoid spam
        const messageAge = Date.now() - failedMessage.timestamp;
        if (messageAge < 5 * 60 * 1000) { // 5 minutes
          setTimeout(() => {
            safeSendMessage(failedMessage.message);
            console.log(`[DIGGIN] Content Script: Recovered message ${index + 1} sent`);
          }, index * 100); // Stagger sends to avoid overwhelming
        }
      });
      
      // Clear recovered messages
      localStorage.removeItem('diggin_failed_messages');
    }
  } catch (error) {
    console.warn('[DIGGIN] Content Script: Error during message recovery:', error);
  }
}

// Periodically check for context validity and attempt recovery
setInterval(() => {
  if (isExtensionContextValid()) {
    attemptMessageRecovery();
  }
}, 10000); // Check every 10 seconds

// Initial recovery attempt
setTimeout(attemptMessageRecovery, 1000); // Wait 1 second after load

console.log("[DIGGIN] Content Script: Initialization complete v4.4 - Enhanced error handling and context validation"); 
console.log('[DIGGIN] Content Script: Initialization complete - monitoring copy events with graceful error handling'); 