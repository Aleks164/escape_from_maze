import { MESSAGE_TYPES } from "./app/constants";
import { getNewMazeParams } from "./app/findExit/getNewMazeParams";
import { getResultWay } from "./app/findExit/getResultWay";
import { OnPostMessageParamsType } from "./types";

const mazesContainer: Record<string, any> = {};

self.onmessage = ({
  data: { mazeParams, key, type },
}: OnPostMessageParamsType) => {
  switch (type) {
    case MESSAGE_TYPES.DRAW_NEW_MAZE: {
      const { height, width } = mazeParams;
      const { mazeMarkup, newMaze } = getNewMazeParams(height, width);
      mazesContainer[key] = newMaze;
      self.postMessage({ mazeMarkup, type });
      break;
    }
    case MESSAGE_TYPES.DRAW_ESCAPING: {
      const newMaze = mazesContainer[key];
      const crossingsParamArray = getResultWay(newMaze);
      self.postMessage({ crossingsParamArray, newMaze, type });
      break;
    }
    default: {
      break;
    }
  }
};
