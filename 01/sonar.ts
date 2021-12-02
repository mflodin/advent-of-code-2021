export function depthIncrease(depths: Array<number>): number {
  let increase = 0;
  let lastDepth: number;
  depths.forEach((depth) => {
    if (lastDepth < depth) {
      increase += 1;
    }
    lastDepth = depth;
  });
  return increase;
}
