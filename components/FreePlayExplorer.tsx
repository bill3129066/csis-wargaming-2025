
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { freePlayGames } from '../data';
import { Play, TrendingUp, Handshake, Skull, AlertOctagon } from 'lucide-react';

const FreePlayExplorer: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<number>(1);

  const selectedGame = freePlayGames.find(g => g.id === selectedGameId) || freePlayGames[0];

  return (
    <div className="w-full bg-stone-900 text-stone-100 rounded-2xl overflow-hidden shadow-xl border border-stone-700">
      <div className="p-6 md:p-8 bg-stone-800 border-b border-stone-700">
        <h3 className="serif text-2xl font-bold mb-2">自由兵推 (Free Play): 當人類介入</h3>
        <p className="text-stone-400 text-sm">
          電腦模型是線性的，但人類決策是混亂的。CSIS 邀請專家進行了5場無腳本兵推，結果顯示「升級」幾乎無法避免。
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar / Tabs */}
        <div className="w-full md:w-1/3 bg-stone-900 border-r border-stone-800 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          {freePlayGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGameId(game.id)}
              className={`flex-shrink-0 p-4 text-left border-b border-stone-800 transition-colors hover:bg-stone-800/50 ${
                selectedGameId === game.id ? 'bg-stone-800 border-l-4 border-l-red-500' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-stone-200">{game.title}</span>
                {game.outcome === 'Escalation' && <TrendingUp size={14} className="text-red-500" />}
                {game.outcome === 'Off-Ramp' && <Handshake size={14} className="text-green-500" />}
                {game.outcome === 'Stalemate' && <AlertOctagon size={14} className="text-yellow-500" />}
              </div>
              <div className="text-xs text-stone-500 truncate">{game.trigger}</div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-6 md:p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGame.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mr-4 ${
                  selectedGame.outcome === 'Escalation' ? 'bg-red-900/50 text-red-400' :
                  selectedGame.outcome === 'Off-Ramp' ? 'bg-green-900/50 text-green-400' :
                  'bg-yellow-900/50 text-yellow-400'
                }`}>
                  結果: {selectedGame.outcome}
                </div>
                <h4 className="text-2xl font-bold">{selectedGame.trigger}</h4>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800/50 p-4 rounded-lg border border-stone-700">
                  <h5 className="text-sm font-bold text-stone-400 uppercase mb-2 flex items-center">
                    <Play size={14} className="mr-2" /> 情境敘述
                  </h5>
                  <p className="text-stone-300 leading-relaxed text-sm">
                    {selectedGame.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <div className="text-xs text-stone-500 mb-1">聯軍傷亡 (人)</div>
                    <div className="text-xl font-mono text-blue-400 font-bold">{selectedGame.casualties.coalition.toLocaleString()}</div>
                  </div>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <div className="text-xs text-stone-500 mb-1">共軍傷亡 (人)</div>
                    <div className="text-xl font-mono text-red-400 font-bold">{selectedGame.casualties.china.toLocaleString()}</div>
                  </div>
                </div>

                <div className="border-l-2 border-yellow-500 pl-4 py-1">
                  <h5 className="text-yellow-500 font-bold text-sm mb-1">Strategic Insight</h5>
                  <p className="text-stone-400 text-sm italic">"{selectedGame.insight}"</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FreePlayExplorer;
