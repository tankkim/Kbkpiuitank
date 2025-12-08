import { useState, Fragment, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { allKPIResultData } from '../data/allKPIResultData';
import { ChevronDown, ChevronRight, LayoutGrid, LayoutList, MessageSquare } from 'lucide-react';
import { employees } from '../data/adminData';
import { EmployeeCommentModal } from './EmployeeCommentModal';
import type { Employee } from '../data/adminData';

type ViewMode = 'branch' | 'kpi';

export function AllKPIResult() {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-20'));
  const [viewMode, setViewMode] = useState<ViewMode>('branch');
  const [collapsedRegions, setCollapsedRegions] = useState<Set<string>>(
    new Set(['REGIONAL II', 'REGIONAL III', 'REGIONAL IV', 'REGIONAL V', 'REGIONAL VI', 'REGIONAL VII'])
  );
  const [expandedKPIs, setExpandedKPIs] = useState<Set<string>>(new Set());
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set(['JAKARTA PUSAT']));
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [shouldPulse, setShouldPulse] = useState(true);

  const toggleRegion = (region: string) => {
    setCollapsedRegions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(region)) {
        newSet.delete(region);
      } else {
        newSet.add(region);
      }
      return newSet;
    });
  };

  const toggleBranch = (branchName: string) => {
    setExpandedBranches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(branchName)) {
        newSet.delete(branchName);
      } else {
        newSet.add(branchName);
      }
      return newSet;
    });
  };

  const toggleKPI = (kpiField: string) => {
    setExpandedKPIs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(kpiField)) {
        newSet.delete(kpiField);
      } else {
        newSet.add(kpiField);
      }
      return newSet;
    });
  };

  // Calculate KPI summary statistics
  const kpiSummary = useMemo(() => {
    // Only include actual branches (not TOTAL BRANCH or REGIONAL headers)
    const branches = allKPIResultData.filter(
      row => row.no !== '-' && row.no !== '' && row.branchCode !== '~'
    );

    const calculateStats = (kpiField: string) => {
      const values = branches
        .map(branch => {
          const kpi = (branch as any)[kpiField];
          if (!kpi || !kpi.achievement) return null;
          const achVal = parseFloat(kpi.achievement.replace('%', ''));
          return { achVal, branch: branch.branch };
        })
        .filter(v => v !== null && !isNaN(v.achVal)) as { achVal: number; branch: string }[];

      if (values.length === 0) return null;

      const avg = values.reduce((sum, v) => sum + v.achVal, 0) / values.length;
      const max = Math.max(...values.map(v => v.achVal));
      const min = Math.min(...values.map(v => v.achVal));
      const topBranch = values.find(v => v.achVal === max)?.branch || '-';
      const lowestBranch = values.find(v => v.achVal === min)?.branch || '-';

      return {
        totalBranches: values.length,
        avgAch: avg.toFixed(2) + '%',
        maxAch: max.toFixed(2) + '%',
        minAch: min.toFixed(2) + '%',
        topBranch,
        lowestBranch,
      };
    };

    return [
      { name: 'New to CASA/Digital Account', field: 'newCASA', category: 'CUSTOMER', color: 'bg-blue-600' },
      { name: 'Number of Priority Customer', field: 'priorityCustomer', category: 'CUSTOMER', color: 'bg-blue-600' },
      { name: 'New Cooperation (Payroll/Others)', field: 'newCooperation', category: 'CUSTOMER', color: 'bg-blue-600' },
      { name: 'NIM', field: 'nim', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'Normal Loan', field: 'normalLoan', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'Time Deposit', field: 'timeDeposit', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'CASA Increase', field: 'casaIncrease', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'Fee Based Income (WM)', field: 'feeWM', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'Fee Based Income (Non WM)', field: 'feeNonWM', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'PPOP', field: 'ppop', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'Coll2 Management', field: 'coll2', category: 'FINANCIAL', color: 'bg-green-600' },
      { name: 'Strategic Campaign', field: 'strategicCampaign', category: 'LEARNING & LEADERSHIP', color: 'bg-purple-600' },
      { name: 'Sales Productivity', field: 'salesProductivity', category: 'LEARNING & LEADERSHIP', color: 'bg-purple-600' },
      { name: 'NPL Reduction', field: 'nplReduction', category: 'ADDITIONAL POINT', color: 'bg-orange-600' },
      { name: 'Cross Selling Point', field: 'crossSelling', category: 'ADDITIONAL POINT', color: 'bg-orange-600' },
      { name: 'Special Booster', field: 'specialBooster', category: 'ADDITIONAL POINT', color: 'bg-orange-600' },
      { name: 'Zero Fraud', field: 'zeroFraud', category: 'COMPLIANCE & FRAUD', color: 'bg-red-600' },
      { name: 'Compliance Index', field: 'complianceIndex', category: 'COMPLIANCE & FRAUD', color: 'bg-red-600' },
    ].map(kpi => ({
      ...kpi,
      stats: calculateStats(kpi.field),
    }));
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900">All KPI Results</h1>
            <p className="text-sm text-gray-600 mt-1">Complete Performance Data</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('branch')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'branch'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutList className="w-4 h-4" />
                By Branch
              </button>
              <button
                onClick={() => setViewMode('kpi')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'kpi'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                By KPI
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                dateFormat="dd-MMM-yy"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <span className="text-lg">KB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'branch' ? (
        // Original Branch View
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <div className="overflow-x-auto">
                <table className="border-collapse text-xs min-w-max w-full">
                  <thead className="sticky top-0 z-20">
                    {/* First header row - Category groups */}
                    <tr className="bg-gray-700 text-white">
                      <th className="border border-gray-400 px-2 py-2 sticky left-0 z-30 bg-gray-700"></th>
                      <th className="border border-gray-400 px-2 py-2 sticky left-[35px] z-30 bg-gray-700"></th>
                      <th className="border border-gray-400 px-2 py-2 sticky left-[125px] z-30 bg-gray-700"></th>
                      <th className="border border-gray-400 px-2 py-2 sticky left-[185px] z-30 bg-gray-700"></th>
                      <th className="border border-gray-400 px-2 py-2 sticky left-[325px] z-30 bg-gray-700"></th>
                      <th colSpan={3} className="border border-gray-400 px-2 py-2 bg-indigo-600">TOTAL SCORE</th>
                      <th colSpan={18} className="border border-gray-400 px-2 py-2 bg-blue-600">CUSTOMER</th>
                      <th colSpan={48} className="border border-gray-400 px-2 py-2 bg-green-600">FINANCIAL</th>
                      <th colSpan={12} className="border border-gray-400 px-2 py-2 bg-purple-600">LEARNING & LEADERSHIP</th>
                      <th colSpan={18} className="border border-gray-400 px-2 py-2 bg-orange-600">ADDITIONAL POINT</th>
                      <th colSpan={12} className="border border-gray-400 px-2 py-2 bg-red-600">COMPLIANCE & FRAUD</th>
                    </tr>

                    {/* Second header row - KPI names */}
                    <tr className="bg-gray-600 text-white">
                      <th className="border border-gray-400 px-1 py-1 min-w-[35px] sticky left-0 z-30 bg-gray-600">NO</th>
                      <th className="border border-gray-400 px-2 py-1 min-w-[90px] sticky left-[35px] z-30 bg-gray-600">REGION</th>
                      <th className="border border-gray-400 px-2 py-1 min-w-[60px] sticky left-[125px] z-30 bg-gray-600">
                        BRANCH<br/>CODE
                      </th>
                      <th className="border border-gray-400 px-2 py-1 min-w-[140px] sticky left-[185px] z-30 bg-gray-600">BRANCH</th>
                      <th className="border border-gray-400 px-2 py-1 min-w-[60px] sticky left-[325px] z-30 bg-gray-600">
                        BRANCH<br/>TYPE
                      </th>
                      
                      <th className="border border-gray-400 px-2 py-1 min-w-[60px] bg-indigo-600">
                        FINAL<br/>SCORE
                      </th>
                      <th className="border border-gray-400 px-2 py-1 min-w-[50px] bg-indigo-600">
                        RATING<br/>KPI
                      </th>
                      <th className="border border-gray-400 px-2 py-1 min-w-[65px] bg-indigo-600">
                        BANKWIDE<br/>RANK
                      </th>

                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-blue-600">New to CASA/Digital Account<br/>31-May-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-blue-600">Number of Priority Customer<br/>31-May-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-blue-600">New Cooperation (Payroll/Others)<br/>31-May-25</th>

                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">NIM<br/>17-Apr-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">Normal Loan<br/>31-May-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">Time Deposit<br/>20-Jun-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">CASA Increase<br/>20-Jun-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">Fee Based Income (WM)<br/>17-Apr-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">Fee Based Income (Non WM)<br/>17-Apr-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">PPOP<br/>17-Apr-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-green-600">Coll2 Management<br/>30-Apr-25</th>

                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-purple-600">Strategic Campaign*<br/>30-Apr-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-purple-600">Sales Productivity<br/>30-Apr-25</th>

                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-orange-600">NPL Reduction<br/>30-Apr-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-orange-600">Cross Selling Point<br/>31-May-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-orange-600">Special Booster*<br/>31-May-25</th>

                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-red-600">Zero Fraud<br/>31-May-25</th>
                      <th colSpan={6} className="border border-gray-400 px-2 py-1 bg-red-600">Compliance Index<br/>31-May-25</th>
                    </tr>

                    {/* Third header row - Column details */}
                    <tr className="bg-gray-500 text-white text-[10px]">
                      <th className="border border-gray-400 px-1 py-1 sticky left-0 z-30 bg-gray-500"></th>
                      <th className="border border-gray-400 px-1 py-1 sticky left-[35px] z-30 bg-gray-500"></th>
                      <th className="border border-gray-400 px-1 py-1 sticky left-[125px] z-30 bg-gray-500"></th>
                      <th className="border border-gray-400 px-1 py-1 sticky left-[185px] z-30 bg-gray-500"></th>
                      <th className="border border-gray-400 px-1 py-1 sticky left-[325px] z-30 bg-gray-500"></th>
                      
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>

                      {Array(16).fill(null).map((_, idx) => (
                        <Fragment key={idx}>
                          <th className="border border-gray-400 px-1 py-1 min-w-[70px]">Actual</th>
                          <th className="border border-gray-400 px-1 py-1 min-w-[70px]">Target</th>
                          <th className="border border-gray-400 px-1 py-1 min-w-[60px]">Ach (%)</th>
                          <th className="border border-gray-400 px-1 py-1 min-w-[50px]">Weight</th>
                          <th className="border border-gray-400 px-1 py-1 min-w-[70px]">Weight CAP</th>
                          <th className="border border-gray-400 px-1 py-1 min-w-[60px]">Score</th>
                        </Fragment>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {allKPIResultData.map((row, rowIndex) => {
                      // Determine row type
                      const isTotalBranch = row.branch === 'TOTAL BRANCH';
                      const isRegional = row.branchCode === '~' && row.region?.includes('REGIONAL');
                      const isBranchRow = !isTotalBranch && !isRegional && row.no !== '-' && row.no !== '';
                      
                      // Check if row should be hidden (child of collapsed regional)
                      const isChildRow = !isTotalBranch && !isRegional && row.region?.includes('REGIONAL');
                      const parentRegion = row.region;
                      const isHidden = isChildRow && collapsedRegions.has(parentRegion || '');
                      
                      if (isHidden) {
                        return null;
                      }
                      
                      // Determine background color
                      let rowBg = '';
                      if (isTotalBranch) {
                        rowBg = 'bg-amber-200';
                      } else if (isRegional) {
                        rowBg = 'bg-yellow-100';
                      } else {
                        rowBg = rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                      }
                      
                      // Get employees for this branch (if it's a branch row)
                      const branchEmployees = isBranchRow ? employees.filter(emp => emp.branch === row.branch) : [];
                      const isBranchExpanded = expandedBranches.has(row.branch);
                      
                      // Debug: Log branch info
                      if (isBranchRow && branchEmployees.length > 0) {
                        console.log(`Branch: ${row.branch}, Employees: ${branchEmployees.length}`);
                      }
                      
                      return (
                        <Fragment key={rowIndex}>
                          <tr 
                            className={`group ${isTotalBranch ? 'font-bold border-t-2 border-b-2 border-amber-600' : ''} ${isRegional ? 'font-semibold cursor-pointer hover:bg-yellow-200' : ''} ${isBranchRow && branchEmployees.length > 0 ? 'cursor-pointer hover:bg-green-100' : ''} transition-colors`}
                            onClick={(e) => {
                              if (isRegional && row.region) {
                                toggleRegion(row.region);
                              } else if (isBranchRow && branchEmployees.length > 0) {
                                e.stopPropagation();
                                console.log('Clicking branch:', row.branch);
                                toggleBranch(row.branch);
                              }
                            }}
                          >
                            {/* Sticky columns */}
                            <td className={`border border-gray-300 px-1 py-1.5 text-center sticky left-0 z-10 ${rowBg} group-hover:bg-blue-100`}>
                              {row.no}
                            </td>
                            <td className={`border border-gray-300 px-2 py-1.5 sticky left-[35px] z-10 ${rowBg} group-hover:bg-blue-100`}>
                              {row.region}
                            </td>
                            <td className={`border border-gray-300 px-2 py-1.5 text-center sticky left-[125px] z-10 ${rowBg} group-hover:bg-blue-100`}>
                              {row.branchCode}
                            </td>
                            <td 
                              className={`border border-gray-300 px-2 py-1.5 sticky left-[185px] z-10 ${rowBg} group-hover:bg-blue-100`}
                            >
                              {isRegional && (
                                <span className="inline-flex items-center gap-1">
                                  {collapsedRegions.has(row.region || '') ? (
                                    <ChevronRight className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                  {row.branch}
                                </span>
                              )}
                              {isBranchRow && branchEmployees.length > 0 && (
                                <span className="inline-flex items-center gap-1">
                                  {isBranchExpanded ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                  {row.branch}
                                  <span className="ml-1 px-1.5 py-0.5 bg-blue-500 text-white rounded-full text-[9px]">
                                    {branchEmployees.length}
                                  </span>
                                </span>
                              )}
                              {isBranchRow && branchEmployees.length === 0 && row.branch}
                              {!isRegional && !isBranchRow && row.branch}
                            </td>
                            <td className={`border border-gray-300 px-2 py-1.5 text-center sticky left-[325px] z-10 ${rowBg} group-hover:bg-blue-100`}>
                              {row.branchType}
                            </td>
                            
                            {/* Total score columns */}
                            <td className={`border border-gray-300 px-2 py-1.5 text-center ${rowBg} group-hover:bg-blue-100`}>
                              {row.finalScore}
                            </td>
                            <td className={`border border-gray-300 px-2 py-1.5 text-center ${rowBg} group-hover:bg-blue-100`}>
                              <span className={`inline-block px-2 py-0.5 rounded ${
                                row.rating?.startsWith('A+') ? 'bg-green-600 text-white' :
                                row.rating?.startsWith('A') && !row.rating.includes('+') ? 'bg-green-500 text-white' :
                                row.rating?.startsWith('B') ? 'bg-yellow-500 text-white' :
                                row.rating?.startsWith('C') ? 'bg-orange-500 text-white' :
                                row.rating?.startsWith('D') ? 'bg-red-500 text-white' :
                                row.rating?.startsWith('E') ? 'bg-red-700 text-white' :
                                'bg-gray-500 text-white'
                              }`}>
                                {row.rating}
                              </span>
                            </td>
                            <td className={`border border-gray-300 px-2 py-1.5 text-center ${rowBg} group-hover:bg-blue-100`}>
                              {row.bankwideRank}
                            </td>

                            {/* KPI columns */}
                            {renderKPI(row.newCASA, rowBg)}
                            {renderKPI(row.priorityCustomer, rowBg)}
                            {renderKPI(row.newCooperation, rowBg)}
                            {renderKPI(row.nim, rowBg)}
                            {renderKPI(row.normalLoan, rowBg)}
                            {renderKPI(row.timeDeposit, rowBg)}
                            {renderKPI(row.casaIncrease, rowBg)}
                            {renderKPI(row.feeWM, rowBg)}
                            {renderKPI(row.feeNonWM, rowBg)}
                            {renderKPI(row.ppop, rowBg)}
                            {renderKPI(row.coll2, rowBg)}
                            {renderKPI(row.strategicCampaign, rowBg)}
                            {renderKPI(row.salesProductivity, rowBg)}
                            {renderKPI(row.nplReduction, rowBg)}
                            {renderKPI(row.crossSelling, rowBg)}
                            {renderKPI(row.specialBooster, rowBg)}
                            {renderKPI(row.zeroFraud, rowBg)}
                            {renderKPI(row.complianceIndex, rowBg)}
                          </tr>

                          {/* Employee rows for expanded branches */}
                          {isBranchExpanded && branchEmployees.map((emp, empIdx) => {
                            const empPerf = emp.kpiPerformance;
                            const empRowBg = 'bg-blue-50/50';
                            const isFirstExpanded = row.branch === 'JAKARTA PUSAT' && shouldPulse;
                            
                            return (
                              <tr key={`${rowIndex}-emp-${empIdx}`} className={`relative ${empRowBg} hover:bg-blue-100/70 ${isFirstExpanded ? 'animate-pulse bg-gradient-to-r from-green-100 via-blue-100 to-green-100' : ''}`}>
                                <td className={`border border-gray-300 px-1 py-1.5 text-center sticky left-0 z-10 ${isFirstExpanded ? 'bg-gradient-to-r from-green-100 via-blue-100 to-green-100' : empRowBg}`}>
                                  {empIdx === 0 && isFirstExpanded && (
                                    <span className="text-[10px] text-green-600 font-bold animate-bounce block">👇</span>
                                  )}
                                </td>
                                <td className={`border border-gray-300 px-2 py-1.5 sticky left-[35px] z-10 ${isFirstExpanded ? 'bg-gradient-to-r from-green-100 via-blue-100 to-green-100' : empRowBg} text-xs text-gray-600`}>
                                  └ {emp.position}
                                </td>
                                <td className={`border border-gray-300 px-2 py-1.5 text-center sticky left-[125px] z-10 ${isFirstExpanded ? 'bg-gradient-to-r from-green-100 via-blue-100 to-green-100' : empRowBg} text-xs`}>
                                  {emp.employeeCode}
                                </td>
                                <td className={`border border-gray-300 px-2 py-1.5 sticky left-[185px] z-10 ${isFirstExpanded ? 'bg-gradient-to-r from-green-100 via-blue-100 to-green-100' : empRowBg}`}>
                                  <span className="text-xs font-medium text-gray-900">{emp.name}</span>
                                  {empIdx === 0 && isFirstExpanded && (
                                    <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-[9px] rounded-full font-bold animate-pulse">
                                      ✨ Employee Details
                                    </span>
                                  )}
                                </td>
                                <td className={`border border-gray-300 px-2 py-1.5 text-center sticky left-[325px] z-10 ${isFirstExpanded ? 'bg-gradient-to-r from-green-100 via-blue-100 to-green-100' : empRowBg}`}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedEmployee(emp);
                                      setShouldPulse(false);
                                    }}
                                    className={`p-1 rounded bg-green-500 text-white hover:bg-green-600 transition-colors ${isFirstExpanded ? 'animate-bounce' : ''}`}
                                    title="Add Comment"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                                
                                {/* Total score columns */}
                                <td className={`border border-gray-300 px-2 py-1.5 text-center ${empRowBg}`}>
                                  {empPerf?.finalScore || '-'}
                                </td>
                                <td className={`border border-gray-300 px-2 py-1.5 text-center ${empRowBg}`}>
                                  {empPerf?.rating && (
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                                      empPerf.rating.startsWith('A+') ? 'bg-green-600 text-white' :
                                      empPerf.rating.startsWith('A') && !empPerf.rating.includes('+') ? 'bg-green-500 text-white' :
                                      empPerf.rating.startsWith('B') ? 'bg-yellow-500 text-white' :
                                      empPerf.rating.startsWith('C') ? 'bg-orange-500 text-white' :
                                      empPerf.rating.startsWith('D') ? 'bg-red-500 text-white' :
                                      empPerf.rating.startsWith('E') ? 'bg-red-700 text-white' :
                                      'bg-gray-500 text-white'
                                    }`}>
                                      {empPerf.rating}
                                    </span>
                                  )}
                                  {!empPerf?.rating && '-'}
                                </td>
                                <td className={`border border-gray-300 px-2 py-1.5 text-center ${empRowBg}`}>
                                  {empPerf?.bankwideRank || '-'}
                                </td>

                                {/* KPI columns */}
                                {renderKPI(empPerf?.newCASA, empRowBg)}
                                {renderKPI(empPerf?.priorityCustomer, empRowBg)}
                                {renderKPI(empPerf?.newCooperation, empRowBg)}
                                {renderKPI(empPerf?.nim, empRowBg)}
                                {renderKPI(empPerf?.normalLoan, empRowBg)}
                                {renderKPI(empPerf?.timeDeposit, empRowBg)}
                                {renderKPI(empPerf?.casaIncrease, empRowBg)}
                                {renderKPI(empPerf?.feeWM, empRowBg)}
                                {renderKPI(empPerf?.feeNonWM, empRowBg)}
                                {renderKPI(empPerf?.ppop, empRowBg)}
                                {renderKPI(empPerf?.coll2, empRowBg)}
                                {renderKPI(empPerf?.strategicCampaign, empRowBg)}
                                {renderKPI(empPerf?.salesProductivity, empRowBg)}
                                {renderKPI(empPerf?.nplReduction, empRowBg)}
                                {renderKPI(empPerf?.crossSelling, empRowBg)}
                                {renderKPI(empPerf?.specialBooster, empRowBg)}
                                {renderKPI(empPerf?.zeroFraud, empRowBg)}
                                {renderKPI(empPerf?.complianceIndex, empRowBg)}
                              </tr>
                            );
                          })}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // KPI Summary View
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative overflow-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <table className="border-collapse w-full text-sm">
                <thead className="sticky top-0 z-20 bg-gray-700 text-white">
                  <tr>
                    <th className="border border-gray-400 px-4 py-3 text-left min-w-[250px]">KPI Name</th>
                    <th className="border border-gray-400 px-4 py-3 text-center min-w-[120px]">Category</th>
                    <th className="border border-gray-400 px-4 py-3 text-center min-w-[100px]">Total Branches</th>
                    <th className="border border-gray-400 px-4 py-3 text-center min-w-[120px]">Avg Ach %</th>
                    <th className="border border-gray-400 px-4 py-3 text-center min-w-[120px]">Max Ach %</th>
                    <th className="border border-gray-400 px-4 py-3 text-center min-w-[120px]">Min Ach %</th>
                    <th className="border border-gray-400 px-4 py-3 text-left min-w-[200px]">Top Performing Branch</th>
                    <th className="border border-gray-400 px-4 py-3 text-left min-w-[200px]">Lowest Performing Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiSummary.map((kpi, idx) => {
                    const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                    const hasData = kpi.stats !== null;
                    const isExpanded = expandedKPIs.has(kpi.field);

                    // Get all branches data for this KPI
                    const branches = allKPIResultData.filter(
                      row => row.no !== '-' && row.no !== '' && row.branchCode !== '~'
                    );

                    return (
                      <Fragment key={idx}>
                        {/* Summary Row */}
                        <tr 
                          className={`group hover:bg-blue-50 ${rowBg} cursor-pointer`}
                          onClick={() => hasData && toggleKPI(kpi.field)}
                        >
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex items-center gap-2">
                              {hasData && (
                                isExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-gray-600" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-600" />
                                )
                              )}
                              <span className={`w-3 h-3 rounded ${kpi.color}`}></span>
                              <span className="font-medium">{kpi.name}</span>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <span className={`inline-block px-3 py-1 rounded text-xs text-white ${kpi.color}`}>
                              {kpi.category}
                            </span>
                          </td>
                          {hasData ? (
                            <>
                              <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                                {kpi.stats.totalBranches}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center">
                                <span className={`inline-block px-3 py-1 rounded font-semibold ${
                                  parseFloat(kpi.stats.avgAch) >= 100 ? 'bg-green-100 text-green-700' :
                                  parseFloat(kpi.stats.avgAch) >= 80 ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {kpi.stats.avgAch}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center">
                                <span className="text-green-600 font-semibold">{kpi.stats.maxAch}</span>
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center">
                                <span className="text-red-600 font-semibold">{kpi.stats.minAch}</span>
                              </td>
                              <td className="border border-gray-300 px-4 py-3">
                                <span className="text-green-600 font-medium">{kpi.stats.topBranch}</span>
                              </td>
                              <td className="border border-gray-300 px-4 py-3">
                                <span className="text-red-600 font-medium">{kpi.stats.lowestBranch}</span>
                              </td>
                            </>
                          ) : (
                            <>
                              <td colSpan={6} className="border border-gray-300 px-4 py-3 text-center text-gray-400 italic">
                                No data available
                              </td>
                            </>
                          )}
                        </tr>

                        {/* Expanded Detail Rows */}
                        {isExpanded && hasData && (
                          <>
                            {/* Detail Header */}
                            <tr className="bg-gray-100">
                              <td className="border border-gray-300 px-6 py-2 text-xs font-semibold text-gray-700">Branch Name</td>
                              <td className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 text-center">Region</td>
                              <td className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 text-center">Actual</td>
                              <td className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 text-center">Target</td>
                              <td className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 text-center">Ach %</td>
                              <td className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 text-center">Weight</td>
                              <td className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 text-center">Weight Cap</td>
                              <td className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 text-center">Score</td>
                            </tr>
                            {/* Detail Data Rows */}
                            {branches.map((branch, branchIdx) => {
                              const kpiData = (branch as any)[kpi.field];
                              if (!kpiData || !kpiData.achievement) return null;

                              const achVal = parseFloat(kpiData.achievement.replace('%', ''));
                              const detailRowBg = branchIdx % 2 === 0 ? 'bg-blue-50' : 'bg-white';
                              
                              // Parse actual and target for comparison
                              const parseValue = (val: string) => {
                                if (!val || val === '-') return null;
                                const cleaned = val.replace(/,/g, '');
                                const parsed = parseFloat(cleaned);
                                return isNaN(parsed) ? null : parsed;
                              };

                              const actualVal = parseValue(kpiData.actual);
                              const targetVal = parseValue(kpiData.target);
                              
                              // Calculate achievement percentage and determine color
                              let actualColor = '';
                              if (actualVal !== null && targetVal !== null && targetVal !== 0) {
                                const achievementRate = (actualVal / targetVal) * 100;
                                
                                if (achievementRate >= 100) {
                                  actualColor = 'text-green-600 font-semibold';
                                } else if (achievementRate >= 80) {
                                  actualColor = 'text-yellow-600 font-semibold';
                                } else {
                                  actualColor = 'text-red-600 font-semibold';
                                }
                              }
                              
                              return (
                                <tr key={branchIdx} className={`${detailRowBg} hover:bg-blue-100 text-xs`}>
                                  <td className="border border-gray-300 px-6 py-2">{branch.branch}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-600">{branch.region}</td>
                                  <td className={`border border-gray-300 px-4 py-2 text-right ${actualColor}`}>{kpiData.actual}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-right">{kpiData.target}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">
                                    <span className={`inline-block px-2 py-0.5 rounded font-medium ${
                                      achVal >= 100 ? 'bg-green-500 text-white' :
                                      achVal >= 80 ? 'bg-yellow-500 text-white' :
                                      'bg-red-500 text-white'
                                    }`}>
                                      {kpiData.achievement}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{kpiData.weight}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{kpiData.weightCap}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-right font-semibold">{kpiData.score}</td>
                                </tr>
                              );
                            })}
                          </>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Employee Comment Modal */}
      {selectedEmployee && (
        <EmployeeCommentModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

function renderKPI(kpi: any, bg: string) {
  if (!kpi) {
    return (
      <>
        <td className={`border border-gray-300 px-2 py-1.5 text-right ${bg} group-hover:bg-blue-100`}>-</td>
        <td className={`border border-gray-300 px-2 py-1.5 text-right ${bg} group-hover:bg-blue-100`}>-</td>
        <td className={`border border-gray-300 px-2 py-1.5 text-right ${bg} group-hover:bg-blue-100`}>-</td>
        <td className={`border border-gray-300 px-2 py-1.5 text-center ${bg} group-hover:bg-blue-100`}>-</td>
        <td className={`border border-gray-300 px-2 py-1.5 text-center ${bg} group-hover:bg-blue-100`}>-</td>
        <td className={`border border-gray-300 px-2 py-1.5 text-right ${bg} group-hover:bg-blue-100`}>-</td>
      </>
    );
  }

  const achVal = parseFloat(kpi.achievement?.replace('%', '') || '0');
  const achBg = achVal >= 100 ? 'bg-green-500 text-white' : 
                achVal >= 80 ? 'bg-yellow-500 text-white' : 
                achVal > 0 ? 'bg-red-500 text-white' : '';

  // Parse actual and target for comparison
  const parseValue = (val: string) => {
    if (!val || val === '-') return null;
    // Remove commas and parse as number
    const cleaned = val.replace(/,/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  };

  const actualVal = parseValue(kpi.actual);
  const targetVal = parseValue(kpi.target);
  
  // Calculate achievement percentage and determine color
  let actualColor = '';
  if (actualVal !== null && targetVal !== null && targetVal !== 0) {
    const achievementRate = (actualVal / targetVal) * 100;
    
    if (achievementRate >= 100) {
      actualColor = 'text-green-600 font-semibold';
    } else if (achievementRate >= 80) {
      actualColor = 'text-yellow-600 font-semibold';
    } else {
      actualColor = 'text-red-600 font-semibold';
    }
  }

  return (
    <>
      <td className={`border border-gray-300 px-2 py-1.5 text-right ${bg} group-hover:bg-blue-100 ${actualColor}`}>
        {kpi.actual || '-'}
      </td>
      <td className={`border border-gray-300 px-2 py-1.5 text-right ${bg} group-hover:bg-blue-100`}>
        {kpi.target || '-'}
      </td>
      <td className={`border border-gray-300 px-2 py-1.5 text-right ${achBg || bg} ${!achBg ? 'group-hover:bg-blue-100' : ''}`}>
        {kpi.achievement || '-'}
      </td>
      <td className={`border border-gray-300 px-2 py-1.5 text-center ${bg} group-hover:bg-blue-100`}>
        {kpi.weight || '-'}
      </td>
      <td className={`border border-gray-300 px-2 py-1.5 text-center ${bg} group-hover:bg-blue-100`}>
        {kpi.weightCap || '-'}
      </td>
      <td className={`border border-gray-300 px-2 py-1.5 text-right ${bg} group-hover:bg-blue-100`}>
        {kpi.score || '-'}
      </td>
    </>
  );
}