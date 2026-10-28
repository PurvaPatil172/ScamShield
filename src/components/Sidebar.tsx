import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  Globe,
  BotMessageSquare,
  HelpCircle,
  Smartphone,
  BookOpen,
  FileText,
  CheckSquare,
  TrendingUp,
  History,
  Settings,
  PhoneCall,
  ExternalLink,
  X,
  Gamepad2,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard },
    { id: 'message-checker', label: 'AI Message Checker', icon: ShieldAlert, badge: 'AI & Rules' },
    { id: 'url-checker', label: 'URL Safety Scanner', icon: Globe },
    { id: 'chat-assistant', label: 'AI Safety Assistant', icon: BotMessageSquare, badge: 'Live AI' },
    { id: 'device-simulation', label: 'Device Simulation', icon: Smartphone, badge: 'Interactive' },
    { id: 'scenario-simulator', label: 'Scam Scenario Game', icon: Gamepad2, badge: '5 Scenarios' },
    { id: 'quiz', label: 'Awareness Quiz', icon: HelpCircle, badge: '18 Qs' },
    { id: 'learning', label: 'Learning Center', icon: BookOpen, badge: '10 Guides' },
    { id: 'report', label: 'Report Incident', icon: FileText },
    { id: 'checklist', label: 'Safety Checklist', icon: CheckSquare },
    { id: 'trends', label: 'Scam Trends & Stats', icon: TrendingUp },
    { id: 'history', label: 'Saved Activity', icon: History },
    { id: 'settings', label: 'Settings & About', icon: Settings },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB] dark:border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#6D28D9] border border-purple-200 flex items-center justify-center font-bold">
              SS
            </div>
            <span className="font-extrabold text-[#1F2937] dark:text-white">ScamShield</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded-lg text-[#64748B] hover:text-[#1F2937] hover:bg-[#F5F3FF] dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold tracking-wider uppercase text-[#64748B]">
            Core Security Tools
          </div>

          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5F3FF] dark:bg-purple-950/40 text-[#6D28D9] dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-xs font-semibold'
                    : 'text-[#64748B] dark:text-slate-300 hover:bg-[#FAFAFF] dark:hover:bg-slate-800/60 hover:text-[#1F2937] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#6D28D9]' : 'text-[#64748B]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-[#6D28D9] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-slate-400 border border-[#E5E7EB] dark:border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[11px] font-bold tracking-wider uppercase text-[#64748B]">
            Education & Simulation
          </div>

          {navItems.slice(4, 8).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5F3FF] dark:bg-purple-950/40 text-[#6D28D9] dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-xs font-semibold'
                    : 'text-[#64748B] dark:text-slate-300 hover:bg-[#FAFAFF] dark:hover:bg-slate-800/60 hover:text-[#1F2937] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#6D28D9]' : 'text-[#64748B]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-[#6D28D9] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-slate-400 border border-[#E5E7EB] dark:border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[11px] font-bold tracking-wider uppercase text-[#64748B]">
            Resources & Personal Log
          </div>

          {navItems.slice(8).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5F3FF] dark:bg-purple-950/40 text-[#6D28D9] dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-xs font-semibold'
                    : 'text-[#64748B] dark:text-slate-300 hover:bg-[#FAFAFF] dark:hover:bg-slate-800/60 hover:text-[#1F2937] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#6D28D9]' : 'text-[#64748B]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-[#6D28D9] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-slate-400 border border-[#E5E7EB] dark:border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Helpline Card */}
        <div className="p-3.5 border-t border-[#E5E7EB] dark:border-slate-800 bg-[#FAFAFF] dark:bg-slate-950/40">
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded bg-red-100 text-[#DC2626]">
                <PhoneCall className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-red-800 dark:text-slate-200">Official Helpline</span>
            </div>
            <p className="text-[11px] text-[#64748B] dark:text-slate-400 mb-2 leading-tight">
              Report financial fraud to freeze funds immediately.
            </p>
            <div className="flex items-center justify-between gap-1.5">
              <a
                href="tel:1930"
                className="flex-1 text-center py-1.5 rounded-lg bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Dial 1930
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-[#F5F3FF] text-[#6D28D9] dark:text-purple-300 border border-red-200 dark:border-slate-700 transition-colors"
                title="Open cybercrime.gov.in"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
