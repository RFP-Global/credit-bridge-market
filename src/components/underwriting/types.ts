
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
