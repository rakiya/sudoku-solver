import { repeat } from "@rakiya/tslin";
import clone from "clone";
import {
  Mutation,
  MutationParameters,
} from "../genetic-algorithm/mutation/mutation";
import { Gene } from "../genetic-algorithm/organism";
import { SudokuBoard } from "../sudoku-board";

export interface SudokuMutationParameters extends MutationParameters {
  readonly areaMutationRate: number;
}

export class SudokuMutation extends Mutation<SudokuBoard> {
  private readonly areaMutationRate: number;

  constructor(parameters: SudokuMutationParameters) {
    super(parameters);
    this.areaMutationRate = parameters.areaMutationRate;
  }

  mutate(gene: Gene<SudokuBoard>): Gene<SudokuBoard>[] {
    return [
      clone(gene).also((it) => this.mutateGene(it)),
      clone(gene).also((it) => this.mutateGene(it)),
    ];
  }

  private mutateGene(gene: Gene<SudokuBoard>) {
    repeat(3, (iRow) => {
      repeat(3, (iColumn) => {
        if (Math.random() < this.areaMutationRate) {
          this.mutateArea(gene, iRow, iColumn);
        }
      });
    });
  }

  private mutateArea(
    gene: Gene<SudokuBoard>,
    iAreaRow: number,
    iAreaColumn: number
  ) {
    const squareNotFixed: [number, number][] = [];
    repeat(3, (iRow) => {
      repeat(3, (iColumn) => {
        const axis: [number, number] = [
          3 * iAreaRow + iRow,
          3 * iAreaColumn + iColumn,
        ];
        if (!gene.value.isFixed(axis)) {
          squareNotFixed.push(axis);
        }
      });
    });

    const squareAxis1 = squareNotFixed.sample()[0];
    const squareAxis2 = squareNotFixed.sample()[0];

    const square1 = gene.value.getSquare(squareAxis1);
    const square2 = gene.value.getSquare(squareAxis2);

    gene.value.fill(squareAxis1, square2.value!);
    gene.value.fill(squareAxis2, square1.value!);
  }
}
