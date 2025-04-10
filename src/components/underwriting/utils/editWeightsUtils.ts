
import { CriteriaGroup } from "../types";
import { toast } from "sonner";

/**
 * Calculates the total of all edit weights in the edit form
 */
export const calculateEditAllTotal = (editAllValues: { [key: number]: string }) => {
  return Object.values(editAllValues).reduce((sum, value) => {
    const numValue = parseInt(value, 10);
    return sum + (isNaN(numValue) ? 0 : numValue);
  }, 0);
};

/**
 * Validates edit weights input and shows toast messages for errors
 */
export const validateEditWeights = (editAllValues: { [key: number]: string }): boolean => {
  const editAllTotal = calculateEditAllTotal(editAllValues);
  
  if (editAllTotal !== 100) {
    toast.error("Total weights must sum to 100%");
    return false;
  }
  
  // Check if all values are valid (positive numbers)
  const hasInvalidValues = Object.values(editAllValues).some(value => {
    const numValue = parseInt(value, 10);
    return isNaN(numValue) || numValue < 1;
  });
  
  if (hasInvalidValues) {
    toast.error("All weights must be positive values");
    return false;
  }
  
  return true;
};
