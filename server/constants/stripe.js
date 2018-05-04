const configureStripe = require("stripe");

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? "sk_test_rIDPXs6AVKrvg9tbmvixwkFL"
    : "sk_test_rIDPXs6AVKrvg9tbmvixwkFL";

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
