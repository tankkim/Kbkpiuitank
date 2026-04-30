// Communication and notification data structures

export interface Comment {
  id: string;
  employeeId: string;
  employeeName: string;
  fromUserId: string;
  fromUserName: string;
  fromUserRole: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'comment' | 'feedback' | 'alert';
  kpiMetric?: string; // Specific KPI this comment is about
  relatedPeriod?: string;
  parentId?: string; // For threaded conversations
  canReply?: boolean; // Employee can reply to supervisor
}

export interface Notification {
  id: string;
  userId: string;
  type: 'goal_achieved' | 'goal_missed' | 'comment' | 'early_alert' | 'recognition';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  relatedData?: {
    achievement?: number;
    metric?: string;
    period?: string;
  };
}

// Sample comments for current employee
export const myComments: Comment[] = [
  {
    id: 'cmt-001',
    employeeId: 'EMP-2024-0456',
    employeeName: 'Sarah Johnson',
    fromUserId: 'MGR-001',
    fromUserName: 'David Kim',
    fromUserRole: 'Branch Manager',
    message: 'Great improvement on Cross-Selling this month! Keep up the excellent work. Your BANCASSURANCE numbers are outstanding.',
    timestamp: '2025-12-04T14:30:00Z',
    isRead: true,
    type: 'feedback',
    kpiMetric: 'Cross-Selling',
    relatedPeriod: 'October 2025',
  },
  {
    id: 'cmt-002',
    employeeId: 'EMP-2024-0456',
    employeeName: 'Sarah Johnson',
    fromUserId: 'MGR-001',
    fromUserName: 'David Kim',
    fromUserRole: 'Branch Manager',
    message: 'I noticed your CASA Increase target is at 85%. Let\'s discuss strategies to improve this before month-end. Please see me tomorrow at 10 AM.',
    timestamp: '2025-12-03T09:15:00Z',
    isRead: false,
    type: 'alert',
    kpiMetric: 'CASA Increase',
    relatedPeriod: 'December 2025',
  },
  {
    id: 'cmt-003',
    employeeId: 'EMP-2024-0456',
    employeeName: 'Sarah Johnson',
    fromUserId: 'RH-001',
    fromUserName: 'John Doe',
    fromUserRole: 'Region Head',
    message: 'Congratulations on achieving 103% last month! You are a role model for the region. Excellent performance on Merchant QRIS.',
    timestamp: '2025-11-01T16:45:00Z',
    isRead: true,
    type: 'feedback',
    kpiMetric: 'Overall Achievement',
    relatedPeriod: 'October 2025',
  },
  {
    id: 'cmt-004',
    employeeId: 'EMP-2024-0456',
    employeeName: 'Sarah Johnson',
    fromUserId: 'MGR-001',
    fromUserName: 'David Kim',
    fromUserRole: 'Branch Manager',
    message: 'Your New To Priority customer acquisition needs attention. Current: 7 accounts, Target: 10 accounts. Focus on this KPI this week.',
    timestamp: '2025-12-02T11:20:00Z',
    isRead: false,
    type: 'alert',
    kpiMetric: 'New To Priority',
    relatedPeriod: 'December 2025',
  },
];

// Sample notifications
export const myNotifications: Notification[] = [
  {
    id: 'notif-001',
    userId: 'EMP-2024-0456',
    type: 'comment',
    title: 'New Comment from Branch Manager',
    message: 'David Kim commented on your CASA Increase performance',
    timestamp: '2025-12-03T09:15:00Z',
    isRead: false,
    priority: 'high',
    actionUrl: '/my-performance',
  },
  {
    id: 'notif-002',
    userId: 'EMP-2024-0456',
    type: 'goal_achieved',
    title: 'Congratulations! Goal Achieved',
    message: 'You achieved 103% of your target for October 2025!',
    timestamp: '2025-11-01T00:00:00Z',
    isRead: true,
    priority: 'medium',
    relatedData: {
      achievement: 103,
      period: 'October 2025',
    },
  },
  {
    id: 'notif-003',
    userId: 'EMP-2024-0456',
    type: 'comment',
    title: 'New Feedback from Region Head',
    message: 'John Doe sent you a recognition message',
    timestamp: '2025-11-01T16:45:00Z',
    isRead: true,
    priority: 'medium',
    actionUrl: '/my-performance',
  },
  {
    id: 'notif-004',
    userId: 'EMP-2024-0456',
    type: 'early_alert',
    title: 'Performance Alert',
    message: 'Your current achievement is 85%. Action required to meet monthly target.',
    timestamp: '2025-12-02T08:00:00Z',
    isRead: false,
    priority: 'high',
    relatedData: {
      achievement: 85,
      metric: 'Overall Performance',
      period: 'December 2025',
    },
  },
  {
    id: 'notif-005',
    userId: 'EMP-2024-0456',
    type: 'comment',
    title: 'New Alert from Branch Manager',
    message: 'David Kim flagged your New To Priority performance',
    timestamp: '2025-12-02T11:20:00Z',
    isRead: false,
    priority: 'high',
    actionUrl: '/my-performance',
  },
  {
    id: 'notif-006',
    userId: 'EMP-2024-0456',
    type: 'recognition',
    title: 'Special Recognition',
    message: 'You ranked #3 in branch performance for October!',
    timestamp: '2025-11-02T10:00:00Z',
    isRead: true,
    priority: 'low',
  },
];

// All employees comments (for supervisor view)
export const allEmployeeComments: Comment[] = [
  {
    id: 'cmt-101',
    employeeId: 'EMP-2024-0123',
    employeeName: 'Michael Chen',
    fromUserId: 'MGR-001',
    fromUserName: 'David Kim',
    fromUserRole: 'Branch Manager',
    message: 'Outstanding performance on RM PENSION. You are setting a great example for the team!',
    timestamp: '2025-12-04T10:00:00Z',
    isRead: true,
    type: 'feedback',
    kpiMetric: 'Overall Achievement',
    relatedPeriod: 'November 2025',
  },
  {
    id: 'cmt-102',
    employeeId: 'EMP-2024-0234',
    employeeName: 'Lisa Wang',
    fromUserId: 'MGR-001',
    fromUserName: 'David Kim',
    fromUserRole: 'Branch Manager',
    message: 'Your mortgage performance is excellent, but we need to improve on cross-selling. Let\'s schedule a coaching session.',
    timestamp: '2025-12-03T15:30:00Z',
    isRead: false,
    type: 'alert',
    kpiMetric: 'Cross-Selling',
    relatedPeriod: 'December 2025',
  },
  ...myComments,
];

// Comment statistics
export interface CommentStats {
  totalComments: number;
  unreadComments: number;
  feedbackCount: number;
  alertCount: number;
  lastCommentDate: string;
}

export const getCommentStats = (comments: Comment[]): CommentStats => {
  return {
    totalComments: comments.length,
    unreadComments: comments.filter(c => !c.isRead).length,
    feedbackCount: comments.filter(c => c.type === 'feedback').length,
    alertCount: comments.filter(c => c.type === 'alert').length,
    lastCommentDate: comments.length > 0 ? comments[0].timestamp : '',
  };
};