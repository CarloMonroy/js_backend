const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const userController = require("../controllers/user_controller");

router.use(bodyParser.urlencoded({ extended: true }));

const controller = new userController();

router.post("/register", (req, res) => {
  controller.registerUser(req, res);
});

router.post("/login", (req, res) => {
  controller.loginUser(req, res);
});

router.get("/get_all_users", (req, res) => {
  controller.getAllUsers(req, res);
});

router.get("/secret", (req, res) => {
  controller.secretRoute(req, res);
});

module.exports = router;
