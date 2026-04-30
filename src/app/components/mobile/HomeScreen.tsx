import { useState } from 'react';
import { AlertTriangle, Target, CheckCircle, X, Send, TrendingDown, TrendingUp, Minus, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MobileHeader } from './MobileHeader';
import { currentEmployee } from '../../data/myPerformanceData';
import { myComments } from '../../data/communicationData';
import { calculateOverallPerformance } from '../../data/individualKPIData';
import { myDetailedKPIMetrics } from '../../data/individualKPIData';

interface HomeScreenProps {
  onNavigate: (screen: string, filter?: string) => void;
  notificationCount: number;
  simulatedScore: number;
}

export function HomeScreen({ onNavigate, notificationCount, simulatedScore }: HomeScreenProps) {
  const overallPerf = calculateOverallPerformance(myDetailedKPIMetrics);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);
  const [alertReplies, setAlertReplies] = useState<{ [key: string]: any[] }>({});
  const [expandedSections, setExpandedSections] = useState({
    urgent: false,
    action: false,
    top: false
  });
  
  const urgentAlerts = myComments.filter(c => !c.isRead && c.type === 'alert');
  const actionNeededKPIs = myDetailedKPIMetrics
    .filter(kpi => kpi.achievement >= 70 && kpi.achievement < 90)
    .sort((a, b) => a.achievement - b.achievement);
  const excellentKPIs = myDetailedKPIMetrics
    .filter(kpi => kpi.achievement >= 100)
    .sort((a, b) => b.achievement - a.achievement);
  
  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleAlertClick = (alert: any) => {
    if (expandedAlertId === alert.id) {
      setExpandedAlertId(null);
      setReplyMessage('');
    } else {
      setExpandedAlertId(alert.id);
      setReplyMessage('');
    }
  };

  const handleSendReply = (alertId: string) => {
    if (replyMessage.trim()) {
      setIsSending(true);
      setTimeout(() => {
        // Add new reply to the list
        const newReply = {
          fromName: currentEmployee.name,
          message: replyMessage,
          timestamp: 'Just now'
        };
        
        setAlertReplies(prev => ({
          ...prev,
          [alertId]: [...(prev[alertId] || []), newReply]
        }));
        
        console.log('Sending reply:', replyMessage);
        setReplyMessage('');
        setIsSending(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 1500);
      }, 1000);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentScore = 13.51;
  const maxScore = 20;
  
  const achievementPercent = (currentScore / maxScore) * 100;
  const simulatedPercent = (simulatedScore / maxScore) * 100;
  
  // 시뮬레이션과 현재의 차이 (음수 = 하락, 양수 = 개선)
  const improvement = simulatedScore - currentScore;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium KB Header */}
      <MobileHeader 
        showNotification={true}
        showProfile={true}
        notificationCount={notificationCount}
        onNavigate={onNavigate}
      />

      {/* Content */}
      <div className="p-4 space-y-3.5">
        {/* Your KPI Score - Compact White Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <div className="text-2xl font-bold text-blue-600">A+</div>
              <div className="text-[10px] text-gray-500">M&D</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500">Achievement</div>
              <div className="text-xl font-bold text-gray-900">{achievementPercent.toFixed(0)}%</div>
            </div>
          </div>

          {/* vs Simulation - Vertical Stack */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-3 mb-2.5 border border-gray-200">
            {/* Header with Difference */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-700 font-semibold">Score Comparison</span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${improvement > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {improvement > 0 ? '↑' : '↓'}
                <span>{Math.abs(improvement).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Current Score */}
            <div className="bg-white rounded-lg p-2.5 mb-2 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span className="text-xs text-gray-700 font-semibold">Current</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{currentScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all" style={{ width: `${achievementPercent}%` }} />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[9px] text-gray-500">{achievementPercent.toFixed(1)}%</span>
                <span className="text-[9px] text-gray-400">Max {maxScore}</span>
              </div>
            </div>
            
            {/* Simulated Score */}
            <div className="bg-white rounded-lg p-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-gray-700 font-semibold">Simulated</span>
                </div>
                <span className="text-lg font-bold text-orange-600">{simulatedScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${simulatedPercent}%` }} />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[9px] text-gray-500">{simulatedPercent.toFixed(1)}%</span>
                <span className="text-[9px] text-gray-400">Max {maxScore}</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => onNavigate('simulator')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-1.5"
          >
            <span>Run Simulator</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl shadow-sm p-3 text-center border border-gray-100">
            <div className="text-2xl text-gray-900 font-bold mb-0.5">{overallPerf.overallAchievement}%</div>
            <div className="text-[11px] text-gray-600">Overall</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 text-center border border-gray-100">
            <div className="text-2xl text-green-600 font-bold mb-0.5">{overallPerf.excellentCount + overallPerf.goodCount}</div>
            <div className="text-[11px] text-gray-600">On Track</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 text-center border border-gray-100">
            <div className="text-2xl text-orange-600 font-bold mb-0.5">{overallPerf.criticalCount + overallPerf.warningCount}</div>
            <div className="text-[11px] text-gray-600">Need Action</div>
          </div>
        </div>

        {/* Training Videos */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-white" />
              <h3 className="text-sm text-white font-bold">Training Videos</h3>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <span className="text-xs text-white font-semibold">6 Available</span>
            </div>
          </div>
          
          <button
            onClick={() => onNavigate('videos')}
            className="w-full bg-white/95 hover:bg-white rounded-xl p-3.5 transition-all active:scale-98 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">Watch Training Videos</div>
                <div className="text-xs text-gray-600 mt-1">Learn and develop your skills</div>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-4 h-4 text-white" />
              </div>
            </div>
          </button>
        </div>

        {/* Urgent Alerts */}
        {urgentAlerts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div
              className="bg-red-50 px-4 py-3 flex items-center justify-between cursor-pointer border-b border-red-100"
              onClick={() => toggleSection('urgent')}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-900 font-semibold">Urgent Alerts ({urgentAlerts.length})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('notifications');
                  }}
                  className="text-xs text-blue-600 cursor-pointer hover:underline font-medium"
                >
                  View All
                </div>
                {expandedSections.urgent ? (
                  <ChevronUp className="w-4 h-4 text-red-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-red-600" />
                )}
              </div>
            </div>
            
            {!expandedSections.urgent && (
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900">
                  <span className="font-bold text-red-900">{urgentAlerts[0].fromUserName}:</span>{' '}
                  <span className="text-gray-700">{urgentAlerts[0].message}</span>
                </p>
              </div>
            )}
            
            {expandedSections.urgent && (
              <div className="p-3 space-y-2">
                {urgentAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id}>
                    <button
                      onClick={() => handleAlertClick(alert)}
                      className={`w-full bg-gray-50 rounded-xl p-3 border transition-all text-left ${
                        expandedAlertId === alert.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
                          {alert.fromUserName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-900 font-bold">{alert.fromUserName}</p>
                          <p className="text-[11px] text-gray-700 line-clamp-2 mt-0.5">{alert.message}</p>
                          <p className="text-[10px] text-gray-500 mt-1.5">{getTimeAgo(alert.timestamp)}</p>
                        </div>
                      </div>
                    </button>
                    
                    {/* Inline Reply Section */}
                    {expandedAlertId === alert.id && (
                      <div className="mt-2 bg-white rounded-xl border border-blue-300 p-2.5 animate-slideInUp space-y-2">
                        {/* Existing Replies */}
                        {alertReplies[alert.id] && alertReplies[alert.id].length > 0 && (
                          <div className="space-y-1.5 mb-2">
                            {alertReplies[alert.id].map((reply, idx) => (
                              <div key={idx} className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                                <div className="flex items-start gap-1.5">
                                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] flex-shrink-0">
                                    {reply.fromName.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[9px] font-medium text-gray-900">{reply.fromName}</p>
                                    <p className="text-[10px] text-gray-700 mt-0.5">{reply.message}</p>
                                    <p className="text-[8px] text-gray-500 mt-0.5">{reply.timestamp}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Input */}
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey && replyMessage.trim()) {
                                e.preventDefault();
                                handleSendReply(alert.id);
                              }
                            }}
                            className="flex-1 px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleSendReply(alert.id)}
                            disabled={!replyMessage.trim() || isSending}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                          >
                            {isSending ? (
                              <svg className="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"></path>
                              </svg>
                            ) : (
                              <Send className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        {showSuccess && (
                          <div className="text-[10px] text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Reply sent successfully!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Needed */}
        {actionNeededKPIs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div
              className="bg-orange-50 px-4 py-3 flex items-center justify-between cursor-pointer border-b border-orange-100"
              onClick={() => toggleSection('action')}
            >
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-900 font-semibold">Action Needed ({actionNeededKPIs.length})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('performance', 'warning');
                  }}
                  className="text-xs text-blue-600 cursor-pointer hover:underline font-medium"
                >
                  View All
                </div>
                {expandedSections.action ? (
                  <ChevronUp className="w-4 h-4 text-orange-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-orange-600" />
                )}
              </div>
            </div>
            
            {!expandedSections.action && (
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900 line-clamp-1 flex-1 font-semibold">{actionNeededKPIs[0].kpiName}</span>
                  <span className="text-sm text-orange-600 font-bold ml-3">{actionNeededKPIs[0].achievement.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(actionNeededKPIs[0].achievement, 100)}%` }}
                  />
                </div>
              </div>
            )}
            
            {expandedSections.action && (
              <div className="p-3 space-y-2">
                {actionNeededKPIs.slice(0, 5).map((kpi, index) => (
                  <button
                    key={index}
                    onClick={() => onNavigate('performance', 'warning')}
                    className="w-full bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900 line-clamp-1 flex-1 font-semibold">{kpi.kpiName}</span>
                      <span className="text-sm text-orange-600 font-bold ml-3">{kpi.achievement.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Top Performers */}
        {excellentKPIs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div
              className="bg-green-50 px-4 py-3 flex items-center justify-between cursor-pointer border-b border-green-100"
              onClick={() => toggleSection('top')}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-900 font-semibold">Top Performers ({excellentKPIs.length})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('performance', 'excellent');
                  }}
                  className="text-xs text-blue-600 cursor-pointer hover:underline font-medium"
                >
                  View All
                </div>
                {expandedSections.top ? (
                  <ChevronUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-green-600" />
                )}
              </div>
            </div>
            
            {!expandedSections.top && (
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900 line-clamp-1 flex-1 font-semibold">{excellentKPIs[0].kpiName}</span>
                  <span className="text-sm text-green-600 font-bold ml-3">{excellentKPIs[0].achievement.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full" />
                </div>
              </div>
            )}
            
            {expandedSections.top && (
              <div className="p-3 space-y-2">
                {excellentKPIs.slice(0, 5).map((kpi, index) => (
                  <button
                    key={index}
                    onClick={() => onNavigate('performance', 'excellent')}
                    className="w-full bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900 line-clamp-1 flex-1 font-semibold">{kpi.kpiName}</span>
                      <span className="text-sm text-green-600 font-bold ml-3">{kpi.achievement.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}