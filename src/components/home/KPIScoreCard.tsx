interface KPIScoreCardProps {
  simulatedScore?: number;
}

export function KPIScoreCard({ simulatedScore = 11.66 }: KPIScoreCardProps) {
  const kpiScore = 13.51;
  const simScore = simulatedScore;
  const maxScore = 20;

  const centerX = 300;
  const centerY = 220;
  const radius = 160;
  const strokeWidth = 32;

  // Grade segments: E, D, C, B, A, A+
  const segments = [
    { label: 'E', color: '#f0f0f0', minScore: 0, maxScore: 5, textColor: '#333' },
    { label: 'D', color: '#d5d5d5', minScore: 5, maxScore: 7, textColor: '#333' },
    { label: 'C', color: '#b8b8b8', minScore: 7, maxScore: 9, textColor: '#333' },
    { label: 'B', color: '#909090', minScore: 9, maxScore: 11, textColor: '#fff' },
    { label: 'A', color: '#606060', minScore: 11, maxScore: 13, textColor: '#fff' },
    { label: 'A+', color: '#404040', minScore: 13, maxScore: 20, textColor: '#fff' },
  ];

  // Convert score to angle (180° at left, 0° at right)
  const scoreToAngle = (score: number) => {
    const ratio = Math.min(Math.max(score / maxScore, 0), 1);
    return 180 - (ratio * 180);
  };

  // Polar to cartesian
  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy - r * Math.sin(angleInRadians)
    };
  };

  // Create arc path
  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    
    const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  // Calculate needle angles
  const kpiAngle = scoreToAngle(kpiScore);
  const simAngle = scoreToAngle(simScore);

  const needleLength = 130;
  const kpiNeedleEnd = polarToCartesian(centerX, centerY, needleLength, kpiAngle);
  const simNeedleEnd = polarToCartesian(centerX, centerY, needleLength, simAngle);
  
  // Score labels further out
  const labelDistance = 200;
  const kpiLabelPos = polarToCartesian(centerX, centerY, labelDistance, kpiAngle);
  const simLabelPos = polarToCartesian(centerX, centerY, labelDistance, simAngle);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm mb-2.5">Your KPI</h3>
      
      {/* Horizontal Layout: Left Info + Right Gauge */}
      <div className="flex items-center gap-4">
        {/* Left: Text Information - Compact */}
        <div className="flex-shrink-0 space-y-3">
          <div>
            <div className="text-[10px] text-gray-600 mb-1">Current Rating</div>
            <div className="text-4xl text-blue-600 leading-none mb-1">A+</div>
            <div className="text-[10px] text-gray-600">M&D</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-600 mb-1">Current Score</div>
            <div className="text-4xl text-blue-600 leading-none mb-1">{kpiScore}</div>
            <div className="text-[10px] text-gray-600">WoW : 13-Jun-25</div>
          </div>
        </div>

        {/* Right: Large Gauge Chart */}
        <div className="flex-1 flex flex-col items-center -mr-2">
          <svg viewBox="0 0 600 280" className="w-full">
            {/* Draw grade segments */}
            {segments.map((segment, index) => {
              const startAngle = scoreToAngle(segment.minScore);
              const endAngle = scoreToAngle(segment.maxScore);
              const arcPath = describeArc(centerX, centerY, radius, startAngle, endAngle);

              // Label position - inside the arc
              const midAngle = (startAngle + endAngle) / 2;
              const labelRadius = radius;
              const labelPos = polarToCartesian(centerX, centerY, labelRadius, midAngle);

              return (
                <g key={index}>
                  <path
                    d={arcPath}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="butt"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[18px] font-semibold"
                    fill={segment.textColor}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}

            {/* Black needle (KPI Score) */}
            <line
              x1={centerX}
              y1={centerY}
              x2={kpiNeedleEnd.x}
              y2={kpiNeedleEnd.y}
              stroke="#000"
              strokeWidth="4"
            />

            {/* KPI score value */}
            <text
              x={kpiLabelPos.x}
              y={kpiLabelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[18px] font-bold fill-black"
            >
              {kpiScore.toFixed(2)}
            </text>

            {/* Orange needle (Simulation Score) */}
            <line
              x1={centerX}
              y1={centerY}
              x2={simNeedleEnd.x}
              y2={simNeedleEnd.y}
              stroke="#ff6b35"
              strokeWidth="4"
            />

            {/* Simulation score value */}
            <text
              x={simLabelPos.x}
              y={simLabelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[18px] font-bold fill-orange-500"
            >
              {simScore.toFixed(2)}
            </text>

            {/* Center pivot */}
            <circle
              cx={centerX}
              cy={centerY}
              r="5"
              fill="white"
              stroke="#333"
              strokeWidth="2.5"
            />
          </svg>

          {/* Legend at bottom - compact */}
          <div className="flex justify-center gap-5 -mt-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-1 bg-black rounded"></div>
              <span className="text-gray-700">KPI Score ({kpiScore})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-1 bg-orange-500 rounded"></div>
              <span className="text-gray-700">Sim. Score ({simScore.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
