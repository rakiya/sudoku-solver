import { range } from "@rakiya/tslin";
import { GeneticAlgorithm } from "../genetic-algorithm/genetic-algorithm";
import { Population } from "../genetic-algorithm/organism";
import { TournamentSelection } from "../genetic-algorithm/selection/tournament-selection";
import { SudokuBoard } from "../sudoku-board";
import { GeneFactory } from "./gene-factory";
import { SudokuCrossover } from "./sudoku-crossover";
import { SudokuMutation } from "./sudoku-mutation";

export class SudokuSolver {
  private readonly geneticAlgorithm: GeneticAlgorithm<SudokuBoard>;

  constructor(original: SudokuBoard) {
    const population = new Population<SudokuBoard>(150);
    [...range(0, 150)]
      .map((_) => GeneFactory.generateFrom(original))
      .forEach((it) => population.add(it));

    this.geneticAlgorithm = new GeneticAlgorithm<SudokuBoard>(
      population,
      new TournamentSelection({ nSample: 10, nResult: 2 }),
      new SudokuCrossover({ crossOverRate: 0.3 }),
      new SudokuMutation({ mutationRate: 1, areaMutationRate: 0.3 }),
      { maxLoopCount: 20000 }
    );
  }

  execute(): SudokuBoard | undefined {
    // return undefined;
    return this.geneticAlgorithm.execute();
  }
}
