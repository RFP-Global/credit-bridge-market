
export interface ScoreRange {
  min: number;
  max: number;
  score: number;
}

export interface Criterion {
  name: string;
  description?: string;
  weight: number;
  score: number;
  minScore?: number;
  maxScore?: number;
  value?: string;
  unit?: string;
  scoreMapping?: ScoreRange[];
  preferredMin?: number;
  preferredMax?: number;
  actualValue?: number;
  actualMin?: number;
  actualMax?: number;
  actualUnit?: string;
}

export interface CriteriaGroup {
  name: string;
  description?: string;
  weight: number;
  score: number;
  criteria: Criterion[];
}

export interface ScoreThreshold {
  value: number;
  label: string;
  color: string;
  background: string;
}

export interface UnderwritingMetric {
  name: string;
  score: number;
  weighting: number;
  description?: string;
  value?: string;
  formula?: string;
}

export interface UnderwritingCategory {
  name: string;
  metrics: UnderwritingMetric[];
  totalScore: number;
}
