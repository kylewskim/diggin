var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
import { i as initializeApp, g as getAuth, a as getFirestore, b as getDatabase, j as onAuthStateChanged, c as collection, h as addDoc, s as serverTimestamp, t as ref, v as update, x as set, y as get, l as setDoc, e as doc, z as push, A as onValue } from "./assets/index.esm2017-sWKDjtvW.js";
var require_background = __commonJS({
  "background.js"(exports) {
    var DigginState = /* @__PURE__ */ ((DigginState2) => {
      DigginState2["IDLE"] = "IDLE";
      DigginState2["DIGGIN"] = "DIGGIN";
      DigginState2["PAUSED"] = "PAUSED";
      return DigginState2;
    })(DigginState || {});
    var B_TO_C = /* @__PURE__ */ ((B_TO_C2) => {
      B_TO_C2["B_TO_C_ANIMATE"] = "B_TO_C_ANIMATE";
      B_TO_C2["B_TO_C_COPY_SAVED"] = "B_TO_C_COPY_SAVED";
      return B_TO_C2;
    })(B_TO_C || {});
    var C_TO_B = /* @__PURE__ */ ((C_TO_B2) => {
      C_TO_B2["C_TO_B_DATA"] = "C_TO_B_DATA";
      C_TO_B2["C_TO_B_COPY_EVENT"] = "C_TO_B_COPY_EVENT";
      return C_TO_B2;
    })(C_TO_B || {});
    var InsightType = /* @__PURE__ */ ((InsightType2) => {
      InsightType2["TEXT"] = "TEXT";
      InsightType2["IMAGE"] = "IMAGE";
      return InsightType2;
    })(InsightType || {});
    const firebaseConfig = {
      apiKey: "AIzaSyCeRpnwsBHPsyeWVAWSXEzHmVHLDNIJdYE",
      authDomain: "diggin-a08f8.firebaseapp.com",
      projectId: "diggin-a08f8",
      storageBucket: "diggin-a08f8.appspot.com",
      messagingSenderId: "175967632049",
      appId: "1:175967632049:web:6c6df57a1546f8b30dd4c8",
      databaseURL: "https://diggin-a08f8-default-rtdb.firebaseio.com"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const database = getDatabase(app);
    console.log("[DIGGIN] Background: Firebase initialized with config:", {
      authDomain: firebaseConfig.authDomain,
      databaseURL: firebaseConfig.databaseURL,
      projectId: firebaseConfig.projectId
    });
    const testDbConnection = () => __async(exports, null, function* () {
      console.log("[DIGGIN] Background: Testing database connection to URL:", firebaseConfig.databaseURL);
      try {
        const testRef = ref(database, "connection_test");
        console.log("[DIGGIN] Background: Created test reference:", testRef.toString());
        const authUser = auth.currentUser;
        console.log("[DIGGIN] Background: Current auth state:", authUser ? `Authenticated as ${authUser.uid}` : "Not authenticated");
        const testData = {
          test: true,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          authState: authUser ? "authenticated" : "anonymous"
        };
        console.log("[DIGGIN] Background: Attempting to write test data:", testData);
        yield set(testRef, testData);
        console.log("[DIGGIN] Background: Successfully wrote test data to database");
        const snapshot = yield get(testRef);
        if (snapshot.exists()) {
          console.log("[DIGGIN] Background: Successfully read test data:", snapshot.val());
          return true;
        } else {
          console.warn("[DIGGIN] Background: Test data not found after writing");
          return false;
        }
      } catch (error) {
        console.error("[DIGGIN] Background: Database connection test failed:", error);
        if (error instanceof Error) {
          console.error("[DIGGIN] Background: Error type:", error.name);
          console.error("[DIGGIN] Background: Error message:", error.message);
          console.error("[DIGGIN] Background: Error stack:", error.stack);
          if (error.message.includes("permission_denied")) {
            console.error("[DIGGIN] Background: Permission denied error. Possible causes:");
            console.error("- Database rules may be restricting access");
            console.error("- User may not be authenticated properly");
            console.error("- Project ID or Database URL may be incorrect");
          }
          if (error.message.includes("network error")) {
            console.error("[DIGGIN] Background: Network error. Possible causes:");
            console.error("- Internet connection may be unavailable");
            console.error("- Database URL may be incorrect");
            console.error("- CORS issues may exist");
          }
        }
        return false;
      }
    });
    testDbConnection();
    const session = {
      data: null,
      location: null,
      timer: null,
      isActive: false
    };
    console.log("[DIGGIN] Background: Script initialized");
    function startTimer(seconds, onTick) {
      if (session.timer) {
        clearInterval(session.timer);
      }
      console.log("[DIGGIN] Background: Starting timer at", seconds, "seconds");
      let currentSeconds = seconds || 0;
      const timer = setInterval(() => {
        currentSeconds += 1;
        onTick(currentSeconds);
      }, 1e3);
      session.timer = timer;
      return timer;
    }
    function stopTimer() {
      if (session.timer) {
        clearInterval(session.timer);
        session.timer = null;
        console.log("[DIGGIN] Background: Timer stopped");
      }
    }
    function startSession(uid) {
      return __async(this, null, function* () {
        console.log("[DIGGIN] Background: Starting session for user:", uid);
        try {
          console.log("[DIGGIN] Background: Testing database connection before session start");
          yield testDbConnection();
          const path = uid;
          console.log("[DIGGIN] Background: Creating database reference at path:", path);
          console.log("[DIGGIN] Background: Current Firebase config:", {
            projectId: firebaseConfig.projectId,
            databaseURL: firebaseConfig.databaseURL,
            authDomain: firebaseConfig.authDomain
          });
          const userRef = ref(database, path);
          try {
            const testPath = `${uid}/test`;
            const testRef = ref(database, testPath);
            yield set(testRef, {
              timestamp: Date.now(),
              message: "Test write before session start"
            });
            console.log("[DIGGIN] Background: Test write to user path successful");
          } catch (writeError) {
            console.error("[DIGGIN] Background: Test write to user path failed:", writeError);
          }
          onValue(userRef, (snapshot) => __async(this, null, function* () {
            var _a, _b;
            try {
              console.log(
                "[DIGGIN] Background: Received data from Firebase:",
                snapshot.exists() ? "data exists" : "data does not exist",
                "key:",
                snapshot.key,
                "ref:",
                snapshot.ref.toString()
              );
              if (snapshot.exists()) {
                const data = snapshot.val();
                console.log("[DIGGIN] Background: Data content:", JSON.stringify(data, null, 2));
              }
              if (!snapshot.exists()) {
                console.log("[DIGGIN] Background: Creating new user session node");
                const initialData = {
                  userId: uid,
                  state: DigginState.IDLE,
                  elapsedTimeInSeconds: 0,
                  numInsights: 0,
                  lastUpdated: Date.now()
                };
                try {
                  console.log("[DIGGIN] Background: Writing initial data:", initialData);
                  yield set(userRef, initialData);
                  const checkSnapshot = yield get(userRef);
                  if (checkSnapshot.exists()) {
                    console.log("[DIGGIN] Background: Created and verified initial session data successfully");
                  } else {
                    console.warn("[DIGGIN] Background: Initial session data was written but not found on read-back");
                  }
                } catch (error) {
                  console.error("[DIGGIN] Background: Error creating initial session:", error);
                }
                return;
              }
              const newSessionData = snapshot.val();
              console.log("[DIGGIN] Background: Session data updated:", newSessionData);
              if (((_a = session.data) == null ? void 0 : _a.state) !== newSessionData.state) {
                console.log(`[DIGGIN] Background: Session state changed: ${((_b = session.data) == null ? void 0 : _b.state) || "none"} -> ${newSessionData.state}`);
              }
              session.data = newSessionData;
              if (newSessionData.state === DigginState.DIGGIN) {
                console.log("[DIGGIN] Background: DIGGIN state detected, starting/updating timer");
                session.isActive = true;
                if (!session.timer) {
                  startTimer(newSessionData.elapsedTimeInSeconds || 0, (seconds) => {
                    const userRef2 = ref(database, uid);
                    console.log("[DIGGIN] Background: Updating timer to", seconds, "seconds");
                    update(userRef2, {
                      elapsedTimeInSeconds: seconds,
                      lastUpdated: Date.now()
                    }).then(() => {
                      if (seconds % 10 === 0) {
                        console.log("[DIGGIN] Background: Timer updated to", seconds, "seconds in database");
                      }
                    }).catch((error) => {
                      console.error("[DIGGIN] Background: Error updating timer:", error);
                    });
                  });
                }
              } else {
                session.isActive = false;
                stopTimer();
              }
            } catch (callbackError) {
              console.error("[DIGGIN] Background: Error in onValue callback:", callbackError);
            }
          }), (error) => {
            console.error("[DIGGIN] Background: Error in session data listener:", error);
          });
          console.log("[DIGGIN] Background: Session initialization completed for user:", uid);
        } catch (error) {
          console.error("[DIGGIN] Background: Failed to start session:", error);
        }
      });
    }
    function saveTextEntry(_0) {
      return __async(this, arguments, function* ({
        userId,
        sessionId,
        holeId,
        content,
        sourceUrl,
        sourceTitle
      }) {
        var _a, _b;
        console.log("[DIGGIN] Background: Saving text entry, content length:", content.length);
        try {
          if (!session.isActive) {
            console.warn("[DIGGIN] Background: Session not active, cannot save text");
            return null;
          }
          const path = `${userId}/textEntries`;
          console.log("[DIGGIN] Background: Creating text entry at path:", path);
          const textEntriesRef = ref(database, path);
          const newEntryRef = push(textEntriesRef);
          const entryId = newEntryRef.key;
          if (!entryId) {
            throw new Error("Failed to generate entry ID");
          }
          let sourceDomain = "unknown";
          try {
            sourceDomain = new URL(sourceUrl).hostname;
          } catch (error) {
            console.error("[DIGGIN] Background: Failed to extract domain:", error);
          }
          const timestamp = Date.now();
          const entryData = {
            id: entryId,
            userId,
            sessionId: sessionId || userId,
            holeId: holeId || "default",
            content,
            sourceUrl,
            sourceTitle,
            sourceDomain,
            capturedAt: timestamp,
            createdAt: timestamp,
            sessionTime: ((_a = session.data) == null ? void 0 : _a.elapsedTimeInSeconds) || 0,
            isBookmarked: false
          };
          console.log("[DIGGIN] Background: Entry data prepared:", {
            id: entryId,
            contentLength: content.length,
            sessionId: sessionId || userId,
            holeId: holeId || "default",
            timestamp: new Date(timestamp).toISOString(),
            sourceDomain
          });
          console.log("[DIGGIN] Background: Attempting to save entry with ID:", entryId);
          yield set(newEntryRef, entryData);
          console.log("[DIGGIN] Background: Entry saved successfully with ID:", entryId);
          try {
            const entriesCollection = collection(db, "textEntries");
            const firestoreData = {
              sessionId: sessionId || userId,
              holeId: holeId || "default",
              content,
              sourceUrl,
              sourceDomain,
              capturedAt: serverTimestamp(),
              isBookmarked: false
            };
            const docRef = yield addDoc(entriesCollection, firestoreData);
            console.log("[DIGGIN] Background: Entry also saved to Firestore with ID:", docRef.id);
          } catch (firestoreError) {
            console.error("[DIGGIN] Background: Failed to save to Firestore, but saved to Realtime DB:", firestoreError);
          }
          const userRef = ref(database, userId);
          const numInsights = (((_b = session.data) == null ? void 0 : _b.numInsights) || 0) + 1;
          console.log("[DIGGIN] Background: Updating insight count to:", numInsights);
          yield update(userRef, {
            numInsights,
            lastUpdated: timestamp
          });
          console.log("[DIGGIN] Background: Insight count updated to:", numInsights);
          try {
            const entrySnapshot = yield get(newEntryRef);
            if (entrySnapshot.exists()) {
              console.log("[DIGGIN] Background: Verified entry exists in database");
            } else {
              console.warn("[DIGGIN] Background: Entry verification failed - entry not found after saving");
            }
          } catch (verifyError) {
            console.error("[DIGGIN] Background: Error verifying saved entry:", verifyError);
          }
          return {
            id: entryId,
            createdAt: timestamp
          };
        } catch (error) {
          console.error("[DIGGIN] Background: Error saving text entry:", error);
          return null;
        }
      });
    }
    function saveUserInfo(user) {
      return __async(this, null, function* () {
        try {
          console.log("[DIGGIN] Background: Saving user info for:", user.uid);
          yield setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: serverTimestamp()
          }, { merge: true });
          console.log("[DIGGIN] Background: User info saved to Firestore");
          yield startSession(user.uid);
          return user;
        } catch (error) {
          console.error("[DIGGIN] Background: Error saving user info:", error);
          return null;
        }
      });
    }
    chrome.runtime.onInstalled.addListener((details) => __async(exports, null, function* () {
      console.log("[DIGGIN] Background: Extension installed/updated:", details.reason);
      if (details.reason === "update" || details.reason === "chrome_update") {
        const user = auth.currentUser;
        if (user) {
          console.log("[DIGGIN] Background: User authenticated after update:", user.uid);
          yield checkAndRestoreSession();
        } else {
          console.log("[DIGGIN] Background: No authenticated user after update");
        }
      }
      processPendingCopiedItems();
    }));
    chrome.runtime.onStartup.addListener(() => __async(exports, null, function* () {
      console.log("[DIGGIN] Background: Extension started");
      onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
        if (user) {
          console.log("[DIGGIN] Background: User authenticated on startup:", user.uid);
          yield checkAndRestoreSession();
        } else {
          console.log("[DIGGIN] Background: No authenticated user on startup");
        }
      }));
      processPendingCopiedItems();
    }));
    onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
      if (user) {
        console.log("[DIGGIN] Background: User signed in:", user.uid);
        yield saveUserInfo(user);
      } else {
        console.log("[DIGGIN] Background: User signed out");
        stopTimer();
        session.data = null;
        session.isActive = false;
      }
    }));
    chrome.runtime.onConnect.addListener((port) => {
      if (port.name === "clipboard") {
        console.log("[DIGGIN] Background: Connected to clipboard monitor");
        port.onMessage.addListener((message) => {
          var _a, _b, _c, _d;
          console.log("[DIGGIN] Background: Received message from content script:", message.action);
          if (message.action === "COPY_EVENT") {
            console.log("[DIGGIN] Background: Copy event detected, content length:", message.text.length);
            if (!auth.currentUser) {
              console.error("[DIGGIN] Background: No authenticated user");
              port.postMessage({ action: "COPY_SAVED", success: false, error: "Not authenticated" });
              return;
            }
            if (!session.isActive) {
              console.warn("[DIGGIN] Background: Session not active");
              port.postMessage({ action: "COPY_SAVED", success: false, error: "No active digging session" });
              return;
            }
            console.log("[DIGGIN] Background: Proceeding with text entry save");
            saveTextEntry({
              userId: auth.currentUser.uid,
              sessionId: ((_a = session.data) == null ? void 0 : _a.sessionId) || auth.currentUser.uid,
              holeId: ((_b = session.data) == null ? void 0 : _b.holeId) || "default",
              content: message.text,
              sourceUrl: message.url,
              sourceTitle: message.title
            }).then((entry) => {
              var _a2;
              if (entry) {
                console.log("[DIGGIN] Background: Text entry saved successfully:", entry.id);
                port.postMessage({
                  action: "COPY_SAVED",
                  success: true,
                  insightCount: ((_a2 = session.data) == null ? void 0 : _a2.numInsights) || 0,
                  entryId: entry.id
                });
              } else {
                console.error("[DIGGIN] Background: Failed to save text entry");
                port.postMessage({
                  action: "COPY_SAVED",
                  success: false,
                  error: "Failed to save to database"
                });
              }
            }).catch((error) => {
              console.error("[DIGGIN] Background: Error saving text entry:", error);
              port.postMessage({
                action: "COPY_SAVED",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
              });
            });
          } else if (message.action === "CONNECTION_TEST") {
            console.log("[DIGGIN] Background: Received connection test from content script");
            const authStatus = auth.currentUser ? true : false;
            const sessionStatus = {
              isActive: session.isActive,
              state: (_c = session.data) == null ? void 0 : _c.state,
              elapsedTime: ((_d = session.data) == null ? void 0 : _d.elapsedTimeInSeconds) || 0
            };
            console.log("[DIGGIN] Background: Connection test - Auth status:", authStatus, "Session status:", sessionStatus);
            port.postMessage({
              action: "CONNECTION_TEST_RESPONSE",
              success: true,
              authStatus,
              sessionStatus,
              timestamp: Date.now(),
              databaseURL: firebaseConfig.databaseURL
            });
            testDbConnection().then(() => {
              console.log("[DIGGIN] Background: Database test completed during connection test");
            }).catch((error) => {
              console.error("[DIGGIN] Background: Database test failed during connection test:", error);
            });
          }
        });
        port.onDisconnect.addListener(() => {
          console.log("[DIGGIN] Background: Disconnected from clipboard monitor");
        });
      }
    });
    function saveSessionState() {
      return __async(this, null, function* () {
        try {
          if (auth.currentUser && session.isActive && session.data) {
            const uid = auth.currentUser.uid;
            const stateRef = ref(database, `${uid}/activeSession`);
            console.log("[DIGGIN] Background: Saving active session state to DB:", {
              sessionId: session.data.sessionId,
              holeId: session.data.holeId,
              sessionName: session.data.sessionName,
              elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
            });
            yield set(stateRef, {
              sessionId: session.data.sessionId,
              holeId: session.data.holeId,
              sessionName: session.data.sessionName,
              elapsedTimeInSeconds: session.data.elapsedTimeInSeconds,
              state: session.data.state,
              lastUpdated: Date.now()
            });
            console.log("[DIGGIN] Background: Active session state saved successfully to DB");
          }
          if (session.isActive && session.data) {
            const localSessionData = {
              sessionId: session.data.sessionId,
              holeId: session.data.holeId,
              sessionName: session.data.sessionName,
              elapsedTimeInSeconds: session.data.elapsedTimeInSeconds,
              state: session.data.state,
              lastUpdated: Date.now()
            };
            console.log("[DIGGIN] Background: Saving active session state to local storage:", localSessionData);
            chrome.storage.local.set({ "activeSession": localSessionData }, () => {
              console.log("[DIGGIN] Background: Active session state saved successfully to local storage");
            });
          } else {
            console.log("[DIGGIN] Background: No active session to save");
          }
        } catch (error) {
          console.error("[DIGGIN] Background: Failed to save session state:", error);
        }
      });
    }
    function loadSessionState() {
      return __async(this, null, function* () {
        try {
          let activeSession = null;
          if (auth.currentUser) {
            try {
              const uid = auth.currentUser.uid;
              const stateRef = ref(database, `${uid}/activeSession`);
              const snapshot = yield get(stateRef);
              if (snapshot.exists()) {
                activeSession = snapshot.val();
                console.log("[DIGGIN] Background: Loaded active session from DB:", activeSession);
              }
            } catch (dbError) {
              console.error("[DIGGIN] Background: Error loading from DB, falling back to local storage:", dbError);
            }
          }
          if (!activeSession) {
            return new Promise((resolve, reject) => {
              chrome.storage.local.get("activeSession", (result) => {
                if (chrome.runtime.lastError) {
                  console.error("[DIGGIN] Background: Error reading from local storage:", chrome.runtime.lastError);
                  reject(chrome.runtime.lastError);
                  return;
                }
                if (result.activeSession) {
                  console.log("[DIGGIN] Background: Loaded active session from local storage:", result.activeSession);
                  resolve({
                    sessionId: result.activeSession.sessionId,
                    holeId: result.activeSession.holeId,
                    sessionName: result.activeSession.sessionName,
                    elapsedTimeInSeconds: result.activeSession.elapsedTimeInSeconds
                  });
                } else {
                  console.log("[DIGGIN] Background: No active session found in local storage");
                  resolve(null);
                }
              });
            });
          }
          if (activeSession && activeSession.state === DigginState.DIGGIN) {
            return {
              sessionId: activeSession.sessionId,
              holeId: activeSession.holeId,
              sessionName: activeSession.sessionName,
              elapsedTimeInSeconds: activeSession.elapsedTimeInSeconds
            };
          } else if (activeSession) {
            console.log("[DIGGIN] Background: Found session but not in DIGGIN state");
          }
          return null;
        } catch (error) {
          console.error("[DIGGIN] Background: Failed to load session state:", error);
          return null;
        }
      });
    }
    setInterval(() => {
      if (session.isActive) {
        saveSessionState().catch(console.error);
      }
    }, 2e4);
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      console.log("[DIGGIN] Background: Received message:", message.action || message.key);
      if (message.key === C_TO_B.C_TO_B_DATA) {
        const data = message.data;
        console.log("[DIGGIN] Background: Received data from content script:", {
          type: data.type,
          contentLength: data.value.length,
          url: data.url
        });
        if (data.type === InsightType.TEXT) {
          if (!session.isActive) {
            console.warn("[DIGGIN] Background: Not saving text entry - no active session");
            return true;
          }
          if (!auth.currentUser) {
            console.warn("[DIGGIN] Background: Not saving text entry - not authenticated");
            const textEntry = {
              content: data.value,
              sourceUrl: data.url,
              title: data.title || "No title",
              timestamp: Date.now()
            };
            chrome.storage.local.get("pendingTextEntries", (result) => {
              const entries = result.pendingTextEntries || [];
              entries.push(textEntry);
              chrome.storage.local.set({ pendingTextEntries: entries }, () => {
                console.log("[DIGGIN] Background: Saved to local storage - pending entries count:", entries.length);
              });
            });
            return true;
          }
          let sourceDomain = "unknown";
          try {
            sourceDomain = new URL(data.url).hostname;
          } catch (error) {
            console.error("[DIGGIN] Background: Failed to extract domain:", error);
          }
          console.log("[DIGGIN] Background: Creating text entry in Firebase with data:", {
            sessionId: (_a = session.data) == null ? void 0 : _a.sessionId,
            contentLength: data.value.length,
            sourceUrl: data.url,
            sourceDomain
          });
          const entriesCollection = collection(db, "textEntries");
          addDoc(entriesCollection, {
            sessionId: ((_b = session.data) == null ? void 0 : _b.sessionId) || (auth.currentUser ? auth.currentUser.uid : "anonymous"),
            holeId: ((_c = session.data) == null ? void 0 : _c.holeId) || "default",
            content: data.value,
            sourceUrl: data.url,
            sourceDomain,
            capturedAt: serverTimestamp(),
            isBookmarked: false
          }).then((docRef) => {
            console.log("[DIGGIN] Background: Text entry successfully saved to Firestore with ID:", docRef.id);
            if (session.data && auth.currentUser) {
              const numInsights = (session.data.numInsights || 0) + 1;
              const userRef = ref(database, auth.currentUser.uid);
              update(userRef, {
                numInsights,
                lastUpdated: Date.now()
              }).then(() => {
                var _a2;
                console.log("[DIGGIN] Background: Updated insight count to:", numInsights);
                if ((_a2 = sender.tab) == null ? void 0 : _a2.id) {
                  chrome.tabs.sendMessage(sender.tab.id, {
                    type: B_TO_C.B_TO_C_ANIMATE,
                    data: {
                      color: "#4CAF50",
                      // 녹색 기본값
                      numInsights
                    }
                  }).catch((error) => {
                    console.error("[DIGGIN] Background: Failed to send animation trigger:", error);
                  });
                }
              }).catch((error) => {
                console.error("[DIGGIN] Background: Failed to update insight count:", error);
              });
            }
          }).catch((error) => {
            console.error("[DIGGIN] Background: Failed to save text entry to Firestore:", error);
          });
        }
        return true;
      }
      if (message.type && !message.action) {
        const action = message.type;
        const data = __spreadValues({}, message);
        delete data.type;
        message = { action, data };
        console.log("[DIGGIN] Background: Converting legacy message format to new format:", message);
      }
      if (message.action === "GET_SESSION_STATE") {
        console.log("[DIGGIN] Background: Sending session state");
        sendResponse({
          success: true,
          isActive: session.isActive,
          data: session.data,
          authenticated: !!auth.currentUser,
          userId: (_d = auth.currentUser) == null ? void 0 : _d.uid
        });
        return true;
      }
      if (message.action === "GET_SESSION_STATUS" || message.type === "GET_SESSION_STATUS") {
        console.log("[DIGGIN] Background: Legacy GET_SESSION_STATUS requested, sending data");
        const sessionId = ((_e = message.data) == null ? void 0 : _e.sessionId) || message.sessionId;
        if (sessionId && ((_f = session.data) == null ? void 0 : _f.sessionId) === sessionId) {
          sendResponse({
            sessionId,
            isActive: session.isActive,
            duration: ((_g = session.data) == null ? void 0 : _g.elapsedTimeInSeconds) || 0
          });
        } else {
          sendResponse(null);
        }
        return true;
      }
      if (message.action === "START_SESSION") {
        console.log("[DIGGIN] Background: Request to start session with data:", message.data);
        if (!auth.currentUser) {
          console.warn("[DIGGIN] Background: No authenticated user, but continuing session anyway");
          session.isActive = true;
          if (!session.data) {
            session.data = {};
          }
          const { sessionId: sessionId2, holeId: holeId2, sessionName: sessionName2, savedDuration: savedDuration2 } = message.data || {};
          if (!sessionId2) {
            console.error("[DIGGIN] Background: Cannot start session - missing sessionId");
            sendResponse({ success: false, error: "Missing sessionId" });
            return true;
          }
          session.data.sessionId = sessionId2;
          session.data.holeId = holeId2 || "default";
          session.data.sessionName = sessionName2 || "";
          session.data.state = DigginState.DIGGIN;
          if (typeof savedDuration2 === "number") {
            session.data.elapsedTimeInSeconds = savedDuration2;
          }
          if (!session.timer) {
            console.log("[DIGGIN] Background: Starting non-authenticated timer");
            const startSeconds = savedDuration2 || session.data.elapsedTimeInSeconds || 0;
            startTimer(startSeconds, (seconds) => {
              console.log("[DIGGIN] Background: Non-authenticated timer tick:", seconds);
              if (session.data) {
                session.data.elapsedTimeInSeconds = seconds;
                if (seconds % 10 === 0) {
                  immediatelySaveSessionToLocalStorage();
                }
              }
            });
          }
          immediatelySaveSessionToLocalStorage();
          sendResponse({
            success: true,
            isActive: session.isActive,
            elapsedTimeInSeconds: ((_h = session.data) == null ? void 0 : _h.elapsedTimeInSeconds) || 0,
            message: "Session started without authentication"
          });
          return true;
        }
        const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
        if (!sessionId) {
          console.error("[DIGGIN] Background: Cannot start session - missing sessionId");
          sendResponse({ success: false, error: "Missing sessionId" });
          return true;
        }
        const uid = auth.currentUser.uid;
        const userRef = ref(database, uid);
        const updateData = {
          sessionId,
          holeId: holeId || "default",
          state: DigginState.DIGGIN,
          lastUpdated: Date.now()
        };
        if (sessionName) {
          updateData.sessionName = sessionName;
        }
        if (typeof savedDuration === "number") {
          updateData.elapsedTimeInSeconds = savedDuration;
        }
        update(userRef, updateData).then(() => {
          var _a2;
          console.log("[DIGGIN] Background: Session started successfully");
          session.isActive = true;
          if (!session.data) {
            session.data = {};
          }
          session.data.sessionId = sessionId;
          session.data.holeId = holeId || session.data.holeId;
          session.data.sessionName = sessionName || session.data.sessionName;
          session.data.state = DigginState.DIGGIN;
          if (typeof savedDuration === "number") {
            session.data.elapsedTimeInSeconds = savedDuration;
          }
          if (!session.timer) {
            console.log("[DIGGIN] Background: Starting new timer");
            const startSeconds = savedDuration || session.data.elapsedTimeInSeconds || 0;
            startTimer(startSeconds, (seconds) => {
              const userRef2 = ref(database, uid);
              console.log("[DIGGIN] Background: Timer tick, updating to", seconds, "seconds");
              update(userRef2, {
                elapsedTimeInSeconds: seconds,
                lastUpdated: Date.now()
              }).catch((error) => {
                console.error("[DIGGIN] Background: Error updating timer:", error);
              });
              if (session.data) {
                session.data.elapsedTimeInSeconds = seconds;
              }
            });
          }
          saveSessionState();
          sendResponse({
            success: true,
            isActive: session.isActive,
            elapsedTimeInSeconds: ((_a2 = session.data) == null ? void 0 : _a2.elapsedTimeInSeconds) || 0
          });
        }).catch((error) => {
          console.error("[DIGGIN] Background: Failed to start session:", error);
          sendResponse({
            success: false,
            error: error instanceof Error ? error.message : "Failed to start session"
          });
        });
        return true;
      }
      if (message.action === "SESSION_CONTINUE") {
        console.log("[DIGGIN] Background: Request to continue session with data:", message.data);
        if (!auth.currentUser) {
          console.warn("[DIGGIN] Background: No authenticated user, but continuing session anyway");
          const { sessionId: sessionId2, holeId: holeId2, sessionName: sessionName2, savedDuration: savedDuration2 } = message.data || {};
          if (!sessionId2) {
            console.error("[DIGGIN] Background: Cannot continue session - missing sessionId");
            sendResponse({ success: false, error: "Missing sessionId" });
            return true;
          }
          session.isActive = true;
          if (!session.data) {
            session.data = {};
          }
          session.data.sessionId = sessionId2;
          session.data.holeId = holeId2 || session.data.holeId;
          session.data.sessionName = sessionName2 || session.data.sessionName;
          session.data.state = DigginState.DIGGIN;
          if (typeof savedDuration2 === "number" && (!session.data.elapsedTimeInSeconds || savedDuration2 > session.data.elapsedTimeInSeconds)) {
            session.data.elapsedTimeInSeconds = savedDuration2;
          }
          console.log("[DIGGIN] Background: Non-authenticated session state after continue:", {
            isActive: session.isActive,
            sessionId: session.data.sessionId,
            elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
          });
          if (!session.timer) {
            const initialSeconds = session.data.elapsedTimeInSeconds || 0;
            console.log("[DIGGIN] Background: Starting non-authenticated timer at", initialSeconds, "seconds");
            startTimer(initialSeconds, (seconds) => {
              console.log("[DIGGIN] Background: Non-authenticated timer tick:", seconds);
              if (session.data) {
                session.data.elapsedTimeInSeconds = seconds;
                if (seconds % 10 === 0) {
                  immediatelySaveSessionToLocalStorage();
                }
              }
            });
          } else {
            console.log("[DIGGIN] Background: Non-authenticated timer already running, continuing");
          }
          immediatelySaveSessionToLocalStorage();
          sendResponse({
            success: true,
            isActive: session.isActive,
            elapsedTimeInSeconds: ((_i = session.data) == null ? void 0 : _i.elapsedTimeInSeconds) || 0,
            message: "Session continued without authentication"
          });
          return true;
        }
        const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
        if (!sessionId) {
          console.error("[DIGGIN] Background: Cannot continue session - missing sessionId");
          sendResponse({ success: false, error: "Missing sessionId" });
          return true;
        }
        session.isActive = true;
        if (!session.data) {
          session.data = {};
        }
        session.data.sessionId = sessionId;
        session.data.holeId = holeId || session.data.holeId;
        session.data.sessionName = sessionName || session.data.sessionName;
        session.data.state = DigginState.DIGGIN;
        if (typeof savedDuration === "number" && (!session.data.elapsedTimeInSeconds || savedDuration > session.data.elapsedTimeInSeconds)) {
          session.data.elapsedTimeInSeconds = savedDuration;
        }
        console.log("[DIGGIN] Background: Session state after continue:", {
          isActive: session.isActive,
          sessionId: session.data.sessionId,
          elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
        });
        const uid = auth.currentUser.uid;
        const userRef = ref(database, uid);
        const updateData = {
          sessionId,
          state: DigginState.DIGGIN,
          lastUpdated: Date.now()
        };
        if (holeId) {
          updateData.holeId = holeId;
        }
        if (sessionName) {
          updateData.sessionName = sessionName;
        }
        if (typeof savedDuration === "number") {
          updateData.elapsedTimeInSeconds = savedDuration;
        }
        update(userRef, updateData).catch((error) => {
          console.error("[DIGGIN] Background: Error updating session data:", error);
        });
        if (!session.timer) {
          const initialSeconds = session.data.elapsedTimeInSeconds || 0;
          console.log("[DIGGIN] Background: Starting/continuing timer at", initialSeconds, "seconds");
          startTimer(initialSeconds, (seconds) => {
            if (!auth.currentUser) return;
            const uid2 = auth.currentUser.uid;
            const userRef2 = ref(database, uid2);
            update(userRef2, {
              elapsedTimeInSeconds: seconds,
              lastUpdated: Date.now()
            }).catch((error) => {
              console.error("[DIGGIN] Background: Error updating timer:", error);
            });
            if (session.data) {
              session.data.elapsedTimeInSeconds = seconds;
            }
          });
        } else {
          console.log("[DIGGIN] Background: Timer already running, continuing");
        }
        saveSessionState().then(() => {
          var _a2;
          console.log("[DIGGIN] Background: Session continuation state saved");
          sendResponse({
            success: true,
            isActive: session.isActive,
            elapsedTimeInSeconds: (_a2 = session.data) == null ? void 0 : _a2.elapsedTimeInSeconds
          });
        }).catch((error) => {
          console.error("[DIGGIN] Background: Failed to save continuation state:", error);
          sendResponse({ success: false, error: "Failed to save session state" });
        });
        return true;
      }
      if (message.action === "PAUSE_SESSION") {
        console.log("[DIGGIN] Background: Request to pause session with data:", message.data);
        if (!auth.currentUser) {
          console.error("[DIGGIN] Background: Cannot pause session - not authenticated");
          sendResponse({ success: false, error: "Not authenticated" });
          return true;
        }
        const { sessionId } = message.data || {};
        if (!sessionId) {
          console.error("[DIGGIN] Background: Cannot pause session - missing sessionId");
          sendResponse({ success: false, error: "Missing sessionId" });
          return true;
        }
        const uid = auth.currentUser.uid;
        session.isActive = false;
        if (session.data) {
          session.data.state = DigginState.PAUSED;
        }
        if (session.timer) {
          stopTimer();
        }
        const userRef = ref(database, uid);
        update(userRef, {
          state: DigginState.PAUSED,
          lastUpdated: Date.now()
        }).then(() => {
          var _a2;
          console.log("[DIGGIN] Background: Session paused successfully");
          sendResponse({
            success: true,
            savedDuration: ((_a2 = session.data) == null ? void 0 : _a2.elapsedTimeInSeconds) || 0
          });
        }).catch((error) => {
          console.error("[DIGGIN] Background: Failed to pause session:", error);
          sendResponse({
            success: false,
            error: error instanceof Error ? error.message : "Failed to pause session"
          });
        });
        return true;
      }
      if (message.action === "RESUME_SESSION") {
        console.log("[DIGGIN] Background: Request to resume session with data:", message.data);
        if (!auth.currentUser) {
          console.error("[DIGGIN] Background: Cannot resume session - not authenticated");
          sendResponse({ success: false, error: "Not authenticated" });
          return true;
        }
        const { sessionId, savedDuration } = message.data || {};
        if (!sessionId) {
          console.error("[DIGGIN] Background: Cannot resume session - missing sessionId");
          sendResponse({ success: false, error: "Missing sessionId" });
          return true;
        }
        session.isActive = true;
        if (session.data) {
          session.data.state = DigginState.DIGGIN;
        }
        if (typeof savedDuration === "number" && session.data) {
          session.data.elapsedTimeInSeconds = savedDuration;
        }
        const uid = auth.currentUser.uid;
        const userRef = ref(database, uid);
        update(userRef, {
          state: DigginState.DIGGIN,
          elapsedTimeInSeconds: savedDuration || ((_j = session.data) == null ? void 0 : _j.elapsedTimeInSeconds) || 0,
          lastUpdated: Date.now()
        }).then(() => {
          var _a2;
          if (!session.timer && session.data) {
            const startSeconds = session.data.elapsedTimeInSeconds || 0;
            startTimer(startSeconds, (seconds) => {
              const userRef2 = ref(database, uid);
              update(userRef2, {
                elapsedTimeInSeconds: seconds,
                lastUpdated: Date.now()
              }).catch((error) => {
                console.error("[DIGGIN] Background: Error updating timer:", error);
              });
              if (session.data) {
                session.data.elapsedTimeInSeconds = seconds;
              }
            });
          }
          console.log("[DIGGIN] Background: Session resumed successfully");
          sendResponse({
            success: true,
            isActive: true,
            elapsedTimeInSeconds: ((_a2 = session.data) == null ? void 0 : _a2.elapsedTimeInSeconds) || 0
          });
        }).catch((error) => {
          console.error("[DIGGIN] Background: Failed to resume session:", error);
          sendResponse({
            success: false,
            error: error instanceof Error ? error.message : "Failed to resume session"
          });
        });
        return true;
      }
      if (message.action === "END_SESSION") {
        console.log("[DIGGIN] Background: Request to end session with data:", message.data);
        if (!session.isActive) {
          console.warn("[DIGGIN] Background: No active session to end");
          chrome.storage.local.remove("activeSession", () => {
            console.log("[DIGGIN] Background: Removed active session data from local storage");
            chrome.storage.local.set({ "sessionEnded": true, "sessionEndedTimestamp": Date.now() }, () => {
              console.log("[DIGGIN] Background: Set sessionEnded flag in local storage");
              setTimeout(() => {
                chrome.storage.local.remove("sessionEnded", () => {
                  console.log("[DIGGIN] Background: Automatically cleared sessionEnded flag after timeout");
                });
              }, 3e5);
            });
          });
          sendResponse({ success: true, message: "No active session" });
          return true;
        }
        const finalDuration = ((_k = session.data) == null ? void 0 : _k.elapsedTimeInSeconds) || 0;
        const sessionInfo = __spreadValues({}, session.data);
        stopTimer();
        session.isActive = false;
        session.data = null;
        chrome.storage.local.remove("activeSession", () => {
          console.log("[DIGGIN] Background: Removed active session data from local storage");
        });
        if (auth.currentUser) {
          const uid = auth.currentUser.uid;
          const userRef = ref(database, uid);
          update(userRef, {
            state: DigginState.IDLE,
            lastUpdated: Date.now()
          }).then(() => {
            console.log("[DIGGIN] Background: Session ended successfully in Realtime DB");
            const activeSessionRef = ref(database, `${uid}/activeSession`);
            return set(activeSessionRef, null);
          }).then(() => {
            console.log("[DIGGIN] Background: Active session info cleared from Realtime DB");
            sendResponse({
              success: true,
              finalDuration
            });
          }).catch((error) => {
            console.error("[DIGGIN] Background: Error updating Realtime DB, but session was ended locally:", error);
            sendResponse({
              success: true,
              // 로컬에서는 성공했으므로 true 반환
              finalDuration,
              dbError: error instanceof Error ? error.message : "Failed to update database"
            });
          });
        } else {
          console.log("[DIGGIN] Background: Session ended successfully (non-authenticated)");
          sendResponse({
            success: true,
            finalDuration,
            sessionInfo
            // 디버깅용으로 마지막 세션 정보 포함
          });
        }
        return true;
      }
      if (message.action === "CHECK_ACTIVE_SESSION") {
        let continueCheckingActiveSession = function() {
          console.log("[DIGGIN] Background: No active session in memory, checking direct local storage...");
          getFromLocalStorage("activeSession").then((localSession) => {
            if (localSession && localSession.sessionId) {
              console.log("[DIGGIN] Background: Found active session in local storage:", localSession);
              session.isActive = true;
              if (!session.data) {
                session.data = {};
              }
              session.data.sessionId = localSession.sessionId;
              session.data.holeId = localSession.holeId;
              session.data.sessionName = localSession.sessionName || "";
              session.data.state = DigginState.DIGGIN;
              if (localSession.elapsedTimeInSeconds) {
                session.data.elapsedTimeInSeconds = localSession.elapsedTimeInSeconds;
              }
              if (!session.timer && session.data.elapsedTimeInSeconds !== void 0) {
                const startSeconds = session.data.elapsedTimeInSeconds;
                console.log("[DIGGIN] Background: Starting timer for restored session at", startSeconds, "seconds");
                startTimer(startSeconds, (seconds) => {
                  console.log("[DIGGIN] Background: Timer tick for restored session:", seconds);
                  if (session.data) {
                    session.data.elapsedTimeInSeconds = seconds;
                    if (seconds % 10 === 0) {
                      immediatelySaveSessionToLocalStorage();
                    }
                  }
                });
                immediatelySaveSessionToLocalStorage();
              }
              const activeSession = {
                sessionId: localSession.sessionId,
                holeId: localSession.holeId,
                sessionName: localSession.sessionName,
                elapsedTimeInSeconds: localSession.elapsedTimeInSeconds
              };
              sendResponse({
                success: true,
                hasActiveSession: true,
                activeSession
              });
            } else {
              console.log("[DIGGIN] Background: No active session in local storage, trying database...");
              loadSessionState().then((dbSession) => {
                if (dbSession && dbSession.sessionId) {
                  console.log("[DIGGIN] Background: Found active session in database:", dbSession);
                  session.isActive = true;
                  if (!session.data) {
                    session.data = {};
                  }
                  session.data.sessionId = dbSession.sessionId;
                  session.data.holeId = dbSession.holeId;
                  session.data.sessionName = dbSession.sessionName || "";
                  session.data.state = DigginState.DIGGIN;
                  if (dbSession.elapsedTimeInSeconds) {
                    session.data.elapsedTimeInSeconds = dbSession.elapsedTimeInSeconds;
                  }
                  if (!session.timer && session.data.elapsedTimeInSeconds !== void 0) {
                    const startSeconds = session.data.elapsedTimeInSeconds;
                    startTimer(startSeconds, (seconds) => {
                      console.log("[DIGGIN] Background: Timer tick for DB-restored session:", seconds);
                      if (session.data) {
                        session.data.elapsedTimeInSeconds = seconds;
                        if (seconds % 10 === 0) {
                          immediatelySaveSessionToLocalStorage();
                        }
                      }
                    });
                  }
                  immediatelySaveSessionToLocalStorage();
                  sendResponse({
                    success: true,
                    hasActiveSession: true,
                    activeSession: dbSession
                  });
                } else {
                  console.log("[DIGGIN] Background: No active session found anywhere");
                  sendResponse({
                    success: true,
                    hasActiveSession: false
                  });
                }
              }).catch((dbError) => {
                console.error("[DIGGIN] Background: Error checking database session:", dbError);
                sendResponse({
                  success: false,
                  error: "Failed to check active session in database"
                });
              });
            }
          }).catch((error) => {
            console.error("[DIGGIN] Background: Error checking active session in local storage:", error);
            sendResponse({
              success: false,
              error: error instanceof Error ? error.message : "Failed to check active session in storage"
            });
          });
        };
        console.log("[DIGGIN] Background: Checking for active session");
        chrome.storage.local.get("sessionEnded", (result) => {
          if (result.sessionEnded) {
            console.log("[DIGGIN] Background: Session ended flag found, reporting no active session");
            sendResponse({
              success: true,
              hasActiveSession: false,
              sessionEnded: true
            });
            return;
          }
          if (session.isActive && session.data && session.data.sessionId) {
            console.log("[DIGGIN] Background: Using currently active session from memory:", {
              sessionId: session.data.sessionId,
              holeId: session.data.holeId,
              sessionName: session.data.sessionName,
              elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
            });
            immediatelySaveSessionToLocalStorage();
            sendResponse({
              success: true,
              hasActiveSession: true,
              activeSession: {
                sessionId: session.data.sessionId,
                holeId: session.data.holeId,
                sessionName: session.data.sessionName,
                elapsedTimeInSeconds: session.data.elapsedTimeInSeconds
              }
            });
            return;
          }
          continueCheckingActiveSession();
        });
        return true;
      }
      return false;
    });
    chrome.runtime.onSuspend.addListener(() => __async(exports, null, function* () {
      console.log("[DIGGIN] Background: Extension suspending");
      if (session.isActive && session.data && auth.currentUser) {
        console.log("[DIGGIN] Background: Saving active session state before suspension");
        try {
          yield saveSessionState();
          console.log("[DIGGIN] Background: Session state successfully saved before suspension");
        } catch (error) {
          console.error("[DIGGIN] Background: Failed to save session state before suspension:", error);
        }
      } else {
        console.log("[DIGGIN] Background: No active session to save before suspension");
      }
    }));
    setInterval(() => {
      if (session.isActive && session.data && auth.currentUser) {
        console.log("[DIGGIN] Background: Periodic session state saving...");
        saveSessionState().then(() => console.log("[DIGGIN] Background: Periodic save completed")).catch((error) => console.error("[DIGGIN] Background: Periodic save failed:", error));
      }
    }, 1e4);
    function checkAndRestoreSession() {
      return __async(this, null, function* () {
        if (!auth.currentUser) {
          console.log("[DIGGIN] Background: No authenticated user to restore session");
          return;
        }
        try {
          console.log("[DIGGIN] Background: Checking for previous active session");
          const activeSession = yield loadSessionState();
          if (activeSession && activeSession.sessionId) {
            console.log("[DIGGIN] Background: Found previous active session, restoring:", activeSession);
            session.isActive = true;
            if (!session.data) {
              session.data = {};
            }
            session.data.sessionId = activeSession.sessionId;
            session.data.holeId = activeSession.holeId;
            session.data.sessionName = activeSession.sessionName;
            session.data.state = DigginState.DIGGIN;
            session.data.elapsedTimeInSeconds = activeSession.elapsedTimeInSeconds;
            const uid = auth.currentUser.uid;
            const userRef = ref(database, uid);
            yield update(userRef, {
              sessionId: activeSession.sessionId,
              holeId: activeSession.holeId,
              sessionName: activeSession.sessionName,
              state: DigginState.DIGGIN,
              elapsedTimeInSeconds: activeSession.elapsedTimeInSeconds,
              lastUpdated: Date.now()
            });
            if (!session.timer) {
              const startSeconds = activeSession.elapsedTimeInSeconds || 0;
              console.log("[DIGGIN] Background: Starting timer for restored session at", startSeconds, "seconds");
              startTimer(startSeconds, (seconds) => {
                if (!auth.currentUser) return;
                const uid2 = auth.currentUser.uid;
                const userRef2 = ref(database, uid2);
                update(userRef2, {
                  elapsedTimeInSeconds: seconds,
                  lastUpdated: Date.now()
                }).catch((error) => {
                  console.error("[DIGGIN] Background: Error updating timer:", error);
                });
                if (session.data) {
                  session.data.elapsedTimeInSeconds = seconds;
                }
              });
            }
            console.log("[DIGGIN] Background: Session restoration completed");
          } else {
            console.log("[DIGGIN] Background: No previous active session found");
          }
        } catch (error) {
          console.error("[DIGGIN] Background: Error restoring session:", error);
        }
      });
    }
    function processPendingCopiedItems() {
      console.log("[DIGGIN] Background: Checking for pending copied items in local storage");
      chrome.storage.local.get("pendingCopiedItems", (result) => {
        if (chrome.runtime.lastError) {
          console.error("[DIGGIN] Background: Error getting pending items from storage:", chrome.runtime.lastError);
          return;
        }
        const pendingItems = result.pendingCopiedItems || [];
        if (pendingItems.length === 0) {
          console.log("[DIGGIN] Background: No pending copied items to process");
          return;
        }
        console.log("[DIGGIN] Background: Found", pendingItems.length, "pending copied items to process");
        const isAuthenticated = !!auth.currentUser;
        const isSessionActive = session.isActive;
        if (!isSessionActive) {
          console.log("[DIGGIN] Background: No active session, keeping items for later processing");
          return;
        }
        const itemsToProcess = pendingItems.slice(0, 10);
        const remainingItems = pendingItems.slice(10);
        Promise.all(
          itemsToProcess.map((item) => __async(this, null, function* () {
            try {
              let sourceDomain = "unknown";
              try {
                sourceDomain = new URL(item.url).hostname;
              } catch (error) {
                console.error("[DIGGIN] Background: Failed to extract domain:", error);
              }
              if (isAuthenticated && session.data) {
                console.log("[DIGGIN] Background: Saving pending item to Firestore:", {
                  contentLength: item.content.length,
                  url: item.url,
                  timestamp: new Date(item.timestamp).toISOString()
                });
                const entriesCollection = collection(db, "textEntries");
                yield addDoc(entriesCollection, {
                  sessionId: session.data.sessionId || (auth.currentUser ? auth.currentUser.uid : "anonymous"),
                  holeId: session.data.holeId || "default",
                  content: item.content,
                  sourceUrl: item.url,
                  sourceDomain,
                  capturedAt: serverTimestamp(),
                  isBookmarked: false
                });
                if (auth.currentUser) {
                  const numInsights = (session.data.numInsights || 0) + 1;
                  const userRef = ref(database, auth.currentUser.uid);
                  yield update(userRef, {
                    numInsights,
                    lastUpdated: Date.now()
                  });
                  console.log("[DIGGIN] Background: Updated insight count to:", numInsights);
                  session.data.numInsights = numInsights;
                }
                console.log("[DIGGIN] Background: Successfully processed pending copied item");
                return true;
              } else {
                console.log("[DIGGIN] Background: User not authenticated or no session data, keeping item for later");
                return false;
              }
            } catch (error) {
              console.error("[DIGGIN] Background: Error processing pending copied item:", error);
              return false;
            }
          }))
        ).then((results) => {
          const successCount = results.filter(Boolean).length;
          const newPendingItems = [
            ...itemsToProcess.filter((_, index) => !results[index]),
            ...remainingItems
          ];
          chrome.storage.local.set({ pendingCopiedItems: newPendingItems }, () => {
            if (chrome.runtime.lastError) {
              console.error("[DIGGIN] Background: Error updating pending items list:", chrome.runtime.lastError);
              return;
            }
            console.log("[DIGGIN] Background: Processed", successCount, "pending items,", newPendingItems.length, "remaining");
          });
        });
      });
    }
    setInterval(processPendingCopiedItems, 6e4);
    function saveToLocalStorage(key, data) {
      return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [key]: data }, () => {
          if (chrome.runtime.lastError) {
            console.error(`[DIGGIN] Background: Error saving to local storage (${key}):`, chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
          } else {
            console.log(`[DIGGIN] Background: Saved to local storage (${key}):`, data);
            resolve();
          }
        });
      });
    }
    function getFromLocalStorage(key) {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
          if (chrome.runtime.lastError) {
            console.error(`[DIGGIN] Background: Error reading from local storage (${key}):`, chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
          } else {
            console.log(`[DIGGIN] Background: Read from local storage (${key}):`, result[key] || null);
            resolve(result[key] || null);
          }
        });
      });
    }
    function immediatelySaveSessionToLocalStorage() {
      if (session.isActive && session.data) {
        const sessionData = {
          sessionId: session.data.sessionId,
          holeId: session.data.holeId,
          sessionName: session.data.sessionName,
          elapsedTimeInSeconds: session.data.elapsedTimeInSeconds || 0,
          state: session.data.state || DigginState.DIGGIN,
          lastUpdated: Date.now()
        };
        console.log("[DIGGIN] Background: Immediately saving active session to local storage:", sessionData);
        saveToLocalStorage("activeSession", sessionData).then(() => console.log("[DIGGIN] Background: Session saved to local storage successfully")).catch((error) => console.error("[DIGGIN] Background: Failed to save session to local storage:", error));
      }
    }
  }
});
export default require_background();
