
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 max-w-4xl"
      >
        <span className="text-red-700 tracking-widest text-sm font-bold uppercase mb-4 block">CSIS 2025 特別報告</span>
        <h1 className="serif text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Lights Out?<br/>
          <span className="text-4xl md:text-6xl text-gray-700">台灣封鎖兵棋推演</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          2028年，若中國決定封鎖台灣而非直接入侵，將會發生什麼？<br/>
          這份報告透過26次兵棋推演，揭示了能源、經濟與地緣政治的脆弱平衡。
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10"
      >
        <div className="flex flex-col items-center text-gray-400 text-sm">
          <span>開始探索</span>
          <ArrowDown className="mt-2 animate-bounce w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
