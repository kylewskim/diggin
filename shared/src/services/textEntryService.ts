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
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase';
import { TextEntry } from '../models/types';

/**
 * Creates a new text entry.
 */
export const createTextEntry = async (
  sessionId: string, 
  content: string, 
  sourceUrl: string
): Promise<string> => {
  try {
    const entriesCollection = collection(db, 'textEntries');
    const sourceDomain = extractDomain(sourceUrl);
    
    const docRef = await addDoc(entriesCollection, {
      sessionId,
      content,
      sourceUrl,
      sourceDomain,
      capturedAt: serverTimestamp(),
      isBookmarked: false
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating text entry:", error);
    throw error;
  }
};

/**
 * Gets a text entry by ID.
 */
export const getTextEntry = async (entryId: string): Promise<TextEntry | null> => {
  try {
    const docRef = doc(db, 'textEntries', entryId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as TextEntry;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting text entry:", error);
    throw error;
  }
};

/**
 * Gets all text entries for a session with pagination.
 */
export const getSessionEntries = async (
  sessionId: string,
  pageSize: number = 20,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{
  entries: TextEntry[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}> => {
  try {
    // 🔍 DEBUG: 함수 시작 시 모든 파라미터 로깅
    console.log('🔍 [DEBUG] getSessionEntries called with:');
    console.log('  sessionId:', sessionId, 'type:', typeof sessionId);
    console.log('  pageSize:', pageSize, 'type:', typeof pageSize);
    console.log('  lastDoc:', !!lastDoc);
    
    // 🔍 DEBUG: sessionId 유효성 검사
    if (!sessionId) {
      console.error('❌ [ERROR] getSessionEntries: sessionId is falsy!', { sessionId, type: typeof sessionId });
      throw new Error(`getSessionEntries: Invalid sessionId: ${sessionId}`);
    }
    
    if (typeof sessionId !== 'string') {
      console.error('❌ [ERROR] getSessionEntries: sessionId is not a string!', { sessionId, type: typeof sessionId });
      throw new Error(`getSessionEntries: sessionId must be string, got ${typeof sessionId}`);
    }
    
    if (sessionId.trim() === '') {
      console.error('❌ [ERROR] getSessionEntries: sessionId is empty string!');
      throw new Error('getSessionEntries: sessionId cannot be empty');
    }
    
    console.log('✅ [DEBUG] getSessionEntries: sessionId validation passed');
    
    // 🎯 NEW: pageSize가 0이면 빈 배열 반환 (세션 초기화용)
    if (pageSize === 0) {
      console.log('🔄 [DEBUG] getSessionEntries: pageSize is 0, returning empty array for session initialization');
      return {
        entries: [],
        lastDoc: null,
        hasMore: false
      };
    }
    
    let entriesQuery = query(
      collection(db, 'textEntries'),
      where('sessionId', '==', sessionId),
      orderBy('capturedAt', 'desc'),
      limit(pageSize + 1) // Get one extra to check if there are more
    );
    
    if (lastDoc) {
      entriesQuery = query(entriesQuery, startAfter(lastDoc));
    }
    
    console.log('🔍 [DEBUG] getSessionEntries: About to execute Firebase query with sessionId:', sessionId);
    const querySnapshot = await getDocs(entriesQuery);
    console.log('✅ [DEBUG] getSessionEntries: Firebase query completed, docs count:', querySnapshot.docs.length);
    
    const entries: TextEntry[] = [];
    
    const hasMore = querySnapshot.docs.length > pageSize;
    const docsToProcess = hasMore ? querySnapshot.docs.slice(0, pageSize) : querySnapshot.docs;
    
    docsToProcess.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() } as TextEntry);
    });
    
    const newLastDoc = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : null;
    
    console.log('✅ [DEBUG] getSessionEntries: Returning', entries.length, 'entries');
    return {
      entries,
      lastDoc: newLastDoc,
      hasMore
    };
  } catch (error) {
    console.error("Error getting session entries:", error);
    console.error('🔍 [DEBUG] getSessionEntries error details:');
    console.error('  sessionId at error:', sessionId, 'type:', typeof sessionId);
    console.error('  pageSize at error:', pageSize);
    console.error('  Error stack:', error instanceof Error ? error.stack : 'No stack available');
    throw error;
  }
};

/**
 * Gets all bookmarked text entries for a user across all sessions.
 */
export const getBookmarkedEntries = async (
  sessionIds: string[],
  pageSize: number = 20,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{
  entries: TextEntry[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}> => {
  try {
    if (sessionIds.length === 0) {
      return { entries: [], lastDoc: null, hasMore: false };
    }
    
    let entriesQuery = query(
      collection(db, 'textEntries'),
      where('sessionId', 'in', sessionIds),
      where('isBookmarked', '==', true),
      orderBy('capturedAt', 'desc'),
      limit(pageSize + 1)
    );
    
    if (lastDoc) {
      entriesQuery = query(entriesQuery, startAfter(lastDoc));
    }
    
    const querySnapshot = await getDocs(entriesQuery);
    const entries: TextEntry[] = [];
    
    const hasMore = querySnapshot.docs.length > pageSize;
    const docsToProcess = hasMore ? querySnapshot.docs.slice(0, pageSize) : querySnapshot.docs;
    
    docsToProcess.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() } as TextEntry);
    });
    
    const newLastDoc = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : null;
    
    return {
      entries,
      lastDoc: newLastDoc,
      hasMore
    };
  } catch (error) {
    console.error("Error getting bookmarked entries:", error);
    throw error;
  }
};

