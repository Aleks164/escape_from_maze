import { startNewMazeEscaping } from "./findExit";
import "./style.css";

const inputHeigth = <HTMLInputElement>document.getElementById("heigth");
const inputWidth = <HTMLInputElement>document.getElementById("width");
const generateNewMaze = <HTMLButtonElement>(
  document.getElementById("generateNewMaze")
);
const currenSize = <HTMLDivElement>document.getElementById("currenSize");

let height = +inputHeigth.value;
let width = +inputWidth.value;
currenSize.innerHTML = `height: ${height} x width: ${width}`;
startNewMazeEscaping(height, width);

function changeSize() {
  height = +inputHeigth.value;
  width = +inputWidth.value;
  startNewMazeEscaping(height, width);
  currenSize.innerHTML = `height: ${height} x width: ${width}`;
}

generateNewMaze.addEventListener("click", changeSize);
