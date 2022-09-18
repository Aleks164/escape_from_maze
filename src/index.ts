import { getStartPosition } from "./getStartPosition";
import { doStep } from "./doStep";
import { defaultArr } from "./defaultArr";
import { getMazeMarkup } from "./getMazeMarkup";
import { finishPicture } from "./finishPicture";
import "./style.css";

let intId: NodeJS.Timer;
const arr = defaultArr;
let startPosition: [number, number] = [0, 0];
let startDirection = "";
let trueWay: string[] = [];
let currentWay: string[] = [];
let listOfCrosses: [number, number][] = [];
const mazeEl = document.getElementById("maze");
const fullWay = document.getElementById("fullWay");
const curWay = document.getElementById("curWay");
let mazeContent = getMazeMarkup(arr);
if (mazeEl) mazeEl.innerHTML = mazeContent;

const startParam = getStartPosition(arr);
startPosition = startParam.startPosition;
startDirection = startParam.startDirection;

function makeOneStep() {
  const { nextStep, nextDirection, resultLOg } = doStep(
    arr,
    startDirection,
    startPosition[0],
    startPosition[1]
  );
  if (nextStep === "Finish") {
    mazeContent = getMazeMarkup(finishPicture);
    if (mazeEl) mazeEl.innerHTML = mazeContent;
    clearInterval(intId);
    return;
  }
  currentWay = currentWay.concat(resultLOg);
  if (nextStep.length > 1 && typeof nextStep !== "string") {
    const restCrosses = nextStep.splice(1, nextStep.length - 1);
    listOfCrosses = listOfCrosses.concat(restCrosses);
    trueWay = trueWay.concat(currentWay);
    currentWay = [];
  }
  if (nextStep.length) {
    // eslint-disable-next-line prefer-destructuring
    startPosition = nextStep[0] as [number, number];
    startDirection = nextDirection;
  } else {
    const crossing = listOfCrosses.shift();
    if (crossing) {
      startPosition = crossing;
      startDirection = arr[crossing[0]][crossing[1]];
    }
  }
  mazeContent = getMazeMarkup(arr);
  if (mazeEl) mazeEl.innerHTML = mazeContent;
  if (fullWay) fullWay.innerHTML = `<div>${trueWay.join(" ")}</div>}`;
  if (curWay) curWay.innerHTML = `<div>${currentWay.join(" ")}</div>}`;
}

const nextStepButton = document.getElementById("nextStepButton");
if (nextStepButton) nextStepButton.addEventListener("click", makeOneStep);

intId = setInterval(() => {
  makeOneStep();
}, 100);
