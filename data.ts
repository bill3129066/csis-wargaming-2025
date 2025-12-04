
import { ChinaEscalation, CoalitionEscalation, ScenarioResult, EnergyDataPoint, ImpactCategory, MapFeature, TimelineEvent, AirliftData, GdpComparisonData, PolicyOption, FreePlayGame, SimulationModule } from './types';

// Escalation Matrix Descriptions
export const chinaLevels = [
  { id: ChinaEscalation.Boarding, label: '登船檢查 (1)', desc: '海警與民兵強制登船 (Boarding)' },
  { id: ChinaEscalation.SubsMines, label: '潛艇與水雷 (2)', desc: '使用潛艇與水雷封鎖 (Subs & Mines)' },
  { id: ChinaEscalation.OffshoreKinetic, label: '境外打擊 (3)', desc: '攻擊排他區內商船/護航艦 (Offshore Kinetic)' },
  { id: ChinaEscalation.WiderWar, label: '全面戰爭 (4)', desc: '打擊台灣本島與美日基地 (Wider War)' },
];

export const coalitionLevels = [
  { id: CoalitionEscalation.TaiwanConstrained, label: '台灣受限 (1)', desc: '僅在領海內防禦 (Constrained)' },
  { id: CoalitionEscalation.TaiwanAssertive, label: '台灣反擊 (2)', desc: '主動攻擊封鎖兵力 (Assertive)' },
  { id: CoalitionEscalation.USConstrained, label: '美國受限 (3)', desc: '美軍介入護航，限制交戰區 (US Constrained)' },
  { id: CoalitionEscalation.WiderWar, label: '全面介入 (4)', desc: '攻擊中國本土 (Wider War)' },
];

