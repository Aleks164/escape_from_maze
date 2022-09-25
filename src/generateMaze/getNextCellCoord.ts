export function getNextCellCoord(variants: [number, number][]) {
  const variantsLength = variants.length;
  const rndmVariants = Math.floor(Math.random() * variantsLength);
  return variants[rndmVariants];
}
