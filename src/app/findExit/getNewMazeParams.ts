import { createMazePatternBySize } from "../generateMaze/createMazePatternBySize";
import { mazeGenerator } from "../generateMaze";
import { NewMazeParamType } from "../../types";
import { getMazeMarkup } from "./getMazeMarkup";

export function getNewMazeParams(
  height: number,
  wight: number
): NewMazeParamType {
  const startMaze = mazeGenerator(createMazePatternBySize(height, wight));
  return { newMaze: startMaze, mazeMarkup: getMazeMarkup(startMaze) };
}
