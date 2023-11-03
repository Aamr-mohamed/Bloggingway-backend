import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    Title: { type: String, unique: true },
    post: { type: String, required: true },
    comments: { type: Array, default: [] },
    likes: { type: Map, of: Boolean },
    picturePath: String,
    userPicturePath: String,
  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
