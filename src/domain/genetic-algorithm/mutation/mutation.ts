import { Gene } from "../organism";

export interface MutationParameters {
  readonly mutationRate: number;
}

export abstract class Mutation<T> {
  constructor(protected readonly parameters: MutationParameters) {
    if (parameters.mutationRate <= 0 && 1 < parameters.mutationRate) {
      throw Error("突然変異の確率が 0 ~ 100 % の間ではありません");
    }
  }

  execute(gene: Gene<T>): Gene<T>[] {
    if (Math.random() < this.parameters.mutationRate) {
      return this.mutate(gene);
    } else {
      return [gene];
    }
  }

  abstract mutate(gene: Gene<T>): Gene<T>[];
}
