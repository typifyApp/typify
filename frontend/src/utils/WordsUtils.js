const shuffle = (words) => {
  // get first 20 of shuffled
  const allWords = words.map((wordObject) => wordObject.word);
  allWords.sort((a, b) => 0.5 - Math.random());
  return allWords.slice(0, 20).join(" ");
};

const WordsUtils = {
  shuffle,
};

export default WordsUtils;
