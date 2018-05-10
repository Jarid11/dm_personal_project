import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./component/Home/Home";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import Shop from "./component/Shop/Shop";
import Cart from "./component/Cart/Cart";
import Checkout from "./component/Checkout/Checkout";
import PrivacyNotice from "./component/PrivacyNotice/PrivacyNotice";
import Disclaimer from "./component/Disclaimer/Disclaimer";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/shop" component={Shop} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/cart" component={Cart} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/shop/:type" component={Shop} />
    <Route path="/privacy" component={PrivacyNotice} />
    <Route path="/disclaimer" component={Disclaimer} />
  </Switch>
);
