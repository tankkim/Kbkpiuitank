import { ChevronLeft, ChevronRight, Bell, Moon, Globe, Lock, LogOut, Building2, MapPin, Award } from 'lucide-react';
import { currentEmployee } from '../../data/myPerformanceData';
import { calculateOverallPerformance } from '../../data/individualKPIData';
import { myDetailedKPIMetrics } from '../../data/individualKPIData';

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const overallPerf = calculateOverallPerformance(myDetailedKPIMetrics);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="text-center pb-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
            {currentEmployee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="text-xl mb-1">{currentEmployee.name}</h2>
          <p className="text-sm opacity-90">{currentEmployee.position}</p>
          <p className="text-xs opacity-75 mt-1">{currentEmployee.nip}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Branch Info */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm text-gray-700">🏢 Branch Information</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-600">Branch</span>
              <span className="text-sm text-gray-900">{currentEmployee.branch}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-gray-600">Region</span>
              <span className="text-sm text-gray-900">{currentEmployee.region}</span>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm text-gray-700">📊 Performance Summary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <span className="text-xs text-gray-600">Overall Achievement</span>
              <span className="text-base text-blue-600">{overallPerf.overallAchievement}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <span className="text-xs text-gray-600">YTD Points</span>
              <span className="text-base text-green-600">6,450 pts</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg text-green-600">{overallPerf.excellentCount}</div>
                <div className="text-[9px] text-gray-600">Excellent</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-lg text-blue-600">{overallPerf.goodCount}</div>
                <div className="text-[9px] text-gray-600">Good</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="text-lg text-yellow-600">{overallPerf.warningCount}</div>
                <div className="text-[9px] text-gray-600">Warning</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="text-lg text-red-600">{overallPerf.criticalCount}</div>
                <div className="text-[9px] text-gray-600">Critical</div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm text-gray-700">⚙️ Settings</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">Notification Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">Dark Mode</span>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow transition-transform"></div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">Language</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">English</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">Change Password</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onBack}
          className="w-full bg-red-50 border-2 border-red-200 text-red-600 py-3 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>LOGOUT</span>
        </button>

        {/* Version */}
        <div className="text-center text-xs text-gray-500">
          <p>KB Indonesia KPI Mobile App</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}