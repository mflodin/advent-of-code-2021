import { tick, count } from "./lanternfish-simulator";
import { readInput } from "./runner";

const TEST_INPUT = "06/test-input.txt";

// 3,4,3,1,2
test("Reads input correctly", () => {
  const population = readInput(TEST_INPUT);
  expect(population.get(1)).toBe(1);
  expect(population.get(2)).toBe(1);
  expect(population.get(3)).toBe(2);
  expect(population.get(4)).toBe(1);
});

test("Counts population correctly", () => {
  const population = readInput(TEST_INPUT);
  expect(count(population)).toBe(5);
});

// Initial state: 3,4,3,1,2
// After  1 day:  2,3,2,0,1
// After  2 days: 1,2,1,6,0, 8
// After  3 days: 0,1,0,5,6, 7,8
// After  4 days: 6,0,6,4,5, 6,7,8,8
// After  5 days: 5,6,5,3,4, 5,6,7,7,8
// After  6 days: 4,5,4,2,3, 4,5,6,6,7
// After  7 days: 3,4,3,1,2, 3,4,5,5,6
// After  8 days: 2,3,2,0,1, 2,3,4,4,5
// After  9 days: 1,2,1,6,0, 1,2,3,3,4, 8
// After 10 days: 0,1,0,5,6, 0,1,2,2,3, 7,8
// After 11 days: 6,0,6,4,5, 6,0,1,1,2, 6,7,8,8,8
// After 12 days: 5,6,5,3,4, 5,6,0,0,1, 5,6,7,7,7 ,8,8
// After 13 days: 4,5,4,2,3, 4,5,6,6,0, 4,5,6,6,6 ,7,7,8,8
// After 14 days: 3,4,3,1,2, 3,4,5,5,6, 3,4,5,5,5 ,6,6,7,7,8
// After 15 days: 2,3,2,0,1, 2,3,4,4,5, 2,3,4,4,4 ,5,5,6,6,7
// After 16 days: 1,2,1,6,0, 1,2,3,3,4, 1,2,3,3,3 ,4,4,5,5,6, 8
// After 17 days: 0,1,0,5,6, 0,1,2,2,3, 0,1,2,2,2 ,3,3,4,4,5, 7,8
// After 18 days: 6,0,6,4,5, 6,0,1,1,2, 6,0,1,1,1 ,2,2,3,3,4, 6,7,8,8,8, 8
test("Simulates growing population correctly", () => {
  const population = readInput(TEST_INPUT);
  const expectedSize = [
    5, 5, 6, 7, 9, 10, 10, 10, 10, 11, 12, 15, 17, 19, 20, 20, 21, 22, 26,
  ];

  for (let i = 0; i < expectedSize.length; i++) {
    expect(count(population)).toBe(expectedSize[i]);
    tick(population);
  }
});

test("Can simulate several ticks at once", () => {
  const population = readInput(TEST_INPUT);
  tick(population, 80);
  expect(count(population)).toBe(5934);
});
