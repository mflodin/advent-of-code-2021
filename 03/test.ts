import {
  calculateLifeSupportRating,
  calculatePowerConsumption,
} from "./submarine";
import { readInput } from "./runner";

const input = readInput("03/test-input.txt");

// 00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010
test("Calculates power consumption", () => {
  const { gammaRate, epsilonRate } = calculatePowerConsumption(input);
  expect(gammaRate).toBe(22);
  expect(epsilonRate).toBe(9);
});

test("Calculates life support rating", () => {
  const { oxygenGenerator, co2Scrubber } = calculateLifeSupportRating(input);
  expect(oxygenGenerator).toBe(23);
  expect(co2Scrubber).toBe(10);
});
