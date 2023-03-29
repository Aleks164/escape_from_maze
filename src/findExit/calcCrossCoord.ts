import { CoordType, DirectionType } from "../types";

export function calcCrossCoord(direction: DirectionType, coord: CoordType) {
  let resultCoord: CoordType[] = [];
  const x = coord[1];
  const y = coord[0];
  if (direction === ">") {
    resultCoord = resultCoord.concat([y, x - 1]);
  }
  if (direction === "<") {
    resultCoord = resultCoord.concat([y, x + 1]);
  }
  if (direction === "^") {
    resultCoord = resultCoord.concat([y + 1, x]);
  }
  if (direction === "v") {
    resultCoord = resultCoord.concat([y - 1, x]);
  }
  return resultCoord;
}
