import { BarChart3, Target, Users, TrendingUp, FileText, Award } from 'lucide-react';

interface QuickActionProps {
  onNavigate?: (page: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionProps) {
  const actions = [
    { icon: Target, label: 'My Performance', page: 'My Performance', color: 'blue' },
    { icon: BarChart3, label: 'All KPI Results', page: 'All KPI Result', color: 'green' },
    { icon: Users, label: 'Branch Comparison', page: 'Branch Comparison', color: 'purple' },
    { icon: TrendingUp, label: 'Scoreboard', page: 'Scorecard', color: 'orange' },
    { icon: Award, label: 'Achievements', page: 'Achievement', color: 'pink' },
    { icon: FileText, label: 'Region Comparison', page: 'Region Comparison', color: 'indigo' },
  ];

  const colorClasses: Record<string, { bg: string; text: string; hover: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
    green: { bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:bg-green-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', hover: 'hover:bg-purple-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', hover: 'hover:bg-orange-100' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', hover: 'hover:bg-pink-100' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', hover: 'hover:bg-indigo-100' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action) => {
          const colors = colorClasses[action.color];
          const Icon = action.icon;
          
          return (
            <button
              key={action.page}
              onClick={() => onNavigate?.(action.page)}
              className={`flex items-center gap-3 p-3 rounded-lg ${colors.bg} ${colors.hover} transition-all transform hover:scale-105`}
            >
              <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <span className={`text-sm ${colors.text}`}>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}