// Matrix Results
export const getScenarioData = (china: ChinaEscalation, coalition: CoalitionEscalation): ScenarioResult => {
  const key = `${china}-${coalition}`;
  
  // Default data for interpolated/uninteresting cells
  let result: ScenarioResult = {
    id: key,
    name: "過渡/不對稱情境",
    engName: "Transitional Scenario",
    description: "此為力量極度不平衡或報告未詳細探討的中間情境。報告指出，這些情境通常會迅速向對角線（力量對等）收斂。",
    electricity: 50,
    imports: 20,
    casualties_coalition: 500,
    casualties_china: 500,
    merchantLosses: 100,
    summary: "資料推估：隨著局勢升級，台灣物資將快速短缺，傷亡取決於美軍介入程度。",
    tacticalInsight: "報告指出，任何封鎖情境都會產生難以控制的升級壓力。"
  };

  // Table 5.2
  if (china === 1 && coalition === 1) {
    result = {
      id: "1x1",
      name: "貓捉老鼠",
      engName: "1x1: Cat and Mouse",
      description: "中國使用海警/民兵登檢，台灣僅由海巡在領海應對。這是最低強度的對抗。",
      electricity: 29, // Worst Week
      imports: 15, // Worst Week
      casualties_coalition: 0,
      casualties_china: 0,
      merchantLosses: 448, 
      summary: "雖然沒有開火，但封鎖極為有效。僅13%的商船成功抵達。商船因保險失效停駛，台灣能源庫存耗盡後經濟崩潰。",
      tacticalInsight: "惡劣天氣反而有利於台灣，因為會阻礙中國的小艇登檢行動（VBSS）。但總體運量仍遠不足需求。"
    };
  } 
  // Table 5.4
  else if (china === 1 && coalition === 2) {
    result = {
      id: "1x2",
      name: "單方面屠殺",
      engName: "1x2: Imbalance",
      description: "台灣動用海空軍攻擊中國海警船，而中國僅使用非軍事力量。",
      electricity: 61, // Worst Week
      imports: 16, // Worst Week
      casualties_coalition: 272,
      casualties_china: 3663, 
      merchantLosses: 7,
      summary: "台灣海空軍迅速摧毀數百艘中國海警船。商船抵達率隨之回升。但這種單方面屠殺極可能給中國藉口升級到全面戰爭。",
      tacticalInsight: "雖然台灣在戰術上獲勝，但擊沉大量中國執法船隻將導致政治上的災難性升級。"
    };
  }
  // Table 5.5
  else if (china === 2 && coalition === 1) {
    result = {
      id: "2x1",
      name: "半隱晦封鎖",
      engName: "2x1: Semi-deniable Blockade",
      description: "中國使用潛艇發射魚雷與佈雷，台灣受限無法有效反潛。",
      electricity: 27, // Worst Week
      imports: 0, // Worst Week
      casualties_coalition: 1958, 
      casualties_china: 0,
      merchantLosses: 475,
      summary: "單方面的屠殺。中國潛艇在第一個月就擊沉了59%的台灣商船。台灣經濟在8週內崩潰。商船船員拒絕出航。",
      tacticalInsight: "這類似於2014克里米亞模式，中國試圖維持某種程度的「否認性」(deniability)，避免美軍介入。"
    };
  }
  // Table 5.6
  else if (china === 2 && coalition === 2) {
    result = {
      id: "2x2",
      name: "消耗戰",
      engName: "2x2: Attrition",
      description: "台灣全力反潛，但無美軍協助。中國潛艇與水雷對抗台灣海軍。",
      electricity: 26, // Worst Week
      imports: 2, // Worst Week
      casualties_coalition: 2256,
      casualties_china: 208,
      merchantLosses: 354,
      summary: "台灣反潛彈藥在兩週內耗盡。雖然擊沉了幾艘中國老舊潛艇，但無法阻止商船被大量擊沉。傷亡比約為11:1。",
      tacticalInsight: "即使台灣採取「烏克蘭模式」（獲得武器援助但無派兵），對反潛戰的幫助也微乎其微。"
    };
  } 
  // Table 5.9
  else if (china === 2 && coalition === 3) {
    result = {
      id: "2x3",
      name: "美軍介入反潛",
      engName: "2x3: ASW Victory",
      description: "美軍P-8與核潛艇協助獵殺共軍潛艇，但不攻擊中國本土。",
      electricity: 69, // Worst Week
      imports: 2, // Worst Week
      casualties_coalition: 1070, // US 815 + TW 255
      casualties_china: 1206,
      merchantLosses: 7,
      summary: "美軍介入迅速扭轉局勢。中國潛艇威脅在一個月內被消除。電力生產在第7週後恢復至100%。",
      tacticalInsight: "台灣東部海域範圍較小（約2萬平方公里），且美軍在日本有基地，沒有二戰大西洋的「空中掩護缺口」，反潛效率極高。"
    };
  }
  // Table 5.10
  else if (china === 3 && coalition === 2) {
    result = {
      id: "3x2",
      name: "台灣孤軍奮戰",
      engName: "3x2: Overwhelmed",
      description: "中國動用海空軍在境外打擊，台灣獨自應對。",
      electricity: 69, // Worst Week
      imports: 2, // Worst Week
      casualties_coalition: 4411,
      casualties_china: 217,
      merchantLosses: 7, 
      summary: "台灣海軍在試圖護航時被殲滅。為保存戰力，台灣隨後停止護航，導致封鎖完全生效。這不是台灣能獨自應對的情境。",
      tacticalInsight: "台灣的大型水面艦艇防空飛彈數量（每支艦隊約75枚中遠程飛彈）遠不足以應對中國的飽和攻擊。"
    };
  }
  // Table 5.11
  else if (china === 3 && coalition === 3) {
    result = {
      id: "3x3",
      name: "鐵籠格鬥 (Cage Fight)",
      engName: "3x3: The Cage Fight",
      description: "雙方主力在台灣周邊海空域激戰，但不打擊本土。",
      electricity: 35, // Worst Week
      imports: 0, // Worst Week
      casualties_coalition: 4129, // US 3090 + TW 1039
      casualties_china: 3147,
      merchantLosses: 106,
      summary: "極為血腥的護航戰。美軍與台灣損失約25艘大型軍艦，但成功維持了生命線，至第13週恢復經濟運轉。",
      tacticalInsight: "中國空軍損失慘重（684架戰機）。美軍依靠日本基地至關重要；若日本不准使用基地，美軍將難以維持空優。"
    };
  }
  // Table 5.18
  else if (china === 4 && coalition === 4) {
    result = {
      id: "4x4",
      name: "全面戰爭",
      engName: "4x4: Wider War",
      description: "無限制攻擊。中國攻擊美日基地與台灣電網，美軍攻擊中國沿海。",
      electricity: 14, // Worst Week
      imports: 13, // Worst Week
      casualties_coalition: 23689, // US 13306 + TW 7666 + JP 2717
      casualties_china: 13675,
      merchantLosses: 49, // Base case
      summary: "美軍損失兩艘航母。中國海軍被全殲。台灣雖然獲得物資，但電網被炸毀，導致電力在最差週僅剩14%。",
      tacticalInsight: "即便物資運抵，台灣的能源基礎設施（電廠、變電所）因遭導彈攻擊而癱瘓，是此情境的最大弱點。"
    };
  }
  // Table 5.16
  else if (china === 4 && coalition === 2) {
     result = {
      id: "4x2",
      name: "毀滅性打擊",
      engName: "4x2: Devastation",
      description: "中國全面攻擊，台灣孤軍奮戰。",
      electricity: 24, // Worst Week
      imports: 0, // Worst Week
      casualties_coalition: 3168, // TW 2913 + US 255 (US sent convoy week 2/4 then stopped)
      casualties_china: 255,
      merchantLosses: 47,
      summary: "台灣海空軍在初期即被摧毀。能源與物資斷絕，經濟崩潰。美國曾試圖護航但失敗撤回。",
      tacticalInsight: "中國甚至不需要攻擊電網，光是封鎖就足以讓台灣能源耗盡。"
    };
  }

  return result;
};

