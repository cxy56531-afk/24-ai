import React from 'react';
// import Link from 'next/link'; // Replaced for Preview compatibility
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-slate-400" />
              <span className="text-lg font-bold text-slate-900">ClawdCom</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI 驱动的电商决策系统，守护每一分利润。
              <br />
              Trusted by 500+ global brands.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">产品</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">功能特性</a></li>
                <li><a href="#" className="hover:text-indigo-600">价格方案</a></li>
                <li><a href="#" className="hover:text-indigo-600">更新日志</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">资源</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">帮助文档</a></li>
                <li><a href="#" className="hover:text-indigo-600">API 文档</a></li>
                <li><a href="#" className="hover:text-indigo-600">社区</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">公司</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">关于我们</a></li>
                <li><a href="#" className="hover:text-indigo-600">联系客服</a></li>
                <li><a href="#" className="hover:text-indigo-600">隐私条款</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} ClawdCom Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>京ICP备2024XXXX号</span>
            <span>隐私政策</span>
            <span>服务条款</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;