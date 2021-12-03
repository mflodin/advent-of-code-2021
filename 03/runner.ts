import fs from "fs";
import { calculatePowerConsumption } from "./submarine";

export function readInput(filename: string): Array<string> {
  const file = fs.readFileSync(filename);
  const arr = file.toString().split("\n").filter(Boolean);

  return arr;
}

export default function runner() {
  const input = readInput("03/input.txt");
  let { gammaRate, epsilonRate } = calculatePowerConsumption(input);

  console.log(
    `A) Gamma: ${gammaRate}, epsilon: ${epsilonRate}, answer: ${
      gammaRate * epsilonRate
    }`
  );
}
