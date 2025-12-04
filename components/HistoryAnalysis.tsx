
import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, LabelList } from 'recharts';
import { airliftComparison } from '../data';
import { BookOpen, Plane, Scale } from 'lucide-react';

const HistoryAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'legal'>('history');

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center ${
            activeTab === 'history' ? 'bg-stone-50 text-blue-900 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <BookOpen size={16} className="mr-2" /> 歷史與替代方案
        </button>
        <button 
          onClick={() => setActiveTab('legal')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center ${
            activeTab === 'legal' ? 'bg-stone-50 text-red-900 border-b-2 border-red-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Scale size={16} className="mr-2" /> 法律戰：封鎖 vs. 隔離
        </button>
      </div>

      <div className="p-6 md:p-10">
        {activeTab === 'history' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="serif text-xl font-bold text-gray-900 mb-4">歷史教訓：時間是關鍵</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  歷史上的封鎖（如二戰時期盟軍對德國、日本的封鎖）通常需要數年才能生效。
                  然而，CSIS 報告指出，現代精準打擊與台灣對能源的高度依賴，壓縮了這條時間線。
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-900 text-sm mb-1">為什麼「柏林空運」模式不可行？</h4>
                  <p className="text-xs text-blue-800">
                    許多人寄望於空運來突破封鎖。但數據顯示，台灣的需求量遠超歷史上任何空運行動的極限。
                    空運僅能運送糧食與藥品，無法運送維持經濟所需的煤炭與天然氣。
                  </p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={airliftComparison} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="scenario" type="category" width={100} tick={{fontSize: 10}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="tonsPerDay" name="每日噸數" radius={[0, 4, 4, 0]}>
                      {airliftComparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#ef4444' : '#94a3b8'} />
                      ))}
                      <LabelList dataKey="tonsPerDay" position="right" formatter={(val: number) => val.toLocaleString() + ' 噸/日'} fontSize={10} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-xs text-gray-400 mt-2">每日物資需求/運量對比 (Tons/Day)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="serif text-xl font-bold text-gray-900 mb-2">名詞定義的戰爭</h3>
              <p className="text-gray-600 text-sm">
                中國極可能避免使用「封鎖」(Blockade) 一詞，因為這是國際法上的戰爭行為。
                相反，他們會使用「隔離」(Quarantine) 或「執法」來模糊焦點。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-stone-200 rounded-xl p-6 bg-stone-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-700">中國論述：隔離/執法</h4>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">灰色地帶</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start"><span className="mr-2 text-red-500">•</span> 依據國內法（如海警法、反分裂法）執行。</li>
                  <li className="flex items-start"><span className="mr-2 text-red-500">•</span> 聲稱台灣為「叛亂省份」，此為內政問題。</li>
                  <li className="flex items-start"><span className="mr-2 text-red-500">•</span> 目標是迫使國際商船因保險費高漲而自動停駛，而非擊沉它們。</li>
                </ul>
              </div>

              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-red-800">實際效應：軍事封鎖</h4>
                  <span className="text-xs bg-red-200 px-2 py-1 rounded text-red-700">戰爭行為</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> 限制所有國家的船隻進出，符合國際法對封鎖的定義。</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> 台灣海峽是國際水域，阻礙航行違反海洋法公約。</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> 若實施布雷或擊沉商船，將立即升級為國際武裝衝突。</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400 mt-4 text-sm text-yellow-800">
              <strong>關鍵 Insight：</strong> 報告指出，美國不應像應對「入侵」那樣應對「封鎖」。反制封鎖需要更多的外交與法律戰準備，而非僅僅是軍事對抗。
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryAnalysis;