// Energy Timeline Data (Page 86 Zero Baseline)
export const energyData: EnergyDataPoint[] = Array.from({ length: 21 }, (_, i) => {
  const week = i;
  
  // Base: Week 3 Gas out (73%), Week 9 Coal out (24%), Week 21 Oil out (17%)
  let base = 100;
  if (week >= 3) base = 73;
  if (week >= 9) base = 24;
  if (week >= 20) base = 17;

  // Prepared: Delays severe reductions to Week 12, Crisis to Week 18
  let prepared = 100;
  if (week >= 12) prepared = 50; 
  if (week >= 18) prepared = 33;

  // Green: Hits severe (18% reference in text) in Week 3, Crisis in Week 7
  let green = 100;
  if (week >= 3) green = 45; // Interim drop
  if (week >= 8) green = 18; // Text says "by week 8... down to 18 percent"
  
  let annotation = "";
  if (week === 3) annotation = "天然氣耗盡";
  if (week === 9) annotation = "燃煤耗盡";
  if (week === 20) annotation = "石油耗盡";

  return { week, base, prepared, green, annotation };
});

// Table 4.5
export const economicImpacts: ImpactCategory[] = [
  { sector: "晶片製造 (TSMC)", impact80: "正常運作", impact60: "正常運作 (優先供電)", impact40: "減產至56% (優先供電)", impact20: "完全停產 (僅剩8%)" },
  { sector: "民生用電", impact80: "自願節電", impact60: "分區限電", impact40: "每日供電12小時", impact20: "每日供電10小時" },
  { sector: "鋼鐵工業", impact80: "減產27%", impact60: "減產40%", impact40: "僅剩7%產能", impact20: "完全停產" },
  { sector: "食品供應", impact80: "充足", impact60: "種類減少", impact40: "配給制", impact20: "依靠庫存(可撐9個月)" },
];

export const mapFeatures: MapFeature[] = [
  {
    id: "exclusion-zone",
    label: "中國宣告排他區 (Exclusion Zone)",
    type: "zone",
    visibleIn: [1, 2, 3, 4],
    description: "中國劃設的禁航區，所有進入船隻將被攔截。範圍大致重疊台灣防空識別區。"
  },
  {
    id: "convoy-route",
    label: "與那國-花蓮 護航走廊",
    type: "route",
    visibleIn: [3, 4],
    description: "僅54海哩(100公里)的短程衝刺。美日台軍艦在此狹窄水域與共軍進行激烈的「鐵籠格鬥」。"
  },
  {
    id: "port-japan",
    label: "日本轉運港 (Transshipment)",
    type: "point",
    coordinates: { x: 75, y: 15 },
    visibleIn: [1, 2, 3, 4],
    description: "遠洋商船不敢直航台灣，物資需在日本港口卸貨，轉由「穿梭船隊」運入台灣。"
  },
  {
    id: "energy-target",
    label: "能源接收站/電網",
    type: "point",
    coordinates: { x: 45, y: 55 },
    visibleIn: [4],
    description: "在全面戰爭情境下，共軍直接轟炸電廠與變電所，導致即使物資運抵也無法發電。"
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2005",
    title: "反分裂國家法通過",
    description: "北京通過法律，授權在「和平統一的可能性完全喪失」時使用非和平手段。",
    insight: "這為封鎖提供了國內法基礎，將其定性為「內政」而非國際戰爭。",
    iconType: "political"
  },
  {
    year: "2022",
    title: "裴洛西訪台與圍台軍演",
    description: "解放軍發射導彈飛越台灣上空，並在台灣周邊六個區域進行實彈演習。",
    insight: "這次軍演被視為「隔離」或「封鎖」的預演，展示了PLA切斷台灣對外聯繫的能力。",
    iconType: "military"
  },
  {
    year: "2025",
    title: "台海緊張局勢升級",
    description: "報告設定的背景：美中關係因台灣問題惡化。美國防部長Hegseth重申對台承諾，但Trump維持戰略模糊。",
    insight: "戰略模糊可能導致北京誤判，認為可以透過低強度的「隔離」來迫使台灣屈服而不引發美軍介入。",
    iconType: "political"
  },
  {
    year: "2028",
    title: "情境開始：決定封鎖",
    description: "習近平決定採取行動。不同於高風險的入侵，他選擇「聯合封鎖戰役」作為脅迫手段。",
    insight: "封鎖並非低風險選項。報告強調，封鎖極易失控，且對全球經濟的打擊可能迫使國際社會強烈介入。",
    iconType: "military"
  }
];

