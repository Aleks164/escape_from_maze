import { checkAround } from "./checkAround";
import { getNextStepDirection } from "./getNextStepDirection";

export function doStep(
  arr: string[],
  curDirecation: string,
  y: number,
  x: number
) {
  let check = checkAround(y, x, arr);
  console.log("check", check);
  let [nextY, nextX] = check[0];
  let { nextDirection, resultLOg } = getNextStepDirection(
    [y, x],
    [nextY, nextX],
    curDirecation
  );
  return {
    nextStep: check,
    nextDirection,
    resultLOg
  };
}
