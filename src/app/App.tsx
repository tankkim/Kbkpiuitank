import { useState } from 'react';
import { DesktopApp } from './components/DesktopApp';
import { MobileApp } from './components/MobileApp';
import { Monitor, Smartphone } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');

  return (
    <div className="relative">
      {/* View Mode Toggle Button */}
      <div className="fixed bottom-4 left-4 z-[100] flex gap-2 bg-white rounded-xl shadow-2xl p-2 border-2 border-gray-200">
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            viewMode === 'mobile'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-sm">Mobile</span>
        </button>
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            viewMode === 'desktop'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="text-sm">Desktop</span>
        </button>
      </div>

      {/* Render Based on View Mode */}
      {viewMode === 'mobile' ? (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl">
          <MobileApp />
        </div>
      ) : (
        <DesktopApp />
      )}
    </div>
  );
}