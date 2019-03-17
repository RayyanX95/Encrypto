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
            <Route path="/how-to-use" component={HowToUse} />
            <Route path="/about" component={AlgorithmsHandling} />
            <Route path="/contact" component={AlgorithmsHandling} />
            <Route path="/" exact component={AlgorithmsHandling} />
            <Route component={HowToUse} />
          </Switch>
        </HashRouter>
      </Layout>
    );
  }
}

export default App;
