import { sum } from "../utils/math";
import type { DigitCode, Message } from "./runner";

export function countDistinctNumbers(digitCodes: Array<DigitCode>): number {
  return digitCodes.filter((code) => [2, 3, 4, 7].includes(code.length)).length;
}

export function sumAllOutputValues(input: Array<Message>): number {
  const outputValues = input.map(decodeOutputValues);
  return sum(outputValues);
}

function normalizeDigitCode(digitCode: string): string {
  return digitCode.split("").sort().join("");
}
export function decodeOutputValues({ signal, digits }: Message): number {
  const allDigitsInMessage = [...signal, ...digits].map(normalizeDigitCode);
  let digitCodes = Array.from(new Set(allDigitsInMessage));
  let normalizedOutputDigits = digits.map(normalizeDigitCode);

  const digitMap = new Map();

  const one = digitCodes.find((digit) => digit.length === 2);
  const four = digitCodes.find((digit) => digit.length === 4);
  const seven = digitCodes.find((digit) => digit.length === 3);
  const eight = digitCodes.find((digit) => digit.length === 7);

  digitMap.set(one, 1);
  digitMap.set(four, 4);
  digitMap.set(seven, 7);
  digitMap.set(eight, 8);

  // simple case
  if (normalizedOutputDigits.every((digit) => digitMap.has(digit))) {
    return decodeDigits(normalizedOutputDigits, digitMap);
  }

  const nine = digitCodes.find(
    (digit) =>
      digit.length === 6 &&
      four?.split("").every((segment) => digit.includes(segment))
  );
  if (!nine) {
    throw new Error("No nines!");
  }
  digitMap.set(nine, 9);

  const six = digitCodes.find(
    (digit) =>
      digit.length === 6 &&
      one?.split("").some((segment) => !digit.includes(segment))
  );
  if (!six) {
    throw new Error("No sixes!");
  }
  digitMap.set(six, 6);

  const zero = digitCodes.find(
    (digit) => digit.length === 6 && !digitMap.has(digit)
  );
  if (!zero) {
    throw new Error("No zeroes!");
  }
  digitMap.set(zero, 0);

  const three = digitCodes.find(
    (digit) =>
      digit.length === 5 &&
      one?.split("").every((segment) => digit.includes(segment))
  );
  if (!three) {
    throw new Error("No threes!");
  }
  digitMap.set(three, 3);

  const five = digitCodes.find(
    (digit) =>
      digit.length === 5 &&
      digit.split("").every((segment) => six.includes(segment))
  );
  if (!five) {
    throw new Error("No fives!");
  }
  digitMap.set(five, 5);

  const two = digitCodes.find(
    (digit) => digit.length === 5 && !digitMap.has(digit)
  );
  if (!two) {
    throw new Error("No twos!");
  }
  digitMap.set(two, 2);

  // console.log(three);

  // for (let digit of normalizedOutputDigits) {
  //   if(digitMap.has(digit)) {

  //   }
  // }

  // console.log(digitCodes.size, digitCodes);
  return decodeDigits(normalizedOutputDigits, digitMap);
}

export function decodeDigits(
  digits: Array<DigitCode>,
  digitMap: Map<DigitCode, number>
): number {
  const decodedDigits = digits.map((digitCode) => digitMap.get(digitCode));
  // console.log(decodedDigits, digits, digitMap);
  const number = Number(decodedDigits.join(""));
  return number;
}