/**
 * Toggle bookmark status of a text entry.
 */
export const toggleBookmark = async (entryId: string, isBookmarked: boolean): Promise<void> => {
  try {
    const docRef = doc(db, 'textEntries', entryId);
    await updateDoc(docRef, { isBookmarked });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    throw error;
  }
};

/**
 * Update tags for a text entry.
 */
export const updateTags = async (entryId: string, tags: string[]): Promise<void> => {
  try {
    const docRef = doc(db, 'textEntries', entryId);
    await updateDoc(docRef, { tags });
  } catch (error) {
    console.error("Error updating tags:", error);
    throw error;
  }
};

/**
 * Utility function to extract domain from URL.
 */
const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (error) {
    console.error("Error extracting domain:", error);
    return url; // Return the original URL if parsing fails
  }
};

/**
 * Gets the count of text entries for a session (without fetching the actual data).
 */
export const getSessionEntriesCount = async (sessionId: string): Promise<number> => {
  try {
    console.log('🔍 [DEBUG] getSessionEntriesCount called with sessionId:', sessionId);
    
    // 🔍 DEBUG: sessionId 유효성 검사
    if (!sessionId) {
      console.error('❌ [ERROR] getSessionEntriesCount: sessionId is falsy!', { sessionId, type: typeof sessionId });
      throw new Error(`getSessionEntriesCount: Invalid sessionId: ${sessionId}`);
    }
    
    if (typeof sessionId !== 'string') {
      console.error('❌ [ERROR] getSessionEntriesCount: sessionId is not a string!', { sessionId, type: typeof sessionId });
      throw new Error(`getSessionEntriesCount: sessionId must be string, got ${typeof sessionId}`);
    }
    
    if (sessionId.trim() === '') {
      console.error('❌ [ERROR] getSessionEntriesCount: sessionId is empty string!');
      throw new Error('getSessionEntriesCount: sessionId cannot be empty');
    }
    
    const entriesQuery = query(
      collection(db, 'textEntries'),
      where('sessionId', '==', sessionId)
    );
    
    console.log('🔍 [DEBUG] getSessionEntriesCount: About to execute Firebase count query');
    const querySnapshot = await getDocs(entriesQuery);
    const count = querySnapshot.docs.length;
    
    console.log(`✅ [DEBUG] getSessionEntriesCount: Found ${count} entries for session ${sessionId}`);
    return count;
  } catch (error) {
    console.error("Error getting session entries count:", error);
    console.error('🔍 [DEBUG] getSessionEntriesCount error details:');
    console.error('  sessionId at error:', sessionId, 'type:', typeof sessionId);
    throw error;
  }
}; 
 
 
 
 
 