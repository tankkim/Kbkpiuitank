import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { KPIScoreCard } from './home/KPIScoreCard';
import { AchievementDonutCharts } from './home/AchievementDonutCharts';
import { MovementChart } from './home/MovementChart';
import { MainIndicatorsCharts } from './home/MainIndicatorsCharts';
import { BranchRankPanel } from './home/BranchRankPanel';
import { IndicatorKPI } from './home/IndicatorKPI';
import { AchievementOfScopeKPI } from './home/AchievementOfScopeKPI';
import { PageHeader } from './PageHeader';

interface HomeProps {
  simulatedScore?: number;
  unreadNotificationsCount?: number;
  onNotificationClick?: () => void;
}

export function Home({ simulatedScore = 11.66, unreadNotificationsCount = 0, onNotificationClick }: HomeProps) {
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('TOTAL BRANCH');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const regionRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);

  const regions = [
    'TOTAL BRANCH',
    'REGIONAL I',
    'REGIONAL II',
    'REGIONAL III',
    'REGIONAL IV',
    'REGIONAL V',
    'REGIONAL VI',
    'REGIONAL VII'
  ];

  const branches = [
    'All Branches',
    'Jakarta Gunung Sahari',
    'Jakarta Saharjo',
    'Samarinda',
    'Batam',
    'Pekanbaru',
    'Banjarmasin',
    'Sorong',
    'Kedin',
    'Jakarta Kebon Jeruk',
    'Karawang'
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setShowRegionDropdown(false);
      }
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setShowBranchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Unified Header */}
      <PageHeader
        title="KB Bank Indonesia"
        subtitle="Performance Dashboard"
        unreadNotificationsCount={unreadNotificationsCount}
        onNotificationClick={onNotificationClick}
      />

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Top Section */}
            <div className="grid grid-cols-1 gap-6">
              {/* KPI Score Card */}
              <KPIScoreCard simulatedScore={simulatedScore} />
            </div>

            {/* Achievement Donut Charts */}
            <AchievementDonutCharts />

            {/* Achievement of Scope KPI */}
            <AchievementOfScopeKPI />

            {/* Movement of KPI Chart */}
            <MovementChart />
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Indicator KPI */}
            <IndicatorKPI />
            
            {/* Branch Rank Panel */}
            <BranchRankPanel />
          </div>
        </div>
      </div>
    </div>
  );
}