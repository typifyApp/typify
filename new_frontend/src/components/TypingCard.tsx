import {
  CardContent,
  CardActionArea,
  CardHeader,
} from "@material-ui/core";
import Card from "./Card";
import TextContainer from "./TextContainer";
import mostPopularEnglishWords from "../dev-utils/words";
import { getNShuffledWords } from "../utils/wordUtils";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useEffect, useReducer } from "react";
import keyReducer, {
  defaultKeyState,
  handleKeyEvent,
} from "../reducers/keyReducer";
import { UserDataType } from "../contexts/UserContext";
import { Redirect } from "react-router-dom";

export interface TypingCardProps {
  userData: UserDataType
}

const TypingCard: React.FunctionComponent<TypingCardProps> = ({ userData }) => {
  const { header, subHeader, words } = mostPopularEnglishWords;
  const [keyState, keyDispatch] = useReducer(keyReducer, defaultKeyState);
  const numWords = 20;
  const { loggedIn, skippedLogin } = userData;
  if (!loggedIn && !skippedLogin) {
    return <Redirect to="/login" />
  }
  useEffect(() => {
    keyDispatch({
      type: "UpdateWords",
      payload: getNShuffledWords(words, numWords),
    });
  }, []);


  return (
    <Card>
      <CardHeader title={`${numWords} words`} subheader={subHeader} />
      <CardContent>
        <TextContainer keyState={keyState} />
      </CardContent>
      <CardActionArea></CardActionArea>
      <KeyboardEventHandler
        handleKeys={["alphabetic", "space", "enter"]}
        onKeyEvent={(key, e) => {
          handleKeyEvent(keyState, keyDispatch, key, words);
        }}
      />
    </Card>
  );
};

export default TypingCard;
