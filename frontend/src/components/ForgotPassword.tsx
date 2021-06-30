import {
    Box,
    Button,
    CardContent,
    CardHeader,
    TextField
} from '@material-ui/core';
import Card from './Card';
import BackToLoginButton from './BackToLoginButton';
import { useState } from 'react';
export interface ForgotPasswordProps { }

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
    const [email, setEmail] = useState('');
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
                    <TextField
                        required
                        variant="standard"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></TextField>
                    <Button variant="contained">Forgot Password</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ForgotPassword;
