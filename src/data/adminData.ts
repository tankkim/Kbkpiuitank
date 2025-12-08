// Position/Role hierarchy data
export interface Position {
  id: string;
  name: string;
  level: number;
  parentId?: string;
}

export const positions: Position[] = [
  { id: 'rh', name: 'Region Head', level: 1 },
  { id: 'bm', name: 'Branch Manager', level: 2, parentId: 'rh' },
  { id: 'bsm', name: 'Branch Sales Manager', level: 3, parentId: 'bm' },
  { id: 'rm', name: 'RM Sales', level: 4, parentId: 'bsm' },
];

// KPI Structure data
export interface KPIIndicator {
  id: string;
  category: 'main' | 'additional';
  name: string;
  unit: string;
  weight: number;
  cap: number;
  regionHead: boolean;
  branchManager: boolean;
  branchSalesManager: boolean;
  rmSales: boolean;
}

export const kpiIndicators: KPIIndicator[] = [
  // Main Indicators
  {
    id: 'kpi-1',
    category: 'main',
    name: 'New to CASA/Digital Account',
    unit: 'Number',
    weight: 50,
    cap: 75.00,
    regionHead: true,
    branchManager: true,
    branchSalesManager: true,
    rmSales: true,
  },
  {
    id: 'kpi-2',
    category: 'main',
    name: 'Number of Priority Customer',
    unit: 'Number',
    weight: 50,
    cap: 75.00,
    regionHead: true,
    branchManager: true,
    branchSalesManager: true,
    rmSales: true,
  },
  {
    id: 'kpi-3',
    category: 'main',
    name: 'New Cooperation (Payroll/Others)',
    unit: 'Number',
    weight: 50,
    cap: 75.00,
    regionHead: false,
    branchManager: true,
    branchSalesManager: true,
    rmSales: true,
  },
  {
    id: 'kpi-4',
    category: 'main',
    name: 'NIM',
    unit: '%',
    weight: 75,
    cap: 112.50,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-5',
    category: 'main',
    name: 'Normal Loan',
    unit: 'Idr Mn',
    weight: 200,
    cap: 300.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-6',
    category: 'main',
    name: 'Time Deposit',
    unit: 'Idr Mn',
    weight: 100,
    cap: 150.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-7',
    category: 'main',
    name: 'CASA Increase',
    unit: 'Idr Mn',
    weight: 150,
    cap: 225.00,
    regionHead: false,
    branchManager: true,
    branchSalesManager: true,
    rmSales: true,
  },
  {
    id: 'kpi-8',
    category: 'main',
    name: 'Fee Based Income (WM)',
    unit: 'Idr Mn',
    weight: 75,
    cap: 112.50,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-9',
    category: 'main',
    name: 'Fee Based Income (Non WM)',
    unit: 'Idr Mn',
    weight: 50,
    cap: 75.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-10',
    category: 'main',
    name: 'PPOP',
    unit: 'Idr Mn',
    weight: 50,
    cap: 75.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-11',
    category: 'main',
    name: 'Colz Management',
    unit: '%',
    weight: 50,
    cap: 75.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-12',
    category: 'main',
    name: 'Strategic Campaign*',
    unit: '-',
    weight: 50,
    cap: 75.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-13',
    category: 'main',
    name: 'Sales Productivity',
    unit: '%',
    weight: 50,
    cap: 75.00,
    regionHead: true,
    branchManager: true,
    branchSalesManager: true,
    rmSales: false,
  },
  // Additional Indicators
  {
    id: 'kpi-14',
    category: 'additional',
    name: 'NPL Reduction',
    unit: 'Idr Mn',
    weight: 50,
    cap: 75.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  },
  {
    id: 'kpi-15',
    category: 'additional',
    name: 'Cross Selling Point',
    unit: 'Point',
    weight: 100,
    cap: 150.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: true,
    rmSales: true,
  },
  {
    id: 'kpi-16',
    category: 'additional',
    name: 'Special Booster',
    unit: 'Point',
    weight: 100,
    cap: 150.00,
    regionHead: false,
    branchManager: false,
    branchSalesManager: true,
    rmSales: false,
  },
];

