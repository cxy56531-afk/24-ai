import { Integration, Template, AlertItem, TimelineEvent, ActionTask, KpiStat } from '../types';

export const getMockIntegrations = (): Integration[] => [
  { id: 'taobao', name: '淘宝/天猫 (Taobao)', type: 'domestic', status: 'connected', capabilities: ['monitor', 'read'], lastSync: '1分钟前' },
  { id: 'douyin', name: '抖音电商 (Douyin)', type: 'domestic', status: 'connected', capabilities: ['monitor'], lastSync: '5分钟前' },
  { id: 'amazon_us', name: 'Amazon US', type: 'crossborder', status: 'connected', capabilities: ['monitor', 'read', 'action'], lastSync: '刚刚' },
  { id: 'tiktok_uk', name: 'TikTok Shop UK', type: 'crossborder', status: 'token_expired', capabilities: ['monitor', 'read'], lastSync: '3天前' },
  { id: 'shopify', name: 'Shopify 独立站', type: 'independent', status: 'connected', capabilities: ['monitor', 'read', 'action'], lastSync: '10分钟前' },
  { id: 'qianchuan', name: '巨量千川', type: 'ads', status: 'connected', capabilities: ['read', 'action'], lastSync: '30秒前' },
];

export const getMockTemplates = (): Template[] => [
  { 
    id: 't1', name: '视觉竞品情报 (Visual Spy)', description: '监控竞品主图/详情页变化，识别营销策略调整。', 
    category: 'intelligence', platforms: ['Taobao', 'Amazon', 'Douyin'], isActive: true, 
    stats: { todayEvents: 12, totalSavings: '早报已生成' } 
  },
  { 
    id: 't2', name: '跟卖自动驱逐 (Active Defense)', description: '发现跟卖立即生成律师函，需人工确认后发送。', 
    category: 'risk', platforms: ['Amazon'], isActive: true, 
    stats: { todayEvents: 3, totalSavings: '$1,200' } 
  },
  { 
    id: 't3', name: '跨平台库存熔断 (Kill Switch)', description: '广告ACOS暴涨或库存异常时，自动暂停推广。', 
    category: 'automation', platforms: ['Amazon', 'Douyin'], isActive: false, 
    stats: { todayEvents: 0 } 
  },
];

export const getMockInbox = (): AlertItem[] => [
  { id: 'a1', title: '跟卖预警', message: 'ASIN B08X... 发现新跟卖 (Just Launched)，建议立即驱逐。', level: 'high', platform: 'Amazon US', time: '10:42', status: 'pending', type: 'security' },
  { id: 'a2', title: '差评突增', message: 'SKU-2024-RED 近1小时新增 3 条一星评价，请检查批次质量。', level: 'medium', platform: '淘宝旗舰店', time: '09:15', status: 'pending', type: 'review' },
  { id: 'a3', title: '视觉变更', message: '竞品 Top1 更新了主图（增加了"3年质保"标签）。', level: 'low', platform: 'JD.com', time: '08:30', status: 'resolved', type: 'security' },
  { id: 'a4', title: '广告预算告急', message: '千川计划 A 消耗过快，ROI 低于 0.8。', level: 'medium', platform: '巨量千川', time: '07:20', status: 'pending', type: 'price' },
];

export const getMockTimeline = (): TimelineEvent[] => [
  { id: 'e1', time: '10:45', title: '系统巡逻完成', description: '扫描了 52 个监控对象，发现 1 个高危异常。', type: 'success' },
  { id: 'e2', time: '10:42', title: '发现跟卖风险', description: 'Amazon US 店铺检测到 ASIN B08X... 出现非授权卖家。', suggestion: '建议动作：发送律师函 (模板A)', type: 'warning' },
  { id: 'e3', time: '09:30', title: '竞品价格变动', description: '竞品 A (Taobao) 价格下调 10% (¥199 -> ¥179)。', suggestion: '建议：保持观望，暂不跟随', type: 'info' },
  { id: 'e4', time: '08:00', title: '日报已生成', description: '昨日全平台 GMV 汇总完毕，点击查看详情。', type: 'info' },
];

export const getMockActionQueue = (): ActionTask[] => [
  { 
    id: 'task1', title: '发送侵权投诉函', description: '针对 ASIN B08X... 的跟卖店铺 "BadSeller001" 发送 DMCA 投诉。', 
    platform: 'Amazon US', riskLevel: 'high', status: 'waiting_approval', createdAt: '10:43', autoExpireAt: '12:43' 
  },
  { 
    id: 'task2', title: '暂停低效广告计划', description: '千川计划 ID: 8823... ROI < 0.5，触发熔断阈值。', 
    platform: '巨量千川', riskLevel: 'medium', status: 'waiting_approval', createdAt: '10:30', autoExpireAt: '11:00' 
  },
];

export const getMockKpis = (): KpiStat[] => [
  { title: '待处理事项', value: 4, suffix: '项', status: 'exception' },
  { title: '今日情报捕获', value: 28, suffix: '条', trend: '+12%', trendUp: true, status: 'normal' },
  { title: '本周预估止损', value: '15,300', prefix: '¥', trend: '+5%', trendUp: true, status: 'normal' },
  { title: 'API 调用量', value: '45.2', suffix: 'k', status: 'normal' },
];