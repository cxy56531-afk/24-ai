import React from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  Eye, 
  Wallet, 
  TrendingUp, 
  Settings, 
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../../ui/shadcn';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

const menuItems = [
  { key: 'overview', label: '指挥中心', icon: <Rocket className="w-5 h-5" /> },
  { key: 'security', label: '安全卫士', icon: <ShieldCheck className="w-5 h-5" /> },
  { key: 'intelligence', label: '视觉情报', icon: <Eye className="w-5 h-5" /> },
  { key: 'finance', label: '资金守护', icon: <Wallet className="w-5 h-5" /> },
  { key: 'growth', label: '增长引擎', icon: <TrendingUp className="w-5 h-5" /> },
  { type: 'separator' },
  { key: 'settings', label: '策略配置', icon: <Settings className="w-5 h-5" /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 bottom-0 z-20">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight">
          <ShieldCheck className="w-7 h-7 text-indigo-600" />
          <span>ClawdCom</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => {
          if (item.type === 'separator') {
            return <div key={idx} className="my-4 border-t border-slate-100 mx-3" />;
          }
          
          const isActive = currentView === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChangeView(item.key!)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span className={cn(isActive ? "text-indigo-600" : "text-slate-400")}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="text-xs text-slate-400 font-medium">ClawdCom v2.1.0</div>
        <div className="text-[10px] text-slate-300 mt-1">Enterprise Edition</div>
      </div>
    </div>
  );
};

export default Sidebar;
