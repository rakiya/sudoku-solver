import { range } from "@rakiya/tslin";
import { Crossover } from "./crossover/crossover";
import { EvaluationFunction } from "./evaluation/evaluation-function";
import { Mutation } from "./mutation/mutation";
import { Gene, Population } from "./organism";
import { Selection } from "./selection/selection";

export interface GeneticAlgorithmParameters<T> {
  readonly maxLoopCount: number;
}

export class GeneticAlgorithm<T> {
  constructor(
    private population: Population<T>,
    private readonly selection: Selection<T>,
    private readonly crossover: Crossover<T>,
    private readonly mutation: Mutation<T>,
    private readonly parameters: GeneticAlgorithmParameters<T>
  ) {}

  execute(): T | undefined {
    for (const iGeneration of range(0, this.parameters.maxLoopCount)) {
      console.log(
        `世代: ${iGeneration}`,
        `評価値: ${this.population.bestFitness?.fitness?.value} ~ ${this.population.worstFitness?.fitness?.value}`
      );

      // 終了条件をチェック
      const individualThatIsNotViolation =
        this.population.findOptimalIndividual();
      if (individualThatIsNotViolation) {
        return individualThatIsNotViolation.gene.value;
      }

      // 次世代の集団を生成
      const nextGeneration = new Population<T>(this.population.maxSize);
      while (nextGeneration.size < this.population.size) {
        this.population
          .selectParentsBy(this.selection)
          .let((it) => this.crossover.execute(it))
          .flatMap((it) => this.mutation.execute(it))
          .forEach((it) => nextGeneration.add(it));
      }

      // 次世代に置き換え
      this.population = nextGeneration;
    }

    return this.population.findOptimalIndividual()?.gene.value;
  }
}
