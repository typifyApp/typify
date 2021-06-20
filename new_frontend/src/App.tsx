import { Box, Grid } from "@material-ui/core";
import Header from "./components/Header";
import TypingCard from "./components/TypingCard";
const App: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Box mt={4}>
        <Grid container justify="center">
          <Grid item xs={12} md={8} lg={6}>
            <TypingCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default App;
