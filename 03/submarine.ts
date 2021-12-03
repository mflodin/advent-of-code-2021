type PowerConsumption = {
  gammaRate: number;
  epsilonRate: number;
};

type LifeSupportRating = {
  oxygenGenerator: number;
  co2Scrubber: number;
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

export function calculateLifeSupportRating(
  diagnosticsReport: Array<string>
): LifeSupportRating {
  return {
    oxygenGenerator: calculateOxygenGeneratorRating(diagnosticsReport) ?? -1,
    co2Scrubber: calculateCO2ScrubberRating(diagnosticsReport) ?? -1,
  };
}

function calculateOxygenGeneratorRating(
  diagnosticsReport: Array<string>,
  position: number = 0
): number {
  if (diagnosticsReport.length === 1) {
    return parseInt(diagnosticsReport[0], 2);
  }

  let bitCount = 0;

  diagnosticsReport.forEach((row) => {
    bitCount += Number(row[position]);
  });

  const mostCommon = bitCount >= diagnosticsReport.length / 2 ? "1" : "0";

  const remainingReport = diagnosticsReport.filter(
    (row) => row[position] === mostCommon
  );

  return calculateOxygenGeneratorRating(remainingReport, position + 1);
}

function calculateCO2ScrubberRating(
  diagnosticsReport: Array<string>,
  position: number = 0
): number {
  if (diagnosticsReport.length === 1) {
    return parseInt(diagnosticsReport[0], 2);
  }

  let bitCount = 0;

  diagnosticsReport.forEach((row) => {
    bitCount += Number(row[position]);
  });

  const leastCommon = bitCount >= diagnosticsReport.length / 2 ? "0" : "1";

  const remainingReport = diagnosticsReport.filter(
    (row) => row[position] === leastCommon
  );

  return calculateCO2ScrubberRating(remainingReport, position + 1);
}
