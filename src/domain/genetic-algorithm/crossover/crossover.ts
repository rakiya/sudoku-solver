import { Gene } from "../organism";

export interface crossOverParameters {
  readonly crossOverRate: number;
}

export abstract class Crossover<T> {
  constructor(protected readonly parameters: crossOverParameters) {
    if (1 < parameters.crossOverRate) {
      throw Error("交叉率が 100 % を超えています");
    }
  }

  execute(parents: Gene<T>[]): Gene<T>[] {
    return Math.random() <= this.parameters.crossOverRate
      ? this.crossOver(parents)
      : parents;
  }

  protected abstract crossOver(parents: Gene<T>[]): Gene<T>[];
}
