// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
// //Using express-session in app with secret key
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(fileUpload());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes   = require("./routes/users");
const productRoutes = require("./routes/products");
const widgetsRoutes = require("./routes/widgets");
const loginRoutes = require("./routes/login");
const uploadRoutes = require("./routes/upload");
const viewRoutes = require("./routes/view");
const heartRoutes = require("./routes/heart");
//const searchRoutes = require("./routes/search");

const messagesRoutes = require("./routes/messages");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/products", productRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/upload", uploadRoutes(db));
app.use("/heart", heartRoutes(db));
app.use("/login", loginRoutes(db));
//app.use("/search", searchRoutes(db));

app.use("/messages", messagesRoutes(db));
//app.use("/upload", uploadRoutes(db));
// Note: mount other resources here, using the same pattern above

// Note: mount other resources here, using the same pattern above

app.get("/viewdesign", (req, res) => {
  res.render('newlayout');
});

app.use("/", viewRoutes(db));
app.get("/", (req, res) => {
  // const body = req.body;
  res.redirect("/");
});








// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.listen(PORT, (err) => console.log(err || `listening on port ${PORT} 😎`));
