import { Card, CardContent, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
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
    fontSize: 25,
    fontFamily: "Ubuntu Mono",
  },
  textCorrect: {
    color: teal[500],
  },
  textWrong: {
    color: red[500],
  },
  textNotYet: {
    color: grey[500],
  },
  textCorrected: {
    color: orange[500],
  },
});
const Display = ({
  typedText,
  textToType,
  recordError,
  errorSet,
  recordCorrected,
  setCorrectedSet,
}) => {
  const classes = useStyles();
  let lastSpace = 0;

  return (
    <Box lineHeight={4}>
      <Card elevation={20}>
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

          <Typography display="inline">
            {textToType.split("").map((char, i) => (
              <Typography
                component={"span"}
                key={i}
                className={`${classes.text} ${
                  i === typedText.length ? "cursorBlink" : ""
                } ${
                  typedText.length <= i
                    ? classes.textNotYet
                    : typedText[i] === char
                    ? errorSet.has(i)
                      ? (recordCorrected(i), classes.textCorrected)
                      : classes.textCorrect
                    : (recordError(i), classes.textWrong)
                }`}
                display="inline"
              >
                {char === " " ? "␣" : char}
                {char === " " && i !== 0 && lastSpace > 40
                  ? ((lastSpace = 0), (<br />))
                  : (lastSpace++, "")}
              </Typography>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Display;
