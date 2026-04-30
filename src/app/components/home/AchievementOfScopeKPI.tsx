import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function AchievementOfScopeKPI() {
  const scopeData = [
    {
      title: 'Leadership & Learning',
      achievement: 115.2,
      color: '#1e3a5f',
    },
    {
      title: 'Customer',
      achievement: 87.5,
      color: '#f97316',
    },
    {
      title: 'Financial',
      achievement: 112.3,
      color: '#94a3b8',
    },
    {
      title: 'Additional Financial',
      achievement: 78.9,
      color: '#60a5fa',
    },
  ];

  const DonutChart = ({ achievement, color }: { achievement: number; color: string }) => {
    const data = [
      { value: Math.min(achievement, 100) },
      { value: Math.max(100 - achievement, 0) }
    ];

    return (
      <div className="relative w-[140px] h-[140px] flex-shrink-0 mx-auto">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              <Cell fill={color} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Achievement</div>
            <div className="text-lg" style={{ color }}>
              {achievement}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-sm mb-1">Achievement of Scope KPI</h3>
      <p className="text-xs text-gray-600 mb-6">Performance across different KPI categories</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scopeData.map((item, index) => (
          <div key={index} className="text-center">
            <h4 className="text-sm mb-3" style={{ color: item.color }}>
              {item.title}
            </h4>
            
            <DonutChart achievement={item.achievement} color={item.color} />
          </div>
        ))}
      </div>
    </div>
  );
}