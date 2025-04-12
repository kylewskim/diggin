import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLogin: Timestamp;
}

export interface Hole {
  id: string;
  userId: string;
  name: string;
  icon: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Session {
  id: string;
  holeId: string;
  name: string;
  startTime: Timestamp;
  endTime: Timestamp | null;
  isActive: boolean;
}

export interface TextEntry {
  id: string;
  sessionId: string;
  content: string;
  sourceUrl: string;
  sourceDomain: string;
  capturedAt: Timestamp;
  isBookmarked: boolean;
  tags?: string[];
} 