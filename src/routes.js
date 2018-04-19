import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./component/Home/Home";
import Events from "./component/Events/Events";
import About from "./component/About/About";
import Account from "./component/Account/Account";
import Contact from "./component/Contact/Contact";
import Product from "./component/Product/Product";
import Cart from "./component/Cart/Cart";
import Checkout from "./component/Checkout/Checkout";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/product" component={Product} />
    <Route path="/events" component={Events} />
    <Route path="/about" component={About} />
    <Route path="/account" component={Account} />
    <Route path="/contact" component={Contact} />
    <Route path="/cart" component={Cart} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/product/:type" component={Product} />
  </Switch>
);
