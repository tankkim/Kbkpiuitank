import { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ArrowDown } from 'lucide-react';
import { GaugeChart } from './GaugeChart';

interface SimulationData {
  rating: string;
  scoreKPI: number;
  scoreKPITurun: number;
  simulationScore: number;
  rows: {
    plan: string;
    afterPlan: string;
    target: string;
    achievement: number;
    score: number;
  }[];
  totalScore1: number;
  totalScore2: number;
  totalScore3: number;
  finalScore: number;
}

interface KPISimulatorProps {
  onScoreChange?: (score: number) => void;
}

export function KPISimulator({ onScoreChange }: KPISimulatorProps) {
  const [period, setPeriod] = useState('31-Jul-25');
  const [planMonth, setPlanMonth] = useState(1);

  // Simulation data for different months
  const simulationDataByMonth: Record<number, SimulationData> = {
    1: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 11.66,
      scoreKPITurun: -1.85,
      rows: [
        { plan: '< GOAL input', afterPlan: '14,196 CIF', target: '32,109 CIF', achievement: 44.21, score: 22.11 },
        { plan: '< input', afterPlan: '5,564 CIF', target: '7,654 CIF', achievement: 72.69, score: 36.35 },
        { plan: '< input', afterPlan: '45 point', target: '1,650 point', achievement: 2.73, score: 1.20 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '< input', afterPlan: '26,064,328 Mn', target: '15,003,913 Mn', achievement: 173.73, score: 300.00 },
        { plan: '< input', afterPlan: '28,584,826 Mn', target: '30,855,067 Mn', achievement: 101.86, score: 101.67 },
        { plan: '< input', afterPlan: '1,405,370 Mn', target: '215,250 Mn', achievement: 597.19, score: 25.00 },
        { plan: '< input', afterPlan: '67,877 Mn', target: '38,799 Mn', achievement: 175.00, score: 43.75 },
        { plan: '< input', afterPlan: '21,687 Mn', target: '82,292 Mn', achievement: 26.37, score: 41.25 },
        { plan: '< input', afterPlan: '124,663 Mn', target: '121,991 Mn', achievement: 102.27, score: 51.13 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '< input', afterPlan: '43.42 %', target: '75.00 %', achievement: 57.89, score: 28.95 },
      ],
      totalScore1: 1030.16,
      totalScore2: 136.33,
      totalScore3: 0,
      finalScore: 11.66,
    },
    2: {
      rating: 'A',
      scoreKPI: 13.51,
      simulationScore: 12.23,
      scoreKPITurun: -1.28,
      rows: [
        { plan: '< GOAL input', afterPlan: '16,596 CIF', target: '32,109 CIF', achievement: 51.68, score: 25.84 },
        { plan: '< input', afterPlan: '6,100 CIF', target: '7,654 CIF', achievement: 79.70, score: 39.85 },
        { plan: '< input', afterPlan: '55 point', target: '1,650 point', achievement: 3.33, score: 1.35 },
        { plan: '', afterPlan: '2.21 %', target: '3.48 %', achievement: 63.51, score: 47.63 },
        { plan: '< input', afterPlan: '26,066,328 Mn', target: '15,003,913 Mn', achievement: 173.73, score: 300.00 },
        { plan: '< input', afterPlan: '29,584,826 Mn', target: '30,855,067 Mn', achievement: 95.88, score: 95.88 },
        { plan: '< input', afterPlan: '1,504,970 Mn', target: '215,250 Mn', achievement: 699.10, score: 25.00 },
        { plan: '< input', afterPlan: '70,877 Mn', target: '38,799 Mn', achievement: 182.69, score: 45.67 },
        { plan: '< input', afterPlan: '22,687 Mn', target: '82,292 Mn', achievement: 27.57, score: 43.18 },
        { plan: '< input', afterPlan: '128,663 Mn', target: '121,991 Mn', achievement: 105.47, score: 52.73 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 85.50, score: 42.75 },
        { plan: '< input', afterPlan: '45.50 %', target: '75.00 %', achievement: 60.67, score: 30.33 },
      ],
      totalScore1: 1062.54,
      totalScore2: 140.12,
      totalScore3: 0,
      finalScore: 12.23,
    },
    3: {
      rating: 'A',
      scoreKPI: 13.51,
      simulationScore: 13.05,
      scoreKPITurun: -0.46,
      rows: [
        { plan: '< GOAL input', afterPlan: '19,596 CIF', target: '32,109 CIF', achievement: 61.03, score: 30.52 },
        { plan: '< input', afterPlan: '6,500 CIF', target: '7,654 CIF', achievement: 84.92, score: 42.46 },
        { plan: '< input', afterPlan: '70 point', target: '1,650 point', achievement: 4.24, score: 1.82 },
        { plan: '', afterPlan: '2.55 %', target: '3.48 %', achievement: 73.28, score: 54.96 },
        { plan: '< input', afterPlan: '27,066,328 Mn', target: '15,003,913 Mn', achievement: 180.38, score: 300.00 },
        { plan: '< input', afterPlan: '30,584,826 Mn', target: '30,855,067 Mn', achievement: 99.12, score: 99.12 },
        { plan: '< input', afterPlan: '1,604,970 Mn', target: '215,250 Mn', achievement: 745.64, score: 25.00 },
        { plan: '< input', afterPlan: '73,877 Mn', target: '38,799 Mn', achievement: 190.43, score: 47.61 },
        { plan: '< input', afterPlan: '24,687 Mn', target: '82,292 Mn', achievement: 30.00, score: 46.88 },
        { plan: '< input', afterPlan: '132,663 Mn', target: '121,991 Mn', achievement: 108.75, score: 54.37 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 88.20, score: 44.10 },
        { plan: '< input', afterPlan: '48.00 %', target: '75.00 %', achievement: 64.00, score: 32.00 },
      ],
      totalScore1: 1113.42,
      totalScore2: 147.01,
      totalScore3: 0,
      finalScore: 13.05,
    },
    4: {
      rating: 'A',
      scoreKPI: 13.51,
      simulationScore: 14.15,
      scoreKPITurun: 0.64,
      rows: [
        { plan: '< GOAL input', afterPlan: '22,896 CIF', target: '32,109 CIF', achievement: 71.30, score: 35.65 },
        { plan: '< input', afterPlan: '6,800 CIF', target: '7,654 CIF', achievement: 88.84, score: 44.42 },
        { plan: '< input', afterPlan: '90 point', target: '1,650 point', achievement: 5.45, score: 2.50 },
        { plan: '', afterPlan: '2.85 %', target: '3.48 %', achievement: 81.90, score: 61.43 },
        { plan: '< input', afterPlan: '28,566,328 Mn', target: '15,003,913 Mn', achievement: 190.38, score: 300.00 },
        { plan: '< input', afterPlan: '31,284,826 Mn', target: '30,855,067 Mn', achievement: 101.39, score: 101.39 },
        { plan: '< input', afterPlan: '1,684,970 Mn', target: '215,250 Mn', achievement: 782.79, score: 25.00 },
        { plan: '< input', afterPlan: '76,877 Mn', target: '38,799 Mn', achievement: 198.18, score: 49.55 },
        { plan: '< input', afterPlan: '27,187 Mn', target: '82,292 Mn', achievement: 33.04, score: 51.72 },
        { plan: '< input', afterPlan: '137,663 Mn', target: '121,991 Mn', achievement: 112.85, score: 56.42 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 91.50, score: 45.75 },
        { plan: '< input', afterPlan: '52.00 %', target: '75.00 %', achievement: 69.33, score: 34.67 },
      ],
      totalScore1: 1174.85,
      totalScore2: 155.05,
      totalScore3: 0,
      finalScore: 14.15,
    },
    5: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 15.28,
      scoreKPITurun: 1.77,
      rows: [
        { plan: '< GOAL input', afterPlan: '26,896 CIF', target: '32,109 CIF', achievement: 83.77, score: 41.88 },
        { plan: '< input', afterPlan: '7,200 CIF', target: '7,654 CIF', achievement: 94.07, score: 47.03 },
        { plan: '< input', afterPlan: '125 point', target: '1,650 point', achievement: 7.58, score: 3.50 },
        { plan: '', afterPlan: '3.10 %', target: '3.48 %', achievement: 89.08, score: 66.81 },
        { plan: '< input', afterPlan: '30,066,328 Mn', target: '15,003,913 Mn', achievement: 200.38, score: 300.00 },
        { plan: '< input', afterPlan: '32,584,826 Mn', target: '30,855,067 Mn', achievement: 105.61, score: 105.61 },
        { plan: '< input', afterPlan: '1,804,970 Mn', target: '215,250 Mn', achievement: 838.72, score: 25.00 },
        { plan: '< input', afterPlan: '80,877 Mn', target: '38,799 Mn', achievement: 208.48, score: 52.12 },
        { plan: '< input', afterPlan: '29,687 Mn', target: '82,292 Mn', achievement: 36.07, score: 56.48 },
        { plan: '< input', afterPlan: '142,663 Mn', target: '121,991 Mn', achievement: 116.94, score: 58.47 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 95.80, score: 47.90 },
        { plan: '< input', afterPlan: '57.00 %', target: '75.00 %', achievement: 76.00, score: 38.00 },
      ],
      totalScore1: 1272.85,
      totalScore2: 167.78,
      totalScore3: 0,
      finalScore: 15.28,
    },
    6: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 16.45,
      scoreKPITurun: 2.94,
      rows: [
        { plan: '< GOAL input', afterPlan: '30,196 CIF', target: '32,109 CIF', achievement: 94.04, score: 47.02 },
        { plan: '< input', afterPlan: '7,450 CIF', target: '7,654 CIF', achievement: 97.34, score: 48.67 },
        { plan: '< input', afterPlan: '158 point', target: '1,650 point', achievement: 9.58, score: 4.50 },
        { plan: '', afterPlan: '3.30 %', target: '3.48 %', achievement: 94.83, score: 71.12 },
        { plan: '< input', afterPlan: '32,066,328 Mn', target: '15,003,913 Mn', achievement: 213.71, score: 300.00 },
        { plan: '< input', afterPlan: '33,584,826 Mn', target: '30,855,067 Mn', achievement: 108.85, score: 108.85 },
        { plan: '< input', afterPlan: '1,904,970 Mn', target: '215,250 Mn', achievement: 885.26, score: 25.00 },
        { plan: '< input', afterPlan: '85,877 Mn', target: '38,799 Mn', achievement: 221.36, score: 55.34 },
        { plan: '< input', afterPlan: '33,687 Mn', target: '82,292 Mn', achievement: 40.94, score: 64.06 },
        { plan: '< input', afterPlan: '149,663 Mn', target: '121,991 Mn', achievement: 122.68, score: 61.34 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 99.20, score: 49.60 },
        { plan: '< input', afterPlan: '62.50 %', target: '75.00 %', achievement: 83.33, score: 41.67 },
      ],
      totalScore1: 1360.45,
      totalScore2: 179.33,
      totalScore3: 0,
      finalScore: 16.45,
    },
    7: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 17.82,
      scoreKPITurun: 4.31,
      rows: [
        { plan: '< GOAL input', afterPlan: '31,596 CIF', target: '32,109 CIF', achievement: 98.40, score: 49.20 },
        { plan: '< input', afterPlan: '7,600 CIF', target: '7,654 CIF', achievement: 99.29, score: 49.65 },
        { plan: '< input', afterPlan: '195 point', target: '1,650 point', achievement: 11.82, score: 5.50 },
        { plan: '', afterPlan: '3.45 %', target: '3.48 %', achievement: 99.14, score: 74.35 },
        { plan: '< input', afterPlan: '34,566,328 Mn', target: '15,003,913 Mn', achievement: 230.38, score: 300.00 },
        { plan: '< input', afterPlan: '34,584,826 Mn', target: '30,855,067 Mn', achievement: 112.09, score: 112.09 },
        { plan: '< input', afterPlan: '2,004,970 Mn', target: '215,250 Mn', achievement: 931.80, score: 25.00 },
        { plan: '< input', afterPlan: '91,877 Mn', target: '38,799 Mn', achievement: 236.81, score: 59.20 },
        { plan: '< input', afterPlan: '38,687 Mn', target: '82,292 Mn', achievement: 47.02, score: 73.59 },
        { plan: '< input', afterPlan: '157,663 Mn', target: '121,991 Mn', achievement: 129.25, score: 64.62 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 103.50, score: 51.75 },
        { plan: '< input', afterPlan: '68.00 %', target: '75.00 %', achievement: 90.67, score: 45.33 },
      ],
      totalScore1: 1462.23,
      totalScore2: 192.78,
      totalScore3: 0,
      finalScore: 17.82,
    },
    8: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 18.96,
      scoreKPITurun: 5.45,
      rows: [
        { plan: '< GOAL input', afterPlan: '32,000 CIF', target: '32,109 CIF', achievement: 99.66, score: 49.83 },
        { plan: '< input', afterPlan: '7,650 CIF', target: '7,654 CIF', achievement: 99.95, score: 49.97 },
        { plan: '< input', afterPlan: '235 point', target: '1,650 point', achievement: 14.24, score: 6.85 },
        { plan: '', afterPlan: '3.48 %', target: '3.48 %', achievement: 100.00, score: 75.00 },
        { plan: '< input', afterPlan: '37,066,328 Mn', target: '15,003,913 Mn', achievement: 247.04, score: 300.00 },
        { plan: '< input', afterPlan: '35,584,826 Mn', target: '30,855,067 Mn', achievement: 115.33, score: 115.33 },
        { plan: '< input', afterPlan: '2,104,970 Mn', target: '215,250 Mn', achievement: 978.34, score: 25.00 },
        { plan: '< input', afterPlan: '98,877 Mn', target: '38,799 Mn', achievement: 254.86, score: 63.71 },
        { plan: '< input', afterPlan: '44,687 Mn', target: '82,292 Mn', achievement: 54.31, score: 85.03 },
        { plan: '< input', afterPlan: '166,663 Mn', target: '121,991 Mn', achievement: 136.63, score: 68.31 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 108.50, score: 54.25 },
        { plan: '< input', afterPlan: '72.50 %', target: '75.00 %', achievement: 96.67, score: 48.33 },
      ],
      totalScore1: 1566.12,
      totalScore2: 206.45,
      totalScore3: 0,
      finalScore: 18.96,
    },
    9: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 19.88,
      scoreKPITurun: 6.37,
      rows: [
        { plan: '< GOAL input', afterPlan: '32,100 CIF', target: '32,109 CIF', achievement: 99.97, score: 49.99 },
        { plan: '< input', afterPlan: '7,654 CIF', target: '7,654 CIF', achievement: 100.00, score: 50.00 },
        { plan: '< input', afterPlan: '285 point', target: '1,650 point', achievement: 17.27, score: 8.35 },
        { plan: '', afterPlan: '3.48 %', target: '3.48 %', achievement: 100.00, score: 75.00 },
        { plan: '< input', afterPlan: '40,066,328 Mn', target: '15,003,913 Mn', achievement: 267.04, score: 300.00 },
        { plan: '< input', afterPlan: '36,584,826 Mn', target: '30,855,067 Mn', achievement: 118.57, score: 118.57 },
        { plan: '< input', afterPlan: '2,204,970 Mn', target: '215,250 Mn', achievement: 1024.88, score: 25.00 },
        { plan: '< input', afterPlan: '106,877 Mn', target: '38,799 Mn', achievement: 275.48, score: 68.87 },
        { plan: '< input', afterPlan: '51,687 Mn', target: '82,292 Mn', achievement: 62.82, score: 98.28 },
        { plan: '< input', afterPlan: '176,663 Mn', target: '121,991 Mn', achievement: 144.83, score: 72.41 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 114.20, score: 57.10 },
        { plan: '< input', afterPlan: '74.00 %', target: '75.00 %', achievement: 98.67, score: 49.33 },
      ],
      totalScore1: 1677.45,
      totalScore2: 221.12,
      totalScore3: 0,
      finalScore: 19.88,
    },
    10: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 20.00,
      scoreKPITurun: 6.49,
      rows: [
        { plan: '< GOAL input', afterPlan: '32,109 CIF', target: '32,109 CIF', achievement: 100.00, score: 50.00 },
        { plan: '< input', afterPlan: '7,654 CIF', target: '7,654 CIF', achievement: 100.00, score: 50.00 },
        { plan: '< input', afterPlan: '330 point', target: '1,650 point', achievement: 20.00, score: 10.00 },
        { plan: '', afterPlan: '3.48 %', target: '3.48 %', achievement: 100.00, score: 75.00 },
        { plan: '< input', afterPlan: '43,066,328 Mn', target: '15,003,913 Mn', achievement: 287.04, score: 300.00 },
        { plan: '< input', afterPlan: '37,584,826 Mn', target: '30,855,067 Mn', achievement: 121.81, score: 121.81 },
        { plan: '< input', afterPlan: '2,304,970 Mn', target: '215,250 Mn', achievement: 1071.42, score: 25.00 },
        { plan: '< input', afterPlan: '115,877 Mn', target: '38,799 Mn', achievement: 298.67, score: 74.67 },
        { plan: '< input', afterPlan: '59,687 Mn', target: '82,292 Mn', achievement: 72.54, score: 113.59 },
        { plan: '< input', afterPlan: '187,663 Mn', target: '121,991 Mn', achievement: 153.84, score: 76.92 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 120.50, score: 60.25 },
        { plan: '< input', afterPlan: '75.00 %', target: '75.00 %', achievement: 100.00, score: 50.00 },
      ],
      totalScore1: 1732.34,
      totalScore2: 228.12,
      totalScore3: 0,
      finalScore: 20.00,
    },
  };

  const currentData = simulationDataByMonth[planMonth] || simulationDataByMonth[1];

  const handleIncreasePlan = () => {
    if (planMonth < 10) {
      setPlanMonth(planMonth + 1);
    }
  };

  const handleDecreasePlan = () => {
    if (planMonth > 1) {
      setPlanMonth(planMonth - 1);
    }
  };

  const getAchievementColor = (achievement: number) => {
    if (achievement >= 100) return 'bg-green-500';
    if (achievement >= 90) return 'bg-lime-400';
    if (achievement >= 80) return 'bg-yellow-400';
    if (achievement >= 70) return 'bg-yellow-500';
    if (achievement >= 60) return 'bg-orange-400';
    if (achievement >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  useEffect(() => {
    // Update period based on plan month
    const dates = [
      '31-Jul-25',
      '31-Aug-25',
      '30-Sep-25',
      '31-Oct-25',
      '30-Nov-25',
      '31-Dec-25',
    ];
    setPeriod(dates[planMonth - 1] || dates[0]);
  }, [planMonth]);

  useEffect(() => {
    if (onScoreChange) {
      onScoreChange(currentData.finalScore);
    }
  }, [currentData.finalScore, onScoreChange]);

  return (
    <div className="space-y-0">
      {/* Main Content: 2 Column Layout */}
      <div className="grid grid-cols-[1fr_1.2fr] gap-4">
        {/* Left Column: Period, Plan, and Your KPI */}
        <div className="space-y-4">
          {/* Period & Plan Month - Compact One Row */}
          <div className="grid grid-cols-2 gap-2 bg-white rounded-lg p-2 shadow-sm border border-gray-200">
            <div className="flex items-center gap-1.5">
              <label className="text-[10px] text-gray-700 font-semibold whitespace-nowrap">Period</label>
              <input
                type="text"
                value={period}
                readOnly
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs text-center bg-gray-50 font-medium text-gray-900"
              />
            </div>
            
            <div className="flex items-center gap-1.5">
              <label className="text-[10px] text-gray-700 font-semibold whitespace-nowrap">PLAN</label>
              <div className="flex-1 flex items-center border border-gray-300 rounded bg-white overflow-hidden">
                <div className="flex-1 px-2 py-1 text-center">
                  <div className="text-xs font-semibold text-gray-900">{planMonth}</div>
                </div>
                <div className="flex flex-col border-l border-gray-300">
                  <button
                    onClick={handleIncreasePlan}
                    disabled={planMonth >= 10}
                    className={`px-1.5 py-0.5 hover:bg-blue-50 border-b border-gray-300 transition-colors ${
                      planMonth >= 10 ? 'opacity-50 cursor-not-allowed' : 'text-blue-600'
                    }`}
                  >
                    <ChevronUp className="w-2.5 h-2.5" />
                  </button>
                  <button
                    onClick={handleDecreasePlan}
                    disabled={planMonth <= 1}
                    className={`px-1.5 py-0.5 hover:bg-blue-50 transition-colors ${
                      planMonth <= 1 ? 'opacity-50 cursor-not-allowed' : 'text-blue-600'
                    }`}
                  >
                    <ChevronDown className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Your KPI Card - Compact Spacing */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-base text-gray-700 font-semibold mb-4">Your KPI</div>
            
            {/* Compact Header with Rating and Score */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Current Rating</div>
                <div className="text-3xl text-blue-600">A+</div>
                <div className="text-xs text-gray-600 mt-1">M&D</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">Current Score</div>
                <div className="text-3xl text-gray-900">{currentData.scoreKPI}</div>
                <div className="text-xs text-gray-500 mt-1">WoW : 13-Jun-25</div>
              </div>
            </div>

            {/* Large Gauge Chart with Minimal Spacing */}
            <div className="relative flex items-center justify-center py-4">
              <GaugeChart
                kpiScore={currentData.scoreKPI}
                simScore={currentData.simulationScore}
                maxScore={20}
              />
            </div>

            {/* Compact Legend - Minimal Top Margin */}
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1.5 bg-black rounded"></div>
                <span className="text-xs text-gray-700 font-medium">KPI Score ({currentData.scoreKPI})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1.5 bg-orange-500 rounded"></div>
                <span className="text-xs text-gray-700 font-medium">Sim. Score ({currentData.simulationScore})</span>
              </div>
            </div>
          </div>

          {/* Arrow showing difference with conditional color */}
          <div className={`flex items-center justify-center gap-2 py-3 rounded-lg border ${
            currentData.scoreKPITurun < 0 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <ArrowDown className={`w-5 h-5 ${
              currentData.scoreKPITurun < 0 ? 'text-red-600' : 'text-green-600 rotate-180'
            }`} />
            <div className="text-sm text-gray-700">
              Simulator Score: <span className={`font-semibold ${
                currentData.scoreKPITurun < 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {currentData.scoreKPITurun >= 0 ? '+' : ''}{currentData.scoreKPITurun.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Performance Table */}
        <div className="space-y-3">
          {/* Performance Table Header */}
          <div className="bg-[#4a5f7f] text-white px-3 py-2 text-sm rounded">
            Performance
          </div>

          {/* Table - Scrollable */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <table className="w-full text-xs border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left text-[10px]">Plan<br/>(4)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center text-[10px]">After Plan<br/>(b)+(d)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center text-[10px]">Target<br/>(M+2)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center text-[10px]">Achievement<br/>(%)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center text-[10px]">Score<br/>(a)*(b%)</th>
                </tr>
              </thead>
              <tbody>
                {currentData.rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-orange-50' : 'bg-white'}>
                    <td className="border border-gray-300 px-2 py-1.5">
                      <div className="text-gray-600 italic text-[10px]">{row.plan}</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-1.5 text-right text-[10px]">{row.afterPlan}</td>
                    <td className="border border-gray-300 px-2 py-1.5 text-right text-[10px]">{row.target}</td>
                    <td className="border border-gray-300 px-2 py-1.5 text-center">
                      {row.achievement > 0 && (
                        <div className={`${getAchievementColor(row.achievement)} text-white px-2 py-0.5 rounded text-[10px]`}>
                          {row.achievement.toFixed(2)}%
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1.5 text-right text-[10px]">{row.score > 0 ? row.score.toFixed(2) : ''}</td>
                  </tr>
                ))}

                {/* Total Score 1 */}
                <tr className="bg-blue-100">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2 text-center text-[10px]">
                    <strong>Total Score (1)</strong>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center bg-yellow-300 text-[10px]">
                    <strong>{currentData.totalScore1.toFixed(2)}%</strong>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right text-[10px]">
                    <strong>{currentData.totalScore1.toFixed(2)}</strong>
                  </td>
                </tr>

                {/* Total Score 2 */}
                <tr className="bg-white">
                  <td colSpan={3} className="border border-gray-300 px-2 py-1.5 text-[10px]">
                    <div className="text-gray-600 italic text-[10px]">* Input</div>
                    <strong>Total Score (2)</strong>
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-center text-[10px]">-</td>
                  <td className="border border-gray-300 px-2 py-1.5 text-right text-[10px]">90.00</td>
                </tr>

                {/* Total Score 3 */}
                <tr className="bg-orange-50">
                  <td colSpan={3} className="border border-gray-300 px-2 py-1.5 text-[10px]">
                    <strong>Total Score (2)</strong>
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-center text-[10px]">-</td>
                  <td className="border border-gray-300 px-2 py-1.5 text-right text-[10px]">
                    <strong>{currentData.totalScore2.toFixed(2)}</strong>
                  </td>
                </tr>

                {/* Total Score 4 */}
                <tr className="bg-white">
                  <td colSpan={3} className="border border-gray-300 px-2 py-1.5 text-[10px]">
                    <strong>Total Score (3)</strong>
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-center text-[10px]">-</td>
                  <td className="border border-gray-300 px-2 py-1.5 text-right text-[10px]">-</td>
                </tr>

                {/* Final Score */}
                <tr className="bg-blue-100">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2 text-center text-[10px]">
                    <strong>Total Score (1)+(2)+(3) / 100</strong>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-[10px]">-</td>
                  <td className="border border-gray-300 px-2 py-2 text-right text-[10px]">
                    <strong className="text-blue-600">{currentData.finalScore.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}