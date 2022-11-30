const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();
const router = require('./Routes/auth.user.routes')
// const Router = require('./Routes/user.routes')

var corsOptions = { origin: "http://localhost:8081" }

const path = require("path")
require('dotenv').config();
dotenv.config({ path: '.env' });

const port = process.env.PORT || 8000;
const url = "mongodb+srv://azippy:zippy@cluster1.d9zti2c.mongodb.net/EMS";

// imports
// const router = require('./Routes/auth') //importing the routes file
// const db = require('./Models')
// const Role = db.role

// const User = require("../Models/userSchema");
const Role = require("./Models/roleSchema");

// routes
require('./Routes/auth.user.routes')(app);
// require('./Routes/user.routes')(app);


// middleware
app.use(express.json()) // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));
app.use('/', router)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors(corsOptions))

// testing the server
app.get('/', (req, res) => {
    res.send("On Home!!");
})

// connecting to the database
mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log('Connected to db')
    initial();
})
    .catch(err => {
        console.error("Connection error", err)
        process.exit()
    })

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added 'user' to roles collection");
            });

            new Role({
                name: "hospital"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added 'hospital' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added 'admin' to roles collection");
            });
        }
    });
}

// listening to the port
app.listen(port, (req, res) => {
    console.log(`Server started at port: ${port}`);
});