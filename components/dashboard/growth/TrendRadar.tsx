import React from 'react';
import { TrendingUp, Music, Hash, Flame } from 'lucide-react';
import { Trend } from '../../../types';

interface TrendRadarProps {
  trends: Trend[];
}

const TrendRadar: React.FC<TrendRadarProps> = ({ trends }) => {
  // Mock aggregation for the radar view
  const topHashtags = trends.slice(0, 3);
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-purple-100 rounded-lg text-purple-600">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">实时热点雷达 (Trend Radar)</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {/* Metric Card 1: Heat Velocity */}
        <div className="min-w-[200px] p-4 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">全网热度指数</span>
          </div>
          <div className="text-3xl font-black mb-1">98.4</div>
          <div className="text-xs text-purple-200">+12% vs 昨小时</div>
        </div>

        {/* Top Trends Chips */}
        {topHashtags.map((trend, idx) => (
          <div key={trend.id} className="min-w-[240px] p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between group cursor-pointer hover:border-purple-300 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${trend.platform === 'tiktok' ? 'bg-black text-white' : 'bg-slate-900 text-white'}`}>
                   <Hash className="w-3 h-3" />
                </div>
                <span className="font-bold text-slate-800 text-sm truncate max-w-[120px]">{trend.tag}</span>
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Top {idx + 1}
              </span>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Music className="w-3 h-3" />
                <span className="truncate">{trend.bgm}</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${trend.heat}%` }}></div>
              </div>
            </div>
          </div>
        ))}

        {/* Action Card */}
        <div className="min-w-[150px] flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
          <span className="text-sm font-medium">查看更多趋势 &rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default TrendRadar;
