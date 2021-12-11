import { numericalSort, sum } from "../utils/math";

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

const syntaxErrorScoreMap: { [index: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
export function calculateScore(input: Array<CorruptedLine>): number {
  return sum(input.map((l) => syntaxErrorScoreMap[l.illegalCharacter]));
}

type AutocompletedLine = {
  input: string;
  addendum: string;
};
export function autocomplete(input: Array<string>): Array<AutocompletedLine> {
  return input.map(autocompleteSingleLine);
}

function autocompleteSingleLine(input: string): AutocompletedLine {
  let addendum = "";
  let stack = [];
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (openingCharacters.includes(c)) {
      stack.push(c);
    } else if (closingCharacters.includes(c)) {
      stack.pop();
    }
  }

  stack.forEach((char) => (addendum = characterMap[char] + addendum));
  return { input, addendum };
}

// Start with a total score of 0.
// Then, for each character,
//   multiply the total score by 5
//   and then increase the total score by the point value given for the character in the following table:
//     ): 1 point.
//     ]: 2 points.
//     }: 3 points.
//     >: 4 points.

const autocompleteScoreMap: { [index: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export function calculateAutocompleteScores(
  input: Array<AutocompletedLine>
): Array<number> {
  return input.map(calculateAutocompleteScore);
}

function calculateAutocompleteScore({ addendum }: AutocompletedLine) {
  let score = 0;

  for (let i = 0; i < addendum.length; i++) {
    let c = addendum[i];
    score = score * 5 + autocompleteScoreMap[c];
  }
  return score;
}
export function findMiddleScore(scores: Array<number>): number {
  return [...scores].sort(numericalSort)[Math.floor(scores.length / 2)];
}
