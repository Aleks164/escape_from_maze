import { DirectionType } from "../types";
import { checkAround } from "./checkAround";
import { getNextStepDirection } from "./getNextStepDirection";

export function doStep(
  arr: string[],
  curDirecation: string,
  y: number,
  x: number
) {
  const check = checkAround(y, x, arr);
  if (!check.length)
    return {
      nextStep: [],
      nextDirection: ">" as DirectionType,
      resultLOg: [],
    };
  const [nextY, nextX] = check[0];
  const { nextDirection, resultLOg } = getNextStepDirection(
    [y, x],
    [nextY, nextX],
    curDirecation
  );
  return {
    nextStep: check,
    nextDirection,
    resultLOg,
  };
}
