/**
 *
 * @param px
 * @returns
 */
export function pxToEm(px: number) {
  return px / 16;
}

/**
 *
 * @param px
 * @returns
 */
export function pxToEmString(px: number) {
  return `${pxToEm}em`;
}
