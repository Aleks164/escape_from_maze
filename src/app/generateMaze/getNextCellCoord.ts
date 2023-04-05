import { CoordType } from "../../types";

export function getNextCellCoord(variants: CoordType[]) {
  const variantsLength = variants.length;
  const rndmVariants = Math.floor(Math.random() * variantsLength);
  return variants[rndmVariants];
}
