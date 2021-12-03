import fs from "fs";
import {
  calculateLifeSupportRating,
  calculatePowerConsumption,
} from "./submarine";

export function readInput(filename: string): Array<string> {
  const file = fs.readFileSync(filename);
  const arr = file.toString().split("\n").filter(Boolean);

  return arr;
}

export default function runner() {
  const input = readInput("03/input.txt");
  const { gammaRate, epsilonRate } = calculatePowerConsumption(input);

  console.log(
    `A) Gamma: ${gammaRate}, epsilon: ${epsilonRate}, answer: ${
      gammaRate * epsilonRate
    }`
  );

  const { oxygenGenerator, co2Scrubber } = calculateLifeSupportRating(input);
  console.log(
    `B) O2: ${oxygenGenerator}, CO2: ${co2Scrubber}, answer: ${
      oxygenGenerator * co2Scrubber
    }`
  );
}
