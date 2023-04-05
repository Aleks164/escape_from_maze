import { CoordType } from "../types";

export function brakeNaighborWall(
  mazeMap: string[][],
  curCell: CoordType,
  nextCell: CoordType
) {
  const [y, x] = curCell;
  if (curCell[0] > nextCell[0] && mazeMap[y - 1]) {
    mazeMap[y - 1][x] = " ";
  }
  if (curCell[0] < nextCell[0] && mazeMap[y + 1]) {
    mazeMap[y + 1][x] = " ";
  }
  if (curCell[1] > nextCell[1] && mazeMap[y][x - 1]) {
    mazeMap[y][x - 1] = " ";
  }
  if (curCell[1] < nextCell[1] && mazeMap[y][x + 1]) {
    mazeMap[y][x + 1] = " ";
  }
  return mazeMap;
}
