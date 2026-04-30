import { Users, TrendingUp, Award, Target } from 'lucide-react';

export function TeamPerformanceSummary() {
  const teamStats = [
    {
      label: 'Team Members',
      value: '24',
      icon: Users,
      color: 'blue',
      change: '+2 this month'
    },
    {
      label: 'Avg. Team Score',
      value: '88.5%',
      icon: Target,
      color: 'green',
      change: '+3.2% vs last month'
    },
    {
      label: 'Top Performers',
      value: '7',
      icon: Award,
      color: 'purple',
      change: 'Above 95% target'
    },
    {
      label: 'Team Ranking',
      value: '#3',
      icon: TrendingUp,
      color: 'orange',
      change: 'Out of 45 branches'
    }
  ];

  const colorClasses: Record<string, { bg: string; text: string; icon: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'text-orange-600' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg text-gray-900 mb-4">Team Performance Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        {teamStats.map((stat) => {
          const Icon = stat.icon;
          const colors = colorClasses[stat.color];
          
          return (
            <div key={stat.label} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <span className="text-xs text-gray-600">{stat.label}</span>
              </div>
              <div className="space-y-1">
                <p className={`text-2xl ${colors.text}`}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
