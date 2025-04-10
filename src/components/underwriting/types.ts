
export interface ScoreRange {
  min: number | null;
  max: number | null;
  score: number;
  description?: string;
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
  actualMinValue?: number;
  actualMaxValue?: number;
  actualMin?: number;
  actualMax?: number;
  actualUnit?: string;
  // Adding min, max, and step for the initialData
  min?: number;
  max?: number;
  step?: number;
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
  threshold?: number; // Adding the threshold property that's used in the code
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
