import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Create from "./components/CreateUser/Create";
import View from "./components/ShowUser/View";
import Footer from "./components/Footer/Footer";
import Edit from "./components/Edit/Edit";
const App = () => {
  return (
    <div className="App">
      <Menu />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Create} />
          <Route path="/view" exact component={View} />
          <Route path="/edit/:id" exact component={Edit} />
          
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
