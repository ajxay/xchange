import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createChatUser from "../helpers/createChatUser.js";
import loginChatUser from "../helpers/LoginChatUser.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "user doesnt exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentialst" });

    loginChatUser(existingUser);
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  console.log("reached");
  const { email, password, confirmPassword, firstName, lastName, location } =
    req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: " User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesnt match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username: `${firstName}${lastName}`,
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      location,
    });
    createChatUser(result);
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No User with that id");
  const updatedUser = await User.findByIdAndUpdate(_id, user, {
    new: true,
  });
  res.json(updatedUser);
};
