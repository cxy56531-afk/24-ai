import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, Layers } from 'lucide-react';
import { Competitor } from '../../../types';
import { getCompetitors } from '../../../lib/api';
import CompetitorCard from './CompetitorCard';
import DiffModal from './DiffModal';
import { Button } from '../../ui/shadcn';
import LoadingSkeleton from '../../LoadingSkeleton';
import EmptyState from '../../EmptyState';

const CompetitorGallery: React.FC = () => {
  const [items, setItems] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getCompetitors();
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCardClick = (item: Competitor) => {
    setSelectedCompetitor(item);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            竞品画廊 (Competitor Gallery)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            实时追踪 Top 50 竞品的视觉与价格策略变化
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Filter by keyword..."
               className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
             />
          </div>
          <Button variant="outline" size="icon" onClick={fetchItems}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline" className="hidden sm:flex">
            <Filter className="w-4 h-4 mr-2" /> 筛选
          </Button>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <LoadingSkeleton layout="grid" count={8} height="aspect-[3/4]" />
      ) : items.length === 0 ? (
        <EmptyState 
          icon={Layers} 
          title="暂无竞品数据" 
          description="请添加监控对象以开始追踪。" 
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
          {items.map(item => (
            <CompetitorCard 
              key={item.id} 
              competitor={item} 
              onClick={() => handleCardClick(item)} 
            />
          ))}
        </div>
      )}

      {/* Interactive Modal */}
      <DiffModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        competitor={selectedCompetitor}
      />
    </div>
  );
};

export default CompetitorGallery;
