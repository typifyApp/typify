import {
  Card, CardContent, Typography, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Profile = ({ userData }) => (
  <Card elevation={24}>
    <CardContent>
      <Typography color="primary" variant="h3">
        profile
      </Typography>
      <Typography>
        Username:
        {userData.username}
      </Typography>
      <Typography>Nickname: </Typography>

      <Typography>Total time spent:</Typography>
      <Typography>Total time today:</Typography>
      <Typography>All time average words per minute:</Typography>
      <Typography>Average words per minute today:</Typography>
      <Typography>Github style heatmap here</Typography>
      <Button variant="contained" style={{ backgroundColor: 'yellow' }}>
        Change password
      </Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>
        Delete Account
      </Button>
    </CardContent>
  </Card>
);

Profile.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,

};

export default Profile;