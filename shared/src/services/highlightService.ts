import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Highlight } from '../models/types';

const COLLECTION_NAME = 'highlights';

/**
 * Get user's highlights for a specific hole
 */
export async function getHighlights(userId: string, holeId: string): Promise<string[]> {
  try {
    const highlightsQuery = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      where('holeId', '==', holeId)
    );
    
    const querySnapshot = await getDocs(highlightsQuery);
    
    if (querySnapshot.empty) {
      return [];
    }
    
    // Get the first (and should be only) highlight document for this user/hole combination
    const highlightDoc = querySnapshot.docs[0];
    const highlight = highlightDoc.data() as Highlight;
    
    return highlight.textEntryIds || [];
  } catch (error) {
    console.error('Error getting highlights:', error);
    throw new Error('Failed to get highlights');
  }
}

/**
 * Save user's highlights for a specific hole
 */
export async function saveHighlights(
  userId: string, 
  holeId: string, 
  textEntryIds: string[]
): Promise<void> {
  try {
    // Check if highlights document already exists
    const highlightsQuery = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      where('holeId', '==', holeId)
    );
    
    const querySnapshot = await getDocs(highlightsQuery);
    
    if (querySnapshot.empty) {
      // Create new highlights document
      const newHighlightRef = doc(collection(db, COLLECTION_NAME));
      const newHighlight: Omit<Highlight, 'id'> = {
        userId,
        holeId,
        textEntryIds,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };
      
      await setDoc(newHighlightRef, newHighlight);
    } else {
      // Update existing highlights document
      const existingDoc = querySnapshot.docs[0];
      await updateDoc(existingDoc.ref, {
        textEntryIds,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error saving highlights:', error);
    throw new Error('Failed to save highlights');
  }
}

/**
 * Add a text entry to highlights
 */
export async function addToHighlights(
  userId: string, 
  holeId: string, 
  textEntryId: string
): Promise<void> {
  try {
    const currentHighlights = await getHighlights(userId, holeId);
    
    if (!currentHighlights.includes(textEntryId)) {
      const updatedHighlights = [...currentHighlights, textEntryId];
      await saveHighlights(userId, holeId, updatedHighlights);
    }
  } catch (error) {
    console.error('Error adding to highlights:', error);
    throw new Error('Failed to add to highlights');
  }
}

/**
 * Remove a text entry from highlights
 */
export async function removeFromHighlights(
  userId: string, 
  holeId: string, 
  textEntryId: string
): Promise<void> {
  try {
    const currentHighlights = await getHighlights(userId, holeId);
    const updatedHighlights = currentHighlights.filter(id => id !== textEntryId);
    await saveHighlights(userId, holeId, updatedHighlights);
  } catch (error) {
    console.error('Error removing from highlights:', error);
    throw new Error('Failed to remove from highlights');
  }
}

/**
 * Clear all highlights for a specific hole
 */
export async function clearHighlights(userId: string, holeId: string): Promise<void> {
  try {
    await saveHighlights(userId, holeId, []);
  } catch (error) {
    console.error('Error clearing highlights:', error);
    throw new Error('Failed to clear highlights');
  }
} 