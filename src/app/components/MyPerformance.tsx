import { useState, Fragment } from 'react';
import { User, Trophy, TrendingUp, Award, Calendar, MessageSquare, AlertCircle, CheckCircle, Minus, TrendingDown, Bell } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  currentEmployee,
  topCrossSellingProducts,
  monthlyPerformanceData,
  productAchievements,
  branchProductAchievements,
  crossSellingSalesHistory,
  personalRankings,
  branchTopPerformers,
} from '../data/myPerformanceData';
import { myComments } from '../data/communicationData';
import { myDetailedKPIMetrics, calculateOverallPerformance } from '../data/individualKPIData';
import { getCommentsForKPI, getUnreadCountForKPI } from '../data/kpiComments';
import { KPIThreadModal } from './KPIThreadModal';
import { SummaryTab } from './SummaryTab';

interface MyPerformanceProps {
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

export function MyPerformance({ 
  unreadNotificationsCount = 0, 
  onNotificationClick 
}: MyPerformanceProps = {}) {
  const [activeTab, setActiveTab] = useState<'summary' | 'branch' | 'sales'>('summary');
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [kpiCommentsMap, setKpiCommentsMap] = useState<Record<string, any[]>>({});

  // Calculate total points
  const totalPoints = topCrossSellingProducts.reduce((sum, p) => sum + p.points, 0);
  const currentMonthData = monthlyPerformanceData[monthlyPerformanceData.length - 1];
  const overallPerf = calculateOverallPerformance(myDetailedKPIMetrics);

  const unreadComments = myComments.filter(c => !c.isRead).length;

  const selectedKPIData = myDetailedKPIMetrics.find(k => k.kpiName === selectedKPI);
  // Get comments from local state if exists, otherwise from data
  const selectedKPIComments = selectedKPI 
    ? (kpiCommentsMap[selectedKPI] || getCommentsForKPI(selectedKPI))
    : [];

  const handleSendReply = (message: string) => {
    if (!selectedKPI) return;
    
    // Create new comment
    const newComment = {
      id: `comment-${Date.now()}`,
      kpiName: selectedKPI,
      fromUserId: currentEmployee.nip,
      fromUserName: currentEmployee.name,
      fromUserRole: 'Account Officer',
      toUserId: currentEmployee.nip,
      toUserName: currentEmployee.name,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      isRead: true,
      type: 'comment' as const,
      parentId: null
    };

    // Update local state
    setKpiCommentsMap(prev => ({
      ...prev,
      [selectedKPI]: [...(prev[selectedKPI] || getCommentsForKPI(selectedKPI)), newComment]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'warning': return <Minus className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const unreadNotificationsCountExample = 5; // Example count, replace with actual logic

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header - Compact */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base text-gray-900">My Performance</h1>
              <p className="text-[10px] text-gray-600">
                {currentEmployee.name} • {currentEmployee.position} • {currentEmployee.branch}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] text-gray-600">Employee ID</p>
              <p className="text-xs text-gray-900">{currentEmployee.nip}</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
              <Calendar className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-900">{selectedMonth} 31, 2025</span>
            </div>
            <button
              onClick={onNotificationClick}
              className="relative group"
              aria-label="Notifications"
            >
              <div className="relative flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-300 hover:border-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative">
                  <Bell className="w-4 h-4 text-gray-700 group-hover:text-indigo-600 transition-colors" />
                  {unreadNotificationsCount > 0 && (
                    <>
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-700 group-hover:text-indigo-600 transition-colors">Notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <div className="flex items-center justify-center min-w-[18px] h-5 px-1.5 bg-red-500 rounded-full shadow-sm">
                      <span className="text-[10px] text-white">{unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-full right-0 mt-2 px-2.5 py-1.5 bg-gray-800 text-white text-[10px] rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                {unreadNotificationsCount > 0 ? `You have ${unreadNotificationsCount} unread notification${unreadNotificationsCount > 1 ? 's' : ''}` : 'No new notifications'}
                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs - Compact */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 border-b-2 text-xs transition-colors ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            SUMMARY
          </button>
          <button
            onClick={() => setActiveTab('branch')}
            className={`px-4 py-2 border-b-2 text-xs transition-colors ${
              activeTab === 'branch'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            BRANCH
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 border-b-2 text-xs transition-colors ${
              activeTab === 'sales'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            SALES
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'summary' && (
          <SummaryTab
            totalPoints={totalPoints}
            currentMonthData={currentMonthData}
            personalRankings={personalRankings}
            topCrossSellingProducts={topCrossSellingProducts}
            branchTopPerformers={branchTopPerformers}
            crossSellingSalesHistory={crossSellingSalesHistory}
            currentEmployee={currentEmployee}
            myDetailedKPIMetrics={myDetailedKPIMetrics}
            overallPerf={overallPerf}
            onKPIClick={setSelectedKPI}
            getUnreadCountForKPI={getUnreadCountForKPI}
          />
        )}

        {activeTab === 'branch' && (
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Actual vs Target Chart - Compact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm text-gray-900 mb-3">Actual vs Target - Monthly Progress</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} name="Target" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Rankings - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {personalRankings.map((ranking, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs text-gray-600">{ranking.category}</h4>
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl text-gray-900">#{ranking.rank}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">out of {ranking.totalPerformers} performers</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Performance Table - Compact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-700 text-white px-4 py-2.5">
                <h3 className="text-sm">Product Performance by Month - Branch vs Your Contribution</h3>
                <p className="text-[10px] opacity-90 mt-0.5">Branch total performance with your individual contribution highlighted</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-2 py-2 text-left sticky left-0 bg-gray-700 z-10">PRODUCT</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Jan</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Feb</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Mar</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Apr</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>May</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Jun</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Jul</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Aug</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Sep</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Oct</th>
                      <th className="px-2 py-2 text-center" colSpan={2}>Cumulative</th>
                    </tr>
                    <tr className="bg-gray-600">
                      <th className="px-2 py-1.5 sticky left-0 bg-gray-600 z-10"></th>
                      {Array(11).fill(null).map((_, i) => (
                        <Fragment key={i}>
                          <th className="px-1.5 py-1 text-center">#Acc</th>
                          <th className="px-1.5 py-1 text-center">Z Pts</th>
                        </Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {branchProductAchievements.map((product, index) => {
                      const renderCell = (branchData: { acc: number; points: number }, myData: { acc: number; points: number }) => {
                        const percentage = branchData.acc > 0 ? (myData.acc / branchData.acc * 100) : 0;
                        
                        let percentColor = '';
                        if (percentage >= 25) {
                          percentColor = 'text-green-600';
                        } else if (percentage >= 15) {
                          percentColor = 'text-blue-600';
                        } else if (percentage >= 10) {
                          percentColor = 'text-orange-500';
                        } else if (percentage > 0) {
                          percentColor = 'text-gray-500';
                        }
                        
                        return (
                          <div className="flex flex-col items-center py-0.5">
                            <div className="text-gray-900">{branchData.acc}</div>
                            {myData.acc > 0 ? (
                              <div className={`text-[9px] ${percentColor}`}>
                                {percentage.toFixed(1)}%
                              </div>
                            ) : (
                              <div className="text-[9px] text-gray-300">-</div>
                            )}
                          </div>
                        );
                      };

                      return (
                        <tr key={index} className="hover:bg-blue-50 transition-colors">
                          <td className="px-2 py-1.5 text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">{product.product}</td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.jan, product.myContribution.monthly.jan)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.feb, product.myContribution.monthly.feb)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.mar, product.myContribution.monthly.mar)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.apr, product.myContribution.monthly.apr)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.may, product.myContribution.monthly.may)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.jun, product.myContribution.monthly.jun)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.jul, product.myContribution.monthly.jul)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.aug, product.myContribution.monthly.aug)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center" colSpan={2}>
                            {renderCell(product.monthly.sep, product.myContribution.monthly.sep)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center bg-blue-50" colSpan={2}>
                            {renderCell(product.monthly.oct, product.myContribution.monthly.oct)}
                          </td>
                          <td className="px-1.5 py-1.5 text-center bg-gray-50" colSpan={2}>
                            {renderCell(product.cumulative, product.myContribution.cumulative)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-4">
            {/* 1. Quick Stats Row - TOP PRIORITY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Top 3 Cross-Selling - Compact */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs text-gray-700">Top Cross-Selling</h3>
                </div>
                <div className="space-y-1.5">
                  {topCrossSellingProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[8px]">
                          {index + 1}
                        </span>
                        <span className="text-gray-900 truncate">{product.name}</span>
                      </div>
                      <span className="text-blue-600 ml-1">{product.points}p</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rankings - Compact */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <h3 className="text-xs text-gray-700">Your Rankings</h3>
                </div>
                <div className="space-y-1.5">
                  {personalRankings.map((ranking, index) => (
                    <div key={index} className="flex items-center justify-between text-[10px]">
                      <span className="text-gray-600">{ranking.category}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-base text-gray-900">#{ranking.rank}</span>
                        <span className="text-gray-500">/{ranking.totalPerformers}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Trend - Compact */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <h3 className="text-xs text-gray-700">Monthly Trend</h3>
                </div>
                <div className="space-y-1">
                  {monthlyPerformanceData.slice(-3).reverse().map((month, index) => {
                    const achievementPercent = month.target > 0 ? (month.actual / month.target * 100) : 0;
                    return (
                      <div key={index} className="flex items-center justify-between text-[10px]">
                        <span className="text-gray-600 w-8">{month.month}</span>
                        <div className="flex items-center gap-1.5 flex-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                achievementPercent >= 100 ? 'bg-green-500' : 
                                achievementPercent >= 80 ? 'bg-blue-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(achievementPercent, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-900 w-10 text-right">{month.actual}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Product Sales Details */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 flex items-center justify-between">
                <h3 className="text-base">📊 Your Product Sales Performance - {selectedMonth}</h3>
                <div className="text-xs opacity-90">YTD Cumulative</div>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {productAchievements.map((product, index) => {
                  const achievement = product.target > 0 ? (product.cumulative.acc / product.target * 100) : 0;
                  const isAchieved = achievement >= 100;
                  const isGood = achievement >= 80;
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                        isAchieved 
                          ? 'bg-green-50 border-green-300' 
                          : isGood 
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-red-50 border-red-300'
                      }`}
                    >
                      <p className="text-[10px] text-gray-600 mb-1">{product.product}</p>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-lg text-gray-900">{product.cumulative.acc}</span>
                        <span className="text-[10px] text-gray-500">/ {product.target}</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            isAchieved ? 'bg-green-500' : isGood ? 'bg-blue-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(achievement, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          isAchieved 
                            ? 'bg-green-200 text-green-800' 
                            : isGood
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-red-200 text-red-800'
                        }`}>
                          {achievement.toFixed(0)}%
                        </span>
                        <span className={`text-xs ${
                          isAchieved 
                            ? 'text-green-600' 
                            : isGood
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}>
                          {product.cumulative.points}p
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. KPI Summary + Supervisor's Feedback - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* KPI Summary - Compact (1 column) */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-700 text-white px-3 py-2">
                  <h3 className="text-xs">KPI Summary</h3>
                  <p className="text-[10px] opacity-75 mt-0.5">{overallPerf.overallAchievement}% Overall</p>
                </div>
                <div className="p-2.5 grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-[9px] text-gray-600">Excellent</p>
                    <p className="text-base text-green-600">{overallPerf.excellentCount}</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-[9px] text-gray-600">Good</p>
                    <p className="text-base text-blue-600">{overallPerf.goodCount}</p>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <p className="text-[9px] text-gray-600">Warning</p>
                    <p className="text-base text-yellow-600">{overallPerf.warningCount}</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded">
                    <p className="text-[9px] text-gray-600">Critical</p>
                    <p className="text-base text-red-600">{overallPerf.criticalCount}</p>
                  </div>
                </div>
              </div>

              {/* Supervisor's Feedback - COMPACT (2 columns) */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <h3 className="text-xs">Supervisor's Feedback</h3>
                  </div>
                  {unreadComments > 0 && (
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px]">
                      {unreadComments} new
                    </span>
                  )}
                </div>
                <div className="p-3">
                  {myComments.length === 0 ? (
                    <div className="text-center py-4">
                      <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">No feedback yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {myComments
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                        .slice(0, 3)
                        .map((comment) => (
                          <div
                            key={comment.id}
                            className={`p-2 rounded border transition-all ${
                              !comment.isRead
                                ? 'bg-blue-50 border-blue-300'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-start gap-2 mb-1">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-[8px]">
                                {comment.fromUserName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-[10px] text-gray-900 truncate">
                                    {comment.fromUserName}
                                  </p>
                                  <span
                                    className={`text-[8px] px-1.5 py-0.5 rounded ${
                                      comment.type === 'alert'
                                        ? 'bg-red-100 text-red-700'
                                        : comment.type === 'feedback'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}
                                  >
                                    {comment.type.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-500">{getTimeAgo(comment.timestamp)}</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-700 pl-8">{comment.message}</p>
                          </div>
                        ))}
                      {myComments.length > 3 && (
                        <button className="w-full text-[10px] text-blue-600 hover:text-blue-700 py-1">
                          View all {myComments.length} feedback →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* KPI Thread Modal */}
      {selectedKPI && selectedKPIData && (
        <KPIThreadModal
          kpi={selectedKPIData}
          comments={selectedKPIComments}
          onClose={() => setSelectedKPI(null)}
          onSendReply={handleSendReply}
          currentUserId={currentEmployee.nip}
          currentUserName={currentEmployee.name}
        />
      )}
    </div>
  );
}