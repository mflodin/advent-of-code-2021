import fs from "fs";
import { navigate, navigateWithAim } from "./submarine";
import type { CourseChange } from "./submarine";

export function readInput(filename: string): Array<CourseChange> {
  const file = fs.readFileSync(filename);
  const arr = file
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((row) => {
      const [direction, distance] = row.split(" ");
      if (!["up", "down", "forward"].includes(direction)) {
        throw new Error(`Unknown direction "${direction}`);
      }
      return { direction, distance: Number(distance) } as CourseChange;
    });
  return arr;
}

export default function runner() {
  const input = readInput("02/input.txt");
  let { horizontal, depth } = navigate(input);

  console.log(
    `A) Horizontal: ${horizontal}, depth: ${depth}, answer: ${
      depth * horizontal
    }`
  );

  ({ horizontal, depth } = navigateWithAim(input));

  console.log(
    `B) Horizontal: ${horizontal}, depth: ${depth}, answer: ${
      depth * horizontal
    }`
  );
}
