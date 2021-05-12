import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Statistics from "./Statistics";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
          <Statistics statistics={statistics} />
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
    </>
  );
};

export default Display;
