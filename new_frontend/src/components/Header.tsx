import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import brand from "../utils/brand";

const useStyles = makeStyles({
  headerImage: {
    flexGrow: 1,
    textAlign: "right",
  },
});

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className="header" elevation={0}>
      <Toolbar>
        <Link to={"/"}>
          <img src={brand.logoURL} alt="typify logo" className={`t-key `} />
        </Link>
        <h1 className={`title ${classes.headerImage}`}>{brand.name}</h1>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
