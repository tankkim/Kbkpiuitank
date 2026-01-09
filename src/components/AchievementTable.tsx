interface AchievementRow {
  bankWiseRank: string;
  regionRank: string;
  branch: string;
  kpiRating: string;
  kpiScore: string | number;
}

interface AchievementTableProps {
  data: AchievementRow[];
}

export function AchievementTable({ data }: AchievementTableProps) {
  // Separate TOTAL BRANCH and REGIONALs from detailed branches
  const totalBranchRow = data.find(row => row.branch === 'TOTAL BRANCH');
  const regionalRows = data.filter(row => row.branch.startsWith('REGIONAL'));
  const detailedBranchRows = data.filter(row => !row.branch.startsWith('REGIONAL') && row.branch !== 'TOTAL BRANCH');

  return (
    <table className="w-full border-collapse" style={{ fontSize: '10px' }}>
      <thead className="bg-gray-700 text-white sticky top-0">
        <tr>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '70px' }}>BANKWIDE RANK</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '70px' }}>REGION RANK</th>
          <th className="border border-gray-400 px-1 py-1 text-left" style={{ minWidth: '140px' }}>BRANCH</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '55px' }}>RATING</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '55px' }}>SCORE</th>
        </tr>
      </thead>
      <tbody>
        {/* TOTAL BRANCH */}
        {totalBranchRow && (
          <tr className="bg-blue-100">
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.bankWiseRank}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.regionRank}</td>
            <td className="border border-gray-300 px-1 py-0.5">{totalBranchRow.branch}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">
              <span className={`inline-block px-1.5 py-0.5 text-xs ${
                totalBranchRow.kpiRating.startsWith('A+') ? 'bg-green-600 text-white' :
                totalBranchRow.kpiRating.startsWith('A') && !totalBranchRow.kpiRating.includes('+') ? 'bg-green-500 text-white' :
                totalBranchRow.kpiRating.startsWith('B') ? 'bg-yellow-500 text-white' :
                totalBranchRow.kpiRating.startsWith('C') ? 'bg-orange-500 text-white' :
                totalBranchRow.kpiRating.startsWith('D') ? 'bg-red-500 text-white' :
                totalBranchRow.kpiRating.startsWith('E') ? 'bg-red-700 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {totalBranchRow.kpiRating}
              </span>
            </td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.kpiScore}</td>
          </tr>
        )}

        {/* Section Divider: REGIONALs */}
        <tr className="bg-gray-300">
          <td colSpan={5} className="border border-gray-400 px-1 py-0.5 text-center" style={{ fontSize: '9px' }}>REGIONAL SUMMARY</td>
        </tr>

        {/* REGIONAL Rows */}
        {regionalRows.map((row, index) => (
          <tr key={index} className={`group ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} transition-colors`}>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.bankWiseRank}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.regionRank}</td>
            <td className="border border-gray-300 px-1 py-0.5 group-hover:bg-blue-100">{row.branch}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">
              <span className={`inline-block px-1.5 py-0.5 text-xs ${
                row.kpiRating.startsWith('A+') ? 'bg-green-600 text-white' :
                row.kpiRating.startsWith('A') && !row.kpiRating.includes('+') ? 'bg-green-500 text-white' :
                row.kpiRating.startsWith('B') ? 'bg-yellow-500 text-white' :
                row.kpiRating.startsWith('C') ? 'bg-orange-500 text-white' :
                row.kpiRating.startsWith('D') ? 'bg-red-500 text-white' :
                row.kpiRating.startsWith('E') ? 'bg-red-700 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {row.kpiRating}
              </span>
            </td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.kpiScore}</td>
          </tr>
        ))}

        {/* Section Divider: Detailed Branches */}
        <tr className="bg-gray-300">
          <td colSpan={5} className="border border-gray-400 px-1 py-0.5 text-center" style={{ fontSize: '9px' }}>DETAILED BRANCHES</td>
        </tr>

        {/* Detailed Branch Rows */}
        {detailedBranchRows.map((row, index) => (
          <tr key={index} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors`}>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.bankWiseRank}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.regionRank}</td>
            <td className="border border-gray-300 px-1 py-0.5 group-hover:bg-blue-100">{row.branch}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">
              <span className={`inline-block px-1.5 py-0.5 text-xs ${
                row.kpiRating.startsWith('A+') ? 'bg-green-600 text-white' :
                row.kpiRating.startsWith('A') && !row.kpiRating.includes('+') ? 'bg-green-500 text-white' :
                row.kpiRating.startsWith('B') ? 'bg-yellow-500 text-white' :
                row.kpiRating.startsWith('C') ? 'bg-orange-500 text-white' :
                row.kpiRating.startsWith('D') ? 'bg-red-500 text-white' :
                row.kpiRating.startsWith('E') ? 'bg-red-700 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {row.kpiRating}
              </span>
            </td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.kpiScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}