import { useState } from 'react';
import React from 'react';
import { Bell, Download, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, addMonths, differenceInMonths } from 'date-fns';

interface ReportsProps {
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

// KPI 상품 목록
const kpiProducts = [
  { id: 'newCASA', name: 'New to CASA' },
  { id: 'numberPriorityCust', name: 'Number Priority Cust.' },
  { id: 'newCooperation', name: 'New Cooperation' },
  { id: 'nim', name: 'NIM' },
  { id: 'normalLoan', name: 'Normal Loan' },
  { id: 'timeDeposit', name: 'Time Deposit' },
  { id: 'casaIncrease', name: 'CASA Increase' },
  { id: 'fbiWM', name: 'FBI-WM' },
  { id: 'fbiNonWM', name: 'FBI-Non WM' },
  { id: 'ppop', name: 'PPOP' },
  { id: 'coll2Management', name: 'Coll2 Management' },
  { id: 'strategicCampaign', name: 'Strategic Campaign' },
  { id: 'salesProductivity', name: 'Sales Productivity' },
  { id: 'nplReduction', name: 'NPL Reduction' },
  { id: 'crossSelling', name: 'Cross Selling' },
  { id: 'specialBooster', name: 'Special Booster' },
  { id: 'zeroFraud', name: 'Zero Fraud' },
  { id: 'complianceIndex', name: 'Compliance Index' },
  { id: 'rekapCrossSelling', name: 'Rekap Cross Selling' },
];

// 계층 구조 데이터 생성
const generateHierarchicalData = () => {
  const generateRandomData = () => ({
    actual: Math.floor(Math.random() * 500) + 100,
    target: Math.floor(Math.random() * 600) + 200,
    percentage: Math.floor(Math.random() * 150) + 50,
    monthlyTargets: {
      'Jan-25': Math.floor(Math.random() * 1000) + 500,
      'Feb-25': Math.floor(Math.random() * 1000) + 500,
      'Mar-25': Math.floor(Math.random() * 1000) + 500,
      'Apr-25': Math.floor(Math.random() * 1000) + 500,
      'May-25': Math.floor(Math.random() * 1000) + 500,
      'Jun-25': Math.floor(Math.random() * 1000) + 500,
      'Jul-25': Math.floor(Math.random() * 1000) + 500,
      'Aug-25': Math.floor(Math.random() * 1000) + 500,
      'Sep-25': Math.floor(Math.random() * 1000) + 500,
      'Oct-25': Math.floor(Math.random() * 1000) + 500,
      'Nov-25': Math.floor(Math.random() * 1000) + 500,
      'Dec-25': Math.floor(Math.random() * 1000) + 500,
    },
    dailyPerformance: {} as Record<string, number | null>
  });

  return [
    // Total Branch
    { no: 1, type: 'total', region: 'TOTAL BRANCH', code: '', branch: '', branchType: '', ...generateRandomData() },
    { no: 2, type: 'regional', region: 'REGIONAL I', code: '', branch: '', branchType: '', ...generateRandomData() },
    { no: 3, type: 'regional', region: 'REGIONAL II', code: '', branch: '', branchType: '', ...generateRandomData() },
    { no: 4, type: 'regional', region: 'REGIONAL III', code: '', branch: '', branchType: '', ...generateRandomData() },
    { no: 5, type: 'regional', region: 'REGIONAL IV', code: '', branch: '', branchType: '', ...generateRandomData() },
    { no: 6, type: 'regional', region: 'REGIONAL V', code: '', branch: '', branchType: '', ...generateRandomData() },
    
    // Group Separator
    { no: '', type: 'separator', region: 'BRANCH DETAILS', code: '', branch: '', branchType: '', ...generateRandomData() },
    
    // Regional I Branches
    { no: 7, type: 'branch', region: 'REGIONAL I', code: '42', branch: 'JAKARTA SUNTER', branchType: 'BIG', ...generateRandomData() },
    { no: 8, type: 'branch', region: 'REGIONAL I', code: '43', branch: 'JAKARTA S. DHARMA', branchType: 'BIG', ...generateRandomData() },
    { no: 9, type: 'branch', region: 'REGIONAL I', code: '44', branch: 'JAKARTA SENTRA PREMIER', branchType: 'BIG', ...generateRandomData() },
    { no: 10, type: 'branch', region: 'REGIONAL I', code: '62', branch: 'JAKARTA SENTRA NIAGA KALINI', branchType: 'BIG', ...generateRandomData() },
    { no: 11, type: 'branch', region: 'REGIONAL I', code: '48', branch: 'JAKARTA KELAPA GADING', branchType: 'BIG', ...generateRandomData() },
    { no: 12, type: 'branch', region: 'REGIONAL I', code: '49', branch: 'JAKARTA KREKOT BUNDER', branchType: 'BIG', ...generateRandomData() },
    { no: 13, type: 'branch', region: 'REGIONAL I', code: '50', branch: 'JAKARTA PONDOK INDAH', branchType: 'BIG', ...generateRandomData() },
    { no: 14, type: 'branch', region: 'REGIONAL I', code: '52', branch: 'JAKARTA KEBON JERUK', branchType: 'MEDIUM', ...generateRandomData() },
    
    // Regional II Branches
    { no: 15, type: 'branch', region: 'REGIONAL II', code: '54', branch: 'JAKARTA CIKINI', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 16, type: 'branch', region: 'REGIONAL II', code: '57', branch: 'CIKARANG', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 17, type: 'branch', region: 'REGIONAL II', code: '47', branch: 'BEKASI', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 18, type: 'branch', region: 'REGIONAL II', code: '53', branch: 'JAKARTA BINTARO', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 19, type: 'branch', region: 'REGIONAL II', code: '58', branch: 'JAKARTA PASAR MINGGU', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 20, type: 'branch', region: 'REGIONAL II', code: '59', branch: 'JAKARTA TEBET', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 21, type: 'branch', region: 'REGIONAL II', code: '60', branch: 'BOGOR PAJAJARAN', branchType: 'BIG', ...generateRandomData() },
    { no: 22, type: 'branch', region: 'REGIONAL II', code: '61', branch: 'DEPOK MARGONDA', branchType: 'MEDIUM', ...generateRandomData() },
    
    // Regional III Branches
    { no: 23, type: 'branch', region: 'REGIONAL III', code: '56', branch: 'JAKARTA GREEN GARDEN', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 24, type: 'branch', region: 'REGIONAL III', code: '63', branch: 'BANDUNG PASTEUR', branchType: 'BIG', ...generateRandomData() },
    { no: 25, type: 'branch', region: 'REGIONAL III', code: '64', branch: 'BANDUNG CIHAMPELAS', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 26, type: 'branch', region: 'REGIONAL III', code: '65', branch: 'BANDUNG DAGO', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 27, type: 'branch', region: 'REGIONAL III', code: '66', branch: 'CIMAHI', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 28, type: 'branch', region: 'REGIONAL III', code: '67', branch: 'TASIKMALAYA', branchType: 'MEDIUM', ...generateRandomData() },
    
    // Regional IV Branches
    { no: 29, type: 'branch', region: 'REGIONAL IV', code: '68', branch: 'SEMARANG PEMUDA', branchType: 'BIG', ...generateRandomData() },
    { no: 30, type: 'branch', region: 'REGIONAL IV', code: '69', branch: 'SEMARANG SIMPANG LIMA', branchType: 'BIG', ...generateRandomData() },
    { no: 31, type: 'branch', region: 'REGIONAL IV', code: '70', branch: 'SOLO SLAMET RIYADI', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 32, type: 'branch', region: 'REGIONAL IV', code: '71', branch: 'YOGYAKARTA MALIOBORO', branchType: 'BIG', ...generateRandomData() },
    { no: 33, type: 'branch', region: 'REGIONAL IV', code: '72', branch: 'PURWOKERTO', branchType: 'MEDIUM', ...generateRandomData() },
    { no: 34, type: 'branch', region: 'REGIONAL IV', code: '73', branch: 'TEGAL', branchType: 'MEDIUM', ...generateRandomData() },
  ].map(row => {
    // 일별 Performance 데이터 생성 (Jan-25 ~ Dec-25)
    const dailyPerformance: Record<string, number | null> = {};
    const months = ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25', 'Oct-25', 'Nov-25', 'Dec-25'];
    
    months.forEach(monthStr => {
      const [monthName, year] = monthStr.split('-');
      const monthMap: Record<string, number> = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      const monthIndex = monthMap[monthName];
      const yearNum = parseInt('20' + year);
      
      const start = startOfMonth(new Date(yearNum, monthIndex, 1));
      const end = endOfMonth(new Date(yearNum, monthIndex, 1));
      const days = eachDayOfInterval({ start, end });
      
      days.forEach(day => {
        const dateKey = format(day, 'dd-MMM-yy');
        dailyPerformance[dateKey] = Math.random() > 0.2 ? Math.floor(Math.random() * 50) + 1 : null;
      });
    });
    
    return { ...row, dailyPerformance };
  });
};

export function Reports({ unreadNotificationsCount = 0, onNotificationClick }: ReportsProps) {
  const [selectedKPI, setSelectedKPI] = useState(kpiProducts[0].id);
  const [periodStart, setPeriodStart] = useState<Date>(new Date(2025, 0, 1)); // Jan-25
  const [periodEnd, setPeriodEnd] = useState<Date>(new Date(2025, 2, 31)); // Mar-25
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [rawData] = useState(() => generateHierarchicalData());

  const regions = ['ALL', 'REGIONAL I', 'REGIONAL II', 'REGIONAL III', 'REGIONAL IV', 'REGIONAL V'];
  const branches = ['ALL', 'JAKARTA SUNTER', 'JAKARTA S. DHARMA', 'CIKARANG', 'BEKASI'];

  const selectedKPIName = kpiProducts.find(k => k.id === selectedKPI)?.name || '';

  // 월별 Target 컬럼 (전체 12개월)
  const allMonthColumns = ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25', 'Oct-25', 'Nov-25', 'Dec-25'];

  // Period에 따른 일별 Performance 컬럼 (선택된 기간만)
  const getMonthsInPeriod = () => {
    const months: string[] = [];
    let current = new Date(periodStart);
    const end = new Date(periodEnd);
    
    while (current <= end) {
      const monthName = format(current, 'MMM-yy');
      months.push(monthName);
      current = addMonths(current, 1);
    }
    
    return months;
  };

  const selectedMonths = getMonthsInPeriod();

  // 일별 Performance 컬럼 생성
  const dailyColumns: { month: string; dates: string[] }[] = [];
  selectedMonths.forEach(monthStr => {
    const [monthName, year] = monthStr.split('-');
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const monthIndex = monthMap[monthName];
    const yearNum = parseInt('20' + year);
    
    const start = startOfMonth(new Date(yearNum, monthIndex, 1));
    const end = endOfMonth(new Date(yearNum, monthIndex, 1));
    const days = eachDayOfInterval({ start, end });
    
    dailyColumns.push({
      month: monthStr,
      dates: days.map(d => format(d, 'dd-MMM-yy'))
    });
  });

  const handleExport = () => {
    alert('Exporting to Excel...');
  };

  // 달성률에 따른 색상
  const getAchievementColor = (percentage: number | null) => {
    if (percentage === null) return 'bg-gray-200 text-gray-700';
    if (percentage >= 100) return 'bg-green-500 text-white font-semibold';
    if (percentage >= 80) return 'bg-yellow-400 text-gray-900 font-semibold';
    return 'bg-red-500 text-white font-semibold';
  };

  // 행 스타일
  const getRowStyle = (type: string) => {
    if (type === 'total') return 'bg-gray-100 font-semibold';
    if (type === 'regional') return 'bg-white font-semibold';
    return 'bg-white';
  };

  // 월별 색상 (Actual 섹션용)
  const getMonthColor = (monthIndex: number) => {
    const colors = [
      { header: 'bg-[#ffecd1]', data: 'bg-[#fff4e6]' }, // Jan - 주황
      { header: 'bg-[#d5f4e6]', data: 'bg-[#ecfaf3]' }, // Feb - 녹색
      { header: 'bg-[#e3d5f4]', data: 'bg-[#f2ecfa]' }, // Mar - 보라
      { header: 'bg-[#ffd5e5]', data: 'bg-[#ffecf3]' }, // Apr - 핑크
      { header: 'bg-[#d5e8f4]', data: 'bg-[#ecf4fa]' }, // May - 하늘색
      { header: 'bg-[#f4e8d5]', data: 'bg-[#faf4ec]' }, // Jun - 베이지
    ];
    return colors[monthIndex % colors.length];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Title Header */}
      <div className="bg-[#4a5f7f] text-white px-2 py-1 flex items-center justify-between">
        <h1 className="text-[10px]">Raw Data Report</h1>
        <button 
          onClick={onNotificationClick}
          className="relative p-1 hover:bg-white/10 rounded transition-colors"
        >
          <Bell className="w-3 h-3" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          )}
        </button>
      </div>

      {/* Filters Row */}
      <div className="bg-white border-b border-gray-300 px-3 py-2">
        <div className="flex items-center gap-3 text-[10px]">
          {/* Product Type Selection */}
          <div className="flex items-center gap-1.5">
            <label className="text-gray-700 whitespace-nowrap min-w-[70px]">Product Type</label>
            <div className="relative">
              <select
                value={selectedKPI}
                onChange={(e) => setSelectedKPI(e.target.value)}
                className="px-2 py-1 text-[10px] border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 pr-5 min-w-[180px]"
              >
                {kpiProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Period KPI */}
          <div className="flex items-center gap-1.5">
            <label className="text-gray-700 whitespace-nowrap min-w-[40px]">Period</label>
            <DatePicker
              selected={periodStart}
              onChange={(date: Date | null) => {
                if (date) {
                  setPeriodStart(date);
                  // 최대 3개월 체크
                  const maxEnd = addMonths(date, 2);
                  if (periodEnd > maxEnd) {
                    setPeriodEnd(maxEnd);
                  }
                }
              }}
              dateFormat="MMM-yy"
              showMonthYearPicker
              className="px-2 py-1 text-[10px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-20"
              popperClassName="z-[100]"
              popperPlacement="bottom-start"
            />
            <span className="text-gray-500">to</span>
            <DatePicker
              selected={periodEnd}
              onChange={(date: Date | null) => {
                if (date) {
                  const monthsDiff = differenceInMonths(date, periodStart);
                  // 최대 3개월 (0, 1, 2 = 3개월)
                  if (monthsDiff <= 2 && monthsDiff >= 0) {
                    setPeriodEnd(date);
                  } else if (monthsDiff > 2) {
                    alert('Maximum period is 3 months');
                  }
                }
              }}
              dateFormat="MMM-yy"
              showMonthYearPicker
              minDate={periodStart}
              maxDate={addMonths(periodStart, 2)}
              className="px-2 py-1 text-[10px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-20"
              popperClassName="z-[100]"
              popperPlacement="bottom-start"
            />
          </div>

          {/* REGION */}
          <div className="flex items-center gap-1.5">
            <label className="text-gray-700 whitespace-nowrap min-w-[45px]">REGION</label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-2 py-1 text-[10px] border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 pr-5 min-w-[110px]"
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* BRANCH */}
          <div className="flex items-center gap-1.5">
            <label className="text-gray-700 whitespace-nowrap min-w-[45px]">BRANCH</label>
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-2 py-1 text-[10px] border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 pr-5 min-w-[130px]"
              >
                {branches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Download Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex">
        {/* 좌측 고정 테이블 (NO ~ ACT%) */}
        <div className="flex-shrink-0">
          <table className="text-[8px] border-collapse">
            <thead className="sticky top-0 z-30">
              {/* Top Section Header */}
              <tr>
                <th colSpan={8} className="bg-white border border-gray-400 px-1 py-1"></th>
              </tr>

              {/* Column Headers */}
              <tr>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-center w-[25px]">NO</th>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-left w-[80px]">REGION</th>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-center w-[40px]">
                  BRANCH<br />CODE
                </th>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-left w-[100px]">BRANCH</th>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-center w-[50px]">
                  BRANCH<br />TYPE
                </th>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-center w-[40px]">ACTUAL</th>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-center w-[40px]">TARGET</th>
                <th className="bg-[#e8e8e8] px-1 py-1 border border-gray-400 text-gray-800 text-center w-[40px]">
                  ACT.<br />(%)</th>
              </tr>
            </thead>
            <tbody>
              {rawData.map((row, rowIdx) => {
                if (row.type === 'separator') {
                  return (
                    <tr key={rowIdx}>
                      <td colSpan={8} className="px-2 py-0.5 bg-gray-300 text-gray-800 font-semibold text-left border-t border-b border-gray-400 text-[9px]">
                        {row.region}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={rowIdx} className={`${getRowStyle(row.type)} hover:bg-blue-50 transition-colors`}>
                    <td className="bg-[#f8f8f8] px-1 py-1 border border-gray-300 text-center text-gray-800">
                      {row.no}
                    </td>
                    <td className="bg-[#f8f8f8] px-1 py-1 border border-gray-300 text-gray-800">
                      {row.region}
                    </td>
                    <td className="bg-[#f8f8f8] px-1 py-1 border border-gray-300 text-center text-gray-800">
                      {row.code}
                    </td>
                    <td className="bg-[#f8f8f8] px-1 py-1 border border-gray-300 text-gray-800">
                      {row.branch}
                    </td>
                    <td className="bg-[#f8f8f8] px-1 py-1 border border-gray-300 text-center text-gray-800">
                      {row.branchType}
                    </td>
                    <td className="bg-[#f8f8f8] px-1 py-1 border border-gray-300 text-center text-gray-800">
                      {row.actual}
                    </td>
                    <td className="bg-[#f8f8f8] px-1 py-1 border border-gray-300 text-center text-gray-800">
                      {row.target}
                    </td>
                    <td className={`px-1 py-1 border border-gray-300 text-center ${getAchievementColor(row.percentage)}`}>
                      {`${row.percentage}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 우측 스크롤 테이블 (Target + Actual) */}
        <div className="flex-1 overflow-auto">
          <table className="text-[8px] border-collapse">
            <thead className="sticky top-0 z-30">
              {/* Top Section Headers */}
              <tr>
                <th colSpan={allMonthColumns.length} className="bg-[#4a90e2] text-white text-center px-1 py-1 border border-gray-400 text-[9px]">
                  TARGET {selectedKPIName.toUpperCase()}
                </th>
                {dailyColumns.map((monthData, idx) => {
                  const monthColor = getMonthColor(idx);
                  return (
                    <th key={`actual-month-${idx}`} colSpan={monthData.dates.length} className={`text-gray-800 text-center px-1 py-1 border border-gray-400 text-[9px] ${monthColor.header}`}>
                      {monthData.month}
                    </th>
                  );
                })}
              </tr>

              {/* Column Headers */}
              <tr>
                {/* Monthly Targets */}
                {allMonthColumns.map((month, idx) => (
                  <th key={`target-col-${idx}`} className="px-1 py-1 border border-gray-400 text-gray-800 text-center min-w-[50px] bg-[#d4e6f1]">
                    {month}
                  </th>
                ))}

                {/* Daily Performance dates */}
                {dailyColumns.map((monthData, mIdx) => {
                  const monthColor = getMonthColor(mIdx);
                  return monthData.dates.map((date, dIdx) => (
                    <th key={`daily-col-${mIdx}-${dIdx}`} className={`px-0.5 py-1 border border-gray-400 text-gray-800 text-center min-w-[24px] ${monthColor.header}`}>
                      {format(new Date(date), 'd')}
                    </th>
                  ));
                })}
              </tr>
            </thead>
            <tbody>
              {rawData.map((row, rowIdx) => {
                if (row.type === 'separator') {
                  return (
                    <tr key={rowIdx}>
                      <td colSpan={allMonthColumns.length + dailyColumns.reduce((sum, m) => sum + m.dates.length, 0)} className="px-2 py-0.5 bg-gray-300 text-gray-800 font-semibold text-left border-t border-b border-gray-400 text-[9px]">
                        &nbsp;
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={rowIdx} className={`${getRowStyle(row.type)} hover:bg-blue-50 transition-colors`}>
                    {/* Monthly Targets */}
                    {allMonthColumns.map((month, idx) => (
                      <td key={`target-${idx}`} className="px-1 py-1 border border-gray-300 text-center text-gray-800 bg-[#eaf2f8]">
                        {row.monthlyTargets[month] || ''}
                      </td>
                    ))}

                    {/* Daily Performance */}
                    {dailyColumns.map((monthData, mIdx) => {
                      const monthColor = getMonthColor(mIdx);
                      return monthData.dates.map((date, dIdx) => {
                        const value = row.dailyPerformance?.[date];
                        return (
                          <td key={`daily-${mIdx}-${dIdx}`} className={`px-0.5 py-1 border border-gray-300 text-center text-gray-800 ${monthColor.data}`}>
                            {value !== null && value !== undefined ? value : ''}
                          </td>
                        );
                      });
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
