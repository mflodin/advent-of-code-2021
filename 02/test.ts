import { navigate, navigateWithAim } from "./submarine";
import { readInput } from "./runner";

const input = readInput("02/test-input.txt");

// forward 5
// down 5
// forward 8
// up 3
// down 8
// forward 2
test("Reads input correctly", () => {
  expect(input).toEqual([
    { direction: "forward", distance: 5 },
    { direction: "down", distance: 5 },
    { direction: "forward", distance: 8 },
    { direction: "up", distance: 3 },
    { direction: "down", distance: 8 },
    { direction: "forward", distance: 2 },
  ]);
});

// {direction: "forward", distance: 5},
// {direction: "down", distance: 5},
// {direction: "forward", distance: 8},
// {direction: "up", distance: 3},
// {direction: "down", distance: 8},
// {direction: "forward", distance: 2},
test("Navigates correctly", () => {
  const { horizontal, depth } = navigate(input);
  expect(horizontal).toBe(15);
  expect(depth).toBe(10);
});

test("Navigates with aim", () => {
  const { horizontal, depth } = navigateWithAim(input);
  expect(horizontal).toBe(15);
  expect(depth).toBe(60);
});
