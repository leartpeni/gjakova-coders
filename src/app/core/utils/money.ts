/** Formats an amount like "30 €" using a non-breaking space. */
export function eur(amount: number): string {
  return `${amount}\u00A0€`;
}
