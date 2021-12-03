type PowerConsumption = {
  gammaRate: number;
  epsilonRate: number;
};

// gamma rate - most common bit
// epsilon rate - least common bit
export function calculatePowerConsumption(
  diagnosticsReport: Array<string>
): PowerConsumption {
  const wordLength = diagnosticsReport[0].length;
  const size = diagnosticsReport.length;
  let bitCount = new Array(wordLength).fill(0);

  diagnosticsReport.forEach((row) => {
    const bits = row.split("").map(Number);
    bits.forEach((bit, i) => {
      bitCount[i] += bit;
    });
  });

  const gammaRateBinaryString = bitCount
    .map((count) => (count > size / 2 ? 1 : 0))
    .join("");
  const gammaRate = parseInt(gammaRateBinaryString, 2);

  const epsilonRateBinaryString = bitCount
    .map((count) => (count > size / 2 ? 0 : 1))
    .join("");
  const epsilonRate = parseInt(epsilonRateBinaryString, 2);

  return { gammaRate, epsilonRate };
}
