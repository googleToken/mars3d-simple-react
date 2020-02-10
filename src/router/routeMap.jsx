import React from "react";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import "../common/public";
import Box from "../container";

import GISMap from "../container/map/cesiumContainer";

class RouterMap extends React.Component {

  render() {
    return (
      <HashRouter>
        <Box userName="admin">
          <Switch>
            <Route exact path="/" component={GISMap} />
          </Switch>
        </Box>
      </HashRouter>
    );
  }
}

export default RouterMap;