import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ArrowDown } from 'lucide-react';
import { MobileHeader } from './MobileHeader';

interface SimulatorScreenProps {
  onBack: () => void;
  onScoreChange: (score: number) => void;
  notificationCount?: number;
  onNavigate?: (screen: string) => void;
}

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

export function SimulatorScreen({ onBack, onScoreChange, notificationCount, onNavigate }: SimulatorScreenProps) {
  const [period, setPeriod] = useState('31-Jul-25');
  const [planMonth, setPlanMonth] = useState(1);

  // Simulation data (same as Desktop version)
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
        { plan: '< GOAL input', afterPlan: '28,500 CIF', target: '32,109 CIF', achievement: 88.76, score: 44.38 },
        { plan: '< input', afterPlan: '7,400 CIF', target: '7,654 CIF', achievement: 96.68, score: 48.34 },
        { plan: '< input', afterPlan: '165 point', target: '1,650 point', achievement: 10.00, score: 5.00 },
        { plan: '', afterPlan: '3.25 %', target: '3.48 %', achievement: 93.39, score: 70.04 },
        { plan: '< input', afterPlan: '32,066,328 Mn', target: '15,003,913 Mn', achievement: 213.71, score: 300.00 },
        { plan: '< input', afterPlan: '33,884,826 Mn', target: '30,855,067 Mn', achievement: 109.82, score: 109.82 },
        { plan: '< input', afterPlan: '1,924,970 Mn', target: '215,250 Mn', achievement: 894.25, score: 25.00 },
        { plan: '< input', afterPlan: '88,877 Mn', target: '38,799 Mn', achievement: 229.09, score: 57.27 },
        { plan: '< input', afterPlan: '35,687 Mn', target: '82,292 Mn', achievement: 43.37, score: 67.89 },
        { plan: '< input', afterPlan: '152,663 Mn', target: '121,991 Mn', achievement: 125.17, score: 62.58 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 98.50, score: 49.25 },
        { plan: '< input', afterPlan: '62.00 %', target: '75.00 %', achievement: 82.67, score: 41.33 },
      ],
      totalScore1: 1365.72,
      totalScore2: 180.08,
      totalScore3: 0,
      finalScore: 16.45,
    },
    7: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 17.62,
      scoreKPITurun: 4.11,
      rows: [
        { plan: '< GOAL input', afterPlan: '30,200 CIF', target: '32,109 CIF', achievement: 94.06, score: 47.03 },
        { plan: '< input', afterPlan: '7,550 CIF', target: '7,654 CIF', achievement: 98.64, score: 49.32 },
        { plan: '< input', afterPlan: '215 point', target: '1,650 point', achievement: 13.03, score: 6.52 },
        { plan: '', afterPlan: '3.35 %', target: '3.48 %', achievement: 96.26, score: 72.20 },
        { plan: '< input', afterPlan: '35,066,328 Mn', target: '15,003,913 Mn', achievement: 233.71, score: 300.00 },
        { plan: '< input', afterPlan: '35,184,826 Mn', target: '30,855,067 Mn', achievement: 114.03, score: 114.03 },
        { plan: '< input', afterPlan: '2,044,970 Mn', target: '215,250 Mn', achievement: 949.98, score: 25.00 },
        { plan: '< input', afterPlan: '98,877 Mn', target: '38,799 Mn', achievement: 254.87, score: 63.72 },
        { plan: '< input', afterPlan: '45,687 Mn', target: '82,292 Mn', achievement: 55.52, score: 86.88 },
        { plan: '< input', afterPlan: '165,663 Mn', target: '121,991 Mn', achievement: 135.82, score: 67.91 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 102.50, score: 51.25 },
        { plan: '< input', afterPlan: '67.50 %', target: '75.00 %', achievement: 90.00, score: 45.00 },
      ],
      totalScore1: 1463.28,
      totalScore2: 192.98,
      totalScore3: 0,
      finalScore: 17.62,
    },
    8: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 18.51,
      scoreKPITurun: 5.00,
      rows: [
        { plan: '< GOAL input', afterPlan: '31,200 CIF', target: '32,109 CIF', achievement: 97.17, score: 48.59 },
        { plan: '< input', afterPlan: '7,620 CIF', target: '7,654 CIF', achievement: 99.56, score: 49.78 },
        { plan: '< input', afterPlan: '265 point', target: '1,650 point', achievement: 16.06, score: 8.03 },
        { plan: '', afterPlan: '3.42 %', target: '3.48 %', achievement: 98.28, score: 73.71 },
        { plan: '< input', afterPlan: '38,566,328 Mn', target: '15,003,913 Mn', achievement: 257.04, score: 300.00 },
        { plan: '< input', afterPlan: '36,084,826 Mn', target: '30,855,067 Mn', achievement: 116.95, score: 116.95 },
        { plan: '< input', afterPlan: '2,164,970 Mn', target: '215,250 Mn', achievement: 1005.71, score: 25.00 },
        { plan: '< input', afterPlan: '108,877 Mn', target: '38,799 Mn', achievement: 280.66, score: 70.16 },
        { plan: '< input', afterPlan: '55,687 Mn', target: '82,292 Mn', achievement: 67.67, score: 105.86 },
        { plan: '< input', afterPlan: '175,663 Mn', target: '121,991 Mn', achievement: 144.01, score: 72.00 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 108.50, score: 54.25 },
        { plan: '< input', afterPlan: '71.00 %', target: '75.00 %', achievement: 94.67, score: 47.33 },
      ],
      totalScore1: 1535.12,
      totalScore2: 202.42,
      totalScore3: 0,
      finalScore: 18.51,
    },
    9: {
      rating: 'A+',
      scoreKPI: 13.51,
      simulationScore: 19.28,
      scoreKPITurun: 5.77,
      rows: [
        { plan: '< GOAL input', afterPlan: '31,800 CIF', target: '32,109 CIF', achievement: 99.04, score: 49.52 },
        { plan: '< input', afterPlan: '7,640 CIF', target: '7,654 CIF', achievement: 99.82, score: 49.91 },
        { plan: '< input', afterPlan: '295 point', target: '1,650 point', achievement: 17.88, score: 8.94 },
        { plan: '', afterPlan: '3.46 %', target: '3.48 %', achievement: 99.43, score: 74.57 },
        { plan: '< input', afterPlan: '41,066,328 Mn', target: '15,003,913 Mn', achievement: 273.71, score: 300.00 },
        { plan: '< input', afterPlan: '36,884,826 Mn', target: '30,855,067 Mn', achievement: 119.54, score: 119.54 },
        { plan: '< input', afterPlan: '2,244,970 Mn', target: '215,250 Mn', achievement: 1042.89, score: 25.00 },
        { plan: '< input', afterPlan: '113,877 Mn', target: '38,799 Mn', achievement: 293.54, score: 73.39 },
        { plan: '< input', afterPlan: '63,687 Mn', target: '82,292 Mn', achievement: 77.39, score: 121.11 },
        { plan: '< input', afterPlan: '182,663 Mn', target: '121,991 Mn', achievement: 149.74, score: 74.87 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 114.50, score: 57.25 },
        { plan: '< input', afterPlan: '73.50 %', target: '75.00 %', achievement: 98.00, score: 49.00 },
      ],
      totalScore1: 1601.88,
      totalScore2: 211.25,
      totalScore3: 0,
      finalScore: 19.28,
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
        { plan: '< input', afterPlan: '70,687 Mn', target: '82,292 Mn', achievement: 85.90, score: 134.53 },
        { plan: '< input', afterPlan: '187,663 Mn', target: '121,991 Mn', achievement: 153.84, score: 76.92 },
        { plan: '', afterPlan: '', target: '', achievement: 0, score: 0 },
        { plan: '', afterPlan: '', target: '', achievement: 120.50, score: 60.25 },
        { plan: '< input', afterPlan: '75.00 %', target: '75.00 %', achievement: 100.00, score: 50.00 },
      ],
      totalScore1: 1660.12,
      totalScore2: 219.02,
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
    const dates = ['31-Jul-25', '31-Aug-25', '30-Sep-25', '31-Oct-25', '30-Nov-25', '31-Dec-25'];
    setPeriod(dates[planMonth - 1] || dates[0]);
  }, [planMonth]);

  useEffect(() => {
    onScoreChange(currentData.finalScore);
  }, [currentData.finalScore, onScoreChange]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Compact Header */}
      <MobileHeader
        showBack={true}
        onBack={onBack}
        title="KPI Simulator"
        showNotification={true}
        showProfile={true}
        notificationCount={notificationCount}
        onNavigate={onNavigate}
      />

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Period & Plan Controls - Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Period Input */}
            <div>
              <label className="text-[10px] text-gray-600 block mb-1">Period</label>
              <input
                type="text"
                value={period}
                readOnly
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs text-center bg-gray-50 font-medium"
              />
            </div>
            
            {/* Plan Month Input */}
            <div>
              <label className="text-[10px] text-gray-600 block mb-1">PLAN Month</label>
              <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden h-[30px]">
                <div className="flex-1 px-2.5 text-center text-xs font-medium">{planMonth}</div>
                <div className="flex flex-col border-l border-gray-300 h-full">
                  <button
                    onClick={handleIncreasePlan}
                    disabled={planMonth >= 10}
                    className={`px-2 flex-1 hover:bg-blue-50 border-b border-gray-300 transition-colors flex items-center justify-center ${
                      planMonth >= 10 ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleDecreasePlan}
                    disabled={planMonth <= 1}
                    className={`px-2 flex-1 hover:bg-blue-50 transition-colors flex items-center justify-center ${
                      planMonth <= 1 ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Summary - Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-900">Score Summary</h3>
            <div className={`text-[10px] px-2 py-0.5 rounded font-medium ${
              currentData.scoreKPITurun >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {currentData.scoreKPITurun >= 0 ? '+' : ''}{currentData.scoreKPITurun.toFixed(2)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
              <p className="text-[9px] text-gray-600 mb-0.5">Current</p>
              <p className="text-xl font-bold text-blue-600">{currentData.scoreKPI}</p>
              <p className="text-[9px] text-gray-500 mt-0.5">{currentData.rating}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
              <p className="text-[9px] text-gray-600 mb-0.5">Simulated</p>
              <p className="text-xl font-bold text-purple-600">{currentData.simulationScore}</p>
              <p className={`text-[9px] mt-0.5 font-medium ${currentData.scoreKPITurun >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {currentData.scoreKPITurun >= 0 ? '↑' : '↓'} {Math.abs(currentData.scoreKPITurun).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Performance Table - Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#4a5f7f] text-white px-3 py-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold">Performance Details</h3>
            <span className="text-[9px] opacity-80">{currentData.rows.filter(r => r.achievement > 0).length} KPIs</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1.5 text-left text-[9px] text-gray-600 font-medium">After Plan</th>
                  <th className="px-2 py-1.5 text-center text-[9px] text-gray-600 font-medium">Target</th>
                  <th className="px-2 py-1.5 text-center text-[9px] text-gray-600 font-medium">Achiev.</th>
                  <th className="px-2 py-1.5 text-right text-[9px] text-gray-600 font-medium">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.rows.filter(r => r.achievement > 0).map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-2 py-1.5 text-[9px] text-gray-900">{row.afterPlan}</td>
                    <td className="px-2 py-1.5 text-right text-[9px] text-gray-700">{row.target}</td>
                    <td className="px-2 py-1.5 text-center">
                      <div className={`${getAchievementColor(row.achievement)} text-white px-1.5 py-0.5 rounded text-[8px] font-medium inline-block`}>
                        {row.achievement.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-right text-[9px] font-medium text-gray-900">
                      {row.score.toFixed(2)}
                    </td>
                  </tr>
                ))}
                
                {/* Totals - Compact */}
                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td colSpan={2} className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-900">
                    Total Score (1)
                  </td>
                  <td className="px-2 py-1.5 text-center bg-yellow-100 text-[9px] font-bold text-gray-900">
                    {currentData.totalScore1.toFixed(2)}%
                  </td>
                  <td className="px-2 py-1.5 text-right text-[10px] font-bold text-gray-900">
                    {currentData.totalScore1.toFixed(2)}
                  </td>
                </tr>
                
                <tr className="bg-gray-50">
                  <td colSpan={2} className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-900">
                    Total Score (2)
                  </td>
                  <td className="px-2 py-1.5 text-center text-[9px] text-gray-500">-</td>
                  <td className="px-2 py-1.5 text-right text-[10px] font-bold text-gray-900">
                    {currentData.totalScore2.toFixed(2)}
                  </td>
                </tr>
                
                <tr className="bg-green-50 border-t-2 border-green-200">
                  <td colSpan={2} className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-900">
                    Final Score
                  </td>
                  <td className="px-2 py-1.5 text-center text-[9px] text-gray-500">-</td>
                  <td className="px-2 py-1.5 text-right text-sm font-bold text-green-600">
                    {currentData.finalScore.toFixed(2)}
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