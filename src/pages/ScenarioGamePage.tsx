import React, { useState } from 'react';
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { SCAM_SCENARIOS_GAME } from '../data/scamScenariosGameData';
import { ScenarioTrainingItem } from '../types';

interface ScenarioGameProps {
  onGameComplete: (score: number) => void;
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const ScenarioGamePage: React.FC<ScenarioGameProps> = ({
  onGameComplete,
  onActivityLog,
  showToast,
}) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({});
  const [isGameFinished, setIsGameFinished] = useState(false);

  const scenario: ScenarioTrainingItem = SCAM_SCENARIOS_GAME[currentScenarioIndex];
  const isAnswered = selectedOptionId !== null;

  const handleSelectOption = (optionId: 'A' | 'B' | 'C') => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setUserAnswers((prev) => ({
      ...prev,
      [currentScenarioIndex]: optionId,
    }));

    const selectedOpt = scenario.options.find((o) => o.id === optionId);
    if (selectedOpt?.isSafe) {
      showToast('Safe decision! You avoided the scam trap.', 'success');
    } else {
      showToast('Unsafe choice! Notice the red flags explained below.', 'warning');
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < SCAM_SCENARIOS_GAME.length - 1) {
      const nextIndex = currentScenarioIndex + 1;
      setCurrentScenarioIndex(nextIndex);
      setSelectedOptionId(userAnswers[nextIndex] || null);
    } else {
      // Calculate final score
      setIsGameFinished(true);
      const finalScore = calculateScore();
      onGameComplete(finalScore);
      onActivityLog(
        'Scenario Game Completed',
        `Scored ${finalScore} of ${SCAM_SCENARIOS_GAME.length} safe responses`,
        `${finalScore}/${SCAM_SCENARIOS_GAME.length}`
      );
      showToast(`Training complete! You made ${finalScore} safe decisions out of ${SCAM_SCENARIOS_GAME.length}.`, 'success');
    }
  };

  const calculateScore = () => {
    let score = 0;
    SCAM_SCENARIOS_GAME.forEach((s, idx) => {
      const chosen = userAnswers[idx];
      const opt = s.options.find((o) => o.id === chosen);
      if (opt?.isSafe) {
        score += 1;
      }
    });
    return score;
  };

  const handlePlayAgain = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptionId(null);
    setUserAnswers({});
    setIsGameFinished(false);
    showToast('Scenario Simulator restarted. Try for a perfect 5/5 score!', 'info');
  };

  // Final Results Screen
  if (isGameFinished) {
    const totalScore = calculateScore();
    const percent = Math.round((totalScore / SCAM_SCENARIOS_GAME.length) * 100);

    let rankLabel = 'Vulnerable Netizen';
    let rankColor = 'text-[#EF4444]';
    let feedbackSummary = 'Scammers use intense emotional urgency and deceptive promises. Review the scenarios below to build your defensive instincts.';

    if (totalScore === 5) {
      rankLabel = 'ScamShield Master Defender';
      rankColor = 'text-[#047857]';
      feedbackSummary = 'Outstanding! You correctly identified every single scam trap, rejected advance fees, avoided OTP phishing, and verified family emergency claims.';
    } else if (totalScore >= 3) {
      rankLabel = 'Vigilant Internet User';
      rankColor = 'text-[#10B981]';
      feedbackSummary = 'Good situational awareness! You caught most threats, but fell for subtle deception in a few scenarios. Practice again to reach 100%.';
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center animate-in zoom-in-95 duration-300">
        <div className="p-8 rounded-3xl bg-white border border-[#E5EAF1] space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#047857] border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8 text-[#10B981]" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Training Game Evaluation
            </span>
            <h2 className="text-3xl font-extrabold text-[#172033] mt-1">
              Your Safe Decisions: <span className="text-[#047857]">{totalScore} / {SCAM_SCENARIOS_GAME.length}</span>
            </h2>
            <div className={`text-base font-bold mt-1.5 ${rankColor}`}>
              Defensive Rank: {rankLabel} ({percent}%)
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mt-3 max-w-md mx-auto leading-relaxed">
              {feedbackSummary}
            </p>
          </div>

          {/* Scenario-by-Scenario Breakdown summary */}
          <div className="text-left space-y-2 pt-2 border-t border-[#E5EAF1]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-2">
              Decisions Breakdown:
            </span>
            {SCAM_SCENARIOS_GAME.map((s, idx) => {
              const userChoice = userAnswers[idx];
              const opt = s.options.find((o) => o.id === userChoice);
              const isSafe = opt?.isSafe;

              return (
                <div
                  key={s.id}
                  className="p-3 rounded-xl bg-slate-50 border border-[#E5EAF1] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {isSafe ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-[#172033] block">{s.title}</span>
                      <span className="text-[11px] text-[#64748B]">
                        Selected: Option {userChoice || 'Skipped'} — {opt?.text.slice(0, 50)}...
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSafe ? 'bg-emerald-100 text-[#047857]' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {isSafe ? 'Safe' : 'Trap Triggered'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handlePlayAgain}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedOpt = scenario.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4 text-[#10B981]" />
          <span>Interactive Decision Game</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
          Scam Scenario Simulator
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Step into realistic cyber threat situations. Pick the safest response, discover psychological manipulation angles, and train your instincts.
        </p>
      </div>

      {/* Progress & Score Bar */}
      <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
        <span className="font-semibold text-[#172033]">
          Scenario {currentScenarioIndex + 1} of {SCAM_SCENARIOS_GAME.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#64748B]">
            {Math.round(((currentScenarioIndex + 1) / SCAM_SCENARIOS_GAME.length) * 100)}% Complete
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200 font-bold text-xs">
            Score: {calculateScore()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-[#E5EAF1]">
        <div
          className="h-full bg-gradient-to-r from-[#10B981] to-[#047857] transition-all duration-300"
          style={{ width: `${((currentScenarioIndex + 1) / SCAM_SCENARIOS_GAME.length) * 100}%` }}
        />
      </div>

      {/* Main Scenario Situation Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EAF1] space-y-6 shadow-sm">
        {/* Title & Category Badge */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200 text-xs font-bold">
            {scenario.category}
          </span>
          <span className="text-xs text-[#64748B] font-mono">
            {scenario.senderContext}
          </span>
        </div>

        {/* Clear Situation Context */}
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[#172033]">{scenario.title}</h2>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            {scenario.scenarioDescription}
          </p>
        </div>

        {/* Incoming Mock Message Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-[#E5EAF1] space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#64748B]">
            <span className="font-bold text-[#047857]">Incoming Message:</span>
            <span className="font-mono text-slate-400">Received Just Now</span>
          </div>
          <p className="text-xs sm:text-sm text-[#172033] font-mono leading-relaxed bg-white p-3.5 rounded-xl border border-[#E5EAF1] shadow-xs">
            "{scenario.mockMessageText}"
          </p>
        </div>

        {/* 3 Possible Response Choices */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
            What is the safest response?
          </span>

          {scenario.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let optStyle = 'bg-slate-50 hover:bg-slate-100 border-[#E5EAF1] text-[#172033]';

            if (isAnswered) {
              if (opt.isSafe) {
                optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs font-semibold';
              } else if (isSelected) {
                optStyle = 'bg-red-50 border-red-400 text-red-950 shadow-xs font-semibold';
              } else {
                optStyle = 'bg-slate-50/50 border-[#E5EAF1] text-[#64748B] opacity-50';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${optStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                    isAnswered && opt.isSafe
                      ? 'bg-[#10B981] text-white'
                      : isAnswered && isSelected
                      ? 'bg-[#EF4444] text-white'
                      : 'bg-white border border-[#E5EAF1] text-[#172033]'
                  }`}
                >
                  {opt.id}
                </div>
                <div className="flex-1 leading-snug">{opt.text}</div>
                {isAnswered && opt.isSafe && (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                )}
                {isAnswered && isSelected && !opt.isSafe && (
                  <XCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback & Safety Tips (Shown immediately after selecting) */}
        {isAnswered && selectedOpt && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            {/* Feedback box */}
            <div
              className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-1.5 ${
                selectedOpt.isSafe
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-red-50 border-red-200 text-red-950'
              }`}
            >
              <div className="font-bold text-sm flex items-center gap-2">
                {selectedOpt.isSafe ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#047857]">Safe Decision!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-red-800">Unsafe Choice — Trap Identified</span>
                  </>
                )}
              </div>
              <p className="opacity-90">{selectedOpt.feedback}</p>
            </div>

            {/* Practical Safety Tip */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-[#172033] space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-[#047857] block">
                Practical Safety Tip:
              </span>
              <p>{scenario.safetyTip}</p>
            </div>

            {/* Real World Defense Takeaway */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1] text-[11px] text-[#64748B]">
              <strong className="text-[#172033]">Defense Protocol:</strong> {scenario.realWorldDefense}
            </div>
          </div>
        )}

        {/* Footer Next Button */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5EAF1]">
          <span className="text-[11px] text-[#64748B]">
            {isAnswered ? 'Click button to proceed to the next scenario' : 'Choose an answer from options A, B, or C'}
          </span>

          <button
            onClick={handleNextScenario}
            disabled={!isAnswered}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{currentScenarioIndex === SCAM_SCENARIOS_GAME.length - 1 ? 'View Final Results' : 'Next Scenario'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
