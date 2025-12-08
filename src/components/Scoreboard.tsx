import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { kpiData } from '../data/kpiData';
import { PageHeader } from './PageHeader';

interface ScoreboardProps {
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

export function Scoreboard({ unreadNotificationsCount = 0, onNotificationClick }: ScoreboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('Jun-25');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-20'));

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
                  {/* Row 1: 2 fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap w-32">TOTAL BRANCH:</label>
                      <input type="text" value="TOTAL BRANCH" readOnly className="flex-1 px-3 py-1 border border-gray-300 rounded bg-white text-gray-900" />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap w-32">BRANCH MANAGER:</label>
                      <input type="text" value="" readOnly className="flex-1 px-3 py-1 border border-gray-300 rounded bg-white text-gray-900" />
                    </div>
                  </div>
                  
                  {/* Row 2: 3 fields */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap">TOTAL REGIONAL:</label>
                      <input type="text" value="7" readOnly className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-900 w-16 text-center" />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap">TOTAL BRANCH:</label>
                      <input type="text" value="46" readOnly className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-900 w-16 text-center" />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 whitespace-nowrap">TOTAL SUB-BRANCHES:</label>
                      <input type="text" value="172" readOnly className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-900 w-16 text-center" />
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
                    <span className="text-xl text-blue-600">A+</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600">Score KPI</span>
                    <span className="text-lg text-gray-900">13.51</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600">Rank Position</span>
                    <span className="text-gray-900">5</span>
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
                    <td className="border border-gray-300 px-2 py-2 text-right">14,196 CBP</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">22,932 CBP</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">61.91%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">25.79</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Number of Priority Customer</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Number</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">6,596 CBP</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">7,319 CBP</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">90.13%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">45.06</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">New Cooperation (Payroll/Others)</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Number</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">45 point</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">1,602 point</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-red-100">2.81%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">1.40</td>
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
                    <td className="border border-gray-300 px-2 py-2 text-right">3.33 %</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">2.56 %</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">130.05%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">70.02</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Normal Loan</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">300</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">300</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">38,556.524 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">14,699.178 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">177.32%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">300.00</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Time Deposit</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">20-Jun-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">14,948.602 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">16,303.915 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">91.65%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">102.56</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">CASA Increase</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">20-Jun-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">225</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">5,315.033 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">11,085.941 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-red-100">47.94%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">71.90</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Fee Based Income (WM)</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">17-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">112.5</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">7,457 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">10,500 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">71.02%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">53.27</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Fee Based Income (Non WM)</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Bil Rp</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">17-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">72,847 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">76,108 Mn</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">95.72%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">48.36</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">CoB2 Management</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">%</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">30-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">100.00%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">50.00</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Strategic Campaign*</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">%</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">30-Apr-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">102.87%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">51.86</td>
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
                    <td className="border border-gray-300 px-2 py-2 text-right">43.42 %</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">75.00 %</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-yellow-100">57.89%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">28.95</td>
                  </tr>

                  {/* Total Score (3) */}
                  <tr className="bg-blue-100">
                    <td colSpan={8} className="border border-gray-400 px-2 py-2 text-right">Total Score (3)</td>
                    <td className="border border-gray-400 px-2 py-2 text-right">1,001.17</td>
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
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">108.10%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">54.05</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-2">Cross Selling Point</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Point</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">30,520 point</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">23,940 point</td>
                    <td className="border border-gray-300 px-2 py-2 text-right bg-green-100">127.50%</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">127.50</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">Special Booster*</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">Point</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">31-May-25</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">0.00</td>
                  </tr>

                  {/* Total Score (3.2) */}
                  <tr className="bg-blue-100">
                    <td colSpan={8} className="border border-gray-400 px-2 py-2 text-right">Total Score (3.2)</td>
                    <td className="border border-gray-400 px-2 py-2 text-right">181.55</td>
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
                    <td className="border border-gray-400 px-2 py-2 text-right">-</td>
                  </tr>

                  {/* Final Total Score */}
                  <tr className="bg-blue-200">
                    <td colSpan={8} className="border border-gray-400 px-2 py-2 text-right">Total Score (3.1) + (3.2) + (-) (3.3)</td>
                    <td className="border border-gray-400 px-2 py-2 text-right">13.51</td>
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