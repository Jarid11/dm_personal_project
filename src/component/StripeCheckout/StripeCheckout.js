import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2'

import "./StripeCheckout.css"

import STRIPE_PUBLISHABLE from "../../constants/stripe";
import PAYMENT_SERVER_URL from "../../constants/server";

const CURRENCY = "USD";

const fromUsdToCent = amount => parseInt(amount * 100, 10);

const successPayment = (firstName, lastName, streetAddress, extraAddressInfo, city, state, zip, email, arrivalDate, subtotal, shippingCost, tax, total, orderNum) => {
  Swal({
    position: 'center',
    type: 'success',
    title: 'Your order has been placed',
    showConfirmButton: false,
    timer: 2500
  }).then(() => {
    (window.location.replace("/"))
    axios.post("/api/email", { firstName, lastName, streetAddress, extraAddressInfo, city, state, zip, email, arrivalDate, subtotal, shippingCost, tax, total, orderNum })
  })
};

const errorPayment = (data) => {
  Swal({
    position: 'center',
    type: 'error',
    title: 'Something went wrong',
    showConfirmButton: false,
    timer: 2500
  })
};

const onToken = (amount, description, firstName, lastName, streetAddress, extraAddressInfo, city, state, zip, email, arrivalDate, subtotal, shippingCost, tax, total, orderNum) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUsdToCent(amount)
    })
    .then(() => successPayment(firstName, lastName, streetAddress, extraAddressInfo, city, state, zip, email, arrivalDate, subtotal, shippingCost, tax, total, orderNum))
    .catch(errorPayment)

const Checkout = ({ name, description, amount, firstName, lastName, streetAddress, extraAddressInfo, city, state, zip, email, arrivalDate, subtotal, shippingCost, tax, total, orderNum }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUsdToCent(amount)}
    token={onToken(amount, description, firstName, lastName, streetAddress, extraAddressInfo, city, state, zip, email, arrivalDate, subtotal, shippingCost, tax, total, orderNum)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
