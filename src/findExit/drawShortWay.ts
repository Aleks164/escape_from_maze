import { getMazeMarkup } from "./getMazeMarkup";
import { calcShortWay } from "./calcShortWay";
import { CrossesItemType, MapType, CoordType } from "../types";

export function drawShortWay(
  crossingsParamArray: CrossesItemType[],
  mazeEl: HTMLElement | null,
  startMaze: MapType
) {
  const rightWay = calcShortWay(crossingsParamArray);
  const trueWayId = setInterval(() => {
    console.log(trueWayId);

    if (!rightWay.length) {
      clearInterval(trueWayId);
      return;
    }
    const [y, x] = rightWay.shift() as CoordType;
    const newRow = startMaze[y].split("");
    newRow[x] = "*";
    startMaze[y] = newRow.join("");
    const mazeContent = getMazeMarkup(startMaze);
    if (mazeEl) mazeEl.innerHTML = mazeContent;
  }, 25);
}
