import React from 'react';
import { ShieldAlert, Eye, Zap, Power, ArrowRight } from 'lucide-react';

const KillerSection: React.FC = () => {
  const features = [
    {
      id: 'defense',
      icon: <ShieldAlert className="w-8 h-8 text-red-600" />,
      title: "跟卖自动驱逐",
      subtitle: "Active Defense",
      desc: "发现跟卖 -> AI 生成律师函 -> 一键发送。让你的 Listing 固若金汤，不再被低价劫持流量。",
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-900",
      hover: "hover:shadow-red-100/50 hover:border-red-200"
    },
    {
      id: 'visual',
      icon: <Eye className="w-8 h-8 text-blue-600" />,
      title: "视觉级竞品监控",
      subtitle: "Visual Spy",
      desc: "全网唯一能看懂“图片变化”的工具。竞品换图、改卖点、加角标，AI 第一时间截图推送。",
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-900",
      hover: "hover:shadow-blue-100/50 hover:border-blue-200"
    },
    {
      id: 'trend',
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "爆款脚本自动生成",
      subtitle: "Trend Jacking",
      desc: "实时抓取 TikTok/抖音 热梗，结合你的产品特性，AI 自动生成高转化短视频带货脚本。",
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-900",
      hover: "hover:shadow-purple-100/50 hover:border-purple-200"
    },
    {
      id: 'killswitch',
      icon: <Power className="w-8 h-8 text-orange-600" />,
      title: "跨平台止损阀",
      subtitle: "Kill Switch",
      desc: "广告跑飞？库存超卖？ROI 跌破红线？AI 帮你自动按下暂停键，守住每一分利润。",
      bg: "bg-orange-50",
      border: "border-orange-100",
      text: "text-orange-900",
      hover: "hover:shadow-orange-100/50 hover:border-orange-200"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-sm font-semibold mb-6">
            The Clawdbot Edge
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
            四大核武器，构筑你的电商护城河
          </h2>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            传统工具只做“监控报表”，我们做“决策执行”。<br className="hidden md:block"/>
            把那些高风险、低频次、高价值的操作，交给 AI 24小时值守。
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`
                group relative rounded-3xl border p-8 sm:p-10 transition-all duration-300 
                bg-white hover:-translate-y-1 hover:shadow-xl
                ${feature.border} ${feature.hover}
              `}
            >
              {/* Background Blob Effect */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-opacity group-hover:opacity-20 ${feature.bg}`}></div>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${feature.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${feature.bg} ${feature.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {feature.subtitle}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-base flex-1">
                  {feature.desc}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center text-sm font-bold text-slate-400 group-hover:text-indigo-600 transition-colors cursor-pointer">
                  <span>了解技术细节</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KillerSection;