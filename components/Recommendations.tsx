import React from 'react';
import { Ship, Battery, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Recommendations: React.FC = () => {
  const { t } = useLanguage();

  const recs = [
    {
      icon: <Ship className="w-6 h-6" />,
      title: t("rec.1.title"),
      content: t("rec.1.content")
    },
    {
      icon: <Battery className="w-6 h-6" />,
      title: t("rec.2.title"),
      content: t("rec.2.content")
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t("rec.3.title"),
      content: t("rec.3.content")
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("rec.4.title"),
      content: t("rec.4.content")
    }
  ];

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