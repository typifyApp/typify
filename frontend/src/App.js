import { useState } from "react";
import UserAdministration from "./services/UserAdministration";
import { Grid, ThemeProvider } from "@material-ui/core";
import common100 from "./words/common100";
import Header from "./components/Header";
import Login from "./components/Login";
import Display from "./components/Display";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[300],
    },
    secondary: {
      main: teal[500],
    },
  },
  text: {
    secondary: teal[500],
  },
  typography: {
    fontFamily: `'Montserrat', sans-serif;`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
const shuffle = (words) => {
  // get first 20 of shuffled
  const allWords = words.map((wordObject) => wordObject.word);
  allWords.sort((a, b) => 0.5 - Math.random());
  return allWords.slice(0, 20).join(" ");
};
const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    process.env.REACT_APP_ENV === "development" ? true : false
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastSpace, setLastSpace] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [textToType, setTextToType] = useState(shuffle(common100));
  const [errorSet, setErrorsSet] = useState(new Set());
  const [loginPageErrorText, setLoginPageErrorText] = useState("");
  const [userData, setUserData] = useState({});

  const [statistics, setStatistics] = useState({
    errorsSoFar: 0,
    errors: 0,
    startTime: null,
  });

  const recordError = (errorIndex) => {
    errorSet.add(errorIndex);
  };

  const handleBackspace = () => {
    setTypedText(typedText.substring(0, typedText.length - 1));
  };

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
    let correctChars = textToType.length - statistics.errorsSoFar - 1;
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
    setErrorsSet(new Set());
  };

  if (typedText.length === textToType.length) {
    resetWords();
    setTypedText("");
  }

  return (
    <ThemeProvider theme={theme}>
      {!loggedIn ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} lg={3}>
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              login={UserAdministration.login}
              register={UserAdministration.register}
              setLoggedIn={setLoggedIn}
              loginPageErrorText={loginPageErrorText}
              setLoginPageErrorText={setLoginPageErrorText}
              userData={userData}
              setUserData={setUserData}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Header userData={userData} />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "70vh" }}
          >
            <Grid item xs={12} md={6}>
              <Display
                typedText={typedText}
                textToType={textToType}
                statistics={statistics}
                setStatistics={setStatistics}
                lastSpace={lastSpace}
                setLastSpace={setLastSpace}
                recordError={recordError}
                errorSet={errorSet}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          ></Grid>
          <KeyboardEventHandler
            handleKeys={["alphabetic", "space", "backspace"]}
            onKeyEvent={(key, e) => {
              switch (key) {
                case "backspace":
                  handleBackspace();
                  break;
                case "space":
                  handleKeystroke(" ");
                  break;
                default:
                  handleKeystroke(key);
                  break;
              }
            }}
          />
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
