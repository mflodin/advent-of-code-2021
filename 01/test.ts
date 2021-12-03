// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
import { depthIncrease, rollingDepthIncrease } from "./sonar";
import { readInput } from "./runner";

const input = readInput("01/test-input.txt");
test("Reads input correctly", () => {
  expect(input).toEqual([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]);
});

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
test("Calculates depth", () => {
  const actual = depthIncrease(input);
  expect(actual).toBe(7);
});

// A: 607 (N/A - no previous sum)
// B: 618 (increased)
// C: 618 (no change)
// D: 617 (decreased)
// E: 647 (increased)
// F: 716 (increased)
// G: 769 (increased)
// H: 792 (increased)
test("Calculates rolling depth", () => {
  const actual = rollingDepthIncrease(input);
  expect(actual).toBe(5);
});
