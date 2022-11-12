import mongoose from "mongoose";
import teamData from "../../Models/teamModels.js";
import { splitWork, workData } from "../../Models/workModels.js";

export const createSplit = async (req, res) => {
  const { description, workid, teamid } = req.body;

  try {
    const work = await workData.findById(workid);
    const team = await teamData.findById(teamid);
    if (!work || !team)
      return res
        .status(404)
        .json({ message: "Something Went wrong please try again later" });
    const newWork = await splitWork.create({
      description,
      workid,
      teamid,
      workName: work.workName,
    });
    await newWork.save();
    res.status(200).json(newWork);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateSplitStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: "Something Went wrong please try again later" });

    await splitWork.updateOne(
      { _id: id },
      {
        $set: {
          status,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const assignToMember = async (req, res) => {
  const { sid } = req.params;
  const { memid } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(sid))
      return res.status(400).send("Something went wrong try again");
    await splitWork.updateOne(
      { _id: sid },
      {
        $set: {
          assignedTo: memid,
        },
      }
    );
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
  }
};
