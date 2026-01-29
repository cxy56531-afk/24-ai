import React from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: '解决方案', value: 'home' }, // Maps to landing for now, or specific sections
    { label: '价格', value: 'pricing' },
    { label: '帮助中心', value: 'docs' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <ShieldCheck className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-slate-900 tracking-tight">ClawdCom</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.value ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('login')}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600"
            >
              登录
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              免费试用 1 天
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              >
                {item.label}
              </button>
            ))}
            <button
               onClick={() => {
                onNavigate('dashboard');
                setIsOpen(false);
              }}
              className="block w-full text-center mt-4 px-5 py-3 bg-indigo-600 text-white rounded-md font-bold"
            >
              进入控制台
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;