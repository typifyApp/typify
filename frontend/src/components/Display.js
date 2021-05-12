import { Card, CardContent, Typography, Box } from "@material-ui/core";
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
});
const Display = ({ typedText, textToType, statistics }) => {
  const classes = useStyles();
  let lastSpace = 0;
  return (
    <Box lineHeight={4}>
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
                  i === typedText.length ? "cursorBlink" : ""
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
