
import React from 'react';
import Hero from './components/Hero';
import EscalationMatrix from './components/EscalationMatrix';
import CasualtyChart from './components/CasualtyChart';
import ImpactTable from './components/ImpactTable';
import Recommendations from './components/Recommendations';
import ContextTimeline from './components/ContextTimeline';
import HistoryAnalysis from './components/HistoryAnalysis';
import GlobalImpact from './components/GlobalImpact';
import SimulationModules from './components/SimulationModules';
import ZeroBaselineComparison from './components/ZeroBaselineComparison';
import FreePlayExplorer from './components/FreePlayExplorer';
import PolicySimulator from './components/PolicySimulator';
import { motion } from 'framer-motion';
import { AlertCircle, Anchor, Navigation, Zap } from 'lucide-react';

const Section: React.FC<{ children: React.ReactNode; title?: string; subtitle?: string; bg?: string; id?: string }> = ({ children, title, subtitle, bg = "bg-transparent", id }) => (
  <motion.div 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className={`py-20 px-4 md:px-8 ${bg}`}
  >
    <div className="max-w-6xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && <h2 className="serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">{title}</h2>}
          {subtitle && <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">{subtitle}</p>}
          <div className="w-16 h-1 bg-red-800 mx-auto mt-6"></div>
        </div>
      )}
      {children}
    </div>
  </motion.div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen cream-gradient text-gray-800 selection:bg-red-100 selection:text-red-900 font-sans">
      <Hero />

      {/* Introduction */}
      <Section title="如果不入侵，而是封鎖？" subtitle="CSIS 2025 兵棋推演報告核心發現">
        <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed max-w-3xl">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left text-justify">
            2028年，習近平決定改變台海現狀。但他沒有選擇風險極高的兩棲登陸入侵（Invasion），而是選擇了<b>「封鎖」(Blockade)</b>。
            CSIS 透過 26 次兵棋推演，模擬了各種封鎖情境。從單純的海警登船檢查，到全面的美中戰爭。
          </p>
          <div className="my-12 p-8 bg-white rounded-xl shadow-sm border-l-4 border-red-800">
            <p className="text-xl font-serif text-gray-800 italic mb-4">
              「封鎖不是入侵的前奏。入侵需要全面投入，而封鎖則是一種強制性的對話，雙方都保留了未使用的武力。」
            </p>
            <p className="text-sm text-gray-500 text-right">— 報告引言</p>
          </div>
          <p className="text-justify">
            這份報告打破了許多迷思。例如，封鎖並非「低風險、低成本」的選項；相反地，任何有效的封鎖都很容易升級為全面戰爭。
            而對台灣而言，撐下去的關鍵不在於飛彈數量，而在於<b>能源庫存</b>與<b>維持社會運轉的韌性</b>。
          </p>
        </div>
      </Section>

      {/* Context & Timeline */}
      <Section title="背景與脈絡" subtitle="封鎖為何成為可能的選項？" bg="bg-stone-50/50">
        <ContextTimeline />
      </Section>

      {/* History & Legal */}
      <Section title="歷史的鏡子" subtitle="從柏林空運到灰色地帶法律戰">
        <HistoryAnalysis />
      </Section>

      {/* Simulation Methodology (New) */}
      <Section title="兵推方法論" subtitle="如何量化一個國家的窒息過程？" bg="bg-stone-100">
        <SimulationModules />
      </Section>

      {/* Strategic Geography (Cards Only) */}
      <Section title="地理戰略：三個關鍵變數" subtitle="這是一場關於距離、港口與運量的後勤戰爭" bg="bg-white/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-red-900 mb-3 flex items-center text-lg">
              <AlertCircle size={20} className="mr-2"/> 封鎖排他區
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              中國劃設的禁航區 (Exclusion Zone)，範圍大致重疊台灣防空識別區 (ADIZ)。
              在此區域內，商船將面臨登檢、扣押甚至攻擊，切斷絕大部分的正常航運。
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center text-lg">
              <Navigation size={20} className="mr-2"/> 與那國-花蓮 生命線
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              距離僅100公里的短程護航走廊。由於台灣海峽被封鎖，這是美日台聯軍唯一能嘗試突破的通道，也是雙方海空軍激烈交戰的「鐵籠格鬥」場。
            </p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-yellow-900 mb-3 flex items-center text-lg">
              <Anchor size={20} className="mr-2"/> 日本轉運樞紐
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              因戰爭風險極高，國際遠洋商船不敢直航台灣。所有物資需先在日本港口卸貨，再轉由武裝或受保護的「穿梭船隊」運入台灣。
            </p>
          </div>
        </div>
      </Section>

      {/* Interactive Matrix (Structured Scenarios) */}
      <Section title="互動兵推 1: 結構化情境" subtitle="調整雙方交戰規則 (ROE)，觀察模型計算結果" bg="bg-stone-50">
        <EscalationMatrix />
      </Section>

      {/* Free Play (Human Scenarios) (New) */}
      <Section title="互動兵推 2: 自由演練" subtitle="當人類介入決策：誤判、升級與下台階">
        <FreePlayExplorer />
      </Section>

      {/* Cost of War */}
      <Section title="代價：血與鐵" subtitle="結構化情境下的人員傷亡與商船損失">
        <div className="max-w-4xl mx-auto">
           <CasualtyChart />
        </div>
      </Section>

      {/* Energy Crisis (Deep Dive) - Consolidated */}
      <Section title="核心弱點：能源生命線" bg="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">為什麼 LNG 是致命傷？</h3>
              <p className="mb-6 text-gray-700 leading-relaxed">
                台灣97%的能源依賴進口。在完全封鎖的情境下，<b>液化天然氣 (LNG)</b> 是最脆弱的一環。
                即便在平時，台灣的 LNG 庫存也僅有約 11-12 天。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-3">1</span>
                  <span className="text-gray-600 text-sm"><strong>第 3 週：</strong> 天然氣耗盡。電力生產降至 73%，全台進入強制節電。</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-3">2</span>
                  <span className="text-gray-600 text-sm"><strong>第 9 週：</strong> 燃煤耗盡。電力生產降至 24%，工業生產幾乎全面停擺。</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-3">3</span>
                  <span className="text-gray-600 text-sm"><strong>第 21 週：</strong> 石油耗盡。電力生產降至 17%，僅剩核能與再生能源維持基本維生系統。</span>
                </li>
              </ul>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm text-yellow-800 flex items-start">
                <Zap className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>警訊：</strong> 報告指出，若台灣依照計畫廢除核能並過度依賴天然氣，其戰時能源韌性將顯著下降（見激進綠能情境）。</span>
              </div>
            </div>
            
            <div className="lg:col-span-2">
               <ZeroBaselineComparison />
            </div>
        </div>
      </Section>

      {/* Economic Impact */}
      <Section title="社會衝擊：當電力消失時" subtitle="電力短缺對各產業的連鎖反應">
        <ImpactTable />
      </Section>

      {/* Global Impact */}
      <Section title="全球經濟衝擊" bg="bg-stone-50/50">
        <GlobalImpact />
      </Section>

      {/* Policy Simulation (New) */}
      <Section title="政策模擬：我們該怎麼做？" subtitle="試著組合不同政策，看看能否提升台灣的生存機率" bg="bg-stone-100">
        <div className="mb-8">
          <Recommendations />
        </div>
        <PolicySimulator />
      </Section>

      {/* Conclusion */}
      <Section>
        <div className="bg-stone-900 text-stone-200 p-10 md:p-16 rounded-3xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="serif text-4xl font-bold mb-8 text-white">結語：準備，是為了避免戰爭</h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-10 text-stone-300">
              封鎖對中國而言並非零風險選項。若封鎖失敗或曠日費時，可能導致中國自身的經濟動盪與外交孤立。
              <br/><br/>
              台灣與美國的目標不在於贏得封鎖戰，而在於透過展示<b>「我們能撐得比你想像更久」</b>的能力，
              提高北京的決策成本，從而達到嚇阻的效果。
            </p>
            <div className="inline-block px-6 py-3 border border-stone-600 rounded-full text-sm text-stone-400 hover:bg-stone-800 transition-colors cursor-pointer">
              閱讀完整報告 (CSIS.org)
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-900/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-12">
          <p>本網站為基於 CSIS 2025年7月報告《Lights Out?: Wargaming a Chinese Blockade of Taiwan》製作的互動式導讀。</p>
          <p>內容僅供教育與研究用途。All data derived from CSIS open-source wargame report.</p>
        </div>
      </Section>
    </div>
  );
};

export default App;
