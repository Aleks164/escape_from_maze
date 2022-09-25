/* eslint-disable no-loop-func */
/* eslint-disable prefer-destructuring */
import { CrossesItemType } from "./index";

export function calcShortWay(crossesList: CrossesItemType[]) {
  let lastStep = crossesList.pop() as CrossesItemType;
  let lastStepKey = Object.keys(lastStep)[0];
  let prevStepName = lastStep[lastStepKey].from;
  let prevStepLog = lastStep[lastStepKey].coord;
  const resultLog = [...prevStepLog];
  while (prevStepName) {
    lastStep = crossesList.find(
      (item) => item[prevStepName!]
    ) as CrossesItemType;
    lastStepKey = Object.keys(lastStep)[0];
    prevStepName = lastStep[lastStepKey].from;
    prevStepLog = lastStep[lastStepKey].coord;
    resultLog.unshift(...prevStepLog);
  }
  return resultLog;
}