export const airliftComparison: AirliftData[] = [
  {
    scenario: "1948 柏林空運",
    tonsPerDay: 4500,
    population: 2.8,
    description: "歷史上最成功的空運。盟軍在蘇聯不干擾的情況下，維持了城市的最低生存需求。"
  },
  {
    scenario: "2028 台灣需求 (最低)",
    tonsPerDay: 43070,
    population: 23.6,
    description: "包含能源、糧食與醫療物資的最低生存需求。需求量是柏林的近10倍。"
  },
  {
    scenario: "美軍空運能力 (推估)",
    tonsPerDay: 34400, // 860 sorties * 40 tons
    population: 0,
    description: "即便動用所有C-17機隊並獲得日本基地支持，仍僅能滿足約17%的總體需求(主要是無法運送天然氣與煤炭)。"
  }
];

export const globalGdpImpact: GdpComparisonData[] = [
  { region: "俄羅斯 (2022)", gdp: 2.4, role: "主要出口能源/糧食" },
  { region: "烏克蘭 (2021)", gdp: 0.2, role: "主要出口糧食" },
  { region: "台灣 (2024)", gdp: 0.8, role: "全球供應鏈核心 (晶片)" },
  { region: "中國 (2024)", gdp: 18.8, role: "世界工廠" }
];

export const simulationModules: SimulationModule[] = [
  {
    id: 1,
    title: "模組 1: 商船可用性",
    question: "有多少船願意冒死運補？",
    method: "分析全球航運數據與徵用法律",
    keyFinding: "商業航運將立即停駛。台灣必須依靠徵用本國船隻（包含掛方便旗的權宜船）。LNG船隻數量嚴重不足是最大瓶頸。"
  },
  {
    id: 2,
    title: "模組 2: 貨物通過率",
    question: "多少貨物能穿透封鎖？",
    method: "ISR偵測模型 + 攔截機率 + 護航戰損模擬",
    keyFinding: "在沒有美軍介入的情況下，共軍潛艇能擊沉約50%的商船。美軍介入護航後，損耗率可降至3-5%，但需付出軍艦損失的代價。"
  },
  {
    id: 3,
    title: "模組 3: 物質與經濟影響",
    question: "物資短缺如何摧毀經濟？",
    method: "能源投入產出模型 + 產業優先級分配",
    keyFinding: "電力是關鍵變數。當電力降至40%以下，晶片製造將被迫大幅減產，對全球造成毀滅性打擊。糧食反而相對容易解決。"
  }
];

