import { getStartPosition } from "./getStartPosition";
import { doStep } from "./doStep";
import { defaultArr } from "./defaultArr";
import { getMazeMarkup } from "./getMazeMarkup";
import { calcCrossCoord } from "./calcCrossCoord";
import { calcShortWay } from "./calcShortWay";
import "./style.css";

export type CrossesItemType = {
    [key:string]: {
        way: string[];
        from: null|string;
        coord:[number,number][];
    };
}
let intId: NodeJS.Timer;

const arr = defaultArr.slice();
let startPosition: [number, number] = [0, 0];
let startDirection = "";
let coordList: [number, number][] = [];
let currentWay: string[] = [];
let listOfCrosses: [number, number][] = [];
let crossingsParamArray: CrossesItemType[] = [{start:{way:[],
from:null,coord:[]}}];
let prev = "start";
const mazeEl = document.getElementById("maze");
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
  if (nextStep.length > 1 && typeof nextStep !== "string") {
    coordList.push([ startPosition[0],
    startPosition[1]]);
    const restCrosses = nextStep.splice(1, nextStep.length - 1);
    listOfCrosses = listOfCrosses.concat(restCrosses);
    crossingsParamArray.push({[startPosition.toString()]:{way:currentWay,
    from:prev, coord: coordList}})
    currentWay = [];
    coordList = [];    
    prev = startPosition.toString();   
  }
  currentWay = currentWay.concat(resultLOg);
  if ( startPosition[1] === arr[0].length - 1 ||
    startPosition[0] === arr.length - 1 ||
    startPosition[0] === 0 ||
    startPosition[1] === 0) {
      currentWay = currentWay.concat(resultLOg);
     coordList.push([ startPosition[0],
    startPosition[1]]);
    crossingsParamArray.push({[startPosition.toString()]:{way:currentWay,
    from:prev,coord:coordList}});
    
    clearInterval(intId);
      const rightWay = calcShortWay(crossingsParamArray);
      let trueWayId = setInterval(()=>{
        if(!rightWay.length) clearInterval(trueWayId);
           const [y,x] = rightWay.shift() as [number,number];
        const newRow = defaultArr[y].split("");
      newRow[x] = "*";
      defaultArr[y]= newRow.join("");
       mazeContent = getMazeMarkup(defaultArr);
         if (mazeEl) mazeEl.innerHTML = mazeContent;                                                 
      },150);
    return;
  }
  if (nextStep.length) {
     coordList.push([ startPosition[0],
    startPosition[1]]);
    startPosition = nextStep[0] as [number, number];
    startDirection = nextDirection;
    
  } else {
    const crossing = listOfCrosses.shift();
    coordList =[];
    if (crossing) {
      startPosition = crossing;
      startDirection = arr[crossing[0]][crossing[1]];
      prev = calcCrossCoord(startDirection,startPosition).toString(); 
    }
    currentWay = [startDirection];
  }
  mazeContent = getMazeMarkup(arr);
  if (mazeEl) mazeEl.innerHTML = mazeContent;
  if (curWay) curWay.innerHTML = `<div>${coordList.join(" ")}</div>`;
}

const nextStepButton = document.getElementById("nextStepButton") as HTMLButtonElement;
nextStepButton.addEventListener("click",()=> {
  nextStepButton.disabled = true;
  intId = setInterval(() => {
  makeOneStep();
}, 100);
nextStepButton.disabled = false;
});

