export function IndicatorKPI() {
  const kpiData = [
    { name: 'NTC(Digital Account)', current: '14,194 CIF', achievement: 51.98, target: '27,522 CIF' },
    { name: 'Priority', current: '0 CIF', achievement: 90.11, target: '7,319 CIF' },
    { name: 'New Cooperation', current: '1 point', achievement: 2.81, target: '1,602 point' },
    { name: 'NIM', current: '23 bp', achievement: 94.55, target: '2.46%' },
    { name: 'Normal Loan', current: '26,666,324 Mn', achievement: 177.32, target: '14,699,178 Mn' },
    { name: 'Time Deposit', current: '18,946,623 Mn', achievement: 102.54, target: '18,478,021 Mn' },
    { name: 'CASA Increase', current: '1,484,501 Mn', achievement: 652.29, target: '215,391 Mn' },
    { name: 'FBI WM', current: '2,469 Mn', achievement: 71.02, target: '10,120 Mn' },
    { name: 'FBI Non WM', current: '73,807 Mn', achievement: 96.98, target: '76,108 Mn' },
    { name: 'PPOB', current: '124,663 Mn', achievement: 123.49, target: '100,957 Mn' },
    { name: 'Digital', current: '0.00%', achievement: 109.49, target: '0.09%' },
    { name: 'Strategic Innovation', current: '24 point', achievement: 123.73, target: '20 point' },
    { name: 'Sales Productivity', current: '43.52%', achievement: 57.89, target: '75.90%' },
    { name: 'NPL Reduction', current: '1.38%', achievement: 108.10, target: '1.50%' },
    { name: 'Cross Selling', current: '30,576 point', achievement: 127.69, target: '23,940 point' },
    { name: 'Special Booster*', current: '27 point', achievement: 90.00, target: '30 point' },
  ];

  // Sort by achievement descending (highest to lowest)
  const sortedKpiData = [...kpiData].sort((a, b) => b.achievement - a.achievement);

  // Categorize indicators by achievement level
  const getCategory = (achievement: number) => {
    if (achievement >= 120) return '≥120%';
    if (achievement >= 100) return '≥100%';
    if (achievement >= 80) return '≥80%';
    if (achievement >= 60) return '≥60%';
    if (achievement >= 50) return '≥50%';
    return '<50%';
  };

  const categoryCounts = sortedKpiData.reduce((acc, item) => {
    const category = getCategory(item.achievement);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get bar color based on achievement with differentiated colors
  const getBarColor = (achievement: number) => {
    if (achievement >= 120) return '#2563eb'; // Blue-600 - Excellent (최고 등급)
    if (achievement >= 100) return '#10b981'; // Emerald-500 - Great (목표 달성)
    if (achievement >= 80) return '#f59e0b'; // Amber-500 - Good
    if (achievement >= 60) return '#f97316'; // Orange-500 - Warning
    if (achievement >= 50) return '#ef4444'; // Red-500 - Critical
    return '#dc2626'; // Red-600 - Danger
  };

  // Get legend color based on category
  const getLegendColor = (category: string) => {
    if (category === '≥120%') return 'text-blue-600';
    if (category === '≥60%') return 'text-orange-500';
    if (category === '≥100%') return 'text-emerald-500';
    if (category === '≥50%') return 'text-red-500';
    if (category === '≥80%') return 'text-amber-500';
    return 'text-red-600';
  };

  // Get achievement text color - darker shade for better visibility
  const getAchievementColor = (achievement: number) => {
    if (achievement >= 120) return 'text-blue-700';
    if (achievement >= 100) return 'text-emerald-600';
    if (achievement >= 80) return 'text-amber-600';
    if (achievement >= 60) return 'text-orange-600';
    if (achievement >= 50) return 'text-red-600';
    return 'text-red-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm mb-2 text-gray-900">Indicator KPI</h3>
      
      {/* Legend - 2 columns with differentiated colors */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mb-3" style={{ fontSize: '10px' }}>
        <div>
          <span className={`${getLegendColor('≥120%')} font-semibold`}>≥120%</span>
          <span className="text-gray-700"> {categoryCounts['≥120%'] || 0} Indicator</span>
        </div>
        <div>
          <span className={`${getLegendColor('≥60%')} font-semibold`}>≥60%</span>
          <span className="text-gray-700"> {categoryCounts['≥60%'] || 0} Indicator</span>
        </div>
        <div>
          <span className={`${getLegendColor('≥100%')} font-semibold`}>≥100%</span>
          <span className="text-gray-700"> {categoryCounts['≥100%'] || 0} Indicator</span>
        </div>
        <div>
          <span className={`${getLegendColor('≥50%')} font-semibold`}>≥50%</span>
          <span className="text-gray-700"> {categoryCounts['≥50%'] || 0} Indicator</span>
        </div>
        <div>
          <span className={`${getLegendColor('≥80%')} font-semibold`}>≥80%</span>
          <span className="text-gray-700"> {categoryCounts['≥80%'] || 0} Indicator</span>
        </div>
        <div>
          <span className={`${getLegendColor('<50%')} font-semibold`}>&lt;50%</span>
          <span className="text-gray-700"> {categoryCounts['<50%'] || 0} Indicator</span>
        </div>
      </div>

      {/* KPI List - Ultra compact version */}
      <div className="space-y-1">
        {sortedKpiData.map((item, index) => (
          <div key={index}>
            {/* Name and Achievement % */}
            <div className="flex items-center justify-between mb-0.5" style={{ fontSize: '10px' }}>
              <span className="text-gray-900 font-medium">{item.name}</span>
              <span className={`font-semibold ${getAchievementColor(item.achievement)}`}>
                {item.achievement.toFixed(2)}%
              </span>
            </div>
            
            {/* Progress Bar with embedded text */}
            <div className="w-full h-4 bg-gray-100 rounded overflow-hidden relative">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(item.achievement, 100)}%`,
                  backgroundColor: getBarColor(item.achievement)
                }}
              />
              {/* Text inside bar - always white with shadow for readability */}
              <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none" style={{ fontSize: '9px' }}>
                <span 
                  className="truncate pr-1 font-medium"
                  style={{ 
                    color: item.achievement >= 15 ? 'white' : '#1f2937',
                    textShadow: item.achievement >= 15 ? '0 1px 2px rgba(0,0,0,0.8)' : 'none'
                  }}
                >
                  {item.current}
                </span>
                <span 
                  className="whitespace-nowrap text-right font-medium"
                  style={{ 
                    color: item.achievement >= 60 ? 'white' : '#1f2937',
                    textShadow: item.achievement >= 60 ? '0 1px 2px rgba(0,0,0,0.8)' : 'none'
                  }}
                >
                  Target {item.target}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}