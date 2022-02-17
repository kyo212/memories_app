const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT;

app.use(
  "/static",
  express.static(path.join(__dirname, "../client/build/static"))
);
app.get("*", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../client/build"),
  });
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT);
