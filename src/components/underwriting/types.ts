
export interface UnderwritingMetric {
  name: string;
  value?: string | number;
  formula?: string;
  score: number;
  weighting: number;
}

export interface UnderwritingCategory {
  name: string;
  metrics: UnderwritingMetric[];
  totalScore: number;
}

export interface Criterion {
  name: string;
  description: string;
  value: string;
  weight: number;
  score: number;
  min: number;
  max: number;
  step: number;
}

export interface CriteriaGroup {
  name: string;
  description: string;
  weight: number;
  score: number;
  criteria: Criterion[];
}
