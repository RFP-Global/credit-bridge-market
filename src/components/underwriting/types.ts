
export interface UnderwritingMetric {
  name: string;
  value?: string | number;
  formula?: string;
  minScore: number;
  maxScore: number;
  weighting: number;
  description?: string;
}

export interface UnderwritingCategory {
  name: string;
  metrics: UnderwritingMetric[];
  minTotalScore: number;
  maxTotalScore: number;
}

export interface Criterion {
  id?: string;
  name: string;
  description: string;
  value: string;
  weight: number;
  minScore: number;
  maxScore: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  enabled: boolean;
  scoreMapping: ScoreRange[];
  // Added properties to fix TypeScript errors
  preferredMin?: number;
  preferredMax?: number;
  actualMin?: number;
  actualMax?: number;
  actualValue?: number;
  actualUnit?: string;
  subcriteria?: {
    name: string;
    description: string;
    target: string;
    weight: number;
  }[];
}

export interface ScoreRange {
  min: number;
  max: number;
  score: number;
  riskLevel?: string;
}

export interface CriteriaGroup {
  id?: string;  // Also added optional id property here for consistency
  name: string;
  description: string;
  weight: number;
  minScore: number;
  maxScore: number;
  criteria: Criterion[];
}

export interface ScoreThreshold {
  threshold: number;
  color: string;
}
