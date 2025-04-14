
/**
 * Rounds a number to a whole number
 * @param value The number to round
 * @returns Rounded whole number
 */
export const roundToTenth = (value: number | undefined): number => {
  if (value === undefined) return 0;
  return Math.round(value * 10) / 10; // Round to 1 decimal place
};
