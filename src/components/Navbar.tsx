import React from 'react';
import {
  ShieldCheck,
  Menu,
  PhoneCall,
  Sun,
  Moon,
  Sparkles,
  Type,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  theme: 'dark-navy' | 'dark-oled' | 'light';
  setTheme: (theme: 'dark-navy' | 'dark-oled' | 'light') => void;
  fontSize: 'normal' | 'large';
  setFontSize: (size: 'normal' | 'large') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  theme,
  setTheme,
  fontSize,
  setFontSize,
}) => {
  const toggleTheme = () => {
    if (theme === 'dark-navy') setTheme('dark-oled');
    else if (theme === 'dark-oled') setTheme('light');
    else setTheme('dark-navy');
  };

  const toggleFontSize = () => {
    setFontSize(fontSize === 'normal' ? 'large' : 'normal');
  };

  const themeLabel =
    theme === 'dark-navy' ? 'Navy Dark' : theme === 'dark-oled' ? 'OLED Dark' : 'Light';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#64748B] hover:text-[#1F2937] hover:bg-[#F5F3FF] dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#38BDF8] text-white shadow-md shadow-purple-600/25 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border-2 border-white dark:border-slate-900 shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-[#1F2937] dark:text-slate-100 tracking-tight">ScamShield</span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-[#F5F3FF] text-[#6D28D9] border border-purple-200">
                  AI 2026
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] dark:text-slate-400 hidden sm:block font-medium">Pause. Check. Stay Protected.</p>
            </div>
          </button>
        </div>

        {/* Center: Quick Helpline pill */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F3FF] dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700/60 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9] animate-ping" />
            <span className="text-[#64748B] dark:text-slate-300 font-medium">National Cyber Helpline:</span>
            <a
              href="tel:1930"
              className="text-[#DC2626] font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              1930
            </a>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6D28D9] hover:text-[#4C1D95] dark:text-purple-300 hover:underline flex items-center gap-1 font-semibold"
            >
              cybercrime.gov.in
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Right: Controls (Theme, Font Scale, Hackathon Badge) */}
        <div className="flex items-center gap-2">
          {/* Font scale toggle */}
          <button
            onClick={toggleFontSize}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#1F2937] hover:bg-[#F5F3FF] dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium border border-[#E5E7EB] dark:border-slate-700/50 bg-white dark:bg-slate-900 cursor-pointer shadow-xs"
            title={`Font size: ${fontSize}. Click to toggle.`}
            aria-label="Toggle font scale"
          >
            <Type className="w-4 h-4 text-[#6D28D9]" />
            <span className="hidden sm:inline">{fontSize === 'normal' ? 'Standard' : 'Large'}</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#1F2937] hover:bg-[#F5F3FF] dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium border border-[#E5E7EB] dark:border-slate-700/50 bg-white dark:bg-slate-900 cursor-pointer shadow-xs"
            title={`Current theme: ${themeLabel}. Click to switch.`}
            aria-label="Switch visual theme"
          >
            {theme === 'light' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : theme === 'dark-oled' ? (
              <Sparkles className="w-4 h-4 text-purple-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#6D28D9]" />
            )}
            <span className="hidden sm:inline">{themeLabel}</span>
          </button>

          {/* Track 3 Hackathon Citation */}
          <div className="hidden lg:flex flex-col items-end pl-3 border-l border-[#E5E7EB] dark:border-slate-800">
            <span className="text-[10px] text-[#64748B] font-medium">PromptWars 2026</span>
            <span className="text-[11px] font-bold text-[#6D28D9] dark:text-purple-400">Track 3: Cyber Safety</span>
          </div>
        </div>
      </div>
    </header>
  );
};
