const User = require("../models/user_model");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const base_controller = require("./base_controller");
class userController extends base_controller {
  constructor() {
    super();
  }

  async registerUser(req, res) {
    const user = new User(
      {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      },
      (err, user) => {
        if (err) {
          logger.error(err);
          res.status(418).send("Unable to register user");
        }
      }
    );

    user.save((err, user) => {
      if (err) {
        logger.error(err);
        res.status(418).send("Unable to register user");
      } else {
        res.send("user created");
      }
    });
  }

  getAllUsers(req, res) {
    User.find({}, (err, users) => {
      if (err) {
        logger.error(err);
      } else {
        res.send(users);
      }
    });
  }

  async loginUser(req, res) {
    const user = await User.findOne({
      email: req.body.email,
    });

    try {
      const match = await bcrypt.compare(req.body.password, user.password);
      const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_JWT);
      if (match) {
        res.json({
          accessToken,
        });
      } else {
        res.send("Invalid Credentials");
      }
    } catch (err) {
      logger.error(err);
      res.status(500).send();
    }
  }

  secretRoute(req, res) {
    const token = req.get("Authorization");
    if (this.verifyToken(token)) {
      res.send("Secret Route");
    } else {
      res.status(403).send("Forbidden");
    }
  }
}

module.exports = userController;
