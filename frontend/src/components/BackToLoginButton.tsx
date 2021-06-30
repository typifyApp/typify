import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
export interface BackToLoginButtonProps { }

const BackToLoginButton: React.FunctionComponent<BackToLoginButtonProps> =
    () => {
        return (
            <Link to="/login">
                <Button>Back To Login</Button>
            </Link>
        );
    };

export default BackToLoginButton;