// Employee data
export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  position: string;
  region?: string;
  branch?: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  kpiPerformance?: {
    finalScore: string;
    rating: string;
    bankwideRank: string;
    newCASA?: { actual: string; target: string; achievement: string; score: string };
    priorityCustomer?: { actual: string; target: string; achievement: string; score: string };
    newCooperation?: { actual: string; target: string; achievement: string; score: string };
    nim?: { actual: string; target: string; achievement: string; score: string };
    normalLoan?: { actual: string; target: string; achievement: string; score: string };
    timeDeposit?: { actual: string; target: string; achievement: string; score: string };
    casaIncrease?: { actual: string; target: string; achievement: string; score: string };
    feeWM?: { actual: string; target: string; achievement: string; score: string };
    feeNonWM?: { actual: string; target: string; achievement: string; score: string };
    ppop?: { actual: string; target: string; achievement: string; score: string };
    coll2?: { actual: string; target: string; achievement: string; score: string };
    strategicCampaign?: { actual: string; target: string; achievement: string; score: string };
    salesProductivity?: { actual: string; target: string; achievement: string; score: string };
    nplReduction?: { actual: string; target: string; achievement: string; score: string };
    crossSelling?: { actual: string; target: string; achievement: string; score: string };
    specialBooster?: { actual: string; target: string; achievement: string; score: string };
    zeroFraud?: { actual: string; target: string; achievement: string; score: string };
    complianceIndex?: { actual: string; target: string; achievement: string; score: string };
  };
}

