const express = require("express");
const morganMiddleware = require("./middlewares/morgan.middleware");
const app = express();
const logger = require("./utils/logger");
const routes = require("./routes");

app.use(morganMiddleware);
app.use("", routes);

app.listen(3000, () => {
  logger.info("Server started on port 3000");
});
