import React, { useState } from 'react';
import { ShieldAlert, UserX, MessageSquareWarning, Search, ChevronRight } from 'lucide-react';
import { Threat, ThreatType } from '../../../types';
import { cn } from '../../ui/shadcn';
import StatusBadge from '../../StatusBadge';
import EmptyState from '../../EmptyState';
import LoadingSkeleton from '../../LoadingSkeleton';

interface ThreatListProps {
  threats: Threat[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isLoading: boolean;
}

const ThreatList: React.FC<ThreatListProps> = ({ threats, selectedId, onSelect, isLoading }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const getIcon = (type: ThreatType) => {
    switch (type) {
      case 'hijack': return <UserX className="w-5 h-5 text-red-500" />;
      case 'negative_review': return <MessageSquareWarning className="w-5 h-5 text-orange-500" />;
      default: return <ShieldAlert className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredThreats = threats.filter(t => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch = t.targetAsin?.toLowerCase().includes(search.toLowerCase()) || 
                          t.hijackerName?.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Header & Filter */}
      <div className="p-4 border-b border-slate-100 space-y-3">
        <h2 className="font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-indigo-600" />
          威胁列表 (Threats)
        </h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索 ASIN 或店铺名..." 
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
           {['all', 'hijack', 'negative_review', 'ip'].map(type => (
             <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-3 py-1 text-xs rounded-full border whitespace-nowrap transition-colors",
                  filterType === type 
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium" 
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                )}
             >
               {type === 'all' ? '全部' : type === 'hijack' ? '跟卖' : type === 'negative_review' ? '差评' : '侵权'}
             </button>
           ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4">
            <LoadingSkeleton count={4} height="h-20" />
          </div>
        ) : filteredThreats.length === 0 ? (
          <EmptyState 
            icon={ShieldAlert} 
            title="暂无匹配的风险项" 
            className="border-none bg-transparent py-10"
          />
        ) : (
          <div className="divide-y divide-slate-50">
            {filteredThreats.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={cn(
                  "p-4 cursor-pointer hover:bg-slate-50 transition-all border-l-4 group relative",
                  selectedId === item.id 
                    ? "bg-indigo-50/50 border-indigo-500" 
                    : item.level === 'critical' ? "border-red-500" : "border-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getIcon(item.type)}
                    <span className="font-bold text-slate-900 text-sm">
                      {item.type === 'hijack' ? '跟卖告警' : '差评预警'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.detectedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>

                <div className="text-sm text-slate-600 mb-2 line-clamp-2">
                  {item.targetAsin && <span className="font-mono bg-slate-100 px-1 rounded mr-1">{item.targetAsin}</span>}
                  {item.type === 'hijack' ? `发现新卖家 ${item.hijackerName}` : '检测到 1 星负面评价'}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                     <StatusBadge level={item.level} />
                     <StatusBadge 
                        text={item.status === 'detected' ? '待处理' : '已解决'} 
                        className={item.status === 'detected' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}
                     />
                  </div>
                  {selectedId === item.id && (
                    <ChevronRight className="w-4 h-4 text-indigo-400 animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatList;
