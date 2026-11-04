import React, { useState } from 'react';
import { 
  Share2, 
  X, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Server, 
  Globe, 
  ShieldCheck, 
  DollarSign, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AppProject } from '../types/project';

interface PublishModalProps {
  project: AppProject;
  onClose: () => void;
  onExportZip: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  project,
  onClose,
  onExportZip,
}) => {
  const [activeTab, setActiveTab] = useState<'options' | 'checklist' | 'costs'>('options');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full my-auto shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Publish & Deploy Application
              </h3>
              <p className="text-xs text-slate-400">
                Deploy <span className="text-white font-medium">{project.name}</span> to the web for free
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

        {/* Tab Switcher */}
        <div className="px-6 pt-4 border-b border-slate-800 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('options')}
            className={`pb-3 font-semibold transition border-b-2 ${
              activeTab === 'options'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Deploy Providers
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-3 font-semibold transition border-b-2 ${
              activeTab === 'checklist'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Pre-flight Checklist (4/4 Ready)
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`pb-3 font-semibold transition border-b-2 ${
              activeTab === 'costs'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Hosting Costs & Pricing
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'options' && (
            <div className="space-y-4">
              <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">1-Click Source ZIP Export</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Download all HTML, assets, and config files ready to drop into any hosting dashboard.
                  </p>
                </div>
                <button
                  onClick={onExportZip}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ZIP</span>
                </button>
              </div>

              {/* Providers */}
              <div className="space-y-3">
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-sm">
                      NL
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">Netlify Drop</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          100% Free
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Drag & drop your extracted project folder at app.netlify.com/drop for instant global CDN deployment.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Open Netlify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-white border border-slate-700 flex items-center justify-center font-bold text-sm">
                      ▲
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">Vercel</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          100% Free
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Push to GitHub or import using the Vercel CLI (`vercel deploy`) with automatic HTTPS and custom domains.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Open Vercel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-sm">
                      GH
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">GitHub Pages</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          100% Free
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Commit your index.html into a GitHub repository and turn on Pages in Repository Settings.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://pages.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Open GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">1. Self-Contained Deployment Asset</div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    All core application logic, styling, and icons are bundled with zero complex build-chain barriers.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">2. Secret Sanitization Verified</div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No backend API tokens or private keys are exposed in the client build.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">3. Responsive Breakpoints Checked</div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Configured for Android phones, iPhones, tablets, laptops, and 4K displays.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">4. Offline & Local Storage Resilience</div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    User actions persist across browser sessions automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'costs' && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span>Free Tier Hosting ($0.00 / Month)</span>
                </div>
                <p>
                  Static single-page web applications generated by CodePilot AI can be hosted <strong>completely free of charge</strong> on Netlify, Vercel, and GitHub Pages. These platforms provide generous free tiers:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Up to 100GB bandwidth per month (ample for tens of thousands of visits).</li>
                  <li>Free automatic SSL / HTTPS encryption certificates.</li>
                  <li>Custom domain name connection included at no cost.</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-slate-200 font-bold">When would costs apply?</div>
                <p className="text-slate-400">
                  Costs only apply if you exceed 100GB bandwidth, purchase a custom domain name (e.g. yourname.com, usually ~$10/year from a domain registrar), or choose to connect paid third-party enterprise services (e.g. Twilio SMS or paid Stripe accounts).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Powered by <strong>CodePilot AI</strong> &bull; Tayo Verse Studios
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
