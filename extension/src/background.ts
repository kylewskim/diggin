// DIGGIN Extension v4.8 - Firebase Iframe Background Script
// Using proven gem-signin iframe approach for reliable authentication

import { DigginState, InsightType, B_TO_C, C_TO_B } from './types/enums';
import { C_TO_B_DATA } from './types/interfaces';

console.log('[DIGGIN] Background: Firebase Iframe v4.8 - Using Gem Pattern');

// Chrome storage keys
enum LocalStorageKeys {
  GOOGLE_ACCESS_TOKEN = 'GOOGLE_ACCESS_TOKEN',
  GOOGLE_ID_TOKEN = 'GOOGLE_ID_TOKEN',
  UID = 'UID',
  USER_INFO = 'USER_INFO',
  AUTH_TIMESTAMP = 'AUTH_TIMESTAMP'
}

// Offscreen document configuration
const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';
let creatingOffscreenDocument: Promise<void> | null = null;

// Authentication state
let currentUser: any = null;
let authStateChangeListeners: ((user: any) => void)[] = [];

// Session management
interface SessionData {
  userId?: string;
  sessionId?: string;
  holeId?: string;
  sessionName?: string;
  state?: DigginState;
  elapsedTimeInSeconds?: number;
  numInsights?: number;
  lastUpdated?: number;
}

const session: {
  isActive: boolean;
  data: SessionData | null;
} = {
  isActive: false,
  data: null
};

// Extension context validation
function isExtensionContextValid(): boolean {
  try {
    return !!(chrome && chrome.runtime && chrome.runtime.id);
  } catch (error) {
    console.warn('[DIGGIN] Background: Extension context check failed:', error);
    return false;
  }
}

// Safe Chrome storage operations
function safeStorageGet(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!isExtensionContextValid()) {
      reject(new Error('Extension context invalidated'));
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

function safeStorageSet(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isExtensionContextValid()) {
      reject(new Error('Extension context invalidated'));
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

// Offscreen document management
async function checkIfOffScreenExists(): Promise<boolean> {
  try {
    const existingContexts = await chrome.runtime.getContexts({
      contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
      documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)]
    });
    return existingContexts.length > 0;
  } catch (error) {
    console.error('[DIGGIN] Background: Error checking offscreen existence:', error);
    return false;
  }
}

async function setupOffscreenDocument(path: string): Promise<void> {
  console.log('[DIGGIN] Background: Setting up offscreen document');
  
  const offscreenUrl = chrome.runtime.getURL(path);
  const offScreenExists = await checkIfOffScreenExists();

  if (offScreenExists) {
    console.log('[DIGGIN] Background: Offscreen document already exists');
    return;
  }

  if (creatingOffscreenDocument) {
    await creatingOffscreenDocument;
    return;
  }

  creatingOffscreenDocument = chrome.offscreen
    .createDocument({
      url: offscreenUrl,
      reasons: [chrome.offscreen.Reason.DOM_SCRAPING],
      justification: 'Firebase authentication requires DOM access for iframe-based auth'
    })
    .then(() => {
      console.log('[DIGGIN] Background: Offscreen document created successfully');
    })
    .catch((error) => {
      console.error('[DIGGIN] Background: Error creating offscreen document:', error);
    });

  await creatingOffscreenDocument;
  creatingOffscreenDocument = null;
}

async function closeOffscreenDocument(): Promise<void> {
  try {
    const existingContexts = await chrome.runtime.getContexts({
      contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
      documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)]
    });
    
    if (existingContexts.length > 0) {
      await chrome.offscreen.closeDocument();
      console.log('[DIGGIN] Background: Offscreen document closed');
    }
  } catch (error) {
    console.error('[DIGGIN] Background: Error closing offscreen document:', error);
  }
}

// Authentication functions
async function getUserCredentialUsingOffscreenDocument(): Promise<any> {
  await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);
  
  console.log('[DIGGIN] Background: Starting authentication via offscreen');
  
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      type: 'firebase-auth',
      target: 'offscreen'
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('[DIGGIN] Background: Auth message error:', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }
      
      if (response?.error) {
        console.error('[DIGGIN] Background: Authentication error:', response.error);
        reject(new Error(response.error));
      } else if (response?.success && response?.user) {
        console.log('[DIGGIN] Background: Authentication successful');
        resolve(response);
      } else {
        reject(new Error('Invalid authentication response'));
      }
    });
  }).finally(() => {
    closeOffscreenDocument();
  });
}

