import { ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { kpiData } from '../data/kpiData';
import { PageHeader } from './PageHeader';
import { performanceData } from '../data/scoreboardData';

interface ScoreboardProps {
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

// Branch and Region Data
interface BranchOption {
  id: string;
  name: string;
  code: string;
  region: string;
  manager: string;
}

const branches: BranchOption[] = [
  { id: 'br-1', name: 'JAKARTA PUSAT', code: 'JKT-001', region: 'REGIONAL I', manager: 'Budi Santoso' },
  { id: 'br-2', name: 'JAKARTA SELATAN', code: 'JKT-002', region: 'REGIONAL I', manager: 'Siti Nurhaliza' },
  { id: 'br-3', name: 'TANGERANG', code: 'TNG-001', region: 'REGIONAL I', manager: 'Ahmad Wijaya' },
  { id: 'br-4', name: 'BANDUNG DAGO', code: 'BDG-001', region: 'REGIONAL II', manager: 'Rina Kusuma' },
  { id: 'br-5', name: 'BANDUNG KOPO', code: 'BDG-002', region: 'REGIONAL II', manager: 'Dedi Kurniawan' },
  { id: 'br-6', name: 'SURABAYA TUNJUNGAN', code: 'SBY-001', region: 'REGIONAL III', manager: 'Eko Prasetyo' },
  { id: 'br-7', name: 'SURABAYA DARMO', code: 'SBY-002', region: 'REGIONAL III', manager: 'Fitri Handayani' },
  { id: 'br-8', name: 'MEDAN PLAZA', code: 'MDN-001', region: 'REGIONAL IV', manager: 'Hendra Wijaya' },
  { id: 'br-9', name: 'PALEMBANG', code: 'PLM-001', region: 'REGIONAL V', manager: 'Indah Permata' },
  { id: 'br-10', name: 'MAKASSAR', code: 'MKS-001', region: 'REGIONAL VI', manager: 'Joko Susilo' },
  { id: 'br-11', name: 'DENPASAR', code: 'DPS-001', region: 'REGIONAL VII', manager: 'Kartika Dewi' },
];

const regions = ['REGIONAL I', 'REGIONAL II', 'REGIONAL III', 'REGIONAL IV', 'REGIONAL V', 'REGIONAL VI', 'REGIONAL VII'];

export function Scoreboard({ unreadNotificationsCount = 0, onNotificationClick }: ScoreboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('Jun-25');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-20'));
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  // Filter branches by selected region
  const filteredBranches = useMemo(() => {
    if (selectedRegion === 'all') return branches;
    return branches.filter(b => b.region === selectedRegion);
  }, [selectedRegion]);

  // Get selected branch data
  const branchData = useMemo(() => {
    if (selectedBranch === 'all') return null;
    return branches.find(b => b.id === selectedBranch) || null;
  }, [selectedBranch]);

  // Calculate totals based on selection
  const totals = useMemo(() => {
    if (selectedBranch !== 'all' && selectedBranch) {
      // Single branch selected
      return {
        regional: 1,
        branch: 1,
        subBranches: 12
      };
    } else if (selectedRegion !== 'all' && selectedRegion) {
      // Region selected
      const branchesInRegion = branches.filter(b => b.region === selectedRegion).length;
      return {
        regional: 1,
        branch: branchesInRegion,
        subBranches: branchesInRegion * 12
      };
    } else {
      // All selected
      return {
        regional: 7,
        branch: 46,
        subBranches: 172
      };
    }
  }, [selectedRegion, selectedBranch]);

  // Get KPI Performance Data
  const kpiPerformance = useMemo(() => {
    try {
      if (selectedBranch && selectedBranch !== 'all' && performanceData[selectedBranch]) {
        return performanceData[selectedBranch];
      } else if (selectedRegion && selectedRegion !== 'all' && performanceData[selectedRegion]) {
        return performanceData[selectedRegion];
      } else {
        return performanceData['all'];
      }
    } catch (error) {
      console.error('Error getting performance data:', error);
      return performanceData['all'];
    }
  }, [selectedRegion, selectedBranch]);

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[1800px] mx-auto">
        {/* Unified Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900">2025 Key Performance Indicator (KPI)</h1>
              <p className="text-sm text-gray-600 mt-1">Scoreboard & Performance Overview</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Period KPI:</label>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Month:</label>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option>Jun-25</option>
                  <option>May-25</option>
                  <option>Apr-25</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Date of Data:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date as Date)}
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

        {/* Main Content */}
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Top Section: General Information + KPI Result */}
            <div className="grid grid-cols-[1fr_auto] gap-6 p-6 bg-gradient-to-r from-slate-100 to-slate-50 border-b border-gray-300">
              {/* General Information */}
              <div>
                <div className="bg-[#4a5f7f] text-white px-4 py-2 mb-3 rounded-t-lg">
                  <h2 className="text-sm">GENERAL INFORMATION</h2>
                </div>
                <div className="space-y-2 text-sm">
                  {/* Row 1: Region & Branch Selectors + Branch Manager */}
                  <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
                    {/* Region Selector */}
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap w-28">REGION:</label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedRegion(value);
                          setSelectedBranch('all');
                        }}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>

                    {/* Branch Selector */}
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap w-28">BRANCH:</label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedBranch(value);
                        }}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={selectedRegion === 'all'}
                      >
                        <option value="all">All</option>
                        {filteredBranches.map((branch) => (
                          <option key={branch.id} value={branch.id}>{branch.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Branch Manager - Auto Display */}
                    {branchData && (
                      <div className="flex items-center gap-2">
                        <label className="text-gray-700 whitespace-nowrap w-32">BRANCH MANAGER:</label>
                        <div className="flex-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded text-gray-900">
                          {branchData.manager}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Row 2: 3 calculated fields - Read Only */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap">TOTAL REGIONAL:</label>
                      <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 w-16 text-center">
                        {totals.regional}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap">TOTAL BRANCH:</label>
                      <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 w-16 text-center">
                        {totals.branch}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap">TOTAL SUB-BRANCHES:</label>
                      <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 w-16 text-center">
                        {totals.subBranches}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPI Result Card - Horizontal Layout */}
              <div className="bg-white border-2 border-[#4a5f7f] rounded-lg px-4 py-3 shadow-md flex items-center gap-4 min-w-[280px]">
                {/* Left: Trophy + Badge */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <div className="bg-[#4a5f7f] text-white px-3 py-0.5 rounded-full text-xs whitespace-nowrap">
                    KPI RESULT
                  </div>
                </div>
                
                {/* Right: Metrics */}
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600">Rating KPI</span>
                    <span className="text-xl text-blue-600">{kpiPerformance.rating}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600">Score KPI</span>
                    <span className="text-lg text-gray-900">{kpiPerformance.score}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600">Rank Position</span>
                    <span className="text-gray-900">{kpiPerformance.rank}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Table Section */}
            <div className="overflow-x-auto">
              <div className="bg-[#4a5f7f] text-white px-4 py-2">
                <h2 className="text-sm">PERFORMANCE</h2>
              </div>
              
              <table className="w-full text-xs border-collapse">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="border border-gray-300 px-2 py-2 text-left bg-gray-200 min-w-[180px]">KPI Index</th>
                    <th className="border border-gray-300 px-2 py-2 bg-gray-200 min-w-[60px]">Unit</th>
                    <th className="border border-gray-300 px-2 py-2 bg-gray-200 min-w-[80px]">Data Date</th>
                    <th className="border border-gray-300 px-2 py-2 bg-gray-200 min-w-[70px]">Weight (A)</th>
                    <th className="border border-gray-300 px-2 py-2 bg-gray-200 min-w-[80px]">Weight CAP</th>
                    <th colSpan={4} className="border border-gray-300 px-2 py-2 bg-blue-100">Performance</th>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-200"></th>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-200"></th>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-200"></th>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-200"></th>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-200"></th>
                    <th className="border border-gray-300 px-2 py-1 bg-blue-100 min-w-[90px]">Actual (B)</th>
                    <th className="border border-gray-300 px-2 py-1 bg-blue-100 min-w-[90px]">Target</th>
                    <th className="border border-gray-300 px-2 py-1 bg-blue-100 min-w-[100px]">Achievement (-)</th>
                    <th className="border border-gray-300 px-2 py-1 bg-blue-100 min-w-[70px]">Score (AxB)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Customer Section */}
                  <tr className="bg-[#4a5f7f] text-white">
                    <td colSpan={9} className="border border-gray-400 px-2 py-1.5">Customer</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">New to CASA/Digital Account</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Number</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.newCASA.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.newCASA.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">{kpiPerformance.newCASA.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.newCASA.score}</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Number of Priority Customer</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Number</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.priorityCustomer.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.priorityCustomer.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">{kpiPerformance.priorityCustomer.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.priorityCustomer.score}</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">New Cooperation (Payroll/Others)</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Number</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.newCooperation.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.newCooperation.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-red-100">{kpiPerformance.newCooperation.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.newCooperation.score}</td>
                  </tr>

                  {/* Financial Section */}
                  <tr className="bg-[#4a5f7f] text-white">
                    <td colSpan={9} className="border border-gray-400 px-2 py-1.5">Financial</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">NIM</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">%</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">17-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">112.5</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.nim.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.nim.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">{kpiPerformance.nim.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.nim.score}</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Normal Loan</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">300</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">300</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.normalLoan.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.normalLoan.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">{kpiPerformance.normalLoan.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.normalLoan.score}</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Time Deposit</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">20-Jun-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.timeDeposit.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.timeDeposit.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">{kpiPerformance.timeDeposit.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.timeDeposit.score}</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">CASA Increase</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">20-Jun-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">225</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.casaIncrease.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.casaIncrease.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-red-100">{kpiPerformance.casaIncrease.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.casaIncrease.score}</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Fee Based Income (WM)</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">17-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">112.5</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.feeWM.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.feeWM.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">{kpiPerformance.feeWM.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.feeWM.score}</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Fee Based Income (Non WM)</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">17-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.feeNonWM.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.feeNonWM.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">{kpiPerformance.feeNonWM.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.feeNonWM.score}</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">CoB2 Management</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">%</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">30-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.cobManagement.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.cobManagement.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">{kpiPerformance.cobManagement.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.cobManagement.score}</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Strategic Campaign*</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">%</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">30-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.strategicCampaign.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.strategicCampaign.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">{kpiPerformance.strategicCampaign.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.strategicCampaign.score}</td>
                  </tr>

                  {/* Learning & Leadership Section */}
                  <tr className="bg-[#4a5f7f] text-white">
                    <td colSpan={9} className="border border-gray-400 px-2 py-1.5">Learning & Leadership</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Sales Productivity</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">%</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">30-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.salesProductivity.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.salesProductivity.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">{kpiPerformance.salesProductivity.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.salesProductivity.score}</td>
                  </tr>

                  {/* Total Score (3) */}
                  <tr className="bg-blue-100">
                    <td colSpan={8} className="border border-gray-400 px-2 py-2 text-right">Total Score (3)</td>
                    <td className="border border-gray-400 px-2 py-2 text-right">{kpiPerformance.totalScore3}</td>
                  </tr>

                  {/* Additional Point Section */}
                  <tr className="bg-[#4a5f7f] text-white">
                    <td colSpan={9} className="border border-gray-400 px-2 py-1.5">Additional Point</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">NPL Reduction</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">30-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.nplReduction.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.nplReduction.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">{kpiPerformance.nplReduction.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.nplReduction.score}</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Cross Selling Point</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Point</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.crossSelling.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.crossSelling.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">{kpiPerformance.crossSelling.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.crossSelling.score}</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Special Booster*</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Point</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.specialBooster.actual}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.specialBooster.target}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.specialBooster.achievement}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{kpiPerformance.specialBooster.score}</td>
                  </tr>

                  {/* Total Score (3.2) */}
                  <tr className="bg-blue-100">
                    <td colSpan={8} className="border border-gray-400 px-2 py-2 text-right">Total Score (3.2)</td>
                    <td className="border border-gray-400 px-2 py-2 text-right">{kpiPerformance.totalScore32}</td>
                  </tr>

                  {/* Compliance & Fraud Section */}
                  <tr className="bg-[#4a5f7f] text-white">
                    <td colSpan={9} className="border border-gray-400 px-2 py-1.5">Compliance & Fraud</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Zero Fraud</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Per</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Per</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Per</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">0.00%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Compliance Index</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Per</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Per</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Per</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">0.00%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                  </tr>

                  {/* Total Score (3.3) */}
                  <tr className="bg-blue-100">
                    <td colSpan={8} className="border border-gray-400 px-2 py-2 text-right">Total Score (3.3)</td>
                    <td className="border border-gray-400 px-2 py-2 text-right">{kpiPerformance.totalScore33}</td>
                  </tr>

                  {/* Final Total Score */}
                  <tr className="bg-blue-200">
                    <td colSpan={8} className="border border-gray-400 px-2 py-2 text-right">Total Score (3.1) + (3.2) + (-) (3.3)</td>
                    <td className="border border-gray-400 px-2 py-2 text-right">{kpiPerformance.finalTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}