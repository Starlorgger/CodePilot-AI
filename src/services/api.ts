import { PlanData, DiagnosticsResult } from '../types/project';

export interface BackendStatus {
  appName: string;
  tagline: string;
  status: string;
  hasApiKey: boolean;
  model: string;
  features: Record<string, boolean>;
}

export async function checkBackendStatus(): Promise<BackendStatus> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) throw new Error('Status check failed');
    return await res.json();
  } catch (err: any) {
    return {
      appName: 'CodePilot AI by Tayo Verse Studios',
      tagline: 'Build Smarter. Code Faster.',
      status: 'offline-mode',
      hasApiKey: false,
      model: 'intelligent-client-engine',
      features: {
        planGeneration: true,
        codeSynthesis: true,
        naturalLanguageEditing: true,
        automatedDiagnostics: true,
        liveSandboxPreview: true,
        zipExport: true,
      },
    };
  }
}

export async function generateAppPlan(idea: string, userPreferences?: Record<string, any>): Promise<PlanData> {
  const res = await fetch('/api/generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea, userPreferences }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to generate plan' }));
    throw new Error(err.error || 'Server error while generating plan');
  }
  const data = await res.json();
  return data.plan;
}

export interface GeneratedCodeResponse {
  files: Record<string, string>;
  previewHtml: string;
  summary: string;
}

export async function generateAppCode(
  idea: string,
  plan?: PlanData,
  approvedEnhancements?: string[],
  userClarifications?: Record<string, string>
): Promise<GeneratedCodeResponse> {
  const res = await fetch('/api/generate-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea, plan, approvedEnhancements, userClarifications }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to generate code' }));
    throw new Error(err.error || 'Server error while generating code');
  }
  return await res.json();
}

export interface ImproveCodeResponse {
  modifiedFiles: Record<string, string>;
  previewHtml: string;
  explanation: string;
}

export async function improveAppCode(
  existingFiles: Record<string, string>,
  instruction: string,
  currentPreviewHtml: string
): Promise<ImproveCodeResponse> {
  const res = await fetch('/api/improve-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ existingFiles, instruction, currentPreviewHtml }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to apply improvements' }));
    throw new Error(err.error || 'Server error while applying improvements');
  }
  return await res.json();
}

export async function runDiagnosticsAndRepair(
  files: Record<string, string>,
  previewHtml: string,
  reportedError?: string
): Promise<DiagnosticsResult & {
  repairedFiles: Record<string, string>;
  repairedPreviewHtml: string;
}> {
  const res = await fetch('/api/diagnose-repair', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files, previewHtml, reportedError }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Diagnostics failed' }));
    throw new Error(err.error || 'Server error running diagnostics');
  }
  return await res.json();
}

export async function sendAiChatMessage(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  currentPlan?: PlanData,
  currentProjectName?: string
): Promise<string> {
  const res = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, currentPlan, currentProjectName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Chat failed' }));
    throw new Error(err.error || 'Server error in AI companion');
  }
  const data = await res.json();
  return data.reply;
}

// In-memory analysis cache to prevent repeated identical requests
const analysisCache = new Map<string, any>();

export async function analyzeIdeaWithAdviser(idea: string): Promise<any> {
  const cacheKey = idea.trim().toLowerCase();
  if (analysisCache.has(cacheKey)) {
    return analysisCache.get(cacheKey);
  }

  const res = await fetch('/api/analyze-idea', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Analysis failed' }));
    throw new Error(err.error || 'Server error while analyzing idea');
  }
  const data = await res.json();
  if (data?.analysis) {
    analysisCache.set(cacheKey, data.analysis);
  }
  return data.analysis;
}

export async function reviewGeneratedApp(appName: string, idea: string, previewHtml: string): Promise<any> {
  const res = await fetch('/api/review-app', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appName, idea, previewHtml }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Review failed' }));
    throw new Error(err.error || 'Server error while reviewing app');
  }
  const data = await res.json();
  return data.review;
}

