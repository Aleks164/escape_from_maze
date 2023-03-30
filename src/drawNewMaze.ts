import { getNewMazeParams } from "./findExit/getNewMazeParams";
import { MapType } from "./types";

export function drawNewMaze(mazeContainer: HTMLDivElement) {
  const inputHeigth = <HTMLInputElement>document.getElementById("heigth");
  const inputWidth = <HTMLInputElement>document.getElementById("width");
  const currenSizeButton = <HTMLDivElement>(
    document.getElementById("currenSize")
  );

  const height = +inputHeigth.value;
  const width = +inputWidth.value;

  currenSizeButton.innerHTML = `height: ${height} x width: ${width}`;

  const { newMaze, mazeMarkup } = getNewMazeParams(height, width);
  const mazeMap: MapType = window.structuredClone(newMaze);

  if (mazeContainer) mazeContainer.innerHTML = mazeMarkup;

  return { mazeMap };
}
