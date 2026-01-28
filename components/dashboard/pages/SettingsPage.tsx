import React, { useState } from 'react';
import { Settings, Globe, Bell, Shield } from 'lucide-react';
import IntegrationCards from '../settings/IntegrationCards';
import NotificationSettings from '../settings/NotificationSettings';
import GeneralSettings from '../settings/GeneralSettings';
import { cn } from '../../ui/shadcn';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'integrations' | 'notifications' | 'general'>('integrations');

  const tabs = [
    { id: 'integrations', label: '平台集成', icon: Globe },
    { id: 'notifications', label: '推送通知', icon: Bell },
    { id: 'general', label: '通用策略', icon: Shield },
  ];

  return (
    <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-7 h-7 text-indigo-600" />
          策略配置 (Settings)
        </h1>
        <p className="text-slate-500 mt-2">
          管理您的数据源连接、通知渠道以及全局风控规则。
        </p>
      </div>

      {/* Tabs Header */}
      <div className="border-b border-slate-200 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200",
                  isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                )}
              >
                <Icon className={cn("mr-2 h-4 w-4", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500")} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'integrations' && <IntegrationCards />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'general' && <GeneralSettings />}
      </div>
    </div>
  );
};

export default SettingsPage;
