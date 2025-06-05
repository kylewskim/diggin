import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getHole } from '@shared/services/holeService';
import { getHoleSessions } from '@shared/services/sessionService';
import { getSessionEntries, createTextEntry } from '@shared/services/textEntryService';
import { getHighlights, addToHighlights, removeFromHighlights, clearHighlights } from '@shared/services/highlightService';
import { Hole, Session, TextEntry } from '@shared/models/types';
import { Button } from '../components/Button';
import { SingleLineTextField } from '@shared/components/ui/textField/singleLine';
import * as Icons from '@shared/icons';

// Chrome extension API type declarations
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        sendMessage: (message: any, callback?: (response: any) => void) => void;
        lastError?: { message: string };
      };
    };
  }
}

export default function InsightsPage() {
  const { holeId } = useParams<{ holeId: string }>();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  
  const [hole, setHole] = useState<Hole | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>('all');
  const [entries, setEntries] = useState<TextEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [hidePageInfo, setHidePageInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHighlights, setShowHighlights] = useState(true);
  
  // Load hole data on mount
  useEffect(() => {
    const loadHoleData = async () => {
      if (!user || !holeId) return;
      
      try {
        setLoading(true);
        
        // Load hole information
        const holeData = await getHole(holeId);
        setHole(holeData);
        
        // Load sessions
        const sessionsData = await getHoleSessions(holeId);
        setSessions(sessionsData);
        
        // Load entries for all sessions by default
        await loadEntriesForSessions(sessionsData.map(s => s.id));
        
        // Load highlights
        const savedHighlights = await getHighlights(user.uid, holeId);
        setSelectedEntries(savedHighlights);
      } catch (err) {
        console.error('Failed to load hole data:', err);
        setError('Failed to load data');
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

  // Process pending items from Chrome storage and send to Firebase
  const processPendingItems = useCallback(async () => {
    console.log('🔄 [DEBUG] Starting to process pending items...');
    
    // Check if Chrome extension API is available
    if (!window.chrome?.runtime?.sendMessage) {
      console.log('🚫 [DEBUG] Chrome extension API not available');
      return;
    }
    console.log('✅ [DEBUG] Chrome extension API is available');

    try {
      console.log('📤 [DEBUG] Sending GET_PENDING_ITEMS message to background');
      const response = await new Promise<any>((resolve) => {
        window.chrome!.runtime!.sendMessage(
          { action: 'GET_PENDING_ITEMS' },
          (response) => {
            console.log('📥 [DEBUG] Received response from background:', response);
            resolve(response);
          }
        );
      });

      if (!response?.success) {
        console.log('❌ [DEBUG] Response not successful:', response);
        return;
      }

      if (!response.pendingItems) {
        console.log('📋 [DEBUG] No pendingItems in response');
        return;
      }

      if (!response.pendingItems.length) {
        console.log('📋 [DEBUG] pendingItems array is empty');
        return;
      }

      console.log(`📋 [DEBUG] Found ${response.pendingItems.length} pending items to process`);
      console.log('📋 [DEBUG] Pending items:', response.pendingItems);
      
      let successCount = 0;
      let failCount = 0;

      // Determine which session to use
      const targetSessionId = selectedSession !== 'all' ? selectedSession : (sessions[0]?.id || 'default');
      console.log(`🎯 [DEBUG] Target session ID: ${targetSessionId}`);

      // Process each pending item
      for (const item of response.pendingItems) {
        try {
          console.log(`⚙️ [DEBUG] Processing item: ${item.content.substring(0, 50)}...`);
          console.log(`⚙️ [DEBUG] Item URL: ${item.url || 'No URL'}`);
          
          await createTextEntry(
            targetSessionId,
            item.content,
            item.url || ''
          );
          
          successCount++;
          console.log(`✅ [DEBUG] Successfully processed item: ${item.content.substring(0, 30)}...`);
        } catch (error) {
          failCount++;
          console.error(`❌ [DEBUG] Failed to process item: ${item.content.substring(0, 30)}...`, error);
        }
      }

      console.log(`📊 [DEBUG] Processing complete: ${successCount} success, ${failCount} failed`);

      // Clear pending items if all were processed successfully
      if (failCount === 0) {
        console.log('🧹 [DEBUG] Clearing pending items from storage...');
        await new Promise<void>((resolve) => {
          window.chrome!.runtime!.sendMessage(
            { action: 'CLEAR_PENDING_ITEMS' },
            (clearResponse: any) => {
              console.log('🧹 [DEBUG] Clear response:', clearResponse);
              if (clearResponse?.success) {
                console.log('✅ [DEBUG] Pending items cleared from storage');
              } else {
                console.error('❌ [DEBUG] Failed to clear pending items:', clearResponse?.error);
              }
              resolve();
            }
          );
        });

        // Reload entries to show newly added items
        if (sessions.length > 0) {
          console.log('🔄 [DEBUG] Reloading entries...');
          if (selectedSession === 'all') {
            await loadEntriesForSessions(sessions.map(s => s.id));
          } else {
            await loadEntriesForSessions([selectedSession]);
          }
          console.log('✅ [DEBUG] Entries reloaded');
        }
      }
    } catch (error) {
      console.error('💥 [DEBUG] Error processing pending items:', error);
    }
  }, [user, selectedSession, sessions, loadEntriesForSessions]);

  // Auto-process pending items when component mounts and data is loaded
  useEffect(() => {
    console.log('🔍 [DEBUG] useEffect for processPendingItems triggered');
    console.log('🔍 [DEBUG] Conditions - user:', !!user, 'sessions.length:', sessions.length, 'loading:', loading);
    
    if (user && sessions.length > 0 && !loading) {
      console.log('✅ [DEBUG] All conditions met, calling processPendingItems');
      processPendingItems();
    } else {
      console.log('❌ [DEBUG] Conditions not met for processPendingItems');
    }
  }, [user, sessions, loading, processPendingItems]);
  
  // Handle session selection
  const handleSessionChange = (sessionId: string) => {
    setSelectedSession(sessionId);
    
    if (sessionId === 'all') {
      loadEntriesForSessions(sessions.map(s => s.id));
    } else {
      loadEntriesForSessions([sessionId]);
    }
  };
  
  // Toggle entry selection for highlights with database persistence
  const toggleEntrySelection = async (entryId: string) => {
    if (!user || !holeId) return;
    
    try {
      if (selectedEntries.includes(entryId)) {
        // Remove from highlights
        await removeFromHighlights(user.uid, holeId, entryId);
        setSelectedEntries(selectedEntries.filter(id => id !== entryId));
      } else {
        // Add to highlights
        await addToHighlights(user.uid, holeId, entryId);
        setSelectedEntries([...selectedEntries, entryId]);
      }
    } catch (error) {
      console.error('Failed to update highlights:', error);
      // Show error to user (you could add a toast notification here)
    }
  };
  
  // Clear all highlights with database persistence
  const handleClearHighlights = async () => {
    if (!user || !holeId) return;
    
    try {
      await clearHighlights(user.uid, holeId);
      setSelectedEntries([]);
    } catch (error) {
      console.error('Failed to clear highlights:', error);
      // Show error to user (you could add a toast notification here)
    }
  };
  
  // Format date helper
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date).replace(/\//g, '.');
  };

  // Format session date for display
  const formatSessionDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date).replace(/\//g, '.');
  };

  // Calculate total session time
  const getTotalSessionTime = () => {
    const totalSeconds = sessions.reduce((total, session) => {
      return total + (session.totalDuration || 0);
    }, 0);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  // Group entries by source URL for display
  const groupEntriesBySource = () => {
    const filtered = entries.filter(entry => 
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.sourceUrl && getDomain(entry.sourceUrl).toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const groups: { [key: string]: TextEntry[] } = {};
    filtered.forEach(entry => {
      const key = entry.sourceUrl || 'Unknown Source';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(entry);
    });
    return groups;
  };

  if (loading && !hole) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <div className="text-red-500 text-lg font-medium">{error}</div>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/holes')}
              className="mt-4"
            >
              Back to Holes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const groupedEntries = groupEntriesBySource();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 bg-white border-b border-gray-200 flex flex-col justify-start items-center gap-2.5">
        <div className="w-full py-3 inline-flex justify-between items-center">
          {/* Left: Back button */}
          <div className="flex justify-start items-center gap-2.5">
            <div className="rounded flex justify-start items-center gap-2">
              <div 
                className="w-9 h-9 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => navigate('/holes')}
              >
                <div className="w-5 h-5 relative overflow-hidden">
                  <Icons.BackIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Center: Hole info */}
          <div className="hidden md:flex justify-start items-center gap-4 lg:gap-6">
            <div className="flex justify-start items-center gap-4">
              <div className="w-6 h-6 relative overflow-hidden">
                <Icons.LightbulbIcon />
              </div>
              <div className="flex justify-start items-center gap-2">
                <div className="text-center justify-center text-text-primary-light text-title-md leading-normal truncate max-w-32 lg:max-w-52">
                  {hole?.name}
                </div>
                <div className="justify-center text-text-secondary-light text-body-lg-rg leading-snug">
                  {entries.length}
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-start items-center gap-2">
              <div className="w-4 h-4 relative">
                <Icons.HourglassIcon />
              </div>
              <div className="justify-center text-text-tertiary-light text-body-lg-rg leading-snug">
                {getTotalSessionTime()}
              </div>
            </div>
            <div className="hidden lg:flex justify-start items-center gap-2">
              <div className="w-4 h-4 relative">
                <Icons.TimeIcon />
              </div>
              <div className="justify-center text-text-tertiary-light text-body-lg-rg leading-snug">
                {hole?.updatedAt ? formatSessionDate(hole.updatedAt) : ''}
              </div>
            </div>
          </div>

          {/* Mobile: Hole name only */}
          <div className="md:hidden flex-1 text-center">
            <div className="text-text-primary-light text-title-md leading-normal truncate">
              {hole?.name}
            </div>
          </div>

          {/* Right: Log out */}
          <div className="flex justify-start items-center gap-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                try {
                  logOut();
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
              className="text-sm sm:text-base"
            >
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-ful h-full max-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-24 flex flex-col justify-start items-center gap-2.5 overflow-hidden">
        <div className="w-full flex-1 max-w-[1520px] py-6 sm:py-10 flex flex-col xl:flex-row justify-center items-start gap-6 xl:gap-10 transition-all duration-300 ease-in-out">
          {/* Left: Insights List */}
          <div className={`flex-1 w-full h-[calc(100vh-160px)] flex flex-col justify-start items-start gap-5 overflow-hidden transition-all duration-300 ease-in-out ${
            showHighlights ? 'max-w-[1280px]' : 'max-w-none'
          }`}>
            {/* Top Controls */}
            <div className="w-full h-auto flex flex-col sm:flex-row sm:h-10 justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex justify-start items-center gap-2">
                <div className="justify-center text-text-primary-light text-title-md leading-normal">Insights in</div>
                <div className="h-9 px-3 rounded-lg flex justify-start items-center gap-3">
                  <div className="justify-center text-text-primary-light text-title-md leading-normal">
                    {selectedSession === 'all' ? 'All' : 
                     sessions.find(s => s.id === selectedSession)?.name || 'Session'}
                  </div>
                  <div className="w-2 h-2 relative overflow-hidden">
                    <Icons.ChevronRightIcon />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 w-full sm:w-auto">
                {/* Search and filter */}
                <div className="flex justify-end items-center gap-2 w-full sm:max-w-96">
                  <div className="flex-1 sm:max-w-80 flex justify-end items-center gap-2">
                    <SingleLineTextField
                      size="md"
                      placeholder="Search insights..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      isDisabled={false}
                      error={false}
                      className="flex-1"
                    />
                    {/* <div className="rounded flex justify-start items-center gap-2">
                      <div className="w-9 h-9 flex justify-center items-center gap-2.5">
                        <div className="w-5 h-5 relative overflow-hidden">
                          <Icons.SearchIcon />
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="rounded flex justify-start items-center gap-2">
                    <div className="w-9 h-9 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-gray-100 rounded">
                      <div className="w-5 h-5 relative">
                        <Icons.FilterIcon />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hide page info checkbox */}
                <div className="p-0.5 flex justify-start items-center gap-2">
                  <div className="w-4 h-4 flex justify-center items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={hidePageInfo}
                      onChange={(e) => setHidePageInfo(e.target.checked)}
                      className="w-4 h-4 rounded-sm border border-gray-300"
                    />
                  </div>
                  <div className="justify-start w-[90px] text-text-primary-light text-body-md-rg leading-none">Hide page info</div>
                </div>
              </div>
            </div>

            {/* Insights Content */}
            <div className="w-full flex-1 h-full flex flex-col justify-start items-start gap-6 sm:gap-10 overflow-y-auto pr-3.5">
              {loading && (
                <div className="w-full flex justify-center items-center py-20">
                  <div className="text-gray-700">Loading insights...</div>
                </div>
              )}
              
              {!loading && entries.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center py-20">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-full mb-5" />
                  <div className="text-center text-text-secondary-light text-title-md">No insights yet</div>
                </div>
              )}

              {!loading && Object.keys(groupedEntries).map((sourceUrl, index) => (
                <div key={sourceUrl} className="w-full flex flex-col justify-start items-start gap-5">
                  {/* Page Info Section */}
                  {!hidePageInfo && (
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="flex justify-start items-center gap-3 sm:gap-4">
                        <img 
                          className="w-16 h-8 sm:w-20 sm:h-10 rounded border border-gray-200 flex-shrink-0 object-cover" 
                          src={`https://api.urlbox.io/v1/qyfxZOkLVtHTYZlw/png?url=${encodeURIComponent(sourceUrl)}&width=320&height=160&delay=1000`}
                          alt="Site thumbnail"
                          onError={(e) => {
                            // 썸네일 실패 시 favicon으로 fallback
                            (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${getDomain(sourceUrl)}&sz=64`;
                          }}
                        />
                        <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start gap-0.5">
                          <div className="justify-center text-text-primary-light text-body-lg-rg leading-snug truncate w-full">
                            {getDomain(sourceUrl)}
                          </div>
                          <div className="inline-flex justify-start items-start gap-1 text-text-tertiary-light text-body-sm-rg">
                            <div className="leading-none">
                              {groupedEntries[sourceUrl][0]?.capturedAt ? formatDate(groupedEntries[sourceUrl][0].capturedAt) : ''}
                            </div>
                            <div className="text-center leading-none">·</div>
                            <div className="leading-none truncate">
                              {sessions.find(s => groupedEntries[sourceUrl].some(e => e.sessionId === s.id))?.name || 'Session'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Insights for this source */}
                  <div className="w-full flex flex-col justify-start items-start gap-3 sm:gap-5">
                    {groupedEntries[sourceUrl].map((entry) => (
                      <div 
                        key={entry.id}
                        className={`w-full pl-3 sm:pl-4 pr-3 sm:pr-5 py-2 sm:py-1 border-l-2 border-line-tertiary inline-flex justify-start items-start gap-2.5 cursor-pointer hover:border-gray-400 transition-colors ${
                          selectedEntries.includes(entry.id) ? 'border-line-tertia bg-fill-hover-secondary-light' : ''
                        }`}
                        onClick={() => toggleEntrySelection(entry.id)}
                      >
                        <div className="flex-1 justify-center text-text-primary-light text-body-lg-rg leading-snug">
                          {entry.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Highlights Panel */}
          <div className={`w-full h-full xl:w-96 flex justify-center items-start gap-2.5 transition-all duration-300 ease-in-out ${
            showHighlights 
              ? 'translate-x-0 opacity-100' 
              : 'xl:translate-x-full xl:opacity-0 xl:w-0 xl:overflow-hidden hidden xl:flex'
          }`}>
            <div className="flex-1 h-full xl:self-stretch p-4 sm:p-5 bg-gray-25 rounded-2xl inline-flex flex-col justify-start items-start gap-5">
              {/* Highlights Header */}
              <div className="w-full h-12 pr-0.5 rounded-lg inline-flex justify-between items-center overflow-hidden">
                <div className="flex justify-start items-center gap-2">
                  <div className="w-[20px] h-[20px] relative">
                    <Icons.HighlightIcon />
                  </div>
                  <div className="justify-center text-text-primary-light text-title-md leading-normal">Highlights</div>
                </div>
                <div className="rounded flex justify-start items-center gap-2">
                  <Button
                    variant="tertiary"
                    size="md"
                    isIconOnly
                    leftIcon={<Icons.HideTabIcon />}
                    showLeftIcon
                    onClick={() => setShowHighlights(!showHighlights)}
                  >
                    <Icons.HideTabIcon />
                  </Button>
                </div>
              </div>

              {/* Highlights Content */}
              <div className="w-full inline-flex justify-start items-start gap-1">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                  {selectedEntries.length === 0 ? (
                    <div className="w-full text-center py-10 text-text-tertiary-light text-body-md-rg">
                      Click on insights to add them to highlights
                    </div>
                  ) : (
                    entries
                      .filter(entry => selectedEntries.includes(entry.id))
                      .map(entry => (
                        <div 
                          key={entry.id}
                          className="w-full pl-2 pr-5 py-1 inline-flex justify-center items-center gap-2.5"
                        >
                          <div className="flex-1 justify-center text-text-primary-light text-body-lg-rg leading-snug">
                            {entry.content}
                          </div>
                        </div>
                      ))
                  )}
                </div>
                <div className="hidden xl:block h-72 p-1 flex justify-start items-center gap-2.5">
                  <div className="w-1 self-stretch bg-gray-200 rounded" />
                </div>
              </div>

              {selectedEntries.length > 0 && (
                <button
                  onClick={handleClearHighlights}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Highlights Toggle Button - appears when panel is hidden */}
      {!showHighlights && (
        <div className="fixed right-0 top-[120px] z-10">
          <button
            onClick={() => setShowHighlights(true)}
            className="w-12 h-12 bg-white border-l border-t border-b border-gray-200 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <div className="w-5 h-5 relative">
              <Icons.HighlightIcon />
            </div>
          </button>
        </div>
      )}
    </div>
  );
} 