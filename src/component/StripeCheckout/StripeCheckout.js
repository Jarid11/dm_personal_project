import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "../../constants/stripe";
import PAYMENT_SERVER_URL from "../../constants/server";

const CURRENCY = "USD";

const fromUsdToCent = amount => parseInt(amount * 100);

const successPayment = data => {
  alert("Payment Successful");
  // how to pass email, name orderNum as props??
  // axios.post("/api/email", { email: props.email, name: props.userName })
};

const errorPayment = data => {
  alert("Payment Error");
};

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUsdToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUsdToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
