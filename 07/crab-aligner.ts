export type CrabPositions = Array<number>;

export type OptimalAlignment = {
  fuel: number;
  position: number;
};

export function calculateOptimalAlignment(
  positions: CrabPositions
): OptimalAlignment {
  const maxPos = Math.max(...positions);
  const minPos = Math.min(...positions);

  let leastFuel = Infinity;
  let bestPosition = minPos;

  for (let i = minPos; i <= maxPos; i++) {
    let fuel = sum(positions.map((p) => Math.abs(p - i)));
    if (fuel < leastFuel) {
      leastFuel = fuel;
      bestPosition = i;
    } else {
      // we should be able to short curcuit here...
      return { fuel: leastFuel, position: bestPosition };
    }
  }
  return { fuel: leastFuel, position: bestPosition };
}

function sum(arr: Array<number>) {
  return arr.reduce((acc, curr) => acc + curr);
}
