export function getMazeMarkup(arr: string[]) {
  return `<div class="mazeRow"><div class="mazeRow" style="grid-template-columns: repeat(${
    arr[0].length + 1
  },15px); ">
  ${Array(arr[0].length)
    .fill(0)
    .map((_, columnNumber) => {
      let emptyCell = "";
      if (columnNumber === 0) emptyCell = "<div> </div>";
      return `${emptyCell}<div  class=${getItemClass("vertical")}>${
        columnNumber + 1
      }</div>`;
    })
    .join("")}</div>
  ${arr
    .map(
      (row, rowNumber) =>
        `<div class="mazeRow" style="grid-template-columns: repeat(${
          arr[0].length + 1
        },15px); ">${row
          .split("")
          .map((el, coloumnNumber) => {
            let numbers = "";
            if (coloumnNumber == 0)
              numbers = `<div class=${getItemClass("horizontal")}>${
                rowNumber + 1
              }</div>`;
            return `${numbers}<div class=${getItemClass(el)}>${
              el || "."
            }</div>`;
          })
          .join("")}</div>`
    )
    .join("")}</div>`;
}

function getItemClass(item: string) {
  switch (item) {
    case "#": {
      return "wall";
    }
    case "*": {
      return "shortWayColor";
    }
    case ">":
    case "<":
    case "v":
    case "^": {
      return "steps";
    }
    case "horizontal": {
      return "horizontal";
    }
    case "vertical": {
      return "vertical";
    }
    default:
      return "empty";
  }
}
