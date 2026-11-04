import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Download, 
  Share2, 
  Settings, 
  FolderGit2, 
  PlusCircle, 
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  DollarSign,
  User
} from 'lucide-react';
import { ActiveTab, DeviceViewport, AppProject } from '../types/project';

interface NavbarProps {
  currentProject: AppProject | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewport: DeviceViewport;
  setViewport: (vp: DeviceViewport) => void;
  onNewApp: () => void;
  onExportZip: () => void;
  onOpenPublish: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenPricing: () => void;
  onOpenAccount: () => void;
  isSaving?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  activeTab,
  setActiveTab,
  viewport,
  setViewport,
  onNewApp,
  onExportZip,
  onOpenPublish,
  onOpenSettings,
  onOpenAbout,
  onOpenPricing,
  onOpenAccount,
  isSaving = false,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
      {/* Brand & Studio info */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setActiveTab('idea')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          title="Return to Dashboard"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-indigo-300 transition">
                CodePilot AI
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-semibold uppercase tracking-wider">
                Studio
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              by <span className="text-slate-300 font-semibold">Tayo Verse Studios</span> &bull; <span className="text-indigo-400">Build Smarter. Code Faster.</span>
            </div>
          </div>
        </button>

        {/* Current Project Pill (Desktop/Tablet) */}
        {currentProject && (
          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-800">
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition flex items-center gap-1.5 max-w-[180px] truncate"
              title="Switch or manage projects"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{currentProject.name}</span>
            </button>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              {isSaving ? (
                <>
                  <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-slate-400">Saved</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Center Device Switcher (Visible when Preview is active) */}
      {activeTab === 'preview' && (
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              viewport === 'mobile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">Mobile</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              viewport === 'tablet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="text-[11px]">Tablet</span>
          </button>
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              viewport === 'desktop'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="text-[11px]">Desktop</span>
          </button>
        </div>
      )}

      {/* Right Action buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* About Button */}
        <button
          onClick={onOpenAbout}
          className="p-2 sm:px-2.5 sm:py-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition text-xs font-medium flex items-center gap-1"
          title="About CodePilot AI & Tayo Verse Studios"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden lg:inline">About</span>
        </button>

        {/* Pricing Button */}
        <button
          onClick={onOpenPricing}
          className="p-2 sm:px-2.5 sm:py-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition text-xs font-medium flex items-center gap-1"
          title="Plans & Pricing"
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline">Plans</span>
        </button>

        <button
          onClick={onNewApp}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
          title="Start a new application from an idea"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New App</span>
        </button>

        <button
          onClick={onExportZip}
          className="p-2 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700/80 transition flex items-center gap-1.5"
          title="Download complete project source ZIP"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Export ZIP</span>
        </button>

        <button
          onClick={onOpenPublish}
          className="p-2 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700/80 transition flex items-center gap-1.5"
          title="Publish & deploy application"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Publish</span>
        </button>

        {/* Account Button */}
        <button
          onClick={onOpenAccount}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title="Developer Profile & Security"
        >
          <User className="w-4 h-4 text-indigo-400" />
        </button>

        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title="Platform settings & info"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
