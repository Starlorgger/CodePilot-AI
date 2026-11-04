import React, { useState } from 'react';
import { 
  FileCode2, 
  FileText, 
  Package, 
  Copy, 
  Check, 
  Download, 
  FolderArchive,
  Layers
} from 'lucide-react';
import { AppProject } from '../types/project';

interface CodeExplorerProps {
  currentProject: AppProject;
  onExportZip: () => void;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({
  currentProject,
  onExportZip,
}) => {
  const filenames = Object.keys(currentProject.files);
  const [selectedFile, setSelectedFile] = useState<string>(
    filenames[0] || 'index.html'
  );
  const [copied, setCopied] = useState(false);

  const fileContent = currentProject.files[selectedFile] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.html') || filename.endsWith('.tsx') || filename.endsWith('.js')) {
      return <FileCode2 className="w-4 h-4 text-indigo-400" />;
    }
    if (filename.endsWith('.json')) {
      return <Package className="w-4 h-4 text-amber-400" />;
    }
    return <FileText className="w-4 h-4 text-slate-400" />;
  };

  const lineCount = fileContent.split('\n').length;
  const byteCount = new Blob([fileContent]).size;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Real Source Code Files</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Generated Project Code
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            You don't need to touch or understand code, but your files are 100% open, editable, and downloadable anytime.
          </p>
        </div>

        <button
          onClick={onExportZip}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <FolderArchive className="w-4 h-4" />
          <span>Download Project ZIP</span>
        </button>
      </div>

      {/* Editor & File Tree Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Sidebar File List */}
        <div className="w-full md:w-64 bg-slate-950/70 border-b md:border-b-0 md:border-r border-slate-800 p-4 shrink-0 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            Project Files ({filenames.length})
          </div>
          <div className="space-y-1">
            {filenames.map((name) => {
              const isSelected = name === selectedFile;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedFile(name)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {getFileIcon(name)}
                  <span className="truncate">{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Code View */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
          {/* File Toolbar */}
          <div className="bg-slate-950/40 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-white">{selectedFile}</span>
              <span className="text-[11px] text-slate-500">
                {lineCount} lines &bull; {(byteCount / 1024).toFixed(1)} KB
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-[11px]"
                title="Copy code to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadSingle}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-[11px]"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-4 overflow-auto max-h-[600px] font-mono text-xs text-slate-300 bg-slate-950/80 leading-relaxed selection:bg-indigo-600 selection:text-white">
            <pre className="whitespace-pre">
              <code>{fileContent}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
