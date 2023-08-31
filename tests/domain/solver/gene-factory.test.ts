import { GeneFactory } from "@/domain/solver/gene-factory";
import { SudokuIssueRepository } from "@/infrastructure/repository/sudoku-issue-repository";
import { range } from "@rakiya/tslin";

const original = SudokuIssueRepository.get(
  "./tests/resources/sudoku-issue-1.txt"
);

describe("build", () => {
  it("complete board", () => {
    const board = GeneFactory.generateFrom(original);
    for (const r of range(0, 9)) {
      for (const c of range(0, 9)) {
        expect(
          board.value.fixed[r][c].isNotEmpty() ||
            board.value.answer[r][c].isNotEmpty()
        ).toEqual(true);
      }
    }
  });

  it("has the numbers 1 to 9 without duplication in the area", () => {
    const board = GeneFactory.generateFrom(original);
    for (const r of range(0, 3)) {
      for (const c of range(0, 3)) {
        const numbersInArea = new Set(
          board.value
            .getArea(r, c)
            .flat()
            .map((it) => it.value)
        );
        expect(numbersInArea.size).toEqual(9);
      }
    }
  });
});
