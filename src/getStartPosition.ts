export function getStartPosition(arr: string[]) {
  let startX = 0;
  let startY = 0;
  const startVariants = ["<", "^", ">", "v"];
  let startDirection = "";
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (startVariants.indexOf(arr[y][x]) >= 0) {
        startX = x;
        startY = y;
        startDirection = arr[y][x];
        break;
      }
      if (startDirection) break;
    }
  }

  return { startPosition: [startY, startX], startDirection };
}
