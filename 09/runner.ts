import fs from "fs";
import {
  findLowPoints,
  calculateRiskLevel,
  findBasins,
  calculateBasinFactor,
} from "./smoke-basin";
import type { Cave } from "./smoke-basin";

const INPUT = "09/input.txt";

export function readInput(filename: string): Cave {
  const file = fs.readFileSync(filename);
  const lines = file
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("").map(Number));

  return lines;
}

export default function runner() {
  const input = readInput(INPUT);
  const lowPoints = findLowPoints(input);
  const riskLevel = calculateRiskLevel(lowPoints);

  console.log(`A: Risk level: ${riskLevel}`);

  const basins = findBasins(input);
  const basinFactor = calculateBasinFactor(basins);
  console.log(`B: Basin Factor: ${basinFactor}`);
}
