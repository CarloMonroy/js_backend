const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("NOT IMPLEMENTED: Blog create");
});

module.exports = router;
