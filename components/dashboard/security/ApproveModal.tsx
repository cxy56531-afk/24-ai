import React, { useState } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';
import { Button } from '../../ui/shadcn';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (note: string) => Promise<void>;
  actionTitle: string;
}

const ApproveModal: React.FC<ApproveModalProps> = ({ isOpen, onClose, onConfirm, actionTitle }) => {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!note.trim()) return;
    setIsSubmitting(true);
    await onConfirm(note);
    setIsSubmitting(false);
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-full flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">确认执行操作？</h3>
            <p className="text-sm text-amber-700 mt-1">此操作将对外部平台生效，请谨慎处理。</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              即将执行动作
            </label>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-sm font-bold text-slate-900">
              {actionTitle}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              操作备注 (必填) <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
              placeholder="请输入批准理由或特殊说明..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1 text-right">
              {note.length}/200
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
          <Button 
            variant="danger" 
            onClick={handleSubmit} 
            disabled={!note.trim() || isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 border-transparent"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                提交中...
              </>
            ) : (
              '确认并执行'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
