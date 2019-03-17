import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./containers/Layout/Layout";
import AlgorithmsHandling from "./containers/AlgorithmsHandling/AlgorithmsHandling";
import HowToUse from "./components/HowToUse/HowToUse";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Layout>
        <HashRouter>
          <Switch>
            <Route path="/enc-dec/#how-to-use" component={HowToUse} />
            <Route path="/enc-dec/#about" component={AlgorithmsHandling} />
            <Route path="/enc-dec/#contact" component={AlgorithmsHandling} />
            <Route path="/enc-dec/#" exact component={AlgorithmsHandling} />
            <Route component={HowToUse} />
          </Switch>
        </HashRouter>
      </Layout>
    );
  }
}

export default App;
