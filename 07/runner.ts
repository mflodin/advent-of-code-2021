import fs from "fs";
import { calculateOptimalAlignment } from "./crab-aligner";

const INPUT = "07/input.txt";

export function readInput(filename: string) {
  const file = fs.readFileSync(filename);
  const population = file
    .toString()
    .split("\n")
    .filter(Boolean)[0]
    .split(",")
    .map(Number);

  return population;
}

export default function runner() {
  const crabPositions = readInput(INPUT);
  const { fuel, position } = calculateOptimalAlignment(crabPositions);

  console.log(`A: Optimal position: ${position}, fuel spent: ${fuel}`);
}
