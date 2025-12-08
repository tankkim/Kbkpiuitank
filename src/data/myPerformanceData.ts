// Individual employee performance data
export interface EmployeeProfile {
  nip: string;
  name: string;
  position: string;
  branch: string;
  region: string;
  avatar?: string;
}

// Cross-selling product data
export interface CrossSellingProduct {
  name: string;
  count: number;
  points: number;
}

// Monthly performance data
export interface MonthlyPerformance {
  month: string;
  actual: number;
  target: number;
  achievement: number;
}

// Product achievement data
export interface ProductAchievement {
  product: string;
  target: number;
  monthly: {
    jan: { acc: number; points: number };
    feb: { acc: number; points: number };
    mar: { acc: number; points: number };
    apr: { acc: number; points: number };
    may: { acc: number; points: number };
    jun: { acc: number; points: number };
    jul: { acc: number; points: number };
    aug: { acc: number; points: number };
    sep: { acc: number; points: number };
    oct: { acc: number; points: number };
    nov: { acc: number; points: number };
    dec: { acc: number; points: number };
  };
  cumulative: { acc: number; points: number };
}

// Branch-level product achievement data
export interface BranchProductAchievement extends ProductAchievement {
  myContribution: {
    monthly: {
      jan: { acc: number; points: number };
      feb: { acc: number; points: number };
      mar: { acc: number; points: number };
      apr: { acc: number; points: number };
      may: { acc: number; points: number };
      jun: { acc: number; points: number };
      jul: { acc: number; points: number };
      aug: { acc: number; points: number };
      sep: { acc: number; points: number };
      oct: { acc: number; points: number };
      nov: { acc: number; points: number };
      dec: { acc: number; points: number };
    };
    cumulative: { acc: number; points: number };
  };
}

// Ranking data
export interface RankingData {
  category: string;
  rank: number;
  totalPerformers: number;
  points: number;
}

