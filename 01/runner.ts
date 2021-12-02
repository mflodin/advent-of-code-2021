import fs from "fs";

export function readInput(filename: string): Array<number> {
  const file = fs.readFileSync(filename);
  const arr = file.toString().split("\n").filter(Boolean).map(Number);
  return arr;
}

import { depthIncrease } from "./sonar";

const input = readInput("01/input.txt");

console.log(`Depth increase: ${depthIncrease(input)}`);
