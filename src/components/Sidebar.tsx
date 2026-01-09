import { Home, BarChart3, Trophy, FileText, Map, Building2, Settings, User, Shield, Database, Play, CheckSquare, TrendingUp } from 'lucide-react';
import kbLogo from 'figma:asset/cfc85c37a40df7102bb79390385b615854d5d785.png';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: 'Home', label: 'Home', shortLabel: 'Home', icon: Home, type: 'personal' },
    { id: 'My Performance', label: 'My Performance', shortLabel: 'My KPI', icon: User, type: 'personal', highlight: true },
    { id: 'Video Training', label: 'Video Training', shortLabel: 'Videos', icon: Play, type: 'personal' },
    { id: 'To-Do List', label: 'To-Do List', shortLabel: 'To-Do', icon: CheckSquare, type: 'personal' },
    { id: 'To-Do Statistics', label: 'To-Do Statistics', shortLabel: 'To-Do\nStats', icon: TrendingUp, type: 'admin' },
    { id: 'Scorecard', label: 'Scorecard', shortLabel: 'Score', icon: BarChart3, type: 'admin' },
    { id: 'Achievement', label: 'Achievement', shortLabel: 'Achieve', icon: Trophy, type: 'admin' },
    { id: 'All KPI Result', label: 'All KPI Result', shortLabel: 'All KPI', icon: FileText, type: 'admin' },
    { id: 'Reports', label: 'Reports', shortLabel: 'Reports', icon: Database, type: 'admin' },
    { id: 'Region Comparison', label: 'Region Comparison', shortLabel: 'Region', icon: Map, type: 'admin' },
    { id: 'Branch Comparison', label: 'Branch Comparison', shortLabel: 'Branch', icon: Building2, type: 'admin' },
  ];

  return (
    <aside className="w-20 bg-[#4a5f7f] text-white flex flex-col items-center py-4 shadow-lg">
      {/* KB Bank Logo - Transparent PNG */}
      <div className="mb-4 flex items-center justify-center">
        <img 
          src={kbLogo} 
          alt="KB" 
          className="w-14 h-auto object-contain"
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 w-full">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          const isPersonal = item.type === 'personal';
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full py-2 px-2 flex flex-col items-center gap-0.5 transition-colors relative group ${
                isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white hover:bg-white/10'
              } ${isPersonal ? 'border-t-2 border-b-2 border-green-400/50 bg-white/5' : ''}`}
              title={isPersonal ? 'Available to All Employees' : 'Admin/Manager Only'}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {/* Personal Badge */}
                {isPersonal && !isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
                {/* Admin Lock Icon */}
                {!isPersonal && !isActive && (
                  <Shield className="w-3 h-3 absolute -bottom-1 -right-1 text-red-400/60" />
                )}
              </div>
              <span className={`text-[8px] text-center leading-tight text-white w-full ${isPersonal ? 'font-semibold' : ''}`}>
                {item.shortLabel}
              </span>
              
              {/* Tooltip on hover */}
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 shadow-xl">
                {isPersonal ? (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-400" />
                    <div>
                      <div className="font-semibold text-green-400">All Employees</div>
                      <div className="text-[10px] text-gray-400">Personal dashboard</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    <div>
                      <div className="font-semibold text-red-400">Admin Only</div>
                      <div className="text-[10px] text-gray-400">Restricted access</div>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Admin Button at Bottom */}
      <button
        onClick={() => onPageChange('Admin')}
        className={`w-full py-2 px-2 flex flex-col items-center gap-0.5 transition-colors border-t-2 border-red-400/50 bg-red-900/20 relative group ${
          activePage === 'Admin' || activePage.startsWith('Admin:')
            ? 'bg-red-500 text-white' 
            : 'text-white hover:bg-white/10'
        }`}
        title="System Administration"
      >
        <div className="relative">
          <Settings className="w-5 h-5" />
          <Shield className="w-3 h-3 absolute -bottom-1 -right-1 text-red-400" />
        </div>
        <span className="text-[8px] text-center leading-tight text-white font-semibold">Adm</span>
        
        {/* Admin Tooltip */}
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 shadow-xl">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-400" />
            <div>
              <div className="font-semibold text-red-400">System Admin</div>
              <div className="text-[10px] text-gray-400">Manage positions & KPIs</div>
            </div>
          </div>
        </div>
      </button>
    </aside>
  );
}