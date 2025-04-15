import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//SignUP Function
export const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Checking if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creating a new User
    const newUser = await User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

//Login Function
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Checking user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
