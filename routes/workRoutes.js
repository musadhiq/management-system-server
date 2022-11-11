import Express from "express";

import {
  createWork,
  deleteWork,
  getWorks,
  updateStatus,
  updateWork,
} from "../controllers/work/manageWork.js";

const workRouter = Express.Router();

workRouter.get("/", getWorks);
workRouter.post("/create", createWork);
workRouter.patch("/update/:id", updateWork);
workRouter.delete("/delete/:id", deleteWork);
workRouter.patch("/updateStatus/:id", updateStatus);

export default workRouter;
