import teamData from "../../Models/teamModels.js";

export const getTeams = async (req, res) => {
  try {
    const teams = await teamData.find();
    res.status(200).json({ teams });
  } catch (error) {
    console.log(error);
  }
};

export const createTeam = async (req, res) => {
  const { teamName, leader, members } = req.body;
  try {
    const team = await teamData.create({
      teamName,
      leader,
      members,
    });
    await team.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

export const addMember = async (req, res) => {
  const { teamid, memid } = req.body;
  try {
    await teamData.updateOne(
      { _id: teamid },
      {
        $push: { members: memid },
      }
    );
    res.status(200).json({ message: "added" });
  } catch (error) {
    console.log(error);
  }
};
