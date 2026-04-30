// Individual employee KPI performance data

export interface IndividualKPIMetric {
  kpiName: string;
  category: string;
  actual: number;
  target: number;
  achievement: number;
  points: number;
  maxPoints: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  commentCount: number;
  hasUnreadComments: boolean;
}

// Sarah Johnson's detailed KPI performance for December 2025
export const myDetailedKPIMetrics: IndividualKPIMetric[] = [
  // Funding Growth
  {
    kpiName: 'CASA Increase',
    category: 'Funding Growth',
    actual: 850,
    target: 1000,
    achievement: 85,
    points: 170,
    maxPoints: 200,
    unit: 'M IDR',
    status: 'warning',
    commentCount: 3,
    hasUnreadComments: true,
  },
  {
    kpiName: 'TD Increase',
    category: 'Funding Growth',
    actual: 1200,
    target: 1000,
    achievement: 120,
    points: 240,
    maxPoints: 200,
    unit: 'M IDR',
    status: 'excellent',
    commentCount: 1,
    hasUnreadComments: false,
  },
  
  // Lending Growth
  {
    kpiName: 'Kredit Investasi',
    category: 'Lending Growth',
    actual: 2500,
    target: 2800,
    achievement: 89,
    points: 178,
    maxPoints: 200,
    unit: 'M IDR',
    status: 'warning',
    commentCount: 2,
    hasUnreadComments: true,
  },
  {
    kpiName: 'Kredit Modal Kerja',
    category: 'Lending Growth',
    actual: 3200,
    target: 3000,
    achievement: 107,
    points: 214,
    maxPoints: 200,
    unit: 'M IDR',
    status: 'good',
    commentCount: 0,
    hasUnreadComments: false,
  },
  {
    kpiName: 'Kredit Konsumsi',
    category: 'Lending Growth',
    actual: 1800,
    target: 2000,
    achievement: 90,
    points: 180,
    maxPoints: 200,
    unit: 'M IDR',
    status: 'good',
    commentCount: 1,
    hasUnreadComments: false,
  },

  // Fee Income
  {
    kpiName: 'Bancassurance',
    category: 'Fee Income',
    actual: 12,
    target: 10,
    achievement: 120,
    points: 360,
    maxPoints: 300,
    unit: 'Accounts',
    status: 'excellent',
    commentCount: 2,
    hasUnreadComments: false,
  },
  {
    kpiName: 'Bank Guarantee',
    category: 'Fee Income',
    actual: 8,
    target: 10,
    achievement: 80,
    points: 240,
    maxPoints: 300,
    unit: 'Accounts',
    status: 'warning',
    commentCount: 1,
    hasUnreadComments: true,
  },
  {
    kpiName: 'Credit Card',
    category: 'Fee Income',
    actual: 6,
    target: 8,
    achievement: 75,
    points: 180,
    maxPoints: 240,
    unit: 'Accounts',
    status: 'critical',
    commentCount: 4,
    hasUnreadComments: true,
  },
  {
    kpiName: 'Merchant EDC',
    category: 'Fee Income',
    actual: 15,
    target: 12,
    achievement: 125,
    points: 375,
    maxPoints: 300,
    unit: 'Merchants',
    status: 'excellent',
    commentCount: 0,
    hasUnreadComments: false,
  },
  {
    kpiName: 'Merchant QRIS',
    category: 'Fee Income',
    actual: 20,
    target: 18,
    achievement: 111,
    points: 333,
    maxPoints: 300,
    unit: 'Merchants',
    status: 'excellent',
    commentCount: 1,
    hasUnreadComments: false,
  },

  // Customer Acquisition
  {
    kpiName: 'New To Bank',
    category: 'Customer Acquisition',
    actual: 25,
    target: 20,
    achievement: 125,
    points: 250,
    maxPoints: 200,
    unit: 'Customers',
    status: 'excellent',
    commentCount: 0,
    hasUnreadComments: false,
  },
  {
    kpiName: 'New To Priority',
    category: 'Customer Acquisition',
    actual: 7,
    target: 10,
    achievement: 70,
    points: 140,
    maxPoints: 200,
    unit: 'Customers',
    status: 'critical',
    commentCount: 5,
    hasUnreadComments: true,
  },

  // Service Quality
  {
    kpiName: 'Customer Satisfaction',
    category: 'Service Quality',
    actual: 92,
    target: 90,
    achievement: 102,
    points: 204,
    maxPoints: 200,
    unit: '%',
    status: 'good',
    commentCount: 0,
    hasUnreadComments: false,
  },
  {
    kpiName: 'Transaction Accuracy',
    category: 'Service Quality',
    actual: 99.5,
    target: 99,
    achievement: 100.5,
    points: 201,
    maxPoints: 200,
    unit: '%',
    status: 'excellent',
    commentCount: 0,
    hasUnreadComments: false,
  },

  // Cross Selling
  {
    kpiName: 'Cross-Sell Ratio',
    category: 'Cross Selling',
    actual: 3.2,
    target: 3.0,
    achievement: 107,
    points: 214,
    maxPoints: 200,
    unit: 'Products/Customer',
    status: 'good',
    commentCount: 1,
    hasUnreadComments: false,
  },
  {
    kpiName: 'Digital Adoption',
    category: 'Cross Selling',
    actual: 78,
    target: 80,
    achievement: 97.5,
    points: 195,
    maxPoints: 200,
    unit: '%',
    status: 'good',
    commentCount: 0,
    hasUnreadComments: false,
  },
];

// Calculate overall performance
export const calculateOverallPerformance = (metrics: IndividualKPIMetric[]) => {
  const totalPoints = metrics.reduce((sum, m) => sum + m.points, 0);
  const totalMaxPoints = metrics.reduce((sum, m) => sum + m.maxPoints, 0);
  const overallAchievement = (totalPoints / totalMaxPoints) * 100;
  
  return {
    totalPoints,
    totalMaxPoints,
    overallAchievement: Math.round(overallAchievement * 10) / 10,
    excellentCount: metrics.filter(m => m.status === 'excellent').length,
    goodCount: metrics.filter(m => m.status === 'good').length,
    warningCount: metrics.filter(m => m.status === 'warning').length,
    criticalCount: metrics.filter(m => m.status === 'critical').length,
  };
};
