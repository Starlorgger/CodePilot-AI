import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Clock, 
  Ban, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Smartphone, 
  Lock, 
  Layers, 
  DollarSign, 
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SmartAdviserAnalysis, AdviserPillarItem } from '../types/project';

interface ProductAdviserModalProps {
  analysis: SmartAdviserAnalysis;
  onClose: () => void;
  onProceedToBuild: (acceptedPillars: Record<string, string[]>) => void;
}

export const ProductAdviserModal: React.FC<ProductAdviserModalProps> = ({
  analysis,
  onClose,
  onProceedToBuild,
}) => {
  // Track status for each pillar item: 'accepted' | 'postponed' | 'rejected'
  const [itemStatuses, setItemStatuses] = useState<Record<string, 'accepted' | 'postponed' | 'rejected'>>(() => {
    const initial: Record<string, 'accepted' | 'postponed' | 'rejected'> = {};
    Object.entries(analysis.pillars).forEach(([pillarKey, items]) => {
      items.forEach((item, idx) => {
        initial[`${pillarKey}_${idx}`] = item.status || 'accepted';
      });
    });
    return initial;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const setStatus = (key: string, status: 'accepted' | 'postponed' | 'rejected') => {
    setItemStatuses(prev => ({ ...prev, [key]: status }));
  };

  const handleProceed = () => {
    const accepted: Record<string, string[]> = {};
    Object.entries(analysis.pillars).forEach(([pillarKey, items]) => {
      accepted[pillarKey] = [];
      items.forEach((item, idx) => {
        if (itemStatuses[`${pillarKey}_${idx}`] === 'accepted') {
          accepted[pillarKey].push(item.title);
        }
      });
    });
    onProceedToBuild(accepted);
  };

  const categories = [
    { key: 'all', label: 'All Recommendations', icon: SlidersHorizontal },
    { key: 'missingFeatures', label: 'Features', icon: Layers },
    { key: 'userExperience', label: 'User Experience', icon: Smartphone },
    { key: 'simplicity', label: 'Simplicity', icon: Layout },
    { key: 'performance', label: 'Speed & Performance', icon: Zap },
    { key: 'accessibility', label: 'Accessibility', icon: ShieldCheck },
    { key: 'securityAndPrivacy', label: 'Security & Privacy', icon: Lock },
    { key: 'integrations', label: 'Integrations', icon: Layers },
    { key: 'operatingCosts', label: 'Operating Costs ($0)', icon: DollarSign },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full my-auto shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Smart AI Product Adviser
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Pre-Build Advisory
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Strategic advice across 8 product pillars. Accept, postpone, or reject each suggestion.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verdict & Score Banner */}
        <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950 border-b border-slate-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> App Feasibility Verdict
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">{analysis.verdict}</h4>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              {analysis.summary}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-center px-2">
              <div className="text-2xl font-black text-amber-400">{analysis.overallScore}/100</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">Advisory Index</div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1 rounded-lg font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Advisory Items List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {Object.entries(analysis.pillars).map(([pillarKey, items]) => {
            if (activeCategory !== 'all' && activeCategory !== pillarKey) return null;

            return (
              <div key={pillarKey} className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {pillarKey.replace(/([A-Z])/g, ' $1').trim()}
                </h5>
                <div className="space-y-3">
                  {items.map((item, idx) => {
                    const statusKey = `${pillarKey}_${idx}`;
                    const currentStatus = itemStatuses[statusKey] || 'accepted';

                    return (
                      <div
                        key={idx}
                        className={`bg-slate-950 border rounded-2xl p-4 transition-all space-y-3 ${
                          currentStatus === 'accepted'
                            ? 'border-indigo-500/40 bg-indigo-950/10'
                            : currentStatus === 'postponed'
                            ? 'border-amber-500/30 bg-amber-950/10 opacity-75'
                            : 'border-slate-800 bg-slate-950/40 opacity-50'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h6 className="text-sm font-bold text-white">{item.title}</h6>
                              {item.costEstimate && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {item.costEstimate}
                                </span>
                              )}
                            </div>
                            {item.recommendation && (
                              <p className="text-xs text-indigo-300 font-medium mt-1">
                                Action: {item.recommendation}
                              </p>
                            )}
                            {item.freeTierOption && (
                              <p className="text-xs text-emerald-400 font-medium mt-1">
                                Free Plan: {item.freeTierOption}
                              </p>
                            )}
                          </div>

                          {/* Accept / Postpone / Reject Buttons */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                            <button
                              type="button"
                              onClick={() => setStatus(statusKey, 'accepted')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                                currentStatus === 'accepted'
                                  ? 'bg-emerald-600 text-white shadow'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                              title="Accept into project architecture"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setStatus(statusKey, 'postponed')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                                currentStatus === 'postponed'
                                  ? 'bg-amber-600 text-white shadow'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                              title="Postpone to later version"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>Postpone</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setStatus(statusKey, 'rejected')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                                currentStatus === 'rejected'
                                  ? 'bg-rose-600 text-white shadow'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                              title="Reject recommendation"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>

                        {/* Why It Matters Callout */}
                        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-xs">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] block mb-0.5">
                            Why it matters for non-coders:
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {item.whyItMatters}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Selected suggestions will be synthesized directly into your app plan.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition w-full sm:w-auto text-center"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Apply & Generate Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
