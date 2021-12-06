import fs from "fs";
import { tick, count } from "./lanternfish-simulator";
import type { LanternfishPopulation } from "./lanternfish-simulator";

export function readInput(filename: string) {
  const file = fs.readFileSync(filename);
  const rows = file.toString().split("\n").filter(Boolean);

  const population = toLanternfishPopulation(rows[0]);
  return population;
}

function toLanternfishPopulation(string: string): LanternfishPopulation {
  const ages = string.split(",").map(Number);
  const population = new Map();
  ages.forEach((age) => {
    const oldValue = population.get(age) ?? 0;
    population.set(age, oldValue + 1);
  });

  return population;
}

export default function runner() {
  const lanternfishPopulation = readInput("06/input.txt");
  console.log(lanternfishPopulation);
  tick(lanternfishPopulation, 80);
  const fishCount = count(lanternfishPopulation);

  console.log(`A: Number of lanternfish: ${fishCount}`);
}
