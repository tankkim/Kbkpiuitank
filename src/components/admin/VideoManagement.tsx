import { useState } from 'react';
import { ArrowLeft, Bell, Upload, Play, Trash2, Eye, Users, TrendingUp, Search, Filter, X, AlertCircle, Building2, ChevronDown, ChevronRight } from 'lucide-react';
import { trainingVideos, videoWatchRecords, type Video, type VideoWatchRecord } from '../../data/videoData';
import { todoStatistics } from '../../data/todoData';

interface VideoManagementProps {
  onBack: () => void;
  unreadNotificationsCount: number;
  onNotificationClick: () => void;
}

export function VideoManagement({ onBack, unreadNotificationsCount, onNotificationClick }: VideoManagementProps) {
  const [videos, setVideos] = useState<Video[]>(trainingVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'videos' | 'analytics'>('videos');
  const [selectedVideoForDetail, setSelectedVideoForDetail] = useState<string | null>(null);
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());

  const categories = ['all', ...Array.from(new Set(videos.map(v => v.category)))];

  // Get all employees from statistics
  const allEmployees = todoStatistics.map(stat => ({
    id: stat.employeeId,
    name: stat.employeeName,
    position: stat.position,
    branch: stat.branch,
  }));

  const totalEmployees = allEmployees.length;

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Analytics calculations
  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0);
  const requiredVideos = videos.filter(v => v.isRequired).length;
  
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDeleteVideo = (videoId: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(v => v.id !== videoId));
      setSelectedVideo(null);
    }
  };

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
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg">Video Training Management</h1>
                <p className="text-xs text-gray-500">Manage training videos and track employee progress</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onNotificationClick}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowUploadModal(true)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
              >
                <Upload className="w-4 h-4" />
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Videos</div>
                <div className="text-2xl mt-1">{totalVideos}</div>
              </div>
              <Play className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Views</div>
                <div className="text-2xl mt-1">{totalViews.toLocaleString()}</div>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Avg Completion</div>
                <div className="text-2xl mt-1">
                  {Math.round(videoAnalytics.reduce((sum, v) => sum + v.avgCompletion, 0) / videoAnalytics.length)}%
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('videos')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  viewMode === 'videos'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Video Library
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  viewMode === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Analytics & Tracking
              </button>
            </div>

            {viewMode === 'videos' && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm w-64"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'All' : category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {viewMode === 'videos' ? (
          /* Video Library */
          <div className="grid grid-cols-4 gap-3">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video bg-gray-100">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                  {video.isRequired && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Required
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-sm mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.viewCount}
                    </span>
                    <span>{video.category}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="flex-1 px-2 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="px-2 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Analytics View */
          <div className="space-y-4">
            {/* Analytics Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs text-gray-600">Video Title</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-600">Category</th>
                      <th className="px-3 py-2 text-center text-xs text-gray-600">Total Views</th>
                      <th className="px-3 py-2 text-center text-xs text-gray-600">Unique Viewers</th>
                      <th className="px-3 py-2 text-center text-xs text-gray-600">Watched / Required</th>
                      <th className="px-3 py-2 text-center text-xs text-gray-600">Not Watched</th>
                      <th className="px-3 py-2 text-center text-xs text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoAnalytics.map(({ video, uniqueViewers, completedCount, requiredCount, notWatchedEmployees }) => (
                      <tr key={video.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm">{video.title}</td>
                        <td className="px-3 py-2 text-xs text-gray-600">{video.category}</td>
                        <td className="px-3 py-2 text-sm text-center">{video.viewCount}</td>
                        <td className="px-3 py-2 text-sm text-center">{uniqueViewers}</td>
                        <td className="px-3 py-2 text-sm text-center">
                          {video.isRequired ? (
                            <span className={`font-semibold ${
                              completedCount === requiredCount ? 'text-green-600' : 
                              completedCount / requiredCount >= 0.7 ? 'text-blue-600' : 'text-orange-600'
                            }`}>
                              {completedCount} / {requiredCount}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {video.isRequired && notWatchedEmployees.length > 0 ? (
                            <button
                              onClick={() => setSelectedVideoForDetail(video.id)}
                              className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 transition-colors flex items-center gap-1 mx-auto"
                            >
                              <AlertCircle className="w-3 h-3" />
                              {notWatchedEmployees.length} people
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => setSelectedVideoForDetail(video.id)}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Watch Activity */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Recent Watch Activity</h3>
                <button
                  onClick={() => {
                    const firstVideo = videoAnalytics[0];
                    if (firstVideo) setSelectedVideoForDetail(firstVideo.video.id);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  View All →
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivity.map((record, idx) => {
                  const video = videos.find(v => v.id === record.videoId);
                  return (
                    <div key={idx} className="p-2.5 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium">{record.employeeName}</div>
                          <div className="text-xs text-gray-500">
                            {record.position} • {record.branch}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium">{video?.title}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(record.watchedAt).toLocaleString()} • {record.completionRate}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Detail Modal */}
      {selectedVideoForDetail && (() => {
        const analytics = videoAnalytics.find(a => a.video.id === selectedVideoForDetail);
        if (!analytics) return null;

        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-5xl w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div>
                  <h2 className="text-lg font-semibold">{analytics.video.title}</h2>
                  <p className="text-xs opacity-90">Detailed viewing history and statistics</p>
                </div>
                <button
                  onClick={() => setSelectedVideoForDetail(null)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {/* Summary */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 mb-1">Total Views</div>
                    <div className="text-2xl font-bold text-blue-900">{analytics.video.viewCount}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 mb-1">Unique Viewers</div>
                    <div className="text-2xl font-bold text-green-900">{analytics.uniqueViewers}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 mb-1">Completed</div>
                    <div className="text-2xl font-bold text-purple-900">{analytics.completedCount}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 mb-1">Not Watched</div>
                    <div className="text-2xl font-bold text-orange-900">{analytics.notWatchedEmployees.length}</div>
                  </div>
                </div>

                {/* Not Watched - By Branch */}
                {analytics.video.isRequired && analytics.notWatchedEmployees.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2 text-red-700">Employees Who Haven't Watched (Required Video)</h3>
                    <div className="bg-red-50 rounded-lg border border-red-200">
                      {Object.entries(analytics.notWatchedByBranch).map(([branch, employees]) => {
                        const isExpanded = expandedBranches.has(branch);
                        return (
                          <div key={branch} className="border-b border-red-200 last:border-0">
                            <div
                              className="p-2.5 cursor-pointer hover:bg-red-100 transition-colors flex items-center justify-between"
                              onClick={() => toggleBranch(branch)}
                            >
                              <div className="flex items-center gap-2">
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-red-600" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-red-600" />
                                )}
                                <Building2 className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-semibold text-red-900">{branch}</span>
                              </div>
                              <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                                {employees.length} not watched
                              </span>
                            </div>
                            {isExpanded && (
                              <div className="bg-white p-2">
                                <div className="grid grid-cols-3 gap-2">
                                  {employees.map(emp => (
                                    <div key={emp.id} className="p-2 bg-gray-50 rounded border border-gray-200">
                                      <div className="text-xs font-medium">{emp.name}</div>
                                      <div className="text-xs text-gray-500">{emp.position}</div>
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
                  <h3 className="text-sm font-semibold mb-2">Watch History</h3>
                  <div className="bg-white rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs text-gray-600">Employee</th>
                          <th className="px-3 py-2 text-left text-xs text-gray-600">Position</th>
                          <th className="px-3 py-2 text-left text-xs text-gray-600">Branch</th>
                          <th className="px-3 py-2 text-center text-xs text-gray-600">Watched At</th>
                          <th className="px-3 py-2 text-center text-xs text-gray-600">Completion</th>
                          <th className="px-3 py-2 text-center text-xs text-gray-600">Watch Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.records
                          .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
                          .map((record, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-3 py-2 text-sm">{record.employeeName}</td>
                            <td className="px-3 py-2 text-xs text-gray-600">{record.position}</td>
                            <td className="px-3 py-2 text-xs text-gray-600">{record.branch}</td>
                            <td className="px-3 py-2 text-xs text-center">
                              {new Date(record.watchedAt).toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${
                                      record.completionRate === 100 ? 'bg-green-600' : 'bg-blue-600'
                                    }`}
                                    style={{ width: `${record.completionRate}%` }}
                                  />
                                </div>
                                <span className="text-xs font-semibold">{record.completionRate}%</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-sm text-center">{record.watchCount}x</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-gray-200 flex justify-end bg-gray-50">
                <button
                  onClick={() => setSelectedVideoForDetail(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upload New Video</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Upload functionality will be implemented</p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-5xl w-full shadow-2xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
