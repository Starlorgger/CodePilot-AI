import React from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Layers, 
  ExternalLink,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full my-auto shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Plans & Transparent Pricing
              </h3>
              <p className="text-xs text-slate-400">
                CodePilot AI by Tayo Verse Studios &bull; Clear feature availability & costs
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

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-slate-300">
          {/* Transparency Notice */}
          <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white text-xs">
                Zero Hidden Fees & Honest Provisioning
              </div>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                You can generate, test, repair, and export applications completely free. Live credit card checkout is deliberately disabled until you connect your personal Stripe or payment provider credentials.
              </p>
            </div>
          </div>

          {/* Pricing Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Free Starter Tier */}
            <div className="bg-slate-950 border-2 border-indigo-500/50 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow">
                Active & Included
              </div>
              <div>
                <div className="text-sm font-bold text-white">Community & Creator</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">$0</span>
                  <span className="text-slate-400">/ forever</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Everything you need to describe, build, preview, and download apps.
                </p>

                <div className="space-y-2 mt-5 pt-5 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Autonomous 10-stage AI generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Natural-language app improvements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Live multi-device interactive sandbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Complete source code download (ZIP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Automated testing & self-healing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Free hosting on Netlify, Vercel, GitHub</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Current Plan (Active)
                </button>
              </div>
            </div>

            {/* Pro / Cloud Tier (Future Roadmap) */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Pro Studio & Team</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Roadmap
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-300">$29</span>
                  <span className="text-slate-400">/ month (Planned)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  For teams deploying multi-tenant applications with private databases.
                </p>

                <div className="space-y-2 mt-5 pt-5 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Everything in Creator plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Direct Cloud Run 1-click deployment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>PostgreSQL / Cloud SQL provisioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Custom domain automated SSL provisioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Team workspace & role permissions</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  disabled
                  className="w-full py-2.5 bg-slate-800 text-slate-500 font-bold rounded-xl text-xs uppercase tracking-wider cursor-not-allowed"
                >
                  Planned Feature Tier
                </button>
              </div>
            </div>
          </div>

          {/* Third-Party Service Disclosure */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-white text-xs flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Third-Party Hosting & Service Disclosure</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              When hosting your generated project on services like Netlify or Vercel, their standard free tiers apply (up to 100GB monthly bandwidth at $0). Custom domains (e.g. yourname.com) are purchased separately through domain registrars. CodePilot AI does not charge markups or surprise maintenance fees.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            A product by <strong>Tayo Verse Studios</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
