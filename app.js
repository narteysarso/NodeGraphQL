const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//General middleware
app.use(bodyParser.json()); //Parses application/json body content

app.use((req, res, next) => {
  const error = new Error("Not Implemented");
  error.statusCode = 501;
  throw error;
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  res.status(error.statusCode).json({ message: error.message });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    app.listen(process.env.HOST_PORT);
  })
  .catch(err => console.log(err));
