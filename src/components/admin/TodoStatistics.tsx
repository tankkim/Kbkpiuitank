import { useState } from 'react';
import { Bell, TrendingUp, Users, CheckCircle, Building2, ChevronRight, ChevronDown, User, X, Calendar, Circle } from 'lucide-react';
import { todoStatistics, type TodoStatistics as TodoStat } from '../../data/todoData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TodoStatisticsProps {
  onBack: () => void;
  unreadNotificationsCount: number;
  onNotificationClick: () => void;
}

type Period = 'daily' | 'weekly' | 'monthly';

interface BranchData {
  name: string;
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
  employees: number;
  color: string;
}

interface TeamData {
  name: string;
  branch: string;
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
  employees: number;
}

interface EmployeeDetail {
  employeeId: string;
  employeeName: string;
  position: string;
  branch: string;
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
  lastUpdated: string;
}

interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  completedAt?: string;
  date: string; // Date of the task
}

export function TodoStatistics({ onBack, unreadNotificationsCount, onNotificationClick }: TodoStatisticsProps) {
  const [statistics] = useState<TodoStat[]>(todoStatistics);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('daily');
  const [startDate, setStartDate] = useState('2026-01-09');
  const [endDate, setEndDate] = useState('2026-01-09');
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null);
  const [employeePeriod, setEmployeePeriod] = useState<Period>('daily');

  // Branch colors
  const branchColors: { [key: string]: string } = {
    'Jakarta Central': '#3b82f6',
    'Jakarta South': '#10b981', 
    'Jakarta North': '#f59e0b',
    'Bandung': '#ef4444',
    'Surabaya': '#8b5cf6',
    'Medan': '#ec4899',
  };

  const getRateColor = (rate: number) => {
    if (rate >= 90) return 'bg-green-600';
    if (rate >= 70) return 'bg-blue-600';
    if (rate >= 50) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const getRateTextColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-blue-600';
    if (rate >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    if (priority === 'high') return 'text-red-600 bg-red-50 border-red-200';
    if (priority === 'medium') return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  // Mock task data for employee
  const getEmployeeTasks = (employeeId: string, period: Period): TaskItem[] => {
    // Realistic task counts
    const baseCount = period === 'daily' ? 5 : period === 'weekly' ? 32 : 128;
    const completionRate = selectedEmployee?.completionRate || 85;
    const tasks: TaskItem[] = [];
    
    const taskTitles = [
      'Review Daily Performance',
      'Customer Follow-up Call',
      'Update Sales Report',
      'Team Meeting',
      'Process Loan Application',
      'Client Consultation',
      'Compliance Check',
      'Account Reconciliation',
      'KPI Progress Update',
      'Morning Briefing',
      'Email Response',
      'Document Review',
      'Cross-sell Campaign',
      'Risk Assessment',
      'Customer Onboarding',
    ];
    
    const categories = ['Management', 'Sales', 'Reporting', 'Communication', 'Operations', 'Compliance'];
    const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
    
    for (let i = 0; i < baseCount; i++) {
      // More realistic completion based on actual rate
      const isCompleted = (i / baseCount * 100) < completionRate;
      tasks.push({
        id: `task-${employeeId}-${i}`,
        title: taskTitles[i % taskTitles.length],
        category: categories[i % categories.length],
        priority: priorities[i % 3],
        isCompleted,
        completedAt: isCompleted ? `2026-01-${String(Math.floor(Math.random() * 9) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00` : undefined,
        date: `2026-01-${String(Math.floor(Math.random() * 9) + 1).padStart(2, '0')}`, // Random date within the month
      });
    }
    
    // Sort: incomplete first, then completed
    return tasks.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) return 0;
      return a.isCompleted ? 1 : -1;
    });
  };

  // Aggregate data by branch
  const branchData: BranchData[] = Array.from(new Set(statistics.map(s => s.branch)))
    .map(branch => {
      const branchStats = statistics.filter(s => s.branch === branch);
      const totalTodos = branchStats.reduce((sum, s) => sum + s.totalTodos, 0);
      const completedTodos = branchStats.reduce((sum, s) => sum + s.completedTodos, 0);
      const completionRate = Math.round((completedTodos / totalTodos) * 100);
      return {
        name: branch,
        totalTodos,
        completedTodos,
        completionRate,
        employees: branchStats.length,
        color: branchColors[branch] || '#6b7280',
      };
    })
    .sort((a, b) => b.completionRate - a.completionRate);

  // Aggregate data by team
  const teamData: TeamData[] = Array.from(new Set(statistics.map(s => `${s.branch}-${s.position}`)))
    .map(key => {
      const [branch, position] = key.split('-');
      const teamStats = statistics.filter(s => s.branch === branch && s.position === position);
      const totalTodos = teamStats.reduce((sum, s) => sum + s.totalTodos, 0);
      const completedTodos = teamStats.reduce((sum, s) => sum + s.completedTodos, 0);
      return {
        name: position,
        branch,
        totalTodos,
        completedTodos,
        completionRate: Math.round((completedTodos / totalTodos) * 100),
        employees: teamStats.length,
      };
    })
    .sort((a, b) => b.completionRate - a.completionRate);

  // Overall statistics
  const totalTodos = statistics.reduce((sum, s) => sum + s.totalTodos, 0);
  const completedTodos = statistics.reduce((sum, s) => sum + s.completedTodos, 0);
  const avgCompletionRate = Math.round((completedTodos / totalTodos) * 100);

  // Branch trend data
  const getBranchTrendData = () => {
    if (selectedPeriod === 'daily') {
      return [
        { date: '01/06', ...Object.fromEntries(branchData.map(b => [b.name, Math.round(b.completionRate * (0.92 + Math.random() * 0.08))])) },
        { date: '01/07', ...Object.fromEntries(branchData.map(b => [b.name, Math.round(b.completionRate * (0.94 + Math.random() * 0.06))])) },
        { date: '01/08', ...Object.fromEntries(branchData.map(b => [b.name, Math.round(b.completionRate * (0.96 + Math.random() * 0.04))])) },
        { date: '01/09', ...Object.fromEntries(branchData.map(b => [b.name, b.completionRate])) },
      ];
    } else if (selectedPeriod === 'weekly') {
      return [
        { date: 'Week 1', ...Object.fromEntries(branchData.map(b => [b.name, Math.round(b.completionRate * (0.90 + Math.random() * 0.10))])) },
        { date: 'Week 2', ...Object.fromEntries(branchData.map(b => [b.name, b.completionRate])) },
      ];
    } else {
      return [
        { date: 'Dec', ...Object.fromEntries(branchData.map(b => [b.name, Math.round(b.completionRate * (0.88 + Math.random() * 0.12))])) },
        { date: 'Jan', ...Object.fromEntries(branchData.map(b => [b.name, b.completionRate])) },
      ];
    }
  };

  const trendData = getBranchTrendData();

  const getPeriodLabel = () => {
    if (selectedPeriod === 'daily') {
      return startDate;
    } else if (selectedPeriod === 'weekly') {
      return `${startDate} ~ ${endDate}`;
    } else {
      return `${startDate} ~ ${endDate}`;
    }
  };

  const toggleBranch = (branchName: string) => {
    const newExpanded = new Set(expandedBranches);
    if (newExpanded.has(branchName)) {
      newExpanded.delete(branchName);
    } else {
      newExpanded.add(branchName);
    }
    setExpandedBranches(newExpanded);
  };

  const toggleTeam = (branchName: string, teamName: string) => {
    const key = `${branchName}-${teamName}`;
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedTeams(newExpanded);
  };

  const openEmployeeDetail = (emp: TodoStat) => {
    setSelectedEmployee({
      employeeId: emp.employeeId,
      employeeName: emp.employeeName,
      position: emp.position,
      branch: emp.branch,
      totalTodos: emp.totalTodos,
      completedTodos: emp.completedTodos,
      completionRate: emp.completionRate,
      lastUpdated: emp.lastUpdated,
    });
    setEmployeePeriod('daily');
  };

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    const today = '2026-01-09';
    setEndDate(today);
    
    if (period === 'daily') {
      setStartDate(today);
    } else if (period === 'weekly') {
      setStartDate('2026-01-03');
    } else {
      setStartDate('2026-01-01');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg">To-Do Completion Statistics</h1>
              <p className="text-xs text-gray-500">Track completion rates by branch, team, and individual</p>
            </div>

            <button
              onClick={onNotificationClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Time Period Filter */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-semibold">Time Period:</span>
            
            {/* Period Buttons */}
            <div className="flex items-center gap-2">
              {(['daily', 'weekly', 'monthly'] as Period[]).map(period => (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            {/* Date Inputs */}
            <div className="flex items-center gap-2 ml-auto">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {selectedPeriod !== 'daily' && (
                <>
                  <span className="text-gray-500">~</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Tasks</div>
                <div className="text-2xl mt-1">{totalTodos}</div>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Completed</div>
                <div className="text-2xl mt-1">{completedTodos}</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Avg. Completion</div>
                <div className="text-2xl mt-1">{avgCompletionRate}%</div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left: Branch Trend Chart */}
          <div className="col-span-5 bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm mb-3">
              Branch Performance Trend
              <span className="text-xs text-gray-500 ml-2">({getPeriodLabel()})</span>
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                {branchData.map((branch) => (
                  <Line
                    key={branch.name}
                    type="monotone"
                    dataKey={branch.name}
                    stroke={branch.color}
                    strokeWidth={2}
                    name={branch.name}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Hierarchical Accordion */}
          <div className="col-span-7 bg-white rounded-lg border border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <h3 className="text-sm">Organization Hierarchy</h3>
            </div>
            
            <div className="max-h-[480px] overflow-y-auto">
              {branchData.map((branch) => {
                const isExpanded = expandedBranches.has(branch.name);
                const branchTeams = teamData.filter(t => t.branch === branch.name);
                
                return (
                  <div key={branch.name} className="border-b border-gray-100">
                    {/* Branch Row */}
                    <div
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => toggleBranch(branch.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: branch.color }}
                            />
                            <Building2 className="w-4 h-4" style={{ color: branch.color }} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{branch.name}</div>
                            <div className="text-xs text-gray-500">{branch.employees} employees</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Tasks</div>
                            <div className="text-sm">{branch.completedTodos}/{branch.totalTodos}</div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getRateColor(branch.completionRate)}`}
                                style={{ width: `${branch.completionRate}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold w-12 text-right ${getRateTextColor(branch.completionRate)}`}>
                              {branch.completionRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teams (expanded) */}
                    {isExpanded && (
                      <div className="bg-gray-50/50">
                        {branchTeams.map((team) => {
                          const teamKey = `${branch.name}-${team.name}`;
                          const isTeamExpanded = expandedTeams.has(teamKey);
                          const teamEmployees = statistics.filter(
                            s => s.branch === branch.name && s.position === team.name
                          );

                          return (
                            <div key={teamKey} className="border-t border-gray-200">
                              {/* Team Row */}
                              <div
                                className="p-3 pl-12 hover:bg-gray-100 cursor-pointer transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTeam(branch.name, team.name);
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="flex items-center gap-2">
                                      {isTeamExpanded ? (
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                      ) : (
                                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                      )}
                                      <Users className="w-3.5 h-3.5 text-purple-600" />
                                    </div>
                                    <div>
                                      <div className="text-xs font-semibold">{team.name}</div>
                                      <div className="text-xs text-gray-500">{team.employees} members</div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <div className="text-xs text-gray-500">Tasks</div>
                                      <div className="text-xs">{team.completedTodos}/{team.totalTodos}</div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                        <div
                                          className={`h-1.5 rounded-full ${getRateColor(team.completionRate)}`}
                                          style={{ width: `${team.completionRate}%` }}
                                        />
                                      </div>
                                      <span className={`text-xs font-bold w-10 text-right ${getRateTextColor(team.completionRate)}`}>
                                        {team.completionRate}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Employees (expanded) */}
                              {isTeamExpanded && (
                                <div className="bg-gray-100/50">
                                  {teamEmployees.map((emp) => (
                                    <div
                                      key={emp.employeeId}
                                      className="p-2.5 pl-20 hover:bg-blue-50 cursor-pointer transition-colors border-t border-gray-200"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openEmployeeDetail(emp);
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 flex-1">
                                          <User className="w-3 h-3 text-blue-600" />
                                          <div>
                                            <div className="text-xs font-medium">{emp.employeeName}</div>
                                            <div className="text-xs text-gray-500">ID: {emp.employeeId}</div>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                          <div className="text-right">
                                            <div className="text-xs text-gray-500">Tasks</div>
                                            <div className="text-xs">{emp.completedTodos}/{emp.totalTodos}</div>
                                          </div>
                                          
                                          <div className="flex items-center gap-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                              <div
                                                className={`h-1.5 rounded-full ${getRateColor(emp.completionRate)}`}
                                                style={{ width: `${emp.completionRate}%` }}
                                              />
                                            </div>
                                            <span className={`text-xs font-bold w-10 text-right ${getRateTextColor(emp.completionRate)}`}>
                                              {emp.completionRate}%
                                            </span>
                                          </div>
                                          
                                          <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <div>
                  <h2 className="text-base font-semibold">{selectedEmployee.employeeName}</h2>
                  <p className="text-xs opacity-90">{selectedEmployee.position} • {selectedEmployee.branch}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {/* Period Filter */}
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 font-semibold">Period:</span>
                  {(['daily', 'weekly', 'monthly'] as Period[]).map(period => (
                    <button
                      key={period}
                      onClick={() => setEmployeePeriod(period)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                        employeePeriod === period
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200 mb-3">
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-0.5">Total</div>
                    <div className="text-xl font-bold text-gray-900">
                      {employeePeriod === 'daily' ? 5 : 
                       employeePeriod === 'weekly' ? 32 : 128}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-0.5">Completed</div>
                    <div className="text-xl font-bold text-green-600">
                      {employeePeriod === 'daily' ? Math.round(5 * selectedEmployee.completionRate / 100) : 
                       employeePeriod === 'weekly' ? Math.round(32 * selectedEmployee.completionRate / 100) : 
                       Math.round(128 * selectedEmployee.completionRate / 100)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-0.5">Rate</div>
                    <div className={`text-xl font-bold ${getRateTextColor(selectedEmployee.completionRate)}`}>
                      {selectedEmployee.completionRate}%
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getRateColor(selectedEmployee.completionRate)} transition-all duration-500`}
                    style={{ width: `${selectedEmployee.completionRate}%` }}
                  />
                </div>
              </div>

              {/* Task List */}
              <div>
                <h3 className="text-xs font-semibold mb-2 text-gray-700">Task List ({employeePeriod})</h3>
                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                  {employeePeriod === 'daily' ? (
                    // Daily: Show tasks without grouping
                    getEmployeeTasks(selectedEmployee.employeeId, employeePeriod).map((task) => (
                      <div
                        key={task.id}
                        className={`p-2 rounded-lg border transition-all ${
                          task.isCompleted ? 'bg-green-50/50 border-green-200' : 'bg-white border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-1.5 flex-1 min-w-0">
                            {task.isCompleted ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className={`text-xs ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {task.title}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] border ${getPriorityColor(task.priority)}`}>
                                  {task.priority.toUpperCase()}
                                </span>
                                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                                  {task.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          {task.completedAt && (
                            <div className="text-[10px] text-green-600 whitespace-nowrap flex-shrink-0">
                              {task.completedAt.split(' ')[1]}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Weekly/Monthly: Group by date
                    (() => {
                      const tasks = getEmployeeTasks(selectedEmployee.employeeId, employeePeriod);
                      const groupedTasks = tasks.reduce((acc, task) => {
                        if (!acc[task.date]) {
                          acc[task.date] = [];
                        }
                        acc[task.date].push(task);
                        return acc;
                      }, {} as { [key: string]: TaskItem[] });

                      const sortedDates = Object.keys(groupedTasks).sort((a, b) => b.localeCompare(a));

                      return sortedDates.map(date => (
                        <div key={date} className="mb-2">
                          <div className="sticky top-0 bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-700 mb-1 flex items-center justify-between">
                            <span>{date}</span>
                            <span className="text-gray-500">
                              {groupedTasks[date].filter(t => t.isCompleted).length}/{groupedTasks[date].length} completed
                            </span>
                          </div>
                          <div className="space-y-1">
                            {groupedTasks[date].map((task) => (
                              <div
                                key={task.id}
                                className={`p-2 rounded-lg border transition-all ${
                                  task.isCompleted ? 'bg-green-50/50 border-green-200' : 'bg-white border-gray-300'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-1.5 flex-1 min-w-0">
                                    {task.isCompleted ? (
                                      <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                                    ) : (
                                      <Circle className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <div className={`text-xs ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                        {task.title}
                                      </div>
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${getPriorityColor(task.priority)}`}>
                                          {task.priority.toUpperCase()}
                                        </span>
                                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                                          {task.category}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {task.completedAt && (
                                    <div className="text-[10px] text-green-600 whitespace-nowrap flex-shrink-0">
                                      {task.completedAt.split(' ')[1]}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()
                  )}
                </div>
              </div>
            </div>

            <div className="p-2.5 border-t border-gray-200 flex justify-end bg-gray-50">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}