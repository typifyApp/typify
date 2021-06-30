import {
    CardContent,
    CardHeader,
} from "@material-ui/core";
import Card from "./Card";


export interface RegisterProps {
}

const Register: React.FunctionComponent<RegisterProps> = () => {
    return (
        <Card>
            <CardHeader title="Register" />
            <CardContent>
            </CardContent>
        </Card>
    );
};

export default Register;