import mongoose from "mongoose";

import { workData } from "../../Models/workModels.js";

export const getWorks = async (req, res) => {
  try {
    const works = await workData.find();
    res.send(works);
  } catch (error) {
    console.log(error);
  }
};

export const createWork = async (req, res) => {
  const { workName, description } = req.body;
  try {
    const works = await workData.create({
      workName,
      description,
    });
    await works.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

export const updateWork = async (req, res) => {
  const { id } = req.params;
  const { workName, description, status, assignedTo } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: "Something Went wrong please try again later" });

    await workData.updateOne(
      { _id: id },
      {
        $set: {
          workName: workName,
          description: description,
          status,
          assignedTo,
        },
      },
      { new: true }
    );

    const updatedWork = await workData.findById(id);
    res.status(200).json({ updatedWork });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send("Something went wrong try again");

    await workData.updateOne(
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

export const deleteWork = async (req, res) => {
  const { id } = req.params;
  try {
    await workData.findByIdAndDelete(id);
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
  }
};
