const express = require("express");
const morganMiddleware = require("./middlewares/morgan.middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dontenv = require("dotenv");

const SECRET_JWT = process.env.SECRET_JWT;

dontenv.config();

const app = express();

app.use(morganMiddleware);
app.use(bodyparser.urlencoded({ extended: true }));

// Add Routes
app.use("/user", require("./routes/user_routes"));
app.use("/blog", require("./routes/blog_routes"));

mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongodb:27017/motorblog?authSource=admin`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      logger.error(err);
      logger.error("Unable to connect to db");
    } else {
      logger.info("Connected to database");
    }
  }
);

app.listen(3000, () => {
  logger.info("Server started on port 3000");
});
