import {
  Gene,
  Individual,
  Population,
} from "@/domain/genetic-algorithm/organism";
import { SudokuCrossover } from "@/domain/solver/sudoku-crossover";
import { SudokuGene } from "@/domain/solver/sudoku-gene";
import { SudokuBoard } from "@/domain/sudoku-board";
import { SudokuIssueRepository } from "@/infrastructure/repository/sudoku-issue-repository";
import { repeat } from "@rakiya/tslin";

const issue = SudokuIssueRepository.get("./tests/resources/sudoku-issue-1.txt");

const answer = SudokuIssueRepository.get(
  "./tests/resources/sudoku-answer-1.txt"
);

test("顕性遺伝が遺伝する", () => {
  const parent1 = new SudokuBoard(issue.fixed)
    .also((it) => {
      repeat(9, (iRow) => it.setRow(iRow, answer.getRow(iRow)));
    })
    .let((it) => new SudokuGene(it));
  const parent2 = new SudokuBoard(issue.fixed)
    .also((it) => {
      repeat(9, (iRow) => it.setRow(iRow, answer.getRow(iRow)));
    })
    .also((it) => {
      // テキトーに間違える
      it.fill([0, 1], 1);
      it.fill([4, 4], 2);
      it.fill([8, 7], 8);
    })
    .let((it) => new SudokuGene(it));

  const children = new SudokuCrossover({ crossOverRate: 1 }).execute([
    parent1,
    parent2,
  ]);
  expect(children[0].value).toEqual(children[1].value);
  expect(children[0].value.toString()).toEqual(answer.toString());
});
