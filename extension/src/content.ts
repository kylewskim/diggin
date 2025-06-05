console.log("[DIGGIN] Content Script: Initializing clipboard monitor - Service Worker Pattern v5.0");

// Extension context validation
function isExtensionContextValid(): boolean {
  try {
    return !!(chrome && chrome.runtime && chrome.runtime.id);
  } catch (error) {
    console.log('[DIGGIN] Content Script: Extension context invalid');
    return false;
  }
}

// Simplified message sending to background script
function sendToBackground(message: any): void {
  if (!isExtensionContextValid()) {
    console.log('[DIGGIN] Content Script: Extension context invalid, skipping message');
    return;
  }

  try {
    chrome.runtime.sendMessage(message);
    console.log("[DIGGIN] Content Script: Message sent to background");
  } catch (error) {
    console.log('[DIGGIN] Content Script: Failed to send message:', error);
  }
}

// Simple copy event handler - only detect and forward to background
const handleCopy = () => {
  console.log("[DIGGIN] Content Script: Copy event detected");
  
  const copiedText = window.getSelection()?.toString();
  
  if (!copiedText || copiedText.trim().length === 0) {
    console.log("[DIGGIN] Content Script: No text selected");
    return;
  }
  
  console.log("[DIGGIN] Content Script: Copied text length:", copiedText.length);
  
  // Send to background script for processing
  sendToBackground({
    action: "COPY_EVENT",
    text: copiedText.trim(),
    url: window.location.href,
    title: document.title,
    timestamp: Date.now()
  });
};

// Register copy event listener
document.addEventListener("copy", handleCopy);

// Message listener for background script responses
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!isExtensionContextValid()) {
    return false;
  }
  
  console.log("[DIGGIN] Content Script: Received message:", message);
  
  if (message.type === "ANIMATE" || message.action === "ANIMATE") {
    console.log("[DIGGIN] Content Script: Animation requested");
    // Add visual feedback here if needed
    sendResponse({ success: true });
  }
  
  return true;
});

console.log("[DIGGIN] Content Script: Initialization complete - Service Worker Pattern v5.0"); 