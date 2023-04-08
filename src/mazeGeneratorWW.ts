import { MESSAGE_TYPES } from "./app/constants";
import { getNewMazeParams } from "./app/findExit/getNewMazeParams";

self.onmessage = ({ data: { mazeParams, type } }) => {
  console.log(mazeParams);
  switch (type) {
    case MESSAGE_TYPES.DRAW_NEW_MAZE: {
      const { height, width } = mazeParams;
      const { mazeMarkup } = getNewMazeParams(height, width);
      self.postMessage({ mazeMarkup, type });
      break;
    }
    case MESSAGE_TYPES.DRAW_ESCAPING: {
      const { height, width } = mazeParams;
      const { newMaze } = getNewMazeParams(height, width);
      self.postMessage({ newMaze, type });
      break;
    }
    default: {
      break;
    }
  }
};
