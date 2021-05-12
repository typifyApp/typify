import { Card, CardContent, Typography } from "@material-ui/core";
const Statistics = ({ statistics }) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Speed: {statistics.wordsPerMinute} Errors: {statistics.errors} Time:{" "}
          {statistics.timeDifferenceInSeconds} Correct chars:{" "}
          {statistics.correctChars}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Statistics;
