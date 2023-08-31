import { range } from "@rakiya/tslin";
import { Fitness, Gene } from "../genetic-algorithm/organism";
import { Square, SudokuBoard } from "../sudoku-board";

export class SudokuGene extends Gene<SudokuBoard> {
  evaluateFitness(): Fitness {
    const countOfRowNumbers = [...range(0, 9)]
      .map((iRow) => this.value.getRow(iRow).let((it) => this.evaluateLine(it)))
      .reduce((sum, it) => it + sum, 0);

    const countOfColumnNumbers = [...range(0, 9)]
      .map((iColumn) =>
        this.value.getColumn(iColumn).let((it) => this.evaluateLine(it))
      )
      .reduce((sum, it) => sum + it, 0);

    // 行数（列数） * 一行のマスの数 * 列と行の 2 つ
    return new Fitness(9 * 9 * 2 - (countOfRowNumbers + countOfColumnNumbers));
  }

  private evaluateLine(line: Square[]): number {
    return line.map((it) => it.value as number).let((it) => new Set(it).size);
  }
}
