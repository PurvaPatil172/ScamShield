import React, { useState } from 'react';
import {
  Smartphone,
  ShieldAlert,
  Search,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Wifi,
  Battery,
  Signal,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Info,
  ExternalLink,
  Lock,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { DEVICE_SIMULATION_MESSAGES } from '../data/deviceSimulationData';
import { DeviceSimulationMessage } from '../types';

interface DeviceSimulationProps {
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const DeviceSimulationPage: React.FC<DeviceSimulationProps> = ({
  onActivityLog,
  showToast,
}) => {
  const [selectedMessageId, setSelectedMessageId] = useState<string>('jiomart-reward');
  const [isInspecting, setIsInspecting] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const activeMessage: DeviceSimulationMessage =
    DEVICE_SIMULATION_MESSAGES.find((m) => m.id === selectedMessageId) ||
    DEVICE_SIMULATION_MESSAGES[0];

  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id);
    setIsInspecting(false);
    setShowWarnings(false);
    setShowActions(false);
    showToast(`Loaded ${DEVICE_SIMULATION_MESSAGES.find(m => m.id === id)?.category} simulation.`, 'info');
  };

  const handleInspectToggle = () => {
    const nextState = !isInspecting;
    setIsInspecting(nextState);
    if (nextState) {
      onActivityLog('Device Simulation Inspection', `Inspected ${activeMessage.category}`, 'Inspected');
      showToast('Suspicious words and phrases highlighted inside the simulated screen.', 'success');
    }
  };

  const handleWarningsToggle = () => {
    const nextState = !showWarnings;
    setShowWarnings(nextState);
    if (nextState) {
      showToast('Warning signs explained in simple English below.', 'info');
    }
  };

  const handleActionsToggle = () => {
    const nextState = !showActions;
    setShowActions(nextState);
    if (nextState) {
      showToast('Safe recommended defense actions displayed.', 'success');
    }
  };

  const handleSimulatedLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast('Protected! In a real scenario, clicking this unfamiliar link could steal credentials or download malware. Never click links from unknown senders.', 'warning');
  };

  // Render message body with highlights when Inspect is enabled
  const renderMessageContent = () => {
    if (!isInspecting) {
      // Normal display with safe clickable simulated links
      const parts = activeMessage.messageBody.split(/(https?:\/\/[^\s]+)/g);
      return (
        <p className="text-sm text-slate-800 leading-relaxed font-sans">
          {parts.map((part, idx) => {
            if (/^https?:\/\//i.test(part)) {
              return (
                <span
                  key={idx}
                  onClick={handleSimulatedLinkClick}
                  className="text-blue-600 underline font-mono cursor-pointer hover:text-blue-800 break-all"
                  title="Simulated phishing link (Sandboxed)"
                >
                  {part}
                </span>
              );
            }
            return <span key={idx}>{part}</span>;
          })}
        </p>
      );
    }

    // Highlighting enabled
    let content = activeMessage.messageBody;
    const highlights = activeMessage.suspiciousHighlights;

    // Build regex to match all phrases
    const pattern = new RegExp(
      `(${highlights.map((h) => h.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );

    const segments = content.split(pattern);

    return (
      <div className="space-y-2">
        <p className="text-sm text-slate-800 leading-relaxed font-sans">
          {segments.map((segment, idx) => {
            const matchedHighlight = highlights.find(
              (h) => h.phrase.toLowerCase() === segment.toLowerCase()
            );

            if (matchedHighlight) {
              return (
                <mark
                  key={idx}
                  className="bg-amber-200 text-amber-950 px-1 py-0.5 rounded font-semibold border-b-2 border-amber-500"
                  title={matchedHighlight.reason}
                >
                  {segment}
                </mark>
              );
            }

            return <span key={idx}>{segment}</span>;
          })}
        </p>

        {/* Highlight breakdown list below message */}
        <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
          <span className="font-bold text-[11px] uppercase tracking-wider text-amber-800 block">
            Inspected Phrase Highlights:
          </span>
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] leading-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1" />
              <span>
                <strong className="text-amber-900 font-mono font-semibold">"{h.phrase}"</strong>: {h.reason}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
          <Smartphone className="w-4 h-4 text-[#10B981]" />
          <span>Interactive Threat Sandbox</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
          Interactive Device Simulation
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Experience real-world scam SMS messages inside a simulated smartphone interface. Inspect warning signs and learn safe actions without real-world risk.
        </p>
      </div>

      {/* Message Scenario Switcher Tabs */}
      <div className="p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs space-y-2.5">
        <span className="text-xs font-bold text-[#172033] block">
          Select Simulated Threat Message:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DEVICE_SIMULATION_MESSAGES.map((msg) => {
            const isSelected = msg.id === selectedMessageId;
            return (
              <button
                key={msg.id}
                onClick={() => handleSelectMessage(msg.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-300 text-[#047857] shadow-xs ring-1 ring-emerald-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-[#172033] border-[#E5EAF1]'
                }`}
              >
                <div className="text-xs font-bold truncate">{msg.category}</div>
                <div className="text-[11px] text-[#64748B] truncate mt-0.5">{msg.senderName}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulation Layout: Left Phone Mockup, Right Educational Toolkit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Realistic Fictional Smartphone Mockup (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center">
          {/* Phone Outer Chassis */}
          <div className="w-full max-w-[340px] rounded-[48px] bg-slate-900 p-3.5 border-4 border-slate-700 shadow-2xl ring-1 ring-slate-800">
            {/* Phone Screen Glass */}
            <div className="rounded-[36px] bg-slate-100 overflow-hidden flex flex-col h-[520px] text-slate-900 relative shadow-inner">
              {/* Dynamic Status Bar */}
              <div className="bg-slate-200 px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-700 select-none">
                <span className="font-mono">9:41 AM</span>
                {/* Speaker Notch */}
                <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full -ml-3" />
                  <div className="w-8 h-1 bg-slate-800 rounded-full ml-1" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Messaging App Top Bar */}
              <div className="bg-slate-200/90 border-b border-slate-300/80 px-4 py-2.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                  <div className="w-8 h-8 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {activeMessage.avatarLetter}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {activeMessage.senderName}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {activeMessage.senderPhone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-500">
                  <Phone className="w-3.5 h-3.5" />
                  <Video className="w-3.5 h-3.5" />
                  <MoreVertical className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Chat Conversation Scroll Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-slate-100 to-slate-200/80">
                {/* Date Divider */}
                <div className="text-center">
                  <span className="px-2.5 py-1 rounded-full bg-slate-300/70 text-[10px] text-slate-600 font-medium">
                    Today
                  </span>
                </div>

                {/* Simulated SMS Message Bubble */}
                <div className="flex items-start gap-2 max-w-[92%]">
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-md border border-slate-200 space-y-2">
                    {renderMessageContent()}

                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-mono">
                      <span>{activeMessage.timestamp}</span>
                      <span>• SMS</span>
                    </div>
                  </div>
                </div>

                {/* Safe Link Shield Warning Overlay Note inside Screen */}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-900 flex items-start gap-1.5 leading-snug">
                  <Lock className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong>Sandbox Protected:</strong> Links inside this simulation cannot open external websites or expose private data.
                  </span>
                </div>
              </div>

              {/* Messaging App Bottom Input Bar (Simulated) */}
              <div className="bg-white border-t border-slate-300 px-3 py-2 flex items-center gap-2 text-xs">
                <div className="flex-1 px-3 py-1.5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 text-xs">
                  Text message (SMS)...
                </div>
                <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs">
                  ↑
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Control Buttons & Feedback Panels (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Three Required Action Buttons */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-3.5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
              Simulation Interactive Controls:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Button 1: Inspect Message */}
              <button
                onClick={handleInspectToggle}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isInspecting
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm ring-2 ring-amber-500/30'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {isInspecting ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isInspecting ? 'Hide Highlights' : 'Inspect Message'}</span>
              </button>

              {/* Button 2: Show Warning Signs */}
              <button
                onClick={handleWarningsToggle}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  showWarnings
                    ? 'bg-[#EF4444] text-white border-[#EF4444] shadow-sm ring-2 ring-red-500/30'
                    : 'bg-red-50 hover:bg-red-100 text-red-900 border-red-300'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{showWarnings ? 'Hide Warnings' : 'Show Warning Signs'}</span>
              </button>

              {/* Button 3: What Should I Do? */}
              <button
                onClick={handleActionsToggle}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  showActions
                    ? 'bg-[#10B981] text-white border-[#10B981] shadow-sm ring-2 ring-emerald-500/30'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-[#047857] border-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{showActions ? 'Hide Safe Action' : 'What Should I Do?'}</span>
              </button>
            </div>
          </div>

          {/* Warning Signs Breakdown Card (Explained in Simple English) */}
          {showWarnings && (
            <div className="p-6 rounded-2xl bg-red-50/80 border border-red-200 space-y-3.5 shadow-sm animate-in slide-in-from-top-3 duration-200">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                <span>Warning Signs Explained in Simple English:</span>
              </div>

              <ul className="space-y-2 text-xs text-[#172033] leading-relaxed">
                {activeMessage.warningSigns.map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-red-100 shadow-xs">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#EF4444] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safe Action Card */}
          {showActions && (
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3.5 shadow-sm animate-in slide-in-from-top-3 duration-200">
              <div className="flex items-center gap-2 text-[#047857] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span>What Should You Do? (Safe Action Protocol)</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-100 text-xs text-[#172033] leading-relaxed font-medium shadow-xs">
                {activeMessage.safeAction}
              </div>

              <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[#64748B]">Emergency fraud helpline in India:</span>
                <a
                  href="tel:1930"
                  className="px-3.5 py-1.5 rounded-lg bg-[#EF4444] hover:bg-red-600 text-white font-bold transition-colors"
                >
                  Dial 1930 (Helpline)
                </a>
              </div>
            </div>
          )}

          {/* Educational Feedback Summary Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5EAF1] space-y-2.5 shadow-sm">
            <div className="flex items-center gap-2 text-[#047857] font-bold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4 text-[#10B981]" />
              <span>Cybersecurity Mentor Insight</span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {activeMessage.educationalFeedback}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
