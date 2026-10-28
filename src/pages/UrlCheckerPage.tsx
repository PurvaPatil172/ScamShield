import React, { useState } from 'react';
import {
  Globe,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Lock,
  Unlock,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { UrlCheckResult, RiskLevel } from '../types';
import { analyzeUrlSafety } from '../services/urlAnalyzer';

interface UrlCheckerProps {
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

const SAMPLE_URLS = [
  {
    label: 'Legitimate Banking Portal',
    url: 'https://netbanking.hdfcbank.com/netbanking',
  },
  {
    label: 'Brand Spoofing Subdomain',
    url: 'http://sbi.netbanking-verify-portal.xyz/login?ref=sms',
  },
  {
    label: 'Raw IP Address with Login',
    url: 'http://192.168.1.105:8080/secure/bank-login.html',
  },
  {
    label: 'Typosquatted Brand (.top)',
    url: 'http://paypa1-account-security-alert.top/verify-now',
  },
  {
    label: 'Fake Postal Service Phish',
    url: 'http://indiapost-parcel-reschedule.click/track',
  },
];

export const UrlCheckerPage: React.FC<UrlCheckerProps> = ({
  onActivityLog,
  showToast,
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [result, setResult] = useState<UrlCheckResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = () => {
    if (!inputUrl.trim()) {
      showToast('Please enter a URL to inspect.', 'warning');
      return;
    }

    const check = analyzeUrlSafety(inputUrl);
    setResult(check);
    onActivityLog(
      'URL Inspection',
      `${check.riskLevel}: ${check.domain || check.hostname}`,
      check.riskLevel
    );
    showToast('URL structural inspection complete.', 'success');
  };

  const handleClear = () => {
    setInputUrl('');
    setResult(null);
    showToast('Input cleared.', 'info');
  };

  const handleLoadSample = (sampleUrl: string) => {
    setInputUrl(sampleUrl);
    setResult(null);
    showToast('Sample link pattern loaded.', 'info');
  };

  const handleCopyReport = () => {
    if (!result) return;
    const summary = `=== SCAMSHIELD URL INSPECTION REPORT ===
Target URL: ${result.url}
Protocol: ${result.protocol.toUpperCase()} (${result.isHttps ? 'Encrypted HTTPS' : 'Insecure HTTP'})
Hostname: ${result.hostname}
Root Domain: ${result.domain}
Risk Level: ${result.riskLevel} (Score: ${result.riskScore}/100)

DETECTED ANOMALIES & FLAGS:
${result.flags.map((f) => `[${f.severity.toUpperCase()}] ${f.flag}: ${f.explanation}`).join('\n')}

SAFE ADVICE:
${result.safeAdvice.map((a) => `- ${a}`).join('\n')}

Note: Preliminary pattern check. Never open unverified links.
========================================`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    showToast('URL report copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const getRiskDetails = (level: RiskLevel) => {
    switch (level) {
      case 'High concern':
        return {
          cardBg: 'bg-red-50/90 border-red-200 text-red-900',
          badgeBg: 'bg-red-100 text-[#EF4444] border-red-200',
          icon: AlertOctagon,
          title: 'High Concern — Dangerous / Deceptive Link',
        };
      case 'Caution':
        return {
          cardBg: 'bg-amber-50/90 border-amber-200 text-amber-900',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: AlertTriangle,
          title: 'Caution — Suspicious Structural Indicators',
        };
      case 'Low apparent risk':
      default:
        return {
          cardBg: 'bg-emerald-50/90 border-emerald-200 text-emerald-900',
          badgeBg: 'bg-emerald-100 text-[#047857] border-emerald-200',
          icon: ShieldCheck,
          title: 'Low Apparent Risk — Standard Syntax',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
          <Globe className="w-4 h-4 text-[#10B981]" />
          <span>Preliminary Syntax & Pattern Inspection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
          URL Safety Scanner
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Inspects web addresses for brand-spoofing subdomains, insecure HTTP, raw IP addresses, typosquatting, and disposable TLDs without visiting or resolving the link.
        </p>
      </div>

      {/* Sample Links Selector */}
      <div className="p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs space-y-2.5">
        <span className="text-xs font-bold text-[#172033] block">
          Try Sample Link Patterns:
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_URLS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadSample(sample.url)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 hover:text-[#047857] text-[#172033] border border-[#E5EAF1] font-medium transition-colors cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-4 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="url-input" className="block text-xs font-bold text-[#172033]">
            Enter Web Address to Inspect:
          </label>
          <div className="relative">
            <input
              id="url-input"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="e.g. sbi.verify-account-net.xyz/login or https://onlinesbi.sbi"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] font-mono transition-all"
            />
            <Globe className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleScan}
              disabled={!inputUrl.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze URL</span>
            </button>

            <button
              onClick={handleClear}
              disabled={!inputUrl && !result}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-[#172033] font-semibold text-sm border border-[#E5EAF1] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Clear</span>
            </button>
          </div>

          <div className="text-[11px] text-[#64748B] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Sandboxed: We never navigate or send HTTP traffic to submitted URLs</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="space-y-5 rounded-3xl bg-white border border-[#E5EAF1] p-6 sm:p-7 shadow-sm animate-in slide-in-from-top-4 duration-300">
          {(() => {
            const risk = getRiskDetails(result.riskLevel);
            const RiskIcon = risk.icon;
            return (
              <div className={`p-5 rounded-2xl border ${risk.cardBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-2xl border ${risk.badgeBg}`}>
                    <RiskIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-extrabold text-[#172033]">{risk.title}</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#E5EAF1] text-[#172033]">
                        Risk Score: {result.riskScore}/100
                      </span>
                    </div>
                    <div className="text-xs text-[#64748B] mt-1 font-mono break-all font-medium">
                      {result.url}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={handleCopyReport}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#172033] text-xs font-bold border border-[#E5EAF1] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5 text-[#64748B]" />}
                    <span>{copied ? 'Copied' : 'Copy Report'}</span>
                  </button>

                  <button
                    onClick={handleClear}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] text-xs font-bold border border-[#E5EAF1] transition-colors cursor-pointer"
                  >
                    New Check
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Key URL Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Protocol</span>
              <div className="flex items-center gap-1.5 mt-1 font-mono font-bold text-[#172033]">
                {result.isHttps ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>HTTPS</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span className="text-[#EF4444]">HTTP (Insecure)</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Root Domain</span>
              <div className="mt-1 font-mono font-bold text-[#047857] truncate" title={result.domain}>
                {result.domain || 'N/A'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Subdomain Spoofing</span>
              <div className="mt-1 font-bold text-[#172033]">
                {result.hasMisleadingSubdomain ? (
                  <span className="text-[#EF4444] font-bold">Detected</span>
                ) : (
                  <span className="text-[#047857]">None detected</span>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Host Type</span>
              <div className="mt-1 font-bold text-[#172033]">
                {result.isIpAddress ? (
                  <span className="text-[#EF4444] font-bold">Raw IP Host</span>
                ) : (
                  <span className="text-[#64748B]">Standard FQDN</span>
                )}
              </div>
            </div>
          </div>

          {/* Detected Concerns & Flags */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Inspection Findings & Explanations:
            </h3>
            <div className="space-y-2.5">
              {result.flags.map((flag, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    flag.severity === 'danger'
                      ? 'bg-red-50/80 border-red-200 text-red-900'
                      : flag.severity === 'warning'
                      ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                      : 'bg-slate-50 border-[#E5EAF1] text-[#172033]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {flag.severity === 'danger' && <AlertOctagon className="w-4 h-4 text-[#EF4444]" />}
                    {flag.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />}
                    {flag.severity === 'info' && <Info className="w-4 h-4 text-[#047857]" />}
                    <span>{flag.flag} ({flag.category})</span>
                  </div>
                  <p className="text-xs opacity-90">{flag.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safe Advice */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#047857]">
              Safe Browsing Best Practices:
            </h3>
            <ul className="space-y-2 text-xs text-[#172033]">
              {result.safeAdvice.map((advice, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scope notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1] text-[11px] text-[#64748B] leading-relaxed">
            <strong>Inspection Notice:</strong> This scanner runs isolated pattern and syntax checks. It intentionally does not resolve DNS or ping the remote server to prevent leaking telemetry to phishing infrastructures. Always navigate by typing verified official domains.
          </div>
        </div>
      )}
    </div>
  );
};
