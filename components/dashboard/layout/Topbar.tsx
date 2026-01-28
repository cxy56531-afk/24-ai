import React, { useState } from 'react';
import { 
  ChevronDown, 
  Bell, 
  Wifi, 
  Search,
  CheckCircle2,
  Store
} from 'lucide-react';
import { Button, Badge } from '../../ui/shadcn';
import { Store as StoreType } from '../../../types';
import { getMockIntegrations } from '../../../services/mockService';

const Topbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Mock current store for display
  const [currentStore, setCurrentStore] = useState({ name: 'Amazon US Official', type: 'Amazon', region: 'US' });

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-6 flex items-center justify-between">
      
      {/* Left: Store Switcher */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
          >
            <div className="w-8 h-8 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Store className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-medium group-hover:text-indigo-500 uppercase tracking-wider">Current Store</div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                {currentStore.name}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </button>

          {/* Dropdown Menu (Simulated) */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">Switch Store</div>
              {['Amazon US Official', 'Taobao Flagship CN', 'TikTok Shop UK'].map((store) => (
                <button 
                  key={store}
                  onClick={() => { setCurrentStore({...currentStore, name: store}); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${store === currentStore.name ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                  {store}
                </button>
              ))}
              <div className="border-t border-slate-100 my-2"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-indigo-600 font-medium hover:bg-slate-50">
                + Connect New Store
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Global Status & User */}
      <div className="flex items-center gap-6">
        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-700">Monitoring Active</span>
        </div>

        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

        <div className="flex items-center gap-4">
          <button className="relative text-slate-500 hover:text-indigo-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          
          <div className="flex items-center gap-3 pl-2 cursor-pointer">
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-slate-900">Admin User</div>
              <div className="text-xs text-slate-500">Pro Plan</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
