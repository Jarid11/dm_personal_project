const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "http://bugstuff.online"
    : "http://localhost:3001";

export default PAYMENT_SERVER_URL;
