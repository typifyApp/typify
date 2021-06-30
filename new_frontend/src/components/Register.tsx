import { Button, Box, CardContent, CardHeader, TextField } from '@material-ui/core';
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
                            <Box className="gap" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
                                <TextField
                                    className="quite-wide"
                                    required
                                    label="Repeat Password"
                                    value={userData.repeatPassword}
                                    onChange={(e) =>
                                        dispatch({ ...userData, repeatPassword: e.target.value })
                                    }
                                    variant="standard"
                                    type="password"
                                />
                                <Button variant="contained" className="quite-wide">Register</Button>
                            </Box>
                        </CardContent>
                    </>
                )}
            </UserContext.Consumer>
        </Card>
    );
};

export default Register;
