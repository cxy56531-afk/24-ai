import React from 'react';
import { Button } from 'antd';
import { ShieldCheck, ArrowRight, Zap, BarChart3, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-center px-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Logo Icon */}
        <div className="mb-8 p-5 bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-50 animate-in zoom-in duration-700">
          <ShieldCheck className="w-16 h-16 text-[#1677ff]" strokeWidth={1.5} />
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
          ClawdCom <span className="text-[#1677ff]">AI 运营官</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-12 leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200">
          全平台电商监控与自动决策系统
        </p>

        {/* Feature Grid (Decorative) */}
        <div className="grid grid-cols-3 gap-8 mb-12 w-full max-w-lg opacity-80 animate-in fade-in duration-1000 delay-300">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <Globe className="w-6 h-6 text-indigo-500" />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">全球平台</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">毫秒响应</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <BarChart3 className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">利润止损</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <Button 
            type="primary" 
            size="large" 
            className="h-14 px-10 text-lg rounded-full font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all hover:scale-105 flex items-center gap-2"
            href="/dashboard" // Placeholder link for future routing
          >
            进入控制台
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="mt-4 text-xs text-slate-400 font-medium">
            ClawdCom Intelligence v2.0 &copy; 2024
          </p>
        </div>
      </div>
    </main>
  );
}