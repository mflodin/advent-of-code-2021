import { pointToString } from "./runner";

export type Point = { x: number; y: number };
export type EndPointPair = { start: Point; end: Point };
export type Grid = Map<string, number>;

export function plotHorizontalAndVerticalLines(
  endpoints: Array<EndPointPair>
): Grid {
  let grid: Grid = new Map();
  const horizontalLines = endpoints.filter(
    (line) => line.start.y === line.end.y
  );

  horizontalLines.forEach((line) => {
    let direction = line.start.x < line.end.x ? 1 : -1;
    const y = line.start.y;

    for (let i = line.start.x; i !== line.end.x + direction; i += direction) {
      const key = pointToString({ x: i, y });
      const previousValue = grid.get(key) ?? 0;
      grid.set(key, previousValue + 1);
    }
  });

  const verticalLines = endpoints.filter((line) => line.start.x === line.end.x);
  verticalLines.forEach((line) => {
    let direction = line.start.y < line.end.y ? 1 : -1;
    const x = line.start.x;

    for (let i = line.start.y; i !== line.end.y + direction; i += direction) {
      const key = pointToString({ x, y: i });
      const previousValue = grid.get(key) ?? 0;
      grid.set(key, previousValue + 1);
    }
  });

  return grid;
}

export function findOverlappingLines(grid: Grid): number {
  return Array.from(grid.values()).filter((p) => p > 1).length;
}
