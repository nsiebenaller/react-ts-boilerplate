require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const buildRouter = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(cookieParser());

// Setup router
const router = express.Router();

// Middleware to use for all requests
router.use((req, res, next) => {
    if (!req.files) req.files = {};
    next();
});

// Register Routes
buildRouter(router);
app.use("/api", router);

app.get("*", (req, res) => {
    const index = path.join(__dirname, "..", "..", "public", "index.html");
    res.sendFile(index);
});

// Start server
app.listen(port);
console.log(`App listening on ${port}`);
