import { Users, Briefcase, TrendingUp, Settings } from 'lucide-react';
import { PageHeader } from '../PageHeader';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

export function AdminDashboard({ onNavigate, unreadNotificationsCount = 0, onNotificationClick }: AdminDashboardProps) {
  const stats = [
    { label: 'Total Employees', value: '156', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Positions', value: '4', icon: Briefcase, color: 'from-green-500 to-green-600' },
    { label: 'KPI Indicators', value: '16', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
    { label: 'System Settings', value: '8', icon: Settings, color: 'from-orange-500 to-orange-600' },
  ];

  const adminCards = [
    {
      id: 'positions',
      title: 'Position Management',
      description: 'Manage organizational hierarchy and roles',
      icon: Briefcase,
      color: 'from-blue-500 to-indigo-600',
      action: 'Manage Positions',
    },
    {
      id: 'kpi',
      title: 'KPI Structure',
      description: 'Configure KPI indicators, weights, and caps',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      action: 'Manage KPIs',
    },
    {
      id: 'employees',
      title: 'Employee Management',
      description: 'Add, edit, and manage employee information',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      action: 'Manage Employees',
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <PageHeader
        title="Admin Dashboard"
        subtitle="System Configuration & Management"
        icon={Settings}
        unreadNotificationsCount={unreadNotificationsCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl mt-1 text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Admin Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                  <div className="p-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                    <button
                      onClick={() => onNavigate(card.id)}
                      className={`w-full py-2 px-4 bg-gradient-to-r ${card.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                    >
                      {card.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Admin Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm text-gray-900 mb-1">Position Management</h4>
                <p className="text-xs text-gray-600">
                  Define organizational hierarchy from Region Head to RM Sales
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-sm text-gray-900 mb-1">KPI Structure</h4>
                <p className="text-xs text-gray-600">
                  Configure indicators, weights, caps, and position assignments
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm text-gray-900 mb-1">Employee Management</h4>
                <p className="text-xs text-gray-600">
                  Register employees and assign them to positions and branches
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}