import React from 'react';
import { Power, Shield, Activity, DollarSign, ArrowRight } from 'lucide-react';
import { KillRule } from '../../../types';
import { cn } from '../../ui/shadcn';

interface KillRuleCardProps {
  rule: KillRule;
  onToggle: (id: string, enabled: boolean) => void;
}

const KillRuleCard: React.FC<KillRuleCardProps> = ({ rule, onToggle }) => {
  return (
    <div className={cn(
      "relative rounded-xl border p-5 transition-all duration-300 flex flex-col h-full group",
      rule.enabled 
        ? "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200" 
        : "bg-slate-50 border-slate-200 opacity-75 grayscale-[0.5]"
    )}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            rule.enabled ? "bg-indigo-50 text-indigo-600" : "bg-slate-200 text-slate-500"
          )}>
            {rule.ifCondition.metric === 'acos' ? <DollarSign className="w-5 h-5" /> :
             rule.ifCondition.metric === 'stock' ? <Activity className="w-5 h-5" /> :
             <Shield className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">{rule.name}</h3>
            <p className="text-xs text-slate-500 mt-1">自动执行需人工复核</p>
          </div>
        </div>

        {/* Big Toggle */}
        <button
          onClick={() => onToggle(rule.id, !rule.enabled)}
          className={cn(
            "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
            rule.enabled ? "bg-emerald-500" : "bg-slate-300"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              rule.enabled ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>

      {/* Logic Viz */}
      <div className="flex-1 space-y-3 mb-4">
        {/* IF Block */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">IF Condition</div>
           <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
             <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm font-mono">
               {rule.ifCondition.metric.toUpperCase()}
             </span>
             <span className="text-indigo-500">{rule.ifCondition.operator}</span>
             <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm font-mono text-indigo-600">
               {rule.ifCondition.value}
             </span>
           </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-1 relative z-10">
          <div className="bg-white p-1 rounded-full border border-slate-100 shadow-sm text-slate-300">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* THEN Block */}
        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
           <div className="text-[10px] font-bold text-red-300 uppercase tracking-wider mb-1">THEN Action</div>
           <div className="text-sm font-bold text-red-700 flex items-center gap-1.5">
             <Power className="w-3.5 h-3.5" />
             {rule.thenAction.type === 'pause_campaign' ? '暂停推广计划' : 
              rule.thenAction.type === 'adjust_price' ? '触发价格保护' : '发送强提醒'}
           </div>
        </div>
      </div>

      {/* Footer Stat */}
      <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
        <span className="text-slate-400">本月触发</span>
        <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
          {rule.executionCount} 次
        </span>
      </div>
    </div>
  );
};

export default KillRuleCard;
