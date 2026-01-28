import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { Card } from '../../ui/shadcn';
import { PlatformType } from '../../../types';

const MagicInput: React.FC = () => {
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<{ name: string; icon: string; type: PlatformType } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  // Auto-detect platform
  useEffect(() => {
    if (url.match(/amazon\.(com|cn|co\.uk|jp)/i)) {
      setDetectedPlatform({ name: 'Amazon', icon: 'amazon', type: 'crossborder' });
    } else if (url.match(/(taobao|tmall)\.com/i)) {
      setDetectedPlatform({ name: 'Taobao/Tmall', icon: 'taobao', type: 'domestic' });
    } else if (url.match(/(douyin|tiktok)\.com/i)) {
      setDetectedPlatform({ name: 'TikTok/Douyin', icon: 'tiktok', type: 'crossborder' });
    } else if (url.match(/shopify\.com/i)) {
      setDetectedPlatform({ name: 'Shopify', icon: 'shopify', type: 'independent' });
    } else {
      setDetectedPlatform(null);
    }
  }, [url]);

  const handleAnalyze = async () => {
    if (!url) return;
    setIsAnalyzing(true);
    setResult(null);

    // Simulate API Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock Result based on platform
      if (detectedPlatform?.name === 'Amazon') {
        setResult({
          score: 85,
          strategies: [
            { title: '跟卖自动驱逐', type: 'security', desc: '检测到高频跟卖风险，建议开启自动发函。' },
            { title: '视觉情报监控', type: 'intel', desc: '该类目竞品主图变更频繁，建议监控 Top 10。' }
          ]
        });
      } else {
        setResult({
          score: 92,
          strategies: [
            { title: '价格熔断保护', type: 'finance', desc: '建议设置 ROI < 0.8 时自动暂停投放。' },
            { title: '爆款脚本生成', type: 'growth', desc: '检测到相关话题热度上升，立即生成短视频脚本。' }
          ]
        });
      }
    }, 1500);
  };

  return (
    <div className="w-full mb-8">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-xl shadow-lg border border-slate-100 p-2 flex items-center gap-4 transition-all">
          <div className="pl-4 text-slate-400">
            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            ) : detectedPlatform ? (
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded text-sm uppercase">
                {detectedPlatform.name}
              </span>
            ) : (
              <Sparkles className="w-6 h-6 text-indigo-500" />
            )}
          </div>
          
          <input 
            type="text" 
            className="flex-1 h-12 outline-none text-slate-800 placeholder:text-slate-400 font-medium"
            placeholder="粘贴任意商品/店铺链接 (淘宝/亚马逊/抖音)... AI 自动识别并匹配策略"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          
          <button 
            onClick={handleAnalyze}
            disabled={!url || isAnalyzing}
            className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
          >
            {isAnalyzing ? '分析中...' : 'AI 诊断'}
            {!isAnalyzing && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Analysis Result Card */}
      {result && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  分析完成：该链接适合以下 AI 策略
                </h3>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  {result.strategies.map((strat: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800">{strat.title}</span>
                        <div className={`w-2 h-2 rounded-full ${strat.type === 'security' ? 'bg-red-500' : 'bg-blue-500'}`} />
                      </div>
                      <p className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">
                        {strat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Match Score</div>
                <div className="text-4xl font-black text-indigo-600">{result.score}%</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MagicInput;
