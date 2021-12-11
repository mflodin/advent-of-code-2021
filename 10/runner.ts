import fs from "fs";
import {
  findCorruptedLines,
  calculateScore,
  findMiddleScore,
  autocomplete,
  calculateAutocompleteScores,
} from "./syntax-checker";

const INPUT = "10/input.txt";

export function readInput(filename: string): Array<string> {
  const file = fs.readFileSync(filename);
  const lines = file.toString().split("\n").filter(Boolean);

  return lines;
}

export default function runner() {
  const input = readInput(INPUT);
  const corrupted = findCorruptedLines(input);
  const syntaxErrorScore = calculateScore(corrupted);

  console.log(`A: Syntax error score: ${syntaxErrorScore}`);

  const corruptedLines = corrupted.map((l) => l.input);

  const nonCorruptedLines = input.filter(
    (line) => !corruptedLines.includes(line)
  );
  const autocompletedLines = autocomplete(nonCorruptedLines);
  const autocompleteScores = calculateAutocompleteScores(autocompletedLines);
  const middleScore = findMiddleScore(autocompleteScores);

  console.log(`B: Autocomplete middle score: ${middleScore}`);
}
