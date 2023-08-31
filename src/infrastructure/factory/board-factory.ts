import { SudokuBoard, Square } from "@/domain/sudoku-board";
import "@rakiya/tslin";

export class BoardFactory {
  private constructor() {}

  static build(board: (number | undefined)[][]): SudokuBoard {
    return board
      .map((row) => row.map((square) => new Square(square)))
      .let((it) => new SudokuBoard(it));
  }

  static buildFromString(board: string): SudokuBoard {
    return board
      .split("\n")
      .map((str) => [...str])
      .map((row) =>
        row.map((it) => new Square(it === "-" ? undefined : Number(it)))
      )
      .let((it) => new SudokuBoard(it));
  }
}
