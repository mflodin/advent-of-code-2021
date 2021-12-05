import fs from "fs";
import {
  findOverlappingLines,
  plotHorizontalAndVerticalLines,
  plotAllLines,
  Point,
} from "./submarine";
import type { EndPointPair } from "./submarine";

export function readInput(filename: string) {
  const file = fs.readFileSync(filename);
  const arr = file.toString().split("\n").filter(Boolean).map(toEndPointPair);

  return arr;
}

function toEndPointPair(string: string): EndPointPair {
  const [start, end] = string.split(" -> ").map(stringToPoint);
  return { start, end };
}

function stringToPoint(string: string): Point {
  const [x, y] = string.split(",").map(Number);
  return { x, y };
}

export function pointToString(point: Point): string {
  return `${point.x},${point.y}`;
}

export default function runner() {
  const grid = readInput("05/input.txt");
  const verticalAndHorizontalOverlaps = findOverlappingLines(
    plotHorizontalAndVerticalLines(grid)
  );

  console.log(
    `A: Number of overlapping points: ${verticalAndHorizontalOverlaps}`
  );

  const allOverlaps = findOverlappingLines(plotAllLines(grid));

  console.log(`B: Number of overlapping points: ${allOverlaps}`);
}