async function signInWithOffscreenPopUp(): Promise<void> {
  console.log('[DIGGIN] Background: Starting sign-in process');

  // Check if already signed in
  if (currentUser) {
    console.log('[DIGGIN] Background: User already signed in:', currentUser.uid);
    notifyAuthStateChange(currentUser);
    return;
  }

  // Try stored credentials first
  try {
    const storedUserInfo = await safeStorageGet(LocalStorageKeys.USER_INFO);
    const storedTimestamp = await safeStorageGet(LocalStorageKeys.AUTH_TIMESTAMP);
    const storedToken = await safeStorageGet(LocalStorageKeys.GOOGLE_ACCESS_TOKEN);
    
    if (storedUserInfo && storedTimestamp && storedToken) {
      const currentTime = Date.now();
      if (currentTime - storedTimestamp < 60 * 60 * 1000) { // 1 hour
        console.log('[DIGGIN] Background: Using stored credentials');
        currentUser = storedUserInfo;
        notifyAuthStateChange(currentUser);
        startSession(currentUser.uid);
        return;
      } else {
        console.log('[DIGGIN] Background: Stored credentials expired');
        await clearStoredAuth();
      }
    }
  } catch (error) {
    console.warn('[DIGGIN] Background: Error checking stored credentials:', error);
  }

  // Perform fresh authentication
  try {
    const userCredential = await getUserCredentialUsingOffscreenDocument();
    
    if (userCredential?.user) {
      currentUser = userCredential.user;
      console.log('[DIGGIN] Background: User signed in successfully:', currentUser.uid);
      
      // Save user info
      await saveUserInfo(currentUser);
      
      // Notify auth state change
      notifyAuthStateChange(currentUser);
      
      // Start session
      startSession(currentUser.uid);
      
      // Process pending items
      processPendingCopiedItems();
    }
  } catch (error) {
    console.error('[DIGGIN] Background: Sign-in failed:', error);
    throw error;
  }
}

async function signOut(): Promise<void> {
  console.log('[DIGGIN] Background: Starting sign-out process');
  
  try {
    // Send logout message to offscreen
    await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);
    
    await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        type: 'logout',
        target: 'offscreen'
      }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (response?.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
    
    // Clear local state
    currentUser = null;
    session.isActive = false;
    session.data = null;
    
    // Clear session storage
    await safeStorageSet('activeSession', null);
    
    // Notify auth state change
    notifyAuthStateChange(null);
    
    console.log('[DIGGIN] Background: Sign-out completed');
  } catch (error) {
    console.error('[DIGGIN] Background: Sign-out failed:', error);
    throw error;
  } finally {
    closeOffscreenDocument();
  }
}

async function clearStoredAuth(): Promise<void> {
  try {
    await Promise.all([
      safeStorageSet(LocalStorageKeys.USER_INFO, null),
      safeStorageSet(LocalStorageKeys.AUTH_TIMESTAMP, null),
      safeStorageSet(LocalStorageKeys.GOOGLE_ACCESS_TOKEN, null),
      safeStorageSet(LocalStorageKeys.GOOGLE_ID_TOKEN, null),
      safeStorageSet(LocalStorageKeys.UID, null)
    ]);
    console.log('[DIGGIN] Background: Stored authentication data cleared');
  } catch (error) {
    console.error('[DIGGIN] Background: Error clearing stored auth:', error);
  }
}

function notifyAuthStateChange(user: any): void {
  authStateChangeListeners.forEach(listener => {
    try {
      listener(user);
    } catch (error) {
      console.error('[DIGGIN] Background: Error in auth state listener:', error);
    }
  });
}

function onAuthStateChanged(callback: (user: any) => void): () => void {
  authStateChangeListeners.push(callback);
  
  // Immediately call with current user
  if (currentUser) {
    callback(currentUser);
  }
  
  // Return unsubscribe function
  return () => {
    const index = authStateChangeListeners.indexOf(callback);
    if (index > -1) {
      authStateChangeListeners.splice(index, 1);
    }
  };
}

// Session management
function startSession(userId: string): void {
  console.log('[DIGGIN] Background: Starting session for user:', userId);
  
  if (!session.data) {
    session.data = {
      userId,
      sessionId: `session_${Date.now()}`,
      holeId: `hole_${Date.now()}`,
      sessionName: 'Default Session',
      state: DigginState.DIGGIN,
      elapsedTimeInSeconds: 0,
      numInsights: 0,
      lastUpdated: Date.now()
    };
  }
  
  session.isActive = true;
  
  // Save session to storage
  safeStorageSet('activeSession', session.data).catch(error => {
    console.error('[DIGGIN] Background: Error saving session:', error);
  });
}

