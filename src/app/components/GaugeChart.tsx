interface GaugeChartProps {
  kpiScore: number;
  simScore: number;
  maxScore?: number;
}

export function GaugeChart({ kpiScore, simScore, maxScore = 20 }: GaugeChartProps) {
  const centerX = 320;
  const centerY = 240;
  const radius = 180;
  const strokeWidth = 38;

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

  const needleLength = 150;
  const kpiNeedleEnd = polarToCartesian(centerX, centerY, needleLength, kpiAngle);
  const simNeedleEnd = polarToCartesian(centerX, centerY, needleLength, simAngle);
  
  // Score labels further out
  const labelDistance = 220;
  const kpiLabelPos = polarToCartesian(centerX, centerY, labelDistance, kpiAngle);
  const simLabelPos = polarToCartesian(centerX, centerY, labelDistance, simAngle);

  return (
    <div className="relative w-full">
      {/* SVG Gauge */}
      <svg viewBox="0 0 640 310" className="w-full">
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
                className="text-[24px] font-bold"
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
          strokeWidth="5"
        />

        {/* KPI score value */}
        <text
          x={kpiLabelPos.x}
          y={kpiLabelPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[20px] font-bold fill-black"
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
          strokeWidth="5"
        />

        {/* Simulation score value */}
        <text
          x={simLabelPos.x}
          y={simLabelPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[20px] font-bold fill-orange-500"
        >
          {simScore.toFixed(2)}
        </text>

        {/* Center pivot */}
        <circle
          cx={centerX}
          cy={centerY}
          r="7"
          fill="white"
          stroke="#333"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}