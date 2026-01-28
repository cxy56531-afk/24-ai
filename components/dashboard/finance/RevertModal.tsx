import React, { useState } from 'react';
import { Undo2, X, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/shadcn';

interface RevertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  eventTitle: string;
}

const RevertModal: React.FC<RevertModalProps> = ({ isOpen, onClose, onConfirm, eventTitle }) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    setIsSubmitting(true);
    await onConfirm(reason);
    setIsSubmitting(false);
    setReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-start gap-3">
          <div className="p-2 bg-white border border-slate-200 rounded-lg flex-shrink-0 text-slate-600">
            <Undo2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">确认回滚操作？</h3>
            <p className="text-sm text-slate-500 mt-1">系统将撤销之前的风控指令，恢复原始状态。</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>回滚对象: <strong>{eventTitle}</strong></span>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              回滚原因 (必填) <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
              placeholder="例如：误判，广告计划 ROI 实际达标..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
          <Button 
            className="bg-slate-800 hover:bg-slate-900 text-white"
            onClick={handleSubmit} 
            disabled={!reason.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                提交中...
              </>
            ) : (
              '确认回滚'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RevertModal;
