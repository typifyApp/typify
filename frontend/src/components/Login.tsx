import {
  Button,
  Box,
  CardHeader,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import UserContext from '../contexts/UserContext';
import GitHubIcon from '@material-ui/icons/GitHub';
import GoogleIcon from '@material-ui/icons/Google';
import { Formik } from 'formik';
import Card from './Card';
import { Redirect, Link } from 'react-router-dom';
export interface LoginProps { }
const SocialButton = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'space-between',
  justifyContent: 'space-between',
  textAlign: 'center'
});

const GoogleButton = styled(SocialButton)({
  background: '#de5246',
  '&:hover': {
    background: '#ef6267'
  }
});

const GitHubButton = styled(SocialButton)({
  background: '#333',
  '&:hover': {
    background: '#555'
  }
});

const Login: React.FunctionComponent<LoginProps> = () => {
  return (
    <Card>
      <UserContext.Consumer>
        {([userData, dispatch]) => (
          <>
            {userData.skippedLogin ? <Redirect to="/" /> : null}
            <CardHeader
              title="Login"
              className="login-header"
              subheader={
                <Button
                  onClick={() => {
                    dispatch({ ...userData, skippedLogin: true });
                  }}
                >
                  Skip Login
                </Button>
              }
            />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="margin-bottom"
            >
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignContent="center"
                  alignItems="center"
                  justifyContent="space-between"
                  className="gap"
                >
                  <Typography>Login with a social provider</Typography>
                  <GoogleButton
                    className="quite-wide google"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch({ ...userData, skippedLogin: true });
                    }}
                  >
                    <GoogleIcon />
                    <Typography variant="button" className="grow">
                      Login with Google
                    </Typography>
                  </GoogleButton>
                  <GitHubButton
                    className="quite-wide"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch({ ...userData, skippedLogin: true });
                    }}
                  >
                    <GitHubIcon />
                    <Typography variant="button" className="grow">
                      Login with GitHub
                    </Typography>
                  </GitHubButton>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2" className="or-text">
                  or
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignContent="center"
                  alignItems="center"
                  className="gap"
                >
                  <Typography>Login with email and password</Typography>
                  <TextField
                    className="quite-wide"
                    required
                    label="Email"
                    value={userData.email}
                    onChange={(e) =>
                      dispatch({ ...userData, email: e.target.value })
                    }
                    variant="standard"
                  />
                  <TextField
                    className="quite-wide"
                    required
                    label="Password"
                    value={userData.password}
                    onChange={(e) =>
                      dispatch({ ...userData, password: e.target.value })
                    }
                    variant="standard"
                    type="password"
                  />
                  <Button
                    className="quite-wide"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch({ ...userData, skippedLogin: true });
                    }}
                  >
                    Login
                  </Button>
                  <Link to="/register" className="quite-wide">
                    <Button
                      className="wide"
                      variant="contained"
                      color="primary"
                    >
                      Register
                    </Button>
                  </Link>
                  <Link to="/forgotpassword" className="quite-wide">
                    <Button
                      className="wide"
                      variant="contained"
                      color="primary"
                    >
                      Forgot Password
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </UserContext.Consumer>
    </Card>
  );
};

export default Login;
