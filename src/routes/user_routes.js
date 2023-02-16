const express = require("express");
const router = express.Router();

// GET request for creating User.
router.get("/create", (req, res, next) => {
  res.send("NOT IMPLEMENTED: User create GET");
});

module.exports = router;
