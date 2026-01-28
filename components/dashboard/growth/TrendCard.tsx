import React from 'react';
import { Video, Sparkles, TrendingUp } from 'lucide-react';
import { Trend } from '../../../types';
import { Button, Card } from '../../ui/shadcn';

interface TrendCardProps {
  trend: Trend;
  onGenerate: (trend: Trend) => void;
}

const TrendCard: React.FC<TrendCardProps> = ({ trend, onGenerate }) => {
  const getPlatformColor = (p: string) => {
    switch (p) {
      case 'tiktok': return 'bg-black text-white';
      case 'douyin': return 'bg-slate-900 text-white'; // Douyin black
      case 'instagram': return 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 group flex flex-col h-full">
      {/* Header Visual */}
      <div className="h-24 bg-slate-50 relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600 via-indigo-400 to-slate-100"></div>
        
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getPlatformColor(trend.platform)}`}>
            {trend.platform}
          </span>
        </div>
        
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-slate-700 shadow-sm">
          <TrendingUp className="w-3 h-3 text-red-500" />
          {trend.heat} Heat
        </div>

        <div className="absolute -bottom-6 right-4 rotate-12 opacity-10 group-hover:opacity-20 transition-opacity">
           <Video className="w-24 h-24 text-purple-600" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
          {trend.tag}
        </h3>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trend.relatedKeywords.map(kw => (
            <span key={kw} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
              {kw}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Button 
            onClick={() => onGenerate(trend)}
            className="w-full bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            为我生成脚本
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TrendCard;
