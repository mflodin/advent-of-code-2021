type BoardNumber = {
  number: number;
  marked: boolean;
};

type BingoBoard = Array<BoardNumber>;

export type Result = {
  board: BingoBoard;
  score: number;
};

export type Input = {
  numbers: Array<number>;
  boards: Array<BingoBoard>;
};

export function findWinningBoard({ boards, numbers }: Input): Result {
  for (let drawnNumber of numbers) {
    for (let board of boards) {
      let boardNumber = board.find((n) => n.number === drawnNumber);
      if (boardNumber) {
        boardNumber.marked = true;

        if (hasBoardWon(board)) {
          return { board, score: calculateScore({ board, drawnNumber }) };
        }
      }
    }
  }
  return { board: [], score: 0 };
}

export function findLastWinningBoard({ boards, numbers }: Input): Result {
  let winningBoards: Set<BingoBoard> = new Set();
  for (let drawnNumber of numbers) {
    for (let board of boards) {
      let boardNumber = board.find((n) => n.number === drawnNumber);
      if (boardNumber) {
        boardNumber.marked = true;

        if (hasBoardWon(board)) {
          winningBoards.add(board);
          if (winningBoards.size === boards.length) {
            return { board, score: calculateScore({ board, drawnNumber }) };
          }
        }
      }
    }
  }
  return { board: [], score: 0 };
}

function hasBoardWon(board: BingoBoard) {
  if (
    // row 1
    (board[0].marked &&
      board[1].marked &&
      board[2].marked &&
      board[3].marked &&
      board[4].marked) ||
    // row 2
    (board[5].marked &&
      board[6].marked &&
      board[7].marked &&
      board[8].marked &&
      board[9].marked) ||
    // row 3
    (board[10].marked &&
      board[11].marked &&
      board[12].marked &&
      board[13].marked &&
      board[14].marked) ||
    // row 4
    (board[15].marked &&
      board[16].marked &&
      board[17].marked &&
      board[18].marked &&
      board[19].marked) ||
    // row 5
    (board[20].marked &&
      board[21].marked &&
      board[22].marked &&
      board[23].marked &&
      board[24].marked) ||
    // column 1
    (board[0].marked &&
      board[5].marked &&
      board[10].marked &&
      board[15].marked &&
      board[20].marked) ||
    // column 2
    (board[1].marked &&
      board[6].marked &&
      board[11].marked &&
      board[16].marked &&
      board[21].marked) ||
    // column 3
    (board[2].marked &&
      board[7].marked &&
      board[12].marked &&
      board[17].marked &&
      board[22].marked) ||
    // column 4
    (board[3].marked &&
      board[8].marked &&
      board[13].marked &&
      board[18].marked &&
      board[23].marked) ||
    // column 5
    (board[4].marked &&
      board[9].marked &&
      board[14].marked &&
      board[19].marked &&
      board[24].marked)
  ) {
    return true;
  }
  return false;
}

type CalculateScoreInput = {
  board: BingoBoard;
  drawnNumber: number;
};
function calculateScore({ board, drawnNumber }: CalculateScoreInput) {
  const unmarkedNumbers = board.filter((b) => !b.marked).map((b) => b.number);

  const sumOfUnmarkedNumbers = unmarkedNumbers.reduce(
    (acc, curr) => acc + curr
  );

  return sumOfUnmarkedNumbers * drawnNumber;
}
