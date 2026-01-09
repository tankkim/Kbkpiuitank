import { Users, Briefcase, TrendingUp, Settings, Building2, ChevronRight, MapPin, Play, CheckSquare, BarChart3 } from 'lucide-react';
import { PageHeader } from '../PageHeader';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

export function AdminDashboard({ onNavigate, unreadNotificationsCount = 0, onNotificationClick }: AdminDashboardProps) {
  const organizationHierarchy = {
    totalEmployees: 156,
    regions: [
      {
        id: 'reg-1',
        name: 'REGIONAL I',
        code: 'REG-I',
        head: 'Budi Santoso',
        branches: [
          { code: 'JKT-001', name: 'JAKARTA PUSAT', staff: 8, rating: 'A' },
          { code: 'JKT-002', name: 'JAKARTA SELATAN', staff: 7, rating: 'A' },
          { code: 'TNG-001', name: 'TANGERANG', staff: 9, rating: 'A+' },
          { code: 'JKT-004', name: 'JAKARTA SUDIRAYA', staff: 6, rating: 'B' },
        ],
      },
      {
        id: 'reg-2',
        name: 'REGIONAL II',
        code: 'REG-II',
        head: 'Siti Nurhaliza',
        branches: [
          { code: 'BDG-001', name: 'BANDUNG DAGO', staff: 7, rating: 'A' },
          { code: 'BDG-002', name: 'BANDUNG BRAGA', staff: 6, rating: 'B' },
        ],
      },
      {
        id: 'reg-3',
        name: 'REGIONAL III',
        code: 'REG-III',
        head: 'Ahmad Wijaya',
        branches: [
          { code: 'SBY-001', name: 'SURABAYA TUNJUNGAN', staff: 8, rating: 'A' },
          { code: 'MLG-001', name: 'MALANG', staff: 6, rating: 'A' },
          { code: 'SBY-002', name: 'SURABAYA DARMO', staff: 7, rating: 'B' },
        ],
      },
      {
        id: 'reg-4',
        name: 'REGIONAL IV',
        code: 'REG-IV',
        head: 'Dewi Lestari',
        branches: [
          { code: 'SMG-001', name: 'SEMARANG', staff: 7, rating: 'C' },
          { code: 'YGY-001', name: 'YOGYAKARTA', staff: 6, rating: 'B' },
        ],
      },
    ],
  };

  const positionHierarchy = [
    { level: 1, name: 'Region Head', count: 7 },
    { level: 2, name: 'Branch Manager', count: 25 },
    { level: 3, name: 'Supervisor', count: 48 },
    { level: 4, name: 'RM Sales', count: 76 },
  ];

  const menuItems = [
    { id: 'organization', icon: Building2, label: 'Organization' },
    { id: 'positions', icon: Briefcase, label: 'Positions' },
    { id: 'kpi', icon: TrendingUp, label: 'KPI Setup' },
    { id: 'employees', icon: Users, label: 'Employees' },
    { id: 'videos', icon: Play, label: 'Video Training' },
    { id: 'todos', icon: CheckSquare, label: 'To-Do Tasks' },
  ];

  const getRatingColor = (rating: string) => {
    if (rating === 'A+') return 'bg-green-700';
    if (rating === 'A') return 'bg-green-500';
    if (rating === 'B') return 'bg-yellow-500';
    if (rating === 'C') return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Organization Overview & Management"
        icon={Settings}
        unreadNotificationsCount={unreadNotificationsCount}
        onNotificationClick={onNotificationClick}
      />

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-[1600px] mx-auto space-y-3">
          {/* Quick Stats & Actions */}
          <div className="grid grid-cols-6 gap-2">
            {menuItems.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.id)}
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50 hover:border-gray-400 transition-all flex flex-col items-center justify-center gap-1.5"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{action.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-12 gap-3">
            {/* Position Hierarchy - Left Column */}
            <div className="col-span-3 space-y-2">
              <div className="bg-white rounded border border-gray-300 p-2.5">
                <h3 className="text-xs text-gray-700 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Position Hierarchy
                </h3>
                <div className="space-y-1.5">
                  {positionHierarchy.map((position, index) => (
                    <div key={position.level} className="relative">
                      <div className="bg-gray-100 border border-gray-300 text-gray-900 px-2 py-1.5 rounded">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">{position.name}</span>
                          <span className="text-xs px-1.5 py-0.5 bg-gray-200 rounded">{position.count}</span>
                        </div>
                      </div>
                      {index < positionHierarchy.length - 1 && (
                        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded border border-gray-300 p-2.5">
                <h3 className="text-xs text-gray-700 mb-2">System Stats</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Employees</span>
                    <span className="text-gray-900">{organizationHierarchy.totalEmployees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Regions</span>
                    <span className="text-gray-900">{organizationHierarchy.regions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Branches</span>
                    <span className="text-gray-900">
                      {organizationHierarchy.regions.reduce((sum, r) => sum + r.branches.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KPI Indicators</span>
                    <span className="text-gray-900">16</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Structure - Main Area */}
            <div className="col-span-9">
              <div className="bg-white rounded border border-gray-300 p-3">
                <h3 className="text-xs text-gray-700 mb-2.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Regional Organization Structure
                </h3>
                <div className="space-y-2">
                  {organizationHierarchy.regions.map((region) => (
                    <div key={region.id} className="border border-gray-300 rounded overflow-hidden">
                      {/* Region Header */}
                      <div className="bg-gray-700 text-white px-2.5 py-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <div>
                            <span className="text-[10px] opacity-70 mr-2">{region.code}</span>
                            <span className="text-xs">{region.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <div>
                            <span className="opacity-70">Head:</span> {region.head}
                          </div>
                          <div className="bg-white/20 px-1.5 py-0.5 rounded">
                            {region.branches.length} Branches
                          </div>
                        </div>
                      </div>

                      {/* Branches Grid */}
                      <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-gray-50">
                        {region.branches.map((branch) => (
                          <div
                            key={branch.code}
                            className="bg-white rounded border border-gray-200 p-1.5 hover:border-gray-400 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] text-gray-500">{branch.code}</div>
                                <div className="text-xs text-gray-900 truncate leading-tight">{branch.name}</div>
                              </div>
                              <div className={`${getRatingColor(branch.rating)} text-white text-[9px] px-1 py-0.5 rounded ml-1 flex-shrink-0`}>
                                {branch.rating}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-gray-100">
                              <div className="flex items-center gap-0.5 text-[10px] text-gray-600">
                                <Users className="w-2.5 h-2.5" />
                                <span>{branch.staff}</span>
                              </div>
                              <button
                                onClick={() => onNavigate('employees')}
                                className="text-[9px] text-gray-600 hover:text-gray-900"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}