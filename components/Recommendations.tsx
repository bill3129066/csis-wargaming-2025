
import React from 'react';
import { Ship, Battery, Globe, Shield } from 'lucide-react';

const recs = [
  {
    icon: <Ship className="w-6 h-6" />,
    title: "1. 準備商船隊",
    content: "徵用機制與 LNG 船隊擴建"
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: "2. 強化能源韌性",
    content: "電網加固與增加戰略庫存"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "3. 美國援助計畫",
    content: "重啟護航演習與盟友協調"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "4. 反制與結束",
    content: "建立外交聯盟與下台階機制"
  }
];

const Recommendations: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {recs.map((rec, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 text-center">
          <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-600">
            {rec.icon}
          </div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">{rec.title}</h4>
          <p className="text-xs text-gray-500">{rec.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
