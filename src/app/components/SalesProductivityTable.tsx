interface SalesProductivityRow {
  branch: string;
  aPlusRating: number;
  aRating: number;
  bRating: number;
  cRating: number;
  dRating: number;
  eRating: number;
  total: number;
  productive: number;
  unProductive: number;
  eniPercentage: string;
}

interface SalesProductivityTableProps {
  data: SalesProductivityRow[];
}

export function SalesProductivityTable({ data }: SalesProductivityTableProps) {
  // Separate TOTAL BRANCH and REGIONALs from detailed branches
  const totalBranchRow = data.find(row => row.branch === 'TOTAL BRANCH');
  const regionalRows = data.filter(row => row.branch.startsWith('REGIONAL'));
  const detailedBranchRows = data.filter(row => !row.branch.startsWith('REGIONAL') && row.branch !== 'TOTAL BRANCH');

  return (
    <table className="w-full border-collapse" style={{ fontSize: '10px' }}>
      <thead className="bg-gray-700 text-white sticky top-0">
        <tr>
          <th className="border border-gray-400 px-1 py-1 text-left" style={{ minWidth: '140px' }}>BRANCH</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '35px' }}>A+</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '35px' }}>A</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '35px' }}>B</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '35px' }}>C</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '35px' }}>D</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '35px' }}>E</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '45px' }}>TTL</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '50px' }}>PROD</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '50px' }}>UNPROD</th>
          <th className="border border-gray-400 px-1 py-1 text-center" style={{ minWidth: '55px' }}>ENI %</th>
        </tr>
      </thead>
      <tbody>
        {/* TOTAL BRANCH */}
        {totalBranchRow && (
          <tr className="bg-blue-100">
            <td className="border border-gray-300 px-1 py-0.5">{totalBranchRow.branch}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.aPlusRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.aRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.bRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.cRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.dRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.eRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.total}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.productive}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.unProductive}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center">{totalBranchRow.eniPercentage}</td>
          </tr>
        )}

        {/* Section Divider: REGIONALs */}
        <tr className="bg-gray-300">
          <td colSpan={11} className="border border-gray-400 px-1 py-0.5 text-center" style={{ fontSize: '9px' }}>REGIONAL SUMMARY</td>
        </tr>

        {/* REGIONAL Rows */}
        {regionalRows.map((row, index) => (
          <tr key={index} className={`group ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} transition-colors`}>
            <td className="border border-gray-300 px-1 py-0.5 group-hover:bg-blue-100">{row.branch}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.aPlusRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.aRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.bRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.cRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.dRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.eRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.total}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.productive}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.unProductive}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.eniPercentage}</td>
          </tr>
        ))}

        {/* Section Divider: Detailed Branches */}
        <tr className="bg-gray-300">
          <td colSpan={11} className="border border-gray-400 px-1 py-0.5 text-center" style={{ fontSize: '9px' }}>DETAILED BRANCHES</td>
        </tr>

        {/* Detailed Branch Rows */}
        {detailedBranchRows.map((row, index) => (
          <tr key={index} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors`}>
            <td className="border border-gray-300 px-1 py-0.5 group-hover:bg-blue-100">{row.branch}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.aPlusRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.aRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.bRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.cRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.dRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.eRating}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.total}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.productive}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.unProductive}</td>
            <td className="border border-gray-300 px-1 py-0.5 text-center group-hover:bg-blue-100">{row.eniPercentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}