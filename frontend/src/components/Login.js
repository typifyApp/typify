import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRef } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles({
  loginErrorText: {
    color: "red",
  },
  button: {
    marginTop: "10px",
  },
  skipButton: {
    backgroundColor: "lightgrey",
  },
  long: {
    width: "100%",
  },
});
const Login = ({
  login,
  register,
  username,
  password,
  setUsername,
  setPassword,
  setLoggedIn,
  loginPageErrorText,
  setLoginPageErrorText,
  userData,
  setUserData,
  setSkippedLogin,
  currentScreen,
  setCurrentScreen,
  updateScreen,
}) => {
  const classes = useStyles();
  const formRef = useRef(null);
  ValidatorForm.addValidationRule("isValidPassword", (p) => {
    let errors = [];
    if (p.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      console.log(errors.join("\n"));
      return false;
    }
    setLoginPageErrorText("");
    return true;
  });
  ValidatorForm.addValidationRule("isValidUsername", (p) => {
    let errors = [];
    if (p.length < 1) {
      errors.push("Username too short");
    }
    if (errors.length > 0) {
      console.log(errors.join("\n"));
      return false;
    }
    return true;
  });
  return (
    <Card elevation={20}>
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          style={{ width: "100%", alignItems: "center" }}
        >
          typify
        </Typography>
      </CardContent>
      <Box
        display="flex"
        flexDirection="column"
        p={5}
        justifyContent="space-around"
        m={1}
      >
        <ValidatorForm
          ref={formRef}
          onSubmit={() => {
            console.log("submitted");
          }}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            style={{ width: "100%" }}
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            value={username}
            validators={["required", "isValidUsername"]}
            errorMessages={["A username is required", "Username is not valid"]}
          />
          <TextValidator
            style={{ width: "100%" }}
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            value={password}
            validators={["required", "isValidPassword"]}
            errorMessages={["A password is required", "Password is not valid"]}
          />
          <Button
            type="submit"
            className={`${classes.button} ${classes.long}`}
            mb={3}
            variant="contained"
            color="primary"
            onClick={() =>
              login(
                username,
                password,
                setLoggedIn,
                setLoginPageErrorText,
                userData,
                setUserData,
                setSkippedLogin,
                setCurrentScreen,
                currentScreen,
                updateScreen
              )
            }
          >
            Login
          </Button>
        </ValidatorForm>
        <Button
          className={`${classes.button} ${classes.long}`}
          variant="contained"
          color="secondary"
          onClick={() =>
            register(
              username,
              password,
              setLoggedIn,
              setLoginPageErrorText,
              userData,
              setUserData,
              setSkippedLogin,
              setCurrentScreen,
              currentScreen,
              updateScreen
            )
          }
        >
          Register
        </Button>
        <Button
          className={`${classes.button} ${classes.skipButton} ${classes.long}`}
          variant="contained"
          onClick={() => {
            setSkippedLogin(true);
            setLoggedIn(true);
            updateScreen(currentScreen, "mainTyping");
          }}
        >
          Skip
        </Button>
        {loginPageErrorText.split("\n").map((line) => (
          <Typography display="inline" className={classes.loginErrorText}>
            {line}
          </Typography>
        ))}
      </Box>
    </Card>
  );
};

export default Login;
