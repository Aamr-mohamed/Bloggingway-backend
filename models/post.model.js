import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    Title: { type: String },
    post: { type: String, required: true },
    createdAt: { type: String },
    comments: { type: Array, default: [] },
    likes: { type: Map, of: Boolean },
    picticePath: { String },
  },
  { timeStamps: true }
);
const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
