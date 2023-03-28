import { makeOneStep } from "./findExit";
import { drawNewMaze } from "./findExit/drawNewMaze";
import { drawShortWay } from "./findExit/drawShortWay";
import { getMazeMarkup } from "./findExit/getMazeMarkup";
import { getNewMazeParams } from "./findExit/getNewMazeParams";
import { getStartParams } from "./findExit/getStartParams";
import { getStartPosition } from "./findExit/getStartPosition";
import { StepParamType } from "./types";
import "./style.css";

const inputHeigth = <HTMLInputElement>document.getElementById("heigth");
const inputWidth = <HTMLInputElement>document.getElementById("width");
const startButton = <HTMLButtonElement>document.getElementById("start");
const generateNewMazeButton = <HTMLButtonElement>(
  document.getElementById("generateNewMaze")
);
const currenSizeButton = <HTMLDivElement>document.getElementById("currenSize");
const mazeContainer = <HTMLDivElement>document.getElementById("maze");

let height = +inputHeigth.value;
let width = +inputWidth.value;
const { newMaze, mazeMarkup } = getNewMazeParams(height, width);
let mazeMap = window.structuredClone(newMaze);
if (mazeContainer) mazeContainer.innerHTML = mazeMarkup;

currenSizeButton.innerHTML = `height: ${height} x width: ${width}`;

generateNewMazeButton.addEventListener("click", () => {
  height = +inputHeigth.value;
  width = +inputWidth.value;
  currenSizeButton.innerHTML = `height: ${height} x width: ${width}`;
  const mazeParams = getNewMazeParams(height, width);
  drawNewMaze(mazeContainer, mazeParams.mazeMarkup);
  mazeMap = window.structuredClone(mazeParams.newMaze);
  startButton.disabled = false;
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  generateNewMazeButton.disabled = true;
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
    drawShortWay(crossingsParamArray, mazeContainer, startMazeMap);
    generateNewMazeButton.disabled = false;
  }
});
