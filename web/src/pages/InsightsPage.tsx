import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getHole } from '@shared/services/holeService';
import { getHoleSessions } from '@shared/services/sessionService';
import { getSessionEntries } from '@shared/services/textEntryService';
import { Hole, Session, TextEntry } from '@shared/models/types';
import { colors } from '@shared/constants/colors';
import Header from '../components/Header';

export default function InsightsPage() {
  const { holeId } = useParams<{ holeId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [hole, setHole] = useState<Hole | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>('all');
  const [entries, setEntries] = useState<TextEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [hidePageInfo, setHidePageInfo] = useState(false);
  
  // Load hole data
  useEffect(() => {
    if (!user || !holeId) return;
    
    const loadHoleData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load hole details
        const holeData = await getHole(holeId);
        if (!holeData) {
          setError('Hole not found');
          return;
        }
        setHole(holeData);
        
        // Load sessions for this hole
        const holeSessions = await getHoleSessions(holeId);
        setSessions(holeSessions);
        
        // Load entries for all sessions by default
        await loadEntriesForSessions(holeSessions.map(s => s.id));
      } catch (err) {
        console.error('Failed to load hole data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadHoleData();
  }, [user, holeId]);
  
  // Load entries for selected session(s)
  const loadEntriesForSessions = async (sessionIds: string[]) => {
    if (sessionIds.length === 0) {
      setEntries([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // For simplicity, load entries for all sessions without pagination
      // In a real app, you'd implement pagination and optimize this
      let allEntries: TextEntry[] = [];
      
      for (const sessionId of sessionIds) {
        const { entries } = await getSessionEntries(sessionId, 100);
        allEntries = [...allEntries, ...entries];
      }
      
      // Sort by captured time, newest first
      allEntries.sort((a, b) => {
        const dateA = a.capturedAt?.toDate?.() || new Date(0);
        const dateB = b.capturedAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      
      setEntries(allEntries);
    } catch (err) {
      console.error('Failed to load entries:', err);
      setError('Failed to load insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle session selection
  const handleSessionChange = (sessionId: string) => {
    setSelectedSession(sessionId);
    
    if (sessionId === 'all') {
      loadEntriesForSessions(sessions.map(s => s.id));
    } else {
      loadEntriesForSessions([sessionId]);
    }
  };
  
  // Toggle entry selection for highlights
  const toggleEntrySelection = (entryId: string) => {
    if (selectedEntries.includes(entryId)) {
      setSelectedEntries(selectedEntries.filter(id => id !== entryId));
    } else {
      setSelectedEntries([...selectedEntries, entryId]);
    }
  };
  
  // Format date helper
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate?.() || new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Group entries by source URL
  const entriesBySource = entries.reduce((acc, entry) => {
    const key = `${entry.sourceUrl}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(entry);
    return acc;
  }, {} as Record<string, TextEntry[]>);
  
  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain;
    } catch {
      return url;
    }
  };

  if (loading && !hole) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Loading..." />
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-gray-950 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 text-lg">Loading insights...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Error" />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <h3 className="mt-5 text-lg font-medium text-gray-900">Error Loading Insights</h3>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <button 
              onClick={() => navigate('/holes')}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-950 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back to Holes
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={hole?.name || 'Insights'} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Top section with hole info */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{hole?.name}</h2>
                  <p className="text-sm text-gray-500">
                    {entries.length} insights · 
                    {sessions.length > 0 
                      ? ` Last updated: ${formatDate(sessions[0].startTime)}` 
                      : ' No sessions'}
                  </p>
                </div>
              </div>
              
              {/* Session filter dropdown */}
              <div className="flex items-center">
                <label htmlFor="session-select" className="mr-2 text-sm text-gray-700">
                  Session:
                </label>
                <select
                  id="session-select"
                  value={selectedSession}
                  onChange={(e) => handleSessionChange(e.target.value)}
                  className="max-w-xs px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Sessions</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.name || formatDate(session.startTime)}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => setHidePageInfo(!hidePageInfo)}
                  className="ml-4 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {hidePageInfo ? 'Show URLs' : 'Hide URLs'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="flex flex-col lg:flex-row">
            {/* Insights list */}
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
              {loading && (
                <div className="flex justify-center items-center p-8">
                  <svg className="animate-spin h-6 w-6 text-gray-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              
              {!loading && entries.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M5 8h14M5 12h14M5 16h14M5 20h14"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No insights found</h3>
                  <p className="mt-1 text-sm text-gray-500">Start a new session to gather insights for this hole.</p>
                </div>
              )}
              
              {!loading && entries.length > 0 && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      {!hidePageInfo && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Captured At
                      </th>
                      <th scope="col" className="relative px-6 py-3 w-12">
                        <span className="sr-only">Select</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 whitespace-pre-wrap">{entry.content}</p>
                        </td>
                        {!hidePageInfo && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-950 flex items-center">
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                              </svg>
                              <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
                                {getDomain(entry.sourceUrl)}
                              </a>
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs text-gray-500">{formatDate(entry.capturedAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <input
                            type="checkbox"
                            checked={selectedEntries.includes(entry.id)}
                            onChange={() => toggleEntrySelection(entry.id)}
                            className="h-4 w-4 text-gray-950 focus:ring-gray-500 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {/* Highlights panel */}
            {selectedEntries.length > 0 && (
              <div className="w-64 lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-gray-900">Highlights</h3>
                  <button
                    onClick={() => setSelectedEntries([])}
                    className="text-xs text-gray-600 hover:text-gray-900"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {entries
                    .filter(entry => selectedEntries.includes(entry.id))
                    .map(entry => (
                      <div key={entry.id} className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm text-gray-800">{entry.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {!hidePageInfo && getDomain(entry.sourceUrl)}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 