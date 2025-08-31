import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from "../models/User.js";
import { mongo } from 'mongoose';
import mongoose from 'mongoose';

export const register = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;

    const existingUser = await UserModel.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await UserModel.create({
      Username,
      Email,
      Password: hashedPassword,
    });

    return res.status(201).json({ msg: 'User Registered Successfully' });

  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ msg: 'Error processing the request' });
  }
};

export const signin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials (email)' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials (password)' });
    }

    const token = jwt.sign(
      { id: user._id, admin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        Username: user.Username,
        Email: user.Email,
        isAdmin: user.isAdmin,
      }
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ msg: 'Error processing the request' });
  }
};

