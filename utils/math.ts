export function sum(arr: Array<number>) {
  return arr.reduce((acc, curr) => acc + curr);
}

export function numericalSort(a: number, b: number): number {
  return a - b;
}
