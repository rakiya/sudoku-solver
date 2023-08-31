import { range } from "@rakiya/tslin";
import { Crossover } from "./crossover/crossover";
import { Mutation } from "./mutation/mutation";
import { Population } from "./organism";
import { Selection } from "./selection/selection";

export interface GeneticAlgorithmParameters {
  readonly maxLoopCount: number;
}
export interface GeneticAlgorithmResult<T> {
  generation: number;
  result: T;
  fitness: number;
  isOptimal: boolean;
}

export class GeneticAlgorithm<T> {
  constructor(
    private population: Population<T>,
    private readonly selection: Selection<T>,
    private readonly crossover: Crossover<T>,
    private readonly mutation: Mutation<T>,
    private readonly parameters: GeneticAlgorithmParameters
  ) {}

  /**
   * 遺伝的アルゴリズムを実行する
   *
   * @returns 現世代で最も最適解に近い解、世代数、最適解か
   */
  *execute(): Generator<GeneticAlgorithmResult<T>> {
    for (const generation of range(1, this.parameters.maxLoopCount + 1)) {
      // 終了条件をチェック
      const mostOptimalIndividual = this.population.getMostOptimalIndividual();
      yield {
        generation,
        result: mostOptimalIndividual.gene.value,
        fitness: mostOptimalIndividual.fitness.value,
        isOptimal: mostOptimalIndividual.isOptimal(),
      };
      if (mostOptimalIndividual.isOptimal()) {
        return;
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
  }
}
