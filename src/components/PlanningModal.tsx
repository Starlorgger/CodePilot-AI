import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  X,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Check,
  AlertCircle,
  FileCode,
  Globe,
  CreditCard,
  Database
} from 'lucide-react';
import { PlanData } from '../types/project';

interface PlanningModalProps {
  plan: PlanData;
  originalIdea: string;
  onApproveAndBuild: (approvedEnhancements: string[], answers: Record<string, string>) => void;
  onCancel: () => void;
  isBuilding?: boolean;
}

export const PlanningModal: React.FC<PlanningModalProps> = ({
  plan,
  originalIdea,
  onApproveAndBuild,
  onCancel,
  isBuilding = false,
}) => {
  // Enhancements selected by default
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>(
    plan.suggestedEnhancements || []
  );

  // Initialize essential answers with defaults from plan if available
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    if (plan.essentialRequirements) {
      plan.essentialRequirements.forEach((req, idx) => {
        init[req.requirement] = req.userAnswer || req.suggestedAnswers?.[0] || '';
      });
    }
    if (plan.clarifyingQuestions) {
      plan.clarifyingQuestions.forEach((q, idx) => {
        init[`clarification_${idx}`] = q.userAnswer || q.suggestedAnswers?.[0] || '';
      });
    }
    return init;
  });

  const [activeTab, setActiveTab] = useState<'plan' | 'decisions' | 'verification'>('plan');

  const toggleEnhancement = (item: string) => {
    setSelectedEnhancements(prev => 
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  const handleSelectAnswer = (key: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleConfirm = () => {
    onApproveAndBuild(selectedEnhancements, answers);
  };

  const essentialReqs = plan.essentialRequirements || [];
  const decisions = plan.decisionExplanations || [];
  const verifiedItems = plan.capabilityBreakdown?.verifiedSupported || [
    'Complete interactive preview running in safe sandbox',
    'Real-time search with instant filtering',
    'Full CRUD operations (Add, Edit, Delete, Star) with local storage save',
    'Responsive layouts for Mobile (375px), Tablet (768px), and Desktop',
    'One-click JSON dataset export & restore',
  ];
  const externalItems = plan.capabilityBreakdown?.requiresConfiguration || [
    'Live Stripe/PayPal Merchant Keys: Required for real bank credit card processing (simulated safely in preview)',
    'Custom Domain DNS: Required when mapping your personal domain (e.g. myapp.com)',
    'Transactional Email/SMS: Requires email API key (e.g. SendGrid/Resend) for outbound external emails',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full my-auto shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  CodePilot AI Implementation Plan
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  Ready to Build
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Review essential requirements, architectural decisions, and verification scope before code synthesis.
              </p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            title="Cancel and revise"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="px-6 pt-3 pb-1 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'plan'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>App Plan & Essential Details</span>
            {essentialReqs.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center justify-center">
                {essentialReqs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'decisions'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Architectural Decisions (Plain English)</span>
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'verification'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verification Scope</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* TAB 1: Plan & Essential Requirements */}
          {activeTab === 'plan' && (
            <>
              {/* App Overview Card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    {plan.category || 'Web Application'}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Plan Ready
                  </span>
                </div>
                <h4 className="text-xl font-extrabold text-white">{plan.appName}</h4>
                <p className="text-xs text-slate-400 italic">"{plan.tagline}"</p>
                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  {plan.summary}
                </p>
              </div>

              {/* Essential Missing Requirements Section */}
              {essentialReqs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        <span>Essential Requirements & Missing Details</span>
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        CodePilot AI identified {essentialReqs.length} key choice{essentialReqs.length > 1 ? 's' : ''} to customize your application:
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      User Input Recommended
                    </span>
                  </div>

                  <div className="space-y-3">
                    {essentialReqs.map((req, idx) => {
                      const selectedVal = answers[req.requirement] || req.suggestedAnswers[0];
                      return (
                        <div key={idx} className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                  {req.requirement}
                                </span>
                              </div>
                              <h6 className="text-sm font-semibold text-white mt-1">
                                {req.question}
                              </h6>
                              <p className="text-xs text-slate-400 mt-0.5">
                                <strong className="text-slate-300">Why this matters:</strong> {req.whyNeeded}
                              </p>
                            </div>
                          </div>

                          {/* Suggested answer buttons */}
                          <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-1">
                            {req.suggestedAnswers.map((opt, oIdx) => {
                              const isPicked = selectedVal === opt;
                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => handleSelectAnswer(req.requirement, opt)}
                                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition flex items-center justify-between gap-2 border ${
                                    isPicked
                                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isPicked && <Check className="w-3.5 h-3.5 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* User Flow */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Planned User Experience Flow</span>
                </h5>
                <div className="grid grid-cols-1 gap-2">
                  {plan.userFlow?.map((step, idx) => (
                    <div key={idx} className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 flex items-start gap-3 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Enhancements (Interactive Approval) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                    <span>Suggested Feature Enhancements (Approve / Customize)</span>
                  </h5>
                  <span className="text-[11px] text-slate-400">Toggle to include</span>
                </div>
                <div className="space-y-2">
                  {plan.suggestedEnhancements?.map((enhancement, idx) => {
                    const isChecked = selectedEnhancements.includes(enhancement);
                    return (
                      <label
                        key={idx}
                        onClick={() => toggleEnhancement(enhancement)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                          isChecked
                            ? 'bg-indigo-950/30 border-indigo-500/40 text-white'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                          />
                          <span className="font-medium">{enhancement}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-indigo-400">
                          {isChecked ? 'Approved' : 'Omitted'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: Plain English Decision Explanations */}
          {activeTab === 'decisions' && (
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-bold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-400" />
                  <span>Why CodePilot AI Made These Technical Choices</span>
                </h5>
                <p className="text-xs text-slate-400 mt-1">
                  You don't need to understand code. Here is why each architectural decision was chosen to make your app fast, responsive, and easy to run:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {decisions.map((dec, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {dec.category}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </span>
                    </div>
                    <h6 className="text-xs font-bold text-white">{dec.decision}</h6>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      "{dec.nonTechnicalReason}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Automated Tech Stack Selection */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs mt-4">
                <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Automated Technology Stack Selection</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Frontend</span>
                    <span className="font-medium text-slate-200">{plan.techStack?.frontend || 'React 19 + Tailwind CSS'}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">State & Storage</span>
                    <span className="font-medium text-slate-200">{plan.techStack?.state || 'LocalStorage Real-Time Persistence'}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Architecture</span>
                    <span className="font-medium text-slate-200">{plan.techStack?.architecture || 'Single Page App'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Capability Scope & Verification */}
          {activeTab === 'verification' && (
            <div className="space-y-5">
              <div>
                <h5 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CodePilot AI Verification & Deployment Scope</span>
                </h5>
                <p className="text-xs text-slate-400 mt-1">
                  CodePilot AI transparently separates features that are completely verified in the sandbox from features requiring external third-party production accounts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1: Verified Functional Code */}
                <div className="bg-emerald-950/15 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Verified Functional Code</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      100% Tested
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    These features run directly in your interactive preview without requiring any manual setup or external accounts:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {verifiedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-emerald-500/20">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: External Production Setup */}
                <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-indigo-400" />
                      <span>Requires External Setup</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      Production Optional
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    When you deploy your application to production for live real-world customers, you can plug in these third-party credentials:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {externalItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-indigo-500/20">
                        <AlertCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 flex items-center gap-3">
                <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  All code generated by CodePilot AI is 100% standard web code (HTML, Tailwind CSS, JavaScript). You can download it as a ZIP and host it anywhere at any time.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={onCancel}
            disabled={isBuilding}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition text-center"
          >
            Revise Original Idea
          </button>

          <button
            onClick={handleConfirm}
            disabled={isBuilding}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
          >
            {isBuilding ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Complete Verified Code...</span>
              </>
            ) : (
              <>
                <span>Approve Plan & Synthesize Verified Code</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
