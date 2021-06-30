import { Card as MUICard } from "@material-ui/core";
import styling from "../utils/styling";
export interface CardProps {
  children: React.ReactNode;
}

const Card: React.FunctionComponent<CardProps> = ({ children }) => {
  return <MUICard elevation={styling.cardElevationHeight}>{children}</MUICard>;
};

export default Card;
