import { getStartPosition } from "./getStartPosition";
import { doStep } from "./doStep";
import { getMazeMarkup } from "./getMazeMarkup";
import { calcCrossCoord } from "./calcCrossCoord";
import { calcShortWay } from "./calcShortWay";
import { createMazePatternBySize } from "../generateMaze/createMazePatternBySize";
import { mazeGenerator } from "../generateMaze/mazeGenerator";

export type CoordType = [number, number];
export type MapType = string[];

export type CrossesItemType = {
  [key: string]: {
    way: string[];
    from: null | string;
    coord: CoordType[];
  };
};
let startMaze: MapType;
let mazeMap: MapType;
let startPosition: CoordType;
let startDirection: string;
let coordList: CoordType[];
let currentWay: string[];
let listOfCrosses: CoordType[];
let crossingsParamArray: CrossesItemType[];
let prev: string;
let mazeContent: string;
let isEscaped: boolean;
const mazeEl = document.getElementById("maze");
resetStartParams();

function resetStartParams() {
  startPosition;
  startDirection;
  coordList = [];
  currentWay = [];
  listOfCrosses = [];
  crossingsParamArray = [{ start: { way: [], from: null, coord: [] } }];
  prev = "start";
  isEscaped = false;
}

export function startNewMazeEscaping(hight: number, weight: number) {
  resetStartParams();
  startMaze = mazeGenerator(createMazePatternBySize(hight, weight));
  mazeMap = startMaze.slice();
  mazeContent = getMazeMarkup(mazeMap);
  if (mazeEl) mazeEl.innerHTML = mazeContent;

  const startParam = getStartPosition(mazeMap);
  startPosition = startParam.startPosition;
  startDirection = startParam.startDirection;
}

export function makeOneStep() {
  if (isEscaped) return;
  const { nextStep, nextDirection, resultLOg } = doStep(
    mazeMap,
    startDirection,
    startPosition[0],
    startPosition[1]
  );
  console.log(
    nextStep[0],
    nextStep[1],
    coordList,
    startPosition[0],
    startPosition[1]
  );
  if (
    startPosition[1] === mazeMap[0].length - 1 ||
    startPosition[0] === mazeMap.length - 1 ||
    startPosition[0] === 0 ||
    startPosition[1] === 0
  ) {
    drawShortWay(resultLOg);
    isEscaped = true;
    return;
  }
  if (nextStep.length > 1 && typeof nextStep !== "string") {
    coordList.push([startPosition[0], startPosition[1]]);
    const restCrosses = nextStep.splice(1, nextStep.length - 1);
    listOfCrosses = listOfCrosses.concat(restCrosses);
    crossingsParamArray.push({
      [startPosition.toString()]: {
        way: currentWay,
        from: prev,
        coord: coordList,
      },
    });
    currentWay = [];
    coordList = [];
    prev = startPosition.toString();
  }
  currentWay = currentWay.concat(resultLOg);

  if (nextStep.length) {
    coordList.push([startPosition[0], startPosition[1]]);
    startPosition = nextStep[0] as CoordType;
    startDirection = nextDirection;
  } else {
    const crossing = listOfCrosses.shift();
    coordList = [];
    if (crossing) {
      startPosition = crossing;
      startDirection = mazeMap[crossing[0]][crossing[1]];
      prev = calcCrossCoord(startDirection, startPosition).toString();
    }
    currentWay = [startDirection];
  }
  mazeContent = getMazeMarkup(mazeMap);
  if (mazeEl) mazeEl.innerHTML = mazeContent;
}

function drawShortWay(resultLOg: string[]) {
  currentWay = currentWay.concat(resultLOg);
  coordList.push([startPosition[0], startPosition[1]]);
  crossingsParamArray.push({
    [startPosition.toString()]: {
      way: currentWay,
      from: prev,
      coord: coordList,
    },
  });
  const rightWay = calcShortWay(crossingsParamArray);
  const trueWayId = setInterval(() => {
    console.log(trueWayId);

    if (!rightWay.length) {
      clearInterval(trueWayId);
      return;
    }
    const [y, x] = rightWay.shift() as CoordType;
    const newRow = startMaze[y].split("");
    newRow[x] = "*";
    startMaze[y] = newRow.join("");
    mazeContent = getMazeMarkup(startMaze);
    if (mazeEl) mazeEl.innerHTML = mazeContent;
  }, 25);
}

const nextStepButton = <HTMLButtonElement>(
  document.getElementById("nextStepButton")
);
nextStepButton.addEventListener("click", () => {
  nextStepButton.disabled = true;

  while (!isEscaped) {
    makeOneStep();
  }
  nextStepButton.disabled = false;
});
