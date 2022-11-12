import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  address: {
    place: String,
    post: String,
    pin: String,
  },
  gender: String,
  password: {
    type: String,
    required: true,
  },
  profileImg: String,
  type: {
    type: String,
    required: true,
  },
});

const userData = mongoose.model("User", userSchema);

export default userData;
