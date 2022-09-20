import {CrossesItemType} from "./index";

export function calcShortWay(crossesList:CrossesItemType[]){
    let lastStep = crossesList.pop() as CrossesItemType;
    let lastStepKey = Object.keys(lastStep)[0];
    let prevStepName =  lastStep[lastStepKey]['from'];
    let prevStepLog =  lastStep[lastStepKey]['way'];
    let resultLog = [...prevStepLog];
    while(prevStepName){
    lastStep = crossesList.find(item=>item[prevStepName!]) as CrossesItemType;
            lastStepKey = Object.keys(lastStep)[0];
            prevStepName = lastStep[lastStepKey]['from'];
            prevStepLog =  lastStep[lastStepKey]['way'];
            resultLog.unshift(...prevStepLog);
    }
    resultLog.forEach((el,i)=>{
        if(el!=="F"&&el!=="B"&&el!=="L"&&el!=="R"){
           resultLog[i]="F";
        }
    })
  return resultLog;
}