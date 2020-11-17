// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  dbParams
});
db.connect();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
}));

app.use(express.static("public"));

// Separated Routes for each Resource
const main = require("./routes/main");
const admin = require('./routes/admin');

//For main
app.use("/", main(db));
//For admin
app.use("/admin", admin(db));


// Home Page
app.get("/", (req, res) => {
  res.render("homepage");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
