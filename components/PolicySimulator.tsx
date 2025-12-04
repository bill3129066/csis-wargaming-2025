
import React, { useState } from 'react';
import { policyOptions } from '../data';
import { Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PolicySimulator: React.FC = () => {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

  const togglePolicy = (id: string) => {
    if (selectedPolicies.includes(id)) {
      setSelectedPolicies(selectedPolicies.filter(p => p !== id));
    } else {
      setSelectedPolicies([...selectedPolicies, id]);
    }
  };

  const totalBonus = selectedPolicies.reduce((acc, id) => {
    const policy = policyOptions.find(p => p.id === id);
    return acc + (policy?.enduranceBonus || 0);
  }, 0);

  // Base endurance score (arbitrary unit for visualization)
  const baseScore = 20; 
  const totalScore = Math.min(100, baseScore + totalBonus);

  const getStatusMessage = (score: number) => {
    if (score < 40) return "高風險：台灣將在 3-4 週內面臨能源崩潰，迫使在國際介入前投降。";
    if (score < 70) return "中等韌性：能撐過初期衝擊，但長期仍需依賴美軍打破封鎖。";
    if (score < 90) return "高韌性：能源與物資能維持數月，給予外交斡旋與軍事準備充足時間。";
    return "堅不可摧：封鎖對中國將變成昂貴且無效的消耗戰，有效嚇阻戰爭。";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-blue-600 p-6 text-white">
        <h3 className="serif text-2xl font-bold mb-2">政策模擬器：打造韌性之島</h3>
        <p className="text-blue-100 text-sm">
          我們無法控制中國何時行動，但可以控制台灣多難被擊倒。選擇政策組合，觀察「國家耐力」的變化。
        </p>
      </div>

      <div className="p-6 md:p-8">
        {/* Score Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-gray-700">國家耐力評估 (Resilience Score)</span>
            <span className="text-3xl font-bold text-blue-600">{totalScore}/100</span>
          </div>
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden relative">
            <motion.div 
              className={`h-full ${totalScore < 40 ? 'bg-red-500' : totalScore < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
              initial={{ width: '20%' }}
              animate={{ width: `${totalScore}%` }}
              transition={{ type: 'spring', stiffness: 50 }}
            />
            {/* Markers */}
            <div className="absolute top-0 bottom-0 left-[40%] w-0.5 bg-white/50 border-r border-gray-400 border-dashed"></div>
            <div className="absolute top-0 bottom-0 left-[70%] w-0.5 bg-white/50 border-r border-gray-400 border-dashed"></div>
          </div>
          <p className="mt-3 text-sm text-gray-600 bg-stone-50 p-3 rounded border border-stone-100">
            <strong>預測結果：</strong> {getStatusMessage(totalScore)}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policyOptions.map((policy) => (
            <div 
              key={policy.id}
              onClick={() => togglePolicy(policy.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPolicies.includes(policy.id) 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-stone-100 bg-white hover:border-blue-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-bold ${selectedPolicies.includes(policy.id) ? 'text-blue-800' : 'text-gray-700'}`}>
                  {policy.title}
                </h4>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedPolicies.includes(policy.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}>
                  {selectedPolicies.includes(policy.id) && <Check size={14} className="text-white" />}
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2 min-h-[2.5em]">{policy.description}</p>
              
              {selectedPolicies.includes(policy.id) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pt-2 border-t border-blue-100"
                >
                  <div className="flex items-center text-xs font-bold text-green-600 mb-1">
                    <ShieldCheck size={12} className="mr-1"/> {policy.impact}
                  </div>
                  <div className="text-[10px] text-blue-800 bg-blue-100/50 p-2 rounded">
                    <strong>Insight:</strong> {policy.insight}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicySimulator;
