import User from "../models/user.model.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const isAdmin = user.role;

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized - Admins only" });
    }

    next();
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
