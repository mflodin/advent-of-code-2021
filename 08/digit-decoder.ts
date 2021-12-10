export function countDistinctNumbers(digitCodes: Array<string>): number {
  return digitCodes.filter((code) => [2, 3, 4, 7].includes(code.length)).length;
}
