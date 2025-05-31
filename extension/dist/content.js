console.log("[DIGGIN] Content Script: Initializing clipboard monitor v4.4");
function isExtensionContextValid() {
  try {
    if (typeof chrome === "undefined" || !chrome.runtime) {
      return false;
    }
    if (!chrome.runtime.id) {
      return false;
    }
    chrome.runtime.getURL("");
    if (typeof chrome.runtime.sendMessage !== "function") {
      return false;
    }
    return true;
  } catch (error) {
    console.log("[DIGGIN] Content Script: Extension context invalid (expected during navigation)");
    return false;
  }
}
function safeSendMessage(message) {
  if (!isExtensionContextValid()) {
    console.log("[DIGGIN] Content Script: Extension context invalid, storing message for recovery");
    try {
      const failedMessages = JSON.parse(localStorage.getItem("diggin_failed_messages") || "[]");
      failedMessages.push({
        message,
        timestamp: Date.now(),
        url: window.location.href
      });
      if (failedMessages.length > 10) {
        failedMessages.splice(0, failedMessages.length - 10);
      }
      localStorage.setItem("diggin_failed_messages", JSON.stringify(failedMessages));
      console.log("[DIGGIN] Content Script: Message stored locally for recovery");
    } catch (storageError) {
      console.warn("[DIGGIN] Content Script: Failed to store message locally:", storageError);
    }
    return;
  }
  try {
    chrome.runtime.sendMessage(message);
    console.log("[DIGGIN] Content Script: Message sent successfully");
  } catch (error) {
    if (error instanceof Error && error.message.includes("Extension context invalidated")) {
      console.log("[DIGGIN] Content Script: Extension context became invalid during send");
    } else {
      console.error("[DIGGIN] Content Script: Error sending message:", error);
    }
    try {
      const failedMessages = JSON.parse(localStorage.getItem("diggin_failed_messages") || "[]");
      failedMessages.push({
        message,
        timestamp: Date.now(),
        url: window.location.href,
        error: error instanceof Error ? error.message : "Unknown error"
      });
      localStorage.setItem("diggin_failed_messages", JSON.stringify(failedMessages));
    } catch (storageError) {
      console.warn("[DIGGIN] Content Script: Failed to store error message:", storageError);
    }
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
  safeSendMessage({
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
    console.log("[DIGGIN] Content Script: Cannot process message - extension context invalid (expected during navigation)");
    return false;
  }
  console.log("[DIGGIN] Content Script: Received message:", message);
  if (message.type === "ANIMATE" || message.action === "ANIMATE") {
    console.log("[DIGGIN] Content Script: Animation requested");
    sendResponse({ success: true });
  }
  return true;
});
function attemptMessageRecovery() {
  if (!isExtensionContextValid()) {
    return;
  }
  try {
    const failedMessages = JSON.parse(localStorage.getItem("diggin_failed_messages") || "[]");
    if (failedMessages.length > 0) {
      console.log(`[DIGGIN] Content Script: Attempting to recover ${failedMessages.length} failed messages`);
      failedMessages.forEach((failedMessage, index) => {
        const messageAge = Date.now() - failedMessage.timestamp;
        if (messageAge < 5 * 60 * 1e3) {
          setTimeout(() => {
            safeSendMessage(failedMessage.message);
            console.log(`[DIGGIN] Content Script: Recovered message ${index + 1} sent`);
          }, index * 100);
        }
      });
      localStorage.removeItem("diggin_failed_messages");
    }
  } catch (error) {
    console.warn("[DIGGIN] Content Script: Error during message recovery:", error);
  }
}
setInterval(() => {
  if (isExtensionContextValid()) {
    attemptMessageRecovery();
  }
}, 1e4);
setTimeout(attemptMessageRecovery, 1e3);
console.log("[DIGGIN] Content Script: Initialization complete v4.4 - Enhanced error handling and context validation");
console.log("[DIGGIN] Content Script: Initialization complete - monitoring copy events with graceful error handling");
