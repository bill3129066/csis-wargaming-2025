import React from 'react';
import { economicImpacts_ZH, economicImpacts_EN } from '../data';
import { useLanguage } from '../context/LanguageContext';

const ImpactTable: React.FC = () => {
  const { t, language } = useLanguage();
  const economicImpacts = language === 'en' ? economicImpacts_EN : economicImpacts_ZH;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
        <thead className="bg-stone-100 border-b border-stone-200">
          <tr>
            <th className="py-3 px-4 text-left font-bold text-gray-700">{t("impact.sector")}</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("impact.power80")}</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("impact.power60")}</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("impact.power40")}</th>
            <th className="py-3 px-4 text-left font-semibold text-red-600">{t("impact.power20")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {economicImpacts.map((row, idx) => (
            <tr key={idx} className="hover:bg-stone-50">
              <td className="py-3 px-4 font-medium text-gray-800">{row.sector}</td>
              <td className="py-3 px-4 text-gray-600">{row.impact80}</td>
              <td className="py-3 px-4 text-gray-600">{row.impact60}</td>
              <td className="py-3 px-4 text-gray-600">{row.impact40}</td>
              <td className="py-3 px-4 text-red-600 font-medium">{row.impact20}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImpactTable;