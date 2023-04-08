import { createMazePatternBySize } from "../generateMaze/createMazePatternBySize";
import { mazeGenerator } from "../generateMaze";
import { MapType, NewMazeParamType } from "../../types";
import { getMazeMarkup } from "./getMazeMarkup";

export function getNewMazeParams(
  height: number,
  wight: number
): NewMazeParamType {
  const startMaze = mazeGenerator(createMazePatternBySize(height, wight));

  const newMaze: MapType = self.structuredClone(startMaze);
  return { newMaze, mazeMarkup: getMazeMarkup(startMaze) };
}
