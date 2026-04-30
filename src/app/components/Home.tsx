import { useState, useEffect, useRef } from 'react';
import { KPIScoreCard } from './home/KPIScoreCard';
import { IndicatorKPI } from './home/IndicatorKPI';
import { MainIndicatorsCharts } from './home/MainIndicatorsCharts';
import { AchievementOfScopeKPI } from './home/AchievementOfScopeKPI';
import { MovementChart } from './home/MovementChart';
import { BranchRankPanel } from './home/BranchRankPanel';
import { PageHeader } from './PageHeader';
import { MessageSquare } from 'lucide-react';

interface HomeProps {
  simulatedScore?: number;
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

export function Home({ 
  simulatedScore = 11.66,
  unreadNotificationsCount = 0,
  onNotificationClick
}: HomeProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock feedback data with comments - now as state
  const [allFeedbacks, setAllFeedbacks] = useState([
    {
      id: 1,
      fromName: 'Sarah Johnson',
      initials: 'SJ',
      role: 'Branch Manager',
      message: 'Great progress on CASA targets! Keep focusing on digital account acquisition.',
      timestamp: '2h ago',
      type: 'FEEDBACK',
      isRead: false,
      bgColor: 'bg-blue-600',
      kpiRelated: 'CASA Increase',
      kpiData: {
        actual: '245 Accounts',
        target: '200 Accounts',
        achievement: '122%',
        points: '450 / 500'
      },
      comments: [
        { id: 1, author: 'You', message: 'Thank you for the feedback! I will focus on this.', timestamp: '1h ago' },
        { id: 2, author: 'Sarah Johnson', message: 'Let me know if you need any support.', timestamp: '45m ago' }
      ]
    },
    {
      id: 2,
      fromName: 'Regional Manager',
      initials: 'RM',
      role: 'Regional Head',
      message: 'Your cross-selling numbers are excellent. Consider sharing best practices with team.',
      timestamp: '1 day ago',
      type: 'COMMENT',
      isRead: true,
      bgColor: 'bg-indigo-600',
      kpiRelated: 'Cross Selling',
      kpiData: {
        actual: '89 Products',
        target: '75 Products',
        achievement: '119%',
        points: '380 / 400'
      },
      comments: [
        { id: 1, author: 'You', message: 'I would be happy to share my approach in the next team meeting.', timestamp: '20h ago' }
      ]
    },
    {
      id: 3,
      fromName: 'David Chen',
      initials: 'DC',
      role: 'Supervisor',
      message: 'Please update your KPI comments for Q4 targets.',
      timestamp: '2 days ago',
      type: 'ALERT',
      isRead: true,
      bgColor: 'bg-purple-600',
      kpiRelated: 'All KPIs',
      kpiData: {
        actual: 'N/A',
        target: 'N/A',
        achievement: 'N/A',
        points: 'N/A'
      },
      comments: []
    },
    {
      id: 4,
      fromName: 'Maria Santos',
      initials: 'MS',
      role: 'Team Lead',
      message: 'Excellent work on customer retention metrics this month!',
      timestamp: '3 days ago',
      type: 'FEEDBACK',
      isRead: true,
      bgColor: 'bg-teal-600',
      kpiRelated: 'Strategic Innovation',
      kpiData: {
        actual: '95%',
        target: '85%',
        achievement: '112%',
        points: '340 / 350'
      },
      comments: [
        { id: 1, author: 'You', message: 'Thank you Maria! The new engagement strategy is working well.', timestamp: '2 days ago' }
      ]
    },
    {
      id: 5,
      fromName: 'John Williams',
      initials: 'JW',
      role: 'Division Head',
      message: 'Your digital banking KPI performance is outstanding. Keep up the momentum!',
      timestamp: '4 days ago',
      type: 'FEEDBACK',
      isRead: true,
      bgColor: 'bg-emerald-600',
      kpiRelated: 'Digital',
      kpiData: {
        actual: '156 Transactions',
        target: '120 Transactions',
        achievement: '130%',
        points: '500 / 500'
      },
      comments: []
    }
  ]);

  const unreadCount = allFeedbacks.filter(f => !f.isRead).length;

  // Handle sending reply
  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedFeedback) return;

    // Add new comment to the selected feedback
    const newComment = {
      id: selectedFeedback.comments.length + 1,
      author: 'You',
      message: replyMessage.trim(),
      timestamp: 'Just now'
    };

    setAllFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(feedback =>
        feedback.id === selectedFeedback.id
          ? { ...feedback, comments: [...feedback.comments, newComment] }
          : feedback
      )
    );

    // Update selected feedback to show new comment
    setSelectedFeedback({
      ...selectedFeedback,
      comments: [...selectedFeedback.comments, newComment]
    });

    // Clear input
    setReplyMessage('');
  };

  // Scroll to the end of the messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedFeedback]);

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Header with DatePicker and Notification */}
      <PageHeader
        title="KB Bank Indonesia"
        subtitle="Performance Dashboard"
        unreadNotificationsCount={unreadCount}
        onNotificationClick={onNotificationClick}
        showDatePicker={true}
        selectedDate={selectedDate}
        onDateChange={(date) => date && setSelectedDate(date)}
      />

      <div className="max-w-[1800px] mx-auto p-6">
        {/* Top Row: Left (Your KPI + Feedback + Movement) / Right (Indicator KPI + Branch Rank) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Left Column: Your KPI + Supervisor's Feedback + Movement Chart */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <KPIScoreCard simulatedScore={simulatedScore} />
            
            {/* Supervisor's Feedback - Flexible height to match right column */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2.5 cursor-pointer" onClick={() => setShowFeedbackModal(true)}>
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs text-gray-900">Supervisor&apos;s Feedback</h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[9px]">
                    {unreadCount}
                  </span>
                )}
                <span className="ml-auto text-[9px] text-blue-600 hover:text-blue-700">View all →</span>
              </div>
              
              {/* Show all 5 feedbacks with enhanced UI */}
              <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
                {allFeedbacks.map((feedback) => (
                  <div 
                    key={feedback.id} 
                    className={`group relative flex items-start gap-2 p-2 rounded-lg border-l-2 transition-all cursor-pointer ${
                      !feedback.isRead 
                        ? 'bg-blue-50/80 border-l-blue-500 hover:bg-blue-100/80 hover:shadow-sm' 
                        : 'bg-gray-50/50 border-l-gray-300 hover:bg-gray-100/80 hover:shadow-sm'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeedback(feedback);
                    }}
                  >
                    {/* Avatar with status indicator */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-6 h-6 rounded-full ${feedback.bgColor} text-white flex items-center justify-center text-[8px] shadow-sm`}>
                        {feedback.initials}
                      </div>
                      {!feedback.isRead && (
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 border border-white rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="text-[9px] text-gray-900 truncate">{feedback.fromName}</p>
                        <span className={`text-[7px] px-1 py-0.5 rounded-full font-medium ${
                          feedback.type === 'FEEDBACK' 
                            ? 'bg-green-500 text-white' 
                            : feedback.type === 'COMMENT' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {feedback.type}
                        </span>
                        {feedback.comments.length > 0 && (
                          <span className="text-[7px] px-1 py-0.5 bg-gray-200 text-gray-700 rounded-full ml-auto">
                            {feedback.comments.length}
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] text-gray-700 leading-snug line-clamp-1">{feedback.message}</p>
                      
                      {/* KPI tag */}
                      <span className="inline-block text-[7px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded mt-0.5">
                        📊 {feedback.kpiRelated}
                      </span>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Movement Chart */}
            <MovementChart />
          </div>
          
          {/* Right Column: Indicator KPI + Branch Rank Panel */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <IndicatorKPI />
            <BranchRankPanel />
          </div>
        </div>

        {/* Second Row: Main and Lowest Indicators */}
        <div className="mb-6">
          <MainIndicatorsCharts />
        </div>

        {/* Third Row: Achievement of Scope KPI */}
        <div className="mb-6">
          <AchievementOfScopeKPI />
        </div>
      </div>

      {/* Feedback Modal - Simple placeholder for now */}
      {showFeedbackModal && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
          onClick={() => setShowFeedbackModal(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <h2 className="text-sm">All Feedback</h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px]">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button 
                onClick={() => setShowFeedbackModal(false)} 
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Feedback List */}
            <div className="p-5 space-y-3 max-h-[calc(85vh-70px)] overflow-y-auto bg-gray-50">
              {allFeedbacks.map(feedback => (
                <div 
                  key={feedback.id} 
                  className={`bg-white border rounded-lg p-3.5 transition-all hover:shadow-md cursor-pointer ${
                    !feedback.isRead ? 'border-blue-300 shadow-sm' : 'border-gray-200'
                  }`}
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedFeedback(feedback);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full ${feedback.bgColor} text-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm`}>
                      {feedback.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs text-gray-900">{feedback.fromName}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          feedback.type === 'FEEDBACK' 
                            ? 'bg-green-500 text-white' 
                            : feedback.type === 'COMMENT' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {feedback.type}
                        </span>
                        {!feedback.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                        {feedback.comments.length > 0 && (
                          <span className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full ml-auto">
                            {feedback.comments.length} {feedback.comments.length === 1 ? 'reply' : 'replies'}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-2">{feedback.timestamp}</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{feedback.message}</p>
                      <div className="mt-2">
                        <span className="inline-block text-[9px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          📊 {feedback.kpiRelated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Individual Feedback Detail Modal - Same as My Performance KPI Modal */}
      {selectedFeedback && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-6" 
          onClick={() => setSelectedFeedback(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Gray minimalist style */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center text-[9px] flex-shrink-0">
                    {selectedFeedback.initials}
                  </div>
                  <div>
                    <h2 className="text-sm text-gray-900">{selectedFeedback.kpiRelated}</h2>
                    <p className="text-[10px] text-gray-600">{selectedFeedback.fromName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFeedback(null)} 
                  className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* KPI Performance Stats - 4 Boxes like My Performance */}
              <div className="grid grid-cols-4 gap-3 bg-white rounded-lg p-2 border border-gray-200">
                <div>
                  <p className="text-[9px] text-gray-600">Actual</p>
                  <p className="text-xs text-gray-900">{selectedFeedback.kpiData.actual}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-600">Target</p>
                  <p className="text-xs text-gray-900">{selectedFeedback.kpiData.target}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-600">Achievement</p>
                  <p className="text-xs text-gray-900">{selectedFeedback.kpiData.achievement}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-600">Points</p>
                  <p className="text-xs text-gray-900">{selectedFeedback.kpiData.points}</p>
                </div>
              </div>
            </div>

            {/* Conversation Thread - Chat Style */}
            <div className="flex-1 overflow-auto p-4 bg-gray-50">
              {/* Original Message */}
              <div className="mb-4">
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center text-[9px] flex-shrink-0">
                        {selectedFeedback.initials}
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-900">{selectedFeedback.fromName}</p>
                        <p className="text-[9px] text-gray-500">{selectedFeedback.timestamp}</p>
                      </div>
                    </div>
                    <div className={`rounded-lg px-3 py-2 text-xs ${
                      selectedFeedback.type === 'ALERT'
                        ? 'bg-red-50 border border-red-200 text-gray-900'
                        : selectedFeedback.type === 'FEEDBACK'
                        ? 'bg-green-50 border border-green-200 text-gray-900'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p>{selectedFeedback.message}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {selectedFeedback.comments.length > 0 ? (
                <div className="space-y-3">
                  {selectedFeedback.comments.map((comment: any, index: number) => {
                    const isCurrentUser = comment.author === 'You';
                    const isNew = comment.timestamp === 'Just now';
                    return (
                      <div 
                        key={comment.id}
                        className={isNew ? 'animate-slideInUp' : ''}
                      >
                        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <div className="max-w-[80%]">
                            <div className={`flex items-center gap-1.5 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                              {!isCurrentUser && (
                                <div className="w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center text-[9px] flex-shrink-0">
                                  {comment.author.substring(0, 2)}
                                </div>
                              )}
                              <div className={`${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                <p className="text-[10px] text-gray-900">{comment.author}</p>
                                <p className="text-[9px] text-gray-500">{comment.timestamp}</p>
                              </div>
                              {isCurrentUser && (
                                <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[9px] flex-shrink-0">
                                  👤
                                </div>
                              )}
                            </div>
                            <div className={`rounded-lg px-3 py-2 text-xs ${
                              isCurrentUser
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-900'
                            }`}>
                              <p>{comment.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">No comments yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Be the first to respond to this feedback
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input */}
            <div className="border-t border-gray-200 p-3 bg-white">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    placeholder="Type your reply..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    rows={2}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                  />
                  <p className="text-[9px] text-gray-500 mt-1">
                    Press Enter to send, Shift + Enter for new line
                  </p>
                </div>
                <button className="self-start px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-1.5 text-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSendReply} disabled={!replyMessage.trim()}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}