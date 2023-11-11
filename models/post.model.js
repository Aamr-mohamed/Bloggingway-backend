import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    Title: { type: String, unique: true },
    postContent: { type: String, required: true },
    comments: { type: Array, default: [] },
    likes: { type: Map, of: Boolean },
    picturePath: String,
    userPicturePath: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