// User info management
async function saveUserInfo(user: any): Promise<void> {
  if (!user) {
    console.log('[DIGGIN] Background: No user to save');
    return;
  }

  console.log('[DIGGIN] Background: Saving user info to Chrome storage:', user.uid);
  
  try {
    await safeStorageSet('userData', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: Date.now(),
      updatedAt: Date.now()
    });

    console.log('[DIGGIN] Background: User info saved successfully');
  } catch (error) {
    console.error('[DIGGIN] Background: Failed to save user info:', error);
  }
}

// Pending items management
interface PendingCopiedItem {
  content: string;
  url: string;
  title: string;
  timestamp: number;
}

function processPendingCopiedItems(): void {
  console.log('[DIGGIN] Background: Processing pending copied items');
  
  safeStorageGet('pendingCopiedItems')
    .then(pendingItems => {
      if (!pendingItems || !Array.isArray(pendingItems) || pendingItems.length === 0) {
        console.log('[DIGGIN] Background: No pending items to process');
        return;
      }

      console.log('[DIGGIN] Background: Found', pendingItems.length, 'pending items');

      pendingItems.forEach(async (item: PendingCopiedItem, index: number) => {
        try {
          if (!currentUser) {
            console.warn('[DIGGIN] Background: Cannot process item - user not authenticated');
            return;
          }

          const storageKey = `insight_${currentUser.uid}_${Date.now()}_${index}`;
          await safeStorageSet(storageKey, {
            type: 'TEXT',
            value: item.content,
            url: item.url,
            highlight: false,
            createdAt: new Date(item.timestamp).toISOString(),
            sessionId: session.data?.sessionId || 'default',
            holeId: session.data?.holeId || 'default'
          });

          console.log('[DIGGIN] Background: Processed pending item', index + 1);
        } catch (error) {
          console.error('[DIGGIN] Background: Failed to process pending item', index + 1, ':', error);
        }
      });

      // Clear pending items
      safeStorageSet('pendingCopiedItems', []).catch(error => {
        console.error('[DIGGIN] Background: Failed to clear pending items:', error);
      });
    })
    .catch(error => {
      console.error('[DIGGIN] Background: Failed to get pending items:', error);
    });
}

