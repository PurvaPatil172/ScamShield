/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Toast, ToastMessage } from './components/Toast';

import { DashboardPage } from './pages/DashboardPage';
import { MessageCheckerPage } from './pages/MessageCheckerPage';
import { UrlCheckerPage } from './pages/UrlCheckerPage';
import { ChatAssistantPage } from './pages/ChatAssistantPage';
import { QuizPage } from './pages/QuizPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { LearningPage } from './pages/LearningPage';
import { ReportPage } from './pages/ReportPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { TrendsPage } from './pages/TrendsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { DeviceSimulationPage } from './pages/DeviceSimulationPage';
import { ScenarioGamePage } from './pages/ScenarioGamePage';

import { IncidentReport, UserActivityItem } from './types';
import { CHECKLIST_ITEMS } from './data/checklistData';

export default function App() {
  // Theme state: polished light cybersecurity theme by default
  const [theme, setTheme] = useState<'light' | 'dark-navy' | 'dark-oled'>(() => {
    return (localStorage.getItem('scamshield_theme') as any) || 'light';
  });

  // Font scale state
  const [fontSize, setFontSize] = useState<'normal' | 'large'>(() => {
    return (localStorage.getItem('scamshield_fontsize') as any) || 'normal';
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Saved incident reports
  const [reports, setReports] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem('scamshield_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Checklist state
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('scamshield_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['chk-1', 'chk-4'];
      }
    }
    return ['chk-1', 'chk-4']; // Sensible starting habits checked
  });

  // Quiz stats
  const [quizStats, setQuizStats] = useState<{ highScore: number; attempts: number }>(() => {
    const saved = localStorage.getItem('scamshield_quiz_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { highScore: 0, attempts: 0 };
      }
    }
    return { highScore: 0, attempts: 0 };
  });

  // Simulator scenarios completed
  const [scenariosCompletedCount, setScenariosCompletedCount] = useState<number>(() => {
    const saved = localStorage.getItem('scamshield_scenarios_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Activity audit trail
  const [activityList, setActivityList] = useState<UserActivityItem[]>(() => {
    const saved = localStorage.getItem('scamshield_activity');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'init-1',
        timestamp: new Date().toISOString(),
        type: 'checklist_update',
        title: 'Safety Shield Initialized',
        summary: 'Baseline digital habits configured in ScamShield',
        badge: 'Initialized',
      },
    ];
  });

  // Persist state updates
  useEffect(() => {
    localStorage.setItem('scamshield_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('scamshield_fontsize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('scamshield_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('scamshield_checklist', JSON.stringify(completedChecklistIds));
  }, [completedChecklistIds]);

  useEffect(() => {
    localStorage.setItem('scamshield_quiz_stats', JSON.stringify(quizStats));
  }, [quizStats]);

  useEffect(() => {
    localStorage.setItem('scamshield_scenarios_count', scenariosCompletedCount.toString());
  }, [scenariosCompletedCount]);

  useEffect(() => {
    localStorage.setItem('scamshield_activity', JSON.stringify(activityList));
  }, [activityList]);

  // Activity log helper
  const handleLogActivity = (
    title: string,
    summary: string,
    badge?: string,
    type: UserActivityItem['type'] = 'message_check'
  ) => {
    const item: UserActivityItem = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
      title,
      summary,
      badge,
    };
    setActivityList((prev) => [item, ...prev].slice(0, 50));
  };

  // Add Incident Report
  const handleAddReport = (report: IncidentReport) => {
    setReports((prev) => [report, ...prev]);
    handleLogActivity('Incident Documented', report.scamCategory, report.platform);
  };

  // Delete Incident Report
  const handleDeleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  // Toggle Checklist
  const handleToggleChecklist = (id: string) => {
    setCompletedChecklistIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      return next;
    });
    handleLogActivity('Checklist Updated', `Habit status updated`, 'Security Habit');
  };

  // Reset Checklist
  const handleResetChecklist = () => {
    setCompletedChecklistIds([]);
    handleLogActivity('Checklist Reset', 'Personal security checklist reset to 0%');
  };

  // Record Quiz Result
  const handleQuizComplete = (scorePercent: number) => {
    setQuizStats((prev) => ({
      highScore: Math.max(prev.highScore, scorePercent),
      attempts: prev.attempts + 1,
    }));
  };

  // Delete Activity
  const handleDeleteActivity = (id: string) => {
    setActivityList((prev) => prev.filter((a) => a.id !== id));
  };

  // Clear All Activity
  const handleClearAllActivity = () => {
    setActivityList([]);
  };

  // Clear All App Data
  const handleClearAllData = () => {
    setReports([]);
    setCompletedChecklistIds([]);
    setQuizStats({ highScore: 0, attempts: 0 });
    setScenariosCompletedCount(0);
    setActivityList([]);
    sessionStorage.removeItem('scamshield_chat_history');
    localStorage.clear();
  };

  // Navigation handler
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme root classes
  const themeClasses = {
    light: 'bg-[#FAFAFF] text-[#1F2937]',
    'dark-navy': 'bg-[#090d16] text-slate-100',
    'dark-oled': 'bg-black text-slate-100',
  }[theme];

  const fontClasses = fontSize === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${themeClasses} ${fontClasses}`}>
      {/* Top Emergency Helpline Banner */}
      <EmergencyBanner />

      {/* Main Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Content Layout: Sidebar + Main page area */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main Routed Content Area */}
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              quizHighScore={quizStats.highScore}
              completedQuizzesCount={quizStats.attempts}
              checklistCount={completedChecklistIds.length}
              totalChecklistItems={CHECKLIST_ITEMS.length}
              scenariosCompletedCount={scenariosCompletedCount}
              recentActivity={activityList}
            />
          )}

          {activeTab === 'message-checker' && (
            <MessageCheckerPage
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'url-checker' && (
            <UrlCheckerPage
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'chat-assistant' && (
            <ChatAssistantPage
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizPage
              onQuizComplete={handleQuizComplete}
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'device-simulation' && (
            <DeviceSimulationPage
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'scenario-simulator' && (
            <ScenarioGamePage
              onGameComplete={(score) => setScenariosCompletedCount(score)}
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'simulator' && (
            <ScenarioGamePage
              onGameComplete={(score) => setScenariosCompletedCount(score)}
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'learning' && (
            <LearningPage
              onActivityLog={handleLogActivity}
              showToast={showToast}
            />
          )}

          {activeTab === 'report' && (
            <ReportPage
              reports={reports}
              onAddReport={handleAddReport}
              onDeleteReport={handleDeleteReport}
              showToast={showToast}
            />
          )}

          {activeTab === 'checklist' && (
            <ChecklistPage
              completedChecklistIds={completedChecklistIds}
              onToggleChecklist={handleToggleChecklist}
              onResetChecklist={handleResetChecklist}
              showToast={showToast}
            />
          )}

          {activeTab === 'trends' && <TrendsPage />}

          {activeTab === 'history' && (
            <HistoryPage
              activityList={activityList}
              onDeleteActivity={handleDeleteActivity}
              onClearAllActivity={handleClearAllActivity}
              onNavigate={handleNavigate}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              theme={theme}
              setTheme={setTheme}
              fontSize={fontSize}
              setFontSize={setFontSize}
              onClearAllData={handleClearAllData}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Feedback notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
