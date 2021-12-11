import fs from "fs";
import { findCorruptedLines, calculateScore } from "./syntax-checker";

const INPUT = "10/input.txt";

export function readInput(filename: string): Array<string> {
  const file = fs.readFileSync(filename);
  const lines = file.toString().split("\n").filter(Boolean);

  return lines;
}

export default function runner() {
  const input = readInput(INPUT);
  const corruptedLines = findCorruptedLines(input);
  const score = calculateScore(corruptedLines);

  console.log(`A: Syntax error score: ${score}`);
}
