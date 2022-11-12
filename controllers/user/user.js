import userData from "../../Models/userModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    address,
    password,
    type,
    pin,
    post,
    place,
    phone,
  } = req.body;
  try {
    const existingUser = await userData.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registerd " });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await userData.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      address: {
        place,
        pin,
        post,
      },
      username: `${firstname}${lastname}`,
      phone,
      type,
    });
    await result.save();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await userData.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userData.findById(id);
    res.status(200).json({
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profileImg: user.profileImg,
      gender: user.gender,
      type: user.type,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { firstname, lastname, email, password, address, phone } = req.body;
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: "Something Went wrong please try again later" });

    const user = userData.findById(id);
    // update password
    if (password) var hashPassword = await bcrypt.hash(password, 12);

    // update email
    const existingUser = await userData.findOne({ email });
    if (existingUser)
      if (existingUser._id !== id)
        return res.status(400).json({ message: "Email already registered!!!" });

    await user.updateOne(
      { _id: id },
      {
        $set: {
          firstname,
          lastname,
          email,
          phone,
          password: hashPassword,
          address,
          username: `${firstname}${lastname}`,
        },
      },
      { new: true }
    );
    const result = await userData.findById(id);

    res.status(200).json({
      username: result.username,
      email: result.email,
      phone: result.phone,
      address: result.address,
      profileImg: result.profileImg,
      gender: result.gender,
      type: result.type,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userData.findOne({ email });

    if (!user) return res.status(404).json({ message: "Invalid Email" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect Password!!" });

    res.status(200).json({ result: user });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userData.findByIdAndDelete(id);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
