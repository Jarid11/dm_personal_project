require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");

const port = process.env.PORT || 3001;

const {
  strat,
  getUser,
  logoutUser
} = require(`${__dirname}/controllers/authCtrl`);
const { getParts } = require(`${__dirname}/controllers/productCtrl`);
const {
  getCart,
  getTotalItems,
  getGrandTotal,
  getCartImgs,
  addToCart,
  deleteFromCart,
  updateCart
} = require(`${__dirname}/controllers/cartCtrl`);

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(err => console.log(err));

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
  app
    .get("db")
    .auth.getUserByAuthid(user.id)
    .then(response => {
      if (!response[0]) {
        app
          .get("db")
          .auth.addUserByAuthid([user.displayName, user.id, user.picture])
          .then(res => {
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//Auth Endpoints
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "http://localhost:3000/#/account"
  })
);

app.get("/api/user", getUser);
app.get("/logout", logoutUser);

//Part Endpoints
app.get("/api/parts", getParts);

//Cart Endpoints
app.get("/api/cart", getCart);
app.get("/api/cartItems", getTotalItems);
app.get("/api/grandTotal", getGrandTotal);
app.get("/api/cartImgs", getCartImgs);
app.post("/api/cart", addToCart);
app.delete("/api/cart/:id", deleteFromCart);
app.put("/api/cart", updateCart);

app.listen(port, () => {
  console.log(`Port is running on: ${port}`);
});
