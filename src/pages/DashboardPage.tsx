import React from 'react';
import {
  ShieldAlert,
  Globe,
  HelpCircle,
  Smartphone,
  BookOpen,
  FileText,
  CheckSquare,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Zap,
  PhoneCall,
  Activity,
  Award,
  Sparkles,
  Gamepad2,
  Lock,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { UserActivityItem } from '../types';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  quizHighScore: number;
  completedQuizzesCount: number;
  checklistCount: number;
  totalChecklistItems: number;
  scenariosCompletedCount: number;
  recentActivity: UserActivityItem[];
}

export const DashboardPage: React.FC<DashboardProps> = ({
  onNavigate,
  quizHighScore,
  completedQuizzesCount,
  checklistCount,
  totalChecklistItems,
  scenariosCompletedCount,
  recentActivity,
}) => {
  const checklistPercent = Math.round((checklistCount / totalChecklistItems) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-10 shadow-sm">
        {/* Subtle background gradient wash */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-100/50 via-sky-50/30 to-transparent rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-50/60 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3FF] border border-purple-200 text-[#6D28D9] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>PromptWars 2026 • Track 3: Cybersecurity & Digital Safety</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F2937] tracking-tight leading-[1.15]">
              Pause. Check.{' '}
              <span className="bg-gradient-to-r from-[#6D28D9] via-[#4C1D95] to-[#38BDF8] bg-clip-text text-transparent">
                Stay Protected.
              </span>
            </h1>

            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed max-w-2xl">
              ScamShield helps people recognise online scams, evaluate suspicious messages, verify deceptive links, and master threat defense through realistic interactive simulations before financial or personal harm occurs.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('message-checker')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-purple-700 hover:to-purple-900 text-white font-bold text-sm shadow-md shadow-purple-600/25 hover:shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-[#38BDF8]" />
                <span>Check a Message</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onNavigate('scenario-simulator')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#F5F3FF] text-[#1F2937] border border-[#E5E7EB] hover:border-purple-300 font-semibold text-sm shadow-xs transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4 text-[#6D28D9]" />
                <span>Explore Scam Simulations</span>
              </button>

              <button
                onClick={() => onNavigate('device-simulation')}
                className="px-4 py-3 rounded-xl bg-[#FAFAFF] hover:bg-[#F5F3FF] text-[#64748B] hover:text-[#1F2937] border border-[#E5E7EB] font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Open simulated smartphone device"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Virtual Phone Sim</span>
              </button>
            </div>
          </div>

          {/* Right Cybersecurity Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
              {/* Radar pulse rings */}
              <div className="absolute inset-4 rounded-full border border-purple-200/70 animate-ping opacity-25 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-sky-300/40 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-dashed border-purple-300/50 pointer-events-none" />

              {/* Central Glowing Shield Art */}
              <div className="relative z-10 w-44 h-48 rounded-3xl bg-gradient-to-b from-[#6D28D9] via-[#4C1D95] to-[#38BDF8] p-1 shadow-xl shadow-purple-600/25 flex items-center justify-center transform transition-transform hover:rotate-1 hover:scale-105 duration-300">
                <div className="w-full h-full rounded-[22px] bg-white flex flex-col items-center justify-center p-4 text-center border border-purple-100">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] text-[#6D28D9] border border-purple-100 flex items-center justify-center shadow-inner mb-2.5">
                    <Lock className="w-7 h-7 text-[#6D28D9]" />
                  </div>
                  <span className="font-extrabold text-[#1F2937] text-sm tracking-tight">Active Defense</span>
                  <span className="text-[11px] text-[#64748B] font-medium">Heuristic + Neural Scan</span>
                  <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-[#15803D] text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                    <span>Protected</span>
                  </div>
                </div>
              </div>

              {/* Floating feature chips */}
              <div className="absolute -top-1 left-2 bg-white px-3 py-1.5 rounded-xl border border-[#E5E7EB] shadow-sm flex items-center gap-2 text-xs font-semibold text-[#1F2937]">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span>Zero Trust Links</span>
              </div>

              <div className="absolute bottom-2 -right-1 bg-white px-3 py-1.5 rounded-xl border border-[#E5E7EB] shadow-sm flex items-center gap-2 text-xs font-semibold text-[#1F2937]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>1930 Helpline Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Feature Highlights Bar */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#6D28D9] border border-purple-100 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-[#6D28D9]" />
            </div>
            <div>
              <div className="font-bold text-[#1F2937]">Message Analysis</div>
              <div className="text-[11px] text-[#64748B]">Detects urgency & fee demands</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div>
              <div className="font-bold text-[#1F2937]">Suspicious Link Audit</div>
              <div className="text-[11px] text-[#64748B]">Uncovers deceptive domains</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#6D28D9] border border-purple-100 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-[#6D28D9]" />
            </div>
            <div>
              <div className="font-bold text-[#1F2937]">Interactive Simulations</div>
              <div className="text-[11px] text-[#64748B]">Virtual phone & 5-scenario game</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 border border-amber-100 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-[#1F2937]">Scam Education</div>
              <div className="text-[11px] text-[#64748B]">10 deep tactical defense guides</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Live Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Quiz High Score */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Quiz Mastery</span>
            <div className="text-2xl font-extrabold text-[#1F2937] mt-1">
              {quizHighScore > 0 ? `${quizHighScore}%` : 'Not Started'}
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              {completedQuizzesCount > 0 ? `${completedQuizzesCount} attempts recorded` : '18 awareness challenges'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Safety Checklist Score */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Safety Checklist</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">
              {checklistPercent}%
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              {checklistCount} of {totalChecklistItems} habits secured
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#F5F3FF] text-[#6D28D9] border border-purple-200">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Simulator Training */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Scenario Score</span>
            <div className="text-2xl font-extrabold text-[#1F2937] mt-1">
              {scenariosCompletedCount > 0 ? `${scenariosCompletedCount} / 5 Correct` : '5 Scenarios'}
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Interactive threat training game
            </p>
          </div>
          <div className="p-3 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
            <Gamepad2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Helpline Shortcut */}
        <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">Golden Hour Support</span>
            <div className="text-2xl font-extrabold text-[#DC2626] mt-1">
              Dial 1930
            </div>
            <p className="text-[11px] text-red-700 mt-0.5">
              Freezes unauthorized transfers
            </p>
          </div>
          <a
            href="tel:1930"
            className="p-3 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white shadow-xs transition-colors"
            title="Call 1930"
          >
            <PhoneCall className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Quick Launchpad Grid: Every card is 100% functional */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1F2937] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#6D28D9]" />
            <span>Interactive Security Tools</span>
          </h2>
          <span className="text-xs text-[#64748B]">Click any card to launch feature</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Interactive Device Simulation */}
          <div
            onClick={() => onNavigate('device-simulation')}
            className="group cursor-pointer p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#6D28D9] border border-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-5 h-5 text-[#6D28D9]" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#F5F3FF] text-[#6D28D9] border border-purple-200">
                  Virtual Smartphone
                </span>
              </div>
              <h3 className="font-bold text-base text-[#1F2937] group-hover:text-[#6D28D9] transition-colors">
                Interactive Device Simulation
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Experience simulated messages (JioMart ₹300 reward, Bank OTP request, Parcel delivery fee, and Fake job offer). Tap Inspect, Warning Signs, and Safe Actions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform">
              <span>Open phone simulation</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: Scam Scenario Simulator Game */}
          <div
            onClick={() => onNavigate('scenario-simulator')}
            className="group cursor-pointer p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#6D28D9] border border-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-5 h-5 text-[#6D28D9]" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#F5F3FF] text-[#6D28D9] border border-purple-200">
                  5 Scenarios Game
                </span>
              </div>
              <h3 className="font-bold text-base text-[#1F2937] group-hover:text-[#6D28D9] transition-colors">
                Scam Scenario Simulator
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Step-by-step training game: fake rewards, bank phishing, remote job scams, parcel fees, and family impersonation. Pick responses and build threat defense instincts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform">
              <span>Play training game</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: AI Message Checker */}
          <div
            onClick={() => onNavigate('message-checker')}
            className="group cursor-pointer p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#6D28D9] border border-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-5 h-5 text-[#6D28D9]" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#F5F3FF] text-[#6D28D9] border border-purple-200">
                  Gemini + Heuristics
                </span>
              </div>
              <h3 className="font-bold text-base text-[#1F2937] group-hover:text-[#6D28D9] transition-colors">
                AI Scam Message Checker
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Paste suspicious SMS, WhatsApp, or job offers. Evaluates urgency, impersonation, fee demands, and credential harvesting.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform">
              <span>Scan a message</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 4: URL Safety Scanner */}
          <div
            onClick={() => onNavigate('url-checker')}
            className="group cursor-pointer p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                  Subdomain & TLD Audit
                </span>
              </div>
              <h3 className="font-bold text-base text-[#1F2937] group-hover:text-[#6D28D9] transition-colors">
                URL Safety Scanner
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Detects deceptive subdomains, suspicious TLDs, IP hostnames, typosquatting, and unencrypted HTTP connections without navigating.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform">
              <span>Analyze link syntax</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 5: Awareness Quiz */}
          <div
            onClick={() => onNavigate('quiz')}
            className="group cursor-pointer p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-amber-400 hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  18 Challenges
                </span>
              </div>
              <h3 className="font-bold text-base text-[#1F2937] group-hover:text-amber-700 transition-colors">
                Interactive Awareness Quiz
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Test your instincts across 6 categories from beginner to advanced. Get instant explanations and review mistakes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>Take the quiz</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 6: Learning Center */}
          <div
            onClick={() => onNavigate('learning')}
            className="group cursor-pointer p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#6D28D9] border border-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 text-[#6D28D9]" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#F5F3FF] text-[#6D28D9] border border-purple-200">
                  10 Deep Guides
                </span>
              </div>
              <h3 className="font-bold text-base text-[#1F2937] group-hover:text-[#6D28D9] transition-colors">
                Safety Learning Center
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Master the mechanics of Digital Arrest, Telegram tasks, UPI reversal tricks, SIM swaps, and older adult protection.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform">
              <span>Explore knowledge base</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* How ScamShield Works: 3-Step Clear Explainer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">Architecture & Protection Model</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2937] mt-1">
            How ScamShield Analyzes & Defends
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm mt-1">
            Combining deterministic cybersecurity rules with advanced large language model reasoning for transparent, cautious safety recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#FAFAFF] border border-[#E5E7EB] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#6D28D9] border border-purple-200 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-[#1F2937] text-sm">Rule-Based Heuristic Scan</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Instantly inspects text for 9 high-risk fraud signatures: urgency deadlines, authority impersonation (CBI/police), OTP/PIN harvesting, and dubious TLDs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAFAFF] border border-[#E5E7EB] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-[#1F2937] text-sm">Gemini Neural Reasoning</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Evaluates emotional manipulation, social engineering context, and novel deceptive angles that escape rigid regular expressions, outputting structured caution ratings.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAFAFF] border border-[#E5E7EB] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#6D28D9] border border-purple-200 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-[#1F2937] text-sm">Clear Containment Playbook</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Provides specific next actions: what to avoid, how to verify independently through official apps, and rapid escalation routes to Helpline 1930 within the golden hour.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed Preview */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#6D28D9]" />
            <h3 className="font-bold text-[#1F2937] text-base">Recent Local Activity</h3>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs text-[#6D28D9] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentActivity.length === 0 ? (
          <div className="text-center py-8 text-[#64748B] text-xs border border-dashed border-[#E5E7EB] rounded-xl bg-[#FAFAFF]">
            No activity logged yet. Check a message, scan a URL, or complete a scenario simulation to build your audit trail!
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {recentActivity.slice(0, 4).map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#6D28D9]" />
                  <span className="font-semibold text-[#1F2937]">{item.title}</span>
                  <span className="text-[#64748B] hidden sm:inline">• {item.summary}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F5F3FF] text-[#6D28D9] border border-purple-200">
                      {item.badge}
                    </span>
                  )}
                  <span className="text-[10px] text-[#64748B]">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
