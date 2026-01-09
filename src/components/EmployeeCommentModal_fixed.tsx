import { useState } from 'react';
import { X, Send, MessageSquare, TrendingUp, TrendingDown, User, Mail, Phone, Briefcase, ChevronDown, ChevronRight } from 'lucide-react';
import { Employee } from '../data/adminData';
import { toast } from 'sonner@2.0.3';

interface EmployeeCommentModalProps {
  employee: Employee;
  onClose: () => void;
}

interface KPIComment {
  id: string;
  kpiName: string;
  date: string;
  time: string;
  author: string;
  role: string;
  message: string;
  type: 'feedback' | 'alert' | 'coaching';
  isNew?: boolean;
}

// Get KPI data from employee's performance
const getEmployeeKPIList = (employee: Employee) => {
  const perf = employee.kpiPerformance;
  if (!perf) return [];

  const kpis: Array<{
    name: string;
    field: string;
    actual: string;
    target: string;
    achievement: string;
    score: string;
    status: 'excellent' | 'good' | 'warning';
  }> = [];

  const addKPI = (name: string, field: string, data: any) => {
    if (!data) return;
    const achVal = parseFloat(data.achievement?.replace('%', '') || '0');
    kpis.push({
      name,
      field,
      actual: data.actual || '-',
      target: data.target || '-',
      achievement: data.achievement || '-',
      score: data.score || '-',
      status: achVal >= 100 ? 'excellent' : achVal >= 80 ? 'good' : 'warning',
    });
  };

  addKPI('New to CASA/Digital Account', 'newCASA', perf.newCASA);
  addKPI('Priority Customer', 'priorityCustomer', perf.priorityCustomer);
  addKPI('New Cooperation', 'newCooperation', perf.newCooperation);
  addKPI('CASA Increase', 'casaIncrease', perf.casaIncrease);
  addKPI('Sales Productivity', 'salesProductivity', perf.salesProductivity);
  addKPI('Cross Selling', 'crossSelling', perf.crossSelling);
  addKPI('Special Booster', 'specialBooster', perf.specialBooster);

  return kpis;
};

// Mock KPI-specific comment history
const getKPICommentHistory = (employeeId: string): KPIComment[] => {
  return [
    {
      id: '2',
      kpiName: 'New to CASA/Digital Account',
      date: '2025-12-05',
      time: '10:30 AM',
      author: 'Jane Smith',
      role: 'Branch Manager',
      message: 'Your CASA acquisition rate is below target. Let\'s focus on digital channel promotion to existing customers.',
      type: 'coaching'
    },
    {
      id: '3',
      kpiName: 'Priority Customer',
      date: '2025-12-04',
      time: '11:45 AM',
      author: 'Michael Johnson',
      role: 'Branch Sales Manager',
      message: 'Excellent work on Priority Customer! You exceeded the target. Keep it up!',
      type: 'feedback'
    },
    {
      id: '4',
      kpiName: 'Cross Selling',
      date: '2025-12-01',
      time: '09:15 AM',
      author: 'Jane Smith',
      role: 'Branch Manager',
      message: 'Cross-selling performance needs improvement. Review the product bundle offerings with your BSM.',
      type: 'alert'
    },
  ];
};

