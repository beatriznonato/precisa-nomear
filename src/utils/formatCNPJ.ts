export function formatCNPJ(value: string) {
  const digits = value.replace(/\D/g, "");

  let formatted = digits;

  if (digits.length > 2) {
    formatted = digits.slice(0, 2) + "." + digits.slice(2);
  }
  if (digits.length > 5) {
    formatted = formatted.slice(0, 6) + "." + digits.slice(5);
  }
  if (digits.length > 8) {
    formatted = formatted.slice(0, 10) + "/" + digits.slice(8);
  }
  if (digits.length > 12) {
    formatted = formatted.slice(0, 15) + "-" + digits.slice(12, 14);
  }

  return formatted.slice(0, 18);
}
