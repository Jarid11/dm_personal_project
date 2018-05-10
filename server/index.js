require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.static(`${__dirname}/../build`))

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
  
console.log('EMAIL: ', req.body.email)
  const mailOptions = {
    from: process.env.GMAIL_EMAIL, // sender address
    to: req.body.email,
    subject: 'Order Confirmation', // Subject line
    html: `<div>
            <div style="display: flex; border-bottom: 1px solid rgb(203,207,212);">
              <img style="width: 150px; height: 80px;" src="http://www.bugstuffonline.com/templates/fallback/images/logo.png"alt="logo"/>
              <h2 style="margin-left: 50%; text-align: center; color: #000;">Shipping Confirmation</h2>
            </div>
            <h3 style="color: rgb(204,102,0);">Hello  ${req.body.firstName},</h3>
            <h3 style="border-bottom: 1px solid rgb(203,207,212); color: rgb(204,102,0);margin: 0">Details</h3>
            <h4 style="margin: 0;color: #000;">Order#${req.body.orderNum}</h4>
            <div style="background: rgb(203,207,212); border-top: 3px solid rgb(203,207,212);width: 80%;display: flex;margin: auto;">
              <div style="width: 50%; padding: 20px">
                <h4 style="text-align: left; color: rgb(0,153,0)">Arriving: ${req.body.arrivalDate}</h4>  
                <h4 style="text-align: left; color: #000; margin: 0;">Shipped to:</h4>
                <h4 style="text-align: left; color: #000; margin: 0;">${req.body.firstName} ${req.body.lastName}</h4>
                <h4 style="text-decoration: none;color: #000;margin-bottom: 0;">${req.body.streetAddress}</h4>
                <h4 style="text-decoration: none;color: #000;margin-top: 0;">${req.body.city}, ${req.body.state}, ${req.body.zip}</h4>
              </div>
              <div style="margin-top: 80px; width: 50%;">
                <h4 style="text-align: center; margin-top: 0; margin-bottom: 3px; color: #000;">Subtotal: ${req.body.subtotal}</h4>
                <h4 style="text-align: center; margin-top: 0; margin-bottom: 3px; color: #000;">Shipping: ${req.body.shippingCost}</h4>
                <h4 style="text-align: center; margin-top: 0; margin-bottom: 3px; color: #000;">Tax: ${req.body.tax}</h4>            
                <h4 style="text-align: center; margin-top: 6px; color: #000;">Total: ${req.body.total}</h4>
              </div>
            <div>
          </div>`// plain text body
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
  updateCart,
  deleteFromCart,
  emptyCart
} = require(`${__dirname}/controllers/cartCtrl`);
const { getShippingInfo, addShippingInfo } = require(`${__dirname}/controllers/userCtrl`);
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
      maxAge: 1000000
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
    // successRedirect: "/",
    // failureRedirect: "/account"
  })
);

//Auth Endpoints
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
app.put("/api/cart", updateCart);
app.delete("/api/cart/:id", deleteFromCart);
app.delete("/api/emptyCart", emptyCart);

//User Endpoints
app.get("/api/getShipInfo", getShippingInfo)
app.post("/api/addShipInfo", addShippingInfo);

//Admin Endpoint
app.put("/api/changePartName", changePartName);
app.put("/api/changePartCategory", changePartCategory);

app.put("/api/changePartPrice", changePartPrice);
app.put("/api/changePartModel", changePartModel);
app.put("/api/changePartSpecial", changePartSpecial);

const path = require("path")
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"))
})

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log(`Port is running on: ${SERVER_CONFIGS.PORT}`);
});
