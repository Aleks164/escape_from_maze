import { drawNewMaze } from "./drawNewMaze";
import { startEscaping } from "./startEscaping";
import "./style.css";

const startButton = <HTMLButtonElement>document.getElementById("start");
const generateNewMazeButton = <HTMLButtonElement>(
  document.getElementById("generateNewMaze")
);
const mazeContainer = <HTMLDivElement>document.getElementById("maze");
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
