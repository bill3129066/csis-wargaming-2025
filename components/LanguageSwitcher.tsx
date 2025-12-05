import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-md p-1 border border-stone-200">
      <Globe size={16} className="ml-2 mr-1 text-stone-600" />
      <button
        onClick={() => setLanguage('zh')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'zh'
            ? 'bg-red-800 text-white shadow-sm'
            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-red-800 text-white shadow-sm'
            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
        }`}
      >
        English
      </button>
    </div>
  );
};
