import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Award,
  Filter,
  CheckCircle2,
  AlertOctagon,
} from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/checklistData';
import { ChecklistItem } from '../types';
import { Modal } from '../components/Modal';

interface ChecklistProps {
  completedChecklistIds: string[];
  onToggleChecklist: (id: string) => void;
  onResetChecklist: () => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const ChecklistPage: React.FC<ChecklistProps> = ({
  completedChecklistIds,
  onToggleChecklist,
  onResetChecklist,
  showToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const categories = ['All', 'Everyday Habits', 'Device & Accounts', 'Financial & UPI', 'Family Protection'];

  const filteredItems = CHECKLIST_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const totalCount = CHECKLIST_ITEMS.length;
  const completedCount = completedChecklistIds.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const handleToggle = (id: string, title: string) => {
    const isNowChecked = !completedChecklistIds.includes(id);
    onToggleChecklist(id);
    showToast(
      isNowChecked ? `Secured: ${title}` : `Unchecked: ${title}`,
      isNowChecked ? 'success' : 'info'
    );
  };

  const confirmReset = () => {
    onResetChecklist();
    setShowResetConfirm(false);
    showToast('Checklist progress reset.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5EAF1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
            <CheckSquare className="w-4 h-4 text-[#10B981]" />
            <span>Digital Hardening Routine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
            Personal Safety Checklist
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm mt-1">
            Build bulletproof cybersecurity habits to defend your accounts, family, and finances against modern fraud.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-[#E5EAF1] text-[#172033] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Progress Scorecard */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5EAF1] space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Personal Security Posture:
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#172033] mt-0.5">
              {percentage}% Complete{' '}
              <span className="text-sm font-bold text-[#047857]">
                ({completedCount} of {totalCount} habits verified)
              </span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-[#047857] border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-7 h-7 text-[#10B981]" />
          </div>
        </div>

        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-[#E5EAF1]">
          <div
            className="h-full bg-gradient-to-r from-[#10B981] to-[#047857] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#10B981] to-[#047857] text-white shadow-xs'
                : 'bg-white text-[#64748B] hover:text-[#172033] border border-[#E5EAF1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isChecked = completedChecklistIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id, item.title)}
              className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                isChecked
                  ? 'bg-emerald-50/50 border-emerald-300 text-[#172033] shadow-xs'
                  : 'bg-white border-[#E5EAF1] hover:border-slate-300 shadow-xs text-[#172033]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <Square className="w-5 h-5 text-[#64748B]" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`font-bold text-sm ${
                      isChecked ? 'text-[#047857] line-through opacity-85' : 'text-[#172033]'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.priority === 'Critical'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : item.priority === 'High'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-[#64748B] border border-[#E5EAF1]'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                  <span className="text-[11px] text-[#64748B] font-medium">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <Modal
          isOpen={true}
          onClose={() => setShowResetConfirm(false)}
          title="Reset Personal Safety Checklist"
          footer={
            <>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] text-white font-bold text-xs cursor-pointer"
              >
                Confirm Reset
              </button>
            </>
          }
        >
          <p className="text-[#172033] text-sm">
            Are you sure you want to reset all your checked security habits? Your current score of {percentage}% will return to 0%.
          </p>
        </Modal>
      )}
    </div>
  );
};
