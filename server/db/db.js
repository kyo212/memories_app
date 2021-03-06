const mysql = require("mysql");
require("dotenv").config();

exports.db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: "utf8mb4",
});
