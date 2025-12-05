import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const CasualtyChart: React.FC = () => {
  const { t } = useLanguage();

  const data = [
    { name: t("casualties.x_1x1"), coalition: 0, china: 0, merchants: 448, label: t("casualties.label1") },
    { name: t("casualties.x_2x2"), coalition: 2256, china: 208, merchants: 354, label: t("casualties.label2") },
    { name: t("casualties.x_3x3"), coalition: 4129, china: 3147, merchants: 106, label: t("casualties.label3") },
    { name: t("casualties.x_4x4"), coalition: 23689, china: 13675, merchants: 49, label: t("casualties.label4") },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-stone-200 mt-8">
      <h4 className="text-center font-bold text-gray-800 mb-2">{t("casualties.title")}</h4>
      <p className="text-center text-sm text-gray-500 mb-6" dangerouslySetInnerHTML={{ __html: t("casualties.desc") }} />
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 12}} />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" label={{ value: t("casualties.y_left"), angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#fbbf24" label={{ value: t("casualties.y_right"), angle: 90, position: 'insideRight' }} />
            <Tooltip 
              cursor={{fill: '#f3f4f6'}}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="coalition" name={t("casualties.legend_coalition")} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="china" name={t("casualties.legend_china")} fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="merchants" name={t("casualties.legend_merchants")} fill="#fbbf24" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CasualtyChart;