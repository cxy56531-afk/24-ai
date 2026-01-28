export type ModuleType = 'security' | 'intel' | 'finance' | 'growth';
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success';
export type ConnectionStatus = 'connected' | 'disconnected' | 'token_expired' | 'error';

export const MODULE_THEME = {
  security: {
    color: 'red',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    iconBg: 'bg-red-500',
    shadow: 'shadow-red-100',
  },
  intel: {
    color: 'blue',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    iconBg: 'bg-blue-500',
    shadow: 'shadow-blue-100',
  },
  finance: {
    color: 'emerald',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    iconBg: 'bg-emerald-500',
    shadow: 'shadow-emerald-100',
  },
  growth: {
    color: 'purple',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    iconBg: 'bg-purple-500',
    shadow: 'shadow-purple-100',
  },
};

export const LEVEL_STYLES: Record<SeverityLevel, string> = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-slate-100 text-slate-700 border-slate-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export const STATUS_STYLES: Record<ConnectionStatus, string> = {
  connected: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  disconnected: 'bg-slate-100 text-slate-500 border-slate-200',
  token_expired: 'bg-orange-100 text-orange-800 border-orange-200',
  error: 'bg-red-100 text-red-800 border-red-200',
};

export const getModuleTheme = (module: string) => {
  return MODULE_THEME[module as ModuleType] || MODULE_THEME.security;
};
