import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    fontSize: 20,
    fontFamily: "Ubuntu Mono",
  },
  flash: {
    fontSize: 40,
  },
});
const Display = ({ typedText, textToType, statistics, setStatistics }) => {
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            keep it up!
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            20 words from the most common 100 english words
          </Typography>

          <Typography display="inline" variant="body2" component="p">
            {textToType.split("").map((char, i) => (
              <Typography
                className={`${classes.text} ${
                  i === typedText.length ? classes.flash : ""
                }`}
                display="inline"
                color={
                  typedText.length <= i
                    ? "textSecondary"
                    : typedText[i] === char
                    ? "primary"
                    : "secondary"
                }
              >
                {char === " " ? "_" : char}{" "}
                {i !== 0 && i % 50 === 0 ? <br /> : ""}
              </Typography>
            ))}
          </Typography>
        </CardContent>
      </Card>
      <Card>{typedText}</Card>
    </>
  );
};

export default Display;
