import { brakeNaighborWall } from "./brakeNaighborWall";
import { getNextCellCoord } from "./getNextCellCoord";
import { getEmptyNeighbor } from "./getEmptyNeighbor";
import { getRandomBorderPosition } from "./getRandomBorderPosition";

export function mazeGenerator(arr: string[][]) {
  const startCell: [number, number] = [1, 1];
  let curCell = startCell;
  const cellsWithEmptyNeighborStack = [startCell];

  while (cellsWithEmptyNeighborStack.length) {
    arr[curCell[0]][curCell[1]] = "*";
    const emptyNeighbors = getEmptyNeighbor(arr, curCell);
    if (emptyNeighbors.length === 0) {
      curCell = cellsWithEmptyNeighborStack.shift() as [number, number];
      // eslint-disable-next-line no-continue
      continue;
    } else if (emptyNeighbors.length > 1) {
      cellsWithEmptyNeighborStack.push(curCell);
    }

    const nextCell = getNextCellCoord(emptyNeighbors);
    brakeNaighborWall(arr, curCell, nextCell);
    curCell = nextCell;
  }
  const start = getRandomBorderPosition(arr.length);
  arr[start][1] = ">";
  const resultArr = arr.map((el) => el.join("").replaceAll("*", " "));
  return resultArr;
}
