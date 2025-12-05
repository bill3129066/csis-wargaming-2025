import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, LabelList } from 'recharts';
import { airliftComparison_ZH, airliftComparison_EN } from '../data';
import { BookOpen, Plane, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HistoryAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'legal'>('history');
  const { t, language } = useLanguage();
  const airliftComparison = language === 'en' ? airliftComparison_EN : airliftComparison_ZH;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center ${
            activeTab === 'history' ? 'bg-stone-50 text-blue-900 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <BookOpen size={16} className="mr-2" /> {t("history.tab1")}
        </button>
        <button 
          onClick={() => setActiveTab('legal')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center ${
            activeTab === 'legal' ? 'bg-stone-50 text-red-900 border-b-2 border-red-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Scale size={16} className="mr-2" /> {t("history.tab2")}
        </button>
      </div>

      <div className="p-6 md:p-10">
        {activeTab === 'history' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="serif text-xl font-bold text-gray-900 mb-4">{t("history.lesson.title")}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {t("history.lesson.desc")}
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-900 text-sm mb-1">{t("history.berlin.title")}</h4>
                  <p className="text-xs text-blue-800">
                    {t("history.berlin.desc")}
                  </p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={airliftComparison} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="scenario" type="category" width={language === 'en' ? 120 : 100} tick={{fontSize: 10}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="tonsPerDay" name={t("history.chart.tons")} radius={[0, 4, 4, 0]}>
                      {airliftComparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#ef4444' : '#94a3b8'} />
                      ))}
                      <LabelList dataKey="tonsPerDay" position="right" formatter={(val: number) => val.toLocaleString() + ' ' + t("history.chart.tons")} fontSize={10} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-xs text-gray-400 mt-2">{t("history.chart.caption")}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="serif text-xl font-bold text-gray-900 mb-2">{t("history.legal.title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("history.legal.desc")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-stone-200 rounded-xl p-6 bg-stone-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-700">{t("history.china.title")}</h4>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">{t("history.china.tag")}</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start"><span className="mr-2 text-red-500">•</span> {t("history.china.p1")}</li>
                  <li className="flex items-start"><span className="mr-2 text-red-500">•</span> {t("history.china.p2")}</li>
                  <li className="flex items-start"><span className="mr-2 text-red-500">•</span> {t("history.china.p3")}</li>
                </ul>
              </div>

              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-red-800">{t("history.coalition.title")}</h4>
                  <span className="text-xs bg-red-200 px-2 py-1 rounded text-red-700">{t("history.coalition.tag")}</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> {t("history.coalition.p1")}</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> {t("history.coalition.p2")}</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> {t("history.coalition.p3")}</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400 mt-4 text-sm text-yellow-800">
              <strong>{t("history.insight").split("：")[0]}：</strong> {t("history.insight").split("：")[1]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryAnalysis;