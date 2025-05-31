var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var DigginState = /* @__PURE__ */ ((DigginState2) => {
  DigginState2["IDLE"] = "IDLE";
  DigginState2["DIGGIN"] = "DIGGIN";
  DigginState2["PAUSED"] = "PAUSED";
  return DigginState2;
})(DigginState || {});
console.log("[DIGGIN] Background: Firebase Iframe v4.8 - Using Gem Pattern");
const OFFSCREEN_DOCUMENT_PATH = "/offscreen.html";
let creatingOffscreenDocument = null;
let currentUser = null;
let authStateChangeListeners = [];
const session = {
  isActive: false,
  data: null
};
function isExtensionContextValid() {
  try {
    return !!(chrome && chrome.runtime && chrome.runtime.id);
  } catch (error) {
    console.warn("[DIGGIN] Background: Extension context check failed:", error);
    return false;
  }
}
function safeStorageGet(key) {
  return new Promise((resolve, reject) => {
    if (!isExtensionContextValid()) {
      reject(new Error("Extension context invalidated"));
      return;
    }
    try {
      chrome.storage.local.get(key, (result) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(result[key]);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
function safeStorageSet(key, value) {
  return new Promise((resolve, reject) => {
    if (!isExtensionContextValid()) {
      reject(new Error("Extension context invalidated"));
      return;
    }
    try {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
function checkIfOffScreenExists() {
  return __async(this, null, function* () {
    try {
      const existingContexts = yield chrome.runtime.getContexts({
        contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
        documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)]
      });
      return existingContexts.length > 0;
    } catch (error) {
      console.error("[DIGGIN] Background: Error checking offscreen existence:", error);
      return false;
    }
  });
}
function setupOffscreenDocument(path) {
  return __async(this, null, function* () {
    console.log("[DIGGIN] Background: Setting up offscreen document");
    const offscreenUrl = chrome.runtime.getURL(path);
    const offScreenExists = yield checkIfOffScreenExists();
    if (offScreenExists) {
      console.log("[DIGGIN] Background: Offscreen document already exists");
      return;
    }
    if (creatingOffscreenDocument) {
      yield creatingOffscreenDocument;
      return;
    }
    creatingOffscreenDocument = chrome.offscreen.createDocument({
      url: offscreenUrl,
      reasons: [chrome.offscreen.Reason.DOM_SCRAPING],
      justification: "Firebase authentication requires DOM access for iframe-based auth"
    }).then(() => {
      console.log("[DIGGIN] Background: Offscreen document created successfully");
    }).catch((error) => {
      console.error("[DIGGIN] Background: Error creating offscreen document:", error);
    });
    yield creatingOffscreenDocument;
    creatingOffscreenDocument = null;
  });
}
function closeOffscreenDocument() {
  return __async(this, null, function* () {
    try {
      const existingContexts = yield chrome.runtime.getContexts({
        contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
        documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)]
      });
      if (existingContexts.length > 0) {
        yield chrome.offscreen.closeDocument();
        console.log("[DIGGIN] Background: Offscreen document closed");
      }
    } catch (error) {
      console.error("[DIGGIN] Background: Error closing offscreen document:", error);
    }
  });
}
function getUserCredentialUsingOffscreenDocument() {
  return __async(this, null, function* () {
    yield setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);
    console.log("[DIGGIN] Background: Starting authentication via offscreen");
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        type: "firebase-auth",
        target: "offscreen"
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("[DIGGIN] Background: Auth message error:", chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
          return;
        }
        if (response == null ? void 0 : response.error) {
          console.error("[DIGGIN] Background: Authentication error:", response.error);
          reject(new Error(response.error));
        } else if ((response == null ? void 0 : response.success) && (response == null ? void 0 : response.user)) {
          console.log("[DIGGIN] Background: Authentication successful");
          resolve(response);
        } else {
          reject(new Error("Invalid authentication response"));
        }
      });
    }).finally(() => {
      closeOffscreenDocument();
    });
  });
}
function signInWithOffscreenPopUp() {
  return __async(this, null, function* () {
    console.log("[DIGGIN] Background: Starting sign-in process");
    if (currentUser) {
      console.log("[DIGGIN] Background: User already signed in:", currentUser.uid);
      notifyAuthStateChange(currentUser);
      return;
    }
    try {
      const storedUserInfo = yield safeStorageGet(
        "USER_INFO"
        /* USER_INFO */
      );
      const storedTimestamp = yield safeStorageGet(
        "AUTH_TIMESTAMP"
        /* AUTH_TIMESTAMP */
      );
      const storedToken = yield safeStorageGet(
        "GOOGLE_ACCESS_TOKEN"
        /* GOOGLE_ACCESS_TOKEN */
      );
      if (storedUserInfo && storedTimestamp && storedToken) {
        const currentTime = Date.now();
        if (currentTime - storedTimestamp < 60 * 60 * 1e3) {
          console.log("[DIGGIN] Background: Using stored credentials");
          currentUser = storedUserInfo;
          notifyAuthStateChange(currentUser);
          startSession(currentUser.uid);
          return;
        } else {
          console.log("[DIGGIN] Background: Stored credentials expired");
          yield clearStoredAuth();
        }
      }
    } catch (error) {
      console.warn("[DIGGIN] Background: Error checking stored credentials:", error);
    }
    try {
      const userCredential = yield getUserCredentialUsingOffscreenDocument();
      if (userCredential == null ? void 0 : userCredential.user) {
        currentUser = userCredential.user;
        console.log("[DIGGIN] Background: User signed in successfully:", currentUser.uid);
        yield saveUserInfo(currentUser);
        notifyAuthStateChange(currentUser);
        startSession(currentUser.uid);
        processPendingCopiedItems();
      }
    } catch (error) {
      console.error("[DIGGIN] Background: Sign-in failed:", error);
      throw error;
    }
  });
}
function signOut() {
  return __async(this, null, function* () {
    console.log("[DIGGIN] Background: Starting sign-out process");
    try {
      yield setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);
      yield new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
          type: "logout",
          target: "offscreen"
        }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else if (response == null ? void 0 : response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response);
          }
        });
      });
      currentUser = null;
      session.isActive = false;
      session.data = null;
      yield safeStorageSet("activeSession", null);
      notifyAuthStateChange(null);
      console.log("[DIGGIN] Background: Sign-out completed");
    } catch (error) {
      console.error("[DIGGIN] Background: Sign-out failed:", error);
      throw error;
    } finally {
      closeOffscreenDocument();
    }
  });
}
function clearStoredAuth() {
  return __async(this, null, function* () {
    try {
      yield Promise.all([
        safeStorageSet("USER_INFO", null),
        safeStorageSet("AUTH_TIMESTAMP", null),
        safeStorageSet("GOOGLE_ACCESS_TOKEN", null),
        safeStorageSet("GOOGLE_ID_TOKEN", null),
        safeStorageSet("UID", null)
      ]);
      console.log("[DIGGIN] Background: Stored authentication data cleared");
    } catch (error) {
      console.error("[DIGGIN] Background: Error clearing stored auth:", error);
    }
  });
}
function notifyAuthStateChange(user) {
  authStateChangeListeners.forEach((listener) => {
    try {
      listener(user);
    } catch (error) {
      console.error("[DIGGIN] Background: Error in auth state listener:", error);
    }
  });
}
function onAuthStateChanged(callback) {
  authStateChangeListeners.push(callback);
  if (currentUser) {
    callback(currentUser);
  }
  return () => {
    const index = authStateChangeListeners.indexOf(callback);
    if (index > -1) {
      authStateChangeListeners.splice(index, 1);
    }
  };
}
function startSession(userId) {
  console.log("[DIGGIN] Background: Starting session for user:", userId);
  if (!session.data) {
    session.data = {
      userId,
      sessionId: `session_${Date.now()}`,
      holeId: `hole_${Date.now()}`,
      sessionName: "Default Session",
      state: DigginState.DIGGIN,
      elapsedTimeInSeconds: 0,
      numInsights: 0,
      lastUpdated: Date.now()
    };
  }
  session.isActive = true;
  safeStorageSet("activeSession", session.data).catch((error) => {
    console.error("[DIGGIN] Background: Error saving session:", error);
  });
}
function saveUserInfo(user) {
  return __async(this, null, function* () {
    if (!user) {
      console.log("[DIGGIN] Background: No user to save");
      return;
    }
    console.log("[DIGGIN] Background: Saving user info to Chrome storage:", user.uid);
    try {
      yield safeStorageSet("userData", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: Date.now(),
        updatedAt: Date.now()
      });
      console.log("[DIGGIN] Background: User info saved successfully");
    } catch (error) {
      console.error("[DIGGIN] Background: Failed to save user info:", error);
    }
  });
}
function processPendingCopiedItems() {
  console.log("[DIGGIN] Background: Processing pending copied items");
  safeStorageGet("pendingCopiedItems").then((pendingItems) => {
    if (!pendingItems || !Array.isArray(pendingItems) || pendingItems.length === 0) {
      console.log("[DIGGIN] Background: No pending items to process");
      return;
    }
    console.log("[DIGGIN] Background: Found", pendingItems.length, "pending items");
    pendingItems.forEach((item, index) => __async(this, null, function* () {
      var _a, _b;
      try {
        if (!currentUser) {
          console.warn("[DIGGIN] Background: Cannot process item - user not authenticated");
          return;
        }
        const storageKey = `insight_${currentUser.uid}_${Date.now()}_${index}`;
        yield safeStorageSet(storageKey, {
          type: "TEXT",
          value: item.content,
          url: item.url,
          highlight: false,
          createdAt: new Date(item.timestamp).toISOString(),
          sessionId: ((_a = session.data) == null ? void 0 : _a.sessionId) || "default",
          holeId: ((_b = session.data) == null ? void 0 : _b.holeId) || "default"
        });
        console.log("[DIGGIN] Background: Processed pending item", index + 1);
      } catch (error) {
        console.error("[DIGGIN] Background: Failed to process pending item", index + 1, ":", error);
      }
    }));
    safeStorageSet("pendingCopiedItems", []).catch((error) => {
      console.error("[DIGGIN] Background: Failed to clear pending items:", error);
    });
  }).catch((error) => {
    console.error("[DIGGIN] Background: Failed to get pending items:", error);
  });
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    console.log("[DIGGIN] Background: Received message:", message.action || message.type);
    if (message.action === "COPY_EVENT") {
      console.log("[DIGGIN] Background: Copy event detected, content length:", ((_a = message.text) == null ? void 0 : _a.length) || 0);
      if (!currentUser) {
        console.log("[DIGGIN] Background: No authenticated user, saving to pending");
        const pendingEntry = {
          content: message.text,
          url: message.url,
          title: message.title,
          timestamp: Date.now()
        };
        safeStorageGet("pendingCopiedItems").then((entries) => {
          const pendingEntries = entries || [];
          pendingEntries.push(pendingEntry);
          return safeStorageSet("pendingCopiedItems", pendingEntries);
        }).then(() => {
          console.log("[DIGGIN] Background: Saved to pending items");
        }).catch((error) => {
          console.error("[DIGGIN] Background: Failed to save to pending:", error);
        });
        return false;
      }
      if (!session.isActive || !session.data) {
        console.log("[DIGGIN] Background: No active session, saving to pending");
        const pendingEntry = {
          content: message.text,
          url: message.url,
          title: message.title,
          timestamp: Date.now()
        };
        safeStorageGet("pendingCopiedItems").then((entries) => {
          const pendingEntries = entries || [];
          pendingEntries.push(pendingEntry);
          return safeStorageSet("pendingCopiedItems", pendingEntries);
        }).then(() => {
          console.log("[DIGGIN] Background: Saved to pending items (no session)");
        }).catch((error) => {
          console.error("[DIGGIN] Background: Failed to save to pending:", error);
        });
        return false;
      }
      console.log("[DIGGIN] Background: Active session detected, saving immediately");
      const storageKey = `insight_${currentUser.uid}_${Date.now()}`;
      safeStorageSet(storageKey, {
        type: "TEXT",
        value: message.text,
        url: message.url,
        highlight: false,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        sessionId: session.data.sessionId,
        holeId: session.data.holeId || "default"
      }).then(() => {
        console.log("[DIGGIN] Background: Text entry saved immediately");
        if (session.data && currentUser) {
          const numInsights = (session.data.numInsights || 0) + 1;
          session.data.numInsights = numInsights;
          safeStorageSet("activeSession", session.data).then(() => {
            console.log("[DIGGIN] Background: Updated insight count to:", numInsights);
          }).catch((error) => {
            console.error("[DIGGIN] Background: Error updating insight count:", error);
          });
        }
      }).catch((error) => {
        console.error("[DIGGIN] Background: Failed to save immediately:", error);
      });
      return false;
    }
    if (message.action === "START_SESSION") {
      console.log("[DIGGIN] Background: Starting session:", message.data);
      const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
      if (sessionId && holeId) {
        session.isActive = true;
        session.data = {
          sessionId,
          holeId,
          sessionName: sessionName || "",
          elapsedTimeInSeconds: savedDuration || 0,
          numInsights: 0,
          lastUpdated: Date.now()
        };
        safeStorageSet("activeSession", session.data).then(() => {
          console.log("[DIGGIN] Background: Session started and saved");
          sendResponse({ success: true, sessionData: session.data });
        }).catch((error) => {
          console.error("[DIGGIN] Background: Failed to save session:", error);
          sendResponse({ success: false, error: error.message });
        });
      } else {
        sendResponse({ success: false, error: "Invalid session data" });
      }
      return true;
    }
    if (message.action === "END_SESSION") {
      console.log("[DIGGIN] Background: Ending session");
      if (session.data) {
        const finalDuration = session.data.elapsedTimeInSeconds;
        session.isActive = false;
        const endedSession = __spreadValues({}, session.data);
        session.data = null;
        safeStorageSet("activeSession", null).then(() => {
          console.log("[DIGGIN] Background: Session ended");
          sendResponse({ success: true, finalDuration, endedSession });
        }).catch((error) => {
          sendResponse({ success: false, error: error.message });
        });
      } else {
        sendResponse({ success: false, error: "No active session" });
      }
      return true;
    }
    if (message.action === "GET_SESSION_STATUS") {
      const response = {
        isActive: session.isActive,
        sessionId: ((_b = session.data) == null ? void 0 : _b.sessionId) || null,
        holeId: ((_c = session.data) == null ? void 0 : _c.holeId) || null,
        sessionName: ((_d = session.data) == null ? void 0 : _d.sessionName) || null,
        duration: ((_e = session.data) == null ? void 0 : _e.elapsedTimeInSeconds) || 0,
        numInsights: ((_f = session.data) == null ? void 0 : _f.numInsights) || 0
      };
      sendResponse(response);
      return true;
    }
    if (message.action === "CHECK_ACTIVE_SESSION") {
      console.log("[DIGGIN] Background: Checking active session");
      const response = {
        success: true,
        hasActiveSession: session.isActive && !!session.data,
        activeSession: session.isActive && session.data ? {
          sessionId: session.data.sessionId,
          holeId: session.data.holeId,
          sessionName: session.data.sessionName,
          elapsedTimeInSeconds: session.data.elapsedTimeInSeconds,
          numInsights: session.data.numInsights,
          lastUpdated: session.data.lastUpdated
        } : null
      };
      console.log("[DIGGIN] Background: Active session check result:", response);
      sendResponse(response);
      return true;
    }
    if (message.action === "TRIGGER_LOGIN") {
      console.log("[DIGGIN] Background: Manual login triggered");
      signInWithOffscreenPopUp().then(() => {
        sendResponse({ success: true });
      }).catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
      return true;
    }
    if (message.action === "TRIGGER_LOGOUT") {
      console.log("[DIGGIN] Background: Logout triggered");
      signOut().then(() => {
        sendResponse({ success: true });
      }).catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
      return true;
    }
    if (message.action === "SESSION_CONTINUE") {
      console.log("[DIGGIN] Background: Session continue requested");
      try {
        if (session.isActive && session.data) {
          session.data.lastUpdated = Date.now();
          safeStorageSet("activeSession", session.data).then(() => {
            sendResponse({
              success: true,
              session: session.data
            });
          }).catch((error) => {
            console.error("[DIGGIN] Background: Error saving session:", error);
            sendResponse({
              success: false,
              error: error.message || "Failed to save session"
            });
          });
        } else {
          sendResponse({
            success: false,
            error: "No active session to continue"
          });
        }
      } catch (error) {
        console.error("[DIGGIN] Background: Error continuing session:", error);
        sendResponse({
          success: false,
          error: error.message || "Unknown error"
        });
      }
      return true;
    }
    if (message.action === "GET_SESSION_STATE") {
      console.log("[DIGGIN] Background: Session state requested");
      try {
        const response = {
          success: true,
          hasActiveSession: session.isActive && !!session.data,
          session: session.isActive && session.data ? {
            sessionId: session.data.sessionId,
            holeId: session.data.holeId,
            sessionName: session.data.sessionName,
            elapsedTimeInSeconds: session.data.elapsedTimeInSeconds,
            numInsights: session.data.numInsights,
            lastUpdated: session.data.lastUpdated,
            state: session.data.state
          } : null
        };
        console.log("[DIGGIN] Background: Session state response:", response);
        sendResponse(response);
      } catch (error) {
        console.error("[DIGGIN] Background: Error getting session state:", error);
        sendResponse({
          success: false,
          error: error.message || "Unknown error"
        });
      }
      return true;
    }
    return false;
  } catch (error) {
    console.warn("[DIGGIN] Background: Error handling message:", error);
    return false;
  }
});
function restoreActiveSession() {
  return __async(this, null, function* () {
    console.log("[DIGGIN] Background: Attempting to restore active session");
    try {
      const savedSession = yield safeStorageGet("activeSession");
      if (savedSession && savedSession.sessionId) {
        console.log("[DIGGIN] Background: Found saved session, restoring");
        session.isActive = true;
        session.data = savedSession;
        console.log("[DIGGIN] Background: Session restored successfully");
      } else {
        console.log("[DIGGIN] Background: No saved session found");
      }
    } catch (error) {
      console.error("[DIGGIN] Background: Failed to restore session:", error);
    }
  });
}
function initializeAuthentication() {
  return __async(this, null, function* () {
    console.log("[DIGGIN] Background: Initializing Chrome Identity API authentication v4.0");
    onAuthStateChanged((user) => __async(this, null, function* () {
      if (user) {
        console.log("[DIGGIN] Background: User signed in:", user.uid);
        startSession(user.uid);
      } else {
        console.log("[DIGGIN] Background: User signed out");
        session.isActive = false;
        session.data = null;
      }
    }));
    try {
      const storedUserInfo = yield safeStorageGet(
        "USER_INFO"
        /* USER_INFO */
      );
      const storedTimestamp = yield safeStorageGet(
        "AUTH_TIMESTAMP"
        /* AUTH_TIMESTAMP */
      );
      const storedToken = yield safeStorageGet(
        "GOOGLE_ACCESS_TOKEN"
        /* GOOGLE_ACCESS_TOKEN */
      );
      if (storedUserInfo && storedTimestamp && storedToken) {
        const currentTime = Date.now();
        if (currentTime - storedTimestamp < 60 * 60 * 1e3) {
          console.log("[DIGGIN] Background: Valid stored credentials found, auto-login");
          try {
            const response = yield fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${storedToken}`);
            if (response.ok) {
              currentUser = storedUserInfo;
              notifyAuthStateChange(currentUser);
              console.log("[DIGGIN] Background: Auto-login successful");
            } else {
              throw new Error("Token validation failed");
            }
          } catch (error) {
            console.warn("[DIGGIN] Background: Token validation failed, clearing data");
            yield clearStoredAuth();
          }
        } else {
          console.log("[DIGGIN] Background: Stored credentials expired");
          yield clearStoredAuth();
        }
      } else {
        console.log("[DIGGIN] Background: No stored credentials found");
      }
    } catch (error) {
      console.error("[DIGGIN] Background: Auto-login failed:", error);
    }
  });
}
console.log("[DIGGIN] Background: Script initialization v4.0 - Pure Chrome API");
chrome.runtime.getContexts({
  contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT]
}).then((contexts) => {
  if (contexts.length > 0) {
    console.log("[DIGGIN] Background: Cleaning up existing offscreen documents");
    chrome.offscreen.closeDocument().catch((error) => {
      console.warn("[DIGGIN] Background: Error cleaning up offscreen:", error);
    });
  }
});
function testOffscreenSetup() {
  return __async(this, null, function* () {
    try {
      console.log("[DIGGIN] Background: Testing offscreen document setup");
      yield setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);
      console.log("[DIGGIN] Background: Offscreen document setup successful");
      const testResponse = yield chrome.runtime.sendMessage({
        type: "auto-login",
        target: "offscreen"
      });
      console.log("[DIGGIN] Background: Offscreen communication test:", testResponse);
      yield closeOffscreenDocument();
    } catch (error) {
      console.error("[DIGGIN] Background: Offscreen setup test failed:", error);
    }
  });
}
Promise.resolve().then(() => testOffscreenSetup()).then(() => initializeAuthentication()).then(() => {
  console.log("[DIGGIN] Background: Authentication initialization completed");
  return restoreActiveSession();
}).then(() => {
  console.log("[DIGGIN] Background: Session restoration completed");
}).catch((error) => {
  console.error("[DIGGIN] Background: Initialization failed:", error);
});
