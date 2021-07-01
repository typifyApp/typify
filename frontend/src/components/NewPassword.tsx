import {
  Box,
  Button,
  CardContent,
  CardHeader,
  TextField,
  Typography
} from '@material-ui/core';
import Card from './Card';
import { useState } from 'react';
import { passwordValidation } from '../utils/validation';
import { useParams } from 'react-router-dom';

type ParamsType = {
  code: string;
};

export interface ForgotPasswordProps {}

const NewPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { code } = useParams<ParamsType>();
  return (
    <Card>
      <CardHeader title="Choose New Password" className="login-header" />
      <CardContent>
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          className="big-gap"
          flexDirection="column"
        >
          <Typography>Your code is {code}</Typography>

          <TextField
            className="quite-wide"
            id="password"
            name="password"
            required
            variant="standard"
            type="password"
            label="Password"
            value={password}
            error={password.length > 0 && !passwordValidation.isValid(password)}
            onChange={(e) => setPassword(e.target.value)}
            helperText={
              passwordValidation.isValid(password)
                ? passwordValidation.successText
                : password.length === 0
                ? passwordValidation.helperText
                : passwordValidation.errorText
            }
          />
          <TextField
            className="quite-wide"
            id="repeatPassword"
            name="repeatPassword"
            required
            variant="standard"
            label="Repeat Password"
            type="password"
            value={repeatPassword}
            error={
              repeatPassword.length > 0 &&
              (!passwordValidation.isValid(repeatPassword) ||
                repeatPassword !== password)
            }
            onChange={(e) => setRepeatPassword(e.target.value)}
            helperText={
              passwordValidation.isValid(repeatPassword)
                ? repeatPassword === password
                  ? passwordValidation.passwordMatch
                  : passwordValidation.passwordDontMatch
                : repeatPassword.length === 0
                ? passwordValidation.helperText
                : passwordValidation.errorText
            }
          />

          <Button
            variant="contained"
            type="submit"
            disabled={
              !passwordValidation.isValid(password) &&
              password === repeatPassword
            }
          >
            Submit new password
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewPassword;
