import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 max-w-4xl"
      >
        <span className="text-red-700 tracking-widest text-sm font-bold uppercase mb-4 block">{t("hero.tag")}</span>
        <h1 className="serif text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          {t("hero.title.main")}<br/>
          <span className="text-4xl md:text-6xl text-gray-700">{t("hero.title.sub")}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t("hero.desc") }} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10"
      >
        <div className="flex flex-col items-center text-gray-400 text-sm">
          <span>{t("hero.start")}</span>
          <ArrowDown className="mt-2 animate-bounce w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;