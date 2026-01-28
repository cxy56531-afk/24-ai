import React, { useState } from 'react';
import { Globe, ShieldCheck, FileText, Lock, Save } from 'lucide-react';
import { Button, Card, Separator } from '../../ui/shadcn';

const GeneralSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    timezone: 'Asia/Shanghai',
    reportEnabled: true,
    reportTime: '08:00',
    requireApproval: true,
    acosThreshold: 80,
    inventoryThreshold: 10
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('设置已保存');
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      
      {/* 1. Global Safety Lock */}
      <Card className="p-6 border-l-4 border-l-indigo-600 bg-white shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">全局安全风控 (Global Safety)</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              为防止 AI 误操作，启用此选项后，所有涉及资金（改价/关停广告）和法律（发律师函）的高风险动作，必须经过人工审批才能执行。
            </p>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={settings.requireApproval}
                  onChange={e => setSettings({...settings, requireApproval: e.target.checked})}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
              <span className={`text-sm font-medium ${settings.requireApproval ? 'text-indigo-700' : 'text-slate-600'}`}>
                {settings.requireApproval ? '已开启人工强审模式 (推荐)' : '已关闭 (风险较高)'}
              </span>
            </label>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* 2. Localization */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4" /> 本地化设置
          </h4>
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">系统时区</label>
              <select 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={settings.timezone}
                onChange={e => setSettings({...settings, timezone: e.target.value})}
              >
                <option value="Asia/Shanghai">Asia/Shanghai (GMT+8)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (GMT-7)</option>
                <option value="Europe/London">Europe/London (GMT+0)</option>
              </select>
              <p className="text-xs text-slate-400 mt-1">报表生成和定时任务将依据此时区。</p>
            </div>
          </Card>
        </div>

        {/* 3. Reporting */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" /> 智能报表
          </h4>
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="block text-sm font-medium text-slate-700">每日运营早报</span>
                <span className="text-xs text-slate-400">汇总昨日 GMV、利润、异常事件</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.reportEnabled} onChange={e => setSettings({...settings, reportEnabled: e.target.checked})} className="sr-only peer"/>
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            {settings.reportEnabled && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-medium text-slate-500 mb-1">发送时间</label>
                <input 
                  type="time" 
                  value={settings.reportTime}
                  onChange={e => setSettings({...settings, reportTime: e.target.value})}
                  className="px-2 py-1 border border-slate-200 rounded text-sm bg-slate-50"
                />
              </div>
            )}
          </Card>
        </div>
      </div>

      <Separator />

      {/* 4. Default Thresholds */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4" /> 默认风控阈值
        </h4>
        <Card className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">广告 ACOS 熔断线 (%)</label>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                value={settings.acosThreshold}
                onChange={e => setSettings({...settings, acosThreshold: Number(e.target.value)})}
                className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm"
              />
              <span className="text-xs text-slate-500">当 ACOS 超过此数值，建议暂停广告</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">低库存预警线 (件)</label>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                value={settings.inventoryThreshold}
                onChange={e => setSettings({...settings, inventoryThreshold: Number(e.target.value)})}
                className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm"
              />
              <span className="text-xs text-slate-500">低于此数值触发补货提醒</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleSave} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
          {loading ? '保存中...' : '保存所有设置'}
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
