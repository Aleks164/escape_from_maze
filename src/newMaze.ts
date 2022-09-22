import "./style.css";

export function mazeFieldCreator(width: number, height: number) {
  let rowsArray = Array(width * 2 + 2 - 1).fill("");
  height = height * 2 + 2 - 1;
  rowsArray = rowsArray.map((_, i, arr) => {
    if (i === 0 || i === arr.length - 1 || i % 2 === 0) return `<div class="mazeRow" style="grid-template-columns: repeat(${arr.length
      },10px);">${"<div>#</div>".repeat(height)}</div>`;

    return `<div class="mazeRow" style="grid-template-columns: repeat(${arr.length
      },10px);">${(Array(height).fill(" ").map((col, index, arrCol) => {
        if (index % 2 === 0 || index === 0 || index === arrCol.length - 1) return "<div>#</div>";
        return `<div>${col}</div>`;
      }).join(""))}</div>`

  });
  return rowsArray.join("");
}
const field = document.getElementById(
  "newMaze"
);
// console.log("asd", mazeFieldCreator(10,10))
field!.innerHTML = mazeFieldCreator(10, 16);
// field.innerHTML = "mazeFieldCreator(10,10)";