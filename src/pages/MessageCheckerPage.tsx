import React, { useState } from 'react';
import {
  ShieldAlert,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  HelpCircle,
  FileText,
  Loader2,
  Share2,
} from 'lucide-react';
import { MessageAnalysisResult, RiskLevel } from '../types';
import { checkMessageWithAIOrHeuristics } from '../services/api';

interface MessageCheckerProps {
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

const SAMPLE_MESSAGES = [
  {
    label: 'CBI "Digital Arrest" Extortion',
    text: 'URGENT: This is Inspector Verma from Crime Branch & Narcotics Bureau. An illegal parcel containing narcotics and fake passports in your name was seized at Mumbai Airport. You are under DIGITAL ARREST. Join mandatory Skype interrogation within 15 minutes or an arrest warrant will be executed immediately. Connect here: http://cbi-investigation-portal.xyz/arrest-notice'
  },
  {
    label: 'SBI Urgent KYC / Account Freeze',
    text: 'Dear Customer, your State Bank of India account #4902 is deactivated due to non-submission of PAN KYC. Immediate action required within 24 hours. Click http://sbi.kyc-verify-net.xyz to update your details and avoid permanent closure of your netbanking access.'
  },
  {
    label: 'Telegram Work-From-Home Task Scam',
    text: 'Congratulations! Part-time job opening from Global Media. Earn ₹4,500 daily just by liking YouTube videos and rating hotels on Google. Work 1 hour per day from home. Instant payment to your UPI. Join our official Telegram channel https://t.me/vip_tasks_earn to claim your ₹200 joining bonus!'
  },
  {
    label: 'India Post Address Update Phish',
    text: 'India Post: Your package IND902148 could not be delivered due to an incomplete street address. Please update your address and pay ₹15 redelivery fee at http://indiapost-parcel-reschedule.click within 12 hours or package will be returned to sender.'
  },
  {
    label: 'Legitimate Company Meeting & Invoice',
    text: 'Hi Sarah, attached is the Q3 performance report and verified vendor invoice for your team review. Let us discuss this during tomorrow\'s scheduled 10:00 AM engineering sync. The meeting link is available on our internal calendar. Regards, Alex.'
  }
];

export const MessageCheckerPage: React.FC<MessageCheckerProps> = ({
  onActivityLog,
  showToast,
}) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'auto' | 'rules-only'>('auto');
  const [result, setResult] = useState<MessageAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    // 1. Prevent duplicate requests while already running
    if (isAnalyzing) return;

    const trimmed = inputText.trim();
    if (!trimmed) {
      showToast('Please paste or type a message to analyze.', 'warning');
      return;
    }

    // 2. Clear previous result before starting analysis
    setIsAnalyzing(true);
    setResult(null);

    try {
      let analysis: MessageAnalysisResult;

      if (analysisMode === 'rules-only') {
        // Instant local rule-based analysis requested
        const { analyzeMessageHeuristically } = await import('../services/analyzer');
        analysis = analyzeMessageHeuristically(trimmed);
        analysis.modelUsed = 'ScamShield Rule-Based Engine (Instant Local Mode)';
        analysis.fallbackReason = 'Instant local rule-based mode selected by user.';
      } else {
        // Call AI with AbortController timeout & automatic fallback
        analysis = await checkMessageWithAIOrHeuristics(trimmed);
      }

      // 3. Only display result once completed
      setResult(analysis);

      if (analysis.fallbackReason) {
        showToast(analysis.fallbackReason, 'warning');
      } else {
        showToast('Message analysis completed successfully.', 'success');
      }

      onActivityLog(
        'Message Analysis',
        `${analysis.riskLevel} (${analysis.scamType})`,
        analysis.isAiPowered ? 'AI Verified' : 'Rule-Based'
      );
    } catch (err: any) {
      console.error('Analysis error:', err);
      // Run local keyword heuristic checker as guaranteed fallback
      const { analyzeMessageHeuristically } = await import('../services/analyzer');
      const fallback = analyzeMessageHeuristically(trimmed);
      fallback.isAiPowered = false;
      fallback.modelUsed = 'ScamShield Rule-Based Cybersecurity Engine (Fallback)';
      fallback.fallbackReason = err?.message || 'AI request failed. Displaying local rule-based analysis.';
      setResult(fallback);
      showToast(fallback.fallbackReason || 'Displaying local rule-based analysis.', 'warning');
    } finally {
      // 4. Always stop loading indicator in finally block
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    if (isAnalyzing) return;
    setInputText('');
    setResult(null);
    showToast('Input and results cleared.', 'info');
  };

