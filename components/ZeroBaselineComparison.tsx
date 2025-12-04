
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { energyData } from '../data';
import { AlertCircle } from 'lucide-react';

const ZeroBaselineComparison: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState<number>(0);

  const currentData = energyData[activeWeek];

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
        <div>
          <h3 className="serif text-2xl font-bold text-gray-900 mb-2">零基線測試 (Zero Baseline)</h3>
          <p className="text-sm text-gray-500 max-w-lg">
            如果完全沒有任何物資進入台灣，我們會撐多久？<br/>
            此圖比較了三種不同能源政策下的生存曲線。
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">當前模擬週數</span>
          <span className="text-3xl font-mono font-bold text-stone-700">Week {activeWeek}</span>
        </div>
      </div>

      <div className="h-[350px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={energyData}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            onMouseMove={(e) => {
              if (e.activeLabel) setActiveWeek(Number(e.activeLabel));
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" label={{ value: '週數', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: '電力供應 %', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
            <Tooltip 
              trigger="hover"
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            {/* Critical Event Lines */}
            <ReferenceLine x={3} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'LNG耗盡', fontSize: 10, fill: '#ef4444' }} />
            <ReferenceLine x={9} stroke="#6b7280" strokeDasharray="3 3" label={{ position: 'top', value: '燃煤耗盡', fontSize: 10, fill: '#6b7280' }} />
            <ReferenceLine x={20} stroke="#6b7280" strokeDasharray="3 3" label={{ position: 'top', value: '石油耗盡', fontSize: 10, fill: '#6b7280' }} />
            
            {/* Interactive Active Week Line */}
            <ReferenceLine x={activeWeek} stroke="#3b82f6" strokeWidth={2} />
            
            <Line type="stepAfter" dataKey="base" name="現狀 (Base)" stroke="#94a3b8" strokeWidth={3} dot={false} />
            <Line type="stepAfter" dataKey="prepared" name="有準備 (Prepared)" stroke="#3b82f6" strokeWidth={3} dot={false} />
            <Line type="stepAfter" dataKey="green" name="激進綠能 (Green)" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg border transition-all ${currentData.base < 30 ? 'bg-red-50 border-red-200' : 'bg-stone-50 border-stone-100'}`}>
          <h4 className="font-bold text-gray-700 mb-1">現狀 (Base)</h4>
          <div className="text-2xl font-bold mb-1">{currentData.base}%</div>
          <p className="text-xs text-gray-500">
            {activeWeek >= 3 ? "天然氣耗盡" : "使用庫存中"}
            {activeWeek >= 9 ? "，燃煤耗盡" : ""}
            {activeWeek >= 20 ? "，石油耗盡" : ""}
          </p>
        </div>

        <div className={`p-4 rounded-lg border transition-all ${currentData.prepared < 30 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
          <h4 className="font-bold text-blue-800 mb-1">有準備 (Prepared)</h4>
          <div className="text-2xl font-bold mb-1 text-blue-600">{currentData.prepared}%</div>
          <p className="text-xs text-blue-600/70">
            增加戰略儲備 + 強制節電。
            {currentData.prepared > currentData.base ? `比現狀多支撐 ${currentData.prepared - currentData.base}%` : ""}
          </p>
        </div>

        <div className={`p-4 rounded-lg border transition-all ${currentData.green < 30 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <h4 className="font-bold text-green-800 mb-1">激進綠能 (Green)</h4>
          <div className="text-2xl font-bold mb-1 text-green-600">{currentData.green}%</div>
          <div className="flex items-start text-xs text-green-800/70">
            <AlertCircle size={12} className="mr-1 mt-0.5 flex-shrink-0" />
            <span>廢核+依賴天然氣。第3週即跌至嚴重水準(18%)，第7週進入危機。</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZeroBaselineComparison;
