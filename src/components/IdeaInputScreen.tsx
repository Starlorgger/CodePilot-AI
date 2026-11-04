import React, { useState } from 'react';
import { 
  Sparkles, 
  Rocket, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Cpu, 
  Smartphone, 
  Wand2, 
  Layers, 
  FolderGit2, 
  Play, 
  Clock, 
  Copy, 
  Trash2, 
  Edit3, 
  Check, 
  Plus, 
  AlertTriangle 
} from 'lucide-react';
import { AppProject } from '../types/project';

interface IdeaInputScreenProps {
  onStartBuild: (idea: string, preferences: Record<string, any>) => void;
  isLoading?: boolean;
  onAnalyzeIdea?: (idea: string) => void;
  isAnalyzing?: boolean;
  projects?: AppProject[];
  currentProjectId?: string;
  onSelectProject?: (projectId: string) => void;
  onRenameProject?: (projectId: string, newName: string) => void;
  onDuplicateProject?: (projectId: string) => void;
  onDeleteProject?: (projectId: string) => void;
  onOpenProjectsTab?: () => void;
}

const INSPIRATION_IDEAS = [
  {
    title: 'Client CRM & Invoice Generator',
    desc: 'Manage clients, track billable project milestones, generate downloadable PDF invoices, and view payment statuses.',
    category: 'Business',
  },
  {
    title: 'Fitness & Habit Streak Tracker',
    desc: 'Log daily workouts, track water and calorie intake, build weekly habit streaks, and view motivational charts.',
    category: 'Health',
  },
  {
    title: 'Recipe Book & Smart Grocery Planner',
    desc: 'Browse recipe categories, filter by dietary requirements, calculate ingredient proportions, and auto-generate grocery lists.',
    category: 'Lifestyle',
  },
  {
    title: 'Freelance Task & Kanban Board',
    desc: 'Drag-and-drop workflow columns (To Do, In Progress, Review, Completed), task priority labels, and time estimates.',
    category: 'Productivity',
  },
  {
    title: 'Crypto & Stock Watchlist Dashboard',
    desc: 'Real-time market tickers, personalized portfolio value tracker, price alerts, and profit/loss calculation cards.',
    category: 'Finance',
  },
  {
    title: 'Minimalist Digital Gear Storefront',
    desc: 'Modern online catalog with product detail modals, live cart drawer, customer ratings, and simulated checkout flow.',
    category: 'E-Commerce',
  },
];

