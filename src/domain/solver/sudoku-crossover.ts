import { range, repeat } from "@rakiya/tslin";
import { Crossover } from "../genetic-algorithm/crossover/crossover";
import { Gene } from "../genetic-algorithm/organism";
import { SudokuBoard } from "../sudoku-board";
import { SudokuGene } from "./sudoku-gene";

export class SudokuCrossover extends Crossover<SudokuBoard> {
  protected crossOver(parents: Gene<SudokuBoard>[]): Gene<SudokuBoard>[] {
    if (this.parameters.crossOverRate < Math.random()) {
      return parents;
    }

    return [
      this.crossOverByRow(parents),
      this.crossOverByColumn(parents),
    ].flat();
  }

  private crossOverByRow(parents: Gene<SudokuBoard>[]): Gene<SudokuBoard> {
    const parent1 = parents[0];
    const parent2 = parents[1];

    const child = new SudokuBoard(parent1.value.fixed);

    repeat(3, (iAreaRow) => {
      // 顕性遺伝する親
      let dominantParent: Gene<SudokuBoard> =
        this.evaluateAreaRow(parent1, iAreaRow) <
        this.evaluateAreaRow(parent2, iAreaRow)
          ? parent1
          : parent2;

      child.setRow(
        0 + 3 * iAreaRow,
        dominantParent.value.getRow(0 + 3 * iAreaRow)
      );
      child.setRow(
        1 + 3 * iAreaRow,
        dominantParent.value.getRow(1 + 3 * iAreaRow)
      );
      child.setRow(
        2 + 3 * iAreaRow,
        dominantParent.value.getRow(2 + 3 * iAreaRow)
      );
    });

    return new SudokuGene(child);
  }

  private crossOverByColumn(parents: Gene<SudokuBoard>[]): Gene<SudokuBoard> {
    const parent1 = parents[0];
    const parent2 = parents[1];

    const child = new SudokuBoard(parent1.value.fixed);

    repeat(3, (iAreaColumn) => {
      // 顕性遺伝する親
      let dominantParent: Gene<SudokuBoard> =
        this.evaluateAreaColumn(parent1, iAreaColumn) <
        this.evaluateAreaColumn(parent2, iAreaColumn)
          ? parent1
          : parent2;

      child.setColumn(
        0 + 3 * iAreaColumn,
        dominantParent.value.getColumn(0 + 3 * iAreaColumn)
      );
      child.setColumn(
        1 + 3 * iAreaColumn,
        dominantParent.value.getColumn(1 + 3 * iAreaColumn)
      );
      child.setColumn(
        2 + 3 * iAreaColumn,
        dominantParent.value.getColumn(2 + 3 * iAreaColumn)
      );
    });

    return new SudokuGene(child);
  }

  private evaluateAreaRow(gene: Gene<SudokuBoard>, nAreaRow: number): number {
    const countKindOfNumbers = [...range(0, 3)]
      .map((nRow) => {
        return gene.value
          .getRow(nRow + 3 * nAreaRow)
          .map((it) => it.value)
          .let((it) => new Set(it)).size;
      })
      .reduce((sum, it) => sum + it, 0);

    return 27 - countKindOfNumbers;
  }

  private evaluateAreaColumn(
    gene: Gene<SudokuBoard>,
    nAreaColumn: number
  ): number {
    const countKindOfNumbers = [...range(0, 3)]
      .map((nColumn) => {
        return gene.value
          .getColumn(nColumn + 3 * nAreaColumn)
          .map((it) => it.value)
          .let((it) => new Set(it)).size;
      })
      .reduce((sum, it) => sum + it, 0);

    return 27 - countKindOfNumbers;
  }
}
