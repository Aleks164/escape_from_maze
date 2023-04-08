import { drawNewMaze } from "./drawNewMaze";
import { getMazeMarkup } from "./findExit/getMazeMarkup";
import { getMazeParams } from "./getMazeParams";
import { getSkeletonMaze } from "./getSkeletonMaze";
import { mazeContainer } from "..";

// worker.postMessage({ mazeParams: getMazeParams(), type: "drawNewMaze" });
export function drawSkeleton() {
  const { height, width } = getMazeParams();

  const skeletonMaze = getSkeletonMaze(height, width);

  drawNewMaze(mazeContainer, getMazeMarkup(skeletonMaze));
}
