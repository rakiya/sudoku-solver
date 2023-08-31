import { SudokuSolver } from "./domain/solver/sudoku-solver";
import { SudokuIssueRepository } from "./infrastructure/repository/sudoku-issue-repository";

function main() {
  if (process.argv.length !== 3) {
    console.log("ファイルが指定されていません: npm run solve <file-name>");
    return;
  }

  const issueFile = process.argv[2];
  const issue = SudokuIssueRepository.get(issueFile);
  const result = new SudokuSolver(issue).execute();

  console.log("解答");
  console.log(result?.toString());
}

main();
