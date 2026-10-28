import React, { useState, useRef, useEffect } from 'react';
import {
  BotMessageSquare,
  Send,
  Trash2,
  Sparkles,
  ShieldAlert,
  Loader2,
  Lock,
  PhoneCall,
  ExternalLink,
  User,
  AlertCircle,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/api';

interface ChatAssistantProps {
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

const SUGGESTED_QUESTIONS = [
  'What is a "Digital Arrest" scam and is it legal in India?',
  'I clicked a suspicious link and entered my number. What should I do right now?',
  'Someone sent a QR code to pay me for my old phone. Is it safe to scan?',
  'Why do Telegram work-from-home jobs ask for recharge fees?',
  'How do I protect my elderly parents from cybercrime calls?',
  'Someone from courier support asked me to install AnyDesk. What does it do?',
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init',
    sender: 'assistant',
    content: `Hello! I am **ScamShield AI**, your digital safety and cybersecurity prevention advisor for the PromptWars 2026 hackathon.

I can help you:
- Evaluate suspicious SMS, WhatsApp, or email messages.
- Understand emerging frauds like **Digital Arrests**, **UPI QR traps**, and **Telegram task scams**.
- Provide immediate incident response steps if you suspect money was stolen.

⚠️ **Privacy Reminder:** I will never ask for your passwords, OTPs, PINs, or card numbers. Please never share sensitive personal details here.`,
    timestamp: new Date().toISOString(),
    isAiGenerated: true,
  },
];

export const ChatAssistantPage: React.FC<ChatAssistantProps> = ({
  onActivityLog,
  showToast,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = sessionStorage.getItem('scamshield_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem('scamshield_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    // Check for sensitive credentials in user input
    if (/\b(otp\s*is\s*\d{4,6}|\d{16}|cvv\s*is\s*\d{3})\b/i.test(text)) {
      showToast('Warning: Do not type real OTPs or card numbers into chat!', 'warning');
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = newMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      const res = await sendChatMessage(historyPayload);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: res.reply,
        timestamp: new Date().toISOString(),
        isAiGenerated: res.isAi,
      };

      setMessages((prev) => [...prev, aiMsg]);
      onActivityLog('AI Chat Consultation', text.slice(0, 40) + '...', 'Consultation');
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: 'Unable to contact safety server. Always remember: if faced with financial fraud, immediately call Helpline 1930.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      showToast('Failed to reach assistant.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    sessionStorage.removeItem('scamshield_chat_history');
    showToast('Conversation cleared.', 'info');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-9rem)] flex flex-col animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] text-white flex items-center justify-center font-bold shadow-xs">
            <BotMessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-[#172033] text-lg">AI Safety Assistant</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#10B981]" />
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Interactive cyber prevention advisor & incident guidance
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 rounded-xl text-[#64748B] hover:text-[#172033] hover:bg-slate-100 border border-[#E5EAF1] flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
          title="Clear session messages"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Suggested prompts carousel */}
      <div className="shrink-0 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[#64748B] font-bold text-[11px] whitespace-nowrap">Suggested:</span>
        {SUGGESTED_QUESTIONS.slice(0, 4).map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-[#172033] hover:text-[#047857] border border-[#E5EAF1] hover:border-emerald-200 whitespace-nowrap transition-colors text-[11px] shadow-xs cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 rounded-2xl bg-white border border-[#E5EAF1] space-y-4 shadow-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#047857] flex items-center justify-center shrink-0 mt-1 font-bold">
                <BotMessageSquare className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#10B981] to-[#047857] text-white font-medium shadow-xs'
                  : 'bg-slate-50 text-[#172033] border border-[#E5EAF1]'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div
                className={`text-[10px] mt-1.5 flex items-center justify-between ${
                  msg.sender === 'user' ? 'text-emerald-100' : 'text-[#64748B]'
                }`}
              >
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {msg.sender === 'assistant' && (
                  <span className="text-[10px] text-[#047857] font-bold">
                    {msg.isAiGenerated ? 'Gemini AI Verified' : 'Cyber Heuristic Advisory'}
                  </span>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#172033] border border-[#E5EAF1] flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-[#64748B]" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#047857] flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 animate-spin text-[#10B981]" />
            </div>
            <div className="bg-slate-50 border border-[#E5EAF1] text-[#64748B] rounded-2xl px-4 py-2.5 text-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
              <span>Analyzing safety guidance...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="shrink-0 p-3.5 rounded-2xl bg-white border border-[#E5EAF1] shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about suspicious messages, digital arrest, UPI safety, or recovery steps..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#64748B] px-1">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#10B981]" />
            <span>Never type passwords, OTPs, or financial secrets.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  );
};
