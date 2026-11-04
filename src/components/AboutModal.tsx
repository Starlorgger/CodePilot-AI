import React from 'react';
import { 
  X, 
  Sparkles, 
  Heart, 
  Target, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Rocket 
} from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full my-auto shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">CodePilot AI</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                  Official
                </span>
              </div>
              <p className="text-xs text-indigo-400 font-medium">Build Smarter. Code Faster.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-slate-300 leading-relaxed">
          {/* Mission Hero */}
          <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>Our Core Mission</span>
            </div>
            <h4 className="text-base font-bold text-white">
              Democratizing Application Development
            </h4>
            <p className="text-slate-300 leading-relaxed">
              At <strong>Tayo Verse Studios</strong>, we believe anyone with an idea should have the power to create a functioning, beautiful web application—without spending months learning programming syntax or hiring expensive agencies. <strong>CodePilot AI</strong> bridges the gap between imagination and production software.
            </p>
          </div>

          {/* Key Pillars */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Why CodePilot AI is Different
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Real App Synthesis</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Not a code-explanation chatbot. Generates working standalone applications with live reactive UI and persistent data.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real Gemini Intelligence</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Powered by Gemini 3.8 via a secure, zero-leakage backend proxy with automatic resilience failover.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Built-In Self Healing</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Autonomous diagnostics check syntax, button bindings, and mobile viewport limits before reporting ready.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>100% User Ownership</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Full source code export (ZIP), zero vendor lock-in, and free hosting ready for Netlify, Vercel, or GitHub Pages.
                </p>
              </div>
            </div>
          </div>

          {/* Company & Studio info */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Created by:</span>
              <span className="font-bold text-white">Tayo Verse Studios</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Official Tagline:</span>
              <span className="font-semibold text-indigo-400">Build Smarter. Code Faster.</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Version:</span>
              <span className="font-mono text-slate-300">CodePilot AI v2.0 (Build 2026.10)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>A product by</span>
            <strong className="text-white">Tayo Verse Studios</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
