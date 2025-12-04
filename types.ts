
export enum ChinaEscalation {
  Boarding = 1,
  SubsMines = 2,
  OffshoreKinetic = 3,
  WiderWar = 4,
}

export enum CoalitionEscalation {
  TaiwanConstrained = 1,
  TaiwanAssertive = 2,
  USConstrained = 3,
  WiderWar = 4,
}

export interface ScenarioResult {
  id: string;
  name: string;
  engName: string;
  description: string;
  electricity: number; // Percentage of demand met at worst week
  imports: number; // Percentage of pre-war imports at worst week
  casualties_coalition: number; // Estimated total casualties
  casualties_china: number;
  merchantLosses: number; // Number of ships lost
  summary: string;
  tacticalInsight: string; // Specific tactical detail from the report
}

export interface EnergyDataPoint {
  week: number;
  base: number;
  prepared: number;
  green: number;
  annotation?: string;
}

export interface ImpactCategory {
  sector: string;
  impact80: string; // Impact at 80% electricity
  impact60: string;
  impact40: string;
  impact20: string;
}

export interface MapFeature {
  id: string;
  label: string;
  type: 'zone' | 'route' | 'point';
  visibleIn: number[]; // China escalation levels where this is relevant
  coordinates?: { x: number; y: number };
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  insight: string;
  iconType: 'political' | 'military' | 'economic';
}

export interface AirliftData {
  scenario: string;
  tonsPerDay: number; // Daily tonnage requirement/capacity
  population: number; // In millions
  description: string;
}

export interface GdpComparisonData {
  region: string;
  gdp: number; // Trillions USD
  role: string;
}

export interface PolicyOption {
  id: string;
  category: 'merchant' | 'energy' | 'us_aid';
  title: string;
  description: string;
  impact: string; // Text description of impact
  enduranceBonus: number; // Abstract score for progress bar
  insight: string; // "Why this works"
}

export interface FreePlayGame {
  id: number;
  title: string;
  outcome: 'Escalation' | 'Off-Ramp' | 'Stalemate';
  description: string;
  trigger: string;
  insight: string;
  casualties: {
    coalition: number;
    china: number;
  };
}

export interface SimulationModule {
  id: number;
  title: string;
  question: string;
  method: string;
  keyFinding: string;
}
