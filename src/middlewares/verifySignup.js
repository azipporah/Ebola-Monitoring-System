// const db = require("../Models")
// const ROLES = db.ROLES;
// const User = db.user

const User = require("../Models/userSchema");
const ROLES = require("../Models/roleSchema");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (user) {
            res.status(400).send({ message: "Username is already in use!" });
            return;
        }

        //Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Email is already in use!" });
                return;
            }
            next();
        })
    })
}

checkRolesExisted = (req,res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles[i]; i++){
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} doesn't exist!`
                })
                return
            }
        }
    }
    next();
}

const verifySignup = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}

module.exports = verifySignup