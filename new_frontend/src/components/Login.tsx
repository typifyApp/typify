import { Button, Box, CardHeader, Grid, TextField, Typography } from "@material-ui/core";
import UserContext from "../contexts/UserContext";
import GitHubIcon from '@material-ui/icons/GitHub';
import GoogleIcon from '@material-ui/icons/Google';
import { Formik } from "formik";
import Card from "./Card";
import { Redirect } from "react-router-dom";
export interface LoginProps {
}

const Login: React.FunctionComponent<LoginProps> = () => {

  return (
    <Card>
      <UserContext.Consumer>
        {([userData, dispatch]) =>
          <>
            {userData.skippedLogin ? <Redirect to="/" /> : null}
            <CardHeader title="Login" className="login-header" />
            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="column" alignContent="center" alignItems="center">
                  <Typography>Login with social Provider</Typography>
                  <Button className="quite-wide google" variant="contained" color="primary" onClick={() => {
                    dispatch({ ...userData, skippedLogin: true })
                  }}><GoogleIcon />Login with Google</Button>
                  <Button className="quite-wide" variant="contained" color="primary" onClick={() => {
                    dispatch({ ...userData, skippedLogin: true })
                  }}><GitHubIcon />Login with GitHub</Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}><TextField required label="Username" value={userData.username} onChange={(e) => dispatch({ ...userData, username: e.target.value })} />
                <TextField required label="Password" value={userData.password} onChange={(e) => dispatch({ ...userData, password: e.target.value })} type='password' />
                <Button className="wide" variant="contained" color="primary" onClick={() => {
                  dispatch({ ...userData, skippedLogin: true })
                }}>Login</Button>
                <Button className="wide" variant="contained" color="primary" onClick={() => {
                  dispatch({ ...userData, skippedLogin: true })
                }}>Skip login</Button>
              </Grid>

            </Grid>
          </>
        }
      </UserContext.Consumer>
    </Card>
  );
};

export default Login;
