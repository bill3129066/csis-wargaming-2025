import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEvents_ZH, timelineEvents_EN } from '../data';
import { Calendar, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContextTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const { t, language } = useLanguage();
  const timelineEvents = language === 'en' ? timelineEvents_EN : timelineEvents_ZH;

  return (
    <div className="w-full bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-stone-200">
      <div className="text-center mb-10">
        <h3 className="serif text-2xl font-bold text-gray-900 mb-3">{t("timeline.title")}</h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm">
          {t("timeline.desc")}
        </p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col md:flex-row items-start ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-sm transform -translate-x-1/2 z-10 mt-1.5"></div>

              {/* Date Mobile */}
              <div className="md:hidden pl-10 mb-2 font-bold text-red-700 text-sm">{event.year}</div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-10">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`bg-stone-50 p-5 rounded-lg border border-stone-200 cursor-pointer transition-all ${
                    selectedEvent === index ? 'ring-2 ring-red-400 shadow-md bg-white' : 'hover:bg-white hover:shadow'
                  }`}
                  onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{event.title}</h4>
                    <span className="hidden md:block font-serif text-2xl text-red-100 font-bold -mt-2">{event.year}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{event.description}</p>
                  
                  <div className="flex items-center text-xs font-medium text-red-600 uppercase tracking-wider">
                    <AlertTriangle size={12} className="mr-1" />
                    {t("timeline.click")}
                  </div>

                  <AnimatePresence>
                    {selectedEvent === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-red-100"
                      >
                        <p className="text-sm text-red-800 italic bg-red-50 p-3 rounded">
                          <span className="font-bold block mb-1 not-italic text-red-900">{t("timeline.insight")}</span>
                          "{event.insight}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Empty Side */}
              <div className="w-full md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContextTimeline;