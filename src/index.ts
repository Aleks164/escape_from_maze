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
const nextStepButton = <HTMLButtonElement>(
  document.getElementById("nextStepButton")
);
const generateNewMazeButton = <HTMLButtonElement>(
  document.getElementById("generateNewMaze")
);
const currenSizeButton = <HTMLDivElement>document.getElementById("currenSize");
const mazeContainer = <HTMLDivElement>document.getElementById("maze");

const height = +inputHeigth.value;
const width = +inputWidth.value;
const { newMaze, mazeMarkup } = getNewMazeParams(height, width);
let mazeMap = newMaze;
if (mazeContainer) mazeContainer.innerHTML = mazeMarkup;

currenSizeButton.innerHTML = `height: ${height} x width: ${width}`;

generateNewMazeButton.addEventListener("click", () => {
  const mazeParams = getNewMazeParams(height, width);
  drawNewMaze(mazeContainer, mazeParams.mazeMarkup);
  mazeMap = mazeParams.newMaze;
});

nextStepButton.addEventListener("click", () => {
  nextStepButton.disabled = true;
  const startParam = getStartPosition(mazeMap);
  const stepParam = getStartParams();
  const isEscaped = false;
  let everyStepParam: StepParamType = {
    ...startParam,
    ...stepParam,
    isEscaped,
  };
  while (!isEscaped) {
    console.log(everyStepParam.isEscaped);

    everyStepParam = makeOneStep(mazeMap, everyStepParam);
    const curStepMazeMarkup = getMazeMarkup(mazeMap);
    if (mazeContainer) mazeContainer.innerHTML = curStepMazeMarkup;
  }
  if (isEscaped) {
    const { crossingsParamArray } = everyStepParam;
    const startMazeMap = newMaze.slice();
    drawShortWay(crossingsParamArray, mazeContainer, startMazeMap);
  }
  nextStepButton.disabled = false;
});
