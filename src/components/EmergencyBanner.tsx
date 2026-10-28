import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, ExternalLink, X } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-red-50/90 border-b border-red-200 text-[#1F2937] px-4 py-2 text-xs sm:text-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-red-100 text-[#DC2626] border border-red-200">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
          </span>
          <div>
            <span className="font-bold text-[#DC2626]">Active Fraud Emergency?</span>{' '}
            <span className="text-[#64748B] hidden md:inline">
              Act within the 2-hour Golden Hour to freeze unauthorized transactions before withdrawal.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <a
            href="tel:1930"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-xs shadow-xs transition-colors"
            title="Call Indian Cybercrime Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 1930 (Toll-Free)</span>
          </a>

          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-[#F5F3FF] text-[#6D28D9] border border-[#E5E7EB] font-medium text-xs transition-colors shadow-xs"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-3 h-3 text-[#64748B]" />
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-[#64748B] hover:text-[#1F2937] rounded hover:bg-red-100/60 transition-colors"
            aria-label="Dismiss emergency banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
