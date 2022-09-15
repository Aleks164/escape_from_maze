import { checkAround } from "./checkAround";

let isFinish = false;
let isDeadEnd = false;
// let tempX=startX;
// let tempY=startX;
let listOfCrosses = [];

function doStep(
  checkWayArray: string[],
  curDirection: string,
  y: number,
  x: number
) {
  let check = checkAround(y, x, checkWayArray);
  if (check.length > 1) {
    listOfCrosses.push(...check.splice(1, check.length - 1));
    trueWay = trueWay.concat(thisIsTheWay);
    thisIsTheWay = [];
  }

  if (
    x === checkWayArray[0].length - 1 ||
    y === checkWayArray.length - 1 ||
    y === 0 ||
    x === 0
  ) {
    isFinish = true;
    // console.log("1");
    // break;
  }
  if (check.length === 0) {
    isDeadEnd = true;
    // console.log("2");
    // break;
  }

  getNextStepDirection([y, x], [check[0][0], check[0][1]]);
  x = check[0][1];
  y = check[0][0];
  // }
  if (!isDeadEnd) {
    trueWay = trueWay.concat(thisIsTheWay);
  }
}