export const freePlayGames: FreePlayGame[] = [
  {
    id: 1,
    title: "Game 1: 螺旋升級",
    outcome: "Escalation",
    trigger: "中國率先發動大規模火力打擊",
    insight: "當一方試圖用「震懾」戰術時，往往引發對方更強烈的反擊。此局中美雙方都攻擊了對方本土基地，傷亡慘重。",
    description: "中國摧毀了台灣海空軍。美軍回應並攻擊中國機場。中國隨即攻擊關島與日本美軍基地。戰爭全面爆發。",
    casualties: { coalition: 20634, china: 3620 }
  },
  {
    id: 2,
    title: "Game 2: 誤判信號",
    outcome: "Escalation",
    trigger: "美台護航艦隊與共軍發生小規模衝突",
    insight: "雙方都試圖發出「克制」的信號，但在戰爭迷霧中被對方解讀為「升級」。",
    description: "小規模海戰迅速升級。中國對台發動導彈攻擊並登陸澎湖。美日台聯軍雖傷亡慘重，但維持了台灣的進口生命線。",
    casualties: { coalition: 6612, china: 1122 }
  },
  {
    id: 3,
    title: "Game 3: 經濟絞索",
    outcome: "Stalemate",
    trigger: "美軍拒絕護航，改採遠程封鎖",
    insight: "美國試圖避免熱戰，改用經濟制裁與麻六甲海峽封鎖。這變成了一場意志力的比拼。",
    description: "中國海警與台灣軍方在台海激戰。美國扣押中國海外資產並切斷其中東能源。台灣經濟在窒息中掙扎，戰爭變成持久的經濟消耗戰。",
    casualties: { coalition: 68, china: 500 }
  },
  {
    id: 4,
    title: "Game 4: 懸崖勒馬",
    outcome: "Off-Ramp",
    trigger: "雙方意識到代價過高",
    insight: "在激烈的海戰後，雙方尋求下台階。這顯示了「政治解決」在封鎖戰中的核心地位。",
    description: "經歷初期激戰後，中國提議停火，條件是台灣總統下台且美軍撤出。雖然條件苛刻，但開啟了談判窗口，避免了全面毀滅。",
    casualties: { coalition: 438, china: 503 } // US 281 + TW 65 + JP 92 = 438
  },
  {
    id: 5,
    title: "Game 5: 外交折衷",
    outcome: "Off-Ramp",
    trigger: "日本積極介入調停",
    insight: "第三國（日本）的積極角色為雙方提供了保全面子的機制。",
    description: "中國佔領金門馬祖並佈雷。日本組織人道救援船隊。最終達成協議：物資由中日聯合護航進入台灣，變相承認了中國的「執法權」但保住了台灣生存。",
    casualties: { coalition: 264, china: 116 } // US 48 + TW 121 + JP 95 = 264
  }
];

export const policyOptions: PolicyOption[] = [
  {
    id: "merchant_prep",
    category: "merchant",
    title: "徵用台資外籍船",
    description: "立法強制徵用所有台灣人擁有的商船（含方便旗船）。",
    impact: "商船數量增加 3 倍，大幅分散風險。",
    enduranceBonus: 20,
    insight: "這是最關鍵的準備。沒有船，有再多護航艦也沒用。"
  },
  {
    id: "lng_fleet",
    category: "merchant",
    title: "擴建 LNG 船隊",
    description: "台美政府簽約預留 LNG 運輸船。",
    impact: "確保天然氣供應不中斷。",
    enduranceBonus: 15,
    insight: "天然氣是台灣能源的阿基里斯腱，且 LNG 船無法臨時徵用。"
  },
  {
    id: "harden_grid",
    category: "energy",
    title: "電網抗炸加固",
    description: "分散變電站、增加備用零件與搶修能力。",
    impact: "共軍導彈破壞效果減半，修復速度加倍。",
    enduranceBonus: 30,
    insight: "模擬顯示，加固後的電網能在轟炸下維持 75% 產能，未加固則歸零。"
  },
  {
    id: "nuclear_reserve",
    category: "energy",
    title: "保留核能發電",
    description: "延役核電廠，不完全依賴進口能源。",
    impact: "提供 6% 的穩定基載電力，不受封鎖影響。",
    enduranceBonus: 10,
    insight: "雖然佔比不高，但在全面斷氣斷油時，這是維持醫院與指揮中心的最後防線。"
  },
  {
    id: "us_convoy",
    category: "us_aid",
    title: "美軍重啟護航訓練",
    description: "美軍恢復冷戰後的護航演習與準則。",
    impact: "護航效率提升，商船損失率降低 50%。",
    enduranceBonus: 15,
    insight: "美軍已 30 年未執行大規模護航，需重新學習如何保護慢速商船。"
  },
  {
    id: "japan_access",
    category: "us_aid",
    title: "日本基地與轉運",
    description: "確保日本允許美軍使用基地與港口轉運。",
    impact: "空優維持的關鍵，縮短運補距離。",
    enduranceBonus: 25,
    insight: "若無日本基地，美軍需從關島出擊，戰力將大打折扣。"
  }
];
