import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill up All the required fields",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists. Please Log In to Continue.",
      });
    }

    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        success: false,
        error:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("Admin Created:", admin);

    return res.status(201).json({
      success: true,
      admin,
      message: "Admin Registered Successfully !",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Admin cannot be Registered. Please try again.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please fill up all the required fields.",
        success: false,
      });
    }

    // Check admin existence
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //Match Password and Generate JWT Token
    if (await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      admin.password = undefined;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        admin,
        message: `Admin Logged in successfully!`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Admin cannot be logged in. Please try again.",
    });
  }
};
