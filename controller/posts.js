import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
  try {
    const {
      userId,
      Title,
      postContent,
      picture,
      picturePath,
      userPicturePath,
    } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      username: user.username,
      Title,
      postContent,
      userPicturePath,
      picture,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const removePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { Title, postContent, comments } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { Title, postContent, comments },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(400).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error in editPost:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
