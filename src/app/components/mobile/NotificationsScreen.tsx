import { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { myComments } from '../../data/communicationData';

interface NotificationsScreenProps {
  onBack: () => void;
  onKPIClick?: (kpiName: string) => void;
}

export function NotificationsScreen({ onBack, onKPIClick }: NotificationsScreenProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'alert' | 'feedback' | 'update'>('all');
  
  const filteredComments = activeFilter === 'all' 
    ? myComments 
    : myComments.filter(c => c.type === activeFilter);

  const unreadCount = myComments.filter(c => !c.isRead).length;

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleMarkAllRead = () => {
    console.log('Mark all as read');
    // TODO: Implement mark all as read
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <MobileHeader
        title="Notifications"
        showBack={true}
        onBack={onBack}
      />

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex-shrink-0 ${
              activeFilter === 'all' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            All ({myComments.length})
          </button>
          <button
            onClick={() => setActiveFilter('alert')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex-shrink-0 ${
              activeFilter === 'alert' 
                ? 'bg-red-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            🚨 Alerts ({myComments.filter(c => c.type === 'alert').length})
          </button>
          <button
            onClick={() => setActiveFilter('feedback')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex-shrink-0 ${
              activeFilter === 'feedback' 
                ? 'bg-green-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            💚 Feedback ({myComments.filter(c => c.type === 'feedback').length})
          </button>
          <button
            onClick={() => setActiveFilter('update')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex-shrink-0 ${
              activeFilter === 'update' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            ℹ️ Updates ({myComments.filter(c => c.type === 'update').length})
          </button>
        </div>

        {/* Mark All Read Button */}
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="w-full bg-blue-50 border border-blue-200 text-blue-700 rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-xs font-medium hover:bg-blue-100 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark All as Read ({unreadCount})
          </button>
        )}

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredComments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <button
                key={comment.id}
                onClick={() => {
                  console.log('Notification clicked:', comment);
                  console.log('Has kpiMetric:', comment.kpiMetric);
                  console.log('Has onKPIClick:', !!onKPIClick);
                  if (comment.kpiMetric && onKPIClick) {
                    onKPIClick(comment.kpiMetric);
                  }
                }}
                className={`w-full bg-white rounded-lg border p-3 text-left transition-all ${
                  !comment.isRead 
                    ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${comment.kpiMetric ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0 ${
                    comment.type === 'alert' ? 'bg-red-600' :
                    comment.type === 'feedback' ? 'bg-green-600' :
                    'bg-blue-600'
                  }`}>
                    {comment.fromUserName.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-gray-900">{comment.fromUserName}</p>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-medium ${
                        comment.type === 'alert' ? 'bg-red-100 text-red-700' :
                        comment.type === 'feedback' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {comment.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-gray-600 mb-1.5">
                      {comment.fromUserRole} • {getTimeAgo(comment.timestamp)}
                    </p>
                    
                    <p className="text-xs text-gray-800 leading-relaxed mb-2">
                      {comment.message}
                    </p>
                    
                    {comment.kpiMetric && (
                      <div className="inline-block bg-gray-100 px-2 py-1 rounded text-[9px] text-gray-700">
                        📊 {comment.kpiMetric}
                      </div>
                    )}
                    
                    {!comment.isRead && comment.kpiMetric && (
                      <div className="mt-2">
                        <span className="text-[10px] text-blue-600 font-medium">
                          👆 Tap to view KPI details
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}