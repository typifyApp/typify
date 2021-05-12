import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import common100 from "./words/common100";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Display from "./components/Display";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Statistics from "./components/Statistics";
const keys = "qwertyuiopasdfghjklzxcvbnm";

const shuffle = (words) => {
  // get first 20 of shuffled
  const allWords = words.map((wordObject) => wordObject.word);
  allWords.sort((a, b) => 0.5 - Math.random());
  console.log("allwords", allWords);
  return allWords.slice(0, 20).join(" ");
};
const App = () => {
  const [typedText, setTypedText] = useState("");
  const [textToType, setTextToType] = useState(shuffle(common100));
  const [statistics, setStatistics] = useState({
    errorsSoFar: 0,
    errors: 0,
    startTime: null,
  });
  const handleKeystroke = (keyStroke) => {
    let currentCharIndex = typedText.length - 1;
    if (
      typedText.charAt(currentCharIndex) !== textToType.charAt(currentCharIndex)
    ) {
      setStatistics({
        ...statistics,
        errorsSoFar: statistics.errorsSoFar + 1,
      });
    }
    if (!statistics.startTime) {
      setStatistics({
        ...statistics,
        startTime: new Date(),
      });
    }
    setTypedText(typedText + keyStroke);
  };
  const resetWords = () => {
    const endTime = new Date();
    let timeDifferenceInSeconds = (endTime - statistics.startTime) / 1000;
    let correctChars = textToType.length - statistics.errorsSoFar;
    let charsPerSecond = correctChars / timeDifferenceInSeconds;
    let charsPerMinute = charsPerSecond * 60;
    let wordsPerMinute = Math.round(charsPerMinute / 4.7);
    setStatistics({
      ...statistics,
      errors: statistics.errorsSoFar,
      errorsSoFar: 0,
      startTime: null,
      wordsPerMinute,
      timeDifferenceInSeconds,
      correctChars,
    });
    setTextToType(shuffle(common100));
  };

  if (typedText.length === textToType.length) {
    resetWords();
    setTypedText("");
  }
  return (
    <>
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} md={6}>
          <Display
            typedText={typedText}
            textToType={textToType}
            statistics={statistics}
            setStatistics={setStatistics}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Keyboard handleKeystroke={handleKeystroke} keys={keys} />
        </Grid>
      </Grid>
      <KeyboardEventHandler
        handleKeys={["alphabetic", "space"]}
        onKeyEvent={(key, e) => {
          switch (key) {
            case "space":
              key = " ";
              break;
          }
          handleKeystroke(key);
        }}
      />
    </>
  );
};

export default App;
