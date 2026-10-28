import React from 'react';
import { ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-950 text-[#64748B] text-xs py-8 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#F5F3FF] text-[#6D28D9] border border-purple-200 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold text-[#1F2937] dark:text-slate-200">ScamShield Cyber Defense</span>
          </div>
          <p className="text-[11px] text-[#64748B] dark:text-slate-400 max-w-sm">
            AI-Assisted Scam Awareness, Threat Simulation & Incident Response platform built for PromptWars × Kick To Tech 2026 (Track 3: Cybersecurity & Digital Safety).
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-4 flex-wrap justify-center text-xs">
          <button
            onClick={() => onNavigate('message-checker')}
            className="hover:text-[#6D28D9] transition-colors cursor-pointer"
          >
            Message Checker
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('url-checker')}
            className="hover:text-[#6D28D9] transition-colors cursor-pointer"
          >
            URL Scanner
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('quiz')}
            className="hover:text-[#6D28D9] transition-colors cursor-pointer"
          >
            Awareness Quiz
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('device-simulation')}
            className="hover:text-[#6D28D9] transition-colors cursor-pointer"
          >
            Device Sim
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('scenario-simulator')}
            className="hover:text-[#6D28D9] transition-colors cursor-pointer"
          >
            Scenario Game
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('learning')}
            className="hover:text-[#6D28D9] transition-colors cursor-pointer"
          >
            Learning Center
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('report')}
            className="hover:text-[#6D28D9] transition-colors cursor-pointer"
          >
            Report Fraud
          </button>
        </div>

        {/* Official resources & Disclaimer */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-[#64748B]">Emergency:</span>
            <a
              href="tel:1930"
              className="text-[#DC2626] font-bold hover:underline"
            >
              Helpline 1930
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6D28D9] hover:underline flex items-center gap-0.5 font-medium"
            >
              cybercrime.gov.in
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <div className="flex items-center gap-1 text-[#64748B]">
            <AlertCircle className="w-3 h-3 text-[#64748B] shrink-0" />
            <span>Automated checks are educational estimates, not absolute guarantees.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
