import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  serverTimestamp,
  Timestamp, 
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { Hole } from '../models/types';

/**
 * Creates a new hole.
 */
export const createHole = async (userId: string, name: string, icon: string): Promise<string> => {
  try {
    const holesCollection = collection(db, 'holes');
    const now = serverTimestamp();
    
    const docRef = await addDoc(holesCollection, {
      userId,
      name,
      icon,
      createdAt: now,
      updatedAt: now
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating hole:", error);
    throw error;
  }
};

/**
 * Gets a hole by ID.
 */
export const getHole = async (holeId: string): Promise<Hole | null> => {
  try {
    const docRef = doc(db, 'holes', holeId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Hole;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting hole:", error);
    throw error;
  }
};

/**
 * Gets all holes for a user.
 */
export const getUserHoles = async (userId: string): Promise<Hole[]> => {
  try {
    const holesQuery = query(
      collection(db, 'holes'), 
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(holesQuery);
    const holes: Hole[] = [];
    
    querySnapshot.forEach((doc) => {
      holes.push({ id: doc.id, ...doc.data() } as Hole);
    });
    
    return holes;
  } catch (error) {
    console.error("Error getting user holes:", error);
    throw error;
  }
};

/**
 * Updates a hole.
 */
export const updateHole = async (
  holeId: string, 
  updates: { name?: string; icon?: string }
): Promise<void> => {
  try {
    const docRef = doc(db, 'holes', holeId);
    
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating hole:", error);
    throw error;
  }
};

/**
 * Deletes a hole.
 */
export const deleteHole = async (holeId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'holes', holeId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting hole:", error);
    throw error;
  }
}; 
 
 
 
 