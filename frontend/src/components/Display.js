import { Card, CardContent, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

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
  textCorrect: {
    color: teal[500],
  },
  textWrong: {
    color: red[500],
  },
  textNotYet: {
    color: grey[500],
  },
});
const Display = ({ typedText, textToType, statistics }) => {
  const classes = useStyles();
  let lastSpace = 0;
  return (
    <Box lineHeight={4}>
      <Card elevation={20}>
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
                  i === typedText.length ? "cursorBlink" : ""
                } ${
                  typedText.length <= i
                    ? classes.textNotYet
                    : typedText[i] === char
                    ? classes.textCorrect
                    : classes.textWrong
                }`}
                display="inline"
              >
                {char === " " ? "_" : char}{" "}
                {char === " " && i !== 0 && lastSpace > 30
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
