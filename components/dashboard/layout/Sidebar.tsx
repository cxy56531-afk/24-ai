'use client';

import React from 'react';
// import Link from 'next/link'; // Replaced for Preview
import { 
  Rocket, 
  ShieldCheck, 
  Eye, 
  Wallet, 
  TrendingUp, 
  Settings
} from 'lucide-react';
import { cn } from '../../ui/shadcn';

// Mock hook for Preview environment where next/navigation might not exist
const usePathname = () => {
  if (typeof window !== 'undefined') return window.location.pathname;
  return '';
};

const menuItems = [
  { href: '/dashboard', label: '指挥中心', icon: <Rocket className="w-5 h-5" /> },
  { href: '/dashboard/security', label: '安全卫士', icon: <ShieldCheck className="w-5 h-5" /> },
  { href: '/dashboard/intelligence', label: '视觉情报', icon: <Eye className="w-5 h-5" /> },
  { href: '/dashboard/finance', label: '资金守护', icon: <Wallet className="w-5 h-5" /> },
  { href: '/dashboard/growth', label: '增长引擎', icon: <TrendingUp className="w-5 h-5" /> },
  { type: 'separator' },
  { href: '/dashboard/settings', label: '策略配置', icon: <Settings className="w-5 h-5" /> },
];

interface SidebarProps {
  currentView?: string;
  onChangeView?: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 bottom-0 z-20">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <a href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
          <ShieldCheck className="w-7 h-7 text-indigo-600" />
          <span>ClawdCom</span>
        </a>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => {
          if (item.type === 'separator') {
            return <div key={idx} className="my-4 border-t border-slate-100 mx-3" />;
          }
          
          // Determine View ID for SPA mode
          const viewId = item.href === '/dashboard' ? 'overview' : item.href!.split('/').pop() || '';
          
          // Exact match for root dashboard, startsWith for modules to keep active on sub-routes if any
          let isActive = false;
          if (currentView && onChangeView) {
             isActive = currentView === viewId;
          } else {
             isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard'
              : pathname?.startsWith(item.href!);
          }

          const handleClick = (e: React.MouseEvent) => {
            if (onChangeView) {
              e.preventDefault();
              onChangeView(viewId);
            }
          };

          return (
            <a
              key={item.href}
              href={item.href!}
              onClick={handleClick}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span className={cn(isActive ? "text-indigo-600" : "text-slate-400")}>
                {item.icon}
              </span>
              {item.label}
            </a>
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