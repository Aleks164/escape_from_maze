export function drawMazeParams(height: number, width: number) {
  const currenSizeButton = <HTMLDivElement>(
    document.getElementById("currenSize")
  );

  currenSizeButton.innerHTML = `height: ${height} x width: ${width}`;
}
