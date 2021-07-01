import {
    Button,
    Box,
    CardContent,
    CardHeader,
    TextField
} from '@material-ui/core';
import { emailValidation, passwordValidation } from '../utils/validation';
import Card from './Card';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export interface RegisterProps { }

const Register: React.FunctionComponent<RegisterProps> = () => {
    return (
        <Card>
            <UserContext.Consumer>
                {([userData, dispatch]) => (
                    <>
                        <CardHeader
                            title="Register"
                            className="login-header"
                            subheader={
                                <Link to="/login">
                                    <Button>Back To Login</Button>
                                </Link>
                            }
                        />
                        <CardContent>
                            <Box
                                className="gap"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <TextField
                                    className="quite-wide"
                                    id="email"
                                    name="email"
                                    required
                                    label="Email"
                                    value={userData.email}
                                    error={
                                        userData.email.length > 0 &&
                                        !emailValidation.isValid(userData.email)
                                    }
                                    onChange={(e) =>
                                        dispatch({ ...userData, email: e.target.value })
                                    }
                                    variant="standard"
                                    helperText={
                                        emailValidation.isValid(userData.email)
                                            ? emailValidation.successText
                                            : userData.email.length === 0
                                                ? emailValidation.helperText
                                                : emailValidation.errorText
                                    }
                                />
                                <TextField
                                    className="quite-wide"
                                    required
                                    label="Password"
                                    error={
                                        userData.password.length > 0 &&
                                        !passwordValidation.isValid(userData.password)
                                    }
                                    value={userData.password}
                                    onChange={(e) =>
                                        dispatch({ ...userData, password: e.target.value })
                                    }
                                    variant="standard"
                                    type="password"
                                    helperText={
                                        passwordValidation.isValid(userData.password)
                                            ? passwordValidation.successText
                                            : userData.password.length === 0
                                                ? passwordValidation.helperText
                                                : passwordValidation.errorText
                                    }
                                />
                                <TextField
                                    className="quite-wide"
                                    required
                                    label="Repeat Password"
                                    value={userData.repeatPassword}
                                    error={
                                        userData.repeatPassword.length > 0 &&
                                        (!passwordValidation.isValid(userData.repeatPassword) ||
                                            userData.repeatPassword !== userData.password)
                                    }
                                    onChange={(e) =>
                                        dispatch({ ...userData, repeatPassword: e.target.value })
                                    }
                                    variant="standard"
                                    type="password"
                                    helperText={
                                        passwordValidation.isValid(userData.repeatPassword)
                                            ? userData.repeatPassword === userData.password
                                                ? passwordValidation.passwordMatch
                                                : passwordValidation.passwordDontMatch
                                            : userData.repeatPassword.length === 0
                                                ? passwordValidation.helperText
                                                : passwordValidation.errorText
                                    }
                                />
                                <Button
                                    variant="contained"
                                    className="quite-wide"
                                    disabled={
                                        !(passwordValidation.isValid(userData.password) &&
                                            userData.password === userData.repeatPassword &&
                                            emailValidation.isValid(userData.email))
                                    }
                                >
                                    Register
                                </Button>
                            </Box>
                        </CardContent>
                    </>
                )}
            </UserContext.Consumer>
        </Card>
    );
};

export default Register;
