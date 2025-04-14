
/**
 * Rounds a number to the 10th decimal place
 * @param value The number to round
 * @returns Number rounded to 10th decimal place
 */
export const roundToTenth = (value: number | undefined): number => {
  if (value === undefined) return 0;
  return parseFloat(value.toFixed(1));
};
