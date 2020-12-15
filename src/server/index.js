require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const buildRouter = require("./routes");

const app = express(); // define our app using express
const port = process.env.PORT || 3000; // set our port

// configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(cookieParser());

// ROUTES FOR OUR API
const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
    if (!req.files) req.files = {};
    next();
});

// REGISTER OUR ROUTES -------------------------------
buildRouter(router);
app.use("/api", router);

app.get("*", (req, res) => {
    const index = path.join(__dirname, "..", "..", "public", "index.html");
    res.sendFile(index);
});

// START THE SERVER -------------------------------
app.listen(port);
console.log(`App listening on ${port}`);
