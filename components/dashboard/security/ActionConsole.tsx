import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Copy, Send, AlertCircle, 
  ExternalLink, RefreshCw 
} from 'lucide-react';
import { Button, Card } from '../../ui/shadcn';
import { Threat } from '../../../types';
import ApproveModal from './ApproveModal';
import StatusBadge from '../../StatusBadge';
import EmptyState from '../../EmptyState';

interface ActionConsoleProps {
  threat: Threat | null;
  onRefresh: () => void;
}

const ActionConsole: React.FC<ActionConsoleProps> = ({ threat, onRefresh }) => {
  const [draft, setDraft] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'draft' | 'evidence'>('draft');

  // Simulate AI Draft Generation when threat changes
  useEffect(() => {
    if (threat) {
      if (threat.type === 'hijack') {
        setDraft(`To whom it may concern,\n\nWe are the intellectual property owner of the brand registered as "TechLife". It has come to our attention that you are listing ASIN ${threat.targetAsin} without our authorization.\n\nThis constitutes a violation of our IP rights and Amazon's policies. We demand that you remove your listing within 24 hours to avoid further legal action.\n\nSincerely,\nLegal Department`);
      } else {
        setDraft(`Dear Customer,\n\nWe are very sorry to hear about your experience. Quality is our top priority. Could you please contact us directly so we can make this right?\n\nBest regards,\nCustomer Support Team`);
      }
    }
  }, [threat]);

  const handleExecute = async (note: string) => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    console.log('Action Executed:', note);
    alert('✅ 指令已提交：系统正在处理中');
    setIsModalOpen(false);
  };

  if (!threat) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-50">
        <EmptyState 
          icon={FileText}
          title="选择左侧威胁项以处理"
          description="Select a threat to view details and take action"
          className="border-none bg-transparent"
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* 1. Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-white">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-slate-900">
              {threat.type === 'hijack' ? '跟卖驱逐处理' : '负面舆情公关'}
            </h2>
            <StatusBadge level={threat.level} />
          </div>
          <div className="text-sm text-slate-500 flex items-center gap-4">
            <span>Target: <span className="font-mono font-bold text-slate-700">{threat.targetAsin}</span></span>
            <span className="w-px h-3 bg-slate-300"></span>
            <span>Impact: <span className="text-red-600 font-medium">{threat.impactEstimate || 'Calculating...'}</span></span>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" onClick={onRefresh}>
             <RefreshCw className="w-4 h-4" />
           </Button>
           <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 bg-indigo-50">
             <ExternalLink className="w-4 h-4 mr-2" />
             View Listing
           </Button>
        </div>
      </div>

      {/* 2. Content Area (Tabs) */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        
        {/* Tab Switcher */}
        <div className="flex gap-4 mb-6 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('draft')}
            className={`pb-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'draft' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <FileText className="w-4 h-4" /> AI 律师函草稿
          </button>
          <button 
            onClick={() => setActiveTab('evidence')}
            className={`pb-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'evidence' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <AlertCircle className="w-4 h-4" /> 违规证据包 ({threat.evidences.length})
          </button>
        </div>

        {activeTab === 'draft' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>免责声明：AI 生成的草稿仅供参考，不构成正式法律建议。请在发送前仔细审查内容。ClawdCom 对使用此内容产生的后果不承担责任。</p>
            </div>
            
            <Card className="p-0 overflow-hidden shadow-sm border-slate-300">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-500">draft_v1.0.txt</span>
                <button 
                  className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600"
                  onClick={() => navigator.clipboard.writeText(draft)}
                >
                  <Copy className="w-3 h-3" /> 复制内容
                </button>
              </div>
              <textarea 
                className="w-full h-[300px] p-4 text-sm font-mono text-slate-800 bg-white outline-none resize-none"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {threat.evidences.length > 0 ? threat.evidences.map((evidence, idx) => (
              <Card key={idx} className="overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                <div className="h-32 bg-slate-200 relative overflow-hidden">
                  <img src={evidence.url} alt={evidence.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ExternalLink className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-bold text-sm text-slate-800 truncate">{evidence.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{new Date(evidence.createdAt).toLocaleDateString()}</div>
                </div>
              </Card>
            )) : (
              <div className="col-span-2">
                <EmptyState 
                  icon={AlertCircle} 
                  title="暂无证据文件" 
                  className="bg-transparent border-dashed"
                />
              </div>
            )}
            
            <button className="col-span-2 mt-4 flex items-center justify-center gap-2 py-3 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm transition-all">
              <Download className="w-4 h-4" />
              打包下载所有证据 (.zip)
            </button>
          </div>
        )}
      </div>

      {/* 3. Footer Action Bar */}
      <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <div className="text-xs text-slate-400">
          系统推荐置信度: <span className="text-emerald-600 font-bold">94%</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
             保存草稿
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 pl-4 pr-6"
          >
            <Send className="w-4 h-4 mr-2" />
            批准并发送
          </Button>
        </div>
      </div>

      {/* Modal */}
      <ApproveModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleExecute}
        actionTitle={threat.type === 'hijack' ? `发送律师函至 ${threat.hijackerName}` : '提交负面评价申诉'}
      />
    </div>
  );
};

export default ActionConsole;
