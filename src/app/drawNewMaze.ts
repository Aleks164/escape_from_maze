export function drawNewMaze(mazeContainer: HTMLDivElement, mazeMarkup: string) {
  if (mazeContainer) mazeContainer.innerHTML = mazeMarkup;
}
