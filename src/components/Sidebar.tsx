import { Home, BarChart3, Trophy, FileText, Map, Building2, Settings, User } from 'lucide-react';
import kbLogo from 'figma:asset/cfc85c37a40df7102bb79390385b615854d5d785.png';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'My Performance', label: 'My Performance', icon: User, highlight: true },
    { id: 'Scorecard', label: 'Scorecard', icon: BarChart3 },
    { id: 'Achievement', label: 'Achievement', icon: Trophy },
    { id: 'All KPI Result', label: 'All KPI Result', icon: FileText },
    { id: 'Region Comparison', label: 'Region Comparison', icon: Map },
    { id: 'Branch Comparison', label: 'Branch Comparison', icon: Building2 },
  ];

  return (
    <aside className="w-20 bg-[#4a5f7f] text-white flex flex-col items-center py-6 shadow-lg">
      {/* KB Bank Logo - Transparent PNG */}
      <div className="mb-8 flex items-center justify-center">
        <img 
          src={kbLogo} 
          alt="KB" 
          className="w-16 h-auto object-contain"
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 w-full">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full py-4 px-2 flex flex-col items-center gap-1 transition-colors relative ${
                isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              } ${item.highlight && !isActive ? 'border-t border-b border-white/10' : ''}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] text-center leading-tight">{item.label}</span>
              {item.highlight && !isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Admin Button at Bottom */}
      <button
        onClick={() => onPageChange('Admin')}
        className={`w-full py-4 px-2 flex flex-col items-center gap-1 transition-colors border-t border-white/10 ${
          activePage === 'Admin' || activePage.startsWith('Admin:')
            ? 'bg-red-500 text-white' 
            : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
      >
        <Settings className="w-6 h-6" />
        <span className="text-[10px] text-center leading-tight">Admin</span>
      </button>
    </aside>
  );
}