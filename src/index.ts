import { getStartPosition } from "./getStartPosition";
import { doStep } from "./doStep";
import { defaultArr } from "./defaultArr";
import { getMazeMarkup } from "./getMazeMarkup";
import { finishPicture } from "./finishPicture";
import { calcCrossCoord } from "./calcCrossCoord";
import { calcShortWay } from "./calcShortWay";
import "./style.css";

export type CrossesItemType = {
    [key:string]: {
        way: string[];
        from: null|string;
        coordLog:[number,number][];
    };
}
let intId: NodeJS.Timer;

const arr = defaultArr;
let startPosition: [number, number] = [0, 0];
let startDirection = "";
let curCoordList: [number,number][] = [];
let currentWay: string[] = [];
let listOfCrosses: [number, number][] = [];
let crossingsParamArray: CrossesItemType[] = [{start:{way:[],
from:null,coordLog:[]}}];
let prev = "start";
const mazeEl = document.getElementById("maze");
const fullWay = document.getElementById("fullWay");
const curWay = document.getElementById("curWay");
let mazeContent = getMazeMarkup(arr);
if (mazeEl) mazeEl.innerHTML = mazeContent;

const startParam = getStartPosition(arr);
startPosition = startParam.startPosition;
startDirection = startParam.startDirection;

function makeOneStep() {
  const { nextStep, nextDirection, resultLOg } = doStep(
    arr,
    startDirection,
    startPosition[0],
    startPosition[1]
  );
  if (nextStep === "Finish") {
      currentWay = currentWay.concat(resultLOg);
      curCoordList.push([startPosition[0], startPosition[1]]);
    crossingsParamArray.push({[startPosition.toString()]:{way:currentWay,
    from:prev,coordLog:curCoordList}});
    
    mazeContent = getMazeMarkup(finishPicture);
    if (mazeEl) mazeEl.innerHTML = mazeContent;
    clearInterval(intId);
    setTimeout(()=>{
        mazeContent = getMazeMarkup(defaultArr);
         if (mazeEl) mazeEl.innerHTML = mazeContent;
    },1500);

 console.log("result way", calcShortWay(crossingsParamArray));
 
    return;
  }
  if (nextStep.length > 1 && typeof nextStep !== "string") {
    const restCrosses = nextStep.splice(1, nextStep.length - 1);
    listOfCrosses = listOfCrosses.concat(restCrosses);
    crossingsParamArray.push({[startPosition.toString()]:{way:currentWay,
    from:prev, coordLog:curCoordList}})   
    currentWay = [];
    curCoordList =[];
    prev = startPosition.toString();   
  }
  currentWay = currentWay.concat(resultLOg);
  curCoordList.push([startPosition[0], startPosition[1]]);
  if (nextStep.length) {
    // eslint-disable-next-line prefer-destructuring
    startPosition = nextStep[0] as [number, number];
    startDirection = nextDirection;
  } else {
    const crossing = listOfCrosses.shift();
    if (crossing) {
      startPosition = crossing;
      startDirection = arr[crossing[0]][crossing[1]];
      prev = calcCrossCoord(startDirection,startPosition).toString();   
    curCoordList = [[crossing[0],crossing[1]]]
    }
    currentWay = [startDirection];
  }
  mazeContent = getMazeMarkup(arr);
  if (mazeEl) mazeEl.innerHTML = mazeContent;
  // if (fullWay) fullWay.innerHTML = `<div>${trueWay.join(" ")}</div>}`;
  if (curWay) curWay.innerHTML = `<div>${currentWay.join(" ")}</div>}`;
  // if (curWay) curWay.innerHTML = `<div>${JSON.stringify(crossingsParamArray,null," ")}</div>}`;
//  console.log(startPosition[0],startPosition[1]);
 }

const nextStepButton = document.getElementById("nextStepButton");
if (nextStepButton) nextStepButton.addEventListener("click", makeOneStep);

intId = setInterval(() => {
  makeOneStep();
}, 100);

