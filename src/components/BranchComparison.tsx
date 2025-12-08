import { useState } from 'react';

export function BranchComparison() {
  const [typeOfData, setTypeOfData] = useState('Month to Month');
  const [selectedRegional, setSelectedRegional] = useState('All');

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Unified Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900">Branch Comparison</h1>
            <p className="text-sm text-gray-600 mt-1">Branch-Level Performance Analysis</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Type of Data:</label>
              <select
                value={typeOfData}
                onChange={(e) => setTypeOfData(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option>Month to Month</option>
                <option>Week to Week</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Regional:</label>
              <select
                value={selectedRegional}
                onChange={(e) => setSelectedRegional(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option>All</option>
                <option>REGIONAL I</option>
                <option>REGIONAL II</option>
                <option>REGIONAL III</option>
                <option>REGIONAL IV</option>
                <option>REGIONAL V</option>
                <option>REGIONAL VI</option>
                <option>REGIONAL VII</option>
              </select>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <span className="text-lg">KB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            <table className="border-collapse text-xs min-w-max w-full">
              <thead className="sticky top-0 z-10">
                {/* Main Header */}
                <tr className="bg-[#4a5f7f] text-white">
                  <th className="border border-gray-400 px-2 py-2 min-w-[120px]">KPI Index</th>
                  <th className="border border-gray-400 px-2 py-2 min-w-[80px]">Unit</th>
                  <th className="border border-gray-400 px-2 py-2 min-w-[80px]">Weight (A)</th>
                  <th className="border border-gray-400 px-2 py-2 min-w-[80px]">Weight CAP</th>
                  <th colSpan={12} className="border border-gray-400 px-2 py-2 bg-blue-700">Performance</th>
                  <th colSpan={12} className="border border-gray-400 px-2 py-2 bg-green-700">Performance</th>
                </tr>
                
                {/* Branch Headers - Numbers 1-24 */}
                <tr className="bg-gray-600 text-white">
                  <th className="border border-gray-400 px-2 py-1"></th>
                  <th className="border border-gray-400 px-2 py-1"></th>
                  <th className="border border-gray-400 px-2 py-1"></th>
                  <th className="border border-gray-400 px-2 py-1"></th>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                    <th key={num} className="border border-gray-400 px-2 py-1 min-w-[50px]">{num}</th>
                  ))}
                  {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(num => (
                    <th key={num} className="border border-gray-400 px-2 py-1 min-w-[50px]">{num}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Customer Section */}
                <tr className="bg-gray-700 text-white">
                  <td colSpan={28} className="border border-gray-400 px-2 py-1">Customer</td>
                </tr>
                
                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">New to CASA/Digital Account</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Number</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Number of Priority Customer</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Number</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">New Cooperation (Payroll/Others)</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Number</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                {/* Financial Section */}
                <tr className="bg-gray-700 text-white">
                  <td colSpan={28} className="border border-gray-400 px-2 py-1">Financial</td>
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">NIM</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">%</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">113.5</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Normal Loan</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Bill Rp</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">200</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">300</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Time Deposit</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Bill Rp</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">150</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">CASA Increase</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Bill Rp</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">150</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">225</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Fee Based Income (WM)</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Bill Rp</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">113.5</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Fee Based Income (Non WM)</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Bill Rp</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">PPOP</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Bill Rp</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Strategic Campaign</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">%</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                {/* Learning & Leadership Section */}
                <tr className="bg-gray-700 text-white">
                  <td colSpan={28} className="border border-gray-400 px-2 py-1">Learning & Leadership</td>
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Sales Productivity</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">%</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                {/* Additional Point Section */}
                <tr className="bg-gray-700 text-white">
                  <td colSpan={28} className="border border-gray-400 px-2 py-1">Additional Point</td>
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">NPL Reduction</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Bill Rp</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">75</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Cross Selling Point</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Point</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">150</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                <tr className="group bg-white transition-colors">
                  <td className="border border-gray-300 px-2 py-1 group-hover:bg-blue-100">Special Booster</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">Point</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center group-hover:bg-blue-100">150</td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className={`border border-gray-300 px-2 py-1 text-center ${i < 12 ? 'bg-red-100' : ''} group-hover:bg-blue-100`}></td>
                  ))}
                </tr>

                {/* KPI Result Section */}
                <tr className="bg-gray-700 text-white">
                  <td colSpan={28} className="border border-gray-400 px-2 py-1">KPI RESULT**</td>
                </tr>

                <tr className="bg-blue-100">
                  <td className="border border-gray-300 px-2 py-1">Total Rating</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className="border border-gray-300 px-2 py-1 text-center"></td>
                  ))}
                </tr>

                <tr className="bg-blue-100">
                  <td className="border border-gray-300 px-2 py-1">Score Rating</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className="border border-gray-300 px-2 py-1 text-center"></td>
                  ))}
                </tr>

                <tr className="bg-blue-100">
                  <td className="border border-gray-300 px-2 py-1">Bankwide Rank</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  {Array(24).fill(null).map((_, i) => (
                    <td key={i} className="border border-gray-300 px-2 py-1 text-center"></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-xs text-gray-600">
          <p>1-24, : The indicator is not included in the 2025 KPI indicators</p>
          <p>The calculation data was not been updated, and previous version's data</p>
        </div>
      </div>
    </div>
  );
}