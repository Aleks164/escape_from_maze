export function getMazeMarkup(arr: string[]) {
  return `<div class="mazeContainer">${arr
    .map(
      (row) =>
        `<div class="mazeRow" style="grid-template-columns: repeat(${
          arr[0].length
        },10px); ">${row
          .split("")
          .map((el) => `<div>${el || "."}</div>`)
          .join("")}</div>`
    )
    .join("")}</div>`;
}
