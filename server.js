const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
var express = require("express");
const cors = require("cors");

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to server");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server" });
});
app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

// app.get("/");