export const IdeaInputScreen: React.FC<IdeaInputScreenProps> = ({
  onStartBuild,
  isLoading = false,
  onAnalyzeIdea,
  isAnalyzing = false,
  projects = [],
  currentProjectId,
  onSelectProject,
  onRenameProject,
  onDuplicateProject,
  onDeleteProject,
  onOpenProjectsTab,
}) => {
  const [ideaText, setIdeaText] = useState('');
  const [authEnabled, setAuthEnabled] = useState(true);
  const [localStorageEnabled, setLocalStorageEnabled] = useState(true);
  const [responsiveTested, setResponsiveTested] = useState(true);

  // Project management state on dashboard
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<AppProject | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim() || isLoading) return;
    onStartBuild(ideaText.trim(), {
      includeAuth: authEnabled,
      includeLocalStorage: localStorageEnabled,
      responsiveTested: responsiveTested,
    });
  };

  const handleSelectInspiration = (inspiration: typeof INSPIRATION_IDEAS[0]) => {
    setIdeaText(inspiration.desc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveRename = (projectId: string) => {
    if (onRenameProject && newName.trim()) {
      onRenameProject(projectId, newName.trim());
    }
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (deleteCandidate && onDeleteProject) {
      onDeleteProject(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Exact Home Page & Dashboard Hero as requested in Section 3 */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tayo Verse Studios &bull; CodePilot AI</span>
        </div>
        
        {/* Required Prominent Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Turn Your Ideas Into Real Apps.
        </h1>
        
        {/* Required Supporting Text */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Describe what you want to build. Let AI help you create, test, and improve your app.
        </p>
      </div>

      {/* Main Idea Input Card */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-3 left-6 sm:left-8 px-3 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600 text-white uppercase tracking-wider shadow">
          Create New Project
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label 
              htmlFor="ideaInput" 
              className="block text-base sm:text-lg font-bold text-white tracking-tight"
            >
              What app would you like to create today?
            </label>
            <div className="relative">
              <textarea
                id="ideaInput"
                rows={5}
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="Example: I want an online shopping app where customers can browse minimalist tech gear, add items to a cart, pay for orders, and track simulated deliveries..."
                className="w-full p-4 bg-slate-950/90 border border-slate-800 rounded-2xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition leading-relaxed resize-none"
                required
              />
              <div className="absolute right-3 bottom-3 text-[11px] text-slate-500">
                {ideaText.length} characters
              </div>
            </div>
          </div>

          {/* User Feature Options */}
          <div className="bg-slate-950/60 rounded-xl p-3 sm:p-4 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-medium">Automatic Setup:</span>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={localStorageEnabled} 
                  onChange={(e) => setLocalStorageEnabled(e.target.checked)} 
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700" 
                />
                <span>Save Data in Browser</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={authEnabled} 
                  onChange={(e) => setAuthEnabled(e.target.checked)} 
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700" 
                />
                <span>User Session & Accounts</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={responsiveTested} 
                  onChange={(e) => setResponsiveTested(e.target.checked)} 
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700" 
                />
                <span>Mobile + Desktop Ready</span>
              </label>
            </div>
          </div>

          {/* Dual Action Buttons: "Smart AI Adviser" & "Build My App" */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                if (ideaText.trim() && onAnalyzeIdea && !isLoading && !isAnalyzing) {
                  onAnalyzeIdea(ideaText.trim());
                }
              }}
              disabled={!ideaText.trim() || isLoading || isAnalyzing}
              className={`py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 border transition-all ${
                !ideaText.trim() || isLoading || isAnalyzing
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-amber-950/30 hover:bg-amber-950/50 border-amber-500/40 text-amber-300 hover:text-white shadow-lg shadow-amber-950/20 active:scale-[0.99]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span>Analyzing with AI Adviser...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Smart AI Adviser (Analyze First)</span>
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={!ideaText.trim() || isLoading || isAnalyzing}
              className={`py-3.5 px-5 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all ${
                !ideaText.trim() || isLoading || isAnalyzing
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Planning & Synthesizing Code...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Build My App</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* "My Projects" Section on the Dashboard */}
      {projects && projects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                My Projects ({projects.length})
              </h2>
            </div>
            {onOpenProjectsTab && (
              <button
                onClick={onOpenProjectsTab}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((proj) => {
              const isActive = proj.id === currentProjectId;
              const isRenaming = editingId === proj.id;

              return (
                <div
                  key={proj.id}
                  className={`bg-slate-900 border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                    isActive
                      ? 'border-indigo-500/60 ring-1 ring-indigo-500/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 ${
                        isActive
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {isActive ? 'Current App' : 'Ready to Test'}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(proj.updatedAt || proj.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {isRenaming ? (
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500 flex-1"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRename(proj.id)}
                          className="p-1 bg-indigo-600 text-white rounded text-xs"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group">
                        <h4 className="text-sm font-bold text-white truncate max-w-[190px]">
                          {proj.name}
                        </h4>
                        {onRenameProject && (
                          <button
                            onClick={() => {
                              setEditingId(proj.id);
                              setNewName(proj.name);
                            }}
                            className="p-1 text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition"
                            title="Rename project"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {proj.idea || proj.tagline || 'Application built with CodePilot AI.'}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                    {onSelectProject && (
                      <button
                        onClick={() => onSelectProject(proj.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <Play className="w-3 h-3" />
                        <span>{isActive ? 'Preview Live' : 'Open'}</span>
                      </button>
                    )}

                    <div className="flex items-center gap-1">
                      {onDuplicateProject && (
                        <button
                          onClick={() => onDuplicateProject(proj.id)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                          title="Duplicate project"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {projects.length > 1 && onDeleteProject && (
                        <button
                          onClick={() => setDeleteCandidate(proj)}
                          className="p-1.5 text-rose-400/80 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Dashboard */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/25 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Project</h3>
                <p className="text-xs text-slate-400">Action cannot be undone</p>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to delete <strong>"{deleteCandidate.name}"</strong>? All associated files and version snapshots will be removed from local storage.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helpful Examples for First-Time Users */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Helpful Examples for First-Time Users
            </h2>
          </div>
          <span className="text-xs text-slate-500">Click any example to load</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSPIRATION_IDEAS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectInspiration(item)}
              className="text-left bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 transition-all group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition">
                    {item.category}
                  </span>
                  <Wand2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition" />
                </div>
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Use this example</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
