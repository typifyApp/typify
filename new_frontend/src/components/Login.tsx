import { CardHeader } from "@material-ui/core";
import UserContext from "../contexts/UserContext";
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
            <CardHeader title="Login" />
            <label>Username:</label>
            <input value={userData.username} onChange={(e) => dispatch({ ...userData, username: e.target.value })} />
            <label>Password:</label>
            <input type="password" value={userData.password} onChange={(e) => dispatch({ ...userData, password: e.target.value })} />
            <button onClick={() => {
              dispatch({ ...userData, skippedLogin: true })
            }}>Skip login</button>
          </>
        }
      </UserContext.Consumer>
    </Card>
  );
};

export default Login;
