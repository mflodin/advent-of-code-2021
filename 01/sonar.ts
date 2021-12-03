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

export function rollingDepthIncrease(depths: Array<number>): number {
  let increase = 0;
  let lastDepth: number | undefined = undefined;
  for (let i = 2; i < depths.length; i++) {
    let currentDepth = depths[i - 2] + depths[i - 1] + depths[i];

    if (lastDepth && lastDepth < currentDepth) {
      increase += 1;
    }
    lastDepth = currentDepth;
  }
  return increase;
}
