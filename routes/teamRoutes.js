import Express from "express";
import {
  addMember,
  createTeam,
  getTeams,
} from "../controllers/team/manageTeam.js";

const teamRoutes = Express.Router();

teamRoutes.get("/", getTeams);
teamRoutes.post("/create", createTeam);
teamRoutes.patch("/addmember", addMember);
export default teamRoutes;
