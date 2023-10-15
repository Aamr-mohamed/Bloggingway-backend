const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    Title: { type: String, unique: true },
    post: { type: String, required: true },
    createdAt: { type: String },
    comments: { type: Array, default: [] },
    likes: { type: Map, of: Boolean },
    picticePath: { String },
  },
  { timeStamps: true }
);
const post = mongoose.model("Post", postSchema);

module.exports = { post };