// Message handling
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  try {
    console.log('[DIGGIN] Background: Received message:', message.action || message.type);
    
    // Copy event handling
    if (message.action === 'COPY_EVENT') {
      console.log('[DIGGIN] Background: Copy event detected, content length:', message.text?.length || 0);
      
      if (!currentUser) {
        console.log('[DIGGIN] Background: No authenticated user, saving to pending');
        
        const pendingEntry = {
          content: message.text,
          url: message.url,
          title: message.title,
          timestamp: Date.now()
        };
        
        safeStorageGet('pendingCopiedItems').then(entries => {
          const pendingEntries = entries || [];
          pendingEntries.push(pendingEntry);
          return safeStorageSet('pendingCopiedItems', pendingEntries);
        }).then(() => {
          console.log('[DIGGIN] Background: Saved to pending items');
        }).catch(error => {
          console.error('[DIGGIN] Background: Failed to save to pending:', error);
        });
        
        return false;
      }

      if (!session.isActive || !session.data) {
        console.log('[DIGGIN] Background: No active session, saving to pending');
        
        const pendingEntry = {
          content: message.text,
          url: message.url,
          title: message.title,
          timestamp: Date.now()
        };
        
        safeStorageGet('pendingCopiedItems').then(entries => {
          const pendingEntries = entries || [];
          pendingEntries.push(pendingEntry);
          return safeStorageSet('pendingCopiedItems', pendingEntries);
        }).then(() => {
          console.log('[DIGGIN] Background: Saved to pending items (no session)');
        }).catch(error => {
          console.error('[DIGGIN] Background: Failed to save to pending:', error);
        });
        
        return false;
      }
      
      // Save immediately to Chrome storage
      console.log('[DIGGIN] Background: Active session detected, saving immediately');
      const storageKey = `insight_${currentUser.uid}_${Date.now()}`;
      
      safeStorageSet(storageKey, {
        type: 'TEXT',
        value: message.text,
        url: message.url,
        highlight: false,
        createdAt: new Date().toISOString(),
        sessionId: session.data.sessionId,
        holeId: session.data.holeId || 'default'
      })
      .then(() => {
        console.log('[DIGGIN] Background: Text entry saved immediately');
        
        // Update insight count
        if (session.data && currentUser) {
          const numInsights = (session.data.numInsights || 0) + 1;
          session.data.numInsights = numInsights;
          
          safeStorageSet('activeSession', session.data).then(() => {
            console.log('[DIGGIN] Background: Updated insight count to:', numInsights);
          }).catch(error => {
            console.error('[DIGGIN] Background: Error updating insight count:', error);
          });
        }
      })
      .catch(error => {
        console.error('[DIGGIN] Background: Failed to save immediately:', error);
      });
      
      return false;
    }

    // Session management messages
    if (message.action === 'START_SESSION') {
      console.log('[DIGGIN] Background: Starting session:', message.data);
      
      const { sessionId, holeId, sessionName, savedDuration } = message.data || {};
      
      if (sessionId && holeId) {
        session.isActive = true;
        session.data = {
          sessionId,
          holeId,
          sessionName: sessionName || '',
          elapsedTimeInSeconds: savedDuration || 0,
          numInsights: 0,
          lastUpdated: Date.now()
        };
        
        safeStorageSet('activeSession', session.data).then(() => {
          console.log('[DIGGIN] Background: Session started and saved');
          sendResponse({ success: true, sessionData: session.data });
        }).catch(error => {
          console.error('[DIGGIN] Background: Failed to save session:', error);
          sendResponse({ success: false, error: error.message });
        });
      } else {
        sendResponse({ success: false, error: 'Invalid session data' });
      }
      
      return true;
    }

    if (message.action === 'END_SESSION') {
      console.log('[DIGGIN] Background: Ending session');
      
      if (session.data) {
        const finalDuration = session.data.elapsedTimeInSeconds;
        session.isActive = false;
        const endedSession = { ...session.data };
        session.data = null;
        
        safeStorageSet('activeSession', null).then(() => {
          console.log('[DIGGIN] Background: Session ended');
          sendResponse({ success: true, finalDuration, endedSession });
        }).catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      } else {
        sendResponse({ success: false, error: 'No active session' });
      }
      
      return true;
    }

    if (message.action === 'GET_SESSION_STATUS') {
      const response = {
        isActive: session.isActive,
        sessionId: session.data?.sessionId || null,
        holeId: session.data?.holeId || null,
        sessionName: session.data?.sessionName || null,
        duration: session.data?.elapsedTimeInSeconds || 0,
        numInsights: session.data?.numInsights || 0
      };
      
      sendResponse(response);
      return true;
    }

    // Add missing CHECK_ACTIVE_SESSION handler
    if (message.action === 'CHECK_ACTIVE_SESSION') {
      console.log('[DIGGIN] Background: Checking active session');
      
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
      
      console.log('[DIGGIN] Background: Active session check result:', response);
      sendResponse(response);
      return true;
    }
    
    // Authentication messages
    if (message.action === 'TRIGGER_LOGIN') {
      console.log('[DIGGIN] Background: Manual login triggered');
      
      signInWithOffscreenPopUp()
        .then(() => {
          sendResponse({ success: true });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      
      return true;
    }
    
    if (message.action === 'TRIGGER_LOGOUT') {
      console.log('[DIGGIN] Background: Logout triggered');
      
      signOut()
        .then(() => {
          sendResponse({ success: true });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      
      return true;
    }

    // Session continuation
    if (message.action === 'SESSION_CONTINUE') {
      console.log('[DIGGIN] Background: Session continue requested');
      
      try {
        if (session.isActive && session.data) {
          // Update session timestamp
          session.data.lastUpdated = Date.now();
          safeStorageSet('activeSession', session.data)
            .then(() => {
              sendResponse({ 
                success: true, 
                session: session.data 
              });
            })
            .catch((error: any) => {
              console.error('[DIGGIN] Background: Error saving session:', error);
              sendResponse({ 
                success: false, 
                error: error.message || 'Failed to save session' 
              });
            });
        } else {
          sendResponse({ 
            success: false, 
            error: 'No active session to continue' 
          });
        }
      } catch (error: any) {
        console.error('[DIGGIN] Background: Error continuing session:', error);
        sendResponse({ 
          success: false, 
          error: error.message || 'Unknown error' 
        });
      }
      
      return true;
    }

    // Get session state
    if (message.action === 'GET_SESSION_STATE') {
      console.log('[DIGGIN] Background: Session state requested');
      
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
        
        console.log('[DIGGIN] Background: Session state response:', response);
        sendResponse(response);
      } catch (error: any) {
        console.error('[DIGGIN] Background: Error getting session state:', error);
        sendResponse({ 
          success: false, 
          error: error.message || 'Unknown error' 
        });
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.warn('[DIGGIN] Background: Error handling message:', error);
    return false;
  }
});

// Session restoration on startup
async function restoreActiveSession(): Promise<void> {
  console.log('[DIGGIN] Background: Attempting to restore active session');
  
  try {
    const savedSession = await safeStorageGet('activeSession');
    
    if (savedSession && savedSession.sessionId) {
      console.log('[DIGGIN] Background: Found saved session, restoring');
      session.isActive = true;
      session.data = savedSession;
      console.log('[DIGGIN] Background: Session restored successfully');
    } else {
      console.log('[DIGGIN] Background: No saved session found');
    }
  } catch (error) {
    console.error('[DIGGIN] Background: Failed to restore session:', error);
  }
}

// Authentication initialization
async function initializeAuthentication(): Promise<void> {
  console.log('[DIGGIN] Background: Initializing Chrome Identity API authentication v4.0');
  
  // Set up auth state listener
  onAuthStateChanged(async (user) => {
    if (user) {
      console.log('[DIGGIN] Background: User signed in:', user.uid);
      startSession(user.uid);
    } else {
      console.log('[DIGGIN] Background: User signed out');
      session.isActive = false;
      session.data = null;
    }
  });

  // Try auto-login with stored credentials
  try {
    const storedUserInfo = await safeStorageGet(LocalStorageKeys.USER_INFO);
    const storedTimestamp = await safeStorageGet(LocalStorageKeys.AUTH_TIMESTAMP);
    const storedToken = await safeStorageGet(LocalStorageKeys.GOOGLE_ACCESS_TOKEN);
    
    if (storedUserInfo && storedTimestamp && storedToken) {
      const currentTime = Date.now();
      if (currentTime - storedTimestamp < 60 * 60 * 1000) { // 1 hour
        console.log('[DIGGIN] Background: Valid stored credentials found, auto-login');
        
        // Validate token
        try {
          const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${storedToken}`);
          if (response.ok) {
            currentUser = storedUserInfo;
            notifyAuthStateChange(currentUser);
            console.log('[DIGGIN] Background: Auto-login successful');
          } else {
            throw new Error('Token validation failed');
          }
        } catch (error) {
          console.warn('[DIGGIN] Background: Token validation failed, clearing data');
          await clearStoredAuth();
        }
      } else {
        console.log('[DIGGIN] Background: Stored credentials expired');
        await clearStoredAuth();
      }
    } else {
      console.log('[DIGGIN] Background: No stored credentials found');
    }
  } catch (error) {
    console.error('[DIGGIN] Background: Auto-login failed:', error);
  }
}

// Initialize
console.log('[DIGGIN] Background: Script initialization v4.0 - Pure Chrome API');

// Clean up any existing offscreen documents
chrome.runtime.getContexts({
  contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT]
}).then(contexts => {
  if (contexts.length > 0) {
    console.log('[DIGGIN] Background: Cleaning up existing offscreen documents');
    chrome.offscreen.closeDocument().catch(error => {
      console.warn('[DIGGIN] Background: Error cleaning up offscreen:', error);
    });
  }
});

// Test offscreen document creation
async function testOffscreenSetup() {
  try {
    console.log('[DIGGIN] Background: Testing offscreen document setup');
    await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);
    console.log('[DIGGIN] Background: Offscreen document setup successful');
    
    // Test communication with offscreen
    const testResponse = await chrome.runtime.sendMessage({
      type: 'auto-login',
      target: 'offscreen'
    });
    console.log('[DIGGIN] Background: Offscreen communication test:', testResponse);
    
    // Close test offscreen
    await closeOffscreenDocument();
  } catch (error) {
    console.error('[DIGGIN] Background: Offscreen setup test failed:', error);
  }
}

// Start initialization
Promise.resolve()
  .then(() => testOffscreenSetup())
  .then(() => initializeAuthentication())
  .then(() => {
    console.log('[DIGGIN] Background: Authentication initialization completed');
    return restoreActiveSession();
  })
  .then(() => {
    console.log('[DIGGIN] Background: Session restoration completed');
  })
  .catch(error => {
    console.error('[DIGGIN] Background: Initialization failed:', error);
  }); 