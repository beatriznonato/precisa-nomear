export const getPercentage = (value: number): number => {
  const result = value * (7 / 100);
  return Math.round(result);
};
