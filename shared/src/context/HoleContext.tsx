import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Hole, Session, TextEntry } from '../models/types';
import { 
  getUserHoles, 
  createHole, 
  updateHole, 
  deleteHole 
} from '../services/holeService';
import { 
  getHoleSessions, 
  createSession, 
  getActiveSession, 
  endSession 
} from '../services/sessionService';
import {
  getSessionEntries,
  createTextEntry,
  toggleBookmark
} from '../services/textEntryService';

interface HoleContextType {
  holes: Hole[];
  selectedHole: Hole | null;
  sessions: Session[];
  activeSession: Session | null;
  currentEntries: TextEntry[];
  isLoading: boolean;
  error: string | null;
  
  // Hole actions
  selectHole: (hole: Hole | null) => void;
  addHole: (name: string, icon: string) => Promise<string>;
  updateSelectedHole: (updates: { name?: string; icon?: string }) => Promise<void>;
  removeHole: (holeId: string) => Promise<void>;
  
  // Session actions
  startNewSession: (name: string) => Promise<string>;
  endCurrentSession: () => Promise<void>;
  
  // Text entry actions
  addTextEntry: (content: string, sourceUrl: string) => Promise<string>;
  toggleEntryBookmark: (entryId: string, isBookmarked: boolean) => Promise<void>;
  
  // Loading state
  refreshData: () => Promise<void>;
}

const HoleContext = createContext<HoleContextType>({
  holes: [],
  selectedHole: null,
  sessions: [],
  activeSession: null,
  currentEntries: [],
  isLoading: true,
  error: null,
  
  selectHole: () => {},
  addHole: async () => '',
  updateSelectedHole: async () => {},
  removeHole: async () => {},
  
  startNewSession: async () => '',
  endCurrentSession: async () => {},
  
  addTextEntry: async () => '',
  toggleEntryBookmark: async () => {},
  
  refreshData: async () => {},
});

export const useHole = () => useContext(HoleContext);

export const HoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  const [holes, setHoles] = useState<Hole[]>([]);
  const [selectedHole, setSelectedHole] = useState<Hole | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [currentEntries, setCurrentEntries] = useState<TextEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch user's holes whenever the user changes
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      refreshData();
    } else {
      // Reset state when user is not authenticated
      setHoles([]);
      setSelectedHole(null);
      setSessions([]);
      setActiveSession(null);
      setCurrentEntries([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, currentUser]);
  
  // Fetch sessions and active session when selected hole changes
  useEffect(() => {
    if (selectedHole) {
      fetchHoleSessions(selectedHole.id);
    } else {
      setSessions([]);
      setActiveSession(null);
      setCurrentEntries([]);
    }
  }, [selectedHole]);
  
  // Fetch entries when active session changes
  useEffect(() => {
    if (activeSession) {
      fetchSessionEntries(activeSession.id);
    } else {
      setCurrentEntries([]);
    }
  }, [activeSession]);
  
  const refreshData = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const userHoles = await getUserHoles(currentUser.uid);
      setHoles(userHoles);
      
      // If there's a selected hole, refresh its data
      if (selectedHole) {
        const updatedHole = userHoles.find(h => h.id === selectedHole.id);
        if (updatedHole) {
          setSelectedHole(updatedHole);
          await fetchHoleSessions(updatedHole.id);
        } else {
          // Selected hole no longer exists
          setSelectedHole(null);
        }
      }
    } catch (err) {
      setError('Failed to load data');
      console.error('Error refreshing data:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchHoleSessions = async (holeId: string) => {
    try {
      const holeSessions = await getHoleSessions(holeId);
      setSessions(holeSessions);
      
      // Check for active session
      const active = await getActiveSession(holeId);
      setActiveSession(active);
      
      if (active) {
        await fetchSessionEntries(active.id);
      }
    } catch (err) {
      setError('Failed to load sessions');
      console.error('Error fetching sessions:', err);
    }
  };
  
  const fetchSessionEntries = async (sessionId: string) => {
    try {
      const { entries } = await getSessionEntries(sessionId);
      setCurrentEntries(entries);
    } catch (err) {
      setError('Failed to load entries');
      console.error('Error fetching entries:', err);
    }
  };
  
  // Hole actions
  const selectHole = (hole: Hole | null) => {
    setSelectedHole(hole);
  };
  
  const addHole = async (name: string, icon: string): Promise<string> => {
    if (!currentUser) throw new Error('User not authenticated');
    
    try {
      const holeId = await createHole(currentUser.uid, name, icon);
      await refreshData();
      return holeId;
    } catch (err) {
      setError('Failed to create hole');
      console.error('Error creating hole:', err);
      throw err;
    }
  };
  
  const updateSelectedHole = async (updates: { name?: string; icon?: string }): Promise<void> => {
    if (!selectedHole) throw new Error('No hole selected');
    
    try {
      await updateHole(selectedHole.id, updates);
      await refreshData();
    } catch (err) {
      setError('Failed to update hole');
      console.error('Error updating hole:', err);
      throw err;
    }
  };
  
  const removeHole = async (holeId: string): Promise<void> => {
    try {
      await deleteHole(holeId);
      
      // If the deleted hole was selected, clear selection
      if (selectedHole && selectedHole.id === holeId) {
        setSelectedHole(null);
      }
      
      await refreshData();
    } catch (err) {
      setError('Failed to delete hole');
      console.error('Error deleting hole:', err);
      throw err;
    }
  };
  
  // Session actions
  const startNewSession = async (name: string): Promise<string> => {
    if (!selectedHole) throw new Error('No hole selected');
    
    try {
      const sessionId = await createSession(selectedHole.id, name);
      await fetchHoleSessions(selectedHole.id);
      return sessionId;
    } catch (err) {
      setError('Failed to start session');
      console.error('Error starting session:', err);
      throw err;
    }
  };
  
  const endCurrentSession = async (): Promise<void> => {
    if (!activeSession) throw new Error('No active session');
    
    try {
      await endSession(activeSession.id);
      await fetchHoleSessions(selectedHole!.id);
    } catch (err) {
      setError('Failed to end session');
      console.error('Error ending session:', err);
      throw err;
    }
  };
  
  // Text entry actions
  const addTextEntry = async (content: string, sourceUrl: string): Promise<string> => {
    if (!activeSession) throw new Error('No active session');
    
    try {
      const entryId = await createTextEntry(activeSession.id, content, sourceUrl);
      await fetchSessionEntries(activeSession.id);
      return entryId;
    } catch (err) {
      setError('Failed to add text entry');
      console.error('Error adding text entry:', err);
      throw err;
    }
  };
  
  const toggleEntryBookmark = async (entryId: string, isBookmarked: boolean): Promise<void> => {
    try {
      await toggleBookmark(entryId, isBookmarked);
      
      // Update the entry in the local state
      setCurrentEntries(entries => 
        entries.map(entry => 
          entry.id === entryId ? { ...entry, isBookmarked } : entry
        )
      );
    } catch (err) {
      setError('Failed to toggle bookmark');
      console.error('Error toggling bookmark:', err);
      throw err;
    }
  };
  
  const value = {
    holes,
    selectedHole,
    sessions,
    activeSession,
    currentEntries,
    isLoading,
    error,
    
    selectHole,
    addHole,
    updateSelectedHole,
    removeHole,
    
    startNewSession,
    endCurrentSession,
    
    addTextEntry,
    toggleEntryBookmark,
    
    refreshData,
  };
  
  return <HoleContext.Provider value={value}>{children}</HoleContext.Provider>;
}; 
 
 
 
 
 