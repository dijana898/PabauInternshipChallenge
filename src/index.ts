import { Matrix, matrix } from "./test";

function Route(matrix: Matrix): { path: string; letters: string } {
  let path = "";
  let letters = "";
  let currRow = 0;
  let currCol = 0;
  let direction = "right";

  while (matrix[currRow][currCol] !== "s") {
    const currSymbol = matrix[currRow][currCol];
    if (/[A-Z]/.test(currSymbol)) {
      letters += currSymbol;
    } else if (currSymbol === "+" || /[A-Z]/.test(currSymbol)) {
      direction = getNextDirection(matrix, currRow, currCol, direction);
    }

    path += currSymbol;

    switch (direction) {
      case "up":
        currRow--;
        break;
      case "down":
        currRow++;
        break;
      case "left":
        currCol--;
        break;
      case "right":
        currCol++;
        break;
      default:
        throw new Error("Invalid direction");
    }
  }
  return { path, letters };
}

function getNextDirection(
  matrix: Matrix,
  row: number,
  col: number,
  currDir: string
): string {
  const directions: { [key: string]: string[] } = {
    up: ["left", "right"],
    down: ["left", "right"],
    left: ["up", "down"],
    right: ["up", "down"],
  };

  const [nextRow, nextCol] = getNextPosition(row, col, currDir);
  if (isValidPosition(matrix, nextRow, nextCol)) {
    return currDir;
  }

  for (const nextDir of directions[currDir]) {
    const [nextRow, nextCol] = getNextPosition(row, col, nextDir);
    if (isValidPosition(matrix, nextRow, nextCol)) {
      return nextDir;
    }
  }

  throw new Error("No valid direction found");
}

function getNextPosition(
  row: number,
  col: number,
  direction: string
): [number, number] {
  switch (direction) {
    case "up":
      return [row - 1, col];
    case "down":
      return [row + 1, col];
    case "left":
      return [row, col - 1];
    case "right":
      return [row, col + 1];
    default:
      throw new Error("Invalid direction");
  }
}

function isValidPosition(matrix: Matrix, row: number, col: number): boolean {
  return (
    row >= 0 &&
    row < matrix.length &&
    col >= 0 &&
    col < matrix[row].length &&
    matrix[row][col] !== " "
  );
}

const result = Route(matrix);
console.log("Path:", result.path);
console.log("Letters:", result.letters);
