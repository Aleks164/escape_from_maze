import { MESSAGE_TYPES } from "./constants";
import { drawMazeParams } from "./drawMazeParams";
import { drawNewMaze } from "./drawNewMaze";
import { drawShortWay } from "./findExit/drawShortWay";
import { getMazeParams } from "./getMazeParams";
import { OnGetMessageParamsType } from "../types";

export function onMessageReducer(
  {
    data: { newMaze, mazeMarkup, crossingsParamArray, type },
  }: OnGetMessageParamsType,
  mazeContainer: HTMLDivElement,
  generateNewMazeButton: HTMLButtonElement,
  startButton: HTMLButtonElement
) {
  switch (type) {
    case MESSAGE_TYPES.DRAW_NEW_MAZE: {
      const { height, width } = getMazeParams();
      drawMazeParams(height, width);
      drawNewMaze(mazeContainer, mazeMarkup);
      startButton.disabled = false;
      break;
    }
    case MESSAGE_TYPES.DRAW_ESCAPING: {
      const startMazeMap = window.structuredClone(newMaze);
      drawShortWay(
        crossingsParamArray,
        mazeContainer,
        startMazeMap,
        generateNewMazeButton
      );
      break;
    }
    default: {
      break;
    }
  }
}
