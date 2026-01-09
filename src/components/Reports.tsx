import { useState, useRef, useEffect } from 'react';
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
  const generateRandomData = () => {
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

    return {
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
      dailyPerformance
    };
  };

  const data1 = generateRandomData();
  const data2 = generateRandomData();
  const data3 = generateRandomData();
  const data4 = generateRandomData();
  const data5 = generateRandomData();
  const data6 = generateRandomData();
  const data7 = generateRandomData();
  const data8 = generateRandomData();
  const data9 = generateRandomData();
  const data10 = generateRandomData();
  const data11 = generateRandomData();
  const data12 = generateRandomData();
  const data13 = generateRandomData();
  const data14 = generateRandomData();
  const data15 = generateRandomData();
  const data16 = generateRandomData();
  const data17 = generateRandomData();
  const data18 = generateRandomData();
  const data19 = generateRandomData();
  const data20 = generateRandomData();
  const data21 = generateRandomData();
  const data22 = generateRandomData();
  const data23 = generateRandomData();
  const data24 = generateRandomData();
  const data25 = generateRandomData();
  const data26 = generateRandomData();
  const data27 = generateRandomData();
  const data28 = generateRandomData();
  const data29 = generateRandomData();
  const data30 = generateRandomData();
  const data31 = generateRandomData();
  const data32 = generateRandomData();
  const data33 = generateRandomData();

  return [
    // Total Branch
    { no: 1, type: 'total', region: 'TOTAL BRANCH', code: '', branch: '', branchType: '', ...data1 },
    { no: 2, type: 'regional', region: 'REGIONAL I', code: '', branch: '', branchType: '', ...data2 },
    { no: 3, type: 'regional', region: 'REGIONAL II', code: '', branch: '', branchType: '', ...data3 },
    { no: 4, type: 'regional', region: 'REGIONAL III', code: '', branch: '', branchType: '', ...data4 },
    { no: 5, type: 'regional', region: 'REGIONAL IV', code: '', branch: '', branchType: '', ...data5 },
    
    // Group Separator
    { no: '', type: 'separator', region: 'BRANCH DETAILS', code: '', branch: '', branchType: '', actual: 0, target: 0, percentage: 0, monthlyTargets: {}, dailyPerformance: {} },
    
    // Regional I Branches
    { no: 6, type: 'branch', region: 'REGIONAL I', code: '42', branch: 'JAKARTA SUNTER', branchType: 'BIG', ...data6 },
    { no: 7, type: 'branch', region: 'REGIONAL I', code: '43', branch: 'JAKARTA S. DHARMA', branchType: 'BIG', ...data7 },
    { no: 8, type: 'branch', region: 'REGIONAL I', code: '44', branch: 'JAKARTA SENTRA PREMIER', branchType: 'BIG', ...data8 },
    { no: 9, type: 'branch', region: 'REGIONAL I', code: '62', branch: 'JAKARTA SENTRA NIAGA KALINI', branchType: 'BIG', ...data9 },
    { no: 10, type: 'branch', region: 'REGIONAL I', code: '48', branch: 'JAKARTA KELAPA GADING', branchType: 'BIG', ...data10 },
    { no: 11, type: 'branch', region: 'REGIONAL I', code: '49', branch: 'JAKARTA KREKOT BUNDER', branchType: 'BIG', ...data11 },
    { no: 12, type: 'branch', region: 'REGIONAL I', code: '50', branch: 'JAKARTA PONDOK INDAH', branchType: 'BIG', ...data12 },
    { no: 13, type: 'branch', region: 'REGIONAL I', code: '52', branch: 'JAKARTA KEBON JERUK', branchType: 'MEDIUM', ...data13 },
    
    // Regional II Branches
    { no: 14, type: 'branch', region: 'REGIONAL II', code: '54', branch: 'JAKARTA CIKINI', branchType: 'MEDIUM', ...data14 },
    { no: 15, type: 'branch', region: 'REGIONAL II', code: '57', branch: 'CIKARANG', branchType: 'MEDIUM', ...data15 },
    { no: 16, type: 'branch', region: 'REGIONAL II', code: '47', branch: 'BEKASI', branchType: 'MEDIUM', ...data16 },
    { no: 17, type: 'branch', region: 'REGIONAL II', code: '53', branch: 'JAKARTA BINTARO', branchType: 'MEDIUM', ...data17 },
    { no: 18, type: 'branch', region: 'REGIONAL II', code: '58', branch: 'JAKARTA PASAR MINGGU', branchType: 'MEDIUM', ...data18 },
    { no: 19, type: 'branch', region: 'REGIONAL II', code: '59', branch: 'JAKARTA TEBET', branchType: 'MEDIUM', ...data19 },
    { no: 20, type: 'branch', region: 'REGIONAL II', code: '60', branch: 'BOGOR PAJAJARAN', branchType: 'BIG', ...data20 },
    { no: 21, type: 'branch', region: 'REGIONAL II', code: '61', branch: 'DEPOK MARGONDA', branchType: 'MEDIUM', ...data21 },
    
    // Regional III Branches
    { no: 22, type: 'branch', region: 'REGIONAL III', code: '56', branch: 'JAKARTA GREEN GARDEN', branchType: 'MEDIUM', ...data22 },
    { no: 23, type: 'branch', region: 'REGIONAL III', code: '63', branch: 'BANDUNG PASTEUR', branchType: 'BIG', ...data23 },
    { no: 24, type: 'branch', region: 'REGIONAL III', code: '64', branch: 'BANDUNG CIHAMPELAS', branchType: 'MEDIUM', ...data24 },
    { no: 25, type: 'branch', region: 'REGIONAL III', code: '65', branch: 'BANDUNG DAGO', branchType: 'MEDIUM', ...data25 },
    { no: 26, type: 'branch', region: 'REGIONAL III', code: '66', branch: 'CIMAHI', branchType: 'MEDIUM', ...data26 },
    { no: 27, type: 'branch', region: 'REGIONAL III', code: '67', branch: 'TASIKMALAYA', branchType: 'MEDIUM', ...data27 },
    
    // Regional IV Branches
    { no: 28, type: 'branch', region: 'REGIONAL IV', code: '68', branch: 'SEMARANG PEMUDA', branchType: 'BIG', ...data28 },
    { no: 29, type: 'branch', region: 'REGIONAL IV', code: '69', branch: 'SEMARANG SIMPANG LIMA', branchType: 'BIG', ...data29 },
    { no: 30, type: 'branch', region: 'REGIONAL IV', code: '70', branch: 'SOLO SLAMET RIYADI', branchType: 'MEDIUM', ...data30 },
    { no: 31, type: 'branch', region: 'REGIONAL IV', code: '71', branch: 'YOGYAKARTA MALIOBORO', branchType: 'BIG', ...data31 },
    { no: 32, type: 'branch', region: 'REGIONAL IV', code: '72', branch: 'PURWOKERTO', branchType: 'MEDIUM', ...data32 },
    { no: 33, type: 'branch', region: 'REGIONAL IV', code: '73', branch: 'TEGAL', branchType: 'MEDIUM', ...data33 },
  ];
};

