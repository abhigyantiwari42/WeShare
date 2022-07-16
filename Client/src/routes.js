import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ChatPage from "./Components/Chat Page/chatPage";
import JoinIn from "./Components/Join In/joinIn";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <Redirect to="/joinIn" />;
          }}
        />
        <Route path="/joinIn" exact component={JoinIn} />
        <Route path="/chatPage" component={ChatPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
