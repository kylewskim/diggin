import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserHoles, createHole } from '@shared/services/holeService';
import { getHoleSessions } from '@shared/services/sessionService';
import { getSessionEntries } from '@shared/services/textEntryService';
import { Hole } from '@shared/models/types';
import { Button } from '../components/Button';
import { SingleLineTextField } from '@shared/components/ui/textField/singleLine';
import * as Icons from '@shared/icons';

// 아이콘 ID로 아이콘 가져오기
const getIconById = (iconId: string | undefined): React.ReactNode => {
  if (!iconId) return <Icons.InfoIcon />;
  
  // Utility 아이콘
  if (iconId === 'utility-1') return <Icons.SearchIcon />;
  if (iconId === 'utility-2') return <Icons.AddIcon />;
  if (iconId === 'utility-3') return <Icons.EditIcon />;
  if (iconId === 'utility-4') return <Icons.TrashIcon />;
  if (iconId === 'utility-5') return <Icons.CheckIcon />;
  if (iconId === 'utility-6') return <Icons.CloseIcon />;
  if (iconId === 'utility-7') return <Icons.InfoIcon />;
  if (iconId === 'utility-8') return <Icons.LinkIcon />;
  if (iconId === 'utility-9') return <Icons.SettingIcon />;
  if (iconId === 'utility-10') return <Icons.FilterIcon />;
  
  // Media 아이콘
  if (iconId === 'media-1') return <Icons.PlayIcon />;
  if (iconId === 'media-2') return <Icons.PauseIcon />;
  if (iconId === 'media-3') return <Icons.StopIcon />;
  if (iconId === 'media-4') return <Icons.ArchiveIcon />;
  if (iconId === 'media-5') return <Icons.HideTabIcon />;
  if (iconId === 'media-6') return <Icons.HighlightIcon />;
  if (iconId === 'media-7') return <Icons.SortIcon />;
  if (iconId === 'media-8') return <Icons.ReorderIcon />;
  if (iconId === 'media-9') return <Icons.OverflowIcon />;
  if (iconId === 'media-10') return <Icons.ChevronRightIcon />;
  
  // Other 아이콘
  if (iconId === 'other-1') return <Icons.TimeIcon />;
  if (iconId === 'other-2') return <Icons.HourglassIcon />;
  if (iconId === 'other-3') return <Icons.LightbulbIcon />;
  if (iconId === 'other-4') return <Icons.TripleStarsIcon />;
  if (iconId === 'other-5') return <Icons.BackIcon />;
  
  // 기본 아이콘으로 LightbulbIcon 반환
  if (iconId === 'default-icon') return <Icons.LightbulbIcon />;

  console.warn('Icon ID not found:', iconId);
  return <Icons.InfoIcon />; // Default icon as fallback
};

