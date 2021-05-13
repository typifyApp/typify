import { CardContent, Typography, Grid } from "@material-ui/core";
import SpeedIcon from "@material-ui/icons/Speed";
import ErrorIcon from "@material-ui/icons/Error";
import TimerIcon from "@material-ui/icons/Timer";
import CheckIcon from "@material-ui/icons/Check";

const Statistics = ({ statistics }) => {
  return (
    <CardContent>
      <Typography gutterBottom variant="h4" style={{ color: "#3f51b5" }}>
        Stats
      </Typography>
      <Grid container direction="row" alignItems="center">
        <SpeedIcon style={{ fill: "#3f51b5" }} />
        <Typography color="textSecondary">
          &nbsp; Speed {"→"}{" "}
          {statistics.wordsPerMinute
            ? `${statistics.wordsPerMinute} wpm`
            : "Type to discover!"}{" "}
        </Typography>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <ErrorIcon style={{ fill: "#3f51b5" }} />
        <Typography color="textSecondary">
          &nbsp; Errors {"→"} {statistics.errors}{" "}
        </Typography>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <TimerIcon style={{ fill: "#3f51b5" }} />
        <Typography color="textSecondary">
          &nbsp; Time {"→"} {statistics.timeDifferenceInSeconds}
          {"s  "}
        </Typography>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <CheckIcon style={{ fill: "#3f51b5" }} />
        <Typography color="textSecondary">
          &nbsp; Correct chars {"→"} {statistics.correctChars}{" "}
        </Typography>
      </Grid>
    </CardContent>
  );
};

export default Statistics;