// Active cross-selling sales history
export interface CrossSellingSalesHistory {
  productCombination: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

// Sample employee profile
export const currentEmployee: EmployeeProfile = {
  nip: 'EMP-2024-0456',
  name: 'Sarah Johnson',
  position: 'RM Sales',
  branch: 'Jakarta Pusat',
  region: 'REGIONAL I',
};

// Top 3 cross-selling products for current month
export const topCrossSellingProducts: CrossSellingProduct[] = [
  { name: 'BANCASSURANCE', count: 12, points: 360 },
  { name: 'BANK GUARANTEE', count: 8, points: 240 },
  { name: 'CREDIT CARD', count: 6, points: 180 },
];

// Monthly performance vs target
export const monthlyPerformanceData: MonthlyPerformance[] = [
  { month: 'Jan', actual: 450, target: 500, achievement: 90 },
  { month: 'Feb', actual: 520, target: 500, achievement: 104 },
  { month: 'Mar', actual: 480, target: 500, achievement: 96 },
  { month: 'Apr', actual: 550, target: 500, achievement: 110 },
  { month: 'May', actual: 590, target: 600, achievement: 98 },
  { month: 'Jun', actual: 620, target: 600, achievement: 103 },
  { month: 'Jul', actual: 580, target: 600, achievement: 97 },
  { month: 'Aug', actual: 640, target: 650, achievement: 98 },
  { month: 'Sep', actual: 670, target: 650, achievement: 103 },
  { month: 'Oct', actual: 720, target: 700, achievement: 103 },
];

// Product achievements by month
export const productAchievements: ProductAchievement[] = [
  {
    product: 'Branch Guarantee',
    target: 30,
    monthly: {
      jan: { acc: 2, points: 60 },
      feb: { acc: 3, points: 90 },
      mar: { acc: 2, points: 60 },
      apr: { acc: 4, points: 120 },
      may: { acc: 3, points: 90 },
      jun: { acc: 5, points: 150 },
      jul: { acc: 4, points: 120 },
      aug: { acc: 3, points: 90 },
      sep: { acc: 6, points: 180 },
      oct: { acc: 5, points: 150 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 37, points: 1110 },
  },
  {
    product: 'Credit Card',
    target: 40,
    monthly: {
      jan: { acc: 3, points: 90 },
      feb: { acc: 4, points: 120 },
      mar: { acc: 5, points: 150 },
      apr: { acc: 6, points: 180 },
      may: { acc: 5, points: 150 },
      jun: { acc: 7, points: 210 },
      jul: { acc: 6, points: 180 },
      aug: { acc: 5, points: 150 },
      sep: { acc: 8, points: 240 },
      oct: { acc: 6, points: 180 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 55, points: 1650 },
  },
  {
    product: 'Merchant EDC',
    target: 35,
    monthly: {
      jan: { acc: 1, points: 30 },
      feb: { acc: 2, points: 60 },
      mar: { acc: 1, points: 30 },
      apr: { acc: 3, points: 90 },
      may: { acc: 2, points: 60 },
      jun: { acc: 4, points: 120 },
      jul: { acc: 3, points: 90 },
      aug: { acc: 2, points: 60 },
      sep: { acc: 5, points: 150 },
      oct: { acc: 4, points: 120 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 27, points: 810 },
  },
  {
    product: 'Merchant QRIS',
    target: 50,
    monthly: {
      jan: { acc: 4, points: 120 },
      feb: { acc: 5, points: 150 },
      mar: { acc: 6, points: 180 },
      apr: { acc: 7, points: 210 },
      may: { acc: 6, points: 180 },
      jun: { acc: 8, points: 240 },
      jul: { acc: 7, points: 210 },
      aug: { acc: 6, points: 180 },
      sep: { acc: 9, points: 270 },
      oct: { acc: 8, points: 240 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 66, points: 1980 },
  },
  {
    product: 'New To Priority',
    target: 60,
    monthly: {
      jan: { acc: 5, points: 150 },
      feb: { acc: 6, points: 180 },
      mar: { acc: 7, points: 210 },
      apr: { acc: 8, points: 240 },
      may: { acc: 7, points: 210 },
      jun: { acc: 9, points: 270 },
      jul: { acc: 8, points: 240 },
      aug: { acc: 7, points: 210 },
      sep: { acc: 10, points: 300 },
      oct: { acc: 9, points: 270 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 76, points: 2280 },
  },
  {
    product: 'Payroll Referral',
    target: 45,
    monthly: {
      jan: { acc: 2, points: 60 },
      feb: { acc: 3, points: 90 },
      mar: { acc: 2, points: 60 },
      apr: { acc: 4, points: 120 },
      may: { acc: 3, points: 90 },
      jun: { acc: 5, points: 150 },
      jul: { acc: 4, points: 120 },
      aug: { acc: 3, points: 90 },
      sep: { acc: 6, points: 180 },
      oct: { acc: 5, points: 150 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 37, points: 1110 },
  },
  {
    product: 'SME Loan',
    target: 55,
    monthly: {
      jan: { acc: 3, points: 90 },
      feb: { acc: 4, points: 120 },
      mar: { acc: 3, points: 90 },
      apr: { acc: 5, points: 150 },
      may: { acc: 4, points: 120 },
      jun: { acc: 6, points: 180 },
      jul: { acc: 5, points: 150 },
      aug: { acc: 4, points: 120 },
      sep: { acc: 7, points: 210 },
      oct: { acc: 6, points: 180 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 47, points: 1410 },
  },
];

// Branch product achievements with individual contribution (for Branch tab)
export const branchProductAchievements: BranchProductAchievement[] = [
  {
    product: 'Branch Guarantee',
    monthly: {
      jan: { acc: 15, points: 450 },
      feb: { acc: 18, points: 540 },
      mar: { acc: 14, points: 420 },
      apr: { acc: 20, points: 600 },
      may: { acc: 17, points: 510 },
      jun: { acc: 22, points: 660 },
      jul: { acc: 19, points: 570 },
      aug: { acc: 16, points: 480 },
      sep: { acc: 25, points: 750 },
      oct: { acc: 21, points: 630 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 187, points: 5610 },
    myContribution: {
      monthly: {
        jan: { acc: 2, points: 60 },
        feb: { acc: 3, points: 90 },
        mar: { acc: 2, points: 60 },
        apr: { acc: 4, points: 120 },
        may: { acc: 3, points: 90 },
        jun: { acc: 5, points: 150 },
        jul: { acc: 4, points: 120 },
        aug: { acc: 3, points: 90 },
        sep: { acc: 6, points: 180 },
        oct: { acc: 5, points: 150 },
        nov: { acc: 0, points: 0 },
        dec: { acc: 0, points: 0 },
      },
      cumulative: { acc: 37, points: 1110 },
    },
  },
  {
    product: 'Credit Card',
    monthly: {
      jan: { acc: 22, points: 660 },
      feb: { acc: 25, points: 750 },
      mar: { acc: 28, points: 840 },
      apr: { acc: 30, points: 900 },
      may: { acc: 27, points: 810 },
      jun: { acc: 32, points: 960 },
      jul: { acc: 29, points: 870 },
      aug: { acc: 26, points: 780 },
      sep: { acc: 35, points: 1050 },
      oct: { acc: 31, points: 930 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 285, points: 8550 },
    myContribution: {
      monthly: {
        jan: { acc: 3, points: 90 },
        feb: { acc: 4, points: 120 },
        mar: { acc: 5, points: 150 },
        apr: { acc: 6, points: 180 },
        may: { acc: 5, points: 150 },
        jun: { acc: 7, points: 210 },
        jul: { acc: 6, points: 180 },
        aug: { acc: 5, points: 150 },
        sep: { acc: 8, points: 240 },
        oct: { acc: 6, points: 180 },
        nov: { acc: 0, points: 0 },
        dec: { acc: 0, points: 0 },
      },
      cumulative: { acc: 55, points: 1650 },
    },
  },
  {
    product: 'Merchant EDC',
    monthly: {
      jan: { acc: 8, points: 240 },
      feb: { acc: 11, points: 330 },
      mar: { acc: 7, points: 210 },
      apr: { acc: 14, points: 420 },
      may: { acc: 10, points: 300 },
      jun: { acc: 16, points: 480 },
      jul: { acc: 13, points: 390 },
      aug: { acc: 9, points: 270 },
      sep: { acc: 18, points: 540 },
      oct: { acc: 15, points: 450 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 121, points: 3630 },
    myContribution: {
      monthly: {
        jan: { acc: 1, points: 30 },
        feb: { acc: 2, points: 60 },
        mar: { acc: 1, points: 30 },
        apr: { acc: 3, points: 90 },
        may: { acc: 2, points: 60 },
        jun: { acc: 4, points: 120 },
        jul: { acc: 3, points: 90 },
        aug: { acc: 2, points: 60 },
        sep: { acc: 5, points: 150 },
        oct: { acc: 4, points: 120 },
        nov: { acc: 0, points: 0 },
        dec: { acc: 0, points: 0 },
      },
      cumulative: { acc: 27, points: 810 },
    },
  },
  {
    product: 'Merchant QRIS',
    monthly: {
      jan: { acc: 28, points: 840 },
      feb: { acc: 32, points: 960 },
      mar: { acc: 35, points: 1050 },
      apr: { acc: 38, points: 1140 },
      may: { acc: 34, points: 1020 },
      jun: { acc: 42, points: 1260 },
      jul: { acc: 37, points: 1110 },
      aug: { acc: 33, points: 990 },
      sep: { acc: 45, points: 1350 },
      oct: { acc: 40, points: 1200 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 364, points: 10920 },
    myContribution: {
      monthly: {
        jan: { acc: 4, points: 120 },
        feb: { acc: 5, points: 150 },
        mar: { acc: 6, points: 180 },
        apr: { acc: 7, points: 210 },
        may: { acc: 6, points: 180 },
        jun: { acc: 8, points: 240 },
        jul: { acc: 7, points: 210 },
        aug: { acc: 6, points: 180 },
        sep: { acc: 9, points: 270 },
        oct: { acc: 8, points: 240 },
        nov: { acc: 0, points: 0 },
        dec: { acc: 0, points: 0 },
      },
      cumulative: { acc: 66, points: 1980 },
    },
  },
  {
    product: 'New To Priority',
    monthly: {
      jan: { acc: 32, points: 960 },
      feb: { acc: 36, points: 1080 },
      mar: { acc: 38, points: 1140 },
      apr: { acc: 42, points: 1260 },
      may: { acc: 39, points: 1170 },
      jun: { acc: 45, points: 1350 },
      jul: { acc: 41, points: 1230 },
      aug: { acc: 37, points: 1110 },
      sep: { acc: 48, points: 1440 },
      oct: { acc: 44, points: 1320 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 402, points: 12060 },
    myContribution: {
      monthly: {
        jan: { acc: 5, points: 150 },
        feb: { acc: 6, points: 180 },
        mar: { acc: 7, points: 210 },
        apr: { acc: 8, points: 240 },
        may: { acc: 7, points: 210 },
        jun: { acc: 9, points: 270 },
        jul: { acc: 8, points: 240 },
        aug: { acc: 7, points: 210 },
        sep: { acc: 10, points: 300 },
        oct: { acc: 9, points: 270 },
        nov: { acc: 0, points: 0 },
        dec: { acc: 0, points: 0 },
      },
      cumulative: { acc: 76, points: 2280 },
    },
  },
  {
    product: 'Payroll Referral',
    monthly: {
      jan: { acc: 12, points: 360 },
      feb: { acc: 15, points: 450 },
      mar: { acc: 11, points: 330 },
      apr: { acc: 18, points: 540 },
      may: { acc: 14, points: 420 },
      jun: { acc: 20, points: 600 },
      jul: { acc: 17, points: 510 },
      aug: { acc: 13, points: 390 },
      sep: { acc: 22, points: 660 },
      oct: { acc: 19, points: 570 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 161, points: 4830 },
    myContribution: {
      monthly: {
        jan: { acc: 2, points: 60 },
        feb: { acc: 3, points: 90 },
        mar: { acc: 2, points: 60 },
        apr: { acc: 4, points: 120 },
        may: { acc: 3, points: 90 },
        jun: { acc: 5, points: 150 },
        jul: { acc: 4, points: 120 },
        aug: { acc: 3, points: 90 },
        sep: { acc: 6, points: 180 },
        oct: { acc: 5, points: 150 },
        nov: { acc: 0, points: 0 },
        dec: { acc: 0, points: 0 },
      },
      cumulative: { acc: 37, points: 1110 },
    },
  },
  {
    product: 'SME Loan',
    monthly: {
      jan: { acc: 18, points: 540 },
      feb: { acc: 21, points: 630 },
      mar: { acc: 17, points: 510 },
      apr: { acc: 24, points: 720 },
      may: { acc: 20, points: 600 },
      jun: { acc: 27, points: 810 },
      jul: { acc: 23, points: 690 },
      aug: { acc: 19, points: 570 },
      sep: { acc: 30, points: 900 },
      oct: { acc: 26, points: 780 },
      nov: { acc: 0, points: 0 },
      dec: { acc: 0, points: 0 },
    },
    cumulative: { acc: 225, points: 6750 },
    myContribution: {
      monthly: {
        jan: { acc: 3, points: 90 },
        feb: { acc: 4, points: 120 },
        mar: { acc: 3, points: 90 },
        apr: { acc: 5, points: 150 },
        may: { acc: 4, points: 120 },
        jun: { acc: 6, points: 180 },
        jul: { acc: 5, points: 150 },
        aug: { acc: 4, points: 120 },
        sep: { acc: 7, points: 210 },
        oct: { acc: 6, points: 180 },
        nov: { acc: 0, points: 0 },
        dec: { acc: 0, points: 0 },
      },
      cumulative: { acc: 47, points: 1410 },
    },
  },
];

// Cross-selling sales history
export const crossSellingSalesHistory: CrossSellingSalesHistory[] = [
  {
    productCombination: '#Cross_Active',
    jan: 543,
    feb: 138,
    mar: 541,
    apr: 138,
    may: 541,
    jun: 541,
    jul: 138,
    aug: 541,
    sep: 137,
    oct: 132,
    nov: 0,
    dec: 0,
  },
  {
    productCombination: '1 - 2',
    jan: 282,
    feb: 69,
    mar: 284,
    apr: 69,
    may: 284,
    jun: 191,
    jul: 70,
    aug: 284,
    sep: 69,
    oct: 70,
    nov: 0,
    dec: 0,
  },
  {
    productCombination: '3 - 5',
    jan: 7,
    feb: 18,
    mar: 20,
    apr: 2,
    may: 13,
    jun: 15,
    jul: 18,
    aug: 19,
    sep: 12,
    oct: 67,
    nov: 0,
    dec: 0,
  },
  {
    productCombination: '6 - 10',
    jan: 7,
    feb: 1,
    mar: 15,
    apr: 1,
    may: 1,
    jun: 8,
    jul: 3,
    aug: 3,
    sep: 2,
    oct: 10,
    nov: 0,
    dec: 0,
  },
  {
    productCombination: '> 10',
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  },
];

// Personal rankings
export const personalRankings: RankingData[] = [
  { category: 'Branch Ranking', rank: 3, totalPerformers: 25, points: 1110 },
  { category: 'Regional Ranking', rank: 12, totalPerformers: 156, points: 1110 },
  { category: 'Bank-wide Ranking', rank: 45, totalPerformers: 487, points: 1110 },
];

// Branch top performers
export interface TopPerformer {
  rank: number;
  name: string;
  position: string;
  category: string;
  points: number;
  achievement: number;
}

export const branchTopPerformers: TopPerformer[] = [
  { rank: 1, name: 'Michael Chen', position: 'Branch Sales Manager', category: 'RM PENSION', points: 1580, achievement: 158 },
  { rank: 2, name: 'Lisa Wang', position: 'RM Sales', category: 'RM MORTGAGE', points: 1420, achievement: 142 },
  { rank: 3, name: 'Sarah Johnson', position: 'RM Sales', category: 'RM FUNDING', points: 1110, achievement: 111 },
];