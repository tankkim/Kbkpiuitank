import { useState } from 'react';
import { ChevronLeft, Send, CheckCircle, TrendingUp, Minus, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCommentsForKPI } from '../../data/kpiComments';
import { currentEmployee } from '../../data/myPerformanceData';

interface KPIDetailScreenProps {
  kpiName: string;
  kpiData: {
    kpiName: string;
    actual: number;
    target: number;
    achievement: number;
    status: string;
    points: number;
  };
  onBack: () => void;
}

export function KPIDetailScreen({ kpiName, kpiData, onBack }: KPIDetailScreenProps) {
  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState(getCommentsForKPI(kpiName));
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      setIsSending(true);
      setTimeout(() => {
        // Add new comment to the list
        const newComment = {
          id: `comment-${Date.now()}`,
          fromUserId: currentEmployee.nip,
          fromUserName: currentEmployee.name,
          fromUserRole: currentEmployee.position,
          toUserId: currentEmployee.nip,
          toUserName: currentEmployee.name,
          kpiName: kpiName,
          message: replyText,
          type: 'comment' as const,
          timestamp: new Date().toISOString(),
          isRead: true
        };
        
        setComments([...comments, newComment]);
        setReplyText('');
        setIsSending(false);
        setShowSuccess(true);
        
        // Auto-scroll to bottom to show new comment
        setTimeout(() => {
          const commentsContainer = document.querySelector('.max-h-72.overflow-y-auto');
          if (commentsContainer) {
            commentsContainer.scrollTop = commentsContainer.scrollHeight;
          }
        }, 100);
        
        setTimeout(() => setShowSuccess(false), 2000);
      }, 1000);
    }
  };

  const getStatusIcon = () => {
    switch (kpiData.status) {
      case 'excellent': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'good': return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'warning': return <Minus className="w-6 h-6 text-yellow-600" />;
      case 'critical': return <AlertCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (kpiData.status) {
      case 'excellent': return 'from-green-500 to-emerald-600';
      case 'good': return 'from-blue-500 to-indigo-600';
      case 'warning': return 'from-yellow-500 to-orange-600';
      case 'critical': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  // Mock monthly data
  const monthlyData = [
    { month: 'Jan', actual: kpiData.actual * 0.7, target: kpiData.target },
    { month: 'Feb', actual: kpiData.actual * 0.75, target: kpiData.target },
    { month: 'Mar', actual: kpiData.actual * 0.8, target: kpiData.target },
    { month: 'Apr', actual: kpiData.actual * 0.85, target: kpiData.target },
    { month: 'May', actual: kpiData.actual * 0.9, target: kpiData.target },
    { month: 'Jun', actual: kpiData.actual * 0.92, target: kpiData.target },
    { month: 'Jul', actual: kpiData.actual * 0.94, target: kpiData.target },
    { month: 'Aug', actual: kpiData.actual * 0.96, target: kpiData.target },
    { month: 'Sep', actual: kpiData.actual * 0.98, target: kpiData.target },
    { month: 'Oct', actual: kpiData.actual, target: kpiData.target },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center sticky top-0 z-10">
        <button onClick={onBack} className="p-1 -ml-1 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-sm font-semibold text-gray-900 ml-2 truncate">{kpiName}</h1>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2.5">
        {/* Achievement Card - Ultra Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="scale-75">
                {getStatusIcon()}
              </div>
              <div>
                <p className="text-[9px] text-gray-600">Achievement</p>
                <p className="text-xl font-bold text-gray-900">{kpiData.achievement.toFixed(1)}%</p>
              </div>
            </div>
            <div className={`px-2 py-0.5 rounded text-[9px] font-medium ${
              kpiData.status === 'excellent' ? 'bg-green-100 text-green-800' :
              kpiData.status === 'good' ? 'bg-blue-100 text-blue-800' :
              kpiData.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {kpiData.status.toUpperCase()}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div 
              className={`h-1.5 rounded-full ${
                kpiData.status === 'excellent' ? 'bg-green-500' :
                kpiData.status === 'good' ? 'bg-blue-500' :
                kpiData.status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${Math.min(kpiData.achievement, 100)}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-gray-50 rounded border border-gray-100 p-1.5 text-center">
              <p className="text-[8px] text-gray-600">Actual</p>
              <p className="text-xs font-semibold text-gray-900">{kpiData.actual.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded border border-gray-100 p-1.5 text-center">
              <p className="text-[8px] text-gray-600">Target</p>
              <p className="text-xs font-semibold text-gray-900">{kpiData.target.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded border border-green-100 p-1.5 text-center">
              <p className="text-[8px] text-gray-600">Points</p>
              <p className="text-xs font-semibold text-green-600">{kpiData.points}</p>
            </div>
          </div>
        </div>

        {/* Monthly Progress Chart - Ultra Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#4a5f7f] text-white px-2.5 py-1.5 flex items-center justify-between">
            <h3 className="text-[10px] font-semibold">Monthly Progress</h3>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 8 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 8 }} stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ fontSize: '9px', borderRadius: '4px', border: '1px solid #e5e7eb', padding: '4px 8px' }}
                />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual" radius={[3, 3, 0, 0]} />
                <Bar dataKey="target" fill="#ef4444" name="Target" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comments Section - Ultra Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#4a5f7f] text-white px-2.5 py-1.5 flex items-center justify-between">
            <h3 className="text-[10px] font-semibold">Comments & Feedback</h3>
            <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">{comments.length}</span>
          </div>

          <div className="p-2.5 space-y-1.5 max-h-72 overflow-y-auto">
            {comments.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p className="text-[10px]">No comments yet</p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`p-2 rounded border transition-all duration-300 ${
                    !comment.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  } ${index === comments.length - 1 && isSending === false && comment.id.includes(Date.now().toString().slice(0, -3)) ? 'animate-slideInUp border-green-400' : ''}`}
                >
                  <div className="flex items-start gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-[9px] flex-shrink-0 font-medium">
                      {comment.fromUserName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-[10px] font-medium text-gray-900 truncate">{comment.fromUserName}</p>
                        <span
                          className={`text-[7px] px-1 py-0.5 rounded font-medium flex-shrink-0 ${
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
                      <p className="text-[8px] text-gray-500 mb-0.5">
                        {comment.fromUserRole} • {getTimeAgo(comment.timestamp)}
                      </p>
                      <p className="text-[9px] text-gray-700 leading-snug">{comment.message}</p>
                    </div>
                  </div>

                  {/* Reply buttons */}
                  <div className="flex gap-2 mt-1 ml-7">
                    <button className="text-[9px] text-blue-600 hover:underline font-medium">Reply</button>
                    {!comment.isRead && (
                      <button className="text-[9px] text-gray-600 hover:underline">Mark as Read</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Reply Input - Ultra Compact */}
          <div className="p-2 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSendReply}
                disabled={!replyText.trim() || isSending}
                className="px-2.5 py-1 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                {isSending ? (
                  <svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send className="w-3 h-3" />
                )}
              </button>
            </div>
            {showSuccess && (
              <div className="mt-1 text-[9px] text-green-600">Reply sent successfully!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}