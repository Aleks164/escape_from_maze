export function getMazeParams() {
  const inputHeigth = <HTMLInputElement>document.getElementById("heigth");
  const inputWidth = <HTMLInputElement>document.getElementById("width");

  const height = +inputHeigth.value;
  const width = +inputWidth.value;
  return { height, width };
}
