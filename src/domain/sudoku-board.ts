import "@rakiya/tslin";
import { range, repeat } from "@rakiya/tslin";

export class Square {
  constructor(readonly value: number | undefined) {
    if (![undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(value)) {
      throw Error(`マス目に 1 ~ 9 以外の整数が設定されています : ${value}`);
    }
  }

  isEmpty() {
    return this.value === undefined;
  }

  isNotEmpty() {
    return this.value !== undefined;
  }
}

export class SudokuBoard {
  readonly answer: Square[][];

  constructor(readonly fixed: Square[][]) {
    if (fixed.length !== 9) {
      throw Error(`行数が 9 行ではありません : ${fixed.length}`);
    }
    fixed.forEach((row) => {
      if (row.length !== 9) {
        throw Error(`列数が 9 列ではありません : ${fixed.length}`);
      }
    });

    this.answer = new Array(9);
    repeat(9, (i) => {
      this.answer[i] = [
        new Square(undefined),
        new Square(undefined),
        new Square(undefined),
        new Square(undefined),
        new Square(undefined),
        new Square(undefined),
        new Square(undefined),
        new Square(undefined),
        new Square(undefined),
      ];
    });
  }

  setColumn(nLine: number, row: Square[]) {
    repeat(9, (iRow) => {
      this.answer[iRow][nLine] = row[iRow];
    });
  }

  getColumn(nLine: number): Square[] {
    if (!(0 <= nLine && nLine <= 8)) {
      throw Error(`範囲外です : ${nLine}`);
    }

    const fixedColumn = this.fixed.map((row) => row[nLine]);
    const answerColumn = this.answer.map((row) => row[nLine]);
    const column = new Array(9);
    repeat(9, (nRow) => {
      if (fixedColumn[nRow].isNotEmpty()) {
        column[nRow] = fixedColumn[nRow];
      } else {
        column[nRow] = answerColumn[nRow];
      }
    });

    return column;
  }

  setRow(nLine: number, row: Square[]) {
    repeat(9, (iColumn) => {
      this.answer[nLine][iColumn] = row[iColumn];
    });
  }

  getRow(nLine: number): Square[] {
    if (!(0 <= nLine && nLine <= 8)) {
      throw Error(`範囲外です : ${nLine}`);
    }

    const fixedRow = this.fixed[nLine];
    const answerRow = this.answer[nLine];
    const row = new Array(9);
    repeat(9, (nColumn) => {
      if (fixedRow[nColumn].isNotEmpty()) {
        row[nColumn] = fixedRow[nColumn];
      } else {
        row[nColumn] = answerRow[nColumn];
      }
    });

    return row;
  }

  setArea(nRow: number, nColumn: number, area: Square[][]) {
    repeat(3, (iRow) => {
      repeat(3, (iColumn) => {
        this.answer[3 * nRow + iRow][3 * nColumn + iColumn] =
          area[iRow][iColumn];
      });
    });
  }

  getArea(nRow: number, nColumn: number): Square[][] {
    if (!(0 <= nRow && nRow <= 2)) {
      throw Error(`範囲外です : ${nRow}`);
    }
    if (!(0 <= nColumn && nColumn <= 2)) {
      throw Error(`範囲外です : ${nColumn}`);
    }
    const fixedArea = this.fixed
      .map((row) => row.slice(3 * nColumn, 3 * (nColumn + 1)))
      .let((board: any) => board.slice(3 * nRow, 3 * (nRow + 1)));
    const answerArea = this.answer
      .map((row) => row.slice(3 * nColumn, 3 * (nColumn + 1)))
      .let((board: any) => board.slice(3 * nRow, 3 * (nRow + 1)));
    const area = [new Array(3), new Array(3), new Array(3)];

    repeat(3, (nRow) => {
      repeat(3, (nColumn) => {
        if (fixedArea[nRow][nColumn].isNotEmpty()) {
          area[nRow][nColumn] = fixedArea[nRow][nColumn];
        } else {
          area[nRow][nColumn] = answerArea[nRow][nColumn];
        }
      });
    });

    return area;
  }

  getSquare(axios: [number, number]): Square {
    const nRow = axios[0];
    const nColumn = axios[1];
    if (this.fixed[nRow][nColumn].isNotEmpty()) {
      return this.fixed[nRow][nColumn];
    } else {
      return this.answer[nRow][nColumn];
    }
  }

  isFixed(axios: [number, number]): boolean {
    return this.fixed[axios[0]][axios[1]].isNotEmpty();
  }

  fill(axios: [number, number], answer: number) {
    if (this.fixed[axios[0]][axios[1]].isNotEmpty()) {
      throw Error("固定値が入っています");
    }
    this.answer[axios[0]][axios[1]] = new Square(answer);
  }

  toString(): string {
    return [
      "- - - - - - - - - - - - - - - - - - -",
      [...range(0, 9)]
        .map((r) =>
          this.getRow(r)
            .map((it) => `${it.value || " "}`)
            .join(" | ")
            .let((it) => `| ${it} |`)
        )
        .join("\n- - - - - - - - - - - - - - - - - - -\n"),
      "- - - - - - - - - - - - - - - - - - -",
    ].join("\n");
  }
}
