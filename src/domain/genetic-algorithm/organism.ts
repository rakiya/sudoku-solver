import "@rakiya/tslin";
import { Selection } from "./selection/selection";

export class Fitness {
  constructor(readonly value: number) {}
}

export abstract class Gene<T> {
  constructor(readonly value: T) {}

  abstract evaluateFitness(): Fitness;
}

export class Individual<T> {
  constructor(public readonly gene: Gene<T>, public fitness: Fitness) {}

  evaluateFitness() {
    this.fitness = this.gene.evaluateFitness();
  }

  isOptimal() {
    return this.fitness.value === 0;
  }
}

export class Population<T> {
  private individuals: Individual<T>[] = [];

  readonly maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  get size() {
    return this.individuals.length;
  }

  get bestFitness() {
    return this.individuals.minByOrUndefined((it) => it.fitness!.value);
  }

  get worstFitness() {
    return this.individuals.maxByOrUndefined((it) => it.fitness!.value);
  }

  add(gene: Gene<T>) {
    new Individual(gene, gene.evaluateFitness()).also((it) =>
      this.individuals.push(it)
    );
  }

  sample(count: number) {
    return this.individuals.sample(count);
  }

  selectParentsBy(selectionFunction: Selection<T>): Gene<T>[] {
    return selectionFunction.execute(this);
  }

  getMostOptimalIndividual(): Individual<T> {
    return this.individuals.minByOrUndefined((it) => it.fitness!.value)!;
  }
}
