
import React from 'react';
import { motion } from 'framer-motion';
import { simulationModules } from '../data';
import { Box, Target, Zap } from 'lucide-react';

const icons = [Box, Target, Zap];

const SimulationModules: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {simulationModules.map((mod, idx) => {
        const Icon = icons[idx];
        return (
          <motion.div 
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-600">
              <Icon size={24} />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">{mod.title}</h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">核心問題</span>
                <p className="text-sm text-gray-600">{mod.question}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-green-600 uppercase tracking-wide">分析方法</span>
                <p className="text-sm text-gray-600">{mod.method}</p>
              </div>
              <div className="bg-stone-50 p-3 rounded border border-stone-100 mt-2">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide block mb-1">關鍵發現</span>
                <p className="text-xs text-gray-700 leading-relaxed">{mod.keyFinding}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SimulationModules;
