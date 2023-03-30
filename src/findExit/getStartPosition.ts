import { CoordType, DirectionType } from "../types";

export function getStartPosition(arr: string[]) {
  const startVariants = ["<", "^", ">", "v"];
  let startPosition: CoordType = [0, 0];
  let startDirection = "" as DirectionType;
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (startVariants.indexOf(arr[y][x]) >= 0) {
        startPosition = [y, x];
        startDirection = arr[y][x] as DirectionType;
        break;
      }
      if (startDirection) break;
    }
  }

  return {
    startPosition,
    startDirection,
  };
}
