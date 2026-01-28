import React from 'react';

// ==========================================
// Section 1: Legacy Types (Maintained for Backward Compatibility)
// ==========================================

export enum PlanTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

export type PlatformType = 'domestic' | 'crossborder' | 'independent' | 'ads' | 'erp';
export type CapabilityTier = 'monitor' | 'read' | 'action';

export interface Integration {
  id: string;
  name: string;
  type: PlatformType;
  status: 'connected' | 'disconnected' | 'error' | 'token_expired';
  capabilities: CapabilityTier[];
  lastSync?: string;
  icon?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'risk' | 'intelligence' | 'automation';
  platforms: string[];
  isActive: boolean;
  stats: {
    todayEvents: number;
    totalSavings?: string;
  };
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  level: 'high' | 'medium' | 'low';
  platform: string;
  time: string;
  status: 'pending' | 'processing' | 'resolved';
  type: 'security' | 'price' | 'inventory' | 'review';
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  suggestion?: string;
  type: 'info' | 'warning' | 'success' | 'action';
}

export interface ActionTask {
  id: string;
  title: string;
  description: string;
  platform: string;
  riskLevel: 'high' | 'medium' | 'low';
  status: 'waiting_approval' | 'approved' | 'rejected' | 'executing' | 'completed';
  createdAt: string;
  autoExpireAt: string;
}

export interface KpiStat {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: string;
  trend?: string;
  trendUp?: boolean;
  status?: 'normal' | 'exception';
}

// ==========================================
// Section 2: New "ClawdCom Ops" Types
// ==========================================

// --- Shared Unions ---
export type PlatformGroup = PlatformType; // Alias for consistency
export type PlatformCapability = CapabilityTier; // Alias for consistency

export type FeedModule = 'security' | 'intel' | 'finance' | 'growth';
export type FeedLevel = 'info' | 'warning' | 'critical';

export type ThreatType = 'hijack' | 'ip' | 'negative_review' | 'complaint';
export type ThreatStatus = 'detected' | 'processing' | 'resolved' | 'ignored';

export type EvidenceType = 'snapshot' | 'screenshot' | 'order' | 'logistics';

export type DraftTone = 'gentle' | 'formal' | 'assertive' | 'humorous';

export type StoreStatus = 'active' | 'auth_expired' | 'suspended' | 'disconnected';

export type TrendPlatform = 'tiktok' | 'douyin' | 'instagram' | 'xiaohongshu';

// --- Core Entities ---

export interface Platform {
  id: string;
  name: string;
  group: PlatformGroup;
  capabilities: PlatformCapability[];
  icon?: string;
  color?: string; // Hex color for UI tags
}

export interface Store {
  id: string;
  platformId: string;
  name: string;
  region: string; // e.g., 'US', 'CN', 'Global'
  status: StoreStatus;
  
  // UI helpers
  platformName?: string;
  avatarUrl?: string;
  lastSyncTime?: string;
}

export interface FeedAction {
  label: string;
  type: 'link' | 'api' | 'modal' | 'copy';
  target: string; // URL, API endpoint, or UI Modal ID
  isPrimary?: boolean;
  payload?: any;
}

export interface FeedItem {
  id: string;
  time: string; // ISO string
  module: FeedModule;
  level: FeedLevel;
  title: string;
  message: string;
  actions: FeedAction[];
  tags?: string[];
  isRead: boolean;
}

export interface Evidence {
  id: string;
  type: EvidenceType;
  url: string; // URL to image/doc
  title: string;
  createdAt: string;
}

export interface Threat {
  id: string;
  storeId: string;
  type: ThreatType;
  level: FeedLevel;
  status: ThreatStatus;
  detectedAt: string; // ISO string
  
  // Threat Context
  targetAsin?: string;
  targetUrl?: string;
  hijackerName?: string;
  impactEstimate?: string; // e.g., "$500/day"

  evidences: Evidence[];
  logs?: string[];
}

export interface Draft {
  id: string;
  refId: string; // ID of the Threat or Task this draft is for
  tone: DraftTone;
  content: string;
  language: string;
  version: number;
  createdAt: string;
}

export interface Competitor {
  id: string;
  monitoredStoreId: string;
  title: string;
  url: string;
  
  price: {
    current: number;
    currency: string;
    diffRate: number; // e.g., -0.10 for 10% drop
  };
  
  images: {
    today: string;
    yesterday?: string; // If null, implies no change
    diffOverlay?: string; // Visual diff image URL
  };
  
  trend: 'up' | 'down' | 'stable';
  lastChangeTime: string;
}

export interface KillRule {
  id: string;
  name: string;
  description: string;
  
  // Logic description for UI
  ifCondition: {
    metric: string; // 'acos', 'stock', 'rating'
    operator: '>' | '<' | '=' | 'contains';
    value: string | number;
  };
  
  thenAction: {
    type: 'pause_campaign' | 'adjust_price' | 'alert';
    params?: any;
  };
  
  enabled: boolean;
  executionCount: number;
}

export interface KillEvent {
  id: string;
  ruleId: string;
  ruleName: string;
  timestamp: string;
  impactMoney: {
    amount: number;
    currency: string;
  };
  status: 'triggered' | 'success' | 'failed' | 'reverted';
  canRevert: boolean;
}

export interface Trend {
  id: string;
  tag: string;
  bgm?: string;
  platform: TrendPlatform;
  heat: number; // 0-100 score
  relatedKeywords: string[];
}

export interface ScriptCard {
  id: string;
  trendId?: string;
  title: string;
  hook: string; // The "Golden 3 Seconds"
  outline: string[]; // Step-by-step points
  hashtags: string[];
  riskTips: string[]; // Platform compliance warnings
  estimatedViews?: string;
}

export interface MoneySavedSummary {
  totalAmount: number;
  currency: string;
  period: 'month' | 'year' | 'total';
  breakdown: {
    category: 'hijack' | 'pricing' | 'ads';
    amount: number;
    count: number;
  }[];
}
