import React, { useEffect, useState } from 'react';
import { Shield, Eye, Wallet, TrendingUp, MoreHorizontal, Check, Clock, ExternalLink } from 'lucide-react';
import { Card } from '../../ui/shadcn';
import { FeedItem } from '../../../types';
import { getLiveFeed } from '../../../lib/api';
import { MODULE_THEME, getModuleTheme } from '../../../lib/theme';
import LoadingSkeleton from '../../LoadingSkeleton';
import EmptyState from '../../EmptyState';

const LiveActionFeed: React.FC = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getLiveFeed();
        setFeed(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'security': return <Shield className="w-4 h-4 text-white" />;
      case 'intel': return <Eye className="w-4 h-4 text-white" />;
      case 'finance': return <Wallet className="w-4 h-4 text-white" />;
      case 'growth': return <TrendingUp className="w-4 h-4 text-white" />;
      default: return <Clock className="w-4 h-4 text-white" />;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000); // minutes
    if (diff < 1) return '刚刚';
    if (diff < 60) return `${diff}分钟前`;
    return `${Math.floor(diff / 60)}小时前`;
  };

  if (loading) {
    return (
      <Card className="h-full p-6 bg-white border-0 shadow-md ring-1 ring-slate-100 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 bg-slate-100 rounded w-32 animate-pulse"></div>
        </div>
        <LoadingSkeleton count={3} height="h-20" />
      </Card>
    );
  }

  return (
    <Card className="h-full p-0 bg-white border-0 shadow-md ring-1 ring-slate-100 flex flex-col">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 rounded-t-xl">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            实时战况 (Live Action)
          </h3>
          <p className="text-xs text-slate-500 mt-1">AI 正在后台自动处理以下事件</p>
        </div>
        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide max-h-[500px] lg:max-h-none">
        {feed.length === 0 ? (
           <EmptyState 
             icon={Check} 
             title="暂无新事件" 
             description="系统暂无活动，请稍后再查看。"
             className="border-none bg-transparent"
           />
        ) : (
          feed.map((item, index) => {
            const theme = getModuleTheme(item.module);
            return (
              <div key={item.id} className="relative group">
                {/* Connector Line */}
                {index !== feed.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-[-32px] w-0.5 bg-slate-100 group-hover:bg-slate-200 transition-colors"></div>
                )}
                
                <div className="flex gap-4 items-start">
                  {/* Icon */}
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0 z-10
                    ${theme.iconBg} ${theme.shadow}
                  `}>
                    {getModuleIcon(item.module)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-full">
                        {formatTime(item.time)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.message}
                    </p>

                    {/* Tags */}
                    {item.tags && (
                      <div className="flex gap-1 mt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {item.actions && item.actions.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {item.actions.map((action, idx) => (
                          <button 
                            key={idx}
                            className={`
                              text-xs px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1
                              ${action.isPrimary || idx === 0
                                ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' 
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}
                            `}
                          >
                            {action.type === 'link' ? <ExternalLink className="w-3 h-3" /> : null}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default LiveActionFeed;
