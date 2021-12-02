// 199 (N/A - no previous measurement)
// 200 (increased)
// 208 (increased)
// 210 (increased)
// 200 (decreased)
// 207 (increased)
// 240 (increased)
// 269 (increased)
// 260 (decreased)
// 263 (increased)

// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
import { depthIncrease } from "./sonar";
import { readInput } from "./runner";

const input = readInput("01/test-input.txt");
test("Reads input correctly", () => {
  expect(input).toEqual([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]);
});

test("Calculates depth", () => {
  const actual = depthIncrease(input);
  expect(actual).toBe(7);
});
