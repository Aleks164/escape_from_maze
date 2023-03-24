import { insertNextDirectionInMap } from "./insertNextDirectionInMap";

export function checkAround(y: number, x: number, arr: string[]) {
  const emptyWay: [number, number][] = [];

  if (arr[y + 1] && arr[y + 1][x] === " ") {
    emptyWay.push([y + 1, x]);
    insertNextDirectionInMap(y + 1, x, "v", arr);
  }
  if (arr[y - 1] && arr[y - 1][x] === " ") {
    emptyWay.push([y - 1, x]);
    insertNextDirectionInMap(y - 1, x, "^", arr);
  }
  if (arr[y][x + 1] === " ") {
    emptyWay.push([y, x + 1]);
    insertNextDirectionInMap(y, x + 1, ">", arr);
  }
  if (arr[y][x - 1] === " ") {
    emptyWay.push([y, x - 1]);
    insertNextDirectionInMap(y, x - 1, "<", arr);
  }
  return emptyWay;
}
