const express = require('express')
const { verifySignup } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const router = express.Router();

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/api/auth/signup",
    [
      verifySignup.checkDuplicateUsernameOrEmail,
      verifySignup.checkRolesExisted
    ],
    controller.signup
  );

  router.post("/api/auth/signin", controller.signin);
};