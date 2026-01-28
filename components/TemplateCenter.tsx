import React from 'react';
import { ToggleRight, ToggleLeft, Zap, Shield, Eye, Settings } from 'lucide-react';
import { Template } from '../types';

interface TemplateCenterProps {
  templates: Template[];
}

const TemplateCenter: React.FC<TemplateCenterProps> = ({ templates }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">模板中心 (Template Center)</h2>
          <p className="text-slate-500 text-sm mt-1">一键启用 AI 策略模板，覆盖 90% 的电商运营风险场景。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${
                  template.category === 'risk' ? 'bg-red-50 text-red-600' :
                  template.category === 'intelligence' ? 'bg-blue-50 text-blue-600' :
                  'bg-orange-50 text-orange-600'
                }`}>
                  {template.category === 'risk' ? <Shield className="w-6 h-6" /> :
                   template.category === 'intelligence' ? <Eye className="w-6 h-6" /> :
                   <Zap className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{template.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {template.platforms.map(p => (
                      <span key={p} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className={`transition-colors ${template.isActive ? 'text-indigo-600' : 'text-slate-300'}`}>
                {template.isActive ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              {template.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase">今日产出</span>
                <span className="text-sm font-bold text-slate-900">
                  {template.stats.todayEvents} 条事件 
                  {template.stats.totalSavings && <span className="text-emerald-600 ml-2">({template.stats.totalSavings})</span>}
                </span>
              </div>
              <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2 hover:bg-slate-50 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateCenter;