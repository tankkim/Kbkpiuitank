import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AchievementTable } from './AchievementTable';
import { SalesProductivityTable } from './SalesProductivityTable';
import { SummaryRatingKPI } from './SummaryRatingKPI';
import { achievementData, salesProductivityData } from '../data/achievementData';

export function Achievement() {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-20'));

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[1800px] mx-auto">
        {/* Unified Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900">Achievement Overview</h1>
              <p className="text-sm text-gray-600 mt-1">Branch Performance & Rankings</p>
            </div>
            
            <div className="flex items-center gap-4">
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

        <div className="p-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          {/* Left Side - Summary Rating KPI */}
          <div className="lg:sticky lg:top-6 h-fit">
            <SummaryRatingKPI selectedDate={selectedDate} />
          </div>

          {/* Right Side - Tables */}
          <div className="space-y-6">
            {/* Achievement Information Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-3">
                <h2>ACHIEVEMENT INFORMATION</h2>
              </div>
              <div className="overflow-auto max-h-[600px]">
                <AchievementTable data={achievementData} />
              </div>
            </div>

            {/* Sales Productivity Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-4 py-3">
                <h2>SALES PRODUCTIVITY</h2>
              </div>
              <div className="overflow-auto max-h-[600px]">
                <SalesProductivityTable data={salesProductivityData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}