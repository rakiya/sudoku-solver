import * as fs from "fs";
import { BoardFactory } from "../factory/board-factory";

export class SudokuIssueRepository {
  private constructor() {}

  static get(fileName: string) {
    return fs
      .readFileSync(fileName, "utf-8")
      .let((it) => BoardFactory.buildFromString(it));
  }
}
