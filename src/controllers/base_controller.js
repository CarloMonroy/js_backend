const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const dotenv = require("dotenv");

class base_controller {
  constructor() {}

  verifyToken(token) {
    try {
      const verify = jwt.verify(token, process.env.SECRET_JWT);
      if (verify) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      logger.error(err);
      return false;
    }
  }
}

module.exports = base_controller;
