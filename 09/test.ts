import {
  findLowPoints,
  calculateRiskLevel,
  findBasins,
  calculateBasinFactor,
} from "./smoke-basin";
import { readInput } from "./runner";
import { numericalSort } from "../utils/math";

const TEST_INPUT = "09/test-input.txt";

// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
test("Reads input correctly", () => {
  const input = readInput(TEST_INPUT);
  expect(input.length).toBe(5);
  expect(input[0].length).toBe(10);

  expect(input[0][0]).toBe(2);
  expect(input[0][4]).toBe(9);
  expect(input[2][0]).toBe(9);
  expect(input[2][2]).toBe(5);
  expect(input[4][3]).toBe(9);
  expect(input[4][9]).toBe(8);
});

test("Finds the low points", () => {
  const input = readInput(TEST_INPUT);
  const lowPoints = findLowPoints(input);

  expect(lowPoints.length).toBe(4);
  expect(lowPoints.sort()).toEqual([0, 1, 5, 5]);
});

test("Calculates the risk level", () => {
  const input = readInput(TEST_INPUT);
  const lowPoints = findLowPoints(input);
  const riskLevel = calculateRiskLevel(lowPoints);

  expect(riskLevel).toBe(15);
});

test("Finds all basins", () => {
  const input = readInput(TEST_INPUT);
  const basins = findBasins(input);

  expect(basins.length).toBe(4);
  expect(basins.sort(numericalSort)).toEqual([3, 9, 9, 14]);
});

test("Calculates the basin factor", () => {
  const input = readInput(TEST_INPUT);
  const basins = findBasins(input);
  const basinFactor = calculateBasinFactor(basins);

  expect(basinFactor).toBe(1134);
});
