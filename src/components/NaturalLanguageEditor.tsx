import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  ArrowRight, 
  History, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  Palette,
  Shield,
  Smartphone,
  CreditCard,
  LayoutDashboard,
  Search,
  MousePointerClick,
  Database,
  GitCompare,
  X,
  FileCode2,
  Check,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { AppProject, ProjectVersion } from '../types/project';

interface NaturalLanguageEditorProps {
  currentProject: AppProject;
  onApplyImprovement: (instruction: string) => Promise<void>;
  onRestoreVersion?: (versionId: string) => void;
  isProcessing?: boolean;
}

const QUICK_INSTRUCTIONS = [
  { text: 'Make the design more professional.', icon: Palette, category: 'Design' },
  { text: 'Add a login and registration page.', icon: Shield, category: 'Auth' },
  { text: 'Make this app work better on phones.', icon: Smartphone, category: 'Mobile' },
  { text: 'Add a payment feature.', icon: CreditCard, category: 'Commerce' },
  { text: 'Fix the error on this page.', icon: Wand2, category: 'Repair' },
  { text: 'Add a dashboard for users.', icon: LayoutDashboard, category: 'Dashboard' },
  { text: 'Change the colours to blue and white.', icon: Palette, category: 'Theme' },
  { text: "Save users' projects.", icon: Database, category: 'Storage' },
  { text: 'Make the buttons work.', icon: MousePointerClick, category: 'Interactive' },
  { text: 'Add a search feature.', icon: Search, category: 'Features' },
];

