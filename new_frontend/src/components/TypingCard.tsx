import {
  CardContent,
  CardActionArea,
  CardHeader,
  Typography,
} from "@material-ui/core";
import Card from "./Card";
import TextContainer from "./TextContainer";
import mostPopularEnglishWords from "../dev-utils/words";
import { get20ShuffledWords } from "../utils/wordUtils";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useEffect, useReducer } from "react";
import keyReducer, { defaultKeyState } from "../reducers/keyReducer";
export interface TypingCardProps {}

const TypingCard: React.FunctionComponent<TypingCardProps> = () => {
  const { header, subHeader, words } = mostPopularEnglishWords;
  const [keyState, keyDispatch] = useReducer(keyReducer, defaultKeyState);

  useEffect(() => {
    keyDispatch({ type: "UpdateWords", payload: get20ShuffledWords(words) });
  }, []);

  return (
    <Card>
      <CardHeader title={header} subheader={subHeader} />
      <Typography>Num correct: {keyState.numCorrect}</Typography>
      <Typography>Num incorrect: {keyState.numIncorrect}</Typography>
      <CardContent>
        <TextContainer keyState={keyState} />
      </CardContent>
      <CardActionArea></CardActionArea>
      <KeyboardEventHandler
        handleKeys={["alphabetic", "space", "backspace", "enter"]}
        onKeyEvent={(key, e) => {
          if (
            key === "space" &&
            " " === keyState.words.join(" ")[keyState.currentIndex]
          ) {
            keyDispatch({ type: "CorrectKeyPress" });
          } else if (key === keyState.words.join(" ")[keyState.currentIndex]) {
            keyDispatch({ type: "CorrectKeyPress" });
          } else {
            keyDispatch({ type: "IncorrectKeyPress" });
          }
        }}
      />
    </Card>
  );
};

export default TypingCard;
