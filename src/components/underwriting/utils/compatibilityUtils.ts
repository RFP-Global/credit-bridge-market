
export const getCompatibilityScore = (score: number) => {
  if (score >= 80) return { label: "Strong Match", color: "bg-green-500/20 text-green-500 border-green-500/20" };
  if (score >= 60) return { label: "Good Match", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" };
  if (score >= 40) return { label: "Moderate Match", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" };
  return { label: "Poor Match", color: "bg-red-500/20 text-red-500 border-red-500/20" };
};

