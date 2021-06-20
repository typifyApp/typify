import { Typography } from "@material-ui/core";

export interface TextProps {
  children: React.ReactNode;
}

const Text: React.FunctionComponent<TextProps> = ({ children }) => {
  return <div className="typing-card-text">{children}</div>;
};

export default Text;
