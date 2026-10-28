import React, { useState } from 'react';
import {
  History,
  Trash2,
  Search,
  Filter,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { UserActivityItem } from '../types';
import { Modal } from '../components/Modal';

interface HistoryProps {
  activityList: UserActivityItem[];
  onDeleteActivity: (id: string) => void;
  onClearAllActivity: () => void;
  onNavigate: (tab: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const HistoryPage: React.FC<HistoryProps> = ({
  activityList,
  onDeleteActivity,
  onClearAllActivity,
  onNavigate,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filterOptions = ['All', 'Message Checks', 'URL Checks', 'Quizzes', 'Incidents', 'Checklist'];

  const filteredItems = activityList.filter((item) => {
    let matchType = true;
    if (selectedFilter === 'Message Checks') matchType = item.type === 'message_check';
    else if (selectedFilter === 'URL Checks') matchType = item.type === 'url_check';
    else if (selectedFilter === 'Quizzes') matchType = item.type === 'quiz_completion';
    else if (selectedFilter === 'Incidents') matchType = item.type === 'incident_report';
    else if (selectedFilter === 'Checklist') matchType = item.type === 'checklist_update';

    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchType && matchSearch;
  });

  const handleDeleteItem = (id: string) => {
    onDeleteActivity(id);
    showToast('Activity record removed.', 'info');
  };

  const handleConfirmClearAll = () => {
    onClearAllActivity();
    setShowClearConfirm(false);
    showToast('All activity records cleared.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5EAF1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Audit Trail & Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
            Saved Activity & History
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm mt-1">
            Review threat evaluations, simulated phishing runs, and logged actions stored in your private browser sandbox.
          </p>
        </div>

        {activityList.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border border-[#E5EAF1] text-[#64748B] hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3 text-xs leading-relaxed text-[#172033] shadow-xs">
        <Lock className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#047857]">Zero-Telemetry Privacy Guarantee:</strong> All activity logs are saved exclusively within your local browser storage (localStorage & sessionStorage). No passwords, financial pins, OTPs, or personal identities are transmitted or stored remotely.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5EAF1] space-y-3.5 shadow-xs">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity records by title or keyword..."
            className="w-full px-4 py-2.5 pl-10 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-[#172033] placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
          />
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedFilter === opt
                  ? 'bg-[#10B981] text-white shadow-xs'
                  : 'bg-white text-[#64748B] hover:text-[#172033] hover:bg-slate-50 border border-[#E5EAF1]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-3 shadow-xs">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-[#64748B] text-xs border border-dashed border-[#E5EAF1] rounded-2xl space-y-2 bg-[#F7F9FC]/50">
            <History className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-medium text-[#172033]">No activity records match your current criteria.</p>
            <p className="text-[11px] text-[#64748B]">Scan an SMS or suspicious link to populate your audit trail.</p>
            <button
              onClick={() => onNavigate('message-checker')}
              className="inline-flex items-center gap-1 text-xs text-[#047857] hover:underline font-bold pt-1"
            >
              <span>Scan a message now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#E5EAF1]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0 mt-1.5 ring-4 ring-emerald-50" />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#172033] text-sm">{item.title}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-[#047857] border border-emerald-200 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[#64748B] line-clamp-1">{item.summary}</p>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-2 rounded-xl bg-white hover:bg-red-50 text-[#64748B] hover:text-red-600 border border-[#E5EAF1] hover:border-red-200 transition-colors shrink-0 shadow-xs"
                  title="Delete this record"
                  aria-label="Delete this record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <Modal
          isOpen={true}
          onClose={() => setShowClearConfirm(false)}
          title="Clear All Activity History"
          footer={
            <>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E5EAF1] text-[#64748B] hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearAll}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs"
              >
                Confirm Clear
              </button>
            </>
          }
        >
          <p className="text-[#172033] text-sm">
            Are you sure you want to permanently clear all {activityList.length} activity entries from your local audit log?
          </p>
        </Modal>
      )}
    </div>
  );
};
