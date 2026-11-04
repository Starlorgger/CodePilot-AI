import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Copy, 
  Trash2, 
  Download, 
  Edit3, 
  Play, 
  Clock, 
  Layers, 
  Check, 
  AlertTriangle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AppProject } from '../types/project';

interface ProjectsDashboardProps {
  projects: AppProject[];
  currentProjectId: string;
  onSelectProject: (projectId: string) => void;
  onCreateNew: () => void;
  onRenameProject: (projectId: string, newName: string) => void;
  onDuplicateProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onExportZip: (project: AppProject) => void;
}

export const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({
  projects,
  currentProjectId,
  onSelectProject,
  onCreateNew,
  onRenameProject,
  onDuplicateProject,
  onDeleteProject,
  onExportZip,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<AppProject | null>(null);

  const startRename = (p: AppProject) => {
    setEditingId(p.id);
    setNewName(p.name);
  };

  const handleSaveRename = (projectId: string) => {
    if (newName.trim()) {
      onRenameProject(projectId, newName.trim());
    }
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      onDeleteProject(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Project Management & Local Storage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            My Applications ({projects.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            All your apps, generated files, and version snapshots are stored locally in your browser.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New App</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* New App Starter Card */}
        <button
          onClick={onCreateNew}
          className="h-64 rounded-3xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-900/30 hover:bg-slate-900/60 p-6 flex flex-col items-center justify-center text-center group transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition">
            Start From Scratch
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1">
            Type any idea in plain language and CodePilot AI will build a fresh project for you.
          </p>
        </button>

        {/* Existing Projects */}
        {projects.map((proj) => {
          const isActive = proj.id === currentProjectId;
          const isRenaming = editingId === proj.id;
          const fileCount = Object.keys(proj.files || {}).length;
          const versionCount = proj.versions?.length || 1;

          return (
            <div
              key={proj.id}
              className={`rounded-3xl border p-5 flex flex-col justify-between transition-all bg-slate-900 shadow-xl ${
                isActive
                  ? 'border-indigo-500/60 ring-2 ring-indigo-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isActive ? 'Active Workspace' : 'Saved Project'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(proj.updatedAt || proj.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Name & Rename */}
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
                      className="p-1.5 bg-indigo-600 text-white rounded-lg text-xs"
                      title="Save name"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between group">
                    <h3 className="text-base font-bold text-white tracking-tight truncate max-w-[200px]">
                      {proj.name}
                    </h3>
                    <button
                      onClick={() => startRename(proj)}
                      className="p-1 text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition"
                      title="Rename project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {proj.idea || proj.tagline || 'Custom application built with CodePilot AI.'}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-indigo-400" />
                    <span>{fileCount} Files</span>
                  </span>
                  <span>&bull;</span>
                  <span>{versionCount} Versions</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProject(proj.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isActive ? 'Current' : 'Open'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDuplicateProject(proj.id)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    title="Duplicate project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onExportZip(proj)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    title="Export project ZIP"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  {projects.length > 1 && (
                    <button
                      onClick={() => setDeleteCandidate(proj)}
                      className="p-2 text-rose-400/80 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
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

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/25 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Project</h3>
                <p className="text-xs text-slate-400">This action cannot be undone</p>
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
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
