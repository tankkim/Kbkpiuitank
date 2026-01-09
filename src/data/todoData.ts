export interface TodoTemplate {
  id: string;
  title: string;
  description: string;
  position: string; // which position this todo is for
  category: string;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  createdBy: string;
  createdDate: string;
  isActive: boolean;
}

export interface TodoItem {
  id: string;
  templateId: string;
  employeeId: string;
  employeeName: string;
  position: string;
  branch: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  completedAt?: string;
  notes?: string;
}

export interface TodoStatistics {
  employeeId: string;
  employeeName: string;
  position: string;
  branch: string;
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
  lastUpdated: string;
}

// Templates for different positions
export const todoTemplates: TodoTemplate[] = [
  // Branch Manager
  {
    id: 't1',
    title: 'Review Daily Branch Performance',
    description: 'Check daily sales numbers, customer satisfaction, and operational metrics',
    position: 'Branch Manager',
    category: 'Management',
    priority: 'high',
    estimatedMinutes: 30,
    createdBy: 'HR Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't2',
    title: 'Team Morning Briefing',
    description: 'Conduct morning briefing with all team members',
    position: 'Branch Manager',
    category: 'Communication',
    priority: 'high',
    estimatedMinutes: 20,
    createdBy: 'HR Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't3',
    title: 'Update KPI Dashboard',
    description: 'Update and monitor KPI progress for all team members',
    position: 'Branch Manager',
    category: 'KPI Management',
    priority: 'medium',
    estimatedMinutes: 25,
    createdBy: 'HR Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't4',
    title: 'Customer Complaint Review',
    description: 'Review and address any customer complaints or issues',
    position: 'Branch Manager',
    category: 'Customer Service',
    priority: 'high',
    estimatedMinutes: 40,
    createdBy: 'HR Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  
  // Sales Officer
  {
    id: 't5',
    title: 'Customer Follow-up Calls',
    description: 'Make follow-up calls to potential and existing customers',
    position: 'Sales Officer',
    category: 'Sales',
    priority: 'high',
    estimatedMinutes: 60,
    createdBy: 'Sales Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't6',
    title: 'Update Sales Pipeline',
    description: 'Update CRM with all customer interactions and sales progress',
    position: 'Sales Officer',
    category: 'Sales',
    priority: 'medium',
    estimatedMinutes: 30,
    createdBy: 'Sales Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't7',
    title: 'Market Analysis Review',
    description: 'Review market trends and competitor activities',
    position: 'Sales Officer',
    category: 'Analysis',
    priority: 'low',
    estimatedMinutes: 20,
    createdBy: 'Sales Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't8',
    title: 'Daily Sales Report',
    description: 'Submit end-of-day sales report to manager',
    position: 'Sales Officer',
    category: 'Reporting',
    priority: 'high',
    estimatedMinutes: 15,
    createdBy: 'Sales Department',
    createdDate: '2025-12-01',
    isActive: true,
  },

  // Customer Service
  {
    id: 't9',
    title: 'Customer Service Queue Check',
    description: 'Monitor and manage customer service queue',
    position: 'Customer Service',
    category: 'Customer Service',
    priority: 'high',
    estimatedMinutes: 45,
    createdBy: 'CS Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't10',
    title: 'Resolve Customer Issues',
    description: 'Address and resolve all assigned customer issues',
    position: 'Customer Service',
    category: 'Customer Service',
    priority: 'high',
    estimatedMinutes: 90,
    createdBy: 'CS Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't11',
    title: 'Update Customer Records',
    description: 'Update customer interaction records in the system',
    position: 'Customer Service',
    category: 'Documentation',
    priority: 'medium',
    estimatedMinutes: 25,
    createdBy: 'CS Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
  {
    id: 't12',
    title: 'Customer Satisfaction Survey',
    description: 'Conduct customer satisfaction surveys',
    position: 'Customer Service',
    category: 'Customer Service',
    priority: 'medium',
    estimatedMinutes: 30,
    createdBy: 'CS Department',
    createdDate: '2025-12-01',
    isActive: true,
  },
];

// Today's todos for current user (Branch Manager)
const today = '2026-01-09';
export const myTodosToday: TodoItem[] = [
  {
    id: 'td1',
    templateId: 't1',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    date: today,
    title: 'Review Daily Branch Performance',
    description: 'Check daily sales numbers, customer satisfaction, and operational metrics',
    category: 'Management',
    priority: 'high',
    isCompleted: true,
    completedAt: '2026-01-09 08:45:00',
  },
  {
    id: 'td2',
    templateId: 't2',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    date: today,
    title: 'Team Morning Briefing',
    description: 'Conduct morning briefing with all team members',
    category: 'Communication',
    priority: 'high',
    isCompleted: true,
    completedAt: '2026-01-09 09:15:00',
  },
  {
    id: 'td3',
    templateId: 't3',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    date: today,
    title: 'Update KPI Dashboard',
    description: 'Update and monitor KPI progress for all team members',
    category: 'KPI Management',
    priority: 'medium',
    isCompleted: false,
  },
  {
    id: 'td4',
    templateId: 't4',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    date: today,
    title: 'Customer Complaint Review',
    description: 'Review and address any customer complaints or issues',
    category: 'Customer Service',
    priority: 'high',
    isCompleted: false,
  },
];

// Statistics for all employees
export const todoStatistics: TodoStatistics[] = [
  // Jakarta Central Branch
  {
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    totalTodos: 120,
    completedTodos: 108,
    completionRate: 90,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E002',
    employeeName: 'Jane Smith',
    position: 'Sales Officer',
    branch: 'Jakarta Central',
    totalTodos: 160,
    completedTodos: 136,
    completionRate: 85,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E003',
    employeeName: 'Robert Wilson',
    position: 'Sales Officer',
    branch: 'Jakarta Central',
    totalTodos: 155,
    completedTodos: 147,
    completionRate: 95,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E004',
    employeeName: 'Emily Davis',
    position: 'Customer Service',
    branch: 'Jakarta Central',
    totalTodos: 140,
    completedTodos: 119,
    completionRate: 85,
    lastUpdated: '2026-01-09',
  },
  
  // Jakarta South Branch
  {
    employeeId: 'E005',
    employeeName: 'Michael Anderson',
    position: 'Branch Manager',
    branch: 'Jakarta South',
    totalTodos: 115,
    completedTodos: 109,
    completionRate: 95,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E006',
    employeeName: 'Sarah Johnson',
    position: 'Sales Officer',
    branch: 'Jakarta South',
    totalTodos: 165,
    completedTodos: 148,
    completionRate: 90,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E007',
    employeeName: 'David Brown',
    position: 'Sales Officer',
    branch: 'Jakarta South',
    totalTodos: 170,
    completedTodos: 162,
    completionRate: 95,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E008',
    employeeName: 'Lisa Martinez',
    position: 'Customer Service',
    branch: 'Jakarta South',
    totalTodos: 135,
    completedTodos: 128,
    completionRate: 95,
    lastUpdated: '2026-01-09',
  },
  
  // Jakarta North Branch
  {
    employeeId: 'E009',
    employeeName: 'James Taylor',
    position: 'Branch Manager',
    branch: 'Jakarta North',
    totalTodos: 125,
    completedTodos: 100,
    completionRate: 80,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E010',
    employeeName: 'Patricia Garcia',
    position: 'Sales Officer',
    branch: 'Jakarta North',
    totalTodos: 150,
    completedTodos: 120,
    completionRate: 80,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E011',
    employeeName: 'Christopher Lee',
    position: 'Customer Service',
    branch: 'Jakarta North',
    totalTodos: 145,
    completedTodos: 124,
    completionRate: 85,
    lastUpdated: '2026-01-09',
  },
  
  // Bandung Branch
  {
    employeeId: 'E012',
    employeeName: 'Daniel Kim',
    position: 'Branch Manager',
    branch: 'Bandung',
    totalTodos: 110,
    completedTodos: 77,
    completionRate: 70,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E013',
    employeeName: 'Amanda White',
    position: 'Sales Officer',
    branch: 'Bandung',
    totalTodos: 155,
    completedTodos: 109,
    completionRate: 70,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E014',
    employeeName: 'Kevin Martinez',
    position: 'Sales Officer',
    branch: 'Bandung',
    totalTodos: 160,
    completedTodos: 120,
    completionRate: 75,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E015',
    employeeName: 'Michelle Chen',
    position: 'Customer Service',
    branch: 'Bandung',
    totalTodos: 140,
    completedTodos: 98,
    completionRate: 70,
    lastUpdated: '2026-01-09',
  },
  
  // Surabaya Branch
  {
    employeeId: 'E016',
    employeeName: 'Thomas Rodriguez',
    position: 'Branch Manager',
    branch: 'Surabaya',
    totalTodos: 120,
    completedTodos: 102,
    completionRate: 85,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E017',
    employeeName: 'Jennifer Lopez',
    position: 'Sales Officer',
    branch: 'Surabaya',
    totalTodos: 155,
    completedTodos: 132,
    completionRate: 85,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E018',
    employeeName: 'William Tan',
    position: 'Sales Officer',
    branch: 'Surabaya',
    totalTodos: 165,
    completedTodos: 148,
    completionRate: 90,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E019',
    employeeName: 'Jessica Wong',
    position: 'Customer Service',
    branch: 'Surabaya',
    totalTodos: 145,
    completedTodos: 130,
    completionRate: 90,
    lastUpdated: '2026-01-09',
  },
  
  // Medan Branch
  {
    employeeId: 'E020',
    employeeName: 'Richard Park',
    position: 'Branch Manager',
    branch: 'Medan',
    totalTodos: 105,
    completedTodos: 58,
    completionRate: 55,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E021',
    employeeName: 'Elizabeth Turner',
    position: 'Sales Officer',
    branch: 'Medan',
    totalTodos: 150,
    completedTodos: 75,
    completionRate: 50,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E022',
    employeeName: 'Joseph Harris',
    position: 'Sales Officer',
    branch: 'Medan',
    totalTodos: 145,
    completedTodos: 80,
    completionRate: 55,
    lastUpdated: '2026-01-09',
  },
  {
    employeeId: 'E023',
    employeeName: 'Maria Santos',
    position: 'Customer Service',
    branch: 'Medan',
    totalTodos: 130,
    completedTodos: 72,
    completionRate: 55,
    lastUpdated: '2026-01-09',
  },
];

// Historical completion data for charts (last 7 days)
export const todoCompletionHistory = [
  { date: '2026-01-03', total: 4, completed: 3 },
  { date: '2026-01-04', total: 4, completed: 4 },
  { date: '2026-01-05', total: 4, completed: 3 },
  { date: '2026-01-06', total: 4, completed: 4 },
  { date: '2026-01-07', total: 4, completed: 4 },
  { date: '2026-01-08', total: 4, completed: 3 },
  { date: '2026-01-09', total: 4, completed: 2 },
];