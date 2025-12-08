import { useState } from 'react';
import { X, Send, MessageSquare, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from 'lucide-react';
import { Comment } from '../data/communicationData';
import { IndividualKPIMetric } from '../data/individualKPIData';

interface KPIThreadModalProps {
  kpi: IndividualKPIMetric;
  comments: Comment[];
  onClose: () => void;
  onSendReply: (message: string) => void;
  currentUserId: string;
  currentUserName: string;
}

export function KPIThreadModal({ kpi, comments, onClose, onSendReply, currentUserId, currentUserName }: KPIThreadModalProps) {
  const [replyMessage, setReplyMessage] = useState('');

  const handleSend = () => {
    if (replyMessage.trim()) {
      onSendReply(replyMessage);
      setReplyMessage('');
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

  const getStatusIcon = () => {
    switch (kpi.status) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <Minus className="w-5 h-5 text-yellow-600" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (kpi.status) {
      case 'excellent': return 'from-green-600 to-emerald-600';
      case 'good': return 'from-blue-600 to-indigo-600';
      case 'warning': return 'from-yellow-600 to-orange-600';
      case 'critical': return 'from-red-600 to-rose-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with KPI Info */}
        <div className={`bg-gradient-to-r ${getStatusColor()} text-white px-6 py-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <h2 className="text-lg">{kpi.kpiName}</h2>
                <p className="text-xs opacity-90">{kpi.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* KPI Performance Stats */}
          <div className="grid grid-cols-4 gap-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div>
              <p className="text-xs opacity-75">Actual</p>
              <p className="text-sm">{kpi.actual.toLocaleString()} {kpi.unit}</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Target</p>
              <p className="text-sm">{kpi.target.toLocaleString()} {kpi.unit}</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Achievement</p>
              <p className="text-sm">{kpi.achievement}%</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Points</p>
              <p className="text-sm">{kpi.points} / {kpi.maxPoints}</p>
            </div>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No comments yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Your supervisor will provide feedback about this KPI here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => {
                const isCurrentUser = comment.fromUserId === currentUserId;
                const isReply = !!comment.parentId;
                
                return (
                  <div 
                    key={comment.id} 
                    className={`${isReply ? 'ml-8' : ''}`}
                  >
                    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                        {/* Message Header */}
                        <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {!isCurrentUser && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs flex-shrink-0">
                              {comment.fromUserName.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div className={`${isCurrentUser ? 'text-right' : 'text-left'}`}>
                            <p className="text-xs text-gray-900">
                              {comment.fromUserName}
                              {!isCurrentUser && (
                                <span className="text-gray-500 ml-1">({comment.fromUserRole})</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</p>
                          </div>
                          {isCurrentUser && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center text-xs flex-shrink-0">
                              {comment.fromUserName.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            isCurrentUser
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                              : comment.type === 'alert'
                              ? 'bg-red-50 border-2 border-red-200 text-gray-900'
                              : comment.type === 'feedback'
                              ? 'bg-green-50 border-2 border-green-200 text-gray-900'
                              : 'bg-white border-2 border-gray-200 text-gray-900'
                          }`}
                        >
                          {!isCurrentUser && comment.type === 'alert' && (
                            <div className="flex items-center gap-2 mb-2 text-red-700">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs">Action Required</span>
                            </div>
                          )}
                          <p className="text-sm">{comment.message}</p>
                          {!comment.isRead && !isCurrentUser && (
                            <div className="mt-2 text-xs opacity-75 flex items-center gap-1">
                              <div className="w-2 h-2 bg-current rounded-full"></div>
                              <span>New</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Reply Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
            <button
              onClick={handleSend}
              disabled={!replyMessage.trim()}
              className="self-start px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
