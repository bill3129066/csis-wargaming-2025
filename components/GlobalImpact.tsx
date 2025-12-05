import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { globalGdpImpact_ZH, globalGdpImpact_EN } from '../data';
import { TrendingDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GlobalImpact: React.FC = () => {
  const [intensity, setIntensity] = useState<number>(5); // 0 to 10
  const { t, language } = useLanguage();
  const globalGdpImpact = language === 'en' ? globalGdpImpact_EN : globalGdpImpact_ZH;

  const estimatedLoss = 2 + (intensity / 10) * 8; // 2T to 10T

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="serif text-3xl font-bold text-gray-900 mb-6">{t("global.title")}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {t("global.desc")}
        </p>
        
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-red-500" />
              {t("global.loss")}
            </h4>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-red-600 font-mono">${estimatedLoss.toFixed(1)}</span>
              <span className="text-lg text-gray-500">{t("global.trillion")}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={intensity} 
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{t("global.low")}</span>
              <span>{t("global.high")}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">{t("global.ukraine")}</div>
              <div className="font-bold text-gray-800">~1.5% {language === 'zh' ? '全球GDP' : 'Global GDP'}</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="text-xs text-red-500 mb-1">{t("global.taiwan")}</div>
              <div className="font-bold text-red-800">~10% {language === 'zh' ? '全球GDP' : 'Global GDP'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 relative h-[450px] flex flex-col">
        <h4 className="text-center font-bold text-gray-800 mb-2">{t("global.chart_title")}</h4>
        <p className="text-center text-xs text-gray-500 mb-4">{t("global.chart_unit")}</p>
        
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={globalGdpImpact}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
              <XAxis type="number" tickFormatter={(value) => `$${value}T`} />
              <YAxis dataKey="region" type="category" width={language === 'en' ? 100 : 90} tick={{fontSize: 11, fill: '#4b5563'}} />
              <Tooltip 
                formatter={(value: number) => [`$${value} Trillion`, 'GDP']}
                cursor={{fill: '#f9fafb'}}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
              />
              <Bar dataKey="gdp" radius={[0, 4, 4, 0]} barSize={40}>
                {globalGdpImpact.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index >= 2 ? '#ef4444' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-stone-50 rounded border border-stone-100 text-center text-xs text-gray-500 italic">
          {t("global.note")}
        </div>
      </div>
    </div>
  );
};

export default GlobalImpact;