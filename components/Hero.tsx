import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const Hero: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Simulation steps for the visual demo
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { icon: <Zap className="w-5 h-5 text-yellow-400" />, text: "监测到竞品 B 降价 15%", status: "detect" },
    { icon: <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse" />, text: "AI 策略引擎分析利润模型...", status: "think" },
    { icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, text: "执行防御性调价 (-5%)", status: "act" },
    { icon: <div className="w-4 h-4 border-2 border-indigo-500 rounded-full" />, text: "ROI 维持 3.2，继续巡逻", status: "idle" },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              v2.0 全新发布：视觉情报系统上线
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              别让利润在睡觉时溜走。<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                AI 决策型电商运营官
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              不只是监控数据，更能主动止损。防跟卖、防内卷、自动索赔，24小时待命，比你也更懂你的利润表。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={onCtaClick} className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all hover:-translate-y-1">
                我是国内卖家
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button onClick={onCtaClick} className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all hover:-translate-y-1">
                我是跨境卖家
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-slate-500">
              <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-emerald-500"/> 7天免费试用</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-emerald-500"/> 随时取消</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-emerald-500"/> 独立IP隔离</span>
            </div>
          </div>

          {/* Right Visual (Simulated Terminal) */}
          <div className="lg:col-span-6 relative">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Window Header */}
              <div className="bg-slate-800 px-4 py-3 flex items-center space-x-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div className="ml-4 text-xs text-slate-400 font-mono">clawdcom-cli — active session</div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm h-[320px] flex flex-col justify-end relative">
                <div className="absolute inset-0 p-6 space-y-4">
                   {steps.map((step, index) => (
                     <div 
                        key={index} 
                        className={`flex items-center space-x-3 transition-all duration-500 ${
                          index === activeStep 
                            ? 'opacity-100 translate-x-0 scale-105 bg-slate-800/50 p-2 rounded-lg border-l-2 border-indigo-500' 
                            : index < activeStep 
                              ? 'opacity-40 translate-x-0' 
                              : 'opacity-10 translate-y-4'
                        }`}
                     >
                       <div className="flex-shrink-0">
                         {step.icon}
                       </div>
                       <span className={`
                         ${index === activeStep ? 'text-white font-bold' : 'text-slate-400'}
                       `}>
                         {step.text}
                       </span>
                     </div>
                   ))}
                </div>
                
                {/* Typing effect line */}
                <div className="mt-4 flex items-center text-emerald-400">
                  <span className="mr-2">➜</span>
                  <span className="typing-cursor">waiting for next event...</span>
                </div>
              </div>
              
              {/* Overlay Stat */}
              <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
                 <div className="text-xs text-indigo-200 uppercase font-semibold">预计今日挽回损失</div>
                 <div className="text-2xl font-bold text-white">$452.00</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;