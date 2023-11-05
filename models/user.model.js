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
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
  },

  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
