import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Home } from './Home';
import { MyPerformance } from './MyPerformance';
import { Scoreboard } from './Scoreboard';
import { Achievement } from './Achievement';
import { AllKPIResult } from './AllKPIResult';
import { RegionComparison } from './RegionComparison';
import { BranchComparison } from './BranchComparison';
import { AdminDashboard } from './admin/AdminDashboard';
import { PositionManagement } from './admin/PositionManagement';
import { KPIStructureManagement } from './admin/KPIStructureManagement';
import { EmployeeManagement } from './admin/EmployeeManagement';
import { NotificationCenter } from './NotificationCenter';
import { Calculator, X } from 'lucide-react';
import { KPISimulator } from './KPISimulator';
import { myNotifications } from '../data/communicationData';

export function DesktopApp() {
  const [activePage, setActivePage] = useState('Home');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(11.66);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(myNotifications);

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleAdminNavigate = (page: string) => {
    setActivePage(`Admin:${page}`);
  };

  const handleAdminBack = () => {
    setActivePage('Admin');
  };

  const renderPage = () => {
    // Admin Pages
    if (activePage === 'Admin') {
      return <AdminDashboard onNavigate={handleAdminNavigate} unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
    }
    if (activePage === 'Admin:positions') {
      return <PositionManagement onBack={handleAdminBack} unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
    }
    if (activePage === 'Admin:kpi') {
      return <KPIStructureManagement onBack={handleAdminBack} unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
    }
    if (activePage === 'Admin:employees') {
      return <EmployeeManagement onBack={handleAdminBack} unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
    }

    // Regular Pages
    switch (activePage) {
      case 'Home': return <Home simulatedScore={simulatedScore} unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
      case 'My Performance': return <MyPerformance unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
      case 'Scorecard': return <Scoreboard unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
      case 'Achievement': return <Achievement unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
      case 'All KPI Result': return <AllKPIResult unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
      case 'Region Comparison': return <RegionComparison unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
      case 'Branch Comparison': return <BranchComparison unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
      default: return <Home simulatedScore={simulatedScore} unreadNotificationsCount={unreadNotificationsCount} onNotificationClick={() => setIsNotificationOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activePage={activePage} 
        onPageChange={setActivePage}
      />
      <main className="flex-1 overflow-auto relative">
        {renderPage()}
        
        {/* Floating KPI Simulator Button */}
        <button
          onClick={() => setIsSimulatorOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95 z-40 border-2 border-white/20"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Calculator className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl transform group-hover:translate-x-0 translate-x-2">
            KPI Simulator
          </span>
          <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20"></div>
        </button>

        {/* Simulator Modal */}
        {isSimulatorOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-auto shadow-2xl border border-gray-200">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl">KPI Simulator</h2>
                    <p className="text-xs opacity-90 mt-1">Test different scenarios to optimize your performance</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSimulatorOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <KPISimulator />
            </div>
          </div>
        )}

        {/* Notification Center */}
        {isNotificationOpen && (
          <NotificationCenter 
            notifications={notifications} 
            onClose={() => setIsNotificationOpen(false)}
            onMarkAsRead={handleMarkAsRead} 
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        )}
      </main>
    </div>
  );
}
