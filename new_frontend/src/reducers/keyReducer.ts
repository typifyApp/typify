type KeyActionType = {
  type: "CorrectKeyPress" | "IncorrectKeyPress";
};
type UpdateWordsAction = {
  type: "UpdateWords";
  payload: string[];
};
export type KeyStateType = {
  numCorrect: number;
  numIncorrect: number;
  currentIndex: number;
  words: string[];
  correctIndices: Set<number>;
  incorrectIndices: Set<number>;
};

type ComplexKeyActionType = KeyActionType | UpdateWordsAction;

let set1 = new Set<number>();
let set2 = new Set<number>();

export const defaultKeyState: KeyStateType = {
  numCorrect: 0,
  numIncorrect: 0,
  currentIndex: 0,
  words: [] as string[],
  correctIndices: set1,
  incorrectIndices: set2,
};
const keyReducer = (state: KeyStateType, action: ComplexKeyActionType) => {
  switch (action.type) {
    case "CorrectKeyPress":
      console.log("correct");
      state.correctIndices.add(state.currentIndex);
      return {
        ...state,
        numCorrect: state.numCorrect + 1,
        currentIndex: state.currentIndex + 1,
      };
    case "IncorrectKeyPress":
      console.log("Incorrect");
      state.incorrectIndices.add(state.currentIndex);
      return { ...state, numIncorrect: state.numIncorrect + 1 };
    case "UpdateWords":
      return { ...state, words: action.payload };
    default:
      return state;
  }
};

export default keyReducer;
