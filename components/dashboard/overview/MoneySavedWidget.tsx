import React, { useEffect, useState } from 'react';
import { TrendingUp, ShieldAlert, Ban, DollarSign } from 'lucide-react';
import { Card } from '../../ui/shadcn';
import { MoneySavedSummary } from '../../../types';
import { getDashboardSummary } from '../../../lib/api';
import ErrorState from '../../ErrorState';
import LoadingSkeleton from '../../LoadingSkeleton';

const MoneySavedWidget: React.FC = () => {
  const [data, setData] = useState<MoneySavedSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getDashboardSummary();
      setData(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center">
        <div className="h-4 bg-slate-100 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-10 bg-slate-100 rounded w-2/3 mb-8 animate-pulse"></div>
        <LoadingSkeleton count={3} height="h-8" />
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-6 h-full flex flex-col items-center justify-center">
        <ErrorState onRetry={fetchData} />
      </Card>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'hijack': return <ShieldAlert className="w-4 h-4" />;
      case 'ads': return <Ban className="w-4 h-4" />;
      case 'pricing': return <DollarSign className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'hijack': return '跟卖拦截止损';
      case 'ads': return '广告熔断止损';
      case 'pricing': return '价格防御止损';
      default: return cat;
    }
  };

  const getBarColor = (cat: string) => {
    switch (cat) {
      case 'hijack': return 'bg-orange-500';
      case 'ads': return 'bg-red-500';
      case 'pricing': return 'bg-emerald-500';
      default: return 'bg-indigo-500';
    }
  };

  return (
    <Card className="h-full overflow-hidden border-0 shadow-md ring-1 ring-slate-100 relative bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4">
        <ShieldAlert className="w-64 h-64 text-emerald-600" />
      </div>

      <div className="p-6 relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            本月自动止损 (Money Saved)
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(data.totalAmount, data.currency)}
            </span>
          </div>
          <p className="text-sm text-emerald-600 font-medium mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            比上月增长 12.5%
          </p>
        </div>

        <div className="flex-1 space-y-5">
          {data.breakdown.map((item, idx) => (
            <div key={idx} className="group">
              <div className="flex justify-between items-center mb-1.5 text-sm">
                <span className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className={`p-1 rounded-md bg-slate-100 text-slate-500 group-hover:text-white group-hover:${getBarColor(item.category)} transition-colors`}>
                    {getCategoryIcon(item.category)}
                  </span>
                  {getCategoryName(item.category)}
                </span>
                <span className="font-bold text-slate-800">{formatCurrency(item.amount, data.currency)}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getBarColor(item.category)} transition-all duration-1000 ease-out`} 
                  style={{ width: `${(item.amount / data.totalAmount) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-400 mt-1 text-right">
                触发 {item.count} 次
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            查看详细财务分析报告 &rarr;
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MoneySavedWidget;
