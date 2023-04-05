import { CoordType, MapType } from "../../types";
import { insertNextDirectionInMap } from "./insertNextDirectionInMap";

export function checkAround(y: number, x: number, mazeMap: MapType) {
  const emptyWay: CoordType[] = [];

  if (mazeMap[y + 1] && mazeMap[y + 1][x] === " ") {
    emptyWay.push([y + 1, x]);
    insertNextDirectionInMap(y + 1, x, "v", mazeMap);
  }
  if (mazeMap[y - 1] && mazeMap[y - 1][x] === " ") {
    emptyWay.push([y - 1, x]);
    insertNextDirectionInMap(y - 1, x, "^", mazeMap);
  }
  if (mazeMap[y][x + 1] === " ") {
    emptyWay.push([y, x + 1]);
    insertNextDirectionInMap(y, x + 1, ">", mazeMap);
  }
  if (mazeMap[y][x - 1] === " ") {
    emptyWay.push([y, x - 1]);
    insertNextDirectionInMap(y, x - 1, "<", mazeMap);
  }
  return emptyWay;
}
