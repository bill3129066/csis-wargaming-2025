import React from 'react';
import Hero from './components/Hero';
import EscalationMatrix from './components/EscalationMatrix';
import CasualtyChart from './components/CasualtyChart';
import ImpactTable from './components/ImpactTable';
import Recommendations from './components/Recommendations';
import ContextTimeline from './components/ContextTimeline';
import HistoryAnalysis from './components/HistoryAnalysis';
import GlobalImpact from './components/GlobalImpact';
import SimulationModules from './components/SimulationModules';
import ZeroBaselineComparison from './components/ZeroBaselineComparison';
import FreePlayExplorer from './components/FreePlayExplorer';
import PolicySimulator from './components/PolicySimulator';
import { motion } from 'framer-motion';
import { AlertCircle, Anchor, Navigation, Zap } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

const Section: React.FC<{ children: React.ReactNode; title?: string; subtitle?: string; bg?: string; id?: string }> = ({ children, title, subtitle, bg = "bg-transparent", id }) => (
  <motion.div 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className={`py-20 px-4 md:px-8 ${bg}`}
  >
    <div className="max-w-6xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && <h2 className="serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">{title}</h2>}
          {subtitle && <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">{subtitle}</p>}
          <div className="w-16 h-1 bg-red-800 mx-auto mt-6"></div>
        </div>
      )}
      {children}
    </div>
  </motion.div>
);

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen cream-gradient text-gray-800 selection:bg-red-100 selection:text-red-900 font-sans">
      <LanguageSwitcher />
      <Hero />

      {/* Introduction */}
      <Section title={t("app.title")} subtitle={t("app.subtitle")}>
        <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed max-w-3xl">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left text-justify" dangerouslySetInnerHTML={{ __html: t("intro.p1") }} />
          <div className="my-12 p-8 bg-white rounded-xl shadow-sm border-l-4 border-red-800">
            <p className="text-xl font-serif text-gray-800 italic mb-4">
              {t("intro.quote")}
            </p>
            <p className="text-sm text-gray-500 text-right">{t("intro.quoteAuthor")}</p>
          </div>
          <p className="text-justify" dangerouslySetInnerHTML={{ __html: t("intro.p2") }} />
        </div>
      </Section>

      {/* Context & Timeline */}
      <Section title={t("section.context")} subtitle={t("section.context.sub")} bg="bg-stone-50/50">
        <ContextTimeline />
      </Section>

      {/* History & Legal */}
      <Section title={t("section.history")} subtitle={t("section.history.sub")}>
        <HistoryAnalysis />
      </Section>

      {/* Simulation Methodology (New) */}
      <Section title={t("section.method")} subtitle={t("section.method.sub")} bg="bg-stone-100">
        <SimulationModules />
      </Section>

      {/* Strategic Geography (Cards Only) */}
      <Section title={t("section.geo")} subtitle={t("section.geo.sub")} bg="bg-white/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-red-900 mb-3 flex items-center text-lg">
              <AlertCircle size={20} className="mr-2"/> {t("geo.zone")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t("geo.zone.desc")}
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center text-lg">
              <Navigation size={20} className="mr-2"/> {t("geo.route")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t("geo.route.desc")}
            </p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-yellow-900 mb-3 flex items-center text-lg">
              <Anchor size={20} className="mr-2"/> {t("geo.hub")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t("geo.hub.desc")}
            </p>
          </div>
        </div>
      </Section>

      {/* Interactive Matrix (Structured Scenarios) */}
      <Section title={t("section.matrix")} subtitle={t("section.matrix.sub")} bg="bg-stone-50">
        <EscalationMatrix />
      </Section>

      {/* Free Play (Human Scenarios) (New) */}
      <Section title={t("section.freeplay")} subtitle={t("section.freeplay.sub")}>
        <FreePlayExplorer />
      </Section>

      {/* Cost of War */}
      <Section title={t("section.cost")} subtitle={t("section.cost.sub")}>
        <div className="max-w-4xl mx-auto">
           <CasualtyChart />
        </div>
      </Section>

      {/* Energy Crisis (Deep Dive) - Consolidated */}
      <Section title={t("section.energy")} bg="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("energy.title")}</h3>
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("energy.desc") }} />
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-3">1</span>
                  <span className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: t("energy.week3") }} />
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-3">2</span>
                  <span className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: t("energy.week9") }} />
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-3">3</span>
                  <span className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: t("energy.week21") }} />
                </li>
              </ul>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm text-yellow-800 flex items-start">
                <Zap className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t("energy.alert") }} />
              </div>
            </div>
            
            <div className="lg:col-span-2">
               <ZeroBaselineComparison />
            </div>
        </div>
      </Section>

      {/* Economic Impact */}
      <Section title={t("section.impact")} subtitle={t("section.impact.sub")}>
        <ImpactTable />
      </Section>

      {/* Global Impact */}
      <Section title={t("section.global")} bg="bg-stone-50/50">
        <GlobalImpact />
      </Section>

      {/* Policy Simulation (New) */}
      <Section title={t("section.policy")} subtitle={t("section.policy.sub")} bg="bg-stone-100">
        <div className="mb-8">
          <Recommendations />
        </div>
        <PolicySimulator />
      </Section>

      {/* Conclusion */}
      <Section>
        <div className="bg-stone-900 text-stone-200 p-10 md:p-16 rounded-3xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="serif text-4xl font-bold mb-8 text-white">{t("footer.title")}</h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-10 text-stone-300" dangerouslySetInnerHTML={{ __html: t("footer.desc") }} />
            <a
              href="https://www.csis.org/analysis/lights-out-wargaming-chinese-blockade-taiwan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-stone-600 rounded-full text-sm text-stone-400 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              {t("footer.link")}
            </a>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-900/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-12">
          <p>{t("footer.note1")}</p>
          <p>{t("footer.note2")}</p>
        </div>
      </Section>
      <Analytics />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;