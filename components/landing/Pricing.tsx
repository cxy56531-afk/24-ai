import React from 'react';
import { Check, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="pricing">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">简单的价格，巨大的回报</h2>
          <p className="mt-4 text-xl text-slate-500">
            挽回一单跟卖损失，可能就赚回了年费。新用户注册即送 <strong>1天 Pro 版全功能试用</strong>。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">基础版</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold text-slate-900">¥1,999</span>
              <span className="ml-2 text-lg font-medium text-slate-500">/年</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">适合起步阶段的小型卖家，满足基础监控需求。</p>
            <ul className="mt-8 space-y-4 flex-1">
              {['监控 10 个核心链接', '1 小时数据刷新', '基础价格预警', '30天数据保留', '邮件通知'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 text-emerald-500" />
                  <span className="ml-3 text-slate-600 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <a 
              href="/login?plan=basic"
              className="mt-8 block w-full bg-indigo-50 text-indigo-700 font-bold py-4 px-6 rounded-xl hover:bg-indigo-100 transition-colors text-center"
            >
              选择基础版
            </a>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-indigo-500 transform md:-translate-y-4 relative p-8 flex flex-col z-10">
            <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> 最受欢迎
            </div>
            <h3 className="text-xl font-bold text-white">专业版</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold text-white">¥3,999</span>
              <span className="ml-2 text-lg font-medium text-slate-400">/年</span>
            </div>
            <p className="mt-4 text-sm text-indigo-200 leading-relaxed">适合增长期卖家，全自动防御与AI决策。</p>
            <ul className="mt-8 space-y-4 flex-1">
              {['监控 50 个核心链接', '实时数据刷新 (秒级)', '自动发送律师函/警告信', '广告 ACOS 熔断保护', '竞品视觉情报分析', '微信实时通知'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="p-0.5 bg-indigo-500 rounded-full mr-3">
                    <Check className="flex-shrink-0 w-3 h-3 text-white" />
                  </div>
                  <span className="text-slate-200 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <a 
              href="/login?plan=pro"
              className="mt-8 block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-center"
            >
              免费试用 1 天
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">企业版</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-slate-900">定制</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">适合品牌大卖与铺货团队，私有化部署。</p>
            <ul className="mt-8 space-y-4 flex-1">
              {['无限链接监控', '私有云部署 (Docker)', '数据绝对物理隔离', '专属客户经理', 'API 对接 ERP', '自定义 AI 训练'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 text-emerald-500" />
                  <span className="ml-3 text-slate-600 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <a 
              href="mailto:sales@clawdcom.com"
              className="mt-8 block w-full bg-slate-50 text-slate-700 font-bold py-4 px-6 rounded-xl hover:bg-slate-100 transition-colors text-center"
            >
              联系销售
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;