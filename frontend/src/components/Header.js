import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import PieChartIcon from "@material-ui/icons/PieChart";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = ({
  userData,
  loggedIn,
  skippedLogin,
  profileSelected,
  setProfileSelected,
  currentScreen,
  setCurrentScreen,
  updateScreen,
  previousScreen,
  resetMainTyping,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            typify
          </Typography>

          <div className={classes.grow} />
          <Typography className={classes.title} variant="h6" noWrap>
            {currentScreen !== "profile"
              ? userData.username
              : previousScreen === "mainTyping"
              ? "Back to typing"
              : previousScreen === "stats"
              ? "Back to stats"
              : ""}
          </Typography>
          <div className={classes.sectionDesktop}>
            {loggedIn && !skippedLogin ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  document.activeElement.blur();
                  switch (currentScreen) {
                    case "profile":
                      if (previousScreen === "mainTyping") {
                        resetMainTyping(true);
                      }
                      updateScreen(currentScreen, previousScreen);
                      break;
                    case "stats":
                      updateScreen(currentScreen, "profile");
                      break;
                    case "mainTyping":
                      updateScreen(currentScreen, "profile");
                      break;
                    default:
                      console.log("header unknown screen", currentScreen);
                  }
                }}
              >
                {currentScreen !== "profile" ? (
                  <AccountCircle />
                ) : previousScreen === "mainTyping" ? (
                  <KeyboardIcon />
                ) : previousScreen === "stats" ? (
                  <PieChartIcon />
                ) : (
                  ""
                )}
              </IconButton>
            ) : (
              ""
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
