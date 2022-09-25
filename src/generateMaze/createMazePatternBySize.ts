import { getRandomBorderPosition } from "./getRandomBorderPosition";

export function createMazePatternBySize(width: number, height: number) {
  const widthWithBorder = width * 2 + 1;
  const heightWithBorder = height * 2 + 1;
  let rowsArray = Array(heightWithBorder).fill("");

  const end = getRandomBorderPosition(heightWithBorder);
  rowsArray = rowsArray.map((_, i, arr) => {
    if (i === 0 || i === arr.length - 1 || i % 2 === 0)
      return Array(widthWithBorder).fill("#");

    return Array(widthWithBorder)
      .fill(" ")
      .map((col, index, arrCol) => {
        if (i === end && index === widthWithBorder - 1) return " ";
        if (index % 2 === 0 || index === 0 || index === arrCol.length - 1)
          return "#";
        return `${col}`;
      });
  });
  return rowsArray;
}
