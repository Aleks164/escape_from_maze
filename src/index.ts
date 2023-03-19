import { makeOneStep } from "./findExit";
import { drawNewMaze } from "./findExit/drawNewMaze";
import { getNewMazeParams } from "./findExit/getNewMazeParams";
import { createMazePatternBySize } from "./generateMaze/createMazePatternBySize";
import { mazeGenerator } from "./generateMaze/mazeGenerator";
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
  let isEscaped = false;
  while (!isEscaped) {
    isEscaped = makeOneStep(mazeMap);
  }
  nextStepButton.disabled = false;
});
