import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function MovementChart() {
  const data = [
    { month: 'Jan', 2024: 10, 2025: 11 },
    { month: 'Feb', 2024: 10, 2025: 11 },
    { month: 'Mar', 2024: 10, 2025: 12 },
    { month: 'Apr', 2024: 8, 2025: 11 },
    { month: 'May', 2024: 8, 2025: 14 },
    { month: 'Jun', 2024: 8, 2025: null },
  ];

  const annotations2024 = [
    { month: 'Jan', value: 'A: 11' },
    { month: 'Feb', value: 'A: 11' },
    { month: 'Mar', value: 'A: 12' },
    { month: 'Apr', value: 'A+: 14' },
    { month: 'May', value: 'A+: 17' },
  ];

  const annotations2025 = [
    { month: 'Jan', value: 'A: 10' },
    { month: 'Feb', value: 'A: 10' },
    { month: 'Mar', value: 'B: 10' },
    { month: 'Apr', value: 'B: 09' },
    { month: 'May', value: 'B: 08' },
    { month: 'Jun', value: 'B: 08' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm">Movement of KPI (2024 vs 2025)</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span>2024</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span>2025</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[0, 20]} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="2024" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="2025" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-center text-gray-500">Total Branch</div>
    </div>
  );
}