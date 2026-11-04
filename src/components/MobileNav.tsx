import React from 'react';
import { Home, FolderGit2, PlusCircle, Play, Settings, Sparkles, Wrench } from 'lucide-react';
import { ActiveTab } from '../types/project';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSettings: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 flex items-center justify-around">
      <button
        onClick={() => setActiveTab('idea')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition ${
          activeTab === 'idea' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setActiveTab('projects')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition ${
          activeTab === 'projects' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <FolderGit2 className="w-4 h-4" />
        <span>Projects</span>
      </button>

      <button
        onClick={() => setActiveTab('idea')}
        className="flex flex-col items-center gap-1 -mt-4"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
          <PlusCircle className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold text-white">Create</span>
      </button>

      <button
        onClick={() => setActiveTab('preview')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition ${
          activeTab === 'preview' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Play className="w-4 h-4" />
        <span>Preview</span>
      </button>

      <button
        onClick={onOpenSettings}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition"
      >
        <Settings className="w-4 h-4" />
        <span>Settings</span>
      </button>
    </nav>
  );
};
