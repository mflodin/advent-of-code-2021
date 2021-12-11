import { findCorruptedLines, calculateScore } from "./syntax-checker";
import { readInput } from "./runner";

const TEST_INPUT = "10/test-input.txt";

// [({(<(())[]>[[{[]{<()<>>
// [(()[<>])]({[<{<<[]>>(
// {([(<{}[<>[]}>{[]{[(<()>
// (((({<>}<{<{<>}{[]{[]{}
// [[<[([]))<([[{}[[()]]]
// [{[{({}]{}}([{[{{{}}([]
// {<[[]]>}<{[{[{[]{()[[[]
// [<(<(<(<{}))><([]([]()
// <{([([[(<>()){}]>(<<{{
// <{([{{}}[<[[[<>{}]]]>[]]
test("Reads input correctly", () => {
  const input = readInput(TEST_INPUT);
  expect(input.length).toBe(10);

  expect(input[0]).toBe("[({(<(())[]>[[{[]{<()<>>");
  expect(input[2]).toBe("{([(<{}[<>[]}>{[]{[(<()>");
  expect(input[9]).toBe("<{([{{}}[<[[[<>{}]]]>[]]");
});

// {([(<{}[<>[]}>{[]{[(<()> - Expected ], but found } instead.
// [[<[([]))<([[{}[[()]]] - Expected ], but found ) instead.
// [{[{({}]{}}([{[{{{}}([] - Expected ), but found ] instead.
// [<(<(<(<{}))><([]([]() - Expected >, but found ) instead.
// <{([([[(<>()){}]>(<<{{ - Expected ], but found > instead.
test("Finds the corrupted lines", () => {
  const input = readInput(TEST_INPUT);
  const corruptedLines = findCorruptedLines(input);

  expect(corruptedLines.length).toBe(5);
  expect(corruptedLines.map((l) => l.input)).toEqual([
    "{([(<{}[<>[]}>{[]{[(<()>",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
  ]);
});

// {([(<{}[<>[]}>{[]{[(<()> - Expected ], but found } instead.
// [[<[([]))<([[{}[[()]]] - Expected ], but found ) instead.
// [{[{({}]{}}([{[{{{}}([] - Expected ), but found ] instead.
// [<(<(<(<{}))><([]([]() - Expected >, but found ) instead.
// <{([([[(<>()){}]>(<<{{ - Expected ], but found > instead.
test("Finds the illegal characters", () => {
  const input = readInput(TEST_INPUT);
  const corruptedLines = findCorruptedLines(input);
  const score = calculateScore(corruptedLines);

  expect(corruptedLines.map((l) => l.illegalCharacter)).toEqual([
    "}",
    ")",
    "]",
    ")",
    ">",
  ]);
});

// ): 3 points.
// ]: 57 points.
// }: 1197 points.
// >: 25137 points.

// 6+57+1197+25137 = 26397
test("Calculates the score", () => {
  const input = readInput(TEST_INPUT);
  const corruptedLines = findCorruptedLines(input);
  const score = calculateScore(corruptedLines);

  expect(score).toBe(26397);
});
