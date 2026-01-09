import { useState } from 'react';
import { HomeScreen } from './mobile/HomeScreen';
import { PerformanceScreen } from './mobile/PerformanceScreen';
import { KPIDetailScreen } from './mobile/KPIDetailScreen';
import { NotificationsScreen } from './mobile/NotificationsScreen';
import { SimulatorScreen } from './mobile/SimulatorScreen';
import { ProfileScreen } from './mobile/ProfileScreen';
import { RankingsScreen } from './mobile/RankingsScreen';
import { VideoScreen } from './mobile/VideoScreen';
import { TodoScreen } from './mobile/TodoScreen';
import { BottomNav } from './mobile/BottomNav';
import { myDetailedKPIMetrics } from '../data/individualKPIData';
import { myComments } from '../data/communicationData';

export function MobileApp() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'excellent' | 'good' | 'warning' | 'critical'>('all');
  const [simulatedScore, setSimulatedScore] = useState(11.66);

  const unreadNotificationsCount = myComments.filter(c => !c.isRead).length;

  const handleNavigate = (screen: string, filter?: string) => {
    setActiveScreen(screen);
    setSelectedKPI(null);
    if (filter) {
      setFilterStatus(filter as any);
    }
  };

  const handleKPIClick = (kpiName: string) => {
    setSelectedKPI(kpiName);
    setActiveScreen('kpi-detail');
  };

  const handleBackFromKPIDetail = () => {
    setSelectedKPI(null);
    setActiveScreen('performance');
  };

  // Get selected KPI data
  const selectedKPIData = selectedKPI 
    ? myDetailedKPIMetrics.find(k => k.kpiName === selectedKPI)
    : null;

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="relative">
        {activeScreen === 'home' && (
          <HomeScreen 
            onNavigate={handleNavigate}
            notificationCount={unreadNotificationsCount}
            simulatedScore={simulatedScore}
          />
        )}

        {activeScreen === 'performance' && (
          <PerformanceScreen 
            onBack={() => handleNavigate('home')}
            onKPIClick={handleKPIClick}
            filterStatus={filterStatus}
          />
        )}

        {activeScreen === 'kpi-detail' && selectedKPIData && (
          <KPIDetailScreen
            kpiName={selectedKPI!}
            kpiData={selectedKPIData}
            onBack={handleBackFromKPIDetail}
          />
        )}

        {activeScreen === 'notifications' && (
          <NotificationsScreen 
            onBack={() => handleNavigate('home')} 
            onKPIClick={handleKPIClick}
          />
        )}

        {activeScreen === 'simulator' && (
          <SimulatorScreen 
            onBack={() => handleNavigate('home')}
            onScoreChange={setSimulatedScore}
          />
        )}

        {activeScreen === 'rankings' && (
          <RankingsScreen onBack={() => handleNavigate('home')} />
        )}

        {activeScreen === 'profile' && (
          <ProfileScreen 
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeScreen === 'videos' && (
          <VideoScreen onBack={() => handleNavigate('home')} />
        )}

        {activeScreen === 'todos' && (
          <TodoScreen onBack={() => handleNavigate('home')} />
        )}
      </div>

      {/* Bottom Navigation */}
      {activeScreen !== 'kpi-detail' && (
        <BottomNav 
          activeScreen={activeScreen}
          onNavigate={handleNavigate}
          notificationCount={unreadNotificationsCount}
        />
      )}
    </div>
  );
}