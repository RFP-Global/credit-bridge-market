
export interface UnderwritingMetric {
  name: string;
  value?: string | number;
  formula?: string;
  score: number;
  weighting: number;
  description?: string;
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
  preferredMin?: number;
  preferredMax?: number;
  unit?: string;
  actualMin?: number;
  actualMax?: number;
  actualValue?: number;
  actualUnit?: string;
  scoreMapping?: ScoreRange[];
  useRangeSlider?: boolean; // Added this property
}

export interface ScoreRange {
  min: number;
  max: number;
  score: number;
}

export interface CriteriaGroup {
  name: string;
  description: string;
  weight: number;
  score: number;
  criteria: Criterion[];
}

export interface ScoreThreshold {
  threshold: number;
  color: string;
}
