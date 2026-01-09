import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, Target } from 'lucide-react';

export function RecentActivities() {
  const activities = [
    {
      id: 1,
      type: 'achievement',
      icon: CheckCircle,
      title: 'CASA Achievement',
      description: 'Reached 95% of monthly target',
      timestamp: '2 hours ago',
      status: 'success',
      color: 'green'
    },
    {
      id: 2,
      type: 'alert',
      icon: AlertCircle,
      title: 'Loan Disbursement Alert',
      description: 'Below target - 78% achievement',
      timestamp: '5 hours ago',
      status: 'warning',
      color: 'yellow'
    },
    {
      id: 3,
      type: 'improvement',
      icon: TrendingUp,
      title: 'Cross-Selling Improved',
      description: 'Up 12% from last week',
      timestamp: '1 day ago',
      status: 'info',
      color: 'blue'
    },
    {
      id: 4,
      type: 'target',
      icon: Target,
      title: 'Monthly Target Review',
      description: 'Overall KPI at 87.5%',
      timestamp: '1 day ago',
      status: 'info',
      color: 'purple'
    },
    {
      id: 5,
      type: 'decline',
      icon: TrendingDown,
      title: 'Customer Satisfaction',
      description: 'Decreased by 3 points',
      timestamp: '2 days ago',
      status: 'error',
      color: 'red'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      case 'red': return 'text-red-600';
      case 'blue': return 'text-blue-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-gray-900">Recent Activities</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className={`p-4 rounded-lg border ${getStatusColor(activity.status)} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${getIconColor(activity.color)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm text-gray-900">{activity.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
