const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
var express = require("express");
const cors = require("cors");
const { user } = require("./models/user.model");

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();

app.use(cors());
app.use(express.json());

app.post("/adduser", async (req, res) => {
  try {
    const userData = await user.create(req.body);
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "All fields are requried" });
  }
});
app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

// app.get("/");
