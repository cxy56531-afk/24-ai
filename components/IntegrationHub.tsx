import React from 'react';
import { CheckCircle2, AlertCircle, Plus, RefreshCw, Power } from 'lucide-react';
import { Integration } from '../types';

interface IntegrationHubProps {
  integrations: Integration[];
}

const IntegrationHub: React.FC<IntegrationHubProps> = ({ integrations }) => {
  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'token_expired': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-slate-400 bg-slate-50 border-slate-200';
    }
  };

  const getStatusText = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return '运行正常';
      case 'error': return '连接失败';
      case 'token_expired': return '授权过期';
      default: return '未连接';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">集成中心 (Integration Hub)</h2>
          <p className="text-slate-500 text-sm mt-1">管理全球电商平台连接，配置数据读取与执行权限。</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium">
          <Plus className="w-4 h-4 mr-2" />
          添加新店铺
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-slate-100 font-bold text-slate-600`}>
                  {item.name.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <div className="text-xs text-slate-500">{item.type === 'domestic' ? '国内电商' : item.type === 'crossborder' ? '跨境电商' : '独立站'}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium border flex items-center ${getStatusColor(item.status)}`}>
                {item.status === 'connected' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                {getStatusText(item.status)}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">同步状态</span>
                <span className="text-slate-700 font-medium">{item.lastSync}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">已获能力</span>
                <div className="flex space-x-1">
                   {item.capabilities.map(cap => (
                     <span key={cap} className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase
                       ${cap === 'monitor' ? 'bg-blue-50 text-blue-600' : 
                         cap === 'read' ? 'bg-indigo-50 text-indigo-600' : 
                         'bg-orange-50 text-orange-600'}`}>
                       {cap}
                     </span>
                   ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-slate-100">
              <button className="flex-1 px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium">
                配置权限
              </button>
              <button className="px-3 py-2 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <button className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors bg-slate-50/50 hover:bg-white min-h-[200px]">
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">连接新平台</span>
        </button>
      </div>
    </div>
  );
};

export default IntegrationHub;