export const generateLabelId = (label: string): string => {
  const baseId = label
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const suffix = Math.floor(Math.random() * 10000);
  return `${baseId}-${suffix}`;
};
