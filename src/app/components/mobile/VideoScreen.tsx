import { useState } from 'react';
import { Play, Clock, Eye, CheckCircle, Filter, X } from 'lucide-react';
import { trainingVideos, myVideoWatchRecords, type Video } from '../../data/videoData';
import { MobileHeader } from './MobileHeader';

interface VideoScreenProps {
  onBack: () => void;
  notificationCount?: number;
  onNavigate?: (screen: string) => void;
}

export function VideoScreen({ onBack, notificationCount, onNavigate }: VideoScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [watchRecords, setWatchRecords] = useState(myVideoWatchRecords);
  const [videoStartTime, setVideoStartTime] = useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(trainingVideos.map(v => v.category)))];

  const filteredVideos = trainingVideos.filter(video => {
    return selectedCategory === 'all' || video.category === selectedCategory;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setVideoStartTime(Date.now());
    
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
      <MobileHeader 
        title="Video Training" 
        showBack={true}
        onBack={onBack}
        showNotification={true}
        showProfile={true}
        notificationCount={notificationCount}
        onNavigate={onNavigate}
      />

      <div className="p-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Completed</div>
                <div className="text-lg mt-0.5">{Object.keys(watchRecords).length}</div>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Required</div>
                <div className="text-lg mt-0.5">{completedRequired}/{requiredCount}</div>
              </div>
              <Play className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              Category: {selectedCategory === 'all' ? 'All' : selectedCategory}
            </span>
            <span className="text-gray-400">{showFilters ? '▲' : '▼'}</span>
          </button>

          {showFilters && (
            <div className="mt-2 bg-white border border-gray-200 rounded-lg p-2 space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`w-full px-3 py-2 rounded text-sm text-left transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Videos */}
        <div className="grid grid-cols-2 gap-2">
          {filteredVideos.map(video => {
            const watchRecord = watchRecords[video.id];
            const isCompleted = watchRecord?.completionRate === 100;

            return (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden active:scale-95 transition-transform"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-blue-600 ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                    {formatDuration(video.duration)}
                  </div>

                  {/* Required Badge */}
                  {video.isRequired && (
                    <div className="absolute top-1 left-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                      Required
                    </div>
                  )}

                  {/* Completed Badge */}
                  {isCompleted && (
                    <div className="absolute top-1 right-1">
                      <CheckCircle className="w-5 h-5 text-green-500 fill-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-2">
                  <h3 className="text-xs font-semibold mb-1 line-clamp-2 leading-tight">{video.title}</h3>
                  
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1.5">
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      {video.viewCount}
                    </span>
                  </div>

                  {/* Progress */}
                  {watchRecord && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">{watchRecord.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full transition-all"
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
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-black/50">
            <h2 className="text-white text-sm flex-1 pr-4 line-clamp-1">{selectedVideo.title}</h2>
            <button
              onClick={() => handleCloseVideo(selectedVideo)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Video Player */}
          <div className="flex-1 flex items-center justify-center bg-black">
            <div className="w-full aspect-video">
              <iframe
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Info Footer */}
          <div className="bg-white p-3">
            <p className="text-sm text-gray-600 mb-2">{selectedVideo.description}</p>
            
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(selectedVideo.duration)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {selectedVideo.viewCount} views
              </span>
              <span>{selectedVideo.category}</span>
            </div>

            {watchRecords[selectedVideo.id]?.completionRate === 100 && (
              <div className="w-full py-2 bg-green-100 text-green-700 rounded-lg flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                Completed
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500 italic text-center">
              Watch 90%+ to auto-complete
            </div>
          </div>
        </div>
      )}
    </div>
  );
}