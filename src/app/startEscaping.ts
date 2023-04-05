import { makeOneStep } from "./findExit";
import { drawShortWay } from "./findExit/drawShortWay";
import { getMazeMarkup } from "./findExit/getMazeMarkup";
import { getStartParams } from "./findExit/getStartParams";
import { getStartPosition } from "./findExit/getStartPosition";
import { MapType, StepParamType } from "../types";

export function startEscaping(
  mazeMap: MapType,
  mazeContainer: HTMLDivElement,
  generateNewMazeButton: HTMLButtonElement
) {
  const startParam = getStartPosition(mazeMap);
  const stepParam = getStartParams();
  const isEscaped = false;
  let everyStepParam: StepParamType = {
    ...startParam,
    ...stepParam,
    isEscaped,
  };
  while (!everyStepParam.isEscaped) {
    everyStepParam = makeOneStep(mazeMap, everyStepParam);
    const curStepMazeMarkup = getMazeMarkup(mazeMap);
    if (mazeContainer) mazeContainer.innerHTML = curStepMazeMarkup;
  }
  if (everyStepParam.isEscaped) {
    const { crossingsParamArray } = everyStepParam;
    const startMazeMap = window.structuredClone(mazeMap);
    drawShortWay(
      crossingsParamArray,
      mazeContainer,
      startMazeMap,
      generateNewMazeButton
    );
  }
}
