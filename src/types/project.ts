export interface ProjectFile {
  name: string;
  content: string;
  language: string;
  size?: number;
}

export interface DecisionExplanation {
  decision: string;
  nonTechnicalReason: string;
  category: 'UX' | 'Architecture' | 'Performance' | 'Accessibility';
}

export interface EssentialRequirement {
  requirement: string;
  whyNeeded: string;
  question: string;
  suggestedAnswers: string[];
  userAnswer?: string;
}

export interface CapabilityBreakdown {
  verifiedSupported: string[];
  requiresConfiguration: string[];
}

export interface PlanData {
  appName: string;
  tagline: string;
  category: string;
  summary: string;
  userFlow: string[];
  suggestedEnhancements: string[];
  clarifyingQuestions?: Array<{
    question: string;
    suggestedAnswers: string[];
    userAnswer?: string;
  }>;
  essentialRequirements?: EssentialRequirement[];
  decisionExplanations?: DecisionExplanation[];
  capabilityBreakdown?: CapabilityBreakdown;
  techStack: {
    frontend: string;
    state: string;
    architecture: string;
  };
  testChecklist: string[];
}

export interface DiagnosticCheck {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  message: string;
}

export type DiagnosticCategory = 'syntax' | 'runtime' | 'navigation' | 'security' | 'validation';

export interface DiagnosticIssue {
  issue: string;
  severity: 'low' | 'medium' | 'high';
  category?: DiagnosticCategory;
  remedy: string;
  verifiedFixed?: boolean;
  evidence?: string;
}

export type UnitTestStatus = 'passed' | 'failed' | 'unverified';

export interface UnitTestResult {
  id: string;
  name: string;
  suite: string;
  status: UnitTestStatus;
  durationMs: number;
  assertion: string;
  evidence?: string;
  errorDetails?: string;
}

export interface CoverageMetric {
  total: number;
  covered: number;
  percentage: number;
}

export interface CoverageReport {
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
  overallPercentage: number;
}

export interface UnverifiedFeature {
  feature: string;
  reason: string;
  externalRequirement: string;
}

export interface UnitTestSummaryReport {
  totalTests: number;
  passed: number;
  failed: number;
  unverified: number;
  durationTotalMs: number;
  coverage: CoverageReport;
  tests: UnitTestResult[];
  unverifiedFeatures: UnverifiedFeature[];
}

export interface VectorAuditStatus {
  passed: boolean;
  message: string;
  issuesCount: number;
}

export interface DiagnosticsResult {
  healthScore: number;
  checksPerformed: DiagnosticCheck[];
  issuesFound: DiagnosticIssue[];
  unresolvedIssues?: DiagnosticIssue[];
  explanation: string;
  unitTestSummary?: UnitTestSummaryReport;
  coverageReport?: CoverageReport;
  vectorAudits?: Record<DiagnosticCategory, VectorAuditStatus>;
}

export interface ProjectVersion {
  id: string;
  timestamp: string;
  label: string;
  files: Record<string, string>;
  previewHtml: string;
  coveragePercentage?: number;
  diagnostics?: DiagnosticsResult;
}

export interface AdviserPillarItem {
  title: string;
  whyItMatters: string;
  recommendation?: string;
  costEstimate?: string;
  freeTierOption?: string;
  status: 'accepted' | 'postponed' | 'rejected';
}

export interface SmartAdviserAnalysis {
  appName: string;
  verdict: string;
  overallScore: number;
  summary: string;
  pillars: {
    missingFeatures: AdviserPillarItem[];
    userExperience: AdviserPillarItem[];
    simplicity: AdviserPillarItem[];
    performance: AdviserPillarItem[];
    accessibility: AdviserPillarItem[];
    securityAndPrivacy: AdviserPillarItem[];
    integrations: AdviserPillarItem[];
    operatingCosts: AdviserPillarItem[];
  };
  postBuildRoadmap: string[];
}

export interface PostBuildReview {
  score: number;
  highlights: string[];
  nextBestImprovements: Array<{
    label: string;
    impact: string;
    command: string;
  }>;
}

export interface AppProject {
  id: string;
  name: string;
  tagline: string;
  idea: string;
  createdAt: string;
  updatedAt: string;
  plan?: PlanData;
  files: Record<string, string>;
  previewHtml: string;
  versions: ProjectVersion[];
  lastDiagnostics?: DiagnosticsResult;
  adviserAnalysis?: SmartAdviserAnalysis;
  latestReview?: PostBuildReview;
}

export type ActiveTab = 'idea' | 'build' | 'preview' | 'improve' | 'files' | 'diagnostics' | 'publish' | 'projects';
export type DeviceViewport = 'mobile' | 'tablet' | 'desktop';