export function EmployeeCommentModal({ employee, onClose }: EmployeeCommentModalProps) {
  const [activeTab, setActiveTab] = useState<'overall' | 'kpi-specific'>('kpi-specific');
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState<'feedback' | 'alert' | 'coaching'>('feedback');
  const [expandedKPIs, setExpandedKPIs] = useState<Set<string>>(new Set());
  const [commentHistory, setCommentHistory] = useState<KPIComment[]>(getKPICommentHistory(employee.id));
  const [overallCommentHistory, setOverallCommentHistory] = useState<KPIComment[]>([]);

  const kpiList = getEmployeeKPIList(employee);

  // Calculate overall performance
  const perf = employee.kpiPerformance;
  const excellentCount = kpiList.filter(k => k.status === 'excellent').length;
  const goodCount = kpiList.filter(k => k.status === 'good').length;
  const warningCount = kpiList.filter(k => k.status === 'warning').length;
  
  // Calculate average achievement
  const avgAchievement = kpiList.length > 0
    ? (kpiList.reduce((sum, k) => sum + parseFloat(k.achievement.replace('%', '') || '0'), 0) / kpiList.length).toFixed(1)
    : '0.0';

  const toggleKPIExpand = (kpiField: string) => {
    setExpandedKPIs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(kpiField)) {
        newSet.delete(kpiField);
      } else {
        newSet.add(kpiField);
      }
      return newSet;
    });
  };

  const handleSendComment = (kpiName?: string) => {
    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    const target = kpiName || 'Overall Performance';
    const newComment: KPIComment = {
      id: `comment-${Date.now()}`,
      kpiName: target,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: 'You (Manager)',
      role: 'Branch Manager',
      message: comment.trim(),
      type: commentType,
      isNew: true,
    };

    // Add to appropriate history
    if (kpiName) {
      // KPI-specific comment
      setCommentHistory(prev => [newComment, ...prev]);
      toast.success(`💬 Comment sent to ${employee.name} with push notification!`, {
        description: `"${target}" - Comment added successfully`,
      });
    } else {
      // Overall comment
      setOverallCommentHistory(prev => [newComment, ...prev]);
      toast.success(`📢 Overall feedback sent to ${employee.name} with push notification!`, {
        description: 'Employee will be notified immediately',
      });
    }

    // Reset form
    setComment('');
    setCommentType('feedback');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Gray minimalist */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm text-gray-900">Employee Performance & Coaching</h2>
              <p className="text-[10px] text-gray-600 mt-0.5">{employee.name} - {employee.position}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Employee Info & Summary */}
            <div className="space-y-3">
              {/* Employee Details */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <h3 className="text-xs text-gray-900 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-600" />
                  Employee Information
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 w-20">Code:</span>
                    <span className="text-gray-900">{employee.employeeCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 w-20">Region:</span>
                    <span className="text-gray-900">{employee.region || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 w-20">Branch:</span>
                    <span className="text-gray-900">{employee.branch || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-700">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-700">{employee.phone}</span>
                  </div>
                </div>
              </div>

              {/* Overall Performance */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <h3 className="text-xs text-gray-900 mb-2">Overall Performance</h3>
                <div className="text-center mb-3">
                  <div className="text-3xl text-gray-900 mb-0.5">{avgAchievement}%</div>
                  <div className="text-[10px] text-gray-600">Average Achievement</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                    <div className="text-green-600 text-lg">{excellentCount}</div>
                    <div className="text-gray-600 text-[10px]">Excellent</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                    <div className="text-blue-600 text-lg">{goodCount}</div>
                    <div className="text-gray-600 text-[10px]">Good</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                    <div className="text-orange-600 text-lg">{warningCount}</div>
                    <div className="text-gray-600 text-[10px]">Warning</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tab Navigation & Content */}
            <div className="space-y-3">
              {/* Tab Navigation */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('overall')}
                    className={`flex-1 px-3 py-2 text-xs transition-colors ${
                      activeTab === 'overall'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Overall Feedback
                  </button>
                  <button
                    onClick={() => setActiveTab('kpi-specific')}
                    className={`flex-1 px-3 py-2 text-xs transition-colors ${
                      activeTab === 'kpi-specific'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    KPI-Specific Coaching
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-3">
                  {activeTab === 'overall' ? (
                    // Overall Feedback Tab
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-gray-700 mb-1.5">Comment Type</label>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setCommentType('feedback')}
                            className={`flex-1 px-2 py-1.5 rounded text-[10px] transition-colors ${
                              commentType === 'feedback'
                                ? 'bg-gray-700 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Feedback
                          </button>
                          <button
                            onClick={() => setCommentType('alert')}
                            className={`flex-1 px-2 py-1.5 rounded text-[10px] transition-colors ${
                              commentType === 'alert'
                                ? 'bg-gray-700 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Alert
                          </button>
                          <button
                            onClick={() => setCommentType('coaching')}
                            className={`flex-1 px-2 py-1.5 rounded text-[10px] transition-colors ${
                              commentType === 'coaching'
                                ? 'bg-gray-700 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Coaching
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-700 mb-1.5">Your Comment</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Enter overall feedback, coaching notes, or performance alerts..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none text-xs"
                          rows={4}
                        />
                      </div>

                      <button
                        onClick={() => handleSendComment()}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all text-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Overall Feedback
                      </button>

                      {/* Overall Comment History */}
                      {overallCommentHistory.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h4 className="text-[10px] text-gray-700 mb-2 flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" />
                            Overall Feedback History
                          </h4>
                          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                            {overallCommentHistory.map((c) => (
                              <div 
                                key={c.id} 
                                className={`rounded-lg p-2 border transition-all duration-500 ${
                                  c.isNew 
                                    ? 'bg-blue-50 border-blue-300 animate-slideInUp' 
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                              >
                                <div className="flex items-start justify-between mb-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-gray-900 text-[10px]">{c.author}</span>
                                    {c.isNew && (
                                      <span className="px-1.5 py-0.5 bg-blue-500 text-white text-[8px] rounded-full">
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] text-gray-500">{c.date} {c.time}</span>
                                </div>
                                <p className="text-[10px] text-gray-700 leading-relaxed mb-1">{c.message}</p>
                                <div className="flex items-center gap-1.5">
                                  <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] ${
                                    c.type === 'feedback' ? 'bg-blue-100 text-blue-700' :
                                    c.type === 'alert' ? 'bg-orange-100 text-orange-700' :
                                    'bg-purple-100 text-purple-700'
                                  }`}>
                                    {c.type}
                                  </span>
                                  <span className="text-[9px] text-gray-500">{c.role}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // KPI-Specific Coaching Tab
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                      {kpiList.map((kpi, idx) => {
                        const isExpanded = expandedKPIs.has(kpi.field);
                        const kpiHistory = commentHistory.filter(c => c.kpiName === kpi.name);
                        
                        return (
                          <div key={idx} className="border rounded-lg overflow-hidden transition-all border-gray-200">
                            {/* KPI Header */}
                            <div
                              onClick={() => toggleKPIExpand(kpi.field)}
                              className="p-2.5 cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1">
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                  )}
                                  <span className="text-xs text-gray-900">{kpi.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {parseFloat(kpi.achievement) >= 100 ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <TrendingDown className="w-4 h-4 text-orange-600" />
                                  )}
                                  <span className={`text-xs ${
                                    kpi.status === 'excellent' ? 'text-green-600' :
                                    kpi.status === 'good' ? 'text-blue-600' :
                                    'text-orange-600'
                                  }`}>
                                    {kpi.achievement}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Progress Info */}
                              <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-gray-600">
                                <span>Actual: {kpi.actual}</span>
                                <span>•</span>
                                <span>Target: {kpi.target}</span>
                                <span>•</span>
                                <span>Score: {kpi.score}</span>
                              </div>
                              
                              <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all ${
                                    kpi.status === 'excellent' ? 'bg-green-500' :
                                    kpi.status === 'good' ? 'bg-blue-500' :
                                    'bg-orange-500'
                                  }`}
                                  style={{ width: `${Math.min(parseFloat(kpi.achievement.replace('%', '')), 100)}%` }}
                                />
                              </div>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                              <div className="p-2.5 bg-white border-t border-gray-200">
                                {/* Comment Input */}
                                <div className="space-y-2 mb-2">
                                  <div className="flex gap-1.5">
                                    <button
                                      onClick={() => setCommentType('feedback')}
                                      className={`flex-1 px-2 py-1 rounded text-[9px] transition-colors ${
                                        commentType === 'feedback'
                                          ? 'bg-gray-700 text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      Feedback
                                    </button>
                                    <button
                                      onClick={() => setCommentType('alert')}
                                      className={`flex-1 px-2 py-1 rounded text-[9px] transition-colors ${
                                        commentType === 'alert'
                                          ? 'bg-gray-700 text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      Alert
                                    </button>
                                    <button
                                      onClick={() => setCommentType('coaching')}
                                      className={`flex-1 px-2 py-1 rounded text-[9px] transition-colors ${
                                        commentType === 'coaching'
                                          ? 'bg-gray-700 text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      Coaching
                                    </button>
                                  </div>
                                  
                                  <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder={`Enter coaching notes for ${kpi.name}...`}
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                                    rows={2}
                                  />
                                  
                                  <button
                                    onClick={() => handleSendComment(kpi.name)}
                                    className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 bg-gray-700 text-white text-[10px] rounded hover:bg-gray-800 transition-all"
                                  >
                                    <Send className="w-3 h-3" />
                                    Send Comment for {kpi.name}
                                  </button>
                                </div>

                                {/* Comment History */}
                                {kpiHistory.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <h4 className="text-[9px] text-gray-700 mb-1.5">Previous Comments</h4>
                                    <div className="space-y-1.5">
                                      {kpiHistory.map((c) => (
                                        <div 
                                          key={c.id} 
                                          className={`rounded p-1.5 text-[9px] border transition-all duration-500 ${
                                            c.isNew 
                                              ? 'bg-blue-50 border-blue-300 animate-slideInUp' 
                                              : 'bg-gray-50 border-transparent'
                                          }`}
                                        >
                                          <div className="flex items-start justify-between mb-0.5">
                                            <div className="flex items-center gap-1">
                                              <span className="text-gray-900">{c.author}</span>
                                              {c.isNew && (
                                                <span className="px-1.5 py-0.5 bg-blue-500 text-white text-[8px] rounded-full">
                                                  NEW
                                                </span>
                                              )}
                                            </div>
                                            <span className="text-gray-500 text-[8px]">{c.date} {c.time}</span>
                                          </div>
                                          <p className="text-gray-700 leading-relaxed mb-0.5">{c.message}</p>
                                          <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] ${
                                            c.type === 'feedback' ? 'bg-blue-100 text-blue-700' :
                                            c.type === 'alert' ? 'bg-orange-100 text-orange-700' :
                                            'bg-purple-100 text-purple-700'
                                          }`}>
                                            {c.type}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
