import React, { useState, useEffect } from 'react';
import { X, Copy, Image as ImageIcon, Sparkles, Loader2, AlertTriangle, Check } from 'lucide-react';
import { Trend, ScriptCard } from '../../../types';
import { generateScripts } from '../../../lib/api';
import { Button, Card } from '../../ui/shadcn';

interface ScriptResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  trend: Trend | null;
}

const ScriptResultModal: React.FC<ScriptResultModalProps> = ({ isOpen, onClose, trend }) => {
  const [loading, setLoading] = useState(false);
  const [scripts, setScripts] = useState<ScriptCard[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && trend) {
      setLoading(true);
      setScripts([]);
      
      // Simulate API call with the selected trend
      generateScripts(trend.id, 'My Current Product')
        .then(data => {
          // Mocking 3 variations for the demo
          const variations = [
            { ...data[0], id: 'v1', title: '脚本 A: 强Hook反转流' },
            { ...data[0], id: 'v2', title: '脚本 B: 沉浸式ASMR展示', hook: 'Don\'t say a word, just watch.', outline: ['Silent unboxing', 'Close up of texture', 'Sound of usage', 'End screen'] },
            { ...data[0], id: 'v3', title: '脚本 C: 痛点共鸣流', hook: 'Are you tired of [Problem]?', outline: ['Show struggle', 'Introduce product', 'Happy outcome', 'Call to action'] },
          ];
          setScripts(variations);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, trend]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenCover = () => {
    alert('🎨 AI 正在生成封面图... (Mock Function)');
  };

  if (!isOpen || !trend) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-50 rounded-xl shadow-2xl w-full max-w-6xl mx-4 h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI 脚本工坊 (Script Workshop)
            </h2>
            <p className="text-sm text-slate-500">
              Based on trend: <span className="font-bold text-purple-700">{trend.tag}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-white p-4 rounded-full shadow-lg">
                  <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                </div>
              </div>
              <p className="text-slate-600 font-medium animate-pulse">正在解析热点逻辑，生成爆款脚本...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scripts.map((script, idx) => (
                <Card key={script.id} className="flex flex-col h-full border-t-4 border-t-purple-500 shadow-md">
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-slate-900">{script.title}</h3>
                      <div className="bg-purple-50 text-purple-700 text-xs font-bold px-2 py-1 rounded">
                        Est. {script.estimatedViews}
                      </div>
                    </div>
                    
                    {/* Hook Section */}
                    <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Golden Hook (3s)</span>
                      <p className="text-sm font-medium text-slate-800 italic">"{script.hook}"</p>
                    </div>

                    {/* Outline */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Scene Outline</span>
                      <ul className="space-y-2">
                        {script.outline.map((step, i) => (
                          <li key={i} className="flex gap-2 text-sm text-slate-600">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{i+1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {script.hashtags.map(tag => (
                        <span key={tag} className="text-xs text-blue-500 hover:underline cursor-pointer">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Risk Tips */}
                    {script.riskTips.length > 0 && (
                      <div className="mt-4 p-2 bg-orange-50 border border-orange-100 rounded text-xs text-orange-800 flex items-start gap-2">
                         <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                         <div>
                           {script.riskTips.map((tip, i) => <div key={i}>{tip}</div>)}
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-white"
                      onClick={() => handleCopy(JSON.stringify(script, null, 2), script.id)}
                    >
                      {copiedId === script.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span className="ml-2">{copiedId === script.id ? '已复制' : '复制脚本'}</span>
                    </Button>
                    <Button variant="outline" className="px-3 bg-white" onClick={handleGenCover}>
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
          <div>
            AI 模型: <span className="font-mono font-semibold text-slate-700">Creative-V3</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>关闭</Button>
            <Button disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              重新生成
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptResultModal;
