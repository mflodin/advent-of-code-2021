import {
  calculateCorrectOptimalAlignment,
  calculateOptimalAlignment,
} from "./crab-aligner";
import { readInput } from "./runner";

const TEST_INPUT = "07/test-input.txt";

// 16,1,2,0,4,2,7,1,2,14
test("Reads input correctly", () => {
  const crabPositions = readInput(TEST_INPUT);
  expect(crabPositions).toEqual([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]);
});

// Move from 16 to 2: 14 fuel
// Move from 1 to 2: 1 fuel
// Move from 2 to 2: 0 fuel
// Move from 0 to 2: 2 fuel
// Move from 4 to 2: 2 fuel
// Move from 2 to 2: 0 fuel
// Move from 7 to 2: 5 fuel
// Move from 1 to 2: 1 fuel
// Move from 2 to 2: 0 fuel
// Move from 14 to 2: 12 fuel

// This costs a total of 37 fuel. This is the cheapest possible outcome;
// more expensive outcomes include aligning at
// position 1 (41 fuel), position 3 (39 fuel), or position 10 (71 fuel).
test("Finds correct position", () => {
  const crabPositions = readInput(TEST_INPUT);
  const { position } = calculateOptimalAlignment(crabPositions);

  expect(position).toBe(2);
});
test("Finds correct fuel spent", () => {
  const crabPositions = readInput(TEST_INPUT);
  const { fuel } = calculateOptimalAlignment(crabPositions);

  expect(fuel).toBe(37);
});

// Move from 16 to 5: 66 fuel
// Move from 1 to 5: 10 fuel
// Move from 2 to 5: 6 fuel
// Move from 0 to 5: 15 fuel
// Move from 4 to 5: 1 fuel
// Move from 2 to 5: 6 fuel
// Move from 7 to 5: 3 fuel
// Move from 1 to 5: 10 fuel
// Move from 2 to 5: 6 fuel
// Move from 14 to 5: 45 fuel

// This costs a total of 168 fuel
test("Finds actually correct position", () => {
  const crabPositions = readInput(TEST_INPUT);
  const { position } = calculateCorrectOptimalAlignment(crabPositions);

  expect(position).toBe(5);
});
test("Finds actually correct fuel spent", () => {
  const crabPositions = readInput(TEST_INPUT);
  const { fuel } = calculateCorrectOptimalAlignment(crabPositions);

  expect(fuel).toBe(168);
});
