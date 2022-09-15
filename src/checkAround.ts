export function checkAround(y: number, x: number, arr: string[]) {
  function splitter(string: number, coloumn: number, nextDirection: string) {
    console.log("next");
    const newRow = arr[string].split("");
    newRow[coloumn] = nextDirection;
    arr[string] = newRow.join("");
  }

  const emptyWay: [number, number][] = [];

  if (arr[y + 1] && arr[y + 1][x] === " ") {
    emptyWay.push([y + 1, x]);
    splitter(y + 1, x, "v");
  }
  if (arr[y - 1] && arr[y - 1][x] === " ") {
    emptyWay.push([y - 1, x]);
    splitter(y - 1, x, "^");
  }
  if (arr[y][x + 1] === " ") {
    emptyWay.push([y, x + 1]);
    splitter(y, x + 1, ">");
  }
  if (arr[y][x - 1] === " ") {
    emptyWay.push([y, x - 1]);
    splitter(y, x - 1, "<");
  }
  console.log("emptyWay");
  return emptyWay;
}
