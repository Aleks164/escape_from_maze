import { doStep } from "./doStep";
import { getMazeMarkup } from "./getMazeMarkup";
import { calcCrossCoord } from "./calcCrossCoord";
import { drawShortWay } from "./drawShortWay";
import { CoordType, CrossesItemType, MapType } from "../types";
import { getStartParams } from "./getStartParams";
import { getStartPosition } from "./getStartPosition";

// let startMaze: MapType;
// let mazeMap: MapType;
// let startPosition: CoordType;
// let startDirection: string;
// let coordList: CoordType[];
// let currentWay: string[];
// let listOfCrosses: CoordType[];
// let crossingsParamArray: CrossesItemType[];
// let prev: string;
// let mazeContent: string;
// let isEscaped: boolean;
// getStartParams();

export function makeOneStep(mazeMap: MapType, isEscaped: boolean) {
  const startParam = getStartPosition(mazeMap);
  const { startPosition, startDirection } = startParam;
  if (isEscaped) return;
  const { nextStep, nextDirection, resultLOg } = doStep(
    mazeMap,
    startDirection,
    startPosition[0],
    startPosition[1]
  );
  if (
    startPosition[1] === mazeMap[0].length - 1 ||
    startPosition[0] === mazeMap.length - 1 ||
    startPosition[0] === 0 ||
    startPosition[1] === 0
  ) {
    currentWay = currentWay.concat(resultLOg);
    coordList.push([startPosition[0], startPosition[1]]);
    crossingsParamArray.push({
      [startPosition.toString()]: {
        way: currentWay,
        from: prev,
        coord: coordList,
      },
    });
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
