/** Build a chat link only when the site operator has supplied an international number. */
export function getWhatsAppUrl(value: string | undefined): string | undefined {
  const number = value?.trim();
  return number && /^[1-9]\d{6,14}$/.test(number) ? `https://wa.me/${number}` : undefined;
}
