import { Bell, CheckCircle, AlertTriangle, MessageSquare, Trophy, X } from 'lucide-react';
import { Notification } from '../data/communicationData';

interface NotificationCenterProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationCenter({ notifications, onClose, onMarkAsRead, onMarkAllAsRead }: NotificationCenterProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'goal_achieved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'goal_missed':
      case 'early_alert':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'recognition':
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-end z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col mt-16 mr-4 animate-slideIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" />
            <div>
              <h2 className="text-lg">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-xs opacity-90">{unreadCount} unread</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      {notification.relatedData && (
                        <div className="mt-2 inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                          {notification.relatedData.achievement && (
                            <span>Achievement: {notification.relatedData.achievement}%</span>
                          )}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{getTimeAgo(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
