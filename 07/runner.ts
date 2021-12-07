import fs from "fs";
import {
  calculateCorrectOptimalAlignment,
  calculateOptimalAlignment,
} from "./crab-aligner";

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
  let { fuel, position } = calculateOptimalAlignment(crabPositions);

  console.log(`A: Optimal position: ${position}, fuel spent: ${fuel}`);
  ({ fuel, position } = calculateCorrectOptimalAlignment(crabPositions));
  console.log(`B: Correct optimal position: ${position}, fuel spent: ${fuel}`);
}
