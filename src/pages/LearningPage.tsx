import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ArrowLeft,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { LEARNING_ARTICLES } from '../data/learningData';
import { LearningArticle } from '../types';

interface LearningProps {
  onActivityLog: (title: string, summary: string, badge?: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const LearningPage: React.FC<LearningProps> = ({
  onActivityLog,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const categories = ['All', 'Banking', 'Employment', 'Delivery', 'Payments', 'Social', 'Identity', 'Family Safety'];

  const filteredArticles = useMemo(() => {
    return LEARNING_ARTICLES.filter((art) => {
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.commonTactics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeArticle: LearningArticle | undefined = LEARNING_ARTICLES.find(
    (a) => a.id === activeArticleId
  );

  const handleOpenArticle = (art: LearningArticle) => {
    setActiveArticleId(art.id);
    onActivityLog('Read Safety Guide', art.title, art.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveArticleId(null);
  };

  // Article In-Depth View
  if (activeArticle) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Back navigation */}
        <button
          onClick={handleBackToList}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5EAF1] text-[#172033] hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#64748B]" />
          <span>Back to Learning Center</span>
        </button>

        {/* Article Container */}
        <article className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EAF1] space-y-6 shadow-sm">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-[#E5EAF1]">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200 font-bold">
                {activeArticle.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[#64748B] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight leading-snug">
              {activeArticle.title}
            </h1>

            <p className="text-[#64748B] text-sm leading-relaxed">
              {activeArticle.summary}
            </p>
          </div>

          {/* Real World Impact Callout */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-[#E5EAF1] space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#047857]">
              Real-World Threat Landscape:
            </span>
            <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
              {activeArticle.realWorldImpact}
            </p>
          </div>

          {/* Common Tactics */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              <span>Deceptive Tactics & Manipulation Angles</span>
            </h2>
            <div className="space-y-2">
              {activeArticle.commonTactics.map((tactic, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5"
                >
                  <span className="font-bold text-amber-800 shrink-0">#{idx + 1}</span>
                  <span className="leading-relaxed">{tactic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Steps */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#047857] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Protective Measures & Prevention</span>
            </h2>
            <div className="space-y-2">
              {activeArticle.preventionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-[#172033] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Containment Playbook */}
          <div className="p-6 rounded-2xl bg-red-50/80 border border-red-200 space-y-3.5 shadow-xs">
            <h2 className="text-sm font-bold text-red-900 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#EF4444]" />
              <span>What To Do If You Were Targeted or Sent Money</span>
            </h2>
            <ul className="space-y-2 text-xs text-red-950">
              {activeArticle.whatToDoIfVictim.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#EF4444] font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-red-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-red-900 font-medium">{activeArticle.officialHelplineNote}</span>
              <a
                href="tel:1930"
                className="px-4 py-2 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-bold transition-colors shadow-xs"
              >
                Dial 1930
              </a>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Articles List View
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#10B981]" />
          <span>Curated Cyber Threat Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
          Safety Learning Center
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Explore comprehensive guides covering modern social engineering, banking KYC threats, digital arrest extortion, and device lockdown strategies.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="p-5 rounded-2xl bg-white border border-[#E5EAF1] space-y-3.5 shadow-sm">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. digital arrest, UPI PIN, telegram task, older adults)..."
            className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
          />
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#10B981] to-[#047857] text-white shadow-xs'
                  : 'bg-slate-100 text-[#64748B] hover:text-[#172033] border border-[#E5EAF1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 rounded-3xl bg-white border border-[#E5EAF1] text-[#64748B] text-sm space-y-2 shadow-xs">
          <BookOpen className="w-8 h-8 mx-auto text-[#64748B]" />
          <p>No safety articles found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs text-[#047857] underline font-bold cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="group cursor-pointer p-6 rounded-2xl bg-white border border-[#E5EAF1] hover:border-[#10B981] hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200 font-bold text-[11px]">
                    {art.category}
                  </span>
                  <span className="text-[#64748B] flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-[#172033] text-base group-hover:text-[#047857] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#E5EAF1] flex items-center justify-between text-xs font-bold text-[#047857] group-hover:translate-x-1 transition-transform">
                <span>Read Defense Guide</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
