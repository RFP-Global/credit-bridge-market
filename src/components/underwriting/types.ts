
export interface Criterion {
  name: string;
  description: string;
  value: number | string;
  weight: number;
  score: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface CriteriaGroup {
  name: string;
  description: string;
  weight: number;
  criteria: Criterion[];
  score: number;
}
