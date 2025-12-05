import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chinaLevels_ZH, chinaLevels_EN, coalitionLevels_ZH, coalitionLevels_EN, getScenarioData } from '../data';
import { AlertTriangle, Zap, Anchor, Users, Skull } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EscalationMatrix: React.FC = () => {
  const [chinaLvl, setChinaLvl] = useState(1);
  const [coalitionLvl, setCoalitionLvl] = useState(1);
  const { t, language } = useLanguage();

  const result = getScenarioData(chinaLvl, coalitionLvl, language);
  const chinaLevels = language === 'en' ? chinaLevels_EN : chinaLevels_ZH;
  const coalitionLevels = language === 'en' ? coalitionLevels_EN : coalitionLevels_ZH;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-sm border border-stone-200">
      <div className="mb-8 text-center">
        <h3 className="serif text-2xl font-bold text-gray-800 mb-2">{t("matrix.title")}</h3>
        <p className="text-gray-500 text-sm" dangerouslySetInnerHTML={{ __html: t("matrix.desc") }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8">
        {/* China Controls */}
        <div className="space-y-4">
          <h4 className="font-bold text-red-800 border-b border-red-100 pb-2 flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
              {t("matrix.china")}
            </div>
            <span className="text-xs font-normal bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Level {chinaLvl}</span>
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {chinaLevels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setChinaLvl(lvl.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 border relative overflow-hidden ${
                  chinaLvl === lvl.id 
                    ? 'bg-red-50 border-red-500 shadow-md' 
                    : 'bg-stone-50 border-transparent hover:bg-stone-100 text-gray-400'
                }`}
              >
                <div className={`font-bold ${chinaLvl === lvl.id ? 'text-red-900' : 'text-gray-600'}`}>{lvl.label}</div>
                <div className="text-xs mt-1">{lvl.desc}</div>
                {chinaLvl === lvl.id && (
                  <motion.div layoutId="china-active" className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Coalition Controls */}
        <div className="space-y-4">
          <h4 className="font-bold text-blue-800 border-b border-blue-100 pb-2 flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
              {t("matrix.coalition")}
            </div>
            <span className="text-xs font-normal bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Level {coalitionLvl}</span>
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {coalitionLevels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setCoalitionLvl(lvl.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 border relative overflow-hidden ${
                  coalitionLvl === lvl.id 
                    ? 'bg-blue-50 border-blue-500 shadow-md' 
                    : 'bg-stone-50 border-transparent hover:bg-stone-100 text-gray-400'
                }`}
              >
                <div className={`font-bold ${coalitionLvl === lvl.id ? 'text-blue-900' : 'text-gray-600'}`}>{lvl.label}</div>
                <div className="text-xs mt-1">{lvl.desc}</div>
                {coalitionLvl === lvl.id && (
                  <motion.div layoutId="coalition-active" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Display */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={result.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-stone-900 text-stone-100 p-6 md:p-8 rounded-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b border-stone-700 pb-4">
            <div>
              <div className="text-xs font-mono text-yellow-500 mb-1">{t("matrix.scenario")} {result.id}</div>
              <h2 className="text-3xl font-bold text-white mb-1">{result.name}</h2>
              <h3 className="text-sm font-medium text-stone-400 font-mono">{result.engName}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-stone-800 p-4 rounded-lg border border-stone-700 relative overflow-hidden group">
              <div className="text-stone-400 text-xs mb-2 flex items-center"><Zap size={14} className="mr-1.5 text-yellow-400"/>{t("matrix.electricity")}</div>
              <div className={`text-3xl font-bold font-mono ${result.electricity < 50 ? 'text-red-500' : 'text-green-500'}`}>
                {result.electricity}%
              </div>
              <div className="w-full bg-stone-700 h-1.5 mt-3 rounded-full overflow-hidden">
                <div className={`h-full ${result.electricity < 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${result.electricity}%`}}></div>
              </div>
            </div>
            
            <div className="bg-stone-800 p-4 rounded-lg border border-stone-700">
              <div className="text-stone-400 text-xs mb-2 flex items-center"><Anchor size={14} className="mr-1.5 text-blue-400"/>{t("matrix.imports")}</div>
              <div className={`text-3xl font-bold font-mono ${result.imports < 30 ? 'text-red-500' : 'text-yellow-500'}`}>
                {result.imports}%
              </div>
              <div className="w-full bg-stone-700 h-1.5 mt-3 rounded-full overflow-hidden">
                <div className={`h-full ${result.imports < 30 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{width: `${result.imports}%`}}></div>
              </div>
            </div>

            <div className="bg-stone-800 p-4 rounded-lg border border-stone-700">
              <div className="text-stone-400 text-xs mb-2 flex items-center"><Users size={14} className="mr-1.5 text-purple-400"/>{t("matrix.casualties")}</div>
              <div className="text-2xl font-bold font-mono text-white">
                <span className="text-blue-400">{result.casualties_coalition.toLocaleString()}</span>
                <span className="text-stone-500 mx-1">/</span>
                <span className="text-red-400">{result.casualties_china.toLocaleString()}</span>
              </div>
              <div className="text-[10px] text-stone-500 mt-2">{t("matrix.casualties.desc")}</div>
            </div>

            <div className="bg-stone-800 p-4 rounded-lg border border-stone-700">
              <div className="text-stone-400 text-xs mb-2 flex items-center"><Skull size={14} className="mr-1.5 text-orange-400"/>{t("matrix.ships")}</div>
              <div className="text-3xl font-bold font-mono text-white">
                {result.merchantLosses}
              </div>
              <div className="text-[10px] text-stone-500 mt-2">{t("matrix.ships.desc")}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
               <div>
                <h4 className="text-yellow-500 text-sm font-bold uppercase tracking-wider mb-2">{t("matrix.desc_title")}</h4>
                <p className="text-stone-300 text-sm leading-relaxed">{result.description}</p>
               </div>
               <div>
                <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">{t("matrix.summary_title")}</h4>
                <p className="text-stone-300 text-sm leading-relaxed">{result.summary}</p>
               </div>
            </div>
            <div className="bg-stone-800/50 p-4 rounded border-l-2 border-purple-500">
              <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                <AlertTriangle size={12} className="mr-1" /> {t("matrix.insight_title")}
              </h4>
              <p className="text-xs leading-relaxed text-stone-400 italic">
                "{result.tacticalInsight}"
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EscalationMatrix;