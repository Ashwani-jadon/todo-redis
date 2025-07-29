import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required and password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use. Try another one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // ✅ Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    //  store session in redis add
    // add this functionaliry later
    // await redis.setex(`session:${newUser._id}`, 7 * 24 * 60 * 60, JSON.stringify({
    //     id: newUser._id,
    //     fullName: newUser.fullName,
    //     email: newUser.email,
    // }));

    // ✅ Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: "Signup completed",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    // // 5. Store session in Redis for faster future access
    // await client.set(
    //     `session:${user._id}`,
    //     JSON.stringify({ _id: user._id, email: user.email, fullName: user.fullName }),
    //     "EX",
    //     7 * 24 * 60 * 60 // TTL = 7 days
    // );

    // 6. Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 7. Success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(201)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "logout succesfully",
      });
  } catch (error) {
    console.log(error);
  }
};

