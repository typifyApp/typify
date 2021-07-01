import {
    Box,
    Button,
    CardContent,
    CardHeader,
    TextField,
    Typography
} from '@material-ui/core';
import Card from './Card';
import BackToLoginButton from './BackToLoginButton';
import { useState } from 'react';
import { emailValidation } from '../utils/validation';
export interface ForgotPasswordProps { }

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
    const [sentEmail, setSentEmail] = useState(false);
    const [email, setEmail] = useState("");
    const handleForgotPassword = () => {
        setSentEmail(true);
    };
    return (
        <Card>
            <CardHeader
                title="Forgot Password"
                className="login-header"
                subheader={<BackToLoginButton />}
            />
            <CardContent>
                <Box
                    display="flex"
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    className="big-gap"
                    flexDirection="row"
                >
                    {sentEmail ? (
                        <Typography>
                            Instructions will be sent to your email if you had previously
                            signed up
                        </Typography>
                    ) : (
                        <>
                            <TextField
                                id="email"
                                name="email"
                                required
                                variant="standard"
                                label="Email"
                                value={email}
                                error={email.length > 0 && !emailValidation.isValid(email)}
                                onChange={(e) => setEmail(e.target.value)}
                                helperText={emailValidation.isValid(email) ? emailValidation.successText : email.length === 0 ? emailValidation.helperText : emailValidation.errorText}
                            ></TextField>

                            <Button variant="contained" type="submit" disabled={!emailValidation.isValid(email)}>
                                Forgot Password
                            </Button>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ForgotPassword;
