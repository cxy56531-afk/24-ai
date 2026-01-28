import React from 'react';
import { ShieldAlert, Eye, Zap, Power, ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      id: 'defense',
      icon: <ShieldAlert className="w-8 h-8 text-red-600" />,
      title: "跟卖自动驱逐 (Active Defense)",
      desc: "发现跟卖 -> AI 生成律师函 -> 一键发送。让你的 Listing 固若金汤。",
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-900",
      hoverShadow: "hover:shadow-red-100"
    },
    {
      id: 'visual',
      icon: <Eye className="w-8 h-8 text-blue-600" />,
      title: "视觉级竞品监控 (Visual Spy)",
      desc: "全网唯一能看懂'图片变化'的工具。竞品换图、改卖点，你第一个知道。",
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-900",
      hoverShadow: "hover:shadow-blue-100"
    },
    {
      id: 'trend',
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "爆款脚本自动生成 (Trend Jacking)",
      desc: "实时抓取 TikTok/抖音 热梗，结合你的产品生成带货文案。",
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-900",
      hoverShadow: "hover:shadow-purple-100"
    },
    {
      id: 'killswitch',
      icon: <Power className="w-8 h-8 text-orange-600" />,
      title: "跨平台止损阀 (Kill Switch)",
      desc: "广告跑飞？库存超卖？AI 帮你自动按下暂停键，守住利润。",
      bg: "bg-orange-50",
      border: "border-orange-100",
      text: "text-orange-900",
      hoverShadow: "hover:shadow-orange-100"
    }
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-sm font-semibold mb-6">
            The Clawdbot Edge
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            四大核武器，构筑你的电商护城河
          </h2>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            传统工具只做“监控”，我们做“执行”。<br/>
            把那些高风险、低频次的操作，交给 AI 24小时值守。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group ${feature.bg} ${feature.border} ${feature.hoverShadow}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className={`text-xl font-bold ${feature.text} mb-3`}>
                    {feature.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-base font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
              <div className={`mt-6 flex items-center text-sm font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${feature.text}`}>
                <span>了解技术细节</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;