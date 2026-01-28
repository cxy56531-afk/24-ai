import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Eye, Camera } from 'lucide-react';
import { Competitor } from '../../../types';
import { Card, Badge, Button } from '../../ui/shadcn';

interface CompetitorCardProps {
  competitor: Competitor;
  onClick: () => void;
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, onClick }) => {
  const hasChange = !!competitor.images.yesterday; // Mock logic: if yesterday image exists, assume change

  return (
    <Card 
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200 hover:border-indigo-200"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        <img 
          src={competitor.images.today} 
          alt={competitor.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button size="sm" className="bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm pointer-events-none">
            <Eye className="w-4 h-4 mr-2" />
            查看视觉对比
          </Button>
        </div>

        {/* Change Badge */}
        {hasChange && (
          <div className="absolute top-3 left-3">
             <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-sm flex items-center gap-1 pl-1.5 pr-2 py-0.5">
               <Camera className="w-3 h-3" />
               视觉变更
             </Badge>
          </div>
        )}

        {/* Platform Badge (Mock) */}
        <div className="absolute top-3 right-3">
           <div className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase text-slate-600">
             Amazon
           </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 h-10 mb-3 group-hover:text-indigo-600 transition-colors">
          {competitor.title}
        </h3>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">当前价格</div>
            <div className="font-bold text-lg text-slate-900 leading-none">
              {competitor.price.currency === 'USD' ? '$' : '¥'}
              {competitor.price.current}
            </div>
          </div>

          {/* Mini Trend Chart / Indicator */}
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded ${
            competitor.price.diffRate < 0 ? 'bg-emerald-50 text-emerald-700' : 
            competitor.price.diffRate > 0 ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'
          }`}>
            {competitor.price.diffRate < 0 ? <ArrowDownRight className="w-3 h-3 mr-1" /> :
             competitor.price.diffRate > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> :
             <Minus className="w-3 h-3 mr-1" />}
            {Math.abs(competitor.price.diffRate * 100).toFixed(0)}%
          </div>
        </div>
        
        {/* Mock Sparkline visual */}
        <div className="mt-3 flex gap-0.5 items-end h-6 opacity-30 group-hover:opacity-60 transition-opacity">
          {[40, 60, 45, 70, 50, 65, 80].map((h, i) => (
            <div key={i} className="flex-1 bg-indigo-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CompetitorCard;
