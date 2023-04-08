export function getSkeletonMaze(width: number, height: number) {
  const widthWithBorder = width * 2 + 1;
  const heightWithBorder = height * 2 + 1;
  return Array(heightWithBorder)
    .fill("")
    .map((row, rowIndex) =>
      Array(widthWithBorder)
        .fill(" ")
        .map((item, itemIndex) => {
          if (
            (itemIndex % 2 !== 0 && rowIndex % 2 !== 0) ||
            (itemIndex % 2 === 0 && rowIndex % 2 === 0)
          )
            return "#";
          return " ";
        })
        .join("")
    );
}
