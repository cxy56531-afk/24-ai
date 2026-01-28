import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center md:items-start flex-col md:flex-row">
          <div className="mb-8 md:mb-0">
             <div className="flex items-center">
               <ShieldCheck className="h-6 w-6 text-slate-400" />
               <span className="ml-2 text-lg font-bold text-slate-900">ClawdCom</span>
             </div>
             <p className="mt-2 text-sm text-slate-500 max-w-xs">
               AI 驱动的电商决策系统，守护每一分利润。
             </p>
          </div>
          <div className="flex space-x-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600">关于我们</a>
            <a href="#" className="hover:text-indigo-600">服务条款</a>
            <a href="#" className="hover:text-indigo-600">隐私政策</a>
            <a href="#" className="hover:text-indigo-600">联系客服</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs text-slate-400">
            &copy; 2024 ClawdCom Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;