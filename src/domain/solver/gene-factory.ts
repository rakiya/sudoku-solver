import "@rakiya/tslin";
import { range, repeat } from "@rakiya/tslin";
import clone from "clone";
import { SudokuBoard } from "../sudoku-board";
import { SudokuGene } from "./sudoku-gene";

export class GeneFactory {
  static generateFrom(original: SudokuBoard): SudokuGene {
    return original
      .let((it) => clone(it))
      .also((it) => this.fillBoard(it))
      .let((it) => new SudokuGene(it));
  }

  private static fillBoard(board: SudokuBoard) {
    repeat(3, (r) => {
      repeat(3, (c) => {
        this.fillArea(board, r, c);
      });
    });
  }

  private static fillArea(board: SudokuBoard, row: number, column: number) {
    const notFixed = board
      .getArea(row, column)
      .flat()
      .map((it) => it.value)
      .filter((it) => it !== undefined)
      .let((fixed) =>
        [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((it) => !fixed.includes(it))
      )
      .shuffle();

    for (const r of range(3 * row, 3 * row + 3)) {
      for (const c of range(3 * column, 3 * column + 3)) {
        if (board.isFixed([r, c])) continue;
        board.fill([r, c], notFixed.pop()!);
      }
    }
  }
}
