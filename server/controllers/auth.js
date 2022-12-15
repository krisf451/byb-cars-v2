import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

import User from "../models/user.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User with that email already exists");
  }

  const user = await User.create({
    fullName: `${firstName} ${lastName}`,
    email,
    password: bcrypt.hashSync(password, 10),
    favoriteCars: [],
  });

  const token = jwt.sign({ id: user._id, email: user.email, fullName: user.fullName, favorites: user.favoriteCars }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: { _id: user._id, fullName: user.fullName, email: user.email, favorites: [], token },
    });
  }
});

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser === null) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Invalid Credentials, Passwords do not match");
  }

  const token = jwt.sign({ id: existingUser._id, email: existingUser.email, fullName: existingUser.fullName }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  if (existingUser) {
    const stringIds = existingUser.favoriteCars.map((id) => id.toString());
    res.status(201).json({
      success: true,
      data: { _id: existingUser._id, fullName: existingUser.fullName, email: existingUser.email, favorites: stringIds, token },
    });
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({
    success: true,
    data: users,
  });
});
