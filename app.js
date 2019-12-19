const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//General middleware
app.use(bodyParser.json()); //Parses application/json body content
/**Enable CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Allow all origins to access this server
  res.setHeader("Access-Control-Allow-Methods", "GET PUT PATCH POST DELETE"); //GET PUT PATCH POST DELETE request is allowed
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Accepts Content-Type and Authorization headers
});

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
