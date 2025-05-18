import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserHoles, createHole } from '@shared/services/holeService';
import { getHoleSessions } from '@shared/services/sessionService';
import { getSessionEntries } from '@shared/services/textEntryService';
import { Hole, Session } from '@shared/models/types';
import { colors } from '@shared/constants/colors';
import { Button } from '../components/Button';

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

  return (
    <div className="w-full flex flex-col justify-start items-center bg-gray-50">
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-[100px]">
          <div className="py-3 flex justify-between items-center h-16">
            <div className="text-gray-950 text-lg font-medium font-['Pretendard']">Diggin</div>
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
      </div>
      
      <div className="w-full max-w-[1400px] px-[100px] py-10">
        <div className="mb-5 flex justify-between items-center">
          <div className="text-gray-950 text-lg font-medium font-['Pretendard']">Holes</div>
          <div className="w-96 h-10 flex items-center">
            <input
              type="text"
              value={newHoleName}
              onChange={(e) => setNewHoleName(e.target.value)}
              placeholder="New hole name"
              className="flex-1 h-full px-3 border rounded-l border-gray-200"
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleCreateHole}
              disabled={isCreating || !newHoleName.trim()}
              className="rounded-l-none rounded-r-lg"
            >
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="w-full text-red-500 mb-4">{error}</div>
        )}

        {loading && holes.length === 0 ? (
          <div className="py-10 flex justify-center items-center">
            <div className="text-gray-700">Loading...</div>
          </div>
        ) : holes.length === 0 ? (
          <div className="py-20 flex flex-col justify-center items-center gap-5">
            <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
            <div className="text-center text-neutral-700 text-lg font-medium font-['Pretendard']">No hole yet</div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-gray-700 text-sm font-medium font-['Pretendard']">Name</th>
                  <th className="text-left px-6 py-3 text-gray-700 text-sm font-medium font-['Pretendard']">Modified</th>
                  <th className="text-left px-6 py-3 text-gray-700 text-sm font-medium font-['Pretendard']">Time spent</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {holes.map((hole) => (
                  <tr 
                    key={hole.id}
                    onClick={() => handleViewHole(hole.id)}
                    className="border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 relative">
                          <div className="w-3 h-4 left-[4.17px] top-[1.67px] absolute bg-gray-900"></div>
                        </div>
                        <span className="text-gray-950 text-base font-medium font-['Pretendard']">{hole.name}</span>
                        <span className="text-gray-300 text-base font-medium font-['Pretendard']">
                          {loadingInsights ? (
                            <span className="text-gray-200">...</span>
                          ) : (
                            holeInsightCounts[hole.id] || 0
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm font-medium font-['Pretendard']">
                      {formatDate(hole.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm font-medium font-['Pretendard']">
                      {loadingTimes ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : (
                        formatDuration(holeSessionTimes[hole.id] || 0)
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 flex justify-center items-center">
                        <div className="w-4 h-4 relative">
                          <div className="w-[2.67px] h-3 left-[6.67px] top-[2px] absolute bg-gray-900"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 