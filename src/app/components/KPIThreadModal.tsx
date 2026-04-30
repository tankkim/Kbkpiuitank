import { useState, useEffect, useRef } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new comment is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Gray minimalist style */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <div>
                <h2 className="text-sm text-gray-900">{kpi.kpiName}</h2>
                <p className="text-[10px] text-gray-600">{kpi.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* KPI Performance Stats */}
          <div className="grid grid-cols-4 gap-3 bg-white rounded-lg p-2 border border-gray-200">
            <div>
              <p className="text-[9px] text-gray-600">Actual</p>
              <p className="text-xs text-gray-900">{kpi.actual.toLocaleString()} {kpi.unit}</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-600">Target</p>
              <p className="text-xs text-gray-900">{kpi.target.toLocaleString()} {kpi.unit}</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-600">Achievement</p>
              <p className="text-xs text-gray-900">{kpi.achievement}%</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-600">Points</p>
              <p className="text-xs text-gray-900">{kpi.points} / {kpi.maxPoints}</p>
            </div>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-600">No comments yet</p>
              <p className="text-xs text-gray-500 mt-1">
                Your supervisor will provide feedback about this KPI here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => {
                const isCurrentUser = comment.fromUserId === currentUserId;
                const isReply = !!comment.parentId;
                const isNew = getTimeAgo(comment.timestamp) === 'Just now';
                
                return (
                  <div 
                    key={comment.id} 
                    className={`${isReply ? 'ml-6' : ''} ${isNew ? 'animate-slideInUp' : ''}`}
                  >
                    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                        {/* Message Header */}
                        <div className={`flex items-center gap-1.5 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {!isCurrentUser && (
                            <div className="w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center text-[9px] flex-shrink-0">
                              {comment.fromUserName.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div className={`${isCurrentUser ? 'text-right' : 'text-left'}`}>
                            <p className="text-[10px] text-gray-900">
                              {comment.fromUserName}
                              {!isCurrentUser && (
                                <span className="text-gray-500 ml-1">({comment.fromUserRole})</span>
                              )}
                            </p>
                            <p className="text-[9px] text-gray-500">{getTimeAgo(comment.timestamp)}</p>
                          </div>
                          {isCurrentUser && (
                            <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[9px] flex-shrink-0">
                              {comment.fromUserName.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`rounded-lg px-3 py-2 text-xs ${
                            isCurrentUser
                              ? 'bg-blue-600 text-white'
                              : comment.type === 'alert'
                              ? 'bg-red-50 border border-red-200 text-gray-900'
                              : comment.type === 'feedback'
                              ? 'bg-green-50 border border-green-200 text-gray-900'
                              : 'bg-white border border-gray-200 text-gray-900'
                          }`}
                        >
                          {!isCurrentUser && comment.type === 'alert' && (
                            <div className="flex items-center gap-1.5 mb-1.5 text-red-700">
                              <AlertCircle className="w-3 h-3" />
                              <span className="text-[9px]">Action Required</span>
                            </div>
                          )}
                          <p className="text-xs">{comment.message}</p>
                          {!comment.isRead && !isCurrentUser && (
                            <div className="mt-1.5 text-[9px] opacity-75 flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                              <span>New</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Reply Input */}
        <div className="border-t border-gray-200 p-3 bg-white">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <p className="text-[9px] text-gray-500 mt-1">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
            <button
              onClick={handleSend}
              disabled={!replyMessage.trim()}
              className="self-start px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}