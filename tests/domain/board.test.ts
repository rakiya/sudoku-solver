import * as TestData from "%/helper/test-data";
import { Square } from "@/domain/sudoku-board";
import { SudokuIssueRepository } from "@/infrastructure/repository/sudoku-issue-repository";

const board = SudokuIssueRepository.get("./tests/resources/sudoku-issue-1.txt");

describe("getColumn", () => {
  test("0 から 8 までを引数に取る", () => {
    expect(() => board.getColumn(-1)).toThrow("範囲外です : -1");
    expect(() => board.getColumn(9)).toThrow("範囲外です : 9");
  });

  test("列を取得する", () => {
    const column = board.getColumn(0);
    expect(column).toEqual([
      new Square(8),
      new Square(undefined),
      new Square(undefined),
      new Square(undefined),
      new Square(1),
      new Square(6),
      new Square(undefined),
      new Square(undefined),
      new Square(undefined),
    ]);
  });
});

describe("getRow", () => {
  test("0 から 8 までを引数に取る", () => {
    expect(() => board.getRow(-1)).toThrow("範囲外です : -1");
    expect(() => board.getRow(9)).toThrow("範囲外です : 9");
  });

  test("列を取得する", () => {
    const column = board.getRow(0);
    expect(column).toEqual([
      new Square(8),
      new Square(undefined),
      new Square(undefined),
      new Square(undefined),
      new Square(undefined),
      new Square(5),
      new Square(1),
      new Square(undefined),
      new Square(undefined),
    ]);
  });
});

describe("getArea", () => {
  test("0 から 2 までを引数に取る", () => {
    expect(() => board.getArea(-1, 0)).toThrow("範囲外です : -1");
    expect(() => board.getArea(3, 0)).toThrow("範囲外です : 3");
    expect(() => board.getArea(0, -1)).toThrow("範囲外です : -1");
    expect(() => board.getArea(0, 3)).toThrow("範囲外です : 3");
  });

  test("列を取得する", () => {
    const column = board.getArea(2, 1);
    expect(column).toEqual([
      [new Square(undefined), new Square(undefined), new Square(9)],
      [new Square(undefined), new Square(undefined), new Square(undefined)],
      [new Square(6), new Square(undefined), new Square(undefined)],
    ]);
  });
});
