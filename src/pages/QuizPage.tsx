import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Filter,
  Check,
  ChevronRight,
  BookOpen,
  Share2,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types';

interface QuizPageProps {
  onQuizComplete: (scorePercent: number) => void;
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  onQuizComplete,
  onActivityLog,
  showToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Filtered pool of questions
  const filteredQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });
  }, [selectedCategory, selectedDifficulty]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const activeQuestion: QuizQuestion | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerSubmitted(selectedAnswers[currentIndex + 1] !== undefined);
    } else {
      // Finish quiz
      setQuizFinished(true);
      const score = calculateScore();
      onQuizComplete(score.percentage);
      onActivityLog(
        'Quiz Completed',
        `Scored ${score.percentage}% (${score.correctCount}/${filteredQuestions.length})`,
        `${score.percentage}%`
      );
      showToast(`Quiz completed! You scored ${score.percentage}%.`, 'success');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsAnswerSubmitted(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });
    const percentage = Math.round((correctCount / filteredQuestions.length) * 100);
    return { correctCount, percentage };
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
    setIsReviewMode(false);
    showToast('Quiz reset.', 'info');
  };

  const categories = ['All', 'Banking', 'UPI & Payments', 'Fake Jobs', 'Delivery Scams', 'Phishing', 'Social Engineering'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Empty state if filter returns no questions
  if (filteredQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white border border-[#E5EAF1] text-center space-y-4 shadow-sm">
        <HelpCircle className="w-12 h-12 text-[#64748B] mx-auto" />
        <h2 className="text-xl font-bold text-[#172033]">No Questions Match Filter</h2>
        <p className="text-sm text-[#64748B]">
          Try adjusting your category or difficulty selections to see available questions.
        </p>
        <button
          onClick={() => {
            setSelectedCategory('All');
            setSelectedDifficulty('All');
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] text-white font-bold text-xs cursor-pointer shadow-xs"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  // Final Results Screen
  if (quizFinished && !isReviewMode) {
    const { correctCount, percentage } = calculateScore();
    let masteryLabel = 'Cybersecurity Apprentice';
    let masteryColor = 'text-[#F59E0B]';
    if (percentage >= 80) {
      masteryLabel = 'ScamShield Cyber Defender';
      masteryColor = 'text-[#047857]';
    } else if (percentage >= 50) {
      masteryLabel = 'Vigilant Netizen';
      masteryColor = 'text-[#10B981]';
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center animate-in zoom-in-95 duration-300">
        <div className="p-8 rounded-3xl bg-white border border-[#E5EAF1] space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#047857] border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8 text-[#10B981]" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Quiz Evaluation Complete
            </span>
            <h2 className="text-3xl font-extrabold text-[#172033] mt-1">
              Your Mastery Score: <span className="text-[#047857]">{percentage}%</span>
            </h2>
            <div className={`text-base font-bold mt-1.5 ${masteryColor}`}>
              Rank: {masteryLabel}
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-md mx-auto leading-relaxed">
              You answered {correctCount} out of {filteredQuestions.length} challenges correctly. Review your answers or retake to reinforce safe digital reflexes.
            </p>
          </div>

          {/* Quick Stat Pill Row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1] text-xs">
              <span className="text-[#64748B] block">Total Questions</span>
              <span className="text-lg font-bold text-[#172033]">{filteredQuestions.length}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1] text-xs">
              <span className="text-[#64748B] block">Category Tested</span>
              <span className="text-lg font-bold text-[#047857]">{selectedCategory}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => {
                setIsReviewMode(true);
                setCurrentIndex(0);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] font-semibold text-xs sm:text-sm border border-[#E5EAF1] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#64748B]" />
              <span>Review Explanations</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentAnswer = selectedAnswers[currentIndex];
  const isSelected = currentAnswer !== undefined;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#10B981]" />
            <span>Interactive Knowledge Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
            Scam Awareness Quiz
          </h1>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
              setSelectedAnswers({});
              setIsAnswerSubmitted(false);
            }}
            className="text-xs px-3 py-1.5 rounded-xl bg-white border border-[#E5EAF1] text-[#172033] focus:outline-none focus:border-[#10B981] shadow-xs"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              setCurrentIndex(0);
              setSelectedAnswers({});
              setIsAnswerSubmitted(false);
            }}
            className="text-xs px-3 py-1.5 rounded-xl bg-white border border-[#E5EAF1] text-[#172033] focus:outline-none focus:border-[#10B981] shadow-xs"
            aria-label="Filter by difficulty"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                Difficulty: {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Bar & Indicators */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <span>
            Question <strong className="text-[#172033]">{currentIndex + 1}</strong> of{' '}
            <strong className="text-[#172033]">{filteredQuestions.length}</strong>
          </span>
          <span className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200 font-bold text-[10px]">
              {activeQuestion.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
              {activeQuestion.difficulty}
            </span>
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-[#E5EAF1]">
          <div
            className="h-full bg-gradient-to-r from-[#10B981] to-[#047857] transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EAF1] space-y-6 shadow-sm">
        {/* Scenario context */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-[#E5EAF1] space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#047857]">
            Realistic Scenario:
          </span>
          <p className="text-sm font-medium text-[#172033] leading-relaxed font-sans">
            "{activeQuestion.scenario}"
          </p>
        </div>

        {/* Prompt question */}
        <h2 className="text-base sm:text-lg font-extrabold text-[#172033]">
          {activeQuestion.question}
        </h2>

        {/* Options list */}
        <div className="space-y-3">
          {activeQuestion.options.map((option, optIdx) => {
            const isThisSelected = currentAnswer === optIdx;
            const isCorrect = optIdx === activeQuestion.correctIndex;

            let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-[#E5EAF1] text-[#172033]';
            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs';
              } else if (isThisSelected) {
                optionStyle = 'bg-red-50 border-red-400 text-red-950 font-semibold shadow-xs';
              } else {
                optionStyle = 'bg-slate-50/50 border-[#E5EAF1] text-[#64748B] opacity-50';
              }
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                disabled={isAnswerSubmitted && !isReviewMode}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                    isAnswerSubmitted && isCorrect
                      ? 'bg-[#10B981] text-white'
                      : isAnswerSubmitted && isThisSelected
                      ? 'bg-[#EF4444] text-white'
                      : 'bg-white border border-[#E5EAF1] text-[#172033]'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <div className="flex-1 leading-snug">{option}</div>
                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                )}
                {isAnswerSubmitted && isThisSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback & Rich Explanation */}
        {isAnswerSubmitted && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-[#E5EAF1] space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              {currentAnswer === activeQuestion.correctIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <span className="font-bold text-[#047857] text-sm">Correct Analysis!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-[#EF4444]" />
                  <span className="font-bold text-red-800 text-sm">Caution: Unsafe Action</span>
                </>
              )}
            </div>

            <p className="text-xs text-[#172033] leading-relaxed">
              {activeQuestion.explanation}
            </p>

            {/* Red flags identified */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-amber-800 tracking-wider">
                Key Red Flags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeQuestion.redFlags.map((flag, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-medium"
                  >
                    • {flag}
                  </span>
                ))}
              </div>
            </div>

            {/* Best practice action */}
            <div className="pt-2 border-t border-[#E5EAF1] text-xs text-[#047857] flex items-start gap-1.5 font-bold">
              <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>Recommended Defense: {activeQuestion.safeAction}</span>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-[#172033] text-xs font-semibold transition-colors cursor-pointer"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {isReviewMode && (
              <button
                onClick={() => setIsReviewMode(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-[#172033] hover:bg-slate-200 text-xs font-semibold cursor-pointer"
              >
                Exit Review
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!isSelected}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentIndex === filteredQuestions.length - 1 ? 'View Final Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
