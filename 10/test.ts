import {
  findCorruptedLines,
  calculateScore,
  autocomplete,
  calculateAutocompleteScores,
  findMiddleScore,
} from "./syntax-checker";
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

// [({(<(())[]>[[{[]{<()<>> - Complete by adding }}]])})].
// [(()[<>])]({[<{<<[]>>( - Complete by adding )}>]}).
// (((({<>}<{<{<>}{[]{[]{} - Complete by adding }}>}>)))).
// {<[[]]>}<{[{[{[]{()[[[] - Complete by adding ]]}}]}]}>.
// <{([{{}}[<[[[<>{}]]]>[]] - Complete by adding ])}>.
test("Can autocomplete non corrupt lines", () => {
  const input = readInput(TEST_INPUT);
  const corruptedLines = findCorruptedLines(input).map((line) => line.input);
  const nonCorruptedLines = input.filter(
    (line) => !corruptedLines.includes(line)
  );
  const autocompletedLines = autocomplete(nonCorruptedLines);

  expect(autocompletedLines.map((l) => l.addendum)).toEqual([
    "}}]])})]",
    ")}>]})",
    "}}>}>))))",
    "]]}}]}]}>",
    "])}>",
  ]);
});

// }}]])})] - 288957 total points.
// )}>]}) - 5566 total points.
// }}>}>)))) - 1480781 total points.
// ]]}}]}]}> - 995444 total points.
// ])}> - 294 total points.
test("Can calculate autocomplete scores", () => {
  const input = readInput(TEST_INPUT);
  const corruptedLines = findCorruptedLines(input).map((line) => line.input);
  const nonCorruptedLines = input.filter(
    (line) => !corruptedLines.includes(line)
  );
  const autocompletedLines = autocomplete(nonCorruptedLines);
  const scores = calculateAutocompleteScores(autocompletedLines);

  expect(scores).toEqual([288957, 5566, 1480781, 995444, 294]);
});

test("Can find middle score", () => {
  const middleScore = findMiddleScore([288957, 5566, 1480781, 995444, 294]);
  expect(middleScore).toBe(288957);
});
