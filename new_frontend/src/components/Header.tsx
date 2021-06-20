import { AppBar, Toolbar, Typography } from "@material-ui/core";
import brand from "../utils/brand";
export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <h1 className="title">{brand.name}</h1>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
