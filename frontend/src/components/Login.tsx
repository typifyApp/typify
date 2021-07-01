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
import AppleIcon from "@material-ui/icons/Apple";
import TwitterIcon from "@material-ui/icons/Twitter"
import Card from './Card';
import { Redirect, Link } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../utils/validation';
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

const AppleButton = styled(SocialButton)({
  background: '#A2AAAD',
  '&:hover': {
    background: '#B3BBBE'
  }
})

const TwitterButton = styled(SocialButton)({
  background: '#1DA1F2',
  '&:hover': {
    background: '#2EB2F3'
  }
})

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
                  className="big-gap"
                >
                  <Typography>Login with a social provider</Typography>
                  <AppleButton
                    className="quite-wide"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch({ ...userData, skippedLogin: true });
                    }}
                  >
                    <AppleIcon />
                    <Typography variant="button" className="grow">
                      Login with Apple
                    </Typography>
                  </AppleButton>
                  <TwitterButton
                    className="quite-wide"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch({ ...userData, skippedLogin: true });
                    }}
                  >
                    <TwitterIcon />
                    <Typography variant="button" className="grow">
                      Login with Twitter
                    </Typography>
                  </TwitterButton>
                  <GoogleButton
                    className="quite-wide"
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
                  className="big-gap"
                >
                  <Typography>Login with email and password</Typography>
                  <TextField
                    className="quite-wide"
                    required
                    label="Email"
                    value={userData.email}
                    error={
                      userData.email.length > 0 &&
                      !emailValidation.isValid(userData.email)
                    }
                    helperText={
                      emailValidation.isValid(userData.email)
                        ? emailValidation.successText
                        : userData.email.length === 0
                          ? emailValidation.helperText
                          : emailValidation.errorText
                    }
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
                    error={
                      userData.password.length > 0 &&
                      !passwordValidation.isValid(userData.password)
                    }
                    helperText={
                      passwordValidation.isValid(userData.password)
                        ? passwordValidation.successText
                        : userData.password.length === 0
                          ? passwordValidation.helperText
                          : passwordValidation.errorText
                    }
                    onChange={(e) =>
                      dispatch({ ...userData, password: e.target.value })
                    }
                    variant="standard"
                    type="password"
                  />
                  <Button
                    disabled={!emailValidation.isValid(userData.email) || !passwordValidation.isValid(userData.password)}
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
