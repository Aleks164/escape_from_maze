import { drawNewMaze } from "./app/drawNewMaze";
import { startEscaping } from "./app/startEscaping";
import "./style.css";

const startButton = <HTMLButtonElement>document.getElementById("start");
const generateNewMazeButton = <HTMLButtonElement>(
  document.getElementById("generateNewMaze")
);
const mazeContainer = <HTMLDivElement>document.getElementById("maze");

const worker = new Worker("mazeGeneratorWW.js");

worker.onmessage = function ww(event) {
  console.log(event);
};
worker.postMessage("ali");

let { mazeMap } = drawNewMaze(mazeContainer);

generateNewMazeButton.addEventListener("click", () => {
  ({ mazeMap } = drawNewMaze(mazeContainer));
  startButton.disabled = false;
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  generateNewMazeButton.disabled = true;
  startEscaping(mazeMap, mazeContainer, generateNewMazeButton);
});