  const handleLoadSample = (sampleText: string) => {
    if (isAnalyzing) return;
    setInputText(sampleText);
    setResult(null);
    showToast('Sample scenario loaded into input area.', 'info');
  };

  const handleCopyResult = () => {
    if (!result) return;
    const textToCopy = `=== SCAMSHIELD MESSAGE ANALYSIS REPORT ===
Risk Assessment: ${result.riskLevel} (Confidence/Score: ${result.confidenceScore}/100)
Detected Threat Type: ${result.scamType}
Engine Used: ${result.modelUsed || (result.isAiPowered ? 'Gemini 3.8 Flash Neural Engine' : 'ScamShield Rule-Based Engine')}
${result.fallbackReason ? `Engine Note: ${result.fallbackReason}\n` : ''}
KEY REASONS:
${result.detailedExplanation}

DETECTED TACTICS:
${result.detectedTactics.map((t) => `- ${t}`).join('\n')}

PRACTICAL NEXT STEPS:
${result.practicalSteps.map((s) => `- ${s}`).join('\n')}

Disclaimer: Automated estimate. When in doubt, verify via official helplines (1930 in India).
==========================================`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Analysis report copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'High concern':
        return {
          cardBg: 'bg-red-50/90 border-red-200 text-red-900',
          badgeBg: 'bg-red-100 text-[#DC2626] border-red-200',
          icon: AlertOctagon,
          title: 'High Concern — Probable Scam',
          desc: 'Critical indicators of fraudulent coercion, authority impersonation, or extortion observed.',
        };
      case 'Caution':
        return {
          cardBg: 'bg-amber-50/90 border-amber-200 text-amber-900',
          badgeBg: 'bg-amber-100 text-[#F59E0B] border-amber-200',
          icon: AlertTriangle,
          title: 'Caution — Suspicious Indicators',
          desc: 'Unverified claims, urgency deadlines, or unverified links requiring independent validation.',
        };
      case 'Low apparent risk':
      default:
        return {
          cardBg: 'bg-green-50/90 border-green-200 text-green-900',
          badgeBg: 'bg-green-100 text-[#15803D] border-green-200',
          icon: ShieldCheck,
          title: 'No Common Warning Signs Observed',
          desc: 'No acute phishing keywords, extortion demands, or harvesting heuristics matched.',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-[#6D28D9]" />
          <span>Multi-Layer Analysis Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight mt-1">
          AI Scam Message Checker
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Inspect SMS messages, WhatsApp chats, job offers, or delivery alerts. Evaluates coercive urgency, impersonation, fee demands, and credential harvesting.
        </p>
      </div>

      {/* Sample Scenario Quick Selector */}
      <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#1F2937]">
            Quick-Load Real-World Scenarios:
          </span>
          {/* Analysis Engine Mode Toggle */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[11px] text-[#64748B]">Mode:</span>
            <button
              onClick={() => setAnalysisMode('auto')}
              disabled={isAnalyzing}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                analysisMode === 'auto'
                  ? 'bg-[#F5F3FF] text-[#6D28D9] border border-purple-300'
                  : 'bg-slate-100 text-[#64748B] hover:text-[#1F2937]'
              }`}
              title="Uses Gemini 3.8 Flash with automatic rule-based fallback if unavailable"
            >
              AI + Rules Auto
            </button>
            <button
              onClick={() => setAnalysisMode('rules-only')}
              disabled={isAnalyzing}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                analysisMode === 'rules-only'
                  ? 'bg-[#F5F3FF] text-[#6D28D9] border border-purple-300'
                  : 'bg-slate-100 text-[#64748B] hover:text-[#1F2937]'
              }`}
              title="Instant zero-latency client-side keyword and regex evaluation"
            >
              Instant Rules (0ms)
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_MESSAGES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadSample(sample.text)}
              disabled={isAnalyzing}
              className="text-xs px-3 py-1.5 rounded-xl bg-[#FAFAFF] hover:bg-[#F5F3FF] hover:border-purple-300 hover:text-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed text-[#1F2937] border border-[#E5E7EB] font-medium transition-colors cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Text Input Area */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-4 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="message-text" className="block text-xs font-bold text-[#1F2937]">
            Paste Message Text Below:
          </label>
          <textarea
            id="message-text"
            rows={5}
            value={inputText}
            disabled={isAnalyzing}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste suspicious SMS, WhatsApp message, email excerpt, job offer, or delivery notification here..."
            className="w-full px-4 py-3.5 rounded-xl bg-[#FAFAFF] border border-[#E5E7EB] text-[#1F2937] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/25 focus:border-[#6D28D9] font-sans leading-relaxed disabled:opacity-60 transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-purple-700 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-purple-600/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#38BDF8]" />
                  <span>Analyzing message...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                  <span>Analyze Message</span>
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={isAnalyzing || (!inputText && !result)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#F5F3FF] disabled:opacity-40 disabled:cursor-not-allowed text-[#1F2937] font-semibold text-sm border border-[#E5E7EB] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Clear</span>
            </button>
          </div>

          <div className="text-[11px] text-[#64748B]">
            {inputText.length} characters • Analyzed safely in isolated environment
          </div>
        </div>
      </div>

      {/* Active Loading Progress Card */}
      {isAnalyzing && (
        <div className="p-5 rounded-2xl bg-[#F5F3FF] border border-purple-200 flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#6D28D9] animate-spin shrink-0" />
            <div>
              <span className="font-bold text-[#6D28D9] text-xs sm:text-sm block">
                {analysisMode === 'rules-only' ? 'Running local heuristic evaluation...' : 'Consulting AI cybersecurity engine...'}
              </span>
              <span className="text-[11px] text-[#64748B]">
                Evaluating urgency triggers, credential harvesting, and spoofed domains (Automatic fallback protected)
              </span>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-purple-200 text-[#6D28D9] font-bold shrink-0">
            Scanning
          </span>
        </div>
      )}

      {/* Analysis Result Display */}
      {result && !isAnalyzing && (
        <div className="space-y-5 rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-sm animate-in slide-in-from-top-4 duration-300">
          {/* Header & Risk Gauge */}
          {(() => {
            const badge = getRiskBadge(result.riskLevel);
            const BadgeIcon = badge.icon;
            return (
              <div className={`p-5 rounded-2xl border ${badge.cardBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-2xl border ${badge.badgeBg}`}>
                    <BadgeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-extrabold text-[#1F2937]">
                        {badge.title}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#E5E7EB] text-[#1F2937]">
                        Risk Score: {result.confidenceScore}/100
                      </span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{badge.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={handleCopyResult}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5F3FF] text-[#1F2937] text-xs font-bold border border-[#E5E7EB] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5 text-[#64748B]" />}
                    <span>{copied ? 'Copied' : 'Copy Report'}</span>
                  </button>

                  <button
                    onClick={handleClear}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#F5F3FF] text-[#1F2937] text-xs font-bold border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    New Check
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Engine Source Badge */}
          <div className="flex items-center justify-between text-xs px-4 py-2.5 rounded-xl bg-[#FAFAFF] border border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${result.isAiPowered ? 'bg-[#6D28D9] animate-pulse' : 'bg-[#F59E0B]'}`} />
              <span className="text-[#64748B]">Analysis Engine:</span>
              <span className="font-bold text-[#6D28D9]">
                {result.modelUsed || (result.isAiPowered ? 'Gemini 3.8 Flash Neural Engine' : 'ScamShield Rule-Based Cybersecurity Engine')}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#64748B] hidden sm:inline">
              Category: {result.scamType}
            </span>
          </div>

          {/* Fallback Reason Alert Banner if applicable */}
          {result.fallbackReason && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-amber-800">Engine Notice:</strong>
                <span>{result.fallbackReason}</span>
              </div>
            </div>
          )}

          {/* Detailed Reason Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Reason Behind Assessment:
            </h3>
            <p className="text-[#1F2937] text-sm leading-relaxed">
              {result.detailedExplanation}
            </p>
          </div>

          {/* Warning Sign Highlights & Quotes Card */}
          {result.warningQuotes && result.warningQuotes.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Flagged Phrases & Warning Signs:
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.warningQuotes.map((quote, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-white text-amber-900 border border-amber-300 font-mono font-medium shadow-xs"
                  >
                    "{quote}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detected Psychological & Technical Tactics Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Detected Deceptive Tactics:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {result.detectedTactics.map((tactic, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAFAFF] border border-[#E5E7EB] text-xs text-[#1F2937] flex items-center gap-2.5 font-medium"
                >
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>{tactic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Next Steps Card */}
          <div className="p-5 rounded-2xl bg-[#F5F3FF] border border-purple-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
              Recommended Next Steps:
            </h3>
            <ul className="space-y-2">
              {result.practicalSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F2937]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cautious Educational Disclaimer Requirement */}
          <div className="p-4 rounded-xl bg-[#FAFAFF] border border-[#E5E7EB] text-[11px] text-[#64748B] leading-normal flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
            <span>
              <strong>Educational Disclaimer:</strong> ScamShield automated scam evaluations are heuristic and AI risk assessments, not official law enforcement certifications. Scammers continually adapt their techniques. If money has been transferred under false pretenses, immediately call your bank and Helpline 1930.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
