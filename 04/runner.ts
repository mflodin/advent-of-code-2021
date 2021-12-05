import fs from "fs";
import { findLastWinningBoard, Input } from "./submarine";
import { findWinningBoard } from "./submarine";

export function readInput(filename: string): Input {
  const file = fs.readFileSync(filename);
  const arr = file.toString().split("\n").filter(Boolean);
  const [numberRow, ...rest] = arr;
  const numbers = numberRow.split(",").map(Number);
  let boards = [];
  for (let i = 0; i < rest.length; i += 5) {
    let boardNumbersString = `${rest[i]} ${rest[i + 1]} ${rest[i + 2]} ${
      rest[i + 3]
    } ${rest[i + 4]}`;
    let boardNumbers = boardNumbersString
      .trim()
      .split(/\s+/)
      .map((n) => ({ number: Number(n), marked: false }));

    boards.push(boardNumbers);
  }

  return { numbers, boards };
}

export default function runner() {
  const input = readInput("04/input.txt");
  const best = findWinningBoard(input);
  const worst = findLastWinningBoard(input);

  console.log(`Best board: ${best.score}, Worst board: ${worst.score}`);
}
