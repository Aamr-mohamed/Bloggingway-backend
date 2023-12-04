import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    pictureName: {
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
    about: {
      type: String,
      default: "Go to edit page to add",
    },
    role: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
