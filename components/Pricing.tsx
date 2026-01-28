import React from 'react';
import { Check } from 'lucide-react';
import { PlanTier } from '../types';

interface PricingProps {
  onSelectPlan: (plan: PlanTier) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-20 bg-slate-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">简单的价格，巨大的回报</h2>
          <p className="mt-4 text-lg text-slate-600">挽回一单跟卖损失，可能就赚回了年费。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 p-8 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">基础版</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-slate-900">¥1,999</span>
              <span className="ml-1 text-xl font-medium text-slate-500">/年</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">适合起步阶段的小型卖家</p>
            <ul className="mt-6 space-y-4 flex-1">
              {['监控 10 个核心链接', '1 小时数据刷新', '基础价格预警', '30天数据保留', '邮件通知'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 text-emerald-500" />
                  <span className="ml-3 text-slate-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onSelectPlan(PlanTier.BASIC)}
              className="mt-8 block w-full bg-indigo-50 text-indigo-700 font-bold py-3 px-4 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              选择基础版
            </button>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="bg-slate-900 rounded-2xl shadow-xl border border-indigo-500 transform scale-105 relative p-8 flex flex-col z-10">
            <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-sm">
              最受欢迎
            </div>
            <h3 className="text-lg font-semibold text-white">专业版</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-white">¥3,999</span>
              <span className="ml-1 text-xl font-medium text-slate-400">/年</span>
            </div>
            <p className="mt-2 text-sm text-indigo-200">适合增长期卖家，全自动防御</p>
            <ul className="mt-6 space-y-4 flex-1">
              {['监控 50 个核心链接', '实时数据刷新 (秒级)', '自动发送律师函/警告信', '广告 ACOS 熔断保护', '竞品视觉情报分析', '微信实时通知'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 text-indigo-400" />
                  <span className="ml-3 text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onSelectPlan(PlanTier.PRO)}
              className="mt-8 block w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/50"
            >
              免费试用 7 天
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 p-8 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">企业版</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-slate-900">定制</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">适合品牌大卖与铺货团队</p>
            <ul className="mt-6 space-y-4 flex-1">
              {['无限链接监控', '私有云部署 (Docker)', '数据绝对物理隔离', '专属客户经理', 'API 对接 ERP', '自定义 AI 训练'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 text-emerald-500" />
                  <span className="ml-3 text-slate-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onSelectPlan(PlanTier.ENTERPRISE)}
              className="mt-8 block w-full bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors"
            >
              联系销售
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;