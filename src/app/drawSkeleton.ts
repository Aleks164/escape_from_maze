import { drawNewMaze } from "./drawNewMaze";
import { getMazeMarkup } from "./findExit/getMazeMarkup";
import { getMazeParams } from "./getMazeParams";
import { getSkeletonMaze } from "./getSkeletonMaze";

export function drawSkeleton() {
  const mazeContainer = <HTMLDivElement>document.getElementById("maze");
  const { height, width } = getMazeParams();

  const skeletonMaze = getSkeletonMaze(height, width);

  drawNewMaze(mazeContainer, getMazeMarkup(skeletonMaze));
}
