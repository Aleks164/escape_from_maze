import "./style.css";

export function mazeFieldCreator (width:number, height:number){
    let rowsArray = Array(width*2-1).fill("");
    height = height*2-1;
   rowsArray = rowsArray.map((_,i,arr)=>{
       if(i===0||i===arr.length-1) return `<div class="mazeRow" style="grid-template-columns: repeat(${
          arr[0].length
        },10px);">${"<div>#</div>".repeat(height)}</div>`;
       if(i%2===0){
           return `<div class="mazeRow" style="grid-template-columns: repeat(${
          arr[0].length
        },10px);">${(Array(height).fill(" ").map((col,index,arrCol)=>{
               if(index%2!==0||index ===0||index===arrCol.length-1) return "<div>#</div>";
               else return `<div>${col}</div>`;
           }).join(""))}</div>`
       }       
          });
          
    return rowsArray.join("");
}
const field = document.getElementById(
  "newMaze"
);
// console.log("asd", mazeFieldCreator(10,10))
field!.innerHTML = mazeFieldCreator(4,4);
// field.innerHTML = "mazeFieldCreator(10,10)";