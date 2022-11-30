const express = require('express')
const { verifySignup } = require("../middlewares");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const app = express();


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignup.checkDuplicateUsernameOrEmail,
      verifySignup.checkRolesExisted
    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
};



// user.routes imports
// const express = require('express')
const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");
// const Router = express.Router();


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", userController.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);

    app.get(
        "/api/test/hos",
        [authJwt.verifyToken, authJwt.isHospital],
        userController.hospitalBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.adminBoard
    );
};