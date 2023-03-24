export function insertNextDirectionInMap(
  string: number,
  coloumn: number,
  nextDirection: string,
  arr: string[]
) {
  const newRow = arr[string].split("");
  newRow[coloumn] = nextDirection;
  arr[string] = newRow.join("");
}
