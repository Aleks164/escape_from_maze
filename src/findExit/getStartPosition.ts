import { CoordType, DirectionType, MapType } from "../types";

export function getStartPosition(mazeMap: MapType) {
  const startVariants = ["<", "^", ">", "v"];
  let startPosition: CoordType = [0, 0];
  let startDirection = "" as DirectionType;
  for (let y = 0; y < mazeMap.length; y++) {
    for (let x = 0; x < mazeMap[y].length; x++) {
      if (startVariants.indexOf(mazeMap[y][x]) >= 0) {
        startPosition = [y, x];
        startDirection = mazeMap[y][x] as DirectionType;
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
