import { useState, useMemo } from 'react';
import { Search, Trophy, ChevronDown, ChevronRight, X } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { allKPIResultData } from '../../data/allKPIResultData';

interface RankingsScreenProps {
  onBack: () => void;
  notificationCount?: number;
  onNavigate?: (screen: string) => void;
}

export function RankingsScreen({ onBack, notificationCount, onNavigate }: RankingsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedRegions, setCollapsedRegions] = useState<Set<string>>(new Set());
  const [selectedBranch, setSelectedBranch] = useState<any>(null);

  // Current user info (Siti Jamila from Jakarta Pusat)
  const currentUserBranch = 'JAKARTA PUSAT';
  const currentUserRegion = 'REGIONAL I';
  
  // Group branches by region
  const branchesByRegion = useMemo(() => {
    const grouped: { [key: string]: any[] } = {};
    
    allKPIResultData
      .filter(item => item.no !== '-' && item.no !== '' && item.branchCode !== '~')
      .forEach((item, index) => {
        const branch = {
          rank: index + 1,
          name: item.branch,
          region: item.region,
          branchCode: item.branchCode,
          branchType: item.branchType,
          score: parseFloat(item.finalScore),
          rating: item.rating,
          bankwideRank: item.bankwideRank,
          isCurrentUser: item.branch === currentUserBranch,
          isCurrentRegion: item.region === currentUserRegion,
          // ALL KPI DATA for details (116 columns!)
          kpiData: item
        };

        if (!grouped[item.region]) {
          grouped[item.region] = [];
        }
        grouped[item.region].push(branch);
      });

    // Sort branches within each region by score
    Object.keys(grouped).forEach(region => {
      grouped[region].sort((a, b) => b.score - a.score);
      // Assign regional rank
      grouped[region].forEach((branch, idx) => {
        branch.regionalRank = idx + 1;
      });
    });

    return grouped;
  }, []);

  const regions = Object.keys(branchesByRegion).sort();

  // Calculate region totals
  const regionTotals = useMemo(() => {
    const totals: { [key: string]: number } = {};
    regions.forEach(region => {
      const branches = branchesByRegion[region];
      totals[region] = branches.reduce((sum, b) => sum + b.score, 0) / branches.length;
    });
    return totals;
  }, [branchesByRegion, regions]);

  const toggleRegion = (region: string) => {
    setCollapsedRegions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(region)) {
        newSet.delete(region);
      } else {
        newSet.add(region);
      }
      return newSet;
    });
  };

  const filteredBranchesByRegion = useMemo(() => {
    if (!searchQuery) return branchesByRegion;

    const filtered: { [key: string]: any[] } = {};
    regions.forEach(region => {
      const branches = branchesByRegion[region].filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.branchCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (branches.length > 0) {
        filtered[region] = branches;
      }
    });
    return filtered;
  }, [branchesByRegion, searchQuery, regions]);

  const BranchDetailModal = ({ branch, onClose }: { branch: any; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'customer' | 'financial' | 'learning' | 'additional' | 'compliance'>('overview');
    const kpi = branch.kpiData;

    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white w-full max-w-md h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Score Summary - Combined */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 pt-3 pb-2">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{branch.name}</h3>
                  <p className="text-[10px] opacity-90">{branch.region} • {branch.branchType}</p>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded -mt-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Score Summary inside header */}
              <div className="grid grid-cols-4 gap-2 text-center mt-2">
                <div>
                  <p className="text-[9px] opacity-80 mb-0.5">Bankwide</p>
                  <p className="text-base font-bold">#{branch.rank}</p>
                </div>
                <div>
                  <p className="text-[9px] opacity-80 mb-0.5">Regional</p>
                  <p className="text-base font-bold">#{branch.regionalRank}</p>
                </div>
                <div>
                  <p className="text-[9px] opacity-80 mb-0.5">Score</p>
                  <p className="text-base font-bold">{branch.score.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[9px] opacity-80 mb-0.5">Rating</p>
                  <div className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                    branch.rating === 'A+' ? 'bg-green-100 text-green-700' :
                    branch.rating === 'A' ? 'bg-blue-100 text-blue-700' :
                    branch.rating === 'B+' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {branch.rating}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200 overflow-x-auto">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2.5 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('customer')}
                  className={`px-3 py-2.5 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === 'customer'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Customer (3)
                </button>
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`px-3 py-2.5 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === 'financial'
                      ? 'border-green-600 text-green-600 bg-green-50/50'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Financial (8)
                </button>
                <button
                  onClick={() => setActiveTab('learning')}
                  className={`px-3 py-2.5 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === 'learning'
                      ? 'border-purple-600 text-purple-600 bg-purple-50/50'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Learning (2)
                </button>
                <button
                  onClick={() => setActiveTab('additional')}
                  className={`px-3 py-2.5 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === 'additional'
                      ? 'border-orange-600 text-orange-600 bg-orange-50/50'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Additional (3)
                </button>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className={`px-3 py-2.5 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === 'compliance'
                      ? 'border-red-600 text-red-600 bg-red-50/50'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Compliance (2)
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content - Scrollable with proper padding */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-4 space-y-2 pb-6">{/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-2">
                <div className="bg-white rounded-lg border border-gray-200 p-3">
                  <h4 className="text-xs font-semibold text-gray-900 mb-2">Branch Information</h4>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch Code:</span>
                      <span className="font-medium text-gray-900">{branch.branchCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch Type:</span>
                      <span className="font-medium text-gray-900">{branch.branchType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium text-gray-900">{branch.region}</span>
                    </div>
                    {branch.bankwideRank && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bankwide Rank:</span>
                        <span className="font-medium text-gray-900">{branch.bankwideRank}</span>
                      </div>
                    )}
                  </div>
                </div>

                {branch.isCurrentUser && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-900 font-semibold mb-1">🎯 Your Branch</p>
                    <p className="text-[10px] text-yellow-800">
                      This is your branch. Keep up the great work!
                    </p>
                  </div>
                )}

                {!branch.isCurrentUser && branch.isCurrentRegion && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900 font-semibold mb-1">📍 Same Region</p>
                    <p className="text-[10px] text-blue-800">
                      This branch is in your region ({currentUserRegion})
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CUSTOMER TAB */}
            {activeTab === 'customer' && (
              <div className="space-y-2">
                <KPICard title="New to CASA/Digital Account" data={kpi.newCASA} color="blue" />
                <KPICard title="Number of Priority Customer" data={kpi.priorityCustomer} color="blue" />
                <KPICard title="New Cooperation (Payroll/Others)" data={kpi.newCooperation} color="blue" />
              </div>
            )}

            {/* FINANCIAL TAB */}
            {activeTab === 'financial' && (
              <div className="space-y-2">
                <KPICard title="NIM" data={kpi.nim} color="green" />
                <KPICard title="Normal Loan" data={kpi.normalLoan} color="green" />
                <KPICard title="Time Deposit" data={kpi.timeDeposit} color="green" />
                <KPICard title="CASA Increase" data={kpi.casaIncrease} color="green" />
                <KPICard title="Fee WM" data={kpi.feeWM} color="green" />
                <KPICard title="Fee Non-WM" data={kpi.feeNonWM} color="green" />
                <KPICard title="PPOP" data={kpi.ppop} color="green" />
                <KPICard title="Coll 2" data={kpi.coll2} color="green" />
              </div>
            )}

            {/* LEARNING & LEADERSHIP TAB */}
            {activeTab === 'learning' && (
              <div className="space-y-2">
                <KPICard title="Strategic Campaign" data={kpi.strategicCampaign} color="purple" />
                <KPICard title="Sales Productivity" data={kpi.salesProductivity} color="purple" />
              </div>
            )}

            {/* ADDITIONAL POINT TAB */}
            {activeTab === 'additional' && (
              <div className="space-y-2">
                <KPICard title="NPL Reduction" data={kpi.nplReduction} color="orange" />
                <KPICard title="Cross Selling" data={kpi.crossSelling} color="orange" />
                <KPICard title="Special Booster" data={kpi.specialBooster} color="orange" />
              </div>
            )}

            {/* COMPLIANCE & FRAUD TAB */}
            {activeTab === 'compliance' && (
              <div className="space-y-2">
                <KPICard title="Zero Fraud" data={kpi.zeroFraud} color="red" />
                <KPICard title="Compliance Index" data={kpi.complianceIndex} color="red" />
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KPICard = ({ title, data, color }: { title: string; data: any; color: string }) => {
    const colorClasses = {
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50',
      purple: 'border-purple-200 bg-purple-50',
      orange: 'border-orange-200 bg-orange-50',
      red: 'border-red-200 bg-red-50'
    };

    const achievementNum = parseFloat(data.achievement);
    const achievementColor = 
      achievementNum >= 100 ? 'text-green-700' :
      achievementNum >= 80 ? 'text-blue-700' :
      achievementNum >= 60 ? 'text-yellow-700' :
      'text-red-700';

    return (
      <div className={`border rounded-lg p-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <h5 className="text-[11px] font-semibold text-gray-900 mb-2.5">{title}</h5>
        
        {/* Line 1: Actual | Target | Achievement */}
        <div className="flex items-center justify-between mb-2 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Actual:</span>
            <span className="font-bold text-gray-900">{data.actual}</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Target:</span>
            <span className="font-bold text-gray-900">{data.target}</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Achv:</span>
            <span className={`font-bold ${achievementColor}`}>{data.achievement}</span>
          </div>
        </div>

        {/* Line 2: Weight | Weight Cap | Score */}
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Weight:</span>
            <span className="font-medium text-gray-700">{data.weight}</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Cap:</span>
            <span className="font-medium text-gray-700">{data.weightCap}</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Score:</span>
            <span className="font-bold text-gray-900">{data.score}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader 
        title="Rankings" 
        showBack={true} 
        onBack={onBack}
        showNotification={true}
        showProfile={true}
        notificationCount={notificationCount}
        onNavigate={onNavigate}
      />

      <div className="p-3 space-y-2">
        {/* Stats Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-3 text-white shadow-md">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[9px] opacity-80 mb-0.5">Total Branches</p>
              <p className="text-lg font-bold">{allKPIResultData.filter(item => item.no !== '-' && item.no !== '' && item.branchCode !== '~').length}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-80 mb-0.5">Regions</p>
              <p className="text-lg font-bold">{regions.length}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-80 mb-0.5">Your Rank</p>
              <p className="text-lg font-bold">
                {branchesByRegion[currentUserRegion]?.find(b => b.isCurrentUser)?.regionalRank || '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search branches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Region-Based List (Like Desktop AllKPIResult) */}
        <div className="space-y-2">{regions.map(region => {
            const branches = filteredBranchesByRegion[region] || [];
            if (branches.length === 0) return null;

            const isCollapsed = collapsedRegions.has(region);
            const isCurrentRegion = region === currentUserRegion;
            const regionAvg = regionTotals[region];

            return (
              <div key={region} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Region Header */}
                <button
                  onClick={() => toggleRegion(region)}
                  className={`w-full px-3 py-2 flex items-center justify-between bg-gray-50 border-b border-gray-200`}
                >
                  <div className="flex items-center gap-2">
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                    <div className="text-left">
                      <p className="text-[11px] font-semibold text-gray-900">
                        {region}
                      </p>
                      <p className="text-[9px] text-gray-600">
                        {branches.length} branches • Avg: {regionAvg.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Trophy className="w-4 h-4 text-gray-400" />
                </button>

                {/* Branch List */}
                {!isCollapsed && (
                  <div className="divide-y divide-gray-100">
                    {branches.map((branch, index) => {
                      const isTop3 = branch.regionalRank <= 3;
                      const isCurrentUser = branch.isCurrentUser;

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedBranch(branch)}
                          className={`w-full px-3 py-2.5 text-left hover:bg-gray-50 transition-colors relative ${
                            isCurrentUser ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-[6px] border-yellow-500 shadow-sm' :
                            isTop3 ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          {/* Your Branch Star Badge */}
                          {isCurrentUser && (
                            <div className="absolute top-1 right-1">
                              <span className="text-yellow-500 text-lg">⭐</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            {/* Rank Badge */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold shadow-sm ${
                              isCurrentUser ? 'bg-yellow-500 text-white ring-2 ring-yellow-400' :
                              isTop3 ? 'bg-blue-600 text-white' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {branch.regionalRank === 1 ? '🥇' :
                               branch.regionalRank === 2 ? '🥈' :
                               branch.regionalRank === 3 ? '🥉' :
                               `#${branch.regionalRank}`}
                            </div>

                            {/* Branch Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-0.5">
                                <p className={`text-[11px] truncate ${isCurrentUser ? 'text-yellow-900 font-bold' : 'text-gray-900'}`}>
                                  {branch.name}
                                  {isCurrentUser && <span className="text-yellow-600 text-[10px] ml-1.5 font-semibold">(Your Branch)</span>}
                                </p>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                                  branch.rating === 'A+' ? 'bg-green-100 text-green-700' :
                                  branch.rating === 'A' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {branch.rating}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between text-[9px]">
                                <span className="text-gray-500">{branch.branchType}</span>
                                <span className={`font-bold ${isCurrentUser ? 'text-yellow-600' : 'text-gray-900'}`}>
                                  {branch.score.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}</div>

        {Object.keys(filteredBranchesByRegion).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No branches found</p>
          </div>
        )}
      </div>

      {/* Branch Detail Modal */}
      {selectedBranch && (
        <BranchDetailModal branch={selectedBranch} onClose={() => setSelectedBranch(null)} />
      )}
    </div>
  );
}