import React, { useState } from 'react';
import { TrendingDown, ShieldAlert, Gavel, FileWarning } from 'lucide-react';

const PainPoints: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'crossborder'>('domestic');

  const content = {
    domestic: [
      {
        icon: <TrendingDown className="w-8 h-8 text-red-500" />,
        title: "竞品恶意内卷",
        pain: "凌晨3点偷偷改价抢排名，早起发现单量腰斩。",
        solution: "AI 毫秒级跟价监控，保持黄金价格区间，拒绝无底线降价。",
        tag: "自动调价"
      },
      {
        icon: <ShieldAlert className="w-8 h-8 text-orange-500" />,
        title: "差评舆情失控",
        pain: "DSR 评分突然暴跌，不知是哪个 SKU 出了问题。",
        solution: "差评实时预警，AI 自动生成高情商安抚话术，挽回客户。",
        tag: "舆情防护"
      }
    ],
    crossborder: [
      {
        icon: <FileWarning className="w-8 h-8 text-red-500" />,
        title: "Listing 被跟卖劫持",
        pain: "辛辛苦苦推起来的链接，一觉醒来被跟卖抢走购物车。",
        solution: "全天候防跟卖，检测即触发，自动发送律师函或警告信。",
        tag: "品牌保护"
      },
      {
        icon: <Gavel className="w-8 h-8 text-orange-500" />,
        title: "广告预算烧穿",
        pain: "由于时差，广告跑飞了没人管，一夜损失上千刀。",
        solution: "ACOS 熔断机制，超出阈值自动暂停或调整竞价。",
        tag: "资产止损"
      }
    ]
  };

  return (
    <section className="py-20 bg-white" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">全场景电商痛点，逐个击破</h2>
          <p className="mt-4 text-lg text-slate-600">无论你是做淘宝天猫，还是亚马逊独立站，ClawdCom 都有对应的防御策略。</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 p-1 rounded-xl inline-flex">
            <button
              onClick={() => setActiveTab('domestic')}
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'domestic' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              国内电商方案
            </button>
            <button
              onClick={() => setActiveTab('crossborder')}
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'crossborder' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              跨境电商方案
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {content[activeTab].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {item.icon}
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-slate-50 p-3 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <div className="mb-4 text-slate-500 text-sm bg-slate-50 p-3 rounded-lg border-l-4 border-red-400">
                    <span className="font-semibold text-red-500">痛点：</span> {item.pain}
                  </div>
                  <div className="text-slate-700 text-sm bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-500">
                    <span className="font-semibold text-indigo-600">ClawdCom 方案：</span> {item.solution}
                  </div>
                  <div className="mt-4 inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded">
                    {item.tag}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;