import React from 'react';
import { LEVEL_STYLES, STATUS_STYLES, SeverityLevel, ConnectionStatus } from '../lib/theme';
import { cn } from './ui/shadcn';

interface StatusBadgeProps {
  level?: SeverityLevel | string;
  status?: ConnectionStatus | string;
  text?: string;
  className?: string;
  icon?: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ level, status, text, className, icon }) => {
  let styleClass = 'bg-slate-100 text-slate-600 border-slate-200';

  if (level && LEVEL_STYLES[level as SeverityLevel]) {
    styleClass = LEVEL_STYLES[level as SeverityLevel];
  } else if (status && STATUS_STYLES[status as ConnectionStatus]) {
    styleClass = STATUS_STYLES[status as ConnectionStatus];
  } else if (status === 'triggered') { // Custom mappings if needed
    styleClass = LEVEL_STYLES.critical; 
  } else if (status === 'reverted') {
    styleClass = LEVEL_STYLES.low;
  }

  const displayText = text || (level || status || '').toUpperCase();

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
      styleClass,
      className
    )}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {displayText}
    </span>
  );
};

export default StatusBadge;
