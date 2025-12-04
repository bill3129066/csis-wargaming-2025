
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: '1x1 (海警)', coalition: 0, china: 0, merchants: 448, label: '無傷亡' },
  { name: '2x2 (潛艇)', coalition: 2256, china: 208, merchants: 354, label: '台灣重創' },
  { name: '3x3 (護航)', coalition: 6237, china: 3147, merchants: 106, label: '血腥護航' },
  { name: '4x4 (全面)', coalition: 26981, china: 13675, merchants: 49, label: '災難性' },
];

const CasualtyChart: React.FC = () => {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-stone-200 mt-8">
      <h4 className="text-center font-bold text-gray-800 mb-2">代價：人員傷亡與商船損失 (Casualties & Losses)</h4>
      <p className="text-center text-sm text-gray-500 mb-6">
        隨著衝突層級升高，人員傷亡(柱狀)急劇增加，但商船損失(折線)因護航而減少。
        <br/><span className="text-xs text-red-500">* 4x4 情境下，聯軍傷亡包含美軍航母被擊沉的巨大損失。</span>
      </p>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 12}} />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: '人員傷亡數', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: '商船損失數', angle: 90, position: 'insideRight' }} />
            <Tooltip 
              cursor={{fill: '#f3f4f6'}}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="coalition" name="聯軍傷亡 (人)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="china" name="共軍傷亡 (人)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="merchants" name="商船損失 (艘)" fill="#fbbf24" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CasualtyChart;
