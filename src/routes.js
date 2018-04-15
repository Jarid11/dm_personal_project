import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./component/Home/Home";
import Shop from "./component/Shop/Shop";
import Events from "./component/Events/Events";
import About from "./component/About/About";
import Account from "./component/Account/Account";
import Contact from "./component/Contact/Contact";
import Engine from "./component/Categories/Engine/Engine";
import Interior from "./component/Categories/Interior/Interior";
import Exterior from "./component/Categories/Exterior/Exterior";
import Electrical from "./component/Categories/Electrical/Electrical";
import Brakes from "./component/Categories/Brakes/Brakes";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/shop" component={Shop} />
    <Route path="/events" component={Events} />
    <Route path="/about" component={About} />
    <Route path="/account" component={Account} />
    <Route path="/contact" component={Contact} />
    <Route path="/engine" component={Engine} />
    <Route path="/interior" component={Interior} />
    <Route path="/exterior" component={Exterior} />
    <Route path="/electrical" component={Electrical} />
    <Route path="/brakes" component={Brakes} />
  </Switch>
);
