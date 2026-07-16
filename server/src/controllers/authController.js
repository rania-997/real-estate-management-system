import User from "../models/userModel";
import generateToken from "../utils/generateToken";

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({
      message: "user registered",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "failed to register" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await existedUser.comparePassword(password);
    if (isMatch) {
      res.status(200).json({
        message: "user login",
        token: generateToken(existedUser._id),
        user: {
          id: existedUser._id,
          name: existedUser.name,
          email: existedUser.email,
          role: existedUser.role,
        },
      });
    } else {
      return res.staus(401).res.json({ message: "wrong email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "login failed" });
  }
};
