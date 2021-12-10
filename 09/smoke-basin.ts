import { sum } from "../utils/math";

export type Cave = Array<Array<number>>;

export function findLowPoints(cave: Cave): Array<number> {
  let lowPoints: Array<number> = [];

  cave.forEach((row, y) => {
    row.forEach((height, x) => {
      if (y > 0 && cave[y - 1][x] <= height) {
        return;
      }

      if (y < cave.length - 1 && cave[y + 1][x] <= height) {
        return;
      }

      if (x > 0 && cave[y][x - 1] <= height) {
        return;
      }

      if (x < row.length - 1 && cave[y][x + 1] <= height) {
        return;
      }

      lowPoints.push(height);
    });
  });
  return lowPoints;
}

export function calculateRiskLevel(lowPoints: Array<number>): number {
  return sum(lowPoints.map((n) => n + 1));
}
