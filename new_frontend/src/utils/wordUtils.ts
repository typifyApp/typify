import arrayShuffle from "array-shuffle";

export function get20ShuffledWords(words: string[]): string[] {
  return arrayShuffle(words).slice(0, 20);
}