export function Reports({ unreadNotificationsCount = 0, onNotificationClick }: ReportsProps) {
  const [selectedKPI, setSelectedKPI] = useState(kpiProducts[0].id);
  const [periodStart, setPeriodStart] = useState<Date>(new Date(2025, 0, 1)); // Jan-25
  const [periodEnd, setPeriodEnd] = useState<Date>(new Date(2025, 2, 31)); // Mar-25
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [rawData] = useState(() => generateHierarchicalData());

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const regions = ['ALL', 'REGIONAL I', 'REGIONAL II', 'REGIONAL III', 'REGIONAL IV'];
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
  const getRowBg = (type: string) => {
    if (type === 'total') return 'bg-gray-100';
    if (type === 'regional') return 'bg-white';
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

  // 컬럼 너비 정의
  const colWidths = {
    no: 30,
    region: 80,
    branchCode: 40,
    branch: 100,
    branchType: 50,
    actual: 45,
    target: 45,
    actPct: 45,
    monthlyTarget: 50,
    daily: 24,
  };

  const ROW_HEIGHT = 24;
  const HEADER_ROW_1 = 26;
  const HEADER_ROW_2 = 32;
  const SEPARATOR_HEIGHT = 22;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Title Header */}
      <div className="bg-[#4a5f7f] text-white px-2 py-1 flex items-center justify-between flex-shrink-0">
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
      <div className="bg-white border-b border-gray-300 px-3 py-2 flex-shrink-0">
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

      {/* DIV-based Table Container */}
      <div ref={scrollContainerRef} className="flex-1 overflow-auto bg-white">
        <div className="inline-block min-w-full">
          {/* Sticky Header Container */}
          <div className="sticky top-0 z-20 bg-white">
            {/* Header Row 1 - Section Headers */}
            <div className="flex" style={{ height: `${HEADER_ROW_1}px` }}>
              {/* Left Fixed Columns - Empty Header */}
              <div 
                className="flex-shrink-0 sticky left-0 z-30 bg-white border-r-2 border-gray-400"
                style={{ 
                  width: `${colWidths.no + colWidths.region + colWidths.branchCode + colWidths.branch + colWidths.branchType + colWidths.actual + colWidths.target + colWidths.actPct}px`
                }}
              >
                <div className="h-full border-t border-l border-b border-gray-400"></div>
              </div>

              {/* Target Section Header */}
              <div 
                className="flex-shrink-0 bg-[#4a90e2] text-white text-center flex items-center justify-center border-t border-b border-r border-gray-400 text-[9px] font-semibold"
                style={{ width: `${allMonthColumns.length * colWidths.monthlyTarget}px` }}
              >
                TARGET {selectedKPIName.toUpperCase()}
              </div>

              {/* Actual Section - Monthly Headers */}
              {dailyColumns.map((monthData, idx) => {
                const monthColor = getMonthColor(idx);
                const isLast = idx === dailyColumns.length - 1;
                return (
                  <div 
                    key={`month-header-${idx}`}
                    className={`flex-shrink-0 text-gray-800 text-center flex items-center justify-center border-t border-b ${isLast ? 'border-r' : ''} border-gray-400 text-[9px] font-semibold ${monthColor.header}`}
                    style={{ width: `${monthData.dates.length * colWidths.daily}px` }}
                  >
                    {monthData.month}
                  </div>
                );
              })}
            </div>

            {/* Header Row 2 - Column Names */}
            <div className="flex" style={{ height: `${HEADER_ROW_2}px` }}>
              {/* Left Fixed Columns */}
              <div 
                className="flex-shrink-0 sticky left-0 z-30 bg-white border-r-2 border-gray-400 flex"
              >
                <div className="bg-[#e8e8e8] border-l border-b border-r border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] font-semibold" style={{ width: `${colWidths.no}px` }}>
                  NO
                </div>
                <div className="bg-[#e8e8e8] border-b border-r border-gray-400 text-gray-800 flex items-center px-1 text-[8px] font-semibold" style={{ width: `${colWidths.region}px` }}>
                  REGION
                </div>
                <div className="bg-[#e8e8e8] border-b border-r border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] leading-tight font-semibold" style={{ width: `${colWidths.branchCode}px` }}>
                  BRANCH<br />CODE
                </div>
                <div className="bg-[#e8e8e8] border-b border-r border-gray-400 text-gray-800 flex items-center px-1 text-[8px] font-semibold" style={{ width: `${colWidths.branch}px` }}>
                  BRANCH
                </div>
                <div className="bg-[#e8e8e8] border-b border-r border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] leading-tight font-semibold" style={{ width: `${colWidths.branchType}px` }}>
                  BRANCH<br />TYPE
                </div>
                <div className="bg-[#e8e8e8] border-b border-r border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] font-semibold" style={{ width: `${colWidths.actual}px` }}>
                  ACTUAL
                </div>
                <div className="bg-[#e8e8e8] border-b border-r border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] font-semibold" style={{ width: `${colWidths.target}px` }}>
                  TARGET
                </div>
                <div className="bg-[#e8e8e8] border-b border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] leading-tight font-semibold" style={{ width: `${colWidths.actPct}px` }}>
                  ACT.<br />(%)
                </div>
              </div>

              {/* Target Column Headers */}
              {allMonthColumns.map((month, idx) => (
                <div 
                  key={`target-header-${idx}`}
                  className="flex-shrink-0 bg-[#d4e6f1] border-b border-r border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] font-semibold"
                  style={{ width: `${colWidths.monthlyTarget}px` }}
                >
                  {month}
                </div>
              ))}

              {/* Daily Column Headers */}
              {dailyColumns.map((monthData, mIdx) => {
                const monthColor = getMonthColor(mIdx);
                return monthData.dates.map((date, dIdx) => {
                  return (
                    <div 
                      key={`daily-header-${mIdx}-${dIdx}`}
                      className={`flex-shrink-0 border-b border-r border-gray-400 text-gray-800 text-center flex items-center justify-center text-[8px] font-semibold ${monthColor.header}`}
                      style={{ width: `${colWidths.daily}px` }}
                    >
                      {format(new Date(date), 'd')}
                    </div>
                  );
                });
              })}
            </div>
          </div>

          {/* Data Rows */}
          {rawData.map((row, rowIdx) => {
            if (row.type === 'separator') {
              return (
                <div key={rowIdx} className="flex" style={{ height: `${SEPARATOR_HEIGHT}px` }}>
                  {/* 좌측 고정 영역 - BRANCH DETAILS */}
                  <div 
                    className="flex-shrink-0 sticky left-0 z-10 bg-gray-300 text-gray-800 font-semibold flex items-center px-2 border-t border-b border-gray-400 border-r-2 text-[9px]"
                    style={{ 
                      width: `${colWidths.no + colWidths.region + colWidths.branchCode + colWidths.branch + colWidths.branchType + colWidths.actual + colWidths.target + colWidths.actPct}px`
                    }}
                  >
                    {row.region}
                  </div>
                  {/* 우측 스크롤 영 - 빈 공간 */}
                  <div className="flex-1 bg-gray-300 border-t border-b border-gray-400"></div>
                </div>
              );
            }

            return (
              <div key={rowIdx} className={`flex ${getRowBg(row.type)}`} style={{ height: `${ROW_HEIGHT}px` }}>
                {/* Left Fixed Columns */}
                <div 
                  className={`flex-shrink-0 sticky left-0 z-10 border-r-2 border-gray-400 flex ${getRowBg(row.type)}`}
                >
                  <div className="bg-[#f8f8f8] border-l border-b border-r border-gray-300 text-center flex items-center justify-center text-[8px] text-gray-800" style={{ width: `${colWidths.no}px` }}>
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.no}</span>
                  </div>
                  <div className="bg-[#f8f8f8] border-b border-r border-gray-300 flex items-center px-1 text-[8px] text-gray-800" style={{ width: `${colWidths.region}px` }}>
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.region}</span>
                  </div>
                  <div className="bg-[#f8f8f8] border-b border-r border-gray-300 text-center flex items-center justify-center text-[8px] text-gray-800" style={{ width: `${colWidths.branchCode}px` }}>
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.code}</span>
                  </div>
                  <div className="bg-[#f8f8f8] border-b border-r border-gray-300 flex items-center px-1 text-[8px] text-gray-800" style={{ width: `${colWidths.branch}px` }}>
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.branch}</span>
                  </div>
                  <div className="bg-[#f8f8f8] border-b border-r border-gray-300 text-center flex items-center justify-center text-[8px] text-gray-800" style={{ width: `${colWidths.branchType}px` }}>
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.branchType}</span>
                  </div>
                  <div className="bg-[#f8f8f8] border-b border-r border-gray-300 text-center flex items-center justify-center text-[8px] text-gray-800" style={{ width: `${colWidths.actual}px` }}>
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.actual}</span>
                  </div>
                  <div className="bg-[#f8f8f8] border-b border-r border-gray-300 text-center flex items-center justify-center text-[8px] text-gray-800" style={{ width: `${colWidths.target}px` }}>
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.target}</span>
                  </div>
                  <div className={`border-b border-gray-300 text-center flex items-center justify-center text-[8px] ${getAchievementColor(row.percentage)}`} style={{ width: `${colWidths.actPct}px` }}>
                    {`${row.percentage}%`}
                  </div>
                </div>

                {/* Target Data Cells */}
                {allMonthColumns.map((month, idx) => (
                  <div 
                    key={`target-${rowIdx}-${idx}`}
                    className="flex-shrink-0 bg-[#eaf2f8] border-b border-r border-gray-300 text-center flex items-center justify-center text-[8px] text-gray-800"
                    style={{ width: `${colWidths.monthlyTarget}px` }}
                  >
                    <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>{row.monthlyTargets?.[month] || ''}</span>
                  </div>
                ))}

                {/* Daily Data Cells */}
                {dailyColumns.map((monthData, mIdx) => {
                  const monthColor = getMonthColor(mIdx);
                  return monthData.dates.map((date, dIdx) => {
                    const value = row.dailyPerformance?.[date];
                    return (
                      <div 
                        key={`daily-${rowIdx}-${mIdx}-${dIdx}`}
                        className={`flex-shrink-0 border-b border-r border-gray-300 text-center flex items-center justify-center text-[8px] text-gray-800 ${monthColor.data}`}
                        style={{ width: `${colWidths.daily}px` }}
                      >
                        <span className={row.type === 'total' || row.type === 'regional' ? 'font-semibold' : ''}>
                          {value !== null && value !== undefined ? value : ''}
                        </span>
                      </div>
                    );
                  });
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}