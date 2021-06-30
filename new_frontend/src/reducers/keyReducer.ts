import { getNShuffledWords } from "../utils/wordUtils";

type KeyActionType = {
  type: "CorrectKeyPress" | "IncorrectKeyPress" | "FinishedSet" 
};
type UpdateWordsAction = {
  type: "UpdateWords"|"Reset";
  payload: string[];
};
export type KeyStateType = {
  currentIndex: number;
  words: string[];
  correctIndices: Set<number>;
  incorrectIndices: Set<number>;
  characterLength: number;
  startedTyping: boolean,
};

export type ComplexKeyActionType = KeyActionType | UpdateWordsAction;

let correctIndices = new Set<number>();
let incorrectIndices = new Set<number>();

export const defaultKeyState: KeyStateType = {
  currentIndex: 0,
  words: [] as string[],
  correctIndices: correctIndices,
  incorrectIndices: incorrectIndices,
  characterLength: 0,
  startedTyping: false,
};
const keyReducer = (state: KeyStateType, action: ComplexKeyActionType) => {
  switch (action.type) {
    case "CorrectKeyPress":
      state.correctIndices.add(state.currentIndex);
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        startedTyping: true
      };
    case "IncorrectKeyPress":
      state.incorrectIndices.add(state.currentIndex);
      return { ...state,startedTyping: true };
    case "UpdateWords":
      return {
        ...state,
        words: action.payload,
        characterLength: action.payload.join(" ").length,
      };
    case "FinishedSet":
      console.log("current index is (reducder)", state.currentIndex);
      return {
        ...defaultKeyState,
        correctIndices: new Set<number>(),
        incorrectIndices: new Set<number>(),
      };
    case "Reset":
      return {
        ...defaultKeyState,
        words: action.payload,
        characterLength: action.payload.join(" ").length,
        correctIndices: new Set<number>(),
        incorrectIndices: new Set<number>(),
      }
    default:
      return state;
  }
};
export const handleKeyEvent = (
  keyState: KeyStateType,
  keyDispatch: React.Dispatch<ComplexKeyActionType>,
  key: string,
  allWords: string[]
) => {
  if (keyState.correctIndices.size + 1 === keyState.characterLength) {
    keyDispatch({ type: "FinishedSet" });
    keyDispatch({
      type: "UpdateWords",
      payload: getNShuffledWords(allWords, 20),
    });
    key;
  } else if (
    key === "space" &&
    " " === keyState.words.join(" ")[keyState.currentIndex]
  ) {
    keyDispatch({ type: "CorrectKeyPress" });
  } else if (key === keyState.words.join(" ")[keyState.currentIndex]) {
    keyDispatch({ type: "CorrectKeyPress" });
  } else {
    keyDispatch({ type: "IncorrectKeyPress" });
  }
};

export default keyReducer;
