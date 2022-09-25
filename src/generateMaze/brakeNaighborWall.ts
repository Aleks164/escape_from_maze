export function brakeNaighborWall(
  arr: string[][],
  curCell: [number, number],
  nextCell: [number, number]
) {
  const [y, x] = curCell;
  if (curCell[0] > nextCell[0] && arr[y - 1]) {
    arr[y - 1][x] = " ";
  }
  if (curCell[0] < nextCell[0] && arr[y + 1]) {
    arr[y + 1][x] = " ";
  }
  if (curCell[1] > nextCell[1] && arr[y][x - 1]) {
    arr[y][x - 1] = " ";
  }
  if (curCell[1] < nextCell[1] && arr[y][x + 1]) {
    arr[y][x + 1] = " ";
  }
  return arr;
}
