import { sum } from "../utils/math";

type CorruptedLine = {
  input: string;
  illegalCharacter: string;
};

const openingCharacters = ["(", "[", "{", "<"];
const closingCharacters = [")", "]", "}", ">"];

const characterMap: { [index: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

export function findCorruptedLines(input: Array<string>): Array<CorruptedLine> {
  let corruptedLines: Array<CorruptedLine> = [];

  input.forEach((line) => {
    let stack = [];
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (openingCharacters.includes(c)) {
        stack.push(c);
      } else if (closingCharacters.includes(c)) {
        let lastOpeningCharacter = stack.pop() as string;
        if (characterMap[lastOpeningCharacter] !== c) {
          corruptedLines.push({ input: line, illegalCharacter: c });
          return;
        }
      }
    }
  });
  return corruptedLines;
}

const scoreMap: { [index: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
export function calculateScore(input: Array<CorruptedLine>): number {
  return sum(input.map((l) => scoreMap[l.illegalCharacter]));
}