export const employees: Employee[] = [
  {
    id: 'emp-1',
    employeeCode: 'RH001',
    name: 'John Doe',
    position: 'Region Head',
    region: 'REGIONAL I',
    email: 'john.doe@kbindonesia.com',
    phone: '+62 812-3456-7890',
    joinDate: '2020-01-15',
    status: 'active',
  },
  {
    id: 'emp-2',
    employeeCode: 'BM001',
    name: 'Jane Smith',
    position: 'Branch Manager',
    region: 'REGIONAL I',
    branch: 'JAKARTA PUSAT',
    email: 'jane.smith@kbindonesia.com',
    phone: '+62 812-3456-7891',
    joinDate: '2021-03-20',
    status: 'active',
    kpiPerformance: {
      finalScore: '11.95',
      rating: 'A',
      bankwideRank: '4 of 150',
      newCASA: { actual: '52', target: '105', achievement: '49.52%', score: '24.76' },
      priorityCustomer: { actual: '61', target: '36', achievement: '169.44%', score: '75.00' },
      newCooperation: { actual: '45', target: '38', achievement: '118.42%', score: '59.21' },
      casaIncrease: { actual: '1,920', target: '980', achievement: '195.92%', score: '225.00' },
      salesProductivity: { actual: '65.20%', target: '75.00%', achievement: '86.93%', score: '43.47' },
    },
  },
  {
    id: 'emp-3',
    employeeCode: 'BSM001',
    name: 'Michael Johnson',
    position: 'Branch Sales Manager',
    region: 'REGIONAL I',
    branch: 'JAKARTA PUSAT',
    email: 'michael.j@kbindonesia.com',
    phone: '+62 812-3456-7892',
    joinDate: '2022-06-10',
    status: 'active',
    kpiPerformance: {
      finalScore: '10.85',
      rating: 'A',
      bankwideRank: '8 of 150',
      newCASA: { actual: '48', target: '100', achievement: '48.00%', score: '24.00' },
      priorityCustomer: { actual: '55', target: '34', achievement: '161.76%', score: '75.00' },
      newCooperation: { actual: '38', target: '36', achievement: '105.56%', score: '52.78' },
      casaIncrease: { actual: '1,785', target: '920', achievement: '194.02%', score: '225.00' },
      crossSelling: { actual: '12', target: '78', achievement: '15.38%', score: '15.38' },
      specialBooster: { actual: '~', target: '~', achievement: '~', score: '85.00' },
      salesProductivity: { actual: '61.50%', target: '75.00%', achievement: '82.00%', score: '41.00' },
    },
  },
  {
    id: 'emp-4',
    employeeCode: 'RM001',
    name: 'Sarah Johnson',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA PUSAT',
    email: 'sarah.johnson@kbindonesia.com',
    phone: '+62 812-3456-7893',
    joinDate: '2022-08-15',
    status: 'active',
    kpiPerformance: {
      finalScore: '9.25',
      rating: 'B',
      bankwideRank: '18 of 150',
      newCASA: { actual: '42', target: '95', achievement: '44.21%', score: '22.11' },
      priorityCustomer: { actual: '48', target: '30', achievement: '160.00%', score: '75.00' },
      newCooperation: { actual: '32', target: '32', achievement: '100.00%', score: '50.00' },
      casaIncrease: { actual: '1,520', target: '850', achievement: '178.82%', score: '225.00' },
      crossSelling: { actual: '8', target: '68', achievement: '11.76%', score: '11.76' },
    },
  },
  {
    id: 'emp-5',
    employeeCode: 'RM002',
    name: 'Ahmad Rizki',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA PUSAT',
    email: 'ahmad.rizki@kbindonesia.com',
    phone: '+62 812-3456-7894',
    joinDate: '2023-01-10',
    status: 'active',
    kpiPerformance: {
      finalScore: '8.95',
      rating: 'B',
      bankwideRank: '22 of 150',
      newCASA: { actual: '38', target: '90', achievement: '42.22%', score: '21.11' },
      priorityCustomer: { actual: '45', target: '28', achievement: '160.71%', score: '75.00' },
      newCooperation: { actual: '28', target: '30', achievement: '93.33%', score: '46.67' },
      casaIncrease: { actual: '1,420', target: '820', achievement: '173.17%', score: '225.00' },
      crossSelling: { actual: '6', target: '65', achievement: '9.23%', score: '9.23' },
    },
  },
  {
    id: 'emp-6',
    employeeCode: 'RM003',
    name: 'Dewi Susanti',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA PUSAT',
    email: 'dewi.susanti@kbindonesia.com',
    phone: '+62 812-3456-7895',
    joinDate: '2023-03-01',
    status: 'active',
    kpiPerformance: {
      finalScore: '10.45',
      rating: 'A',
      bankwideRank: '12 of 150',
      newCASA: { actual: '65', target: '135', achievement: '48.15%', score: '24.07' },
      priorityCustomer: { actual: '80', target: '50', achievement: '160.00%', score: '75.00' },
      newCooperation: { actual: '35', target: '33', achievement: '106.06%', score: '53.03' },
      casaIncrease: { actual: '2,805', target: '1,120', achievement: '250.45%', score: '225.00' },
      crossSelling: { actual: '30', target: '178', achievement: '16.85%', score: '16.85' },
    },
  },
  // Jakarta Selatan Branch
  {
    id: 'emp-7',
    employeeCode: 'BM002',
    name: 'Budi Santoso',
    position: 'Branch Manager',
    region: 'REGIONAL I',
    branch: 'JAKARTA SELATAN',
    email: 'budi.santoso@kbindonesia.com',
    phone: '+62 812-3456-7896',
    joinDate: '2021-05-15',
    status: 'active',
  },
  {
    id: 'emp-8',
    employeeCode: 'BSM002',
    name: 'Linda Wijaya',
    position: 'Branch Sales Manager',
    region: 'REGIONAL I',
    branch: 'JAKARTA SELATAN',
    email: 'linda.wijaya@kbindonesia.com',
    phone: '+62 812-3456-7897',
    joinDate: '2022-02-20',
    status: 'active',
  },
  {
    id: 'emp-9',
    employeeCode: 'RM004',
    name: 'Rudi Hartono',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA SELATAN',
    email: 'rudi.hartono@kbindonesia.com',
    phone: '+62 812-3456-7898',
    joinDate: '2022-09-01',
    status: 'active',
  },
  {
    id: 'emp-10',
    employeeCode: 'RM005',
    name: 'Siti Nurhaliza',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA SELATAN',
    email: 'siti.nurhaliza@kbindonesia.com',
    phone: '+62 812-3456-7899',
    joinDate: '2023-02-15',
    status: 'active',
  },
  // Tangerang Branch
  {
    id: 'emp-11',
    employeeCode: 'BM003',
    name: 'Hendra Gunawan',
    position: 'Branch Manager',
    region: 'REGIONAL I',
    branch: 'TANGERANG',
    email: 'hendra.gunawan@kbindonesia.com',
    phone: '+62 812-3456-7900',
    joinDate: '2020-08-01',
    status: 'active',
  },
  {
    id: 'emp-12',
    employeeCode: 'BSM003',
    name: 'Rina Kusuma',
    position: 'Branch Sales Manager',
    region: 'REGIONAL I',
    branch: 'TANGERANG',
    email: 'rina.kusuma@kbindonesia.com',
    phone: '+62 812-3456-7901',
    joinDate: '2021-11-10',
    status: 'active',
  },
  {
    id: 'emp-13',
    employeeCode: 'RM006',
    name: 'Tommy Kurniawan',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'TANGERANG',
    email: 'tommy.kurniawan@kbindonesia.com',
    phone: '+62 812-3456-7902',
    joinDate: '2022-04-01',
    status: 'active',
  },
  {
    id: 'emp-14',
    employeeCode: 'RM007',
    name: 'Maya Anggraini',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'TANGERANG',
    email: 'maya.anggraini@kbindonesia.com',
    phone: '+62 812-3456-7903',
    joinDate: '2023-01-20',
    status: 'active',
  },
  // JAKARTA SUDIRAYA Branch
  {
    id: 'emp-15',
    employeeCode: 'BM004',
    name: 'Eko Prasetyo',
    position: 'Branch Manager',
    region: 'REGIONAL I',
    branch: 'JAKARTA SUDIRAYA',
    email: 'eko.prasetyo@kbindonesia.com',
    phone: '+62 812-3456-7904',
    joinDate: '2020-09-15',
    status: 'active',
  },
  {
    id: 'emp-16',
    employeeCode: 'BSM004',
    name: 'Fitriani Rahman',
    position: 'Branch Sales Manager',
    region: 'REGIONAL I',
    branch: 'JAKARTA SUDIRAYA',
    email: 'fitriani.rahman@kbindonesia.com',
    phone: '+62 812-3456-7905',
    joinDate: '2021-07-10',
    status: 'active',
  },
  {
    id: 'emp-17',
    employeeCode: 'RM008',
    name: 'Agus Suryanto',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA SUDIRAYA',
    email: 'agus.suryanto@kbindonesia.com',
    phone: '+62 812-3456-7906',
    joinDate: '2022-11-05',
    status: 'active',
  },
  // JAKARTA GATAYA Branch
  {
    id: 'emp-18',
    employeeCode: 'BM005',
    name: 'Dian Pertiwi',
    position: 'Branch Manager',
    region: 'REGIONAL I',
    branch: 'JAKARTA GATAYA',
    email: 'dian.pertiwi@kbindonesia.com',
    phone: '+62 812-3456-7907',
    joinDate: '2021-02-20',
    status: 'active',
  },
  {
    id: 'emp-19',
    employeeCode: 'RM009',
    name: 'Yusuf Hidayat',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA GATAYA',
    email: 'yusuf.hidayat@kbindonesia.com',
    phone: '+62 812-3456-7908',
    joinDate: '2022-05-15',
    status: 'active',
  },
  {
    id: 'emp-20',
    employeeCode: 'RM010',
    name: 'Nurul Azizah',
    position: 'RM Sales',
    region: 'REGIONAL I',
    branch: 'JAKARTA GATAYA',
    email: 'nurul.azizah@kbindonesia.com',
    phone: '+62 812-3456-7909',
    joinDate: '2023-04-01',
    status: 'active',
  },
];