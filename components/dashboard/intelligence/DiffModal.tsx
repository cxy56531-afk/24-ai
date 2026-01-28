import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Eye, Scan, ArrowLeftRight } from 'lucide-react';
import { Competitor } from '../../../types';
import InsightBox from './InsightBox';

interface DiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitor: Competitor | null;
}

const DiffModal: React.FC<DiffModalProps> = ({ isOpen, onClose, competitor }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      const timer = setTimeout(() => setIsScanning(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !competitor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              视觉找不同 (Spot the Difference)
            </h2>
            <p className="text-sm text-slate-500">
              Monitoring: <span className="font-semibold text-slate-700">{competitor.title}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
               AI 识别区域: 3处
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          
          {/* Comparison Area */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Before */}
            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center px-1">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yesterday (Previous)</span>
                 <span className="text-xs text-slate-400">14 hours ago</span>
               </div>
               <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm group">
                 <img 
                   src={competitor.images.yesterday || competitor.images.today} 
                   alt="Yesterday" 
                   className="w-full h-full object-cover grayscale opacity-80" 
                 />
                 <div className="absolute top-2 left-2 bg-slate-800/80 text-white text-xs px-2 py-1 rounded">
                    历史版本
                 </div>
               </div>
            </div>

            {/* After (Current) */}
            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center px-1">
                 <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                   <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                   Today (Detected Change)
                 </span>
                 <button 
                   onClick={() => setShowOverlay(!showOverlay)}
                   className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
                 >
                   <Scan className="w-3 h-3" />
                   {showOverlay ? 'Hide Changes' : 'Show Changes'}
                 </button>
               </div>
               
               <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-indigo-500 shadow-md bg-white cursor-crosshair">
                 <img 
                   src={competitor.images.today} 
                   alt="Today" 
                   className="w-full h-full object-cover" 
                 />
                 
                 {/* Scanning Effect */}
                 {isScanning && (
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent animate-scan pointer-events-none z-10"></div>
                 )}

                 {/* Mock Bounding Box for "Difference" */}
                 {showOverlay && !isScanning && (
                   <div className="absolute top-[10%] right-[10%] w-[30%] h-[20%] border-2 border-red-500 bg-red-500/10 animate-pulse z-20 rounded-md">
                      <div className="absolute -top-6 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        徽章变更
                      </div>
                   </div>
                 )}
                 {showOverlay && !isScanning && (
                   <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[15%] border-2 border-red-500 bg-red-500/10 animate-pulse z-20 rounded-md animation-delay-500">
                      <div className="absolute -bottom-6 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        文案调整
                      </div>
                   </div>
                 )}

                 <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded shadow-sm">
                    当前版本
                 </div>
               </div>
            </div>
          </div>

          {/* AI Insight */}
          <InsightBox competitorName={competitor.title} />

        </div>
      </div>
    </div>
  );
};

export default DiffModal;
