
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Label } from 'recharts';
import { energyData } from '../data';

const EnergyChart: React.FC = () => {
  return (
    <div className="w-full h-[450px] bg-white p-4 md:p-6 rounded-xl shadow-sm border border-stone-200 flex flex-col">
      <div className="mb-4">
        <h4 className="text-center font-bold text-gray-800 text-lg">電力供應隨時間變化 (Zero Baseline)</h4>
        <p className="text-center text-xs text-gray-500">比較完全封鎖狀態下，不同準備程度的電力衰退曲線</p>
      </div>
      
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={energyData}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              label={{ value: '封鎖週數 (Week)', position: 'insideBottom', offset: -10 }} 
              tick={{fontSize: 12}}
              interval={2}
            />
            <YAxis 
              label={{ value: '電力需求滿足率 (%)', angle: -90, position: 'insideLeft' }} 
              domain={[0, 100]}
              tick={{fontSize: 12}}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FDFBF7', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ padding: 0 }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }}/>
            
            {/* Critical Event Lines */}
            <ReferenceLine x={3} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'LNG耗盡', fontSize: 10, fill: 'red' }} />
            <ReferenceLine x={9} stroke="gray" strokeDasharray="3 3" label={{ position: 'top', value: '燃煤耗盡', fontSize: 10, fill: 'gray' }} />

            <Line 
              type="stepAfter" 
              dataKey="base" 
              name="基礎現狀 (Base)" 
              stroke="#94a3b8" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="stepAfter" 
              dataKey="prepared" 
              name="有準備 (Prepared)" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={false}
            />
            <Line 
              type="stepAfter" 
              dataKey="green" 
              name="激進綠能 (More Green)" 
              stroke="#22c55e" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-gray-500 bg-stone-50 p-3 rounded border border-stone-100">
        <div>
          <strong className="text-slate-600 block mb-1">基礎現狀 (Base)</strong>
          未增加庫存。天然氣第3週耗盡，燃煤第9週耗盡，第20週石油耗盡，僅剩核能/再生能源 (17%)。
        </div>
        <div>
          <strong className="text-blue-600 block mb-1">有準備 (Prepared)</strong>
          增加兩週能源庫存 + 強制配給。能將嚴重缺電延後至第12週發生。
        </div>
        <div>
          <strong className="text-green-600 block mb-1">激進綠能 (More Green)</strong>
          廢核 + 減少燃煤。因過度依賴天然氣與再生能源，初期抗封鎖能力反而最差。
        </div>
      </div>
    </div>
  );
};

export default EnergyChart;
