import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { defaultUserData } from "./contexts/UserContext";
import UserContext from "./contexts/UserContext";
import Header from "./components/Header";
import TypingCard from "./components/TypingCard";
import Login from "./components/Login";

const App: React.FunctionComponent = () => {
  const [userData, dispatch] = useState(defaultUserData);

  return (
    <Router>
      <UserContext.Provider value={[userData, dispatch]}>
        <Header />
        <Box mt={4}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/">
                  <UserContext.Consumer>
                    {([userData]) => <TypingCard userData={userData} />}
                  </UserContext.Consumer>
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Box>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
