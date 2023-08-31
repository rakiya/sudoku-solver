import { SudokuSolver } from "./domain/solver/sudoku-solver";
import { SudokuIssueRepository } from "./infrastructure/repository/sudoku-issue-repository";

const issue = SudokuIssueRepository.get("./tests/resources/sudoku-issue-1.txt");
const result = new SudokuSolver(issue).execute();
console.log(result?.toString());
