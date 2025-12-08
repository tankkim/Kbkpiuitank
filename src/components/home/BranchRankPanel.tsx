import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function BranchRankPanel() {
  const [activeTab, setActiveTab] = useState<'branch' | 'region'>('branch');

  const branchData = {
    top5: [
      { rank: 1, name: 'Jakarta Gunung Sahari', score: '14.57', change: 'stay' },
      { rank: 2, name: 'Jakarta Saharjo', score: '13.68', change: 'stay' },
      { rank: 3, name: 'Samarinda', score: '12.65', change: 'up', value: 2 },
      { rank: 4, name: 'Batam', score: '13.36', change: 'stay' },
      { rank: 5, name: 'Pekanbaru', score: '12.25', change: 'up', value: 2 },
    ],
    bottom5: [
      { rank: 42, name: 'Banjarmasin', score: '9.42', change: 'stay' },
      { rank: 43, name: 'Sorong', score: '8.98', change: 'down', value: 1 },
      { rank: 44, name: 'Kedin', score: '8.51', change: 'down', value: 10 },
      { rank: 45, name: 'Jakarta Kebon Jeruk', score: '8.47', change: 'stay' },
      { rank: 46, name: 'Karawang', score: '8.26', change: 'down', value: 1 },
    ]
  };

  const regionData = [
    { rank: 1, name: 'Regional VI', score: '14.09', change: 'stay' },
    { rank: 2, name: 'Regional IV', score: '13.43', change: 'stay' },
    { rank: 3, name: 'Regional I', score: '13.24', change: 'stay' },
    { rank: 4, name: 'Regional VII', score: '13.17', change: 'up', value: 1 },
    { rank: 5, name: 'Regional V', score: '12.45', change: 'stay' },
    { rank: 6, name: 'Regional III', score: '12.22', change: 'down', value: 2 },
    { rank: 7, name: 'Regional II', score: '12.04', change: 'stay' },
  ];

  const RankChangeIcon = ({ change, value }: { change: string, value?: number }) => {
    if (change === 'stay') {
      return (
        <div className="flex items-center gap-1 text-gray-500">
          <Minus className="w-4 h-4" />
        </div>
      );
    } else if (change === 'up') {
      return (
        <div className="flex items-center gap-0.5 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-semibold">{value}</span>
        </div>
      );
    } else if (change === 'down') {
      return (
        <div className="flex items-center gap-0.5 text-red-600">
          <TrendingDown className="w-4 h-4" />
          <span className="text-xs font-semibold">{value}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 lg:sticky lg:top-6 h-fit">
      {/* Branch Rank Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Selector */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('branch')}
            className={`flex-1 px-4 py-2.5 text-sm transition-colors ${
              activeTab === 'branch'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Branch
          </button>
          <button
            onClick={() => setActiveTab('region')}
            className={`flex-1 px-4 py-2.5 text-sm transition-colors ${
              activeTab === 'region'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Region
          </button>
        </div>

        {/* M&D Tab Header */}
        <div className="bg-[#2c5282] text-white px-4 py-1.5 text-xs">
          M&D
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'branch' ? (
            <>
              {/* Branch Rank Title */}
              <h4 className="text-sm mb-3 text-gray-800">Branch Rank</h4>

              {/* Top 5 Branch */}
              <div className="mb-4">
                <h5 className="text-sm text-orange-600 mb-3">Top 5 Branch</h5>
                <div className="space-y-2.5">
                  {branchData.top5.map((branch, index) => (
                    <div key={index} className="flex items-center gap-3 text-xs">
                      <div className="w-10 flex justify-center">
                        <RankChangeIcon change={branch.change} value={branch.value} />
                      </div>
                      <div className="flex-1">
                        <div className="text-orange-600">Rank {branch.rank}</div>
                        <div className="text-gray-900">{branch.name}</div>
                      </div>
                      <div className="text-gray-600 text-right">{branch.score} point</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom 5 Branch */}
              <div>
                <h5 className="text-sm text-orange-600 mb-3">Bottom 5 Branch</h5>
                <div className="space-y-2.5">
                  {branchData.bottom5.map((branch, index) => (
                    <div key={index} className="flex items-center gap-3 text-xs">
                      <div className="w-10 flex justify-center">
                        <RankChangeIcon change={branch.change} value={branch.value} />
                      </div>
                      <div className="flex-1">
                        <div className="text-orange-600">Rank {branch.rank}</div>
                        <div className="text-gray-900">{branch.name}</div>
                      </div>
                      <div className="text-gray-600 text-right">{branch.score} point</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Region Rank Title */}
              <h4 className="text-sm mb-3 text-gray-800">Region Rank</h4>

              {/* All Regions */}
              <div className="space-y-2.5">
                {regionData.map((region, index) => (
                  <div key={index} className="flex items-center gap-3 text-xs">
                    <div className="w-10 flex justify-center">
                      <RankChangeIcon change={region.change} value={region.value} />
                    </div>
                    <div className="flex-1">
                      <div className="text-orange-600">Rank {region.rank}</div>
                      <div className="text-gray-900">{region.name}</div>
                    </div>
                    <div className="text-gray-600 text-right">{region.score} point</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}