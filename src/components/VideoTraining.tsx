import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { Play, Clock, Eye, CheckCircle, Circle, Filter, Search, X } from 'lucide-react';
import { trainingVideos, myVideoWatchRecords, type Video } from '../data/videoData';

interface VideoTrainingProps {
  unreadNotificationsCount: number;
  onNotificationClick: () => void;
}

export function VideoTraining({ unreadNotificationsCount, onNotificationClick }: VideoTrainingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyRequired, setShowOnlyRequired] = useState(false);
  const [watchRecords, setWatchRecords] = useState(myVideoWatchRecords);
  const [videoStartTime, setVideoStartTime] = useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(trainingVideos.map(v => v.category)))];

  const filteredVideos = trainingVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRequired = !showOnlyRequired || video.isRequired;
    return matchesCategory && matchesSearch && matchesRequired;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setVideoStartTime(Date.now());
    
    // Simulate starting to watch the video
    setTimeout(() => {
      const currentRecord = watchRecords[video.id];
      const newRecord = {
        videoId: video.id,
        employeeId: 'E001',
        employeeName: 'John Doe',
        position: 'Branch Manager',
        branch: 'Jakarta Central',
        watchedAt: new Date().toISOString(),
        watchDuration: currentRecord ? currentRecord.watchDuration : 0,
        completionRate: currentRecord ? currentRecord.completionRate : 0,
        watchCount: currentRecord ? currentRecord.watchCount + 1 : 1,
      };
      
      setWatchRecords({
        ...watchRecords,
        [video.id]: newRecord,
      });
    }, 1000);
  };

  const handleCloseVideo = (video: Video) => {
    if (videoStartTime) {
      const watchDuration = Math.floor((Date.now() - videoStartTime) / 1000);
      const completionRate = Math.min(100, Math.round((watchDuration / video.duration) * 100));
      
      // Auto-complete if watched at least 90% of the video
      const newRecord = {
        videoId: video.id,
        employeeId: 'E001',
        employeeName: 'John Doe',
        position: 'Branch Manager',
        branch: 'Jakarta Central',
        watchedAt: new Date().toISOString(),
        watchDuration: watchDuration,
        completionRate: completionRate >= 90 ? 100 : completionRate,
        watchCount: watchRecords[video.id]?.watchCount || 1,
      };
      
      setWatchRecords({
        ...watchRecords,
        [video.id]: newRecord,
      });
    }
    
    setSelectedVideo(null);
    setVideoStartTime(null);
  };

  const requiredCount = trainingVideos.filter(v => v.isRequired).length;
  const completedRequired = trainingVideos.filter(v => v.isRequired && watchRecords[v.id]?.completionRate === 100).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Video Training"
        unreadNotificationsCount={unreadNotificationsCount}
        onNotificationClick={onNotificationClick}
      />

      <div className="p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Videos</div>
                <div className="text-xl mt-0.5">{trainingVideos.length}</div>
              </div>
              <Play className="w-7 h-7 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Completed</div>
                <div className="text-xl mt-0.5">{Object.keys(watchRecords).length}</div>
              </div>
              <CheckCircle className="w-7 h-7 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Required</div>
                <div className="text-xl mt-0.5">{completedRequired}/{requiredCount}</div>
              </div>
              <Circle className="w-7 h-7 text-orange-500" />
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Watch Time</div>
                <div className="text-xl mt-0.5">
                  {Math.floor(Object.values(watchRecords).reduce((sum, r) => sum + r.watchDuration, 0) / 60)}m
                </div>
              </div>
              <Clock className="w-7 h-7 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-2.5 rounded-lg border border-gray-200 mb-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>

            {/* Category Filter */}
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

            {/* Required Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyRequired}
                onChange={(e) => setShowOnlyRequired(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">Required Only</span>
            </label>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-3">{filteredVideos.map(video => {
            const watchRecord = watchRecords[video.id];
            const isCompleted = watchRecord?.completionRate === 100;

            return (
              <div
                key={video.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-7 h-7 text-blue-600 ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                    {formatDuration(video.duration)}
                  </div>

                  {/* Required Badge */}
                  {video.isRequired && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                      Required
                    </div>
                  )}

                  {/* Completed Badge */}
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-6 h-6 text-green-500 fill-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-sm line-clamp-2">{video.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.viewCount} views
                    </span>
                    <span>{video.category}</span>
                  </div>

                  {/* Progress */}
                  {watchRecord && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">{watchRecord.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${watchRecord.completionRate}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <h2 className="text-base">{selectedVideo.title}</h2>
              <button
                onClick={() => handleCloseVideo(selectedVideo)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{selectedVideo.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(selectedVideo.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedVideo.viewCount} views
                    </span>
                    <span>{selectedVideo.category}</span>
                    <span>Uploaded by {selectedVideo.uploadedBy}</span>
                  </div>
                  {watchRecords[selectedVideo.id]?.completionRate === 100 && (
                    <div className="mt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg inline-flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 italic">
                Watch at least 90% of the video to mark it as completed automatically
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}