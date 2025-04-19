import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  serverTimestamp, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Session } from '../models/types';

/**
 * Creates a new session.
 */
export const createSession = async (holeId: string, name: string): Promise<string> => {
  try {
    const sessionsCollection = collection(db, 'sessions');
    const now = serverTimestamp();
    
    const docRef = await addDoc(sessionsCollection, {
      holeId,
      name,
      startTime: now,
      endTime: null,
      isActive: true,
      totalDuration: 0,
      updatedAt: now
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

/**
 * Gets a session by ID.
 */
export const getSession = async (sessionId: string): Promise<Session | null> => {
  try {
    const docRef = doc(db, 'sessions', sessionId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Session;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

/**
 * Gets all sessions for a hole.
 */
export const getHoleSessions = async (holeId: string): Promise<Session[]> => {
  try {
    const sessionsQuery = query(
      collection(db, 'sessions'), 
      where('holeId', '==', holeId),
      orderBy('startTime', 'desc')
    );
    
    const querySnapshot = await getDocs(sessionsQuery);
    const sessions: Session[] = [];
    
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() } as Session);
    });
    
    return sessions;
  } catch (error) {
    console.error("Error getting hole sessions:", error);
    throw error;
  }
};

/**
 * Gets the active session for a hole, if any.
 */
export const getActiveSession = async (holeId: string): Promise<Session | null> => {
  try {
    const sessionsQuery = query(
      collection(db, 'sessions'),
      where('holeId', '==', holeId),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(sessionsQuery);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    // Should be only one active session per hole
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Session;
  } catch (error) {
    console.error("Error getting active session:", error);
    throw error;
  }
};

/**
 * Updates a session.
 */
export const updateSession = async (
  sessionId: string, 
  updates: { name?: string; isActive?: boolean }
): Promise<void> => {
  try {
    const docRef = doc(db, 'sessions', sessionId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

/**
 * Ends a session.
 */
export const endSession = async (sessionId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'sessions', sessionId);
    await updateDoc(docRef, {
      endTime: serverTimestamp(),
      isActive: false
    });
  } catch (error) {
    console.error("Error ending session:", error);
    throw error;
  }
};

/**
 * Updates session duration (total time spent).
 */
export const updateSessionDuration = async (sessionId: string, durationInSeconds: number): Promise<void> => {
  try {
    const docRef = doc(db, 'sessions', sessionId);
    await updateDoc(docRef, {
      totalDuration: durationInSeconds,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating session duration:", error);
    throw error;
  }
};

/**
 * Updates session active status and sets the current endTime.
 */
export const updateSessionActiveStatus = async (sessionId: string, isActive: boolean): Promise<void> => {
  try {
    const docRef = doc(db, 'sessions', sessionId);
    
    if (isActive) {
      // 세션 재개
      await updateDoc(docRef, {
        isActive: true,
        updatedAt: serverTimestamp()
      });
    } else {
      // 세션 일시 중지
      await updateDoc(docRef, {
        isActive: false,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error("Error updating session active status:", error);
    throw error;
  }
}; 