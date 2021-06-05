import arrayShuffle from 'array-shuffle';

const shuffle = (words) => {
  // get first 20 of shuffled
  const allWords = words.map((wordObject) => wordObject.word);
  const shuffledWords = arrayShuffle(allWords);
  return shuffledWords.slice(0, 20).join(' ');
};

const WordsUtils = {
  shuffle,
};

export default WordsUtils;
