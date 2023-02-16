const express = require("express");
const morganMiddleware = require("./middlewares/morgan.middleware");

const app = express();
const logger = require("./utils/logger");

app.use(morganMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  try {
    res.send(error);
  } catch (err) {
    logger.error(err);
  }
});

app.listen(3000, () => {
  logger.info("Server started on port 3000");
});
