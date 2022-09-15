import { getStartPosition } from "./getStartPosition";
import { doStep } from "./doStep";
import { defaultArr } from "./defaultArr";
import "./style.css";

let arr = defaultArr;
let startPosition = [0, 0];
let startDirection = "";

export function app() {
  let startParam = getStartPosition(arr);
  startPosition = startParam.startPosition;
  startDirection = startParam.startDirection;

  // console.log(arr)
  console.log(startPosition, startDirection, arr);
  let { nextStep, nextDirection, resultLOg } = doStep(
    arr,
    startDirection,
    startPosition[0],
    startPosition[1]
  );

  // console.log(startPosition,startDirection,arr)
  console.log(nextStep, nextDirection, resultLOg);
}

app();
