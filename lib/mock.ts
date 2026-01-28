import { 
  Platform, Store, FeedItem, Threat, Competitor, 
  KillRule, KillEvent, Trend, MoneySavedSummary, ScriptCard,
  Evidence, Draft
} from '../types';

// --- Platforms ---
export const MOCK_PLATFORMS: Platform[] = [
  { id: 'p_amazon', name: 'Amazon', group: 'crossborder', capabilities: ['monitor', 'read', 'action'], color: '#FF9900', icon: 'amazon' },
  { id: 'p_tiktok', name: 'TikTok Shop', group: 'crossborder', capabilities: ['monitor', 'read'], color: '#000000', icon: 'tiktok' },
  { id: 'p_taobao', name: '淘宝/天猫', group: 'domestic', capabilities: ['monitor', 'read'], color: '#FF5000', icon: 'taobao' },
  { id: 'p_douyin', name: '抖音电商', group: 'domestic', capabilities: ['monitor', 'read', 'action'], color: '#161823', icon: 'douyin' },
  { id: 'p_shopify', name: 'Shopify', group: 'independent', capabilities: ['monitor', 'read', 'action'], color: '#96BF48', icon: 'shopify' },
  { id: 'p_shopee', name: 'Shopee', group: 'crossborder', capabilities: ['monitor'], color: '#EE4D2D', icon: 'shopee' },
  { id: 'p_jd', name: '京东', group: 'domestic', capabilities: ['monitor'], color: '#E1251B', icon: 'jd' },
  { id: 'p_pdd', name: '拼多多', group: 'domestic', capabilities: ['monitor'], color: '#E02E24', icon: 'pdd' },
];

