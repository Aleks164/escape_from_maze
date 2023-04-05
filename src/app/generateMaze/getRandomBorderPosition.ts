export function getRandomBorderPosition(heightWithBorder: number) {
  let position = Math.ceil(Math.random() * heightWithBorder);
  if (position % 2 === 0) position++;
  if (position === 0) position++;
  if (position >= heightWithBorder) position = heightWithBorder - 2;
  return position;
}
