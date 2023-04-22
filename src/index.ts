import { getMazeParams } from "./app/getMazeParams";
import { drawSkeleton } from "./app/drawSkeleton";
import { MESSAGE_TYPES } from "./app/constants";
import { OnGetMessageParamsType } from "./types";
import { onMessageReducer } from "./app/onMessageReducer";
import "./style.css";

const startButton = <HTMLButtonElement>document.getElementById("start");
const generateNewMazeButton = <HTMLButtonElement>(
  document.getElementById("generateNewMaze")
);
const mazeContainer = <HTMLDivElement>document.getElementById("maze");
const worker = new Worker(new URL("./mazeGeneratorWW.ts", import.meta.url));
let key = Date.now().toString();

worker.onmessage = (message: OnGetMessageParamsType) =>
  onMessageReducer(message, mazeContainer, generateNewMazeButton, startButton);

drawSkeleton();

worker.postMessage({
  mazeParams: getMazeParams(),
  type: MESSAGE_TYPES.DRAW_NEW_MAZE,
  key,
});

generateNewMazeButton.addEventListener("click", () => {
  key = Date.now().toString();
  drawSkeleton();
  worker.postMessage({
    mazeParams: getMazeParams(),
    type: MESSAGE_TYPES.DRAW_NEW_MAZE,
    key,
  });
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  generateNewMazeButton.disabled = true;
  drawSkeleton();
  worker.postMessage({ type: MESSAGE_TYPES.DRAW_ESCAPING, key });
});
