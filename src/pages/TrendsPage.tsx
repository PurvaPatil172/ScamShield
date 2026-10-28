import React, { useState } from 'react';
import {
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  BarChart3,
  Calendar,
  Building2,
  Info,
  Layers,
} from 'lucide-react';
import { SCAM_STATISTICS } from '../data/statsData';

export const TrendsPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const filteredStats = SCAM_STATISTICS.filter(
    (s) => selectedRegion === 'All' || s.region === selectedRegion
  );

  const scamAttackVectors = [
    { name: 'Messaging Apps (WhatsApp / Telegram)', share: '46%', note: 'Task frauds, Digital arrest notices & romance links' },
    { name: 'Phone Calls (Spoofed voice & Skype)', share: '24%', note: 'Police impersonation, fake electricity & bank fraud alerts' },
    { name: 'SMS Phishing (Smishing)', share: '18%', note: 'Fake India Post delivery & bank KYC expiration links' },
    { name: 'Deceptive Search Ads & Social Media', share: '12%', note: 'Fake customer service numbers & counterfeit shopping portals' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-[#10B981]" />
          <span>Empirical Cyber Threat Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
          Scam Trends & Verified Official Statistics
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Data compiled strictly from verified government whitepapers, Parliamentary advisories, Reserve Bank of India reports, and statutory regulatory bodies.
        </p>
      </div>

      {/* Methodology Disclaimer */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs text-xs text-[#64748B] leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#172033]">Methodology Note:</strong> Registered complaints reflect reported incidents where victims actively approached authorities or banks. Actual underground cybercrime volumes are estimated by criminologists to be significantly higher due to underreporting.
        </div>
      </div>

      {/* Primary Vector Breakdown Visualization */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5EAF1] space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#172033] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#10B981]" />
            <span>Predominant Scam Distribution by Initial Contact Vector</span>
          </h2>
          <span className="text-[11px] text-[#64748B]">I4C Incident Analysis</span>
        </div>

        <div className="space-y-3.5 pt-1">
          {scamAttackVectors.map((vec, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#172033] font-semibold">{vec.name}</span>
                <span className="text-[#047857] font-extrabold">{vec.share}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-[#E5EAF1]">
                <div
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#047857]"
                  style={{ width: vec.share }}
                />
              </div>
              <span className="text-[11px] text-[#64748B] block">{vec.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Filter by Reporting Jurisdiction:
        </span>
        <div className="flex items-center gap-2">
          {['All', 'India', 'Global', 'United States'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-gradient-to-r from-[#10B981] to-[#047857] text-white shadow-xs'
                  : 'bg-white text-[#64748B] hover:text-[#172033] border border-[#E5EAF1]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Sourced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredStats.map((stat) => (
          <div
            key={stat.id}
            className="p-6 rounded-3xl bg-white border border-[#E5EAF1] flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-[#047857] tracking-tight">
                  {stat.statNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#172033] border border-[#E5EAF1] text-xs font-bold">
                  {stat.year}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-[#172033] text-sm">{stat.metricLabel}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Key Takeaway */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-[#047857] leading-snug">
                <strong>Insight:</strong> {stat.keyTakeaway}
              </div>
            </div>

            {/* Sourced Reference Link */}
            <div className="pt-3 border-t border-[#E5EAF1] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#64748B] truncate max-w-[200px] sm:max-w-[240px]">
                <Building2 className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                <span className="truncate">{stat.sourceName}</span>
              </div>

              <a
                href={stat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#047857] hover:underline font-bold transition-colors"
                title={`Visit official source: ${stat.sourceName}`}
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
