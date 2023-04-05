import { StartParamType } from "../../types";

export function getStartParams(): StartParamType;

export function getStartParams() {
  return {
    coordList: [],
    currentWay: [],
    listOfCrosses: [],
    crossingsParamArray: [{ start: { way: [], from: null, coord: [] } }],
    prev: "start",
  } as StartParamType;
}
