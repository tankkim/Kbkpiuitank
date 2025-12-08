import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SummaryRatingKPIProps {
  selectedDate: Date;
}

export function SummaryRatingKPI({ selectedDate }: SummaryRatingKPIProps) {
  const regionData = [
    { region: 'A+', total: 2, ratio: '28.57%' },
    { region: 'A', total: 5, ratio: '71.43%' },
    { region: 'B', total: 0, ratio: '0.00%' },
    { region: 'C', total: 0, ratio: '0.00%' },
    { region: 'D', total: 0, ratio: '0.00%' },
    { region: 'E', total: 0, ratio: '0.00%' },
  ];

  const branchData = [
    { branch: 'A+', total: 19, ratio: '41.30%' },
    { branch: 'A', total: 20, ratio: '43.48%' },
    { branch: 'B', total: 7, ratio: '15.22%' },
    { branch: 'C', total: 0, ratio: '0.00%' },
    { branch: 'D', total: 0, ratio: '0.00%' },
    { branch: 'E', total: 0, ratio: '0.00%' },
  ];

  const regionTotal = regionData.reduce((sum, item) => sum + item.total, 0);
  const branchTotal = branchData.reduce((sum, item) => sum + item.total, 0);

  const regionChartData = regionData.map(item => ({
    name: item.region,
    value: item.total
  }));

  const branchChartData = branchData.map(item => ({
    name: item.branch,
    value: item.total
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-2 space-y-2">
        {/* Date Display - Ultra Compact */}
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-gray-600">Date</span>
          <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-center">{selectedDate.toISOString().split('T')[0]}</span>
        </div>

        {/* Summary Rating KPI Header */}
        <div className="bg-[#4a5f7f] text-white px-2 py-1.5">
          <h3 className="text-xs">SUMMARY RATING KPI</h3>
        </div>

        {/* Summary Tables */}
        <div className="space-y-3">
          {/* Region Summary Table */}
          <div>
            <table className="w-full border-collapse mb-1.5" style={{ fontSize: '9px' }}>
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-400 px-1 py-0.5 text-center">REGION</th>
                  <th className="border border-gray-400 px-1 py-0.5 text-center">TOTAL</th>
                  <th className="border border-gray-400 px-1 py-0.5 text-center">RATIO</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-1 py-0.5 text-center">{row.region}</td>
                    <td className="border border-gray-300 px-1 py-0.5 text-center">{row.total}</td>
                    <td className="border border-gray-300 px-1 py-0.5 text-center">{row.ratio}</td>
                  </tr>
                ))}
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 px-1 py-0.5 text-center">TOTAL</td>
                  <td className="border border-gray-300 px-1 py-0.5 text-center">{regionTotal}</td>
                  <td className="border border-gray-300 px-1 py-0.5 text-center">100.00%</td>
                </tr>
              </tbody>
            </table>

            {/* Summary of Region Chart */}
            <div>
              <h4 className="text-center mb-0.5" style={{ fontSize: '9px' }}>Summary of Region</h4>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={regionChartData} margin={{ top: 2, right: 2, left: -20, bottom: 2 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 8 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#d946ef" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Branch Summary Table */}
          <div>
            <table className="w-full border-collapse mb-1.5" style={{ fontSize: '9px' }}>
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-400 px-1 py-0.5 text-center">BRANCH</th>
                  <th className="border border-gray-400 px-1 py-0.5 text-center">TOTAL</th>
                  <th className="border border-gray-400 px-1 py-0.5 text-center">RATIO</th>
                </tr>
              </thead>
              <tbody>
                {branchData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-1 py-0.5 text-center">{row.branch}</td>
                    <td className="border border-gray-300 px-1 py-0.5 text-center">{row.total}</td>
                    <td className="border border-gray-300 px-1 py-0.5 text-center">{row.ratio}</td>
                  </tr>
                ))}
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 px-1 py-0.5 text-center">TOTAL</td>
                  <td className="border border-gray-300 px-1 py-0.5 text-center">{branchTotal}</td>
                  <td className="border border-gray-300 px-1 py-0.5 text-center">100.00%</td>
                </tr>
              </tbody>
            </table>

            {/* Summary of Branch Chart */}
            <div>
              <h4 className="text-center mb-0.5" style={{ fontSize: '9px' }}>Summary of Branch</h4>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={branchChartData} margin={{ top: 2, right: 2, left: -20, bottom: 2 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 8 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#d946ef" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}