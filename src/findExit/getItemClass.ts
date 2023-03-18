export function getItemClass(item: string) {
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
