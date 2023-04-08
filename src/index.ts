import { drawNewMaze } from "./app/drawNewMaze";
import { getMazeParams } from "./app/getMazeParams";
import { startEscaping } from "./app/startEscaping";
import { drawSkeleton } from "./app/drawSkeleton";
import { drawMazeParams } from "./app/drawMazeParams";
import { MESSAGE_TYPES } from "./app/constants";
import "./style.css";

const startButton = <HTMLButtonElement>document.getElementById("start");
const generateNewMazeButton = <HTMLButtonElement>(
  document.getElementById("generateNewMaze")
);
export const mazeContainer = <HTMLDivElement>document.getElementById("maze");

const worker = new Worker(new URL("./mazeGeneratorWW.ts", import.meta.url));

worker.onmessage = ({ data: { newMaze, mazeMarkup, type } }) => {
  console.log(newMaze, mazeMarkup, type);

  switch (type) {
    case MESSAGE_TYPES.DRAW_NEW_MAZE: {
      const { height, width } = getMazeParams();
      drawMazeParams(height, width);
      drawNewMaze(mazeContainer, mazeMarkup);
      startButton.disabled = false;
      break;
    }
    case MESSAGE_TYPES.DRAW_ESCAPING: {
      // startButton.disabled = true;
      // generateNewMazeButton.disabled = true;
      startEscaping(newMaze, mazeContainer, generateNewMazeButton);
      break;
    }
    default: {
      break;
    }
  }
};

drawSkeleton();

worker.postMessage({
  mazeParams: getMazeParams(),
  type: MESSAGE_TYPES.DRAW_NEW_MAZE,
});

generateNewMazeButton.addEventListener("click", () => {
  worker.postMessage({
    mazeParams: getMazeParams(),
    type: MESSAGE_TYPES.DRAW_NEW_MAZE,
  });
  // drawNewMaze(mazeContainer, mazeMarkup);
  // startButton.disabled = false;
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  generateNewMazeButton.disabled = true;
  // startEscaping(newMaze, mazeContainer, generateNewMazeButton);
  worker.postMessage({ type: MESSAGE_TYPES.DRAW_ESCAPING });
});
