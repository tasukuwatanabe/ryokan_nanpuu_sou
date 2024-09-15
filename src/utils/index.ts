export function createNumArray(start: number = 0, end: number): number[] {
  return [...Array(end - start + 1).keys()].map((num) => num + start);
}
