import { useState, useEffect } from 'react';
import { Search, TrendingUp, Trophy, Award, Target, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { myDetailedKPIMetrics, calculateOverallPerformance } from '../../data/individualKPIData';
import { topCrossSellingProducts, personalRankings, monthlyPerformanceData, productAchievements } from '../../data/myPerformanceData';
import { getUnreadCountForKPI, getCommentsForKPI } from '../../data/kpiComments';
import { MobileHeader } from './MobileHeader';

interface PerformanceScreenProps {
  onBack: () => void;
  onKPIClick: (kpiName: string) => void;
  filterStatus?: 'all' | 'excellent' | 'good' | 'warning' | 'critical';
  notificationCount?: number;
  onNavigate?: (screen: string) => void;
}

export function PerformanceScreen({ onBack, onKPIClick, filterStatus: initialFilter, notificationCount, onNavigate }: PerformanceScreenProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'kpis' | 'sales'>('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'excellent' | 'good' | 'warning' | 'critical'>(initialFilter || 'all');
  
  useEffect(() => {
    if (initialFilter && initialFilter !== 'all') {
      setActiveTab('kpis');
      setFilterStatus(initialFilter);
    }
  }, [initialFilter]);

  const overallPerf = calculateOverallPerformance(myDetailedKPIMetrics);
  
  // Get KPIs with unread comments from manager
  const kpisWithComments = myDetailedKPIMetrics
    .map(kpi => ({
      ...kpi,
      unreadCount: getUnreadCountForKPI(kpi.kpiName),
      allComments: getCommentsForKPI(kpi.kpiName)
    }))
    .filter(kpi => kpi.unreadCount > 0)
    .sort((a, b) => b.unreadCount - a.unreadCount);
  
  // Filter KPIs
  const filteredKPIs = myDetailedKPIMetrics.filter(kpi => {
    const matchesSearch = kpi.kpiName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || kpi.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Group KPIs by status - ALWAYS from full list for accurate counts
  const allExcellentKPIs = myDetailedKPIMetrics.filter(k => k.status === 'excellent');
  const allGoodKPIs = myDetailedKPIMetrics.filter(k => k.status === 'good');
  const allWarningKPIs = myDetailedKPIMetrics.filter(k => k.status === 'warning');
  const allCriticalKPIs = myDetailedKPIMetrics.filter(k => k.status === 'critical');
  
  // Group filtered KPIs by status for display
  const excellentKPIs = filteredKPIs.filter(k => k.status === 'excellent');
  const goodKPIs = filteredKPIs.filter(k => k.status === 'good');
  const warningKPIs = filteredKPIs.filter(k => k.status === 'warning');
  const criticalKPIs = filteredKPIs.filter(k => k.status === 'critical');

  // Ultra compact KPI card
  const KPICard = ({ kpi }: { kpi: any }) => {
    const unreadCount = getUnreadCountForKPI(kpi.kpiName);
    
    return (
      <button
        onClick={() => onKPIClick(kpi.kpiName)}
        className="w-full bg-white rounded shadow-sm p-1.5 text-left hover:shadow transition-all border border-gray-200"
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] text-gray-900 line-clamp-1 flex-1">{kpi.kpiName}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {unreadCount > 0 && (
              <span className="text-[9px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded">💬{unreadCount}</span>
            )}
            <span className={`text-[9px] px-1.5 py-0.5 rounded ${
              kpi.status === 'excellent' ? 'bg-green-100 text-green-700' :
              kpi.status === 'good' ? 'bg-blue-100 text-blue-700' :
              kpi.status === 'warning' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {kpi.achievement.toFixed(0)}%
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
          <div 
            className={`h-1 rounded-full ${
              kpi.status === 'excellent' ? 'bg-green-500' :
              kpi.status === 'good' ? 'bg-blue-500' :
              kpi.status === 'warning' ? 'bg-amber-500' :
              'bg-red-500'
            }`}
            style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-[9px] text-gray-600">
          <span>{kpi.actual.toLocaleString()} / {kpi.target.toLocaleString()}</span>
          <span>{kpi.points}p</span>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* KB Header */}
      <MobileHeader 
        title="My Performance" 
        showBack={true} 
        onBack={onBack}
        showNotification={true}
        showProfile={true}
        notificationCount={notificationCount}
        onNavigate={onNavigate}
      />

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 pt-2">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2.5 text-sm transition-all ${
              activeTab === 'summary'
                ? 'text-orange-600 border-b-2 border-orange-600 font-medium'
                : 'text-gray-600'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-4 py-2.5 text-sm transition-all ${
              activeTab === 'kpis'
                ? 'text-orange-600 border-b-2 border-orange-600 font-medium'
                : 'text-gray-600'
            }`}
          >
            KPIs ({myDetailedKPIMetrics.length})
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2.5 text-sm transition-all ${
              activeTab === 'sales'
                ? 'text-orange-600 border-b-2 border-orange-600 font-medium'
                : 'text-gray-600'
            }`}
          >
            Sales
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <>
            {/* Comments from Manager - ULTRA COMPACT */}
            {kpisWithComments.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
                <div className="bg-blue-50 border-b border-blue-100 px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[11px] text-blue-900">Manager Comments ({kpisWithComments.length})</span>
                  </div>
                </div>
                <div className="p-2 space-y-1">
                  {kpisWithComments.slice(0, 5).map((kpi, index) => {
                    const latestComment = kpi.allComments.filter(c => !c.isRead)[0];
                    return (
                      <button
                        key={index}
                        onClick={() => onKPIClick(kpi.kpiName)}
                        className="w-full bg-gray-50 rounded p-1.5 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                      >
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-[10px] text-gray-900 line-clamp-1 flex-1">{kpi.kpiName}</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className={`text-[9px] px-1 py-0.5 rounded ${
                              kpi.status === 'excellent' ? 'bg-green-100 text-green-700' :
                              kpi.status === 'good' ? 'bg-blue-100 text-blue-700' :
                              kpi.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {kpi.achievement.toFixed(0)}%
                            </span>
                            <span className="text-[9px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded">
                              💬 {kpi.unreadCount}
                            </span>
                          </div>
                        </div>
                        {latestComment && (
                          <p className="text-[9px] text-gray-600 line-clamp-1">
                            {latestComment.fromUserName}: {latestComment.message}
                          </p>
                        )}
                      </button>
                    );
                  })}
                  {kpisWithComments.length > 5 && (
                    <button
                      onClick={() => setActiveTab('kpis')}
                      className="w-full text-center py-1 text-[10px] text-blue-600 hover:text-blue-700"
                    >
                      View all {kpisWithComments.length} →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Overall Achievement - Compact */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 className="text-xs text-gray-900 mb-2.5">October 2025 Performance</h3>
              
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-600">Overall Achievement</span>
                  <span className="text-lg text-gray-900">{overallPerf.overallAchievement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${overallPerf.overallAchievement}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button 
                  onClick={() => {
                    setActiveTab('kpis');
                    setFilterStatus('excellent');
                  }}
                  className="text-center p-2 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 active:scale-95 transition-all"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                  <div className="text-base text-green-600">{overallPerf.excellentCount}</div>
                  <div className="text-[9px] text-gray-600">Excellent</div>
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('kpis');
                    setFilterStatus('good');
                  }}
                  className="text-center p-2 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 active:scale-95 transition-all"
                >
                  <Target className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-base text-blue-600">{overallPerf.goodCount}</div>
                  <div className="text-[9px] text-gray-600">Good</div>
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('kpis');
                    setFilterStatus('warning');
                  }}
                  className="text-center p-2 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 active:scale-95 transition-all"
                >
                  <Target className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <div className="text-base text-amber-600">{overallPerf.warningCount}</div>
                  <div className="text-[9px] text-gray-600">Warning</div>
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('kpis');
                    setFilterStatus('critical');
                  }}
                  className="text-center p-2 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 active:scale-95 transition-all"
                >
                  <Target className="w-4 h-4 text-red-600 mx-auto mb-1" />
                  <div className="text-base text-red-600">{overallPerf.criticalCount}</div>
                  <div className="text-[9px] text-gray-600">Critical</div>
                </button>
              </div>
            </div>

            {/* Quick Info Grid - ULTRA COMPACT */}
            <div className="grid grid-cols-2 gap-2">
              {/* My Rankings */}
              <div className="bg-white rounded-lg shadow-sm p-2.5 border border-gray-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <h3 className="text-[10px] text-gray-900">My Rankings</h3>
                </div>
                <div className="space-y-1.5">
                  {personalRankings.map((ranking, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-gray-600">{ranking.category}</p>
                        <p className="text-[11px] text-gray-900">#{ranking.rank}</p>
                      </div>
                      <p className="text-[10px] text-blue-600">{ranking.points}p</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top 3 Products */}
              <div className="bg-white rounded-lg shadow-sm p-2.5 border border-gray-200">
                <h3 className="text-[10px] text-gray-900 mb-2">Top 3 Products</h3>
                <div className="space-y-1.5">
                  {topCrossSellingProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-[9px] text-gray-900 truncate">{product.name.split(' ')[0]}</p>
                      </div>
                      <p className="text-[10px] text-blue-600">{product.points}p</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Trend - Compact */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 className="text-xs text-gray-900 mb-2">Monthly Trend</h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={monthlyPerformanceData.slice(-6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* KPIs TAB */}
        {activeTab === 'kpis' && (
          <>
            {/* Status Filter Chips ONLY - No Search */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all ${
                  filterStatus === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                All ({myDetailedKPIMetrics.length})
              </button>
              <button
                onClick={() => setFilterStatus('excellent')}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all ${
                  filterStatus === 'excellent' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                Excellent ({allExcellentKPIs.length})
              </button>
              <button
                onClick={() => setFilterStatus('good')}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all ${
                  filterStatus === 'good' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                Good ({allGoodKPIs.length})
              </button>
              <button
                onClick={() => setFilterStatus('warning')}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all ${
                  filterStatus === 'warning' 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                Warning ({allWarningKPIs.length})
              </button>
              <button
                onClick={() => setFilterStatus('critical')}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all ${
                  filterStatus === 'critical' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                Critical ({allCriticalKPIs.length})
              </button>
            </div>

            {/* KPI List - ULTRA COMPACT */}
            <div className="space-y-1.5">
              {/* Critical KPIs */}
              {(filterStatus === 'all' || filterStatus === 'critical') && criticalKPIs.length > 0 && (
                <div>
                  <h4 className="text-[10px] text-red-600 mb-1 px-1">Critical ({criticalKPIs.length})</h4>
                  <div className="space-y-1">
                    {criticalKPIs.map((kpi, index) => (
                      <KPICard key={index} kpi={kpi} />
                    ))}
                  </div>
                </div>
              )}

              {/* Warning KPIs */}
              {(filterStatus === 'all' || filterStatus === 'warning') && warningKPIs.length > 0 && (
                <div>
                  <h4 className="text-[10px] text-amber-600 mb-1 px-1">Warning ({warningKPIs.length})</h4>
                  <div className="space-y-1">
                    {warningKPIs.map((kpi, index) => (
                      <KPICard key={index} kpi={kpi} />
                    ))}
                  </div>
                </div>
              )}

              {/* Good KPIs */}
              {(filterStatus === 'all' || filterStatus === 'good') && goodKPIs.length > 0 && (
                <div>
                  <h4 className="text-[10px] text-blue-600 mb-1 px-1">Good ({goodKPIs.length})</h4>
                  <div className="space-y-1">
                    {goodKPIs.map((kpi, index) => (
                      <KPICard key={index} kpi={kpi} />
                    ))}
                  </div>
                </div>
              )}

              {/* Excellent KPIs */}
              {(filterStatus === 'all' || filterStatus === 'excellent') && excellentKPIs.length > 0 && (
                <div>
                  <h4 className="text-[10px] text-green-600 mb-1 px-1">Excellent ({excellentKPIs.length})</h4>
                  <div className="space-y-1">
                    {excellentKPIs.map((kpi, index) => (
                      <KPICard key={index} kpi={kpi} />
                    ))}
                  </div>
                </div>
              )}

              {filteredKPIs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-sm">No KPIs found</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* SALES TAB - REDESIGNED: Cross-Selling & Trends */}
        {activeTab === 'sales' && (
          <>
            {/* Monthly Sales Trend */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 className="text-xs text-gray-900 mb-2">📈 6-Month Sales Trend</h3>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={monthlyPerformanceData.slice(-6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top Cross-Selling Products */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2">
                <h3 className="text-xs text-white">🎯 Top Cross-Selling Products</h3>
              </div>
              <div className="p-2 space-y-1">
                {topCrossSellingProducts.map((product, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-2 rounded border ${
                      index === 0 ? 'bg-yellow-50 border-yellow-200' :
                      index === 1 ? 'bg-gray-50 border-gray-200' :
                      index === 2 ? 'bg-orange-50 border-orange-200' :
                      'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-900 truncate">{product.name}</p>
                        <p className="text-[9px] text-gray-500">{product.count} sales</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-blue-600">{product.points}p</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Category Summary */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 className="text-xs text-gray-900 mb-2">📊 Product Performance Summary</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {productAchievements.slice(0, 6).map((product, index) => {
                  const achievement = product.target > 0 ? (product.cumulative.acc / product.target * 100) : 0;
                  const isAchieved = achievement >= 100;
                  
                  return (
                    <div 
                      key={index}
                      className={`p-1.5 rounded border text-center ${
                        isAchieved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <p className="text-[9px] text-gray-600 truncate mb-0.5">{product.product.split(' ')[0]}</p>
                      <p className={`text-[11px] ${isAchieved ? 'text-green-700' : 'text-gray-900'}`}>
                        {achievement.toFixed(0)}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div 
                          className={`h-1 rounded-full ${isAchieved ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min(achievement, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}