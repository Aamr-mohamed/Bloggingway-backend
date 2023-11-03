import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import fs from "fs";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res) => {
  console.log(req.file);
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      picturePath,
      pictureName,
      date,
      gender,
    } = req.body;
    const salt = await bcrypt.genSalt();

    // req.body.picturePath = req.file.path;
    // req.body.pictureName = req.file.originalname;

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: await bcrypt.hash(password, salt),
      gender,
      date,
      viewedProfile: Math.floor(Math.random() * 1000),
      pictureName,
      picturePath,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    // status 201 means something is created ;D
  } catch (error) {
    // fs.unlink(req.file.path, (_err) => {});
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return next(errorHandler(404, "User not found!"));

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return next(errorHandler(401, "Invalid password!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user, token });
    delete user.password;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
