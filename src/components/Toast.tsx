import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-white border-green-200 text-[#1F2937] shadow-green-500/10'
              : toast.type === 'warning'
              ? 'bg-white border-amber-200 text-[#1F2937] shadow-amber-500/10'
              : 'bg-white border-purple-200 text-[#1F2937] shadow-purple-500/10'
          }`}
        >
          <div className="mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#6D28D9] shrink-0" />}
          </div>
          <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">{toast.text}</div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#64748B] hover:text-[#1F2937] transition-colors p-0.5 cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
