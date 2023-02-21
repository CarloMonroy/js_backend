const User = require("../models/user_model");
const passport = require("passport");
const logger = require("../utils/logger");
// Create user controller class

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

class userController {
  constructor() {}

  registerUser(usr, pwd) {
    User.register({ username: usr }, pwd, (err, user) => {
      if (err) {
        logger.error(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("User registered");
        });
      }
    });
  }
}

module.exports = userController;
