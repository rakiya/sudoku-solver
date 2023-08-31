import { SudokuSolver } from "@/domain/solver/sudoku-solver";
import { SudokuIssueRepository } from "@/infrastructure/repository/sudoku-issue-repository";

test("例題を解くことができる", () => {
  const issue = SudokuIssueRepository.get(
    "./tests/resources/sudoku-issue-1.txt"
  );
  const answer = SudokuIssueRepository.get(
    "./tests/resources/sudoku-answer-1.txt"
  );

  const result = new SudokuSolver(issue).execute();

  expect(result?.toString()).toEqual(answer.toString());
}, 600000);
