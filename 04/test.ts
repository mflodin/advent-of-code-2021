import { findLastWinningBoard, findWinningBoard } from "./submarine";
import { readInput } from "./runner";

// 7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7
test("Reads input correctly", () => {
  const { numbers, boards } = readInput("04/test-input.txt");

  expect(numbers).toEqual([
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ]);
  expect(boards[0].map((boardNumber) => boardNumber.number)).toEqual([
    22, 13, 17, 11, 0, 8, 2, 23, 4, 24, 21, 9, 14, 16, 7, 6, 10, 3, 18, 5, 1,
    12, 20, 15, 19,
  ]);
  expect(boards[0].filter((boardNumber) => boardNumber.marked)).toEqual([]);

  expect(boards[1].map((boardNumber) => boardNumber.number)).toEqual([
    3, 15, 0, 2, 22, 9, 18, 13, 17, 5, 19, 8, 7, 25, 23, 20, 11, 10, 24, 4, 14,
    21, 16, 12, 6,
  ]);
  expect(boards[1].filter((boardNumber) => boardNumber.marked)).toEqual([]);

  expect(boards[2].map((boardNumber) => boardNumber.number)).toEqual([
    14, 21, 17, 24, 4, 10, 16, 15, 9, 19, 18, 8, 23, 26, 20, 22, 11, 13, 6, 5,
    2, 0, 12, 3, 7,
  ]);
  expect(boards[2].filter((boardNumber) => boardNumber.marked)).toEqual([]);
});

test("Finds the winning board", () => {
  const { numbers, boards } = readInput("04/test-input.txt");

  const { board } = findWinningBoard({ numbers, boards });
  expect(board[0]).toEqual({ number: 14, marked: true });
  expect(board[1]).toEqual({ number: 21, marked: true });
  expect(board[2]).toEqual({ number: 17, marked: true });
  expect(board[3]).toEqual({ number: 24, marked: true });
  expect(board[4]).toEqual({ number: 4, marked: true });
});

test("Finds the winning score", () => {
  const { numbers, boards } = readInput("04/test-input.txt");

  const { score } = findWinningBoard({ numbers, boards });
  expect(score).toBe(4512);
});

test("Finds the last winning board", () => {
  const { numbers, boards } = readInput("04/test-input.txt");

  const { board } = findLastWinningBoard({ numbers, boards });

  expect(board[2]).toEqual({ number: 0, marked: true });
  expect(board[7]).toEqual({ number: 13, marked: true });
  expect(board[12]).toEqual({ number: 7, marked: true });
  expect(board[17]).toEqual({ number: 10, marked: true });
  expect(board[22]).toEqual({ number: 16, marked: true });
});

// 148 * 13 = 1924
test("Finds the last winning score", () => {
  const { numbers, boards } = readInput("04/test-input.txt");

  const { score } = findLastWinningBoard({ numbers, boards });
  expect(score).toBe(1924);
});
