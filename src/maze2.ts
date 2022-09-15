import "./style.css";

function maze(arr: string[]) {
  let startX = 0;
  let startY = 0;
  const startVariants = ["<", "^", ">", "v"];
  let startDirection = "";
  let trueWay: any[] = [];

  let listOfCrosses = [];

  for (let y = 0; y < arr.length; y++) {
    let x = -1;
    startVariants.forEach((el) => {
      const check = arr[y].indexOf(el);
      if (check !== -1) x = check;
    });
    if (x !== -1) {
      startX = x;
      startY = y;
      startDirection = arr[y][x];
      break;
    }
  }
  let jurneyLog = { [`${startY}-${startX}`]: { way: [], target: "start" } };

  listOfCrosses.push([startY, startX]);

  function checkAround(y: number, x: number) {
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

  function makeStep(
    curDirection: string,
    curPosition: [number, number],
    NextPosition: [number, number]
  ) {
    let nextDirection = "";
    let stepLog = [];
    if (curPosition[0] > NextPosition[0]) nextDirection = "^"; //top
    if (curPosition[0] < NextPosition[0]) nextDirection = "v"; //bottom

    if (curPosition[1] > NextPosition[1]) nextDirection = "<"; //left
    if (curPosition[1] < NextPosition[1]) nextDirection = ">"; //right

    if (curDirection === nextDirection) stepLog.push("F");
    else if (curDirection === ">") {
      if (nextDirection === "<") stepLog.push("B", "F");
      if (nextDirection === "^") stepLog.push("L", "F");
      if (nextDirection === "v") stepLog.push("R", "F");
    } else if (curDirection === "<") {
      if (nextDirection === ">") stepLog.push("B", "F");
      if (nextDirection === "v") stepLog.push("L", "F");
      if (nextDirection === "^") stepLog.push("R", "F");
    } else if (curDirection === "v") {
      if (nextDirection === "^") stepLog.push("B", "F");
      if (nextDirection === "<") stepLog.push("R", "F");
      if (nextDirection === ">") stepLog.push("L", "F");
    } else if (curDirection === "^") {
      if (nextDirection === "v") stepLog.push("B", "F");
      if (nextDirection === ">") stepLog.push("R", "F");
      if (nextDirection === "<") stepLog.push("L", "F");
    }
    //  let newRow =  arr[curPosition[0]].split("");
    //  newRow[curPosition[1]] = nextDirection;
    //  arr[curPosition[0]]=newRow.join("");
    return [stepLog, nextDirection];
  }

  let [firstNextY, firstNextX] = checkAround(startY, startX)[0];
  let stepsRow = [];
  stepsRow.push(
    makeStep(startDirection, [startY, startX], [firstNextY, firstNextX])
  );
  while (listOfCrosses.length) {
    let curWay: string[] = [];
    let curStep = listOfCrosses.shift() as number[];
    const x = curStep[1];
    const y = curStep[0];
    const variants = checkAround(y, x);
    const nextX = variants[0][1];
    const nextY = variants[0][0];

    if (variants.length > 1) {
      listOfCrosses.push(...variants.splice(1, variants.length - 1));
    }
  }
}

// console.log(maze(["####### #", "#>#   # #", "#   #   #", "#########"]));
