import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

const Login = ({
  login,
  register,
  username,
  password,
  setUsername,
  setPassword,
  setLoggedIn,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Login</Typography>
      </CardContent>
      <Box display="flex" flexDirection="column" p={5}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justify="center"
        >
          <Typography variant="body1">Username:</Typography>
          <TextField
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justify="center"
        >
          <Typography variant="body1">Password:</Typography>
          <TextField
            variant="outlined"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => login(username, password, setLoggedIn)}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => register(username, password)}
        >
          Register
        </Button>
      </Box>
    </Card>
  );
};

export default Login;
