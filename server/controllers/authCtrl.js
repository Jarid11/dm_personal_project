const Auth0Strategy = require("passport-auth0");

const { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

const strat = new Auth0Strategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    scope: "openid profile",
    callbackURL: "/auth"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // console.log(profile);
    return done(null, profile);
  }
);

const getUser = (req, res) => {
  cosole.log("HIT");
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    res.status(200).json(req.user);
  }
};

module.exports = {
  strat,
  getUser
};
