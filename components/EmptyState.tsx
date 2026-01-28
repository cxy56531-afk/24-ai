import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from './ui/shadcn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action, className }) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50",
      className
    )}>
      <div className="p-4 bg-white rounded-full shadow-sm mb-4">
        <Icon className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
