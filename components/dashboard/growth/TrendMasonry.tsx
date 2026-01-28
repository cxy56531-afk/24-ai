import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, Search, TrendingUp } from 'lucide-react';
import { Trend } from '../../../types';
import { getTrends } from '../../../lib/api';
import TrendCard from './TrendCard';
import ScriptResultModal from './ScriptResultModal';
import TrendRadar from './TrendRadar';
import { Button } from '../../ui/shadcn';
import LoadingSkeleton from '../../LoadingSkeleton';
import EmptyState from '../../EmptyState';

const TrendMasonry: React.FC = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const data = await getTrends();
      setTrends(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div className="h-full flex flex-col">
      
      {/* 1. Radar Section */}
      {!loading && trends.length > 0 && <TrendRadar trends={trends} />}

      {/* 2. Filters & Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">趋势瀑布流 (Trend Feed)</h2>
          <p className="text-sm text-slate-500">
            挖掘全网潜力爆款，一键生成适配你产品的短视频脚本。
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tags..."
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button variant="outline" onClick={fetchTrends} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>
      </div>

      {/* 3. Grid Content */}
      {loading ? (
        <LoadingSkeleton layout="grid" count={8} height="h-64" />
      ) : trends.length === 0 ? (
        <EmptyState 
          icon={TrendingUp} 
          title="暂无趋势数据" 
          description="当前没有任何热点趋势数据。"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {trends.map(trend => (
            <TrendCard 
              key={trend.id} 
              trend={trend} 
              onGenerate={setSelectedTrend} 
            />
          ))}
        </div>
      )}

      {/* 4. Generation Modal */}
      <ScriptResultModal 
        isOpen={!!selectedTrend}
        onClose={() => setSelectedTrend(null)}
        trend={selectedTrend}
      />
    </div>
  );
};

export default TrendMasonry;
