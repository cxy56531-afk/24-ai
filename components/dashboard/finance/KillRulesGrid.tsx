import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import KillRuleCard from './KillRuleCard';
import { KillRule } from '../../../types';
import { getKillRules, updateKillRule } from '../../../lib/api';
import LoadingSkeleton from '../../LoadingSkeleton';

const KillRulesGrid: React.FC = () => {
  const [rules, setRules] = useState<KillRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const data = await getKillRules();
      setRules(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    // Optimistic UI update
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled } : r));
    try {
      await updateKillRule(id, enabled);
    } catch (e) {
      // Revert if failed
      console.error(e);
      setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !enabled } : r));
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Zap className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">熔断规则引擎 (Kill-Switch Engine)</h2>
          <p className="text-sm text-slate-500">配置自动化止损策略，所有高风险动作将请求人工确认。</p>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton layout="grid" count={4} height="h-64" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rules.map(rule => (
            <KillRuleCard 
              key={rule.id} 
              rule={rule} 
              onToggle={handleToggle} 
            />
          ))}
          
          {/* Add New Placeholder */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-slate-50 transition-all cursor-pointer h-full min-h-[250px]">
            <span className="text-4xl mb-2 font-thin">+</span>
            <span className="font-medium text-sm">新建熔断规则</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default KillRulesGrid;
