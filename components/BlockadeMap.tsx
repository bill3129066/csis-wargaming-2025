import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mapFeatures_ZH, mapFeatures_EN } from '../data';
import { Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BlockadeMap: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const mapFeatures = language === 'en' ? mapFeatures_EN : mapFeatures_ZH;

  return (
    <div className="w-full bg-blue-50 rounded-xl overflow-hidden shadow-inner border border-blue-100 relative h-[500px] md:h-[600px]">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-4 rounded-lg shadow-sm max-w-xs">
        <h4 className="font-bold text-gray-800 mb-2">{t("map.title")}</h4>
        <p className="text-xs text-gray-600 mb-3">
          {t("map.desc")}
        </p>
        <div className="space-y-2">
          {mapFeatures.map(f => (
            <div key={f.id} className="flex items-center text-xs cursor-pointer hover:text-blue-600"
                 onMouseEnter={() => setActiveFeature(f.id)}
                 onMouseLeave={() => setActiveFeature(null)}>
              <span className={`w-3 h-3 rounded-full mr-2 ${
                f.type === 'zone' ? 'bg-red-200 border border-red-500' : 
                f.type === 'route' ? 'bg-blue-400' : 'bg-yellow-400'
              }`}></span>
              {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* Map Overlay Info Box */}
      {activeFeature && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-20 bg-stone-800 text-white p-4 rounded-lg shadow-lg pointer-events-none"
        >
          <h5 className="font-bold text-yellow-400 mb-1">
            {mapFeatures.find(f => f.id === activeFeature)?.label}
          </h5>
          <p className="text-sm text-gray-300 leading-relaxed">
            {mapFeatures.find(f => f.id === activeFeature)?.description}
          </p>
        </motion.div>
      )}

      {/* Simplified SVG Map */}
      <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
        <defs>
          <pattern id="water" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 Q10 10 20 20 T40 20" fill="none" stroke="#BFDBFE" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        
        {/* Background */}
        <rect width="800" height="600" fill="#EFF6FF" />
        <rect width="800" height="600" fill="url(#water)" />

        {/* China Mainland */}
        <path d="M-50 0 L300 0 L280 100 L200 250 L150 400 L100 600 L-50 600 Z" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
        <text x="50" y="300" className="text-2xl font-bold fill-gray-500 opacity-50">{t("map.china")}</text>

        {/* Taiwan */}
        <path d="M400 250 Q430 230 450 260 Q460 300 440 350 Q420 380 400 360 Q380 320 400 250 Z" fill="#10B981" stroke="#059669" strokeWidth="2" 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onMouseEnter={() => setActiveFeature('energy-target')}
              onMouseLeave={() => setActiveFeature(null)}
        />
        <text x="410" y="300" className="text-sm font-bold fill-white pointer-events-none">{t("map.taiwan")}</text>

        {/* Japan/Ryukyu */}
        <path d="M550 100 L600 80 L750 20 L800 30" stroke="#CBD5E0" strokeWidth="2" fill="none"/> {/* Chain indicator */}
        <circle cx="520" cy="230" r="8" fill="#D1D5DB" stroke="#4B5563" /> {/* Yonaguni */}
        <text x="535" y="235" className="text-xs fill-gray-600">{t("map.yonaguni")}</text>
        <path d="M600 150 L650 130 L700 140 L680 170 Z" fill="#D1D5DB" stroke="#9CA3AF" /> {/* Okinawaish */}
        <text x="660" y="190" className="text-xs fill-gray-600">{t("map.okinawa")}</text>

        {/* Exclusion Zone (10-dash line approx) */}
        <path d="M350 200 L500 200 L520 400 L350 400 Z" 
              fill="rgba(239, 68, 68, 0.1)" 
              stroke="#EF4444" 
              strokeWidth="2" 
              strokeDasharray="8 4"
              className="transition-all duration-300"
              style={{ opacity: activeFeature === 'exclusion-zone' ? 0.8 : 0.4 }}
              onMouseEnter={() => setActiveFeature('exclusion-zone')}
              onMouseLeave={() => setActiveFeature(null)}
        />
        
        {/* Convoy Route */}
        <path d="M520 230 L450 260" 
              stroke="#3B82F6" 
              strokeWidth="4" 
              strokeDasharray="4 4"
              className="animate-pulse cursor-pointer"
              onMouseEnter={() => setActiveFeature('convoy-route')}
              onMouseLeave={() => setActiveFeature(null)}
        />

        {/* Major Ports */}
        <circle cx="440" cy="250" r="4" fill="yellow" stroke="black" /> {/* Keelung/Taipei */}
        <circle cx="410" cy="350" r="4" fill="yellow" stroke="black" /> {/* Kaohsiung */}
        
        {/* Annotations */}
        <text x="380" y="190" className="text-xs fill-red-500 font-bold">{t("map.ez")}</text>
        
      </svg>
    </div>
  );
};

export default BlockadeMap;