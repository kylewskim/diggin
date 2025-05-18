import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'core';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
