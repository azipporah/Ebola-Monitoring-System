const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = require("../config/db.config")
db.mongoose = mongoose
db.user = require("./userSchema")
db.role = require("./roleSchema")

db.ROLES = ["user", "hospital", "admin"]

module.exports = db