import {
  findOverlappingLines,
  plotHorizontalAndVerticalLines,
  plotAllLines,
} from "./submarine";
import { readInput } from "./runner";

// 0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2
test("Reads input correctly", () => {
  const endpointList = readInput("05/test-input.txt");
  // first row
  expect(endpointList[0].start.x).toBe(0);
  expect(endpointList[0].start.y).toBe(9);
  expect(endpointList[0].end.x).toBe(5);
  expect(endpointList[0].end.y).toBe(9);

  // last row
  expect(endpointList[9].start.x).toBe(5);
  expect(endpointList[9].start.y).toBe(5);
  expect(endpointList[9].end.x).toBe(8);
  expect(endpointList[9].end.y).toBe(2);
});

// .......1..
// ..1....1..
// ..1....1..
// .......1..
// .112111211
// ..........
// ..........
// ..........
// ..........
// 222111....
test("Plots horizontal and vertical lines", () => {
  const endpointList = readInput("05/test-input.txt");
  const grid = plotHorizontalAndVerticalLines(endpointList);

  expect(grid.get("0,9")).toBe(2);
  expect(grid.get("9,4")).toBe(1);
  expect(grid.get("2,2")).toBe(1);
});

test("Finds the overlapping lines", () => {
  const endpointList = readInput("05/test-input.txt");

  const numberOfOverlappingPoints = findOverlappingLines(
    plotHorizontalAndVerticalLines(endpointList)
  );
  expect(numberOfOverlappingPoints).toBe(5);
});

// 1.1....11.
// .111...2..
// ..2.1.111.
// ...1.2.2..
// .112313211
// ...1.2....
// ..1...1...
// .1.....1..
// 1.......1.
// 222111....
test("Plots all lines", () => {
  const endpointList = readInput("05/test-input.txt");
  const grid = plotAllLines(endpointList);

  expect(grid.get("0,9")).toBe(2);
  expect(grid.get("9,4")).toBe(1);
  expect(grid.get("2,2")).toBe(2);
  expect(grid.get("0,0")).toBe(1);
});

test("Finds the overlapping lines", () => {
  const endpointList = readInput("05/test-input.txt");

  const numberOfOverlappingPoints = findOverlappingLines(
    plotAllLines(endpointList)
  );
  expect(numberOfOverlappingPoints).toBe(12);
});
