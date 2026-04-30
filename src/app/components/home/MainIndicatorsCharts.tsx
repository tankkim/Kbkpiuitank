import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function MainIndicatorsCharts() {
  const mainIndicators = [
    { 
      name: 'Normal Loan', 
      value: 177.32, 
      color: '#1e3a5f'
    },
    { 
      name: 'Casa Increase', 
      value: 652.29, 
      color: '#f97316'
    },
    { 
      name: 'Time Deposit', 
      value: 102.54, 
      color: '#94a3b8'
    },
  ];

  const lowestIndicators = [
    { 
      name: 'Sales Productivity', 
      value: 57.89, 
      color: '#1e3a5f'
    },
    { 
      name: 'NTG/Digital Account', 
      value: 51.98, 
      color: '#f97316'
    },
    { 
      name: 'New Cooperation', 
      value: 2.81, 
      color: '#94a3b8'
    },
  ];

  const renderChart = (item: typeof mainIndicators[0]) => (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={[
              { value: item.value },
              { value: Math.max(0, 100 - item.value) }
            ]}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            <Cell fill={item.color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-2">
        <div className="text-xs text-gray-600">{item.name}</div>
        <div className="text-sm" style={{ color: item.color }}>
          {item.value}%
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Achievement of 3 Main Indicators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm mb-4">Achievement of 3 Main Indicators</h3>
        <div className="text-xs text-gray-500 mb-4">This Indicator need to be more weight</div>
        
        <div className="grid grid-cols-3 gap-4">
          {mainIndicators.map((item, index) => (
            <div key={index}>
              {renderChart(item)}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <div className="inline-block bg-blue-100 px-3 py-1 rounded text-xs">
            <span className="text-gray-600">Achievement</span>
            <span className="ml-2 text-blue-600">76.89%</span>
          </div>
        </div>
      </div>

      {/* Achievement of 3 Lowest Indicators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm mb-4">Achievement of 3 Lowest Indicators</h3>
        <div className="text-xs text-gray-500 mb-4">This Indicator need to be more weight</div>
        
        <div className="grid grid-cols-3 gap-4">
          {lowestIndicators.map((item, index) => (
            <div key={index}>
              {renderChart(item)}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <div className="inline-block bg-blue-100 px-3 py-1 rounded text-xs">
            <span className="text-gray-600">Achievement</span>
            <span className="ml-2 text-blue-600">76.89%</span>
          </div>
        </div>
      </div>
    </div>
  );
}