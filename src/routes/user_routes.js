var express = require("express");
var router = express.Router();

// GET request for creating User.
router.get("/user/create", (req, res) => {
  res.send("NOT IMPLEMENTED: User create GET");
});

module.exports = router;
