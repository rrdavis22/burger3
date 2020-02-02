require("dotenv").config();

const express = require("express");
const path = require("path");

//Connection to database
const connect = require("./config/connection");

//Connection to burger models
const db = require("./models/Burger");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use("/api/", require("./routes/api.js"));

const PORT = process.env.PORT || 3000;

var syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
