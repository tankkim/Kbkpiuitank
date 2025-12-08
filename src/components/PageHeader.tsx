import { Calendar, Bell } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  showNotification?: boolean;
  unreadCount?: number;
  onNotificationClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export function PageHeader({ 
  title, 
  subtitle, 
  date = 'December 5, 2025',
  showNotification = true,
  unreadCount = 0,
  onNotificationClick,
  icon: Icon
}: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-900">{date}</span>
          </div>
          {showNotification && (
            <button
              onClick={onNotificationClick}
              className="relative group"
              aria-label="Notifications"
            >
              {/* Main notification button */}
              <div className="relative flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-gray-300 hover:border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                {/* Bell icon with ring animation */}
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-700 group-hover:text-indigo-600 transition-colors group-hover:animate-swing" />
                  {/* Dot indicator for unread */}
                  {unreadCount > 0 && (
                    <>
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
                    </>
                  )}
                </div>
                
                {/* Notification text */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">Notifications</span>
                  {unreadCount > 0 && (
                    <div className="flex items-center justify-center min-w-[22px] h-6 px-2 bg-red-500 rounded-full shadow-sm">
                      <span className="text-xs text-white">{unreadCount > 99 ? '99+' : unreadCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute top-full right-0 mt-3 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'No new notifications'}
                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}