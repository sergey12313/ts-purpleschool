export function isSafeNumber(number: unknown): boolean {
  return Number.isSafeInteger(number)
}
