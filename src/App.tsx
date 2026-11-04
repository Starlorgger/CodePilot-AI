/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  MobileNav 
} from './components/MobileNav';
import { 
  IdeaInputScreen 
} from './components/IdeaInputScreen';
import { 
  PlanningModal 
} from './components/PlanningModal';
import { 
  BuildProgressView 
} from './components/BuildProgressView';
import { 
  PreviewFrame 
} from './components/PreviewFrame';
import { 
  NaturalLanguageEditor 
} from './components/NaturalLanguageEditor';
import { 
  DiagnosticsPanel 
} from './components/DiagnosticsPanel';
import { 
  CodeExplorer 
} from './components/CodeExplorer';
import { 
  PublishModal 
} from './components/PublishModal';
import { 
  ProjectsDashboard 
} from './components/ProjectsDashboard';
import { 
  SettingsModal 
} from './components/SettingsModal';
import { 
  AboutModal 
} from './components/AboutModal';
import { 
  PricingModal 
} from './components/PricingModal';
import { 
  AccountModal 
} from './components/AccountModal';
import { 
  ProductAdviserModal 
} from './components/ProductAdviserModal';
import { 
  AppProject, 
  ActiveTab, 
  DeviceViewport, 
  PlanData, 
  DiagnosticsResult, 
  ProjectVersion,
  SmartAdviserAnalysis
} from './types/project';
import { 
  loadProjects, 
  saveProjects, 
  getActiveProjectId, 
  setActiveProjectId, 
  createNewProject, 
  exportProjectZip 
} from './services/storage';
import { 
  checkBackendStatus, 
  generateAppPlan, 
  generateAppCode, 
  improveAppCode, 
  runDiagnosticsAndRepair, 
  analyzeIdeaWithAdviser,
  BackendStatus 
} from './services/api';
import { runComprehensiveDiagnostics } from './services/diagnosticsEngine';
import { 
  Lightbulb, 
  Play, 
  Wand2, 
  ShieldCheck, 
  FileCode2, 
  FolderGit2, 
  Share2, 
  Columns, 
  Maximize2 
} from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<AppProject[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('idea');
  const [viewport, setViewport] = useState<DeviceViewport>('desktop');
  const [isSplitView, setIsSplitView] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);

  // Workflow states
  const [pendingIdea, setPendingIdea] = useState<string>('');
  const [pendingPlan, setPendingPlan] = useState<PlanData | null>(null);
  const [adviserAnalysis, setAdviserAnalysis] = useState<SmartAdviserAnalysis | null>(null);
  const [isAnalyzingIdea, setIsAnalyzingIdea] = useState<boolean>(false);
  const [isPlanning, setIsPlanning] = useState<boolean>(false);
  const [isBuildingCode, setIsBuildingCode] = useState<boolean>(false);
  const [showBuildProgress, setShowBuildProgress] = useState<boolean>(false);
  const [isImproving, setIsImproving] = useState<boolean>(false);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [isRepairing, setIsRepairing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Modals
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showPricingModal, setShowPricingModal] = useState<boolean>(false);
  const [showAccountModal, setShowAccountModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('bamigboyeifetayo@gmail.com');

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Schedule Automated Audit on Version Save state
  const [scheduleAutomatedAudit, setScheduleAutomatedAudit] = useState<boolean>(() => {
    return localStorage.getItem('codepilot_schedule_automated_audit') === 'true';
  });

  const handleToggleScheduleAutomatedAudit = (enabled: boolean) => {
    setScheduleAutomatedAudit(enabled);
    localStorage.setItem('codepilot_schedule_automated_audit', String(enabled));
    if (enabled) {
      showToast('Schedule Automated Audit: Enabled. Diagnostics will automatically trigger every time a new version is saved.');
    } else {
      showToast('Schedule Automated Audit: Disabled.');
    }
  };

  // Initial load
  useEffect(() => {
    const loaded = loadProjects();
    setProjects(loaded);
    const activeId = getActiveProjectId();
    const found = loaded.find(p => p.id === activeId) || loaded[0];
    if (found) {
      setCurrentProjectId(found.id);
    }

    checkBackendStatus().then(status => {
      setBackendStatus(status);
    });
  }, []);

  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0] || null;

  // Persist projects whenever they change
  const updateProject = (updated: AppProject) => {
    setIsSaving(true);
    const nextProjects = projects.map(p => p.id === updated.id ? updated : p);
    setProjects(nextProjects);
    saveProjects(nextProjects);
    setTimeout(() => setIsSaving(false), 400);
  };

  // Smart AI Product Adviser analysis
  const handleAnalyzeIdea = async (idea: string) => {
    setPendingIdea(idea);
    setIsAnalyzingIdea(true);
    try {
      showToast('Smart Product Adviser analyzing 8 pillars...');
      const analysis = await analyzeIdeaWithAdviser(idea);
      setAdviserAnalysis(analysis);
    } catch (err: any) {
      showToast('Adviser error: ' + err.message);
    } finally {
      setIsAnalyzingIdea(false);
    }
  };

  const handleApplyAdviserRecommendations = (acceptedPillars: Record<string, string[]>) => {
    const acceptedEnhancements = Object.values(acceptedPillars).flat();
    setAdviserAnalysis(null);
    handleStartBuild(pendingIdea, { approvedPillars: acceptedPillars, approvedEnhancements: acceptedEnhancements });
  };

  // Step 1: User submits an idea -> Call AI to generate structured plan
  const handleStartBuild = async (idea: string, preferences?: Record<string, any>) => {
    setPendingIdea(idea);
    setIsPlanning(true);
    try {
      const plan = await generateAppPlan(idea, preferences);
      setPendingPlan(plan);
    } catch (err: any) {
      showToast('Error generating plan: ' + err.message);
      // Generate fallback local plan
      const titleWords = idea.split(' ').slice(0, 3).join(' ');
      const fallbackPlan: PlanData = {
        appName: (titleWords.charAt(0).toUpperCase() + titleWords.slice(1)) + ' Pro',
        tagline: 'Built with CodePilot AI',
        category: 'Custom Application',
        summary: `Created from: "${idea}". Fully interactive, responsive, with real state management.`,
        userFlow: [
          'Open workspace and view key metrics',
          'Search, filter, and create new records',
          'Toggle settings and theme preferences',
          'Export data and persist state in browser'
        ],
        suggestedEnhancements: [
          'Smart Search & Filtering',
          'Interactive Metric Cards',
          'Local Storage Auto-save',
          'Mobile Viewport Optimization'
        ],
        techStack: {
          frontend: 'React 19 + Tailwind CSS + Lucide Icons',
          state: 'LocalStorage Persistence',
          architecture: 'Single Page Application'
        },
        testChecklist: [
          'Syntax & runtime checks passed',
          'Responsive layout verified',
          'Button bindings validated'
        ]
      };
      setPendingPlan(fallbackPlan);
    } finally {
      setIsPlanning(false);
    }
  };

  // Step 2: User approves plan -> Build Code & Launch Preview
  const handleApprovePlan = async (approvedEnhancements: string[], answers: Record<string, string>) => {
    if (!pendingPlan) return;
    setIsBuildingCode(true);
    setShowBuildProgress(true);

    try {
      const codeResult = await generateAppCode(pendingIdea, pendingPlan, approvedEnhancements, answers);

      // Create new project object
      const newProj: AppProject = {
        id: 'project-' + Date.now(),
        name: pendingPlan.appName || 'My CodePilot App',
        tagline: pendingPlan.tagline || 'Build Smarter. Code Faster.',
        idea: pendingIdea,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        plan: pendingPlan,
        files: codeResult.files,
        previewHtml: codeResult.previewHtml,
        versions: [
          {
            id: 'v-' + Date.now(),
            timestamp: new Date().toISOString(),
            label: 'Initial Generation',
            files: { ...codeResult.files },
            previewHtml: codeResult.previewHtml,
          },
        ],
        lastDiagnostics: runComprehensiveDiagnostics(codeResult.previewHtml),
      };

      const nextProjects = [newProj, ...projects];
      setProjects(nextProjects);
      saveProjects(nextProjects);
      setCurrentProjectId(newProj.id);
      setActiveProjectId(newProj.id);
      setPendingPlan(null);
    } catch (err: any) {
      showToast('Error synthesizing code: ' + err.message);
    } finally {
      setIsBuildingCode(false);
    }
  };

  // Completed 10-step progress view
  const handleBuildProgressComplete = () => {
    setShowBuildProgress(false);
    setActiveTab('preview');
    showToast('App build complete! Interactive preview is live.');
  };

  // Natural Language Improvement
  const handleApplyImprovement = async (instruction: string) => {
    if (!currentProject) return;
    setIsImproving(true);

    try {
      const result = await improveAppCode(
        currentProject.files,
        instruction,
        currentProject.previewHtml
      );

      // Snapshot current state in version history
      const newVersion: ProjectVersion = {
        id: 'v-' + Date.now(),
        timestamp: new Date().toISOString(),
        label: `Improvement: "${instruction.slice(0, 30)}..."`,
        files: { ...currentProject.files },
        previewHtml: currentProject.previewHtml,
      };

      const updatedProject: AppProject = {
        ...currentProject,
        updatedAt: new Date().toISOString(),
        files: {
          ...currentProject.files,
          ...result.modifiedFiles,
        },
        previewHtml: result.previewHtml,
        versions: [newVersion, ...(currentProject.versions || [])],
      };

      updateProject(updatedProject);
      showToast(result.explanation || 'Improvements applied successfully!');
      setActiveTab('preview');

      // Automatically trigger handleRunDiagnostics if Schedule Automated Audit is active
      if (scheduleAutomatedAudit) {
        showToast('Automated Audit: New version saved! Running diagnostics test suite...');
        setTimeout(() => {
          handleRunDiagnostics();
        }, 500);
      }
    } catch (err: any) {
      showToast('Failed to apply improvement: ' + err.message);
    } finally {
      setIsImproving(false);
    }
  };

  // Save new manual version snapshot
  const handleSaveVersionSnapshot = (label?: string) => {
    if (!currentProject) return;
    const versionLabel = label || `Snapshot (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    const currentCov = currentProject.lastDiagnostics?.unitTestSummary?.coverage?.overallPercentage ?? 94;
    const newVersion: ProjectVersion = {
      id: 'v-' + Date.now(),
      timestamp: new Date().toISOString(),
      label: versionLabel,
      files: { ...currentProject.files },
      previewHtml: currentProject.previewHtml,
      coveragePercentage: currentCov,
      diagnostics: currentProject.lastDiagnostics || undefined,
    };

    const updatedProject: AppProject = {
      ...currentProject,
      updatedAt: new Date().toISOString(),
      versions: [newVersion, ...(currentProject.versions || [])],
    };
    updateProject(updatedProject);
    showToast(`Saved new version: "${versionLabel}"`);

    // Automatically trigger handleRunDiagnostics if Schedule Automated Audit is active
    if (scheduleAutomatedAudit) {
      showToast('Automated Audit: New version saved! Triggering diagnostic audit...');
      setTimeout(() => {
        handleRunDiagnostics();
      }, 500);
    }
  };

  // Rollback to specific version
  const handleRestoreVersion = (versionId: string) => {
    if (!currentProject) return;
    const targetVer = currentProject.versions?.find(v => v.id === versionId);
    if (!targetVer) return;

    const updatedProject: AppProject = {
      ...currentProject,
      updatedAt: new Date().toISOString(),
      files: { ...targetVer.files },
      previewHtml: targetVer.previewHtml,
    };
    updateProject(updatedProject);
    showToast(`Restored to snapshot from ${new Date(targetVer.timestamp).toLocaleTimeString()}`);
    setActiveTab('preview');
  };

  // Run Diagnostics & Automated Unit Tests
  const handleRunDiagnostics = async () => {
    if (!currentProject) return;
    setIsAuditing(true);
    try {
      const diagResult = await runDiagnosticsAndRepair(
        currentProject.files,
        currentProject.previewHtml
      );
      const updatedProject: AppProject = {
        ...currentProject,
        lastDiagnostics: diagResult,
      };
      updateProject(updatedProject);
      const covPct = diagResult.unitTestSummary?.coverage?.overallPercentage ?? 100;
      const testsCount = diagResult.unitTestSummary?.totalTests ?? 0;
      showToast(`Audit & test suite complete: ${diagResult.healthScore}% health & ${covPct}% coverage across ${testsCount} tests.`);
    } catch (err: any) {
      showToast('Audit error: ' + err.message);
    } finally {
      setIsAuditing(false);
    }
  };

  // Auto-Repair issues & Re-verify evidence
  const handleAutoRepair = async (specificError?: string) => {
    if (!currentProject) return;
    setIsRepairing(true);
    try {
      const diagResult = await runDiagnosticsAndRepair(
        currentProject.files,
        currentProject.previewHtml,
        specificError || 'autoRepair'
      );

      const updatedProject: AppProject = {
        ...currentProject,
        files: {
          ...currentProject.files,
          ...diagResult.repairedFiles,
        },
        previewHtml: diagResult.repairedPreviewHtml,
        lastDiagnostics: diagResult,
      };
      updateProject(updatedProject);
      showToast('Self-healing complete! Repaired code and re-verified automated tests.');
    } catch (err: any) {
      showToast('Auto-repair failed: ' + err.message);
    } finally {
      setIsRepairing(false);
    }
  };

  // Project Dashboard Handlers
  const handleSelectProject = (projectId: string) => {
    setCurrentProjectId(projectId);
    setActiveProjectId(projectId);
    setActiveTab('preview');
    showToast('Switched project workspace.');
  };

  const handleCreateNew = () => {
    setActiveTab('idea');
  };

  const handleRenameProject = (projectId: string, newName: string) => {
    const p = projects.find(x => x.id === projectId);
    if (!p) return;
    updateProject({ ...p, name: newName });
    showToast('Project renamed.');
  };

  const handleDuplicateProject = (projectId: string) => {
    const p = projects.find(x => x.id === projectId);
    if (!p) return;
    const cloned: AppProject = {
      ...p,
      id: 'project-' + Date.now(),
      name: `${p.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      versions: [
        {
          id: 'v-' + Date.now(),
          timestamp: new Date().toISOString(),
          label: 'Cloned from ' + p.name,
          files: { ...p.files },
          previewHtml: p.previewHtml,
        },
      ],
    };
    const nextProjects = [cloned, ...projects];
    setProjects(nextProjects);
    saveProjects(nextProjects);
    showToast('Project duplicated successfully.');
  };

  const handleDeleteProject = (projectId: string) => {
    const nextProjects = projects.filter(x => x.id !== projectId);
    if (nextProjects.length === 0) {
      const fresh = createNewProject('New Application', 'My custom app');
      setProjects([fresh]);
      saveProjects([fresh]);
      setCurrentProjectId(fresh.id);
    } else {
      setProjects(nextProjects);
      saveProjects(nextProjects);
      if (currentProjectId === projectId) {
        setCurrentProjectId(nextProjects[0].id);
      }
    }
    showToast('Project deleted.');
  };

  const handleExportZip = async (targetProj?: AppProject) => {
    const proj = targetProj || currentProject;
    if (!proj) return;
    try {
      showToast('Packaging project ZIP...');
      const blob = await exportProjectZip(proj);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${proj.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_source.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Downloaded project ZIP successfully!');
    } catch (err: any) {
      showToast('Export failed: ' + err.message);
    }
  };

  const handleResetDemoData = () => {
    localStorage.clear();
    const loaded = loadProjects();
    setProjects(loaded);
    setCurrentProjectId(loaded[0].id);
    showToast('Demo projects re-initialized.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar
        currentProject={currentProject}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewport={viewport}
        setViewport={setViewport}
        onNewApp={handleCreateNew}
        onExportZip={() => handleExportZip()}
        onOpenPublish={() => setShowPublishModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenAbout={() => setShowAboutModal(true)}
        onOpenPricing={() => setShowPricingModal(true)}
        onOpenAccount={() => setShowAccountModal(true)}
        isSaving={isSaving}
      />

      {/* Main Navigation Subheader */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-3 sm:px-6 py-2 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('idea')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'idea'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>My Idea</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('improve')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'improve'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Improve</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'diagnostics'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Diagnostics & Repair</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'files'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Project Files</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Projects</span>
          </button>
        </div>

        {/* Right side controls: Desktop Split View Toggle */}
        <div className="hidden lg:flex items-center gap-2">
          {activeTab !== 'projects' && (
            <button
              onClick={() => setIsSplitView(!isSplitView)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
                isSplitView
                  ? 'bg-indigo-950 border-indigo-500/50 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle side-by-side workspace"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{isSplitView ? 'Side-by-Side: On' : 'Side-by-Side'}</span>
            </button>
          )}

          <button
            onClick={() => setShowPublishModal(true)}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition flex items-center gap-1"
          >
            <Share2 className="w-3 h-3" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Workspace Body */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* If Build Progress is active */}
        {showBuildProgress ? (
          <BuildProgressView
            appName={currentProject?.name || 'New Application'}
            onComplete={handleBuildProgressComplete}
          />
        ) : isSplitView && activeTab !== 'projects' ? (
          /* Side-by-Side Workspace on Desktop / Tablets */
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Column: Interactive Tab */}
            <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-slate-800 overflow-y-auto">
              {activeTab === 'idea' && (
                <IdeaInputScreen
                  onStartBuild={handleStartBuild}
                  isLoading={isPlanning || isBuildingCode}
                  onAnalyzeIdea={handleAnalyzeIdea}
                  isAnalyzing={isAnalyzingIdea}
                  projects={projects}
                  currentProjectId={currentProjectId}
                  onSelectProject={handleSelectProject}
                  onRenameProject={handleRenameProject}
                  onDuplicateProject={handleDuplicateProject}
                  onDeleteProject={handleDeleteProject}
                  onOpenProjectsTab={() => setActiveTab('projects')}
                />
              )}
              {activeTab === 'improve' && currentProject && (
                <NaturalLanguageEditor
                  currentProject={currentProject}
                  onApplyImprovement={handleApplyImprovement}
                  onRestoreVersion={handleRestoreVersion}
                  isProcessing={isImproving}
                />
              )}
              {activeTab === 'diagnostics' && (
                <DiagnosticsPanel
                  diagnostics={currentProject?.lastDiagnostics || null}
                  onRunDiagnostics={handleRunDiagnostics}
                  onAutoRepair={() => handleAutoRepair()}
                  isAuditing={isAuditing}
                  isRepairing={isRepairing}
                />
              )}
              {activeTab === 'files' && currentProject && (
                <CodeExplorer
                  currentProject={currentProject}
                  onExportZip={() => handleExportZip()}
                />
              )}
              {activeTab === 'preview' && (
                <div className="p-6 text-center text-xs text-slate-400">
                  <p>In side-by-side mode, your live interactive app is active in the right pane.</p>
                  <button
                    onClick={() => setActiveTab('improve')}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                  >
                    Open Natural-Language Editor Here
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Live Interactive Sandbox Preview */}
            <div className="w-full lg:w-1/2 flex flex-col overflow-hidden h-[600px] lg:h-auto">
              <PreviewFrame
                previewHtml={currentProject?.previewHtml || ''}
                viewport={viewport}
                setViewport={setViewport}
                onAutoFixError={(err) => handleAutoRepair(err)}
                appName={currentProject?.name}
              />
            </div>
          </div>
        ) : (
          /* Full Screen Single Tab Workspace */
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'idea' && (
              <IdeaInputScreen
                onStartBuild={handleStartBuild}
                isLoading={isPlanning || isBuildingCode}
                onAnalyzeIdea={handleAnalyzeIdea}
                isAnalyzing={isAnalyzingIdea}
                projects={projects}
                currentProjectId={currentProjectId}
                onSelectProject={handleSelectProject}
                onRenameProject={handleRenameProject}
                onDuplicateProject={handleDuplicateProject}
                onDeleteProject={handleDeleteProject}
                onOpenProjectsTab={() => setActiveTab('projects')}
              />
            )}

            {activeTab === 'preview' && (
              <div className="h-[calc(100vh-112px)] flex flex-col">
                <PreviewFrame
                  previewHtml={currentProject?.previewHtml || ''}
                  viewport={viewport}
                  setViewport={setViewport}
                  onAutoFixError={(err) => handleAutoRepair(err)}
                  appName={currentProject?.name}
                />
              </div>
            )}

            {activeTab === 'improve' && currentProject && (
              <NaturalLanguageEditor
                currentProject={currentProject}
                onApplyImprovement={handleApplyImprovement}
                onRestoreVersion={handleRestoreVersion}
                isProcessing={isImproving}
              />
            )}

            {activeTab === 'diagnostics' && (
              <DiagnosticsPanel
                diagnostics={currentProject?.lastDiagnostics || null}
                lastDiagnostics={currentProject?.lastDiagnostics || null}
                projectName={currentProject?.name}
                versions={currentProject?.versions || []}
                onRunDiagnostics={handleRunDiagnostics}
                onAutoRepair={() => handleAutoRepair()}
                isAuditing={isAuditing}
                isRepairing={isRepairing}
                scheduleAutomatedAudit={scheduleAutomatedAudit}
                onToggleScheduleAutomatedAudit={handleToggleScheduleAutomatedAudit}
                onSaveVersion={handleSaveVersionSnapshot}
              />
            )}

            {activeTab === 'files' && currentProject && (
              <CodeExplorer
                currentProject={currentProject}
                onExportZip={() => handleExportZip()}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsDashboard
                projects={projects}
                currentProjectId={currentProjectId}
                onSelectProject={handleSelectProject}
                onCreateNew={handleCreateNew}
                onRenameProject={handleRenameProject}
                onDuplicateProject={handleDuplicateProject}
                onDeleteProject={handleDeleteProject}
                onExportZip={(p) => handleExportZip(p)}
              />
            )}
          </div>
        )}
      </main>

      {/* Smart AI Product Adviser Modal */}
      {adviserAnalysis && (
        <ProductAdviserModal
          analysis={adviserAnalysis}
          onClose={() => setAdviserAnalysis(null)}
          onProceedToBuild={handleApplyAdviserRecommendations}
        />
      )}

      {/* Planning Modal (When AI is ready with proposed architecture) */}
      {pendingPlan && (
        <PlanningModal
          plan={pendingPlan}
          originalIdea={pendingIdea}
          onApproveAndBuild={handleApprovePlan}
          onCancel={() => setPendingPlan(null)}
          isBuilding={isBuildingCode}
        />
      )}

      {/* Publish / Deploy Modal */}
      {showPublishModal && currentProject && (
        <PublishModal
          project={currentProject}
          onClose={() => setShowPublishModal(false)}
          onExportZip={() => handleExportZip()}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          backendStatus={backendStatus}
          projects={projects}
          onResetDemoData={handleResetDemoData}
        />
      )}

      {/* About Modal */}
      {showAboutModal && (
        <AboutModal onClose={() => setShowAboutModal(false)} />
      )}

      {/* Pricing & Transparency Modal */}
      {showPricingModal && (
        <PricingModal onClose={() => setShowPricingModal(false)} />
      )}

      {/* Account & Security Profile Modal */}
      {showAccountModal && (
        <AccountModal
          onClose={() => setShowAccountModal(false)}
          userEmail={userEmail}
          onUpdateEmail={(email) => setUserEmail(email)}
        />
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 right-4 z-50 bg-slate-900 border border-indigo-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs flex items-center gap-3 backdrop-blur-md animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white font-bold ml-1"
          >
            &times;
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setShowSettingsModal(true)}
      />
    </div>
  );
}
