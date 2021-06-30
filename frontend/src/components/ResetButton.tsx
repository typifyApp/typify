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
    return (
        <Button
            onClick={() =>
                keyDispatch({
                    type: 'Reset',
                    payload: getNShuffledWords(words, numWords)
                })
            }
        >
            Reset
        </Button>
    );
};

export default ResetButton;
