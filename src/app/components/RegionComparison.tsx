import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { TrendingUp, TrendingDown, Trophy, X } from 'lucide-react';

interface RegionComparisonProps {
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

interface RegionData {
  id: string;
  name: string;
  code: string;
  kpis: {
    newCASA: { actual: number; target: number; achievement: number; score: number };
    priorityCustomer: { actual: number; target: number; achievement: number; score: number };
    newCooperation: { actual: number; target: number; achievement: number; score: number };
    normalLoan: { actual: number; target: number; achievement: number; score: number };
    timeDeposit: { actual: number; target: number; achievement: number; score: number };
    casaIncrease: { actual: number; target: number; achievement: number; score: number };
    feeWM: { actual: number; target: number; achievement: number; score: number };
    salesProductivity: { actual: number; target: number; achievement: number; score: number };
  };
  totalScore: number;
  rating: string;
  rank: number; // Regional rank out of 7
}

const mockRegions: RegionData[] = [
  {
    id: 'reg-1',
    name: 'REGIONAL I',
    code: 'REG-I',
    totalScore: 11.45,
    rating: 'A',
    rank: 1,
    kpis: {
      newCASA: { actual: 485, target: 920, achievement: 52.7, score: 26.35 },
      priorityCustomer: { actual: 520, target: 310, achievement: 167.7, score: 75.0 },
      newCooperation: { actual: 245, target: 220, achievement: 111.4, score: 55.70 },
      normalLoan: { actual: 1850, target: 1500, achievement: 123.3, score: 246.6 },
      timeDeposit: { actual: 980, target: 850, achievement: 115.3, score: 115.3 },
      casaIncrease: { actual: 2350, target: 1200, achievement: 195.8, score: 225.0 },
      feeWM: { actual: 125, target: 95, achievement: 131.6, score: 98.7 },
      salesProductivity: { actual: 68.5, target: 75.0, achievement: 91.3, score: 45.65 },
    }
  },
  {
    id: 'reg-2',
    name: 'REGIONAL II',
    code: 'REG-II',
    totalScore: 10.85,
    rating: 'A',
    rank: 2,
    kpis: {
      newCASA: { actual: 425, target: 880, achievement: 48.3, score: 24.15 },
      priorityCustomer: { actual: 480, target: 290, achievement: 165.5, score: 75.0 },
      newCooperation: { actual: 220, target: 210, achievement: 104.8, score: 52.40 },
      normalLoan: { actual: 1680, target: 1450, achievement: 115.9, score: 231.8 },
      timeDeposit: { actual: 890, target: 820, achievement: 108.5, score: 108.5 },
      casaIncrease: { actual: 2180, target: 1150, achievement: 189.6, score: 225.0 },
      feeWM: { actual: 110, target: 88, achievement: 125.0, score: 93.75 },
      salesProductivity: { actual: 64.2, target: 75.0, achievement: 85.6, score: 42.80 },
    }
  },
  {
    id: 'reg-3',
    name: 'REGIONAL III',
    code: 'REG-III',
    totalScore: 12.15,
    rating: 'A+',
    rank: 3,
    kpis: {
      newCASA: { actual: 530, target: 950, achievement: 55.8, score: 27.90 },
      priorityCustomer: { actual: 565, target: 330, achievement: 171.2, score: 75.0 },
      newCooperation: { actual: 268, target: 230, achievement: 116.5, score: 58.25 },
      normalLoan: { actual: 1980, target: 1550, achievement: 127.7, score: 255.4 },
      timeDeposit: { actual: 1020, target: 870, achievement: 117.2, score: 117.2 },
      casaIncrease: { actual: 2480, target: 1220, achievement: 203.3, score: 225.0 },
      feeWM: { actual: 135, target: 98, achievement: 137.8, score: 103.35 },
      salesProductivity: { actual: 71.8, target: 75.0, achievement: 95.7, score: 47.85 },
    }
  },
  {
    id: 'reg-4',
    name: 'REGIONAL IV',
    code: 'REG-IV',
    totalScore: 9.75,
    rating: 'B',
    rank: 4,
    kpis: {
      newCASA: { actual: 380, target: 850, achievement: 44.7, score: 22.35 },
      priorityCustomer: { actual: 420, target: 270, achievement: 155.6, score: 75.0 },
      newCooperation: { actual: 195, target: 200, achievement: 97.5, score: 48.75 },
      normalLoan: { actual: 1520, target: 1400, achievement: 108.6, score: 217.2 },
      timeDeposit: { actual: 820, target: 800, achievement: 102.5, score: 102.5 },
      casaIncrease: { actual: 1980, target: 1100, achievement: 180.0, score: 225.0 },
      feeWM: { actual: 95, target: 85, achievement: 111.8, score: 83.85 },
      salesProductivity: { actual: 58.3, target: 75.0, achievement: 77.7, score: 38.85 },
    }
  },
  {
    id: 'reg-5',
    name: 'REGIONAL V',
    code: 'REG-V',
    totalScore: 10.25,
    rating: 'A',
    rank: 5,
    kpis: {
      newCASA: { actual: 445, target: 900, achievement: 49.4, score: 24.70 },
      priorityCustomer: { actual: 495, target: 300, achievement: 165.0, score: 75.0 },
      newCooperation: { actual: 228, target: 215, achievement: 106.0, score: 53.00 },
      normalLoan: { actual: 1720, target: 1480, achievement: 116.2, score: 232.4 },
      timeDeposit: { actual: 920, target: 840, achievement: 109.5, score: 109.5 },
      casaIncrease: { actual: 2220, target: 1180, achievement: 188.1, score: 225.0 },
      feeWM: { actual: 115, target: 90, achievement: 127.8, score: 95.85 },
      salesProductivity: { actual: 66.5, target: 75.0, achievement: 88.7, score: 44.35 },
    }
  },
];

const kpiLabels = [
  { key: 'newCASA', label: 'New CASA', unit: 'Number', weight: 50 },
  { key: 'priorityCustomer', label: 'Priority Customer', unit: 'Number', weight: 50 },
  { key: 'newCooperation', label: 'New Cooperation', unit: 'Number', weight: 50 },
  { key: 'normalLoan', label: 'Normal Loan', unit: 'Bill Rp', weight: 200 },
  { key: 'timeDeposit', label: 'Time Deposit', unit: 'Bill Rp', weight: 100 },
  { key: 'casaIncrease', label: 'CASA Increase', unit: 'Bill Rp', weight: 150 },
  { key: 'feeWM', label: 'Fee Based Income (WM)', unit: 'Bill Rp', weight: 75 },
  { key: 'salesProductivity', label: 'Sales Productivity', unit: '%', weight: 50 },
];

export function RegionComparison({ unreadNotificationsCount = 0, onNotificationClick }: RegionComparisonProps) {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const handleToggleRegion = (regionId: string) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions(selectedRegions.filter(id => id !== regionId));
    } else {
      if (selectedRegions.length < 3) {
        setSelectedRegions([...selectedRegions, regionId]);
      }
    }
  };

  const selectedRegionData = selectedRegions.map(id => mockRegions.find(r => r.id === id)!).filter(Boolean);

  const getRatingColor = (rating: string) => {
    if (rating === 'A+') return 'from-green-600 to-emerald-700';
    if (rating === 'A') return 'from-green-500 to-green-600';
    if (rating === 'B') return 'from-yellow-500 to-orange-500';
    if (rating === 'C') return 'from-orange-500 to-red-500';
    return 'from-red-600 to-red-700';
  };

  const getBestRegion = (kpiKey: string) => {
    const scores = selectedRegionData.map(r => ({
      id: r.id,
      score: (r.kpis as any)[kpiKey].achievement
    }));
    const maxScore = Math.max(...scores.map(s => s.score));
    return scores.find(s => s.score === maxScore)?.id;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <PageHeader
        title="Region Comparison"
        subtitle="Side-by-side Regional Performance Analysis"
        icon={TrendingUp}
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
                  {selectedRegions.length === 0 ? (
                    <span className="text-xs text-gray-400 italic">No regions selected</span>
                  ) : (
                    selectedRegionData.map((region) => (
                      <div
                        key={region.id}
                        className={`px-2 py-1 bg-gradient-to-r ${getRatingColor(region.rating)} text-white rounded text-xs flex items-center gap-1.5 shadow-sm`}
                      >
                        <span>{region.name}</span>
                        <button
                          onClick={() => handleToggleRegion(region.id)}
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
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-xs hover:shadow-lg transition-all"
              >
                Select Regions
              </button>
            </div>
          </div>

          {selectedRegions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500 mb-3">No regions selected for comparison</p>
              <button
                onClick={() => setIsSelectModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm hover:shadow-lg transition-all"
              >
                Select Regions to Compare
              </button>
            </div>
          ) : (
            <>
              {/* Overall Score Comparison */}
              <div className="grid gap-2" style={{ gridTemplateColumns: `132px repeat(${selectedRegionData.length}, 1fr)` }}>
                {/* Empty space for KPI column */}
                <div></div>
                {selectedRegionData.map((region) => (
                  <div
                    key={region.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${getRatingColor(region.rating)} text-white p-1.5 text-center`}>
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Trophy className="w-3 h-3" />
                        <h3 className="text-[11px]">{region.name}</h3>
                      </div>
                      <div className="text-xl mb-0.5">{region.totalScore}</div>
                      <div className="text-[9px] opacity-90 mb-0.5">Rating: {region.rating}</div>
                      <div className="text-[8px] opacity-80">Rank: #{region.rank} of 7</div>
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
                        {selectedRegionData.map((region) => (
                          <th key={region.id} className="px-2 py-1 text-center">
                            <div className={`inline-block px-1.5 py-0.5 rounded text-[9px] bg-gradient-to-r ${getRatingColor(region.rating)} text-white`}>
                              {region.code}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {kpiLabels.map((kpi) => {
                        const bestRegionId = getBestRegion(kpi.key);
                        return (
                          <tr key={kpi.key} className="hover:bg-gray-50">
                            <td className="px-2 py-1.5 text-[10px] bg-white">
                              <div className="text-gray-900">{kpi.label}</div>
                              <div className="text-gray-400">W:{kpi.weight}</div>
                            </td>
                            {selectedRegionData.map((region) => {
                              const kpiData = (region.kpis as any)[kpi.key];
                              const isBest = region.id === bestRegionId;
                              return (
                                <td key={region.id} className="px-2 py-1.5 text-center bg-white">
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

      {/* Region Selection Modal */}
      {isSelectModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl">Select Regions to Compare</h2>
              <button
                onClick={() => setIsSelectModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Select 1-3 regions to compare. Currently selected: {selectedRegions.length}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {mockRegions.map((region) => {
                  const isSelected = selectedRegions.includes(region.id);
                  const canSelect = selectedRegions.length < 3 || isSelected;
                  return (
                    <button
                      key={region.id}
                      onClick={() => canSelect && handleToggleRegion(region.id)}
                      disabled={!canSelect}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : canSelect
                          ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-900">{region.name}</span>
                            <span className={`px-2 py-0.5 rounded text-xs bg-gradient-to-r ${getRatingColor(region.rating)} text-white`}>
                              {region.rating}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Score: {region.totalScore}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
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
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
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