// --- Stores ---
export const MOCK_STORES: Store[] = [
  { id: 's_amz_us', platformId: 'p_amazon', name: 'TechLife US Official', region: 'US', status: 'active', platformName: 'Amazon', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TL' },
  { id: 's_tk_uk', platformId: 'p_tiktok', name: 'Glamour Beauty UK', region: 'UK', status: 'auth_expired', platformName: 'TikTok Shop', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GB' },
  { id: 's_tb_cn', platformId: 'p_taobao', name: '极客数码旗舰店', region: 'CN', status: 'active', platformName: 'Taobao', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GK' },
  { id: 's_dy_cn', platformId: 'p_douyin', name: '极客生活直播间', region: 'CN', status: 'active', platformName: 'Douyin', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DL' },
  { id: 's_shp_global', platformId: 'p_shopify', name: 'MyBrand Global', region: 'Global', status: 'active', platformName: 'Shopify', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MB' },
];

// --- Dashboard Summary ---
export const MOCK_SAVED_SUMMARY: MoneySavedSummary = {
  totalAmount: 45200.00,
  currency: 'USD',
  period: 'month',
  breakdown: [
    { category: 'hijack', amount: 32000, count: 12 },
    { category: 'ads', amount: 8500, count: 45 },
    { category: 'pricing', amount: 4700, count: 128 },
  ]
};

// --- Feed ---
export const MOCK_FEED: FeedItem[] = [
  {
    id: 'f_1',
    time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    module: 'security',
    level: 'critical',
    title: '跟卖自动驱逐成功',
    message: 'Amazon ASIN B08X... 发现的新跟卖已被系统自动发送警告信驱逐。',
    isRead: false,
    actions: [{ label: '查看证据', type: 'modal', target: 'evidence_modal' }],
    tags: ['Amazon', 'Brand Protection']
  },
  {
    id: 'f_2',
    time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    module: 'finance',
    level: 'warning',
    title: '广告预算熔断触发',
    message: '抖音千川计划 "夏季大促_A" ROI 跌至 0.6 (阈值 0.8)，已自动暂停。',
    isRead: false,
    actions: [{ label: '复盘数据', type: 'link', target: '/ads/123' }, { label: '重启计划', type: 'api', target: 'resume_ad' }],
    tags: ['Douyin', 'Ads']
  },
  {
    id: 'f_3',
    time: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    module: 'intel',
    level: 'info',
    title: '竞品视觉变更',
    message: '竞品 "Anker" 主图更新，添加了 "Best Seller" 徽章。',
    isRead: true,
    actions: [{ label: '查看对比', type: 'modal', target: 'visual_diff' }],
    tags: ['Competitor']
  },
  {
    id: 'f_4',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    module: 'growth',
    level: 'info',
    title: '捕捉到新热点',
    message: 'TikTok 趋势 "#SummerVibes" 热度上升 200%，建议生成相关视频脚本。',
    isRead: true,
    actions: [{ label: '生成脚本', type: 'modal', target: 'generate_script' }],
    tags: ['Trend']
  }
];

// --- Threats ---
export const MOCK_THREATS: Threat[] = [
  {
    id: 't_1',
    storeId: 's_amz_us',
    type: 'hijack',
    level: 'critical',
    status: 'detected',
    detectedAt: new Date().toISOString(),
    targetAsin: 'B08XYZ123',
    hijackerName: 'BadActor Store',
    impactEstimate: '$1,200/day',
    evidences: [
      { id: 'e_1', type: 'screenshot', url: 'https://placehold.co/600x400/png?text=Hijack+Proof', title: 'Storefront Screenshot', createdAt: new Date().toISOString() }
    ],
    logs: ['Detected new offer at 02:00 AM', 'Buybox share dropped to 0%']
  },
  {
    id: 't_2',
    storeId: 's_tb_cn',
    type: 'negative_review',
    level: 'warning',
    status: 'processing',
    detectedAt: new Date(Date.now() - 86400000).toISOString(),
    targetAsin: 'SKU-RED-001',
    impactEstimate: 'DSR -0.1',
    evidences: [],
    logs: ['Detected 1-star review keyword: "fake"']
  }
];

// --- Competitors ---
export const MOCK_COMPETITORS: Competitor[] = [
  {
    id: 'c_1',
    monitoredStoreId: 's_amz_us',
    title: 'Main Competitor X',
    url: 'https://amazon.com/dp/B08...',
    price: { current: 29.99, currency: 'USD', diffRate: -0.15 },
    images: {
      today: 'https://placehold.co/400x400/orange/white?text=New+Image',
      yesterday: 'https://placehold.co/400x400/gray/white?text=Old+Image',
      diffOverlay: 'https://placehold.co/400x400/red/white?text=Diff+Highlight'
    },
    trend: 'down',
    lastChangeTime: '2 hours ago'
  },
  {
    id: 'c_2',
    monitoredStoreId: 's_tb_cn',
    title: 'Local Rival Y',
    url: 'https://item.taobao.com/...',
    price: { current: 199.00, currency: 'CNY', diffRate: 0 },
    images: {
      today: 'https://placehold.co/400x400/blue/white?text=Same+Image',
    },
    trend: 'stable',
    lastChangeTime: '1 day ago'
  }
];

// --- Automation / Kill Switch ---
export const MOCK_KILL_RULES: KillRule[] = [
  {
    id: 'kr_1',
    name: 'High ACOS Protection',
    description: 'If Ads ACOS > 80% for 3 hours, pause campaign.',
    ifCondition: { metric: 'acos', operator: '>', value: 0.8 },
    thenAction: { type: 'pause_campaign' },
    enabled: true,
    executionCount: 12
  },
  {
    id: 'kr_2',
    name: 'Inventory Emergency',
    description: 'If stock < 10, increase price by 20% to slow sales.',
    ifCondition: { metric: 'stock', operator: '<', value: 10 },
    thenAction: { type: 'adjust_price', params: { increase: 0.2 } },
    enabled: false,
    executionCount: 0
  }
];

export const MOCK_KILL_EVENTS: KillEvent[] = [
  {
    id: 'ke_1',
    ruleId: 'kr_1',
    ruleName: 'High ACOS Protection',
    timestamp: new Date().toISOString(),
    impactMoney: { amount: 450, currency: 'USD' },
    status: 'triggered',
    canRevert: true
  },
  {
    id: 'ke_2',
    ruleId: 'kr_1',
    ruleName: 'High ACOS Protection',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    impactMoney: { amount: 320, currency: 'USD' },
    status: 'success',
    canRevert: false
  }
];

// --- Trends ---
export const MOCK_TRENDS: Trend[] = [
  { id: 'tr_1', tag: '#SummerVibes', platform: 'tiktok', heat: 98, bgm: 'Cupid - Fifty Fifty', relatedKeywords: ['beach', 'sun', 'vacation'] },
  { id: 'tr_2', tag: '#OfficeHacks', platform: 'douyin', heat: 85, bgm: 'Work BGM', relatedKeywords: ['productivity', 'gadgets'] },
  { id: 'tr_3', tag: '#GRWM', platform: 'instagram', heat: 72, relatedKeywords: ['makeup', 'outfit'] },
];

export const MOCK_GENERATED_SCRIPTS: ScriptCard[] = [
  {
    id: 'sc_1',
    trendId: 'tr_1',
    title: 'Summer Essentials Showcase',
    hook: 'Stop packing your suitcase until you see this!',
    outline: [
      'Show messy suitcase packing.',
      'Introduce the product (Travel Organizer).',
      'Demonstrate how much space it saves.',
      'End with packing finished in 5 seconds.'
    ],
    hashtags: ['#travelhacks', '#packing', '#SummerVibes'],
    riskTips: ['Avoid music copyright claims', 'Do not mention competitor brand names'],
    estimatedViews: '10k - 50k'
  }
];
