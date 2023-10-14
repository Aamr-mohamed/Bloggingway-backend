const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    gender: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    username: { type: String, required: true, min: 2, max: 50, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 4 },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    viewedProfile: {
      type: Number,
    },
  },
  { timestamps: true }
);
const user = mongoose.model("User", userSchema);
module.exports = { user };
