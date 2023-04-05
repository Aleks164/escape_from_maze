import { CoordType } from "../types";

export function getEmptyNeighbor(arr: string[][], curCell: CoordType) {
  const [y, x] = curCell;
  const result: [number, number][] = [];
  if (
    arr[y + 2] &&
    arr[y + 2][x] === " " &&
    y + 2 !== arr.length - 1 &&
    y + 2 !== 0
  ) {
    result.push([y + 2, x]);
  }
  if (
    arr[y - 2] &&
    arr[y - 2][x] === " " &&
    y - 2 !== arr.length - 1 &&
    y - 2 !== 0
  ) {
    result.push([y - 2, x]);
  }
  if (
    arr[y][x + 2] &&
    arr[y][x + 2] === " " &&
    x + 2 !== arr[y].length - 1 &&
    x + 2 !== 0
  ) {
    result.push([y, x + 2]);
  }
  if (
    arr[y][x - 2] &&
    arr[y][x - 2] === " " &&
    x - 2 !== arr[y].length - 1 &&
    x - 2 !== 0
  ) {
    result.push([y, x - 2]);
  }
  return result;
}
