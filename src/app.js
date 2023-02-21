const express = require("express");
const morganMiddleware = require("./middlewares/morgan.middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyparser = require("body-parser");
const dontenv = require("dotenv");

dontenv.config();

const app = express();

app.use(morganMiddleware);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
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
