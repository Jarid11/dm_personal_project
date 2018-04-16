import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./component/Home/Home";
import Shop from "./component/Shop/Shop";
import Events from "./component/Events/Events";
import About from "./component/About/About";
import Account from "./component/Account/Account";
import Contact from "./component/Contact/Contact";
import Product from "./component/Categories/Product/Product";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/shop" component={Shop} />
    <Route path="/events" component={Events} />
    <Route path="/about" component={About} />
    <Route path="/account" component={Account} />
    <Route path="/contact" component={Contact} />
    <Route path="/product/:type" component={Product} />
  </Switch>
);
