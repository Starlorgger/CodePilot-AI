import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  Terminal, 
  Layers, 
  Cpu, 
  Code2, 
  Play, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BuildProgressViewProps {
  appName: string;
  onComplete: () => void;
}

const STAGES = [
  { step: 1, title: 'Understanding User Requirements', desc: 'Parsing natural language specifications and intended user experience.' },
  { step: 2, title: 'Identifying Missing Information', desc: 'Validating workflow completeness and defaults for non-coders.' },
  { step: 3, title: 'Synthesizing Feature Upgrades', desc: 'Adding responsive layouts, dark themes, and local storage persistence.' },
  { step: 4, title: 'Structuring Application Architecture', desc: 'Designing component hierarchy and data models.' },
  { step: 5, title: 'Selecting Optimal Tech Stack', desc: 'Provisioning React 19, Tailwind CSS, Lucide icons, and reactive storage.' },
  { step: 6, title: 'Synthesizing Source Code Files', desc: 'Generating standalone index.html, styles, scripts, and documentation.' },
  { step: 7, title: 'Building UI & Interactive Controls', desc: 'Attaching form submit handlers, search filters, and modals.' },
  { step: 8, title: 'Mounting Isolated Preview Environment', desc: 'Bootstrapping sandboxed virtual frame with responsive viewport support.' },
  { step: 9, title: 'Executing Automated Quality Audits', desc: 'Testing syntax integrity, button handlers, and mobile viewport constraints.' },
  { step: 10, title: 'Preparing Application Delivery', desc: 'Verifying working preview and compiling human-readable summary.' },
];

export const BuildProgressView: React.FC<BuildProgressViewProps> = ({
  appName,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [logs, setLogs] = useState<string[]>([
    'Initializing CodePilot AI core synthesizer...',
    'Connecting to Tayo Verse Studios engine...',
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 10) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 10;
        }
        const next = prev + 1;
        setLogs((currentLogs) => [
          ...currentLogs,
          `Stage ${next}/10: ${STAGES[next - 1].title}... OK`,
        ]);
        return next;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  const progressPercentage = Math.round((currentStep / 10) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Autonomous 10-Step AI Build Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Building <span className="text-indigo-400">{appName || 'Your Application'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          CodePilot AI is executing the technical pipeline and preparing your interactive preview.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-300">Stage {currentStep} of 10</span>
          <span className="text-indigo-400">{progressPercentage}% Complete</span>
        </div>
        <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-500 h-full rounded-full transition-all duration-300 shadow-sm shadow-indigo-500/50"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 10-Stage Visual Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {STAGES.map((s) => {
            const isDone = s.step < currentStep;
            const isCurrent = s.step === currentStep;
            const isPending = s.step > currentStep;

            return (
              <div
                key={s.step}
                className={`p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                    : isDone
                    ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                    : 'bg-slate-950/20 border-slate-900 text-slate-600'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {isCurrent && <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />}
                  {isPending && <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600">{s.step}</div>}
                </div>
                <div>
                  <div className={`font-bold ${isCurrent ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-600'}`}>
                    {s.title}
                  </div>
                  <div className={`text-[11px] mt-0.5 line-clamp-1 ${isCurrent ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live System Activity Feed */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono text-xs shadow-inner">
        <div className="flex items-center gap-2 text-slate-400 pb-2 border-b border-slate-800">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-[11px]">Virtual Environment Console Output</span>
        </div>
        <div className="space-y-1 text-slate-400 max-h-32 overflow-y-auto pr-1">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-slate-600">&gt;</span>
              <span className={idx === logs.length - 1 ? 'text-emerald-400' : 'text-slate-400'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
