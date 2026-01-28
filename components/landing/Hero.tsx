'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              v2.0 视觉情报系统全新上线
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              别让利润在<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                睡觉时溜走
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-slate-600 mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              AI 决策型电商运营官
            </p>

            <p className="text-base sm:text-lg text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              不只是监控数据，更能主动止损。防跟卖、防内卷、自动索赔，24小时待命，比你也更懂你的利润表。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
                  我是国内卖家
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 transition-all shadow-sm">
                  我是跨境卖家
                </button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 animate-in fade-in duration-1000 delay-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 7天免费试用
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 独立 IP 隔离
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 随时取消
              </span>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 hidden lg:block">
            {/* Main Hero Image Frame */}
            <div className="relative rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white rounded-2xl -z-10"></div>
              {/* 
                  Uses standard img for robust fallback if local next/image data is missing in build environment.
                  In production, replace with <Image> if confident in file existence.
              */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-50">
                <Image
                  src="/landing/hero.webp"
                  alt="ClawdCom Dashboard Interface"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Floating Elements (Decor) */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur border border-white/50 p-4 rounded-xl shadow-lg animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-semibold uppercase">今日止损</div>
                      <div className="text-lg font-bold text-slate-900">$1,240.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Icons (Floating) */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center animate-float delay-100">
              <img src="/platforms/amazon.svg" alt="Amazon" className="w-8 h-8 opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
             <div className="absolute top-1/2 -left-10 w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center animate-float delay-700">
              <img src="/platforms/tiktok.svg" alt="TikTok" className="w-7 h-7 opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;