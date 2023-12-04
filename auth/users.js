import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById(id);
    res.status(200).json(userFound);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, username, firstName, lastName, gender, date, pictureName }) => {
        return {
          _id,
          username,
          firstName,
          lastName,
          gender,
          date,
          pictureName,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, username, firstName, lastName, gender, date, picturePath }) => {
        return {
          _id,
          username,
          firstName,
          lastName,
          gender,
          date,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let updatedData = req.body;
    const id = req.params.id;
    const user = await User.findById(id);

    if (updatedData.password) {
      const salt = await bcrypt.genSalt();
      let newPassword = await bcrypt.hash(updatedData.password, salt);
      updatedData.password = newPassword;
    }

    if (updatedData.key && updatedData.key === "1234") {
      console.log(user.role);
      updatedData.role = !user.role;
      console.log(user.role);
    } else if (updatedData.key) {
      res.status(500).json({ error: "incorrect secret key" });
      return;
    }

    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedData, options);

    res.json({ message: "User updated successfully", result });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
