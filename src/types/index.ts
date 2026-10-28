export type RiskLevel = 'Low apparent risk' | 'Caution' | 'High concern';

export interface ThreatTactic {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface MessageAnalysisResult {
  id: string;
  timestamp: string;
  messagePreview: string;
  riskLevel: RiskLevel;
  confidenceScore: number;
  scamType: string;
  detectedTactics: string[];
  detailedExplanation: string;
  practicalSteps: string[];
  warningQuotes: string[];
  isAiPowered: boolean;
  modelUsed?: string;
  fallbackReason?: string;
}

export interface UrlCheckResult {
  id: string;
  timestamp: string;
  url: string;
  protocol: string;
  isHttps: boolean;
  hostname: string;
  domain: string;
  tld: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  flags: {
    category: string;
    flag: string;
    severity: 'info' | 'warning' | 'danger';
    explanation: string;
  }[];
  safeAdvice: string[];
  isIpAddress: boolean;
  hasSuspiciousTld: boolean;
  hasMisleadingSubdomain: boolean;
}

export interface QuizQuestion {
  id: number;
  category: 'Phishing' | 'Fake Jobs' | 'Delivery Scams' | 'Banking' | 'UPI & Payments' | 'Social Engineering';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  redFlags: string[];
  safeAction: string;
}

export interface Scenario {
  id: string;
  title: string;
  platform: 'SMS' | 'WhatsApp' | 'Email' | 'LinkedIn';
  sender: string;
  senderHandle: string;
  timestamp: string;
  subject?: string;
  content: string;
  attachmentName?: string;
  clues: {
    textFragment: string;
    description: string;
  }[];
  correctVerdict: 'Suspicious / Scam' | 'Legitimate / Safe' | 'Uncertain / Need Verification';
  explanation: string;
  bestNextStep: string;
}

export interface LearningArticle {
  id: string;
  title: string;
  category: 'Banking' | 'Employment' | 'Delivery' | 'Payments' | 'Social' | 'Identity' | 'Family Safety';
  readTime: string;
  summary: string;
  realWorldImpact: string;
  commonTactics: string[];
  redFlagChecklist: string[];
  preventionSteps: string[];
  whatToDoIfVictim: string[];
  officialHelplineNote: string;
}

export interface IncidentReport {
  id: string;
  timestamp: string;
  dateOfIncident: string;
  scamCategory: string;
  platform: string;
  shortDescription: string;
  moneyShared: 'No' | 'Yes';
  amountLost?: string;
  personalInfoShared: 'No' | 'Yes';
  infoSharedTypes?: string[];
  evidenceNotes?: string;
  status: 'Locally Documented';
}

export interface ChecklistItem {
  id: string;
  category: 'Everyday Habits' | 'Device & Accounts' | 'Financial & UPI' | 'Family Protection';
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Recommended';
}

export interface ScamStat {
  id: string;
  statNumber: string;
  metricLabel: string;
  year: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  region: 'India' | 'Global' | 'United States';
  keyTakeaway: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isAiGenerated?: boolean;
}

export interface UserActivityItem {
  id: string;
  timestamp: string;
  type: 'message_check' | 'url_check' | 'quiz_completion' | 'incident_report' | 'checklist_update' | 'device_simulation' | 'scenario_game';
  title: string;
  summary: string;
  badge?: string;
}

export interface DeviceSimulationMessage {
  id: string;
  category: 'Reward / Cashback' | 'Bank OTP' | 'Parcel Delivery Fee' | 'Fake Job Offer';
  senderName: string;
  senderPhone: string;
  timestamp: string;
  avatarLetter: string;
  messageBody: string;
  suspiciousHighlights: {
    phrase: string;
    reason: string;
  }[];
  warningSigns: string[];
  safeAction: string;
  educationalFeedback: string;
}

export interface ScenarioTrainingItem {
  id: number;
  category: 'Fake Reward / Prize' | 'Bank Phishing' | 'Fake Work-From-Home' | 'Parcel Delivery Fee' | 'Friend / Family Impersonation';
  title: string;
  scenarioDescription: string;
  senderContext: string;
  mockMessageText: string;
  options: {
    id: 'A' | 'B' | 'C';
    text: string;
    isSafe: boolean;
    feedback: string;
  }[];
  correctOptionId: 'A' | 'B' | 'C';
  safetyTip: string;
  realWorldDefense: string;
}
