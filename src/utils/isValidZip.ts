export function isValidZip(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, "");

  return /^\d{8}$/.test(cleaned);
}
