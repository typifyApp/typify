import {
    CardContent,
    CardHeader,
} from "@material-ui/core";
import Card from "./Card";


export interface ForgotPasswordProps {
}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
    return (
        <Card>
            <CardHeader title="Forgot Password" />
            <CardContent>
            </CardContent>
        </Card>
    );
};

export default ForgotPassword;