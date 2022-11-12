import Express from "express";
import {
  assignToMember,
  createSplit,
  updateSplitStatus,
} from "../controllers/work/assignWork.js";

import {
  assignToTeam,
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
workRouter.patch("/assigntoteam/:id", assignToTeam);
workRouter.post("/splitwork", createSplit);
workRouter.patch("/updateSplitStatus/:id", updateSplitStatus);
workRouter.patch("/assigntomember/:sid", assignToMember);
export default workRouter;
