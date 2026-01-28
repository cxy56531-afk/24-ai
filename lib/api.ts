import { 
  MOCK_PLATFORMS, MOCK_STORES, MOCK_FEED, MOCK_THREATS, 
  MOCK_COMPETITORS, MOCK_KILL_RULES, MOCK_KILL_EVENTS, 
  MOCK_TRENDS, MOCK_SAVED_SUMMARY, MOCK_GENERATED_SCRIPTS 
} from './mock';
import { 
  Platform, Store, FeedItem, Threat, Competitor, 
  KillRule, KillEvent, Trend, ScriptCard, MoneySavedSummary 
} from '../types';

// --- Simulation Helpers ---

const LATENCY_MIN = 300;
const LATENCY_MAX = 800;
const ERROR_RATE = 0.1; // 10%

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulatedRequest<T>(data: T, shouldError: boolean = true): Promise<T> {
  const ms = Math.floor(Math.random() * (LATENCY_MAX - LATENCY_MIN + 1)) + LATENCY_MIN;
  await delay(ms);

  if (shouldError && Math.random() < ERROR_RATE) {
    throw new Error('Network Error: Simulated 500 or Timeout');
  }

  // Deep copy to prevent reference mutations in mock data during runtime
  return JSON.parse(JSON.stringify(data));
}

// --- API Methods ---

// 1. Platform & Store
export const getPlatforms = async (): Promise<Platform[]> => {
  return simulatedRequest(MOCK_PLATFORMS, false); // Low error rate for static config
};

export const getStores = async (): Promise<Store[]> => {
  return simulatedRequest(MOCK_STORES);
};

export const getCurrentStore = async (): Promise<Store | null> => {
  const stores = await getStores();
  return stores[0] || null;
};

// 2. Dashboard
export const getDashboardSummary = async (): Promise<MoneySavedSummary> => {
  return simulatedRequest(MOCK_SAVED_SUMMARY);
};

export const getLiveFeed = async (): Promise<FeedItem[]> => {
  return simulatedRequest(MOCK_FEED);
};

// 3. Threat Intelligence
export const getThreats = async (): Promise<Threat[]> => {
  return simulatedRequest(MOCK_THREATS);
};

export const getThreatDetail = async (id: string): Promise<Threat | undefined> => {
  const threats = await getThreats();
  return threats.find(t => t.id === id);
};

// 4. Competitors
export const getCompetitors = async (): Promise<Competitor[]> => {
  return simulatedRequest(MOCK_COMPETITORS);
};

export const getCompetitorDiff = async (id: string): Promise<Competitor | undefined> => {
  const comps = await getCompetitors();
  return comps.find(c => c.id === id);
};

// 5. Automation / Kill Switch
export const getKillRules = async (): Promise<KillRule[]> => {
  return simulatedRequest(MOCK_KILL_RULES);
};

export const updateKillRule = async (id: string, enabled: boolean): Promise<KillRule> => {
  // In a real app, this would PATCH to server. 
  // Here we simulate the update success.
  const rule = MOCK_KILL_RULES.find(r => r.id === id);
  if (!rule) throw new Error('Rule not found');
  
  const updatedRule = { ...rule, enabled };
  return simulatedRequest(updatedRule);
};

export const getKillEvents = async (): Promise<KillEvent[]> => {
  return simulatedRequest(MOCK_KILL_EVENTS);
};

export const revertKillEvent = async (id: string): Promise<KillEvent> => {
  const event = MOCK_KILL_EVENTS.find(e => e.id === id);
  if (!event) throw new Error('Event not found');
  
  // Simulate logic
  const updatedEvent = { ...event, status: 'reverted' as const, canRevert: false };
  return simulatedRequest(updatedEvent);
};

// 6. Trends & Content
export const getTrends = async (): Promise<Trend[]> => {
  return simulatedRequest(MOCK_TRENDS);
};

export const generateScripts = async (trendId: string, productInfo: string): Promise<ScriptCard[]> => {
  // Simulate AI Processing time (longer)
  await delay(1500); 
  
  if (Math.random() < ERROR_RATE) {
    throw new Error('AI Generation Failed: Model busy');
  }

  // Create a dynamic script based on input
  const newScript: ScriptCard = {
    id: `sc_gen_${Date.now()}`,
    trendId,
    title: `Viral Script for ${productInfo.substring(0, 10)}...`,
    hook: 'You wont believe what I just found!',
    outline: [
      'Hook: Show the problem dramatically.',
      `Solution: Introduce ${productInfo}.`,
      'Proof: Show it working instantly.',
      'CTA: Link in bio to grab yours.'
    ],
    hashtags: ['#musthave', '#fyp', '#viral'],
    riskTips: ['Ensure genuine demonstration'],
    estimatedViews: '50k+'
  };

  return [newScript, ...MOCK_GENERATED_SCRIPTS];
};
