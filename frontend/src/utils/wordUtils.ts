import arrayShuffle from "array-shuffle";

export function getNShuffledWords(words: string[], n: number): string[] {
  if (n > words.length) {
    alert("check the getNshuffledwords function");
  }
  return arrayShuffle(words).slice(0, n);
}
export const CHARACTERS_PER_WORD = 5;