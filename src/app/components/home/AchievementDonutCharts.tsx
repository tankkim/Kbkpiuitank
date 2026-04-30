import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function AchievementDonutCharts() {
  const mainIndicators = [
    { name: 'Normal Loan', value: 177.32, color: '#1e3a5f' },
    { name: 'Casa Increase', value: 652.29, color: '#f97316' },
    { name: 'Time Deposit', value: 102.54, color: '#94a3b8' },
  ];

  const lowestIndicators = [
    { name: 'Sales Productivity', value: 57.89, color: '#1e3a5f' },
    { name: 'NTC/Digital Account', value: 51.58, color: '#f97316' },
    { name: 'New Cooperation', value: 2.81, color: '#94a3b8' },
  ];

  const MultiLayerDonut = ({ indicators }: { indicators: typeof mainIndicators }) => {
    return (
      <div className="flex items-center gap-6">
        {/* Donut Chart on Left */}
        <div className="relative w-[160px] h-[160px] flex-shrink-0">
          <ResponsiveContainer width={160} height={160} minWidth={160} minHeight={160}>
            <PieChart>
              {/* Outer Ring - First Indicator */}
              <Pie
                data={[
                  { value: Math.min(indicators[0].value, 100) },
                  { value: Math.max(100 - indicators[0].value, 0) }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={72}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                <Cell fill={indicators[0].color} />
                <Cell fill="#e5e7eb" />
              </Pie>
              
              {/* Middle Ring - Second Indicator */}
              <Pie
                data={[
                  { value: Math.min(indicators[1].value, 100) },
                  { value: Math.max(100 - indicators[1].value, 0) }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={54}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                <Cell fill={indicators[1].color} />
                <Cell fill="#e5e7eb" />
              </Pie>
              
              {/* Inner Ring - Third Indicator */}
              <Pie
                data={[
                  { value: Math.min(indicators[2].value, 100) },
                  { value: Math.max(100 - indicators[2].value, 0) }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={36}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                <Cell fill={indicators[2].color} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Achievement Details on Right */}
        <div className="flex-1 min-w-0">
          <div className="text-sm mb-3 text-gray-900">Achievement</div>
          <div className="space-y-2">
            {indicators.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="text-xs" style={{ color: item.color }}>
                  {item.name}
                </div>
                <div className="text-xs" style={{ color: item.color }}>
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Achievement of 3 Main Indicators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm mb-1">Achievement of 3 Main Indicators</h3>
        <p className="text-xs text-gray-600 mb-4">Indicators that have the highest weight</p>
        
        <MultiLayerDonut indicators={mainIndicators} />
      </div>

      {/* Achievement of 3 Lowest Indicators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm mb-1">Achievement of 3 Lowest Indicators</h3>
        <p className="text-xs text-gray-600 mb-4">This Indicator should be improved</p>
        
        <MultiLayerDonut indicators={lowestIndicators} />
      </div>
    </div>
  );
}