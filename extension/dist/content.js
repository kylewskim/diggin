var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
console.log("[DIGGIN] Content Script: Initializing clipboard monitor");
let clipboardPort = null;
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3e3;
function connectToBackground() {
  try {
    console.log("[DIGGIN] Content Script: Connecting to background script");
    clipboardPort = chrome.runtime.connect({ name: "clipboard" });
    isConnected = true;
    reconnectAttempts = 0;
    console.log("[DIGGIN] Content Script: Connection established");
    clipboardPort.postMessage({
      action: "CONNECTION_TEST",
      timestamp: Date.now()
    });
    clipboardPort.onMessage.addListener((message) => {
      console.log("[DIGGIN] Content Script: Received message from background:", message.action);
      if (message.action === "COPY_SAVED") {
        if (message.success) {
          console.log("[DIGGIN] Content Script: Copy saved successfully, insight count:", message.insightCount);
        } else {
          console.warn("[DIGGIN] Content Script: Failed to save copy:", message.error);
        }
      } else if (message.action === "CONNECTION_TEST_RESPONSE") {
        console.log(
          "[DIGGIN] Content Script: Connection test successful, auth status:",
          message.authStatus ? "Authenticated" : "Not authenticated",
          "Session status:",
          message.sessionStatus
        );
      }
    });
    clipboardPort.onDisconnect.addListener(() => {
      console.warn("[DIGGIN] Content Script: Disconnected from background");
      isConnected = false;
      clipboardPort = null;
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        console.log(`[DIGGIN] Content Script: Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
        setTimeout(() => {
          connectToBackground();
        }, RECONNECT_DELAY);
      } else {
        console.error("[DIGGIN] Content Script: Maximum reconnect attempts reached");
      }
    });
  } catch (error) {
    console.error("[DIGGIN] Content Script: Failed to connect to background script:", error);
    isConnected = false;
    clipboardPort = null;
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      console.log(`[DIGGIN] Content Script: Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
      setTimeout(() => {
        connectToBackground();
      }, RECONNECT_DELAY);
    } else {
      console.error("[DIGGIN] Content Script: Maximum reconnect attempts reached");
    }
  }
}
connectToBackground();
function handleCopy(event) {
  return __async(this, null, function* () {
    console.log("[DIGGIN] Content Script: Copy event detected");
    try {
      let text = "";
      if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData("text/plain");
      }
      if (!text && navigator.clipboard && navigator.clipboard.readText) {
        try {
          text = yield navigator.clipboard.readText();
        } catch (err) {
          console.warn("[DIGGIN] Content Script: Failed to read from clipboard API:", err);
        }
      }
      if (!text) {
        console.warn("[DIGGIN] Content Script: No text found in clipboard");
        return;
      }
      console.log("[DIGGIN] Content Script: Copied text length:", text.length);
      if (!isConnected || !clipboardPort) {
        console.warn("[DIGGIN] Content Script: Not connected to background, reconnecting...");
        connectToBackground();
        if (!isConnected || !clipboardPort) {
          console.error("[DIGGIN] Content Script: Failed to reconnect to background");
          return;
        }
      }
      clipboardPort.postMessage({
        action: "COPY_EVENT",
        text,
        url: window.location.href,
        title: document.title,
        timestamp: Date.now()
      });
      console.log("[DIGGIN] Content Script: Copy event sent to background");
    } catch (err) {
      console.error("[DIGGIN] Content Script: Error handling copy event:", err);
    }
  });
}
document.addEventListener("copy", handleCopy);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    console.log("[DIGGIN] Content Script: Page became visible, checking connection...");
    if (!isConnected || !clipboardPort) {
      console.log("[DIGGIN] Content Script: Not connected, reconnecting...");
      connectToBackground();
    } else {
      console.log("[DIGGIN] Content Script: Connection already active");
      clipboardPort.postMessage({
        action: "CONNECTION_TEST",
        timestamp: Date.now()
      });
    }
  }
});
setInterval(() => {
  if (!isConnected || !clipboardPort) {
    console.log("[DIGGIN] Content Script: Connection check failed, reconnecting...");
    connectToBackground();
  } else {
    console.log("[DIGGIN] Content Script: Connection check passed");
    clipboardPort.postMessage({
      action: "CONNECTION_TEST",
      timestamp: Date.now()
    });
  }
}, 5 * 60 * 1e3);
window.addEventListener("beforeunload", () => {
  console.log("[DIGGIN] Content Script: Page unloading, final connection check");
  if (clipboardPort) {
    clipboardPort.postMessage({
      action: "PAGE_UNLOAD",
      timestamp: Date.now()
    });
  }
});
