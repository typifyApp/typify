import { Button } from '@material-ui/core';
import { getNShuffledWords } from '../utils/wordUtils';
import { ComplexKeyActionType } from '../reducers/keyReducer';
export interface ResetButtonProps {
  words: string[];
  numWords: number;
  keyDispatch: (value: ComplexKeyActionType) => void;
}

const ResetButton: React.FunctionComponent<ResetButtonProps> = ({
  words,
  numWords,
  keyDispatch
}) => {
  const handleClick = () => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    keyDispatch({
      type: 'Reset',
      payload: getNShuffledWords(words, numWords)
    });
  };
  return <Button onClick={handleClick}>Reset</Button>;
};

export default ResetButton;
