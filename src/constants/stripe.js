const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? "pk_test_FPSUBLCiT8839ze0GX9dEQZJ"
    : "pk_test_FPSUBLCiT8839ze0GX9dEQZJ";

export default STRIPE_PUBLISHABLE;
