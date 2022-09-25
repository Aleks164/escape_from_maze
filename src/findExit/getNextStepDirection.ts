export function getNextStepDirection(
  curPosition: [number, number],
  NextPosition: [number, number],
  curDirection: string
) {
  const resultLOg: string[] = [];
  let nextDirection = "";
  if (curPosition[0] > NextPosition[0]) nextDirection = "^"; // top
  if (curPosition[0] < NextPosition[0]) nextDirection = "v"; // bottom
  if (curPosition[1] > NextPosition[1]) nextDirection = "<"; // left
  if (curPosition[1] < NextPosition[1]) nextDirection = ">"; // right

  if (curDirection === nextDirection) resultLOg.push("F");
  else if (curDirection === ">") {
    if (nextDirection === "<") resultLOg.push("B", "F");
    if (nextDirection === "^") resultLOg.push("L", "F");
    if (nextDirection === "v") resultLOg.push("R", "F");
  } else if (curDirection === "<") {
    if (nextDirection === ">") resultLOg.push("B", "F");
    if (nextDirection === "v") resultLOg.push("L", "F");
    if (nextDirection === "^") resultLOg.push("R", "F");
  } else if (curDirection === "v") {
    if (nextDirection === "^") resultLOg.push("B", "F");
    if (nextDirection === "<") resultLOg.push("R", "F");
    if (nextDirection === ">") resultLOg.push("L", "F");
  } else if (curDirection === "^") {
    if (nextDirection === "v") resultLOg.push("B", "F");
    if (nextDirection === ">") resultLOg.push("R", "F");
    if (nextDirection === "<") resultLOg.push("L", "F");
  }
  return { nextDirection, resultLOg };
}
