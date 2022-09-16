import { getStartPosition } from "./getStartPosition";
import { doStep } from "./doStep";
import { defaultArr } from "./defaultArr";
import "./style.css";

let arr = defaultArr;
let startPosition:[number,number] = [0, 0];
let startDirection = "";
let trueWay:string[] =[];
let currentWay:string[]=[];
let listOfCrosses:[number,number][]=[];
let mazeEl = document.getElementById("maze");
let mazeContent = `<div class="mazeContainer">${arr.map(row=>`<div class="mazeRow" style="grid-template-columns: repeat(${
    arr[0].length},10px); ">${row.split("").map(el=>`<div>${el?el:"."}</div>`).join("")}</div>`).join("")}</div>`;
if(mazeEl) mazeEl.innerHTML = mazeContent;

  let startParam = getStartPosition(arr);
  startPosition = startParam.startPosition;
  startDirection = startParam.startDirection;

function makeOneStep(){
  let { nextStep, nextDirection, resultLOg } = doStep(
    arr,
    startDirection,
    startPosition[0],
    startPosition[1]
  );
  currentWay= currentWay.concat(resultLOg);
  if(nextStep.length>1){
      let restCrosses = nextStep.slice(1,nextStep.length-1);
      listOfCrosses.concat(restCrosses);
      trueWay=trueWay.concat(currentWay);
      currentWay = [];      
  }  
  if(nextStep.length){
      startPosition=nextStep[0];
startDirection=nextDirection; 
  }
  else{
     let crossing = listOfCrosses.shift();
      if(crossing){
         startPosition=crossing;
        startDirection=arr[crossing[0]][crossing[1]];  
      }
     
  }

console.log("step")
mazeContent = `<div class="mazeContainer">${arr.map(row=>`<div class="mazeRow" style="grid-template-columns: repeat(${
    arr[0].length},10px); ">${row.split("").map(el=>`<div>${el?el:"."}</div>`).join("")}</div>`).join("")}</div>`;
if(mazeEl) mazeEl.innerHTML = mazeContent;
};

let nextStepButton = document.getElementById("nextStepButton");
if(nextStepButton)
nextStepButton.addEventListener("click",makeOneStep);

// setInterval(()=>{
//     makeOneStep();
// },150)



