
export const businessStabilityScoreMapping = {
  YearsInOperation: [
    { min: 15.00, max: Number.MAX_VALUE, score: 10 },
    { min: 10.00, max: 15.00, score: 9 },
    { min: 7.00, max: 10.00, score: 8 },
    { min: 5.00, max: 7.00, score: 7 },
    { min: 3.00, max: 5.00, score: 6 },
    { min: 2.00, max: 3.00, score: 5 },
    { min: 1.00, max: 2.00, score: 4 },
    { min: 0.50, max: 1.00, score: 3 },
    { min: 0.25, max: 0.50, score: 2 },
    { min: 0, max: 0.25, score: 1 },
  ],
  
  CustomerConcentration: [
    { min: 0, max: 10, score: 10 },
    { min: 10, max: 15, score: 9 },
    { min: 15, max: 20, score: 8 },
    { min: 20, max: 25, score: 7 },
    { min: 25, max: 30, score: 6 },
    { min: 30, max: 40, score: 5 },
    { min: 40, max: 50, score: 4 },
    { min: 50, max: 60, score: 3 },
    { min: 60, max: 75, score: 2 },
    { min: 75, max: 100, score: 1 },
  ],
  
  CompetitorCount: [
    { min: 0, max: 2, score: 10 },
    { min: 3, max: 5, score: 8 },
    { min: 6, max: 10, score: 6 },
    { min: 11, max: 20, score: 4 },
    { min: 21, max: Number.MAX_VALUE, score: 2 },
  ],
  
  CustomerRetention: [
    { min: 80, max: 100, score: 10 },
    { min: 60, max: 79, score: 8 },
    { min: 40, max: 59, score: 6 },
    { min: 20, max: 39, score: 4 },
    { min: 0, max: 20, score: 2 },
  ],
};

