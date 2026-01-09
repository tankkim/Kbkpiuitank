import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { TrendingUp, TrendingDown, Trophy, X, Building2 } from 'lucide-react';

interface BranchComparisonProps {
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

interface BranchData {
  id: string;
  name: string;
  code: string;
  region: string;
  kpis: {
    newCASA: { actual: number; target: number; achievement: number; score: number };
    priorityCustomer: { actual: number; target: number; achievement: number; score: number };
    newCooperation: { actual: number; target: number; achievement: number; score: number };
    casaIncrease: { actual: number; target: number; achievement: number; score: number };
    salesProductivity: { actual: number; target: number; achievement: number; score: number };
    crossSelling: { actual: number; target: number; achievement: number; score: number };
  };
  totalScore: number;
  rating: string;
  regionRank: number; // Rank within the region
  bankwideRank: number; // Rank across all branches
}

const mockBranches: BranchData[] = [
  {
    id: 'br-1',
    name: 'JAKARTA PUSAT',
    code: 'JKT-001',
    region: 'REGIONAL I',
    totalScore: 11.95,
    rating: 'A',
    regionRank: 1,
    bankwideRank: 1,
    kpis: {
      newCASA: { actual: 52, target: 105, achievement: 49.5, score: 24.75 },
      priorityCustomer: { actual: 61, target: 36, achievement: 169.4, score: 75.0 },
      newCooperation: { actual: 45, target: 38, achievement: 118.4, score: 59.21 },
      casaIncrease: { actual: 1920, target: 980, achievement: 195.9, score: 225.0 },
      salesProductivity: { actual: 65.2, target: 75.0, achievement: 86.9, score: 43.47 },
      crossSelling: { actual: 78, target: 145, achievement: 53.8, score: 53.8 },
    }
  },
  {
    id: 'br-2',
    name: 'JAKARTA SELATAN',
    code: 'JKT-002',
    region: 'REGIONAL I',
    totalScore: 10.65,
    rating: 'A',
    regionRank: 2,
    bankwideRank: 2,
    kpis: {
      newCASA: { actual: 48, target: 100, achievement: 48.0, score: 24.0 },
      priorityCustomer: { actual: 55, target: 34, achievement: 161.8, score: 75.0 },
      newCooperation: { actual: 38, target: 36, achievement: 105.6, score: 52.78 },
      casaIncrease: { actual: 1785, target: 920, achievement: 194.0, score: 225.0 },
      salesProductivity: { actual: 61.5, target: 75.0, achievement: 82.0, score: 41.0 },
      crossSelling: { actual: 65, target: 132, achievement: 49.2, score: 49.2 },
    }
  },
  {
    id: 'br-3',
    name: 'TANGERANG',
    code: 'TNG-001',
    region: 'REGIONAL I',
    totalScore: 12.35,
    rating: 'A+',
    regionRank: 3,
    bankwideRank: 3,
    kpis: {
      newCASA: { actual: 68, target: 115, achievement: 59.1, score: 29.57 },
      priorityCustomer: { actual: 78, target: 42, achievement: 185.7, score: 75.0 },
      newCooperation: { actual: 52, target: 42, achievement: 123.8, score: 61.90 },
      casaIncrease: { actual: 2180, target: 1050, achievement: 207.6, score: 225.0 },
      salesProductivity: { actual: 72.8, target: 75.0, achievement: 97.1, score: 48.53 },
      crossSelling: { actual: 92, target: 158, achievement: 58.2, score: 58.2 },
    }
  },
  {
    id: 'br-4',
    name: 'BANDUNG DAGO',
    code: 'BDG-001',
    region: 'REGIONAL II',
    totalScore: 10.25,
    rating: 'A',
    regionRank: 1,
    bankwideRank: 4,
    kpis: {
      newCASA: { actual: 45, target: 95, achievement: 47.4, score: 23.68 },
      priorityCustomer: { actual: 52, target: 32, achievement: 162.5, score: 75.0 },
      newCooperation: { actual: 35, target: 34, achievement: 102.9, score: 51.47 },
      casaIncrease: { actual: 1680, target: 890, achievement: 188.8, score: 225.0 },
      salesProductivity: { actual: 63.5, target: 75.0, achievement: 84.7, score: 42.33 },
      crossSelling: { actual: 58, target: 128, achievement: 45.3, score: 45.3 },
    }
  },
  {
    id: 'br-5',
    name: 'SURABAYA TUNJUNGAN',
    code: 'SBY-001',
    region: 'REGIONAL III',
    totalScore: 11.75,
    rating: 'A',
    regionRank: 1,
    bankwideRank: 5,
    kpis: {
      newCASA: { actual: 58, target: 108, achievement: 53.7, score: 26.85 },
      priorityCustomer: { actual: 68, target: 38, achievement: 178.9, score: 75.0 },
      newCooperation: { actual: 48, target: 40, achievement: 120.0, score: 60.0 },
      casaIncrease: { actual: 2050, target: 1020, achievement: 201.0, score: 225.0 },
      salesProductivity: { actual: 69.2, target: 75.0, achievement: 92.3, score: 46.13 },
      crossSelling: { actual: 82, target: 152, achievement: 53.9, score: 53.9 },
    }
  },
  {
    id: 'br-6',
    name: 'JAKARTA SUDIRAYA',
    code: 'JKT-004',
    region: 'REGIONAL I',
    totalScore: 9.85,
    rating: 'B',
    regionRank: 4,
    bankwideRank: 6,
    kpis: {
      newCASA: { actual: 42, target: 98, achievement: 42.9, score: 21.43 },
      priorityCustomer: { actual: 48, target: 31, achievement: 154.8, score: 75.0 },
      newCooperation: { actual: 32, target: 35, achievement: 91.4, score: 45.71 },
      casaIncrease: { actual: 1580, target: 880, achievement: 179.5, score: 225.0 },
      salesProductivity: { actual: 58.5, target: 75.0, achievement: 78.0, score: 39.0 },
      crossSelling: { actual: 52, target: 125, achievement: 41.6, score: 41.6 },
    }
  },
  {
    id: 'br-7',
    name: 'MALANG',
    code: 'MLG-001',
    region: 'REGIONAL III',
    totalScore: 10.45,
    rating: 'A',
    regionRank: 2,
    bankwideRank: 7,
    kpis: {
      newCASA: { actual: 38, target: 85, achievement: 44.7, score: 22.35 },
      priorityCustomer: { actual: 45, target: 28, achievement: 160.7, score: 75.0 },
      newCooperation: { actual: 28, target: 30, achievement: 93.3, score: 46.67 },
      casaIncrease: { actual: 1420, target: 820, achievement: 173.2, score: 225.0 },
      salesProductivity: { actual: 64.8, target: 75.0, achievement: 86.4, score: 43.2 },
      crossSelling: { actual: 48, target: 115, achievement: 41.7, score: 41.7 },
    }
  },
];

const kpiLabels = [
  { key: 'newCASA', label: 'New CASA', unit: 'Number', weight: 50 },
  { key: 'priorityCustomer', label: 'Priority Customer', unit: 'Number', weight: 50 },
  { key: 'newCooperation', label: 'New Cooperation', unit: 'Number', weight: 50 },
  { key: 'casaIncrease', label: 'CASA Increase', unit: 'Bill Rp', weight: 150 },
  { key: 'salesProductivity', label: 'Sales Productivity', unit: '%', weight: 50 },
  { key: 'crossSelling', label: 'Cross Selling', unit: 'Point', weight: 100 },
];

export function BranchComparison({ unreadNotificationsCount = 0, onNotificationClick }: BranchComparisonProps) {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const handleToggleBranch = (branchId: string) => {
    if (selectedBranches.includes(branchId)) {
      setSelectedBranches(selectedBranches.filter(id => id !== branchId));
    } else {
      if (selectedBranches.length < 3) {
        setSelectedBranches([...selectedBranches, branchId]);
      }
    }
  };

  const selectedBranchData = selectedBranches.map(id => mockBranches.find(b => b.id === id)!).filter(Boolean);

  const filteredBranches = filterRegion === 'all' 
    ? mockBranches 
    : mockBranches.filter(b => b.region === filterRegion);

  const getRatingColor = (rating: string) => {
    if (rating === 'A+') return 'from-green-600 to-emerald-700';
    if (rating === 'A') return 'from-green-500 to-green-600';
    if (rating === 'B') return 'from-yellow-500 to-orange-500';
    if (rating === 'C') return 'from-orange-500 to-red-500';
    return 'from-red-600 to-red-700';
  };

  const getBestBranch = (kpiKey: string) => {
    const scores = selectedBranchData.map(b => ({
      id: b.id,
      score: (b.kpis as any)[kpiKey].achievement
    }));
    const maxScore = Math.max(...scores.map(s => s.score));
    return scores.find(s => s.score === maxScore)?.id;
  };

  const regions = ['REGIONAL I', 'REGIONAL II', 'REGIONAL III', 'REGIONAL IV', 'REGIONAL V', 'REGIONAL VI', 'REGIONAL VII'];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <PageHeader
        title="Branch Comparison"
        subtitle="Side-by-side Branch Performance Analysis"
        icon={Building2}
        unreadNotificationsCount={unreadNotificationsCount}
        onNotificationClick={onNotificationClick}
      />

      <div className="flex-1 overflow-auto p-3">
        <div className="max-w-[1800px] mx-auto space-y-3">
          {/* Selection Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-700">Comparing:</span>
                <div className="flex gap-1.5">
                  {selectedBranches.length === 0 ? (
                    <span className="text-xs text-gray-400 italic">No branches selected</span>
                  ) : (
                    selectedBranchData.map((branch) => (
                      <div
                        key={branch.id}
                        className={`px-2 py-1 bg-gradient-to-r ${getRatingColor(branch.rating)} text-white rounded text-xs flex items-center gap-1.5 shadow-sm`}
                      >
                        <span>{branch.name}</span>
                        <button
                          onClick={() => handleToggleBranch(branch.id)}
                          className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsSelectModalOpen(true)}
                className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-xs hover:shadow-lg transition-all"
              >
                Select Branches
              </button>
            </div>
          </div>

          {selectedBranches.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500 mb-3">No branches selected for comparison</p>
              <button
                onClick={() => setIsSelectModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm hover:shadow-lg transition-all"
              >
                Select Branches to Compare
              </button>
            </div>
          ) : (
            <>
              {/* Overall Score Comparison */}
              <div className="grid gap-2" style={{ gridTemplateColumns: `132px repeat(${selectedBranchData.length}, 1fr)` }}>
                {/* Empty space for KPI column */}
                <div></div>
                {selectedBranchData.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${getRatingColor(branch.rating)} text-white p-1.5 text-center`}>
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Trophy className="w-3 h-3" />
                        <h3 className="text-[11px]">{branch.name}</h3>
                      </div>
                      <div className="text-[9px] opacity-80 mb-1">{branch.region}</div>
                      <div className="text-xl mb-0.5">{branch.totalScore}</div>
                      <div className="text-[9px] opacity-90 mb-0.5">Rating: {branch.rating}</div>
                      <div className="flex items-center justify-center gap-1.5 text-[8px] opacity-80">
                        <span>R: #{branch.regionRank}</span>
                        <span>•</span>
                        <span>B: #{branch.bankwideRank}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* KPI Comparison - Table Format */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-700 text-white px-3 py-1">
                  <h3 className="text-xs">KPI Performance</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-2 py-1 text-left text-gray-700 w-32">KPI</th>
                        {selectedBranchData.map((branch) => (
                          <th key={branch.id} className="px-2 py-1 text-center">
                            <div className={`inline-block px-1.5 py-0.5 rounded text-[9px] bg-gradient-to-r ${getRatingColor(branch.rating)} text-white`}>
                              {branch.code}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {kpiLabels.map((kpi) => {
                        const bestBranchId = getBestBranch(kpi.key);
                        return (
                          <tr key={kpi.key} className="hover:bg-gray-50">
                            <td className="px-2 py-1.5 text-[10px] bg-white">
                              <div className="text-gray-900">{kpi.label}</div>
                              <div className="text-gray-400">W:{kpi.weight}</div>
                            </td>
                            {selectedBranchData.map((branch) => {
                              const kpiData = (branch.kpis as any)[kpi.key];
                              const isBest = branch.id === bestBranchId;
                              return (
                                <td key={branch.id} className="px-2 py-1.5 text-center bg-white">
                                  <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-0.5 mb-0.5">
                                      <span className={`${isBest ? 'text-green-700' : 'text-gray-900'}`}>
                                        {kpiData.achievement.toFixed(0)}%
                                      </span>
                                      {isBest && <Trophy className="w-2.5 h-2.5 text-green-600" />}
                                    </div>
                                    <div className="text-[8px] text-gray-400 mb-0.5">
                                      {kpiData.actual.toLocaleString()}/{kpiData.target.toLocaleString()}
                                    </div>
                                    <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full ${
                                          kpiData.achievement >= 100 ? 'bg-green-500' : kpiData.achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${Math.min(kpiData.achievement, 100)}%` }}
                                      />
                                    </div>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Branch Selection Modal */}
      {isSelectModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <h2 className="text-xl">Select Branches to Compare</h2>
              <button
                onClick={() => setIsSelectModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Select 1-3 branches to compare. Currently selected: {selectedBranches.length}
                </p>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {filteredBranches.map((branch) => {
                  const isSelected = selectedBranches.includes(branch.id);
                  const canSelect = selectedBranches.length < 3 || isSelected;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => canSelect && handleToggleBranch(branch.id)}
                      disabled={!canSelect}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-green-500 bg-green-50'
                          : canSelect
                          ? 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-900">{branch.name}</span>
                            <span className="text-xs text-gray-500">({branch.code})</span>
                            <span className={`px-2 py-0.5 rounded text-xs bg-gradient-to-r ${getRatingColor(branch.rating)} text-white`}>
                              {branch.rating}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {branch.region} • Score: {branch.totalScore}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsSelectModalOpen(false)}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Apply Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}