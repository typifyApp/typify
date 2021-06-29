import { CardHeader } from "@material-ui/core";
import UserContext from "../contexts/UserContext";
import { Formik } from "formik";
import Card from "./Card";
export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  return (
    <Card>
      <UserContext.Consumer>
        {([userData, dispatch]) => (
          <>
            <CardHeader title="Login" />
          </>
        )}
      </UserContext.Consumer>
    </Card>
  );
};

export default Login;
