import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  makeStyles,
} from '@material-ui/core';

import SpeedIcon from '@material-ui/icons/Speed';
import ErrorIcon from '@material-ui/icons/Error';
import TimerIcon from '@material-ui/icons/Timer';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  marginBottom: {
    marginBottom: '10px',
  },
  green: {
    color: 'green',
  },
});
const Statistics = ({
  statistics,
  skippedLogin,
  setSkippedLogin,
  setLoggedIn,
  updateScreen,
  currentScreen,
}) => {
  const classes = useStyles();
  return (
    <Card elevation={20}>
      <CardContent>
        <Typography gutterBottom variant="h4" color="primary">
          Stats
        </Typography>
        <Grid container direction="row" alignItems="center">
          <SpeedIcon color="primary" />
          <Typography color="textSecondary">
            &nbsp; Speed
            {' '}
            →
            {' '}
            {statistics.wordsPerMinute
              ? `${statistics.wordsPerMinute} wpm`
              : 'Type to discover!'}
            {' '}
          </Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <ErrorIcon color="primary" />
          <Typography color="textSecondary">
            &nbsp; Errors
            {' '}
            →
            {' '}
            {statistics.errors}
            {' '}
            {statistics.corrected ? (
              <span className={classes.green}>
                (Corrected
                {' '}
                →
                {' '}
                {statistics.corrected}
                )
              </span>
            ) : (
              ''
            )}
          </Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <TimerIcon color="primary" />
          <Typography color="textSecondary">
            &nbsp; Time
            {' '}
            →
            {' '}
            {statistics.timeDifferenceInSeconds}
            {'s  '}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.marginBottom}
        >
          <CheckIcon color="primary" />
          <Typography color="textSecondary">
            &nbsp; Correct chars
            {' '}
            →
            {' '}
            {statistics.correctChars}
            {' '}
          </Typography>
        </Grid>
        {skippedLogin ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            m={1}
          >
            <Button
              className={classes.marginBottom}
              variant="contained"
              color="primary"
              onClick={() => {
                setSkippedLogin(false);
                setLoggedIn(false);
                updateScreen(currentScreen, 'login');
              }}
            >
              Login to save you data
            </Button>
          </Box>
        ) : (
          ''
        )}
        <Typography color="textSecondary" className={classes.marginBottom}>
          Press enter to start next round
        </Typography>
      </CardContent>
    </Card>
  );
};
Statistics.propTypes = {
  statistics: PropTypes.shape({
    timeDifference: PropTypes.number.isRequired,
    wordsPerMinute: PropTypes.number.isRequired,
    timeDifferenceInSeconds: PropTypes.number.isRequired,
    errors: PropTypes.number.isRequired,
    corrected: PropTypes.number.isRequired,
    correctChars: PropTypes.number.isRequired,
  }).isRequired,
  skippedLogin: PropTypes.bool.isRequired,
  setSkippedLogin: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  updateScreen: PropTypes.func.isRequired,
  currentScreen: PropTypes.string.isRequired,
};
export default Statistics;
