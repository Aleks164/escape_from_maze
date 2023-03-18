import { NewMazeParamType } from "../types";

export function getStartParams(): NewMazeParamType;

export function getStartParams() {
  return {
    startPosition: [0, 0],
    startDirection: "",
    coordList: [],
    currentWay: [],
    listOfCrosses: [],
    crossingsParamArray: [{ start: { way: [], from: null, coord: [] } }],
    prev: "start",
    isEscaped: false,
  } as NewMazeParamType;
}
