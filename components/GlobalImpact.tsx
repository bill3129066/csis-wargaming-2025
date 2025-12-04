
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { globalGdpImpact } from '../data';
import { TrendingDown } from 'lucide-react';

const GlobalImpact: React.FC = () => {
  const [intensity, setIntensity] = useState<number>(5); // 0 to 10

  const estimatedLoss = 2 + (intensity / 10) * 8; // 2T to 10T

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="serif text-3xl font-bold text-gray-900 mb-6">為什麼世界無法袖手旁觀？</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          如果說烏克蘭戰爭對全球經濟造成了陣痛，那麼台海封鎖將是一場心臟病發作。
          這不僅是地緣政治問題，更是全球經濟結構的崩潰。
        </p>
        
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-red-500" />
              全球 GDP 損失預估
            </h4>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-red-600 font-mono">${estimatedLoss.toFixed(1)}</span>
              <span className="text-lg text-gray-500">兆美元 (Trillion)</span>
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
              <span>低強度封鎖 (Rhodium預估)</span>
              <span>全面制裁與戰爭 (Bloomberg預估)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">烏克蘭戰爭影響</div>
              <div className="font-bold text-gray-800">~1.5% 全球GDP</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="text-xs text-red-500 mb-1">台海戰爭預估影響</div>
              <div className="font-bold text-red-800">~10% 全球GDP</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 relative h-[450px] flex flex-col">
        <h4 className="text-center font-bold text-gray-800 mb-2">經濟規模對比 (GDP)</h4>
        <p className="text-center text-xs text-gray-500 mb-4">單位：兆美元 (Trillions USD)</p>
        
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={globalGdpImpact}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
              <XAxis type="number" tickFormatter={(value) => `$${value}T`} />
              <YAxis dataKey="region" type="category" width={90} tick={{fontSize: 11, fill: '#4b5563'}} />
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
          注：中國經濟規模是俄羅斯的8倍以上，這意味著制裁中國將對全球造成毀滅性反噬。
        </div>
      </div>
    </div>
  );
};

export default GlobalImpact;
