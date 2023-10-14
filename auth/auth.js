import bcrypt from "brycpt";
import jwt from "jsonwebtoken";
import { user } from "../models/user.model";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, gender, date } =
      req.body;

    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new user({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      gender,
      date,
      viewedProfile: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();

    // status 201 means something is created ;D

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
