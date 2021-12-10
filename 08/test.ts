import {
  countDistinctNumbers,
  decodeOutputValues,
  sumAllOutputValues,
} from "./digit-decoder";
import { readInput, getDigits } from "./runner";

const TEST_INPUT = "08/test-input.txt";

// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
test("Reads input correctly", () => {
  const input = readInput(TEST_INPUT);
  expect(input.length).toBe(10);
  for (const { signal, digits } of input) {
    expect(signal.length).toBe(10);
    expect(digits.length).toBe(4);
  }

  expect(input[0].signal[4]).toBe("cgeb");
  expect(input[5].signal[0]).toBe("fgeab");
  expect(input[9].signal[9]).toBe("fegbdc");

  expect(input[0].digits[0]).toBe("fdgacbe");
  expect(input[5].digits[2]).toBe("ca");
  expect(input[9].digits[3]).toBe("bagce");
});

test("Gets the digits correctly", () => {
  const input = readInput(TEST_INPUT);
  const digits = getDigits(input);

  expect(digits.length).toBe(40);
  expect(digits[0]).toBe("fdgacbe");
  expect(digits[39]).toBe("bagce");
});

test("Counts the number of distinguishable digits", () => {
  const input = readInput(TEST_INPUT);
  const digits = getDigits(input);
  const count = countDistinctNumbers(digits);

  expect(count).toBe(26);
});

// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe : 8394
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc : 9781
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg : 1197
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb : 9361
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea : 4873
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb : 8418
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe : 4548
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef : 1625
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb : 8717
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce : 4315
test("Can decode output values", () => {
  const input = readInput(TEST_INPUT);

  expect(decodeOutputValues(input[8])).toBe(8717);
  expect(decodeOutputValues(input[0])).toBe(8394);
  expect(decodeOutputValues(input[1])).toBe(9781);
  expect(decodeOutputValues(input[2])).toBe(1197);
  expect(decodeOutputValues(input[3])).toBe(9361);
  expect(decodeOutputValues(input[4])).toBe(4873);
  expect(decodeOutputValues(input[5])).toBe(8418);
  expect(decodeOutputValues(input[6])).toBe(4548);
  expect(decodeOutputValues(input[7])).toBe(1625);
  expect(decodeOutputValues(input[9])).toBe(4315);
});

test("Sums all the output values", () => {
  const input = readInput(TEST_INPUT);
  const sum = sumAllOutputValues(input);

  expect(sum).toBe(61229);
});
