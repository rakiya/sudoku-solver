import { repeat } from "@rakiya/tslin";
import { Gene, Population } from "../organism";
import { Selection } from "./selection";

export interface TournamentSelectionParameters<T> {
  readonly nSample: number;
  readonly nResult: number;
}

export class TournamentSelection<T> implements Selection<T> {
  constructor(private readonly parameters: TournamentSelectionParameters<T>) {}

  execute(population: Population<T>): Gene<T>[] {
    const parents: Gene<T>[] = [];

    repeat(this.parameters.nResult, () => {
      population
        .sample(this.parameters.nSample)
        .sortBy((it) => it.fitness!.value)
        .firstOrUndefined()!
        .also((it) => parents.push(it.gene));
    });

    return parents;
  }
}
