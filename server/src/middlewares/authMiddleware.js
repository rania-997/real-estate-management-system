import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    !req.headers.authorization ||
    req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = currentUser;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
