import { useState } from 'react';
import { ArrowLeft, Bell, Upload, Play, Trash2, Eye, Edit, Search, Filter, X } from 'lucide-react';
import { trainingVideos, type Video } from '../../data/videoData';

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

  const categories = ['all', ...Array.from(new Set(videos.map(v => v.category)))];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0);
  const requiredVideos = videos.filter(v => v.isRequired).length;

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-sm">Video Library</h1>
                <p className="text-xs text-gray-500">Manage training videos</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onNotificationClick}
                className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowUploadModal(true)}
                className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Videos</div>
                <div className="text-lg mt-0.5">{totalVideos}</div>
              </div>
              <Play className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Views</div>
                <div className="text-lg mt-0.5">{totalViews.toLocaleString()}</div>
              </div>
              <Eye className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Required</div>
                <div className="text-lg mt-0.5">{requiredVideos}</div>
              </div>
              <Play className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-2 rounded-lg border border-gray-200 mb-3">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-2 py-1 border border-gray-200 rounded-lg text-xs w-40"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-500" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
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
        </div>

        {/* Video List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Video</th>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-2 py-1.5 text-center font-semibold text-gray-700">Duration</th>
                  <th className="px-2 py-1.5 text-center font-semibold text-gray-700">Views</th>
                  <th className="px-2 py-1.5 text-center font-semibold text-gray-700">Status</th>
                  <th className="px-2 py-1.5 text-center font-semibold text-gray-700">Uploaded</th>
                  <th className="px-2 py-1.5 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVideos.map(video => (
                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 mb-0.5 truncate">{video.title}</div>
                          <div className="text-gray-500 text-[11px] truncate">{video.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1.5">
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px]">
                        {video.category}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 text-center text-gray-700">
                      {formatDuration(video.duration)}
                    </td>
                    <td className="px-2 py-1.5 text-center text-gray-700">
                      {video.viewCount}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {video.isRequired ? (
                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] border border-orange-200">
                          REQUIRED
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                          Optional
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-1.5 text-center text-gray-500">
                      {video.uploadedDate}
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="p-1 hover:bg-blue-100 rounded"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-1 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="p-6 text-center text-gray-500 text-xs">
              No videos found. Click "Upload Video" to add one.
            </div>
          )}
        </div>
      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">{selectedVideo.title}</h2>
                <p className="text-xs text-gray-500">{selectedVideo.category}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="aspect-video bg-gray-900 rounded-lg mb-3 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-50" />
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-semibold">{formatDuration(selectedVideo.duration)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Views:</span>
                  <span className="font-semibold">{selectedVideo.viewCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-semibold">{selectedVideo.isRequired ? 'Required' : 'Optional'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Uploaded:</span>
                  <span className="font-semibold">{selectedVideo.uploadedDate}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-gray-600">{selectedVideo.description}</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full shadow-2xl">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Upload New Video</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Upload functionality will be implemented</p>
              </div>
            </div>

            <div className="p-3 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Upload would start here');
                  setShowUploadModal(false);
                }}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
