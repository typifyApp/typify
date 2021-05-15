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

const useStyles = makeStyles({
  loginErrorText: {
    color: "red",
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
}) => {
  const classes = useStyles();
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
        <Box mb={2}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body1">Username</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body1">Password</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Button
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
              setUserData
            )
          }
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            register(
              username,
              password,
              setLoggedIn,
              setLoginPageErrorText,
              userData,
              setUserData
            )
          }
        >
          Register
        </Button>
        <Typography className={classes.loginErrorText}>
          {loginPageErrorText}
        </Typography>
      </Box>
    </Card>
  );
};

export default Login;
