import React, { useState } from 'react';
import { 
  RefreshCw, Power, 
  Globe, ShoppingCart, Database, Link 
} from 'lucide-react';
import { Button, Card } from '../../ui/shadcn';
import { PlatformType } from '../../../types';
import StatusBadge from '../../StatusBadge';

// Extended mock type for this view
interface SettingsIntegration {
  id: string;
  name: string;
  type: PlatformType;
  groupLabel: string;
  status: 'connected' | 'disconnected' | 'token_expired' | 'error';
  capabilities: ('monitor' | 'read' | 'action')[];
  icon: string;
}

const MOCK_INTEGRATIONS: SettingsIntegration[] = [
  { id: '1', name: 'Amazon US', type: 'crossborder', groupLabel: '跨境电商', status: 'connected', capabilities: ['monitor', 'read', 'action'], icon: 'amazon' },
  { id: '2', name: 'TikTok Shop', type: 'crossborder', groupLabel: '跨境电商', status: 'token_expired', capabilities: ['monitor', 'read'], icon: 'tiktok' },
  { id: '3', name: 'Shopee', type: 'crossborder', groupLabel: '跨境电商', status: 'disconnected', capabilities: ['monitor'], icon: 'shopee' },
  { id: '4', name: '淘宝/天猫', type: 'domestic', groupLabel: '国内电商', status: 'connected', capabilities: ['monitor', 'read'], icon: 'taobao' },
  { id: '5', name: '抖音电商', type: 'domestic', groupLabel: '国内电商', status: 'connected', capabilities: ['monitor', 'read', 'action'], icon: 'douyin' },
  { id: '6', name: 'Shopify', type: 'independent', groupLabel: '独立站', status: 'connected', capabilities: ['monitor', 'read', 'action'], icon: 'shopify' },
  { id: '7', name: '巨量千川', type: 'ads', groupLabel: '广告投放', status: 'connected', capabilities: ['read', 'action'], icon: 'ocean' },
  { id: '8', name: '聚水潭 ERP', type: 'erp', groupLabel: 'ERP 系统', status: 'error', capabilities: ['read'], icon: 'erp' },
];

const IntegrationCards: React.FC = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleTest = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      alert('连接测试成功！数据链路正常。');
    }, 1500);
  };

  const groups = [
    { label: '跨境平台 (Cross-border)', type: 'crossborder', icon: <Globe className="w-5 h-5" /> },
    { label: '国内平台 (Domestic)', type: 'domestic', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: '独立站 (Independent)', type: 'independent', icon: <Link className="w-5 h-5" /> },
    { label: '广告与ERP (Ads & ERP)', types: ['ads', 'erp'], icon: <Database className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-8 pb-12">
      {groups.map((group, idx) => {
        const items = MOCK_INTEGRATIONS.filter(i => 
          group.types ? group.types.includes(i.type) : i.type === group.type
        );
        
        if (items.length === 0) return null;

        return (
          <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-lg">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                {group.icon}
              </div>
              {group.label}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map(item => (
                <Card key={item.id} className="p-5 flex flex-col h-full hover:shadow-md transition-shadow border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xl border border-slate-100">
                      {item.icon === 'erp' ? 'ERP' : item.name.charAt(0)}
                    </div>
                    <StatusBadge status={item.status} text={item.status === 'connected' ? '运行正常' : item.status === 'token_expired' ? '授权过期' : item.status === 'error' ? '连接异常' : '未连接'} />
                  </div>

                  <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
                  
                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.capabilities.map(cap => (
                      <span key={cap} className={`
                        text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border
                        ${cap === 'action' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                          cap === 'monitor' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-slate-50 text-slate-600 border-slate-100'}
                      `}>
                        {cap === 'action' ? '可执行' : cap === 'monitor' ? '监控' : '只读'}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                    {item.status === 'connected' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 h-8 text-xs bg-slate-50 border-slate-200"
                          onClick={() => handleTest(item.id)}
                          disabled={loadingId === item.id}
                        >
                          {loadingId === item.id ? <RefreshCw className="w-3 h-3 animate-spin mr-1"/> : <Power className="w-3 h-3 mr-1"/>}
                          测试
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs border-slate-200 text-slate-500">
                          配置
                        </Button>
                      </>
                    ) : item.status === 'token_expired' ? (
                      <Button variant="default" size="sm" className="w-full h-8 text-xs bg-orange-500 hover:bg-orange-600">
                        <RefreshCw className="w-3 h-3 mr-1" /> 重新授权
                      </Button>
                    ) : (
                      <Button variant="default" size="sm" className="w-full h-8 text-xs bg-indigo-600 hover:bg-indigo-700">
                        <Link className="w-3 h-3 mr-1" /> 立即连接
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
              
              {/* Add New Placeholder */}
              <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-slate-50 transition-all min-h-[180px]">
                <span className="text-3xl mb-2 font-light">+</span>
                <span className="text-sm font-medium">接入新店铺</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IntegrationCards;
