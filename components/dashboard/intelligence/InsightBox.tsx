import React from 'react';
import { Sparkles, Lightbulb, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/shadcn';

interface InsightBoxProps {
  competitorName: string;
}

const InsightBox: React.FC<InsightBoxProps> = ({ competitorName }) => {
  return (
    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-indigo-900 text-sm">AI 视觉洞察 (Visual Insights)</h3>
      </div>

      <div className="space-y-3">
        <div className="flex gap-3 items-start">
          <div className="mt-1 min-w-[16px]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white border border-indigo-200 text-[10px] font-bold text-indigo-600">1</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold">{competitorName}</span> 在主图中添加了 <span className="bg-yellow-100 text-yellow-800 px-1 rounded">"Best Seller"</span> 徽章，可能极大提升 CTR。
          </p>
        </div>
        <div className="flex gap-3 items-start">
           <div className="mt-1 min-w-[16px]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white border border-indigo-200 text-[10px] font-bold text-indigo-600">2</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            产品背景由纯白调整为 <span className="bg-slate-100 text-slate-700 px-1 rounded">生活场景图</span>，意在强化使用代入感。
          </p>
        </div>
        <div className="flex gap-3 items-start">
           <div className="mt-1 min-w-[16px]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white border border-indigo-200 text-[10px] font-bold text-indigo-600">3</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            同时检测到价格下调 15%，这是一个组合拳营销策略。
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-indigo-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold">
          <Lightbulb className="w-4 h-4" />
          建议动作：
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white h-8 text-xs">
          优化我方主图 <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default InsightBox;
