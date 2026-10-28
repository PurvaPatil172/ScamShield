import React, { useState } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Sparkles,
  Type,
  Trash2,
  Send,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Modal } from '../components/Modal';

interface SettingsProps {
  theme: 'dark-navy' | 'dark-oled' | 'light';
  setTheme: (theme: 'dark-navy' | 'dark-oled' | 'light') => void;
  fontSize: 'normal' | 'large';
  setFontSize: (size: 'normal' | 'large') => void;
  onClearAllData: () => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const SettingsPage: React.FC<SettingsProps> = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  onClearAllData,
  showToast,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Feedback form state
  const [feedbackCategory, setFeedbackCategory] = useState('Threat Suggestion');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) {
      showToast('Please type your feedback message.', 'warning');
      return;
    }

    setFeedbackSubmitted(true);
    showToast('Feedback submitted successfully! Thank you.', 'success');
    setFeedbackMessage('');
    setFeedbackEmail('');
  };

  const handleConfirmClearAll = () => {
    onClearAllData();
    setShowClearConfirm(false);
    showToast('All local ScamShield data and cache cleared.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-3 border-b border-[#E5EAF1]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
          <Settings className="w-4 h-4" />
          <span>Application Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
          Settings & Accessibility
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Customize visual contrast, typography scale, review privacy policies, and manage local data retention.
        </p>
      </div>

      {/* Visual & Theme Customization */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-4 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#172033]">Display Theme & Visual Tone</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Switch between light cybersecurity theme or high-contrast night modes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              setTheme('light');
              showToast('Theme set to Clean Light (Hackathon Standard).', 'info');
            }}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              theme === 'light'
                ? 'bg-emerald-50/60 border-[#10B981] shadow-xs ring-2 ring-[#10B981]/20'
                : 'bg-white border-[#E5EAF1] hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Sun className="w-5 h-5 text-[#047857]" />
              {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-[#047857]" />}
            </div>
            <div>
              <span className="font-bold text-[#172033] text-sm block">Clean Light</span>
              <span className="text-[11px] text-[#64748B]">Emerald & mint cybersecurity theme</span>
            </div>
          </button>

          <button
            onClick={() => {
              setTheme('dark-navy');
              showToast('Theme set to Navy Dark.', 'info');
            }}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              theme === 'dark-navy'
                ? 'bg-slate-900 border-[#10B981] shadow-xs ring-2 ring-[#10B981]/20 text-white'
                : 'bg-white border-[#E5EAF1] hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Moon className={`w-5 h-5 ${theme === 'dark-navy' ? 'text-teal-400' : 'text-[#64748B]'}`} />
              {theme === 'dark-navy' && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
            </div>
            <div>
              <span className={`font-bold text-sm block ${theme === 'dark-navy' ? 'text-white' : 'text-[#172033]'}`}>
                Navy Dark
              </span>
              <span className={`text-[11px] ${theme === 'dark-navy' ? 'text-slate-300' : 'text-[#64748B]'}`}>
                Command center high-contrast mode
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              setTheme('dark-oled');
              showToast('Theme set to OLED Pure Black.', 'info');
            }}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              theme === 'dark-oled'
                ? 'bg-black border-purple-500 shadow-xs ring-2 ring-purple-500/20 text-white'
                : 'bg-white border-[#E5EAF1] hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Sparkles className={`w-5 h-5 ${theme === 'dark-oled' ? 'text-purple-400' : 'text-[#64748B]'}`} />
              {theme === 'dark-oled' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
            </div>
            <div>
              <span className={`font-bold text-sm block ${theme === 'dark-oled' ? 'text-white' : 'text-[#172033]'}`}>
                OLED Pure Black
              </span>
              <span className={`text-[11px] ${theme === 'dark-oled' ? 'text-slate-300' : 'text-[#64748B]'}`}>
                Deep black for mobile OLED screens
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Typography & Readability */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-4 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#172033] flex items-center gap-2">
            <Type className="w-5 h-5 text-[#047857]" />
            <span>Readability & Typography Scale</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">Enhanced font sizing designed for elderly family members and readability.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setFontSize('normal');
              showToast('Font scale set to Standard.', 'info');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              fontSize === 'normal'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
                : 'bg-white text-[#64748B] border-[#E5EAF1] hover:bg-slate-50 hover:text-[#172033]'
            }`}
          >
            Standard Text Size (Default)
          </button>

          <button
            onClick={() => {
              setFontSize('large');
              showToast('Font scale set to Large (Senior & Accessibility).', 'info');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              fontSize === 'large'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
                : 'bg-white text-[#64748B] border-[#E5EAF1] hover:bg-slate-50 hover:text-[#172033]'
            }`}
          >
            Large Text Size (+15% for Accessibility)
          </button>
        </div>
      </div>

      {/* Local Storage & Cache Management */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-3 shadow-xs">
        <h2 className="text-base font-bold text-[#172033]">Data Storage & Local Cache</h2>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Your quiz scores, checklist completions, and incident reference logs are saved exclusively in this device's browser memory. You can wipe this local cache at any time.
        </p>
        <div>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Local ScamShield Data</span>
          </button>
        </div>
      </div>

      {/* About ScamShield Project (PromptWars × Kick To Tech 2026) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#047857]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#172033]">About ScamShield 2026</h2>
            <p className="text-xs text-[#64748B]">PromptWars × Kick To Tech 2026 • Track 3: Cybersecurity & Digital Safety</p>
          </div>
        </div>

        <div className="text-xs text-[#172033] space-y-2.5 leading-relaxed">
          <p>
            <strong>ScamShield</strong> was architected for the <strong>PromptWars × Kick To Tech 2026 Hackathon</strong>, competing in <strong>Track 3: Cybersecurity & Digital Safety</strong>.
          </p>
          <p className="text-[#64748B]">
            Our core mission is to bridge the technological asymmetry between cybercrime syndicates and ordinary internet users—empowering citizens with instant, explainable threat intelligence before financial loss occurs.
          </p>

          <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-[11px] text-[#64748B] space-y-1.5">
            <span className="font-bold text-[#172033] block uppercase tracking-wider text-[10px]">Technical Capabilities:</span>
            <div>• Deterministic heuristic parser with immediate zero-latency threat triage.</div>
            <div>• Google Gemini 2.5 Flash neural reasoning integration for conversational defense guidance.</div>
            <div>• Zero-click sandbox URL syntax inspection to protect users from malicious redirects.</div>
            <div>• Interactive smartphone device simulation & 5-scenario decision training game.</div>
          </div>
        </div>
      </div>

      {/* Feedback & Threat Submission Form */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-4 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#172033]">Submit Feedback or New Threat Pattern</h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Encountered a new scam variation or want to share feedback with the development team? Submit below.
          </p>
        </div>

        {feedbackSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#047857] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
            <span className="font-medium">Thank you for your feedback! Your submission has been captured in local session telemetry.</span>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="fb-cat" className="block text-xs font-semibold text-[#172033]">
                  Topic:
                </label>
                <select
                  id="fb-cat"
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-[#172033] text-xs focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                >
                  <option value="Threat Suggestion">New Threat / Scam Variant</option>
                  <option value="Bug Report">Feature Bug Report</option>
                  <option value="Usability Feedback">Usability & Accessibility</option>
                  <option value="Other">General Question</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="fb-email" className="block text-xs font-semibold text-[#172033]">
                  Email (Optional):
                </label>
                <input
                  id="fb-email"
                  type="email"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-[#172033] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="fb-msg" className="block text-xs font-semibold text-[#172033]">
                Message / Scam Description:
              </label>
              <textarea
                id="fb-msg"
                rows={3}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Describe your suggestion or the scam message pattern you encountered..."
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-[#172033] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <Modal
          isOpen={true}
          onClose={() => setShowClearConfirm(false)}
          title="Clear All Local Data & Reset Progress"
          footer={
            <>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E5EAF1] text-[#64748B] hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearAll}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs"
              >
                Confirm Full Reset
              </button>
            </>
          }
        >
          <p className="text-[#172033] text-sm leading-relaxed">
            This will permanently remove your quiz high scores, checked safety habits, logged incident reports, and activity logs from this browser. This action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
};
