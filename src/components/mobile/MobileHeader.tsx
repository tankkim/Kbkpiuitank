import { Bell } from 'lucide-react';
import kbLogo from 'figma:asset/19e82ce61f63603c01227c771a0472c896a04d0c.png';

interface MobileHeaderProps {
  showNotification?: boolean;
  showProfile?: boolean;
  notificationCount?: number;
  onNavigate?: (screen: string) => void;
}

export function MobileHeader({ 
  showNotification = false,
  showProfile = false,
  notificationCount = 0,
  onNavigate
}: MobileHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-1.5 flex items-center justify-between">
        {/* Left - KB Bank Logo (Cropped & Maximized) */}
        <div className="flex items-center -my-1">
          <img 
            src={kbLogo} 
            alt="KB Bank" 
            className="h-14 w-auto object-contain"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.3)'
            }}
          />
        </div>
        
        {/* Right - Actions */}
        <div className="flex items-center gap-2.5">
          {showNotification && onNavigate && (
            <button 
              onClick={() => onNavigate('notifications')}
              className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95"
            >
              <Bell className="w-4.5 h-4.5 text-gray-700" />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  <span className="text-[9px] text-white font-bold px-1">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                </div>
              )}
            </button>
          )}
          
          {showProfile && onNavigate && (
            <button 
              onClick={() => onNavigate('profile')}
              className="relative"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 border-2 border-gray-100">
                <span className="text-xs text-white font-bold">SJ</span>
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white shadow-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}