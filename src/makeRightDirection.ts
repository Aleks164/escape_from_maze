export function mekeRightDirection(
  curDirection: string,
  nextDirection: string
) {
  const turmLog = [];
  if (curDirection !== nextDirection) {
    if (curDirection === ">") {
      if (nextDirection === "<") turmLog.push("B");
      if (nextDirection === "^") turmLog.push("L");
      if (nextDirection === "v") turmLog.push("R");
    } else if (curDirection === "<") {
      if (nextDirection === ">") turmLog.push("B");
      if (nextDirection === "v") turmLog.push("L");
      if (nextDirection === "^") turmLog.push("R");
    } else if (curDirection === "v") {
      if (nextDirection === "^") turmLog.push("B");
      if (nextDirection === "<") turmLog.push("R");
      if (nextDirection === ">") turmLog.push("L");
    } else if (curDirection === "^") {
      if (nextDirection === "v") turmLog.push("B");
      if (nextDirection === ">") turmLog.push("R");
      if (nextDirection === "<") turmLog.push("L");
    }
  }
  return turmLog;
}
