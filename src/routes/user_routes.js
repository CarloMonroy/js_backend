const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const userController = require("../controllers/user_controller");

router.use(bodyParser.urlencoded({ extended: true }));

const controller = new userController();
router.post("/register", (req, res) => {
  controller.registerUser(req.body.username, req.body.password);
});

module.exports = router;
