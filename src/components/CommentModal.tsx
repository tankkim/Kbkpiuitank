import { useState } from 'react';
import { X, Send, MessageSquare, AlertCircle } from 'lucide-react';
import { Comment } from '../data/communicationData';

interface CommentModalProps {
  employeeName: string;
  employeeId: string;
  existingComments: Comment[];
  onClose: () => void;
  onSubmit: (message: string, type: 'comment' | 'feedback' | 'alert') => void;
}

export function CommentModal({ employeeName, employeeId, existingComments, onClose, onSubmit }: CommentModalProps) {
  const [message, setMessage] = useState('');
  const [commentType, setCommentType] = useState<'comment' | 'feedback' | 'alert'>('comment');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message, commentType);
      setMessage('');
      onClose();
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6" />
            <div>
              <h2 className="text-lg">Communication with {employeeName}</h2>
              <p className="text-xs opacity-90">ID: {employeeId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comment History */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {existingComments.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No previous comments</p>
              <p className="text-sm text-gray-500 mt-1">Start a conversation with this employee</p>
            </div>
          ) : (
            <div className="space-y-4">
              {existingComments
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((comment) => (
                  <div key={comment.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-900">
                          {comment.fromUserName}
                          <span className="text-xs text-gray-500 ml-2">({comment.fromUserRole})</span>
                        </p>
                        <p className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
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
                    <p className="text-sm text-gray-700 mt-2">{comment.message}</p>
                    {comment.relatedMetric && (
                      <div className="mt-2 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {comment.relatedMetric} • {comment.relatedPeriod}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* New Comment Input */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-2">Comment Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setCommentType('comment')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                  commentType === 'comment'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Comment
              </button>
              <button
                onClick={() => setCommentType('feedback')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                  commentType === 'feedback'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                👍 Feedback
              </button>
              <button
                onClick={() => setCommentType('alert')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                  commentType === 'alert'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Alert
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-2">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              placeholder="Type your message here... This will send a push notification to the employee."
            />
          </div>

          {commentType === 'alert' && (
            <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <p className="text-xs text-yellow-800">
                Alert messages will send a high-priority push notification to the employee's mobile device.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send & Notify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
