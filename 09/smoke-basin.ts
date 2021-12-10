import { numericalSort, sum } from "../utils/math";

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

export function findBasins(cave: Cave): Array<number> {
  let basins: Array<number> = [];
  const caveMap = cave.map((row) =>
    row.map((height) => ({ height, visited: false }))
  );

  for (let y = 0; y < caveMap.length; y++) {
    for (let x = 0; x < caveMap[y].length; x++) {
      if (caveMap[y][x].height === 9 || caveMap[y][x].visited) {
        continue;
      }

      let basinSize = explore({ start: { x, y }, caveMap });

      // console.log({ x, y, basinSize });
      // console.log(basinSize);
      if (basinSize) {
        basins.push(basinSize);
      }
    }
  }

  // console.log({ basins });
  return basins;
}
type Position = {
  x: number;
  y: number;
};

type Place = {
  height: number;
  visited: boolean;
};

type ExploreInput = {
  start: Position;
  caveMap: Array<Array<Place>>;
  basinSize?: number;
};

function explore({ start, caveMap, basinSize = 0 }: ExploreInput): number {
  const { x, y } = start;

  if (
    caveMap?.[y]?.[x] === undefined ||
    caveMap[y][x].height === 9 ||
    caveMap[y][x].visited
  ) {
    return basinSize;
  }

  // console.log("Visit", x, y);
  caveMap[y][x].visited = true;

  return (
    1 +
    (x < caveMap[y].length - 1
      ? explore({ start: { x: x + 1, y }, caveMap, basinSize })
      : 0) +
    (x > 0 ? explore({ start: { x: x - 1, y }, caveMap, basinSize }) : 0) +
    (y < caveMap.length - 1
      ? explore({ start: { x, y: y + 1 }, caveMap, basinSize })
      : 0) +
    (y > 0 ? explore({ start: { x, y: y - 1 }, caveMap, basinSize }) : 0)
  );
}
export function calculateBasinFactor(basins: Array<number>): number {
  const [a, b, c, ...rest] = [...basins].sort(numericalSort).reverse();
  return a * b * c;
}
