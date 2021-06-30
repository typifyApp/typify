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
export interface ForgotPasswordProps { }

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
    const [email, setEmail] = useState('');
    const [sentEmail, setSentEmail] = useState(false);

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
                    className="gap"
                    flexDirection="column"
                >
                    {sentEmail ? (
                        <Typography>
                            Instructions will be sent to your email if you had previously signed up
                        </Typography>
                    ) : (
                        <>
                            <TextField
                                required
                                variant="standard"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></TextField>
                            <Button variant="contained" onClick={handleForgotPassword}>Forgot Password</Button>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ForgotPassword;
