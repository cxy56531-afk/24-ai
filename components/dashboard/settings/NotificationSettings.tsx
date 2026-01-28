import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button, Card } from '../../ui/shadcn';
import StatusBadge from '../../StatusBadge';

const NotificationSettings: React.FC = () => {
  const [channels, setChannels] = useState([
    { id: 'wechat', name: '企业微信 (WeChat Work)', icon: '💬', enabled: true, webhook: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx' },
    { id: 'dingtalk', name: '钉钉 (DingTalk)', icon: '🔨', enabled: false, webhook: '' },
    { id: 'telegram', name: 'Telegram Bot', icon: '✈️', enabled: false, webhook: '' },
  ]);

  const [testingId, setTestingId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setChannels(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const handleTest = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      alert('🔔 测试消息已发送，请检查您的客户端。');
    }, 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
        <Bell className="w-5 h-5 text-indigo-600 mt-0.5" />
        <div>
          <h4 className="font-bold text-indigo-900 text-sm">实时风控通知</h4>
          <p className="text-sm text-indigo-700 mt-1">
            当系统触发「跟卖驱逐」、「广告熔断」或「重大视觉变更」时，系统会第一时间通过 Webhook 推送至您的 IM 群组。
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {channels.map(channel => (
          <Card key={channel.id} className={`p-6 border transition-all ${channel.enabled ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50'}`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              {/* Header Info */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shadow-sm">
                  {channel.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{channel.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge 
                      level={channel.enabled ? 'success' : 'low'}
                      text={channel.enabled ? '已启用' : '未启用'}
                    />
                  </div>
                </div>
              </div>

              {/* Configuration */}
              <div className="flex-1 w-full space-y-3">
                <div className="flex gap-2 w-full">
                  <input 
                    type="text" 
                    value={channel.webhook}
                    disabled={!channel.enabled}
                    placeholder={`输入 ${channel.name} Webhook URL...`}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                  />
                  {channel.enabled && (
                    <Button 
                      variant="outline" 
                      onClick={() => handleTest(channel.id)}
                      disabled={!channel.webhook || !!testingId}
                      className="whitespace-nowrap"
                    >
                      {testingId === channel.id ? '发送中...' : '测试推送'}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  {channel.id === 'wechat' && '支持 markdown 格式，包含 @提醒功能。'}
                  {channel.id === 'dingtalk' && '需在钉钉后台设置关键词安全校验。'}
                  {channel.id === 'telegram' && '请输入 Bot Token 和 Chat ID。'}
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center pt-2">
                <button
                  onClick={() => handleToggle(channel.id)}
                  className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                    ${channel.enabled ? 'bg-indigo-600' : 'bg-slate-200'}
                  `}
                >
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                      ${channel.enabled ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
