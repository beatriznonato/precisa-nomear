export function isValidPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  // Deve ter exatamente 11 dígitos: 2 do DDD + 9 do número
  if (digits.length !== 11) return false;

  // O primeiro dígito do número (depois do DDD) deve ser 9
  if (digits[2] !== "9") return false;

  // Todos os dígitos iguais não são válidos (ex: 11111111111)
  if (/^(\d)\1+$/.test(digits)) return false;

  return true;
}
