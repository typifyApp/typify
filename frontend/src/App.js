import { useState, useEffect } from "react";
import UserAdministration from "./services/UserAdministration";
import { Grid, ThemeProvider } from "@material-ui/core";
import common100 from "./words/common100";
import Header from "./components/Header";
import Statistics from "./components/Statistics";
import Login from "./components/Login";
import Display from "./components/Display";
import Profile from "./components/Profile";
import KeyboardEventHandler from "react-keyboard-event-handler";
import WordsUtils from "./utils/WordsUtils";
import SetUtils from "./utils/SetUtils";
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

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastSpace, setLastSpace] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [textToType, setTextToType] = useState(WordsUtils.shuffle(common100));
  const [errorSet, setErrorsSet] = useState(new Set());
  const [corrrectedSet, setCorrectedSet] = useState(new Set());
  const [profileSelected, setProfileSelected] = useState(false);
  const [loginPageErrorText, setLoginPageErrorText] = useState("");
  const [userData, setUserData] = useState({});
  const [skippedLogin, setSkippedLogin] = useState(false);
  const [previousScreen, setPreviousScreen] = useState("login");
  const [currentScreen, setCurrentScreen] = useState("login"); // ["login", "mainTyping","stats", "profile"]

  const [statistics, setStatistics] = useState({
    errorsSoFar: 0,
    errors: 0,
    startTime: null,
    corrected: 0,
  });

  useEffect(() => {
    const doOnce = () => {
      let localStorageUsername = localStorage.getItem("username");
      if (localStorageUsername) {
        setUsername(localStorageUsername);
        setUserData({ username: localStorageUsername });
        setLoggedIn(true);
        setCurrentScreen("mainTyping");
      }
    };
    doOnce();
  }, []);

  const updateScreen = (current, updated) => {
    setPreviousScreen(current);
    setCurrentScreen(updated);
  };

  const recordError = (errorIndex) => {
    errorSet.add(errorIndex);
  };
  const recordCorrected = (correctedIndex) => {
    corrrectedSet.add(correctedIndex);
  };

  const resetMainTyping = (resetTypedText) => {
    setStatistics({
      ...statistics,
      errors: 0,
      errorsSoFar: 0,
      startTime: new Date(),
    });
    setErrorsSet(new Set());
    setCorrectedSet(new Set());
    if (resetTypedText) {
      setTypedText("");
    }
  };

  const handleBackspace = () => {
    if (typedText.length <= 1) {
      resetMainTyping(false);
    }
    let currentCharIndex = typedText.length - 1;
    if (errorSet.has(currentCharIndex + 1)) {
      setStatistics({
        ...statistics,
        errorsSoFar: Math.max(statistics.errorsSoFar - 1, 0),
      });
    }
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
    SetUtils.removeAll(corrrectedSet, errorSet);
    const endTime = new Date();
    let timeDifferenceInSeconds = (endTime - statistics.startTime) / 1000;
    let correctChars = Math.min(
      textToType.length,
      textToType.length - statistics.errorsSoFar + corrrectedSet.size
    );

    console.log("textToType.length", textToType.length);
    console.log("errorsSoFar", statistics.errorsSoFar);
    console.log("corrrectedSet", corrrectedSet);
    console.log("corrrectedSet.size", corrrectedSet.size);
    console.log("correctChars", correctChars);

    let charsPerSecond = correctChars / timeDifferenceInSeconds;
    let charsPerMinute = charsPerSecond * 60;
    let wordsPerMinute = Math.round(charsPerMinute / 5);
    setStatistics({
      ...statistics,
      errors: statistics.errorsSoFar,
      errorsSoFar: 0,
      startTime: null,
      wordsPerMinute,
      timeDifferenceInSeconds,
      correctChars,
      corrected: corrrectedSet.size,
    });
    setTextToType(WordsUtils.shuffle(common100));
    setErrorsSet(new Set());
    updateScreen(currentScreen, "stats");
    setCorrectedSet(new Set());
  };

  if (typedText.length === textToType.length) {
    resetWords();
    setTypedText("");
  }

  return (
    <ThemeProvider theme={theme}>
      {currentScreen === "login" ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
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
              setSkippedLogin={setSkippedLogin}
              currentScreen={currentScreen}
              updateScreen={updateScreen}
              setCurrentScreen={setCurrentScreen}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Header
            userData={userData}
            loggedIn={loggedIn}
            skippedLogin={skippedLogin}
            profileSelected={profileSelected}
            setProfileSelected={setProfileSelected}
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            updateScreen={updateScreen}
            previousScreen={previousScreen}
            resetMainTyping={resetMainTyping}
          />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "70vh" }}
          >
            <Grid item xs={12} md={6}>
              {currentScreen === "profile" ? (
                <Profile userData={userData} />
              ) : currentScreen === "stats" ? (
                <Statistics
                  statistics={statistics}
                  skippedLogin={skippedLogin}
                  setSkippedLogin={setSkippedLogin}
                  setLoggedIn={setLoggedIn}
                  updateScreen={updateScreen}
                  currentScreen={currentScreen}
                />
              ) : currentScreen === "mainTyping" ? (
                <Display
                  typedText={typedText}
                  textToType={textToType}
                  setStatistics={setStatistics}
                  lastSpace={lastSpace}
                  setLastSpace={setLastSpace}
                  recordError={recordError}
                  errorSet={errorSet}
                  recordCorrected={recordCorrected}
                />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <KeyboardEventHandler
            handleKeys={["alphabetic", "space", "backspace", "enter"]}
            onKeyEvent={(key, e) => {
              switch (key) {
                case "backspace":
                  handleBackspace();
                  break;
                case "space":
                  handleKeystroke(" ");
                  break;
                case "enter":
                  if (currentScreen === "stats") {
                    updateScreen(currentScreen, "mainTyping");
                  }
                  break;
                default:
                  if (currentScreen !== "mainTyping") {
                    break;
                  }
                  handleKeystroke(key);
              }
            }}
          />
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