export const NaturalLanguageEditor: React.FC<NaturalLanguageEditorProps> = ({
  currentProject,
  onApplyImprovement,
  onRestoreVersion,
  isProcessing = false,
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [pendingInstruction, setPendingInstruction] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Side-by-side diff state
  const [diffVersion, setDiffVersion] = useState<ProjectVersion | null>(null);
  const [diffSelectedFile, setDiffSelectedFile] = useState<string>('index.html');

  const handleRequestChange = (instruction: string) => {
    setPendingInstruction(instruction);
    setShowConfirmModal(true);
  };

  const handleConfirmChange = async () => {
    if (!pendingInstruction) return;
    const instruction = pendingInstruction;
    setShowConfirmModal(false);
    setPendingInstruction(null);
    setCustomPrompt('');
    await onApplyImprovement(instruction);
  };

  // Helper for computing side-by-side lines
  const computeDiffLines = (oldText: string, newText: string) => {
    const oldLines = (oldText || '').split('\n');
    const newLines = (newText || '').split('\n');
    const maxLen = Math.max(oldLines.length, newLines.length);
    const result: Array<{
      oldLineNum: number | null;
      oldLineText: string;
      newLineNum: number | null;
      newLineText: string;
      type: 'equal' | 'modified' | 'added' | 'removed';
    }> = [];

    for (let i = 0; i < maxLen; i++) {
      const oldLine = oldLines[i];
      const newLine = newLines[i];

      if (oldLine === undefined) {
        result.push({
          oldLineNum: null,
          oldLineText: '',
          newLineNum: i + 1,
          newLineText: newLine,
          type: 'added',
        });
      } else if (newLine === undefined) {
        result.push({
          oldLineNum: i + 1,
          oldLineText: oldLine,
          newLineNum: null,
          newLineText: '',
          type: 'removed',
        });
      } else if (oldLine === newLine) {
        result.push({
          oldLineNum: i + 1,
          oldLineText: oldLine,
          newLineNum: i + 1,
          newLineText: newLine,
          type: 'equal',
        });
      } else {
        result.push({
          oldLineNum: i + 1,
          oldLineText: oldLine,
          newLineNum: i + 1,
          newLineText: newLine,
          type: 'modified',
        });
      }
    }
    return result;
  };

  const oldFileContent = diffVersion?.files?.[diffSelectedFile] || diffVersion?.previewHtml || '';
  const currentFileContent = currentProject.files?.[diffSelectedFile] || currentProject.previewHtml || '';
  const diffLines = diffVersion ? computeDiffLines(oldFileContent, currentFileContent) : [];

  const addedCount = diffLines.filter(l => l.type === 'added').length;
  const removedCount = diffLines.filter(l => l.type === 'removed').length;
  const modifiedCount = diffLines.filter(l => l.type === 'modified').length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Natural-Language App Enhancer</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Improve Your App in Plain English
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Describe any change, feature, or design upgrade. CodePilot AI preserves your existing data while updating the application code.
        </p>
      </div>

      {/* Post-Build Smart Adviser Recommendations Banner */}
      <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-500/30 rounded-3xl p-5 sm:p-6 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Smart AI Product Adviser &bull; Next Best Improvements
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Adviser Recommended
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Based on your current build, our Smart Adviser recommends these high-impact additions to enhance user trust and conversion:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => handleRequestChange('Add customer reviews, testimonial cards, and average rating counter')}
            disabled={isProcessing}
            className="p-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition group"
          >
            <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 flex items-center justify-between">
              <span>Customer Reviews</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              Boosts conversion trust by over 40% with social proof.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleRequestChange('Add keyboard navigation shortcuts for searching, modal closing, and quick actions')}
            disabled={isProcessing}
            className="p-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition group"
          >
            <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 flex items-center justify-between">
              <span>Keyboard Shortcuts</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              Speeds up desktop navigation for power users.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleRequestChange('Add a light and dark theme switcher with smooth transition colors')}
            disabled={isProcessing}
            className="p-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition group"
          >
            <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 flex items-center justify-between">
              <span>Theme Switcher</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              Personalized comfort for day or night use.
            </p>
          </button>
        </div>
      </div>

      {/* Custom Prompt Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <label className="block text-sm font-bold text-white">
          What would you like to change or add?
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Type your request here (e.g., 'Add a dark mode toggle', 'Add order receipt download button', 'Make font larger and cleaner')..."
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            A version snapshot is saved automatically before every modification.
          </span>
          <button
            onClick={() => handleRequestChange(customPrompt.trim())}
            disabled={!customPrompt.trim() || isProcessing}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
              !customPrompt.trim() || isProcessing
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Applying Changes...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                <span>Apply Improvement</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 10 Quick Prompt Chips */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Quick 1-Click Improvements</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_INSTRUCTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleRequestChange(item.text)}
                disabled={isProcessing}
                className="text-left bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 transition-all group flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/30 text-indigo-400 group-hover:scale-105 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                      {item.category}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition">
                      "{item.text}"
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Version History Drawer with Side-by-Side Diff Feature */}
      {currentProject.versions && currentProject.versions.length > 0 && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <span>Project Version History ({currentProject.versions.length})</span>
            </h3>
            <span className="text-[11px] text-slate-500">Compare diffs and restore snapshots anytime</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {currentProject.versions.map((ver, idx) => (
              <div key={ver.id || idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-semibold text-slate-200">{ver.label || `Version #${idx + 1}`}</div>
                  <div className="text-[11px] text-slate-500">{new Date(ver.timestamp).toLocaleString()}</div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {/* Compare Diff Button */}
                  <button
                    onClick={() => {
                      setDiffVersion(ver);
                      const keys = Object.keys(ver.files || {});
                      setDiffSelectedFile(keys[0] || 'index.html');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition flex items-center gap-1.5 text-[11px] font-semibold"
                    title="Compare code diff with current version"
                  >
                    <GitCompare className="w-3 h-3" />
                    <span>Compare Diff</span>
                  </button>

                  {/* Restore Button */}
                  {onRestoreVersion && (
                    <button
                      onClick={() => onRestoreVersion(ver.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-[11px] font-medium"
                      title="Rollback to this snapshot"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Side-by-Side Diff Modal */}
      {diffVersion && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full my-auto shadow-2xl flex flex-col max-h-[92vh]">
            {/* Diff Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <GitCompare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Side-by-Side Version Diff</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {diffSelectedFile}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Comparing <strong>{diffVersion.label}</strong> with current version
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Stats badge */}
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    +{addedCount} added
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    -{removedCount} removed
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    ~{modifiedCount} modified
                  </span>
                </div>

                <button
                  onClick={() => setDiffVersion(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* File Selector Bar */}
            <div className="px-6 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">File:</span>
                {Object.keys(currentProject.files || { 'index.html': '' }).map((f) => (
                  <button
                    key={f}
                    onClick={() => setDiffSelectedFile(f)}
                    className={`px-2.5 py-1 rounded-lg transition font-mono text-[11px] ${
                      diffSelectedFile === f
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {onRestoreVersion && (
                <button
                  onClick={() => {
                    const id = diffVersion.id;
                    setDiffVersion(null);
                    onRestoreVersion(id);
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore Snapshot</span>
                </button>
              )}
            </div>

            {/* Diff Columns Header */}
            <div className="grid grid-cols-2 bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <div className="p-3 border-r border-slate-800 flex items-center justify-between">
                <span>Previous ({diffVersion.label})</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {new Date(diffVersion.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-emerald-400">Current Workspace Version</span>
                <span className="text-[10px] text-emerald-500 font-normal">Active</span>
              </div>
            </div>

            {/* Scrollable Side-by-Side Diff Table */}
            <div className="overflow-auto flex-1 font-mono text-xs leading-relaxed bg-slate-950">
              <table className="w-full border-collapse">
                <tbody>
                  {diffLines.map((line, idx) => {
                    const isMod = line.type === 'modified';
                    const isAdd = line.type === 'added';
                    const isRem = line.type === 'removed';

                    return (
                      <tr key={idx} className="border-b border-slate-900/60 hover:bg-slate-900/40">
                        {/* Left: Previous Line */}
                        <td className={`w-1/2 p-1.5 align-top border-r border-slate-800 select-text ${
                          isRem
                            ? 'bg-rose-950/30 text-rose-300'
                            : isMod
                            ? 'bg-amber-950/20 text-slate-300'
                            : 'text-slate-400'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="w-8 shrink-0 text-right select-none text-slate-600 text-[11px]">
                              {line.oldLineNum ?? ''}
                            </span>
                            <span className="truncate whitespace-pre-wrap break-all">
                              {line.oldLineText}
                            </span>
                          </div>
                        </td>

                        {/* Right: Current Line */}
                        <td className={`w-1/2 p-1.5 align-top select-text ${
                          isAdd
                            ? 'bg-emerald-950/30 text-emerald-300'
                            : isMod
                            ? 'bg-indigo-950/20 text-indigo-200'
                            : 'text-slate-400'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="w-8 shrink-0 text-right select-none text-slate-600 text-[11px]">
                              {line.newLineNum ?? ''}
                            </span>
                            <span className="truncate whitespace-pre-wrap break-all">
                              {line.newLineText}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Diff Footer */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Added
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span> Removed
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Modified
                </span>
              </div>
              <button
                onClick={() => setDiffVersion(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs transition"
              >
                Close Diff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Major Changes */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirm Improvement</h3>
                <p className="text-xs text-slate-400">CodePilot AI will update your project code</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <span className="text-slate-400 block font-medium">Requested Change:</span>
              <p className="font-semibold text-indigo-300">"{pendingInstruction}"</p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Existing data and functions are preserved</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Automatic version snapshot created prior to applying</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmChange}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
              >
                <span>Proceed & Update</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
