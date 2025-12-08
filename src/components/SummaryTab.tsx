import { TrendingUp, Award, Trophy, MessageSquare, CheckCircle, Minus, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SummaryTabProps {
  totalPoints: number;
  currentMonthData: any;
  personalRankings: any[];
  topCrossSellingProducts: any[];
  branchTopPerformers: any[];
  crossSellingSalesHistory: any[];
  currentEmployee: any;
  myDetailedKPIMetrics: any[];
  overallPerf: any;
  onKPIClick: (kpiName: string) => void;
  getUnreadCountForKPI: (kpiName: string) => number;
}

export function SummaryTab({
  totalPoints,
  currentMonthData,
  personalRankings,
  topCrossSellingProducts,
  branchTopPerformers,
  crossSellingSalesHistory,
  currentEmployee,
  myDetailedKPIMetrics,
  overallPerf,
  onKPIClick,
  getUnreadCountForKPI,
}: SummaryTabProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'warning': return <Minus className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl mt-1 text-blue-600">{totalPoints.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Achievement</p>
              <p className="text-2xl mt-1 text-green-600">{currentMonthData.achievement}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Branch Rank</p>
              <p className="text-2xl mt-1 text-orange-600">#{personalRankings[0].rank}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products Sold</p>
              <p className="text-2xl mt-1 text-purple-600">
                {topCrossSellingProducts.reduce((sum, p) => sum + p.count, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 16 KPI Detailed Performance Table with Comments - MOVED TO TOP */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 flex items-center justify-between">
          <div>
            <h3 className="text-base">📊 Detailed KPI Performance - December 2025</h3>
            <p className="text-[10px] opacity-90 mt-0.5">Click on any KPI to view supervisor comments and provide updates</p>
          </div>
          <div className="text-right bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <p className="text-[10px] opacity-90">Overall</p>
            <p className="text-xl">{overallPerf.overallAchievement}%</p>
          </div>
        </div>
        
        <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200 grid grid-cols-4 gap-2 text-center">
          <div className="bg-white rounded p-1.5 shadow-sm">
            <p className="text-[10px] text-gray-600">Excellent</p>
            <p className="text-base text-green-600">{overallPerf.excellentCount}</p>
          </div>
          <div className="bg-white rounded p-1.5 shadow-sm">
            <p className="text-[10px] text-gray-600">Good</p>
            <p className="text-base text-blue-600">{overallPerf.goodCount}</p>
          </div>
          <div className="bg-white rounded p-1.5 shadow-sm">
            <p className="text-[10px] text-gray-600">Warning</p>
            <p className="text-base text-yellow-600">{overallPerf.warningCount}</p>
          </div>
          <div className="bg-white rounded p-1.5 shadow-sm">
            <p className="text-[10px] text-gray-600">Critical</p>
            <p className="text-base text-red-600">{overallPerf.criticalCount}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-3 py-2 text-left">KPI Metric</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-center">Actual</th>
                <th className="px-3 py-2 text-center">Target</th>
                <th className="px-3 py-2 text-center">Achievement</th>
                <th className="px-3 py-2 text-center">Points</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-center">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myDetailedKPIMetrics.map((kpi, index) => {
                const unreadCount = getUnreadCountForKPI(kpi.kpiName);
                return (
                  <tr 
                    key={index} 
                    className={`hover:bg-blue-50 transition-colors cursor-pointer ${
                      kpi.status === 'critical' ? 'bg-red-50' : 
                      kpi.status === 'warning' ? 'bg-yellow-50' : 
                      kpi.status === 'excellent' ? 'bg-green-50' : ''
                    }`}
                    onClick={() => onKPIClick(kpi.kpiName)}
                  >
                    <td className="px-3 py-1.5 text-gray-900">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(kpi.status)}
                        <span className="text-xs">{kpi.kpiName}</span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-gray-600 text-[10px]">{kpi.category}</td>
                    <td className="px-3 py-1.5 text-center text-gray-900 text-xs">
                      {kpi.actual.toLocaleString()} {kpi.unit}
                    </td>
                    <td className="px-3 py-1.5 text-center text-gray-600 text-xs">
                      {kpi.target.toLocaleString()} {kpi.unit}
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        kpi.status === 'excellent' ? 'bg-green-100 text-green-700' :
                        kpi.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        kpi.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {kpi.achievement}%
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-center text-gray-900 text-xs">
                      {kpi.points} / {kpi.maxPoints}
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${
                        kpi.status === 'excellent' ? 'bg-green-200 text-green-800' :
                        kpi.status === 'good' ? 'bg-blue-200 text-blue-800' :
                        kpi.status === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {kpi.status}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      <button 
                        className="relative flex items-center justify-center gap-1 text-gray-600 hover:text-blue-600 transition-colors mx-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          onKPIClick(kpi.kpiName);
                        }}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs">{kpi.commentCount}</span>
                        {unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                            {unreadCount}
                          </div>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compact Charts Section - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cross-Selling Product Composition - Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm text-gray-900 mb-3">Cross-Selling Product Composition</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topCrossSellingProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Count" />
              <Bar dataKey="points" fill="#8b5cf6" name="Points" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers - Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm text-gray-900 mb-3">TOP 3 SALES PERFORMERS</h3>
          <div className="space-y-2">
            {branchTopPerformers.map((performer) => (
              <div
                key={performer.rank}
                className={`p-3 rounded-lg border ${
                  performer.name === currentEmployee.name
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        performer.rank === 1
                          ? 'bg-yellow-400 text-white'
                          : performer.rank === 2
                          ? 'bg-gray-300 text-white'
                          : 'bg-orange-400 text-white'
                      }`}
                    >
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-900">
                        {performer.name}
                        {performer.name === currentEmployee.name && (
                          <span className="ml-1 text-xs text-blue-600">(You)</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-600">{performer.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-900">{performer.points} pts</p>
                    <p className="text-xs text-green-600">{performer.achievement}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-Selling Sales History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3">
          <h3 className="text-lg">This Month&apos;s Active Cross Selling Sales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left"># Cross Selling</th>
                <th className="px-4 py-3 text-center">Total Active Cross-Selling Sales</th>
                <th className="px-4 py-3 text-center">Jan</th>
                <th className="px-4 py-3 text-center">Feb</th>
                <th className="px-4 py-3 text-center">Mar</th>
                <th className="px-4 py-3 text-center">Apr</th>
                <th className="px-4 py-3 text-center">May</th>
                <th className="px-4 py-3 text-center">Jun</th>
                <th className="px-4 py-3 text-center">Jul</th>
                <th className="px-4 py-3 text-center">Aug</th>
                <th className="px-4 py-3 text-center">Sep</th>
                <th className="px-4 py-3 text-center">Oct</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {crossSellingSalesHistory.map((history, index) => {
                const total = history.jan + history.feb + history.mar + history.apr + history.may + history.jun + history.jul + history.aug + history.sep + history.oct;
                return (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900">{history.productCombination}</td>
                    <td className="px-4 py-3 text-center text-gray-900">{total}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.jan}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.feb}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.mar}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.apr}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.may}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.jun}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.jul}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.aug}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{history.sep}</td>
                    <td className="px-4 py-3 text-center text-gray-600 bg-blue-50">{history.oct}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}