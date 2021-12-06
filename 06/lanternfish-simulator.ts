export type LanternfishPopulation = Map<number, number>;

// Each day, a 0 becomes a 6 and adds a new 8 to the end of the list,
// while each other number decreases by 1 if it was present at the start of the day.
export function tick(
  population: LanternfishPopulation,
  ticks = 1
): LanternfishPopulation {
  for (let i = 0; i < ticks; i++) {
    let temp = new Map(population);

    // simple cases
    population.set(0, temp.get(1) ?? 0);
    population.set(1, temp.get(2) ?? 0);
    population.set(2, temp.get(3) ?? 0);
    population.set(3, temp.get(4) ?? 0);
    population.set(4, temp.get(5) ?? 0);
    population.set(5, temp.get(6) ?? 0);
    population.set(7, temp.get(8) ?? 0);

    // newborns
    population.set(8, temp.get(0) ?? 0);

    // looped + first iteration
    population.set(6, (temp.get(0) ?? 0) + (temp.get(7) ?? 0));
  }
  return population;
}

export function count(population: LanternfishPopulation): number {
  const count = Array.from(population.values()).reduce(
    (acc, curr) => acc + curr
  );
  return count;
}
