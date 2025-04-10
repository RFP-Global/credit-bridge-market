
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
  name: string;
  description: string;
  value: string;
  weight: number;
  minScore: number;
  maxScore: number;
  min: number;
  max: number;
  step: number;
  preferredMin?: number;
  preferredMax?: number;
  unit?: string;
  actualMin?: number;
  actualMax?: number;
  actualValue?: number;
  actualUnit?: string;
  scoreMapping?: ScoreRange[];
  enabled: boolean;
}

export interface ScoreRange {
  min: number;
  max: number;
  score: number;
  riskLevel?: string;
}

export interface CriteriaGroup {
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
