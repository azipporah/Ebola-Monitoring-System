const express = require('express')
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const Router = express.Router();

module.exports = function (app) {
    Router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    Router.get("/api/test/all", controller.allAccess);

    Router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    Router.get(
        "/api/test/hos",
        [authJwt.verifyToken, authJwt.isHospital],
        controller.hospitalBoard
    );

    Router.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};