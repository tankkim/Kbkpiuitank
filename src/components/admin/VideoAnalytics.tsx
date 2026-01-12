import { useState } from 'react';
import { Eye, Users, TrendingUp, AlertCircle, Building2, ChevronRight, ChevronDown, X } from 'lucide-react';
import { trainingVideos, videoWatchRecords, type Video, type VideoWatchRecord } from '../../data/videoData';
import { todoStatistics } from '../../data/todoData';
import { PageHeader } from '../PageHeader';

interface VideoAnalyticsProps {
  unreadNotificationsCount: number;
  onNotificationClick: () => void;
}

export function VideoAnalytics({ unreadNotificationsCount, onNotificationClick }: VideoAnalyticsProps) {
  const [videos] = useState<Video[]>(trainingVideos);
  const [selectedVideoForDetail, setSelectedVideoForDetail] = useState<string | null>(null);
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());

  // Get all employees from statistics
  const allEmployees = todoStatistics.map(stat => ({
    id: stat.employeeId,
    name: stat.employeeName,
    position: stat.position,
    branch: stat.branch,
  }));

  const totalEmployees = allEmployees.length;

  // Analytics calculations
  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0);
  
  const videoAnalytics = videos.map(video => {
    const records = videoWatchRecords.filter(r => r.videoId === video.id);
    const uniqueViewers = new Set(records.map(r => r.employeeId)).size;
    const avgCompletion = records.length > 0 
      ? Math.round(records.reduce((sum, r) => sum + r.completionRate, 0) / records.length)
      : 0;
    const completedCount = records.filter(r => r.completionRate === 100).length;
    const requiredCount = video.isRequired ? totalEmployees : 0;
    
    // Get employees who haven't watched
    const watchedEmployeeIds = new Set(records.map(r => r.employeeId));
    const notWatchedEmployees = video.isRequired 
      ? allEmployees.filter(emp => !watchedEmployeeIds.has(emp.id))
      : [];
    
    // Group not watched by branch
    const notWatchedByBranch = notWatchedEmployees.reduce((acc, emp) => {
      if (!acc[emp.branch]) {
        acc[emp.branch] = [];
      }
      acc[emp.branch].push(emp);
      return acc;
    }, {} as { [key: string]: typeof allEmployees });
    
    return {
      video,
      uniqueViewers,
      avgCompletion,
      completedCount,
      requiredCount,
      notWatchedEmployees,
      notWatchedByBranch,
      records,
    };
  }).sort((a, b) => b.uniqueViewers - a.uniqueViewers);

  const toggleBranch = (branch: string) => {
    const newExpanded = new Set(expandedBranches);
    if (newExpanded.has(branch)) {
      newExpanded.delete(branch);
    } else {
      newExpanded.add(branch);
    }
    setExpandedBranches(newExpanded);
  };

  // Get recent watch activity
  const recentActivity = [...videoWatchRecords]
    .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
    .slice(0, 20);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Video Analytics & Tracking"
        subtitle="Track employee viewing progress"
        onNotificationClick={onNotificationClick}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      <div className="p-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Videos</div>
                <div className="text-lg mt-0.5">{totalVideos}</div>
              </div>
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Views</div>
                <div className="text-lg mt-0.5">{totalViews.toLocaleString()}</div>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Avg Completion</div>
                <div className="text-lg mt-0.5">
                  {Math.round(videoAnalytics.reduce((sum, v) => sum + v.avgCompletion, 0) / videoAnalytics.length)}%
                </div>
              </div>
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Analytics Table */}
        <div className="bg-white rounded-lg border border-gray-200 mb-3 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Video</th>
                  <th className="px-2 py-1.5 text-center font-semibold text-gray-700">Total Views</th>
                  <th className="px-2 py-1.5 text-center font-semibold text-gray-700">Unique Viewers</th>
                  <th className="px-2 py-1.5 text-center font-semibold text-gray-700">Not Watched</th>
                  <th className="px-2 py-1.5 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {videoAnalytics.map(({ video, uniqueViewers, notWatchedEmployees }) => (
                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1.5">
                      <div>
                        <div className="font-semibold text-gray-900 mb-0.5">{video.title}</div>
                        <div className="text-gray-500 text-[10px]">{video.category}</div>
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-center text-gray-700">{video.viewCount}</td>
                    <td className="px-2 py-1.5 text-center text-gray-700">{uniqueViewers}</td>
                    <td className="px-2 py-1.5 text-center">
                      {video.isRequired && notWatchedEmployees.length > 0 ? (
                        <button
                          onClick={() => setSelectedVideoForDetail(video.id)}
                          className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[10px] border border-red-200 hover:bg-red-200 transition-colors inline-flex items-center gap-0.5"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {notWatchedEmployees.length}
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => setSelectedVideoForDetail(video.id)}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-[10px] hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Watch Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xs font-semibold">Recent Watch Activity</h3>
            <button
              onClick={() => {
                const firstVideo = videoAnalytics[0];
                if (firstVideo) setSelectedVideoForDetail(firstVideo.video.id);
              }}
              className="text-[10px] text-blue-600 hover:text-blue-700"
            >
              View All →
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((record, idx) => {
              const video = videos.find(v => v.id === record.videoId);
              return (
                <div key={idx} className="px-2 py-1.5 hover:bg-gray-50">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{record.employeeName}</div>
                      <div className="text-[10px] text-gray-500 truncate">
                        {record.position} • {record.branch}
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-[10px] font-medium truncate">{video?.title}</div>
                      <div className="text-[10px] text-gray-500">
                        {new Date(record.watchedAt).toLocaleDateString()} • {record.completionRate}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Detail Modal */}
      {selectedVideoForDetail && (() => {
        const analytics = videoAnalytics.find(a => a.video.id === selectedVideoForDetail);
        if (!analytics) return null;

        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-5xl w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-blue-600 text-white">
                <div>
                  <h2 className="text-sm font-semibold">{analytics.video.title}</h2>
                  <p className="text-xs opacity-90">Detailed viewing history and statistics</p>
                </div>
                <button
                  onClick={() => setSelectedVideoForDetail(null)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3">
                {/* Summary */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                    <div className="text-[10px] text-blue-600 mb-0.5">Total Views</div>
                    <div className="text-lg font-bold text-blue-900">{analytics.video.viewCount}</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                    <div className="text-[10px] text-green-600 mb-0.5">Unique Viewers</div>
                    <div className="text-lg font-bold text-green-900">{analytics.uniqueViewers}</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
                    <div className="text-[10px] text-purple-600 mb-0.5">Completed</div>
                    <div className="text-lg font-bold text-purple-900">{analytics.completedCount}</div>
                  </div>
                  <div className="bg-orange-50 p-2 rounded-lg border border-orange-200">
                    <div className="text-[10px] text-orange-600 mb-0.5">Not Watched</div>
                    <div className="text-lg font-bold text-orange-900">{analytics.notWatchedEmployees.length}</div>
                  </div>
                </div>

                {/* Not Watched - By Branch */}
                {analytics.video.isRequired && analytics.notWatchedEmployees.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-xs font-semibold mb-1.5 text-red-700">Employees Who Haven't Watched (Required Video)</h3>
                    <div className="bg-red-50 rounded-lg border border-red-200">
                      {Object.entries(analytics.notWatchedByBranch).map(([branch, employees]) => {
                        const isExpanded = expandedBranches.has(branch);
                        return (
                          <div key={branch} className="border-b border-red-200 last:border-0">
                            <div
                              className="p-2 cursor-pointer hover:bg-red-100 transition-colors flex items-center justify-between"
                              onClick={() => toggleBranch(branch)}
                            >
                              <div className="flex items-center gap-1.5">
                                {isExpanded ? (
                                  <ChevronDown className="w-3.5 h-3.5 text-red-600" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5 text-red-600" />
                                )}
                                <Building2 className="w-3.5 h-3.5 text-red-600" />
                                <span className="text-xs font-semibold text-red-900">{branch}</span>
                              </div>
                              <span className="text-[10px] bg-red-200 text-red-800 px-1.5 py-0.5 rounded-full">
                                {employees.length} not watched
                              </span>
                            </div>
                            {isExpanded && (
                              <div className="bg-white p-2">
                                <div className="grid grid-cols-3 gap-1.5">
                                  {employees.map(emp => (
                                    <div key={emp.id} className="p-1.5 bg-gray-50 rounded border border-gray-200">
                                      <div className="text-[10px] font-medium truncate">{emp.name}</div>
                                      <div className="text-[10px] text-gray-500 truncate">{emp.position}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Watch History */}
                <div>
                  <h3 className="text-xs font-semibold mb-1.5">Watch History</h3>
                  <div className="bg-white rounded-lg border border-gray-200">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-2 py-1 text-left text-[10px] text-gray-600">Employee</th>
                          <th className="px-2 py-1 text-left text-[10px] text-gray-600">Position</th>
                          <th className="px-2 py-1 text-left text-[10px] text-gray-600">Branch</th>
                          <th className="px-2 py-1 text-center text-[10px] text-gray-600">Watched At</th>
                          <th className="px-2 py-1 text-center text-[10px] text-gray-600">Completion</th>
                          <th className="px-2 py-1 text-center text-[10px] text-gray-600">Count</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {analytics.records
                          .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
                          .map((record, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-2 py-1 text-[10px]">{record.employeeName}</td>
                            <td className="px-2 py-1 text-[10px] text-gray-600">{record.position}</td>
                            <td className="px-2 py-1 text-[10px] text-gray-600">{record.branch}</td>
                            <td className="px-2 py-1 text-[10px] text-center">
                              {new Date(record.watchedAt).toLocaleString()}
                            </td>
                            <td className="px-2 py-1 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <div className="w-12 bg-gray-200 rounded-full h-1">
                                  <div
                                    className={`h-1 rounded-full ${
                                      record.completionRate === 100 ? 'bg-green-600' : 'bg-blue-600'
                                    }`}
                                    style={{ width: `${record.completionRate}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-semibold">{record.completionRate}%</span>
                              </div>
                            </td>
                            <td className="px-2 py-1 text-[10px] text-center">{record.watchCount}x</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="p-2 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedVideoForDetail(null)}
                  className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}