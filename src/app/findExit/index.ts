import { doStep } from "./doStep";
import { calcCrossCoord } from "./calcCrossCoord";
import { CoordType, DirectionType, MapType, StepParamType } from "../../types";

export function makeOneStep(
  mazeMap: MapType,
  currentStepParams: StepParamType
) {
  let {
    startPosition,
    startDirection,
    coordList,
    currentWay,
    listOfCrosses,
    prev,
    isEscaped,
  } = currentStepParams;
  const { crossingsParamArray } = currentStepParams;
  if (isEscaped) return currentStepParams;
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
    isEscaped = true;
    return {
      ...currentStepParams,
      coordList,
      currentWay,
      crossingsParamArray,
      isEscaped,
    };
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
      startDirection = mazeMap[crossing[0]][crossing[1]] as DirectionType;
      prev = calcCrossCoord(startDirection, startPosition).toString();
    }
    currentWay = [startDirection];
  }
  return {
    startPosition,
    startDirection,
    coordList,
    currentWay,
    listOfCrosses,
    crossingsParamArray,
    prev,
    isEscaped,
  };
}
