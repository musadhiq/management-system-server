import Express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers/user/user.js";

const userRouter = Express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/new", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.patch("/update/:id", updateUser);

export default userRouter;
