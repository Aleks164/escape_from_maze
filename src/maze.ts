import "./style.css";

function escape(arr: string[]) {
  let startX = 0;
  let startY = 0;
  const startVariants = ["<", "^", ">", "v"];
  let startPosition = "";
  let trueWay: any[] = [];

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (startVariants.indexOf(arr[y][x]) >= 0) {
        startX = x;
        startY = y;
        startPosition = arr[y][x];
        break;
      }
      if (startPosition) break;
    }
  }

  function checkAround(y: number, x: number, arr: string[]) {
    function splitter(string: number, coloumn: number, nextDirection: string) {
      const newRow = arr[string].split("");
      newRow[coloumn] = nextDirection;
      arr[string] = newRow.join("");
    }
    const emptyWay = [];
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
    return emptyWay;
  }

  let listOfCrosses = [[startY, startX]];
  function calcNextDirection(y: number, x: number) {
    if (arr[y + 1] && arr[y + 1][x] === " ") {
      return "v";
    }
    if (arr[y - 1] && arr[y - 1][x] === " ") {
      return "^";
    }
    if (arr[y][x + 1] === " ") {
      return ">";
    }
    return "<";
  }

  const curDirection = startPosition;
  const nextDirection = calcNextDirection(startY, startX);
  if (curDirection !== nextDirection) {
    if (curDirection === ">") {
      if (nextDirection === "<") trueWay.push("B", "F");
      if (nextDirection === "^") trueWay.push("L", "F");
      if (nextDirection === "v") trueWay.push("R", "F");
    } else if (curDirection === "<") {
      if (nextDirection === ">") trueWay.push("B", "F");
      if (nextDirection === "v") trueWay.push("L", "F");
      if (nextDirection === "^") trueWay.push("R", "F");
    } else if (curDirection === "v") {
      if (nextDirection === "^") trueWay.push("B", "F");
      if (nextDirection === "<") trueWay.push("R", "F");
      if (nextDirection === ">") trueWay.push("L", "F");
    } else if (curDirection === "^") {
      if (nextDirection === "v") trueWay.push("B", "F");
      if (nextDirection === ">") trueWay.push("R", "F");
      if (nextDirection === "<") trueWay.push("L", "F");
    }
  } else {
    trueWay.push("F");
  }

  const newRow = arr[startY].split("");
  newRow[startX] = calcNextDirection(startY, startX);
  arr[startY] = newRow.join("");

  function calcCurDirection(nextY: number, nextX: number) {
    let direection = arr[nextY][nextX];
    if (direection === ">") return arr[nextY][nextX - 1];
    if (direection === "<") return arr[nextY][nextX + 1];
    if (direection === "^") return arr[nextY + 1][nextX];
    return arr[nextY - 1][nextX];
  }

  function checkDirection(
    checkWayArray: string[],
    curDirection: string,
    y: number,
    x: number
  ) {
    // let thisIsTheWay: any[] = [];
    // let isFinish = false;
    // let isDeadEnd = false;
    // while (!isFinish) {
  }

  let thisIsTheWay: any[] = [];
  function getNextStepDirection(
    curPosition: [number, number],
    NextPosition: [number, number]
  ) {
    let nextDirection = "";
    if (curPosition[0] > NextPosition[0]) nextDirection = "^"; //top
    if (curPosition[0] < NextPosition[0]) nextDirection = "v"; //bottom
    if (curPosition[1] > NextPosition[1]) nextDirection = "<"; //left
    if (curPosition[1] < NextPosition[1]) nextDirection = ">"; //right

    if (curDirection === nextDirection) thisIsTheWay.push("F");
    else if (curDirection === ">") {
      if (nextDirection === "<") thisIsTheWay.push("B", "F");
      if (nextDirection === "^") thisIsTheWay.push("L", "F");
      if (nextDirection === "v") thisIsTheWay.push("R", "F");
    } else if (curDirection === "<") {
      if (nextDirection === ">") thisIsTheWay.push("B", "F");
      if (nextDirection === "v") thisIsTheWay.push("L", "F");
      if (nextDirection === "^") thisIsTheWay.push("R", "F");
    } else if (curDirection === "v") {
      if (nextDirection === "^") thisIsTheWay.push("B", "F");
      if (nextDirection === "<") thisIsTheWay.push("R", "F");
      if (nextDirection === ">") thisIsTheWay.push("L", "F");
    } else if (curDirection === "^") {
      if (nextDirection === "v") thisIsTheWay.push("B", "F");
      if (nextDirection === ">") thisIsTheWay.push("R", "F");
      if (nextDirection === "<") thisIsTheWay.push("L", "F");
    }
    // console.log(curPosition, NextPosition, curDirection, nextDirection);
    return nextDirection;
  }

  // while (listOfCrosses.length) {
  const attempt = listOfCrosses.shift() as number[];

  // checkDirection(
  //   arr,
  //   calcCurDirection(attempt[0], attempt[1]),
  //   attempt[0],
  //   attempt[1]
  // );
  // }
  console.log(arr);
  return trueWay;
}

console.log(
  escape([
    "#########################################",
    "#<    #       #     #         # #   #   #",
    "##### # ##### # ### # # ##### # # # ### #",
    "# #   #   #   #   #   # #     #   #   # #",
    "# # # ### # ########### # ####### # # # #",
    "#   #   # # #       #   # #   #   # #   #",
    "####### # # # ##### # ### # # # #########",
    "#   #     # #     # #   #   # # #       #",
    "# # ####### ### ### ##### ### # ####### #",
    "# #             #   #     #   #   #   # #",
    "# ############### ### ##### ##### # # # #",
    "#               #     #   #   #   # #   #",
    "##### ####### # ######### # # # ### #####",
    "#   # #   #   # #         # # # #       #",
    "# # # # # # ### # # ####### # # ### ### #",
    "# # #   # # #     #   #     # #     #   #",
    "# # ##### # # ####### # ##### ####### # #",
    "# #     # # # #   # # #     # #       # #",
    "# ##### ### # ### # # ##### # # ### ### #",
    "#     #     #     #   #     #   #   #    ",
    "#########################################"
  ])
);