export default function HoleListPage() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [holes, setHoles] = useState<Hole[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newHoleName, setNewHoleName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [holeSessionTimes, setHoleSessionTimes] = useState<{[holeId: string]: number}>({});
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [holeInsightCounts, setHoleInsightCounts] = useState<{[holeId: string]: number}>({});
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateInput, setShowCreateInput] = useState(false);

  useEffect(() => {
    if (user) {
      loadHoles();
    }
  }, [user]);

  useEffect(() => {
    if (holes.length > 0) {
      loadAllSessionTimes();
      loadAllInsightCounts();
    }
  }, [holes]);

  const loadHoles = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const userHoles = await getUserHoles(user.uid);
      setHoles(userHoles);
    } catch (err) {
      console.error('Failed to load holes:', err);
      setError('Failed to load your holes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadAllSessionTimes = async () => {
    if (holes.length === 0) return;
    
    try {
      setLoadingTimes(true);
      const timeMap: {[holeId: string]: number} = {};
      
      // 각 홀의 세션 시간을 비동기적으로 로드하기 위한 프라미스 배열
      const promises = holes.map(async (hole) => {
        try {
          const sessions = await getHoleSessions(hole.id);
          const totalDuration = sessions.reduce((total, session) => {
            // totalDuration 값이 있으면 더하고, 없으면 0 더함
            return total + (session.totalDuration || 0);
          }, 0);
          
          timeMap[hole.id] = totalDuration;
        } catch (err) {
          console.error(`Failed to load sessions for hole ${hole.id}:`, err);
          timeMap[hole.id] = 0;
        }
      });
      
      // 모든 프라미스가 완료될 때까지 기다림
      await Promise.all(promises);
      setHoleSessionTimes(timeMap);
    } catch (err) {
      console.error('Failed to load session times:', err);
    } finally {
      setLoadingTimes(false);
    }
  };

  const loadAllInsightCounts = async () => {
    if (holes.length === 0) return;
    
    try {
      setLoadingInsights(true);
      const insightMap: {[holeId: string]: number} = {};
      
      // 각 홀의 모든 세션에 대한 인사이트 개수를 가져오기
      const promises = holes.map(async (hole) => {
        try {
          const sessions = await getHoleSessions(hole.id);
          let totalInsights = 0;
          
          // 각 세션에 대한 인사이트 개수를 가져오기 위한 프라미스 배열
          const sessionPromises = sessions.map(async (session) => {
            try {
              const result = await getSessionEntries(session.id, 999); // 큰 숫자로 모든 엔트리 가져오기
              return result.entries.length;
            } catch (err) {
              console.error(`Failed to load entries for session ${session.id}:`, err);
              return 0;
            }
          });
          
          // 모든 세션의 인사이트 개수 합산
          const insightCounts = await Promise.all(sessionPromises);
          totalInsights = insightCounts.reduce((sum, count) => sum + count, 0);
          
          insightMap[hole.id] = totalInsights;
        } catch (err) {
          console.error(`Failed to load insight counts for hole ${hole.id}:`, err);
          insightMap[hole.id] = 0;
        }
      });
      
      // 모든 프라미스가 완료될 때까지 기다림
      await Promise.all(promises);
      setHoleInsightCounts(insightMap);
    } catch (err) {
      console.error('Failed to load insight counts:', err);
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleCreateHole = async () => {
    if (!user || !newHoleName.trim()) return;
    
    try {
      setIsCreating(true);
      setError(null);
      await createHole(user.uid, newHoleName, 'default-icon');
      setNewHoleName('');
      await loadHoles();
    } catch (err) {
      console.error('Failed to create hole:', err);
      setError('Failed to create a new hole. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleViewHole = (holeId: string) => {
    navigate(`/holes/${holeId}/insights`);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date).replace(/\//g, '.');
  };

  // Function to format duration in seconds to hours, minutes, seconds
  const formatDuration = (durationInSeconds: number) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const filteredHoles = holes.filter(hole =>
    hole.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setShowCreateInput(true);
  };

  const handleCreateSubmit = async () => {
    if (!newHoleName.trim()) return;
    await handleCreateHole();
    setShowCreateInput(false);
  };

  const handleCreateCancel = () => {
    setNewHoleName('');
    setShowCreateInput(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div data-size="lg" className="fixed top-0 left-0 right-0 z-50 w-full h-16 px-4 sm:px-6 bg-white border-b border-gray-200 flex flex-col justify-start items-center gap-2.5">
        <div className="w-full py-3 inline-flex justify-between items-center">
          <div className="text-center justify-center text-text-primary-light text-title-md leading-normal">Diggin</div>
          <div>
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
                >
                    Log out
                </Button>
          </div>
        </div>
      </div>

      {/* Main Content with top padding to account for fixed header */}
      <div className="flex-1 w-full min-h-screen pt-16 px-4 sm:px-6 lg:px-24 bg-white">
        <div className="py-10 flex flex-col justify-start items-center gap-14 min-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="w-full max-w-[1520px] flex flex-col justify-start items-start gap-5">
            {/* Top Section with Search and Filters */}
            <div className="w-full h-auto flex flex-col sm:flex-row sm:h-10 justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div className="justify-center text-gray-950 text-lg font-medium font-['Pretendard'] leading-normal">Holes</div>
              <div className="flex justify-start items-center gap-2 w-full sm:w-auto">
                <div data-status="open" className="flex-1 sm:w-80 flex justify-start items-center gap-2">
                  <div data-size="md" data-status="default" className="flex-1 h-10 rounded-lg flex justify-start items-center gap-2.5">
                    <SingleLineTextField
                      size="md"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      isDisabled={false}
                      error={false}
                      className="flex-1"
                    />
                  </div>
                  <div className="rounded flex justify-start items-center gap-2">
                    <div className="w-9 h-9 flex justify-center items-center gap-2.5">
                      <div className="w-5 h-5 relative overflow-hidden text-gray-950">
                        <Icons.SearchIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div data-status="default" className="flex justify-start items-center">
                  <div className="rounded flex justify-start items-center gap-2">
                    <div className="w-9 h-9 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-gray-100 rounded">
                      <div className="w-5 h-5 relative text-gray-950">
                        <Icons.FilterIcon />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="rounded flex justify-start items-center gap-2">
                  <div 
                    className="w-9 h-9 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-gray-100 rounded"
                    onClick={handleAddClick}
                  >
                    <div className="w-5 h-5 relative text-gray-950">
                      <Icons.AddIcon />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="w-full text-red-500 mb-4">{error}</div>
            )}

            {/* Content */}
            {loading && holes.length === 0 ? (
              <div className="py-10 flex justify-center items-center">
                <div className="text-gray-700">Loading...</div>
              </div>
            ) : filteredHoles.length === 0 && searchQuery ? (
              <div className="py-20 flex flex-col justify-center items-center gap-5">
                <div className="text-center text-neutral-700 text-lg font-medium font-['Pretendard']">No holes found</div>
              </div>
            ) : filteredHoles.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center py-20">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-full mb-5" />
                <div className="text-center text-text-secondary-light text-title-md">No hole yet</div>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-start items-center">
                {/* Table Header */}
                <div data-property-1="top" className="w-full h-14 pl-4 pr-4 py-3 border-b border-gray-200 inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <div className="justify-center text-gray-700 text-sm font-medium font-['Pretendard'] leading-none">Name</div>
                  </div>
                  <div className="pr-4 sm:pr-12 flex justify-start items-center gap-6">
                    <div className="hidden sm:flex w-36 lg:w-36 justify-start items-center gap-1">
                      <div className="w-4 h-4 relative text-gray-700">
                        <Icons.TimeIcon />
                      </div>
                      <div className="justify-center text-gray-700 text-sm font-medium font-['Pretendard'] leading-none">Modified</div>
                    </div>
                    <div className="w-20 flex justify-start items-center gap-1">
                      <div className="w-4 h-4 relative overflow-hidden text-gray-700">
                        <Icons.HourglassIcon />
                      </div>
                      <div className="justify-center text-gray-700 text-sm font-medium font-['Pretendard'] leading-none">Time</div>
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="w-full flex flex-col justify-start items-start">
                  {filteredHoles.map((hole) => (
                    <div 
                      key={hole.id}
                      data-property-1="default" 
                      className="w-full pl-4 pr-3 py-3 border-b border-gray-200 inline-flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewHole(hole.id)}
                    >
                      <div className="flex justify-start items-center gap-4 flex-1 min-w-0">
                        <div className="w-5 h-5 relative overflow-hidden text-gray-950 flex-shrink-0">
                          {getIconById(hole.icon)}
                        </div>
                        <div className="justify-center text-text-primary-light text-body-lg-rg leading-snug truncate">{hole.name}</div>
                        <div className="justify-center text-text-tertiary-light text-body-lg-rg text-base leading-snug flex-shrink-0">
                          {loadingInsights ? (
                            <span>...</span>
                          ) : (
                            holeInsightCounts[hole.id] || 0
                          )}
                        </div>
                      </div>
                      <div className="flex justify-start items-center gap-6">
                        <div className="hidden sm:block w-36 lg:w-36 justify-center text-text-secondary-light text-body-md-rg leading-none">
                          {formatDate(hole.updatedAt)}
                        </div>
                        <div className="w-20 justify-center text-text-secondary-light text-body-md-rg leading-none">
                          {loadingTimes ? (
                            <span>...</span>
                          ) : (
                            formatDuration(holeSessionTimes[hole.id] || 0)
                          )}
                        </div>
                        <div className="rounded flex justify-start items-center gap-2">
                          <div className="w-7 h-7 flex justify-center items-center gap-2.5">
                            <div className="w-4 h-4 relative overflow-hidden text-gray-950">
                              <Icons.ChevronRightIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Hole Input */}
            {showCreateInput && (
              <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <SingleLineTextField
                    size="md"
                    placeholder="Enter hole name"
                    value={newHoleName}
                    onChange={(e) => setNewHoleName(e.target.value)}
                    isDisabled={isCreating}
                    error={false}
                    className="flex-1"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleCreateSubmit}
                    disabled={isCreating || !newHoleName.trim()}
                  >
                    {isCreating ? 'Creating...' : 'Create'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleCreateCancel}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 