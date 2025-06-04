export const getActiveHelp = (value: number): number => {
  const result = value * (5 / 100);
  return Math.round(result);
};
