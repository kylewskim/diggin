console.log("[DIGGIN] Content Script: Initializing clipboard monitor - Service Worker Pattern v5.0");
function isExtensionContextValid() {
  try {
    return !!(chrome && chrome.runtime && chrome.runtime.id);
  } catch (error) {
    console.log("[DIGGIN] Content Script: Extension context invalid");
    return false;
  }
}
function sendToBackground(message) {
  if (!isExtensionContextValid()) {
    console.log("[DIGGIN] Content Script: Extension context invalid, skipping message");
    return;
  }
  try {
    chrome.runtime.sendMessage(message);
    console.log("[DIGGIN] Content Script: Message sent to background");
  } catch (error) {
    console.log("[DIGGIN] Content Script: Failed to send message:", error);
  }
}
const handleCopy = () => {
  var _a;
  console.log("[DIGGIN] Content Script: Copy event detected");
  const copiedText = (_a = window.getSelection()) == null ? void 0 : _a.toString();
  if (!copiedText || copiedText.trim().length === 0) {
    console.log("[DIGGIN] Content Script: No text selected");
    return;
  }
  console.log("[DIGGIN] Content Script: Copied text length:", copiedText.length);
  sendToBackground({
    action: "COPY_EVENT",
    text: copiedText.trim(),
    url: window.location.href,
    title: document.title,
    timestamp: Date.now()
  });
};
document.addEventListener("copy", handleCopy);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!isExtensionContextValid()) {
    return false;
  }
  console.log("[DIGGIN] Content Script: Received message:", message);
  if (message.type === "ANIMATE" || message.action === "ANIMATE") {
    console.log("[DIGGIN] Content Script: Animation requested");
    sendResponse({ success: true });
  }
  return true;
});
console.log("[DIGGIN] Content Script: Initialization complete - Service Worker Pattern v5.0");
