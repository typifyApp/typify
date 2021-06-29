import { CardHeader } from "@material-ui/core";
import UserContext from "../contexts/UserContext";
import { Formik } from "formik";
import Card from "./Card";
export interface LoginProps { }

const Login: React.FunctionComponent<LoginProps> = () => {
  return (
    <Card>
      <UserContext.Consumer>
        {([userData, dispatch]) =>
          <>
            <CardHeader title="Login" />
            <label>Username:</label>
            <input value={userData.username} onChange={(e) => dispatch({ ...userData, username: e.target.value })} />
            <label>Password:</label>
            <input type="password" value={userData.password} onChange={(e) => dispatch({ ...userData, password: e.target.value })} />
            <button onClick={() => dispatch({ ...userData, skippedLogin: true })}>Skip login</button>

          </>
        }
      </UserContext.Consumer>
    </Card>
  );
};

export default Login;
