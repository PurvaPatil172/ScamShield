import React, { useState } from 'react';
import {
  Smartphone,
  Mail,
  MessageSquare,
  Linkedin,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  Eye,
  EyeOff,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { SCENARIOS_DATA } from '../data/scenariosData';
import { Scenario } from '../types';

interface SimulatorProps {
  onScenarioComplete: (completedCount: number) => void;
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const SimulatorPage: React.FC<SimulatorProps> = ({
  onScenarioComplete,
  onActivityLog,
  showToast,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userVerdicts, setUserVerdicts] = useState<Record<number, string>>({});
  const [showClues, setShowClues] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const scenario: Scenario = SCENARIOS_DATA[currentIndex];
  const userVerdict = userVerdicts[currentIndex];
  const isAnswered = userVerdict !== undefined;

  const handleVerdict = (verdict: 'Suspicious / Scam' | 'Legitimate / Safe' | 'Uncertain / Need Verification') => {
    if (isAnswered) return;

    setUserVerdicts((prev) => ({
      ...prev,
      [currentIndex]: verdict,
    }));

    const isCorrect = verdict === scenario.correctVerdict;
    if (isCorrect) {
      showToast('Correct evaluation!', 'success');
    } else {
      showToast('Notice the warning clues highlighted.', 'warning');
    }
  };

  const handleNext = () => {
    setShowClues(false);
    if (currentIndex < SCENARIOS_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      const totalCorrect = calculateScore();
      onScenarioComplete(Object.keys(userVerdicts).length);
      onActivityLog(
        'Threat Simulation Complete',
        `${totalCorrect} of ${SCENARIOS_DATA.length} scenarios correctly classified`,
        'Simulation'
      );
      showToast('All training simulations completed!', 'success');
    }
  };

  const handlePrevious = () => {
    setShowClues(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    SCENARIOS_DATA.forEach((s, idx) => {
      if (userVerdicts[idx] === s.correctVerdict) {
        correct += 1;
      }
    });
    return correct;
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserVerdicts({});
    setShowClues(false);
    setIsFinished(false);
    showToast('Simulation restarted.', 'info');
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'WhatsApp':
        return <MessageSquare className="w-4 h-4 text-[#10B981]" />;
      case 'Email':
        return <Mail className="w-4 h-4 text-cyan-600" />;
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'SMS':
      default:
        return <Smartphone className="w-4 h-4 text-[#047857]" />;
    }
  };

  // Completion screen
  if (isFinished) {
    const totalCorrect = calculateScore();
    const percent = Math.round((totalCorrect / SCENARIOS_DATA.length) * 100);

    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center animate-in zoom-in-95 duration-300">
        <div className="p-8 rounded-2xl bg-white border border-[#E5EAF1] space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#047857] border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8 text-[#10B981]" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Simulation Training Completed
            </span>
            <h2 className="text-3xl font-extrabold text-[#172033] mt-1">
              Field Accuracy: <span className="text-[#047857]">{percent}%</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-2 max-w-md mx-auto">
              You correctly spotted {totalCorrect} out of {SCENARIOS_DATA.length} simulated threat scenarios across SMS, WhatsApp, Email, and LinkedIn.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 text-white font-bold text-sm shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Scenario Simulator</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isVerdictCorrect = userVerdict === scenario.correctVerdict;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EAF1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-[#10B981]" />
            <span>Interactive Device Simulation</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight mt-1">
            Scam Scenario Simulator
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#64748B]">
            Scenario <strong className="text-[#172033]">{currentIndex + 1}</strong> of <strong className="text-[#172033]">{SCENARIOS_DATA.length}</strong>
          </span>
          <button
            onClick={() => setShowClues(!showClues)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#64748B] hover:text-[#172033] text-xs font-semibold border border-[#E5EAF1] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            {showClues ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-[#047857]" />}
            <span>{showClues ? 'Hide Clues' : 'Inspect Clues'}</span>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-[#E5EAF1]">
        <div
          className="h-full bg-gradient-to-r from-[#10B981] to-[#047857] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / SCENARIOS_DATA.length) * 100}%` }}
        />
      </div>

      {/* Realistic Device Screen Mockup */}
      <div className="rounded-3xl bg-white border-2 border-[#E5EAF1] shadow-md overflow-hidden">
        {/* Device Top Status Bar */}
        <div className="px-6 py-3 bg-[#F7F9FC] border-b border-[#E5EAF1] flex items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            {getPlatformIcon(scenario.platform)}
            <span className="font-bold text-[#172033]">{scenario.platform} Feed</span>
            <span className="text-slate-300">|</span>
            <span className="text-[#64748B]">{scenario.title}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">{scenario.timestamp}</div>
        </div>

        {/* Sender details */}
        <div className="px-6 py-3 bg-white border-b border-[#E5EAF1] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] flex items-center justify-center font-bold">
              {scenario.sender.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-[#172033]">{scenario.sender}</div>
              <div className="text-[11px] text-[#64748B] font-mono">{scenario.senderHandle}</div>
            </div>
          </div>
          {scenario.subject && (
            <div className="text-[11px] text-[#64748B] hidden sm:block max-w-xs truncate">
              Subject: {scenario.subject}
            </div>
          )}
        </div>

        {/* Simulated Message Content Body */}
        <div className="p-6 text-sm leading-relaxed text-[#172033] font-sans whitespace-pre-wrap select-text bg-[#F7F9FC]/40">
          {scenario.content}
        </div>

        {/* Optional attachment frame */}
        {scenario.attachmentName && (
          <div className="px-6 pb-5">
            <div className="p-3 rounded-xl bg-white border border-[#E5EAF1] flex items-center gap-3 text-xs">
              <Mail className="w-4 h-4 text-amber-600" />
              <div className="flex-1">
                <span className="font-semibold text-[#172033] block">{scenario.attachmentName}</span>
                <span className="text-[10px] text-[#64748B]">Unscanned attachment preview</span>
              </div>
            </div>
          </div>
        )}

        {/* Revealed Clues Panel if toggled */}
        {showClues && (
          <div className="mx-6 mb-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 animate-in fade-in">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Inspection Clues:</span>
            </span>
            <ul className="space-y-1 text-xs text-amber-900">
              {scenario.clues.map((c, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-600 shrink-0">•</span>
                  <span>
                    <strong className="underline font-mono">{c.textFragment}</strong>: {c.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* User Decision Buttons */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#172033]">
            What is your assessment of this communication?
          </span>
          <span className="text-[11px] text-[#64748B]">Choose one to reveal explanation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleVerdict('Suspicious / Scam')}
            disabled={isAnswered}
            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              userVerdict === 'Suspicious / Scam'
                ? 'bg-red-600 text-white border-red-600 shadow-xs'
                : 'bg-white hover:bg-red-50 text-red-600 border-red-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Suspicious / Scam</span>
          </button>

          <button
            onClick={() => handleVerdict('Legitimate / Safe')}
            disabled={isAnswered}
            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              userVerdict === 'Legitimate / Safe'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
                : 'bg-white hover:bg-emerald-50 text-[#047857] border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Legitimate / Safe</span>
          </button>

          <button
            onClick={() => handleVerdict('Uncertain / Need Verification')}
            disabled={isAnswered}
            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              userVerdict === 'Uncertain / Need Verification'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-white hover:bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Uncertain / Verify First</span>
          </button>
        </div>

        {/* Revealed Detailed Explanation */}
        {isAnswered && (
          <div className="p-5 rounded-xl bg-slate-50 border border-[#E5EAF1] space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isVerdictCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                    <span className="font-bold text-[#047857] text-sm">Correct Analysis!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-amber-800 text-sm">
                      Actual Status: {scenario.correctVerdict}
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-xs text-[#172033] leading-relaxed">
              {scenario.explanation}
            </p>

            <div className="pt-2 border-t border-[#E5EAF1] text-xs text-[#047857] flex items-start gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>Safest Action: {scenario.bestNextStep}</span>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-[#172033] text-xs font-semibold cursor-pointer"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>{currentIndex === SCENARIOS_DATA.length - 1 ? 'View Simulator Summary' : 'Next Scenario'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
