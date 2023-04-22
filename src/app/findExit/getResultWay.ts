import { makeOneStep } from ".";
import { getStartParams } from "./getStartParams";
import { getStartPosition } from "./getStartPosition";
import { MapType, StepParamType } from "../../types";

export function getResultWay(mazeMap: MapType) {
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
  }
  return everyStepParam.crossingsParamArray;
}
