interface PerformanceRow {
  category: string;
  kpiDaltar: string;
  task: string;
  dataClass: string;
  weight: string | number;
  budget: string | number;
  actual?: string | number;
  target: string | number;
  achievement: string | number;
  delta?: string;
  score?: string | number;
}

interface PerformanceTableProps {
  data: PerformanceRow[];
  showTotalScore?: boolean;
}

export function PerformanceTable({ data, showTotalScore }: PerformanceTableProps) {
  const getAchievementColor = (achievement: string | number): string => {
    const value = typeof achievement === 'string' ? parseFloat(achievement) : achievement;
    if (value >= 100) return 'bg-green-500';
    if (value >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatNumber = (value: string | number | undefined): string => {
    if (value === undefined || value === null) return '-';
    if (value === '-' || value === 'nil' || value === 'not started' || value === 'Per' || value === 'Flat') return value.toString();
    const numValue = typeof value === 'string' ? value : value.toString();
    return numValue;
  };

  const totalScore = data.reduce((sum, row) => {
    const score = typeof row.score === 'number' ? row.score : parseFloat(row.score?.toString() || '0');
    return sum + (isNaN(score) ? 0 : score);
  }, 0);

  return (
    <div className="overflow-auto">
      <table className="w-full text-xs border-collapse">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-left min-w-[120px]">Category</th>
            <th className="border border-gray-400 px-2 py-1 text-left min-w-[200px]">KPI Daltar</th>
            <th className="border border-gray-400 px-2 py-1 text-left min-w-[80px]">Task</th>
            <th className="border border-gray-400 px-2 py-1 text-left min-w-[80px]">Data Class</th>
            <th className="border border-gray-400 px-2 py-1 text-center min-w-[60px]">Weight (%)</th>
            <th className="border border-gray-400 px-2 py-1 text-center min-w-[80px]">Budget</th>
            {data[0]?.actual !== undefined && (
              <th className="border border-gray-400 px-2 py-1 text-center min-w-[80px]">Actual</th>
            )}
            <th className="border border-gray-400 px-2 py-1 text-center min-w-[100px]">Performance Target</th>
            <th className="border border-gray-400 px-2 py-1 text-center min-w-[100px]">Achievement (%)</th>
            {data[0]?.delta !== undefined && (
              <th className="border border-gray-400 px-2 py-1 text-center min-w-[80px]">Delta (Actual - Target)</th>
            )}
            <th className="border border-gray-400 px-2 py-1 text-center min-w-[80px]">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-2 py-1">{row.category}</td>
              <td className="border border-gray-300 px-2 py-1">{row.kpiDaltar}</td>
              <td className="border border-gray-300 px-2 py-1">{row.task}</td>
              <td className="border border-gray-300 px-2 py-1 text-red-600">{row.dataClass}</td>
              <td className="border border-gray-300 px-2 py-1 text-center">{row.weight}</td>
              <td className="border border-gray-300 px-2 py-1 text-right">{formatNumber(row.budget)}</td>
              {row.actual !== undefined && (
                <td className="border border-gray-300 px-2 py-1 text-right">{formatNumber(row.actual)}</td>
              )}
              <td className="border border-gray-300 px-2 py-1 text-right">{formatNumber(row.target)}</td>
              <td className="border border-gray-300 px-2 py-1 p-0">
                <div 
                  className={`${getAchievementColor(row.achievement)} text-white text-center py-1`}
                >
                  {formatNumber(row.achievement)}
                </div>
              </td>
              {row.delta !== undefined && (
                <td className="border border-gray-300 px-2 py-1 text-right">{row.delta}</td>
              )}
              <td className="border border-gray-300 px-2 py-1 text-right">{formatNumber(row.score || 0)}</td>
            </tr>
          ))}
        </tbody>
        {showTotalScore && (
          <tfoot>
            <tr className="bg-gray-200">
              <td colSpan={data[0]?.actual !== undefined ? 9 : 8} className="border border-gray-300 px-2 py-1 text-right">
                Total Score ({data.map((_, i) => i + 1).join('+')})
              </td>
              <td className="border border-gray-300 px-2 py-1 text-right">{totalScore.toFixed(2)}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}