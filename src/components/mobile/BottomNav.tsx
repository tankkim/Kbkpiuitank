import { Home, TrendingUp, Trophy, Calculator } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  notificationCount?: number;
}

export function BottomNav({ activeScreen, onNavigate, notificationCount = 0 }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'performance', icon: TrendingUp, label: 'My KPIs' },
    { id: 'rankings', icon: Trophy, label: 'Rankings' },
    { id: 'simulator', icon: Calculator, label: 'Simulator' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                {item.id === 'home' && notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white font-semibold">{notificationCount > 9 ? '9+' : notificationCount}</span>
                  </div>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
