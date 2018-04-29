require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");

const app = express();

// STRIPE
const SERVER_CONFIGS = require("./constants/server");

const configureServer = require("./server");
const configureRoutes = require("./routes");

configureServer(app);
configureRoutes(app);
//

// NODEMAILER

const nodemailer = require('nodemailer');

app.post('/api/email', function (req, res) {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL, // sender address
    to: req.body.email,
    subject: 'Order Confirmation', // Subject line
    html: `<p>Thank you for ordering from Bugstuff ${req.body.name}</p>`// plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
})

//

const {
  strat,
  getUser,
  logoutUser
} = require(`${__dirname}/controllers/authCtrl`);
const { getParts, getPartCategories } = require(`${__dirname}/controllers/productCtrl`);
const {
  getCart,
  getTotalItems,
  getGrandTotal,
  getCartImgs,
  addToCart,
  deleteFromCart,
  updateCart
} = require(`${__dirname}/controllers/cartCtrl`);
const { addShippingInfo } = require(`${__dirname}/controllers/userCtrl`);
const { changePartName, changePartCategory, changePartPrice, changePartModel, changePartSpecial } = require(`${__dirname}/controllers/adminCtrl`);

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
app.get("/api/partCategories", getPartCategories)

//Cart Endpoints
app.get("/api/cart", getCart);
app.get("/api/cartItems", getTotalItems);
app.get("/api/grandTotal", getGrandTotal);
app.get("/api/cartImgs", getCartImgs);
app.post("/api/cart", addToCart);
app.delete("/api/cart/:id", deleteFromCart);
app.put("/api/cart", updateCart);

//User Endpoints
app.post("/api/addShipInfo", addShippingInfo);

//Admin Endpoint
app.put("/api/changePartName", changePartName);
app.put("/api/changePartCategory", changePartCategory);

app.put("/api/changePartPrice", changePartPrice);
app.put("/api/changePartModel", changePartModel);
app.put("/api/changePartSpecial", changePartSpecial);


app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log(`Port is running on: ${SERVER_CONFIGS.PORT}`);
});
