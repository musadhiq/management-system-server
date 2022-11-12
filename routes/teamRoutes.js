import Express from "express";
import {
  addMember,
  createTeam,
  getTeams,
  removeMember,
} from "../controllers/team/manageTeam.js";

const teamRoutes = Express.Router();

teamRoutes.get("/", getTeams);
teamRoutes.post("/create", createTeam);
teamRoutes.patch("/addmember", addMember);
teamRoutes.patch("/removemember", removeMember);
export default teamRoutes;
