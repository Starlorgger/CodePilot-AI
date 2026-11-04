import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Key, 
  Lock, 
  CheckCircle2, 
  LogOut, 
  LogIn, 
  Mail, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface AccountModalProps {
  onClose: () => void;
  userEmail?: string;
  onUpdateEmail?: (email: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  onClose,
  userEmail = 'bamigboyeifetayo@gmail.com',
  onUpdateEmail,
}) => {
  const [email, setEmail] = useState(userEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateEmail && email.trim()) {
      onUpdateEmail(email.trim());
      setIsEditing(false);
      setStatusMsg('Profile email updated successfully.');
      setTimeout(() => setStatusMsg(''), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full my-auto shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Developer Profile & Security
              </h3>
              <p className="text-xs text-slate-400">CodePilot AI &bull; Tayo Verse Studios</p>
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
        <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-300">
          {/* User Badge */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Creator Workspace
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Authorized
              </span>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold text-xs"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="font-semibold text-white truncate max-w-[220px]">
                    {email}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium text-[11px]"
                >
                  Edit
                </button>
              </div>
            )}

            {statusMsg && (
              <div className="text-emerald-400 text-[11px] font-medium">{statusMsg}</div>
            )}
          </div>

          {/* Security Protocols */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Project Privacy & Security Controls</span>
            </h4>
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Private Local Storage Isolation</div>
                  <p className="text-slate-400 text-[11px]">
                    Your projects are isolated in browser storage. No other user can access your private projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Zero Client-Exposed Secrets</div>
                  <p className="text-slate-400 text-[11px]">
                    All Gemini API interactions route through our secure server proxy. No API keys are bundled into your source downloads.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Isolated Sandbox Execution</div>
                  <p className="text-slate-400 text-[11px]">
                    Generated apps execute within a restricted iframe environment without access to parent storage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            A product by <strong>Tayo Verse Studios</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
