import React from 'react';
import { Shield, Eye, Wallet, TrendingUp, Settings } from 'lucide-react';
import { Button } from '../../ui/shadcn';

const PlaceholderPage = ({ title, icon: Icon, description }: { title: string, icon: any, description: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 animate-in fade-in duration-500">
    <div className="bg-slate-100 p-6 rounded-full mb-6">
      <Icon className="w-12 h-12 text-slate-400" />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500 max-w-md mb-8">{description}</p>
    <Button size="lg">配置{title}策略</Button>
  </div>
);

export const SecurityPage = () => (
  <PlaceholderPage 
    title="安全卫士 (Security)" 
    icon={Shield} 
    description="跟卖监控、恶意差评拦截、Listing 篡改防护。24小时全自动巡逻。" 
  />
);

export const IntelligencePage = () => (
  <PlaceholderPage 
    title="视觉情报 (Intelligence)" 
    icon={Eye} 
    description="全网首创视觉级竞品监控。识别主图变更、营销文案调整、促销活动追踪。" 
  />
);

export const FinancePage = () => (
  <PlaceholderPage 
    title="资金守护 (Finance)" 
    icon={Wallet} 
    description="广告 ROI 熔断保护、库存异常止损、异常退款预警。" 
  />
);

export const GrowthPage = () => (
  <PlaceholderPage 
    title="增长引擎 (Growth)" 
    icon={TrendingUp} 
    description="自动抓取 TikTok/抖音热点趋势，生成爆款短视频脚本与选品建议。" 
  />
);

export const SettingsPage = () => (
  <PlaceholderPage 
    title="策略配置 (Settings)" 
    icon={Settings} 
    description="管理通知渠道、API 密钥、团队成员权限及全局风控阈值。" 
  />
);
