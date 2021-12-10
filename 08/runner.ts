import fs from "fs";
import {
  countDistinctNumbers as countDistinguishableDigits,
  sumAllOutputValues,
} from "./digit-decoder";

const INPUT = "08/input.txt";

export type Message = {
  signal: Array<SignalPattern>;
  digits: Array<DigitCode>;
};

export type SignalPattern = string;
export type DigitCode = string;

export function readInput(filename: string): Array<Message> {
  const file = fs.readFileSync(filename);
  const lines = file
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [signalString, digitString] = line.split(" | ");

      const signal = signalString.split(" ");
      const digits = digitString.split(" ");

      return { signal, digits };
    });

  return lines;
}

export function getDigits(input: Array<Message>): Array<DigitCode> {
  return input.flatMap((line) => line.digits);
}

export default function runner() {
  const input = readInput(INPUT);
  const digits = getDigits(input);
  const count = countDistinguishableDigits(digits);

  console.log(`A: Number of distinguishable digits: ${count}`);

  const sum = sumAllOutputValues(input);
  console.log(`B: Sum of all output values: ${sum}`);
}
