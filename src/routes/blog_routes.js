const express = require("express");
const router = express.Router();

router.get("/blog", (req, res, next) => {
  res.send("NOT IMPLEMENTED: Blog create GET");
});

module.exports = router;
