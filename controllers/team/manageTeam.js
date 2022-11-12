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
    const isInTeam = await teamData.find({ members: memid });
    console.log(isInTeam);
    if (isInTeam.length > 0)
      return res.status(200).json({ message: "Member already in a team" });
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
export const removeMember = async (req, res) => {
  const { teamid, memid } = req.body;
  try {
    await teamData.updateOne(
      { _id: teamid },
      {
        $pull: { members: memid },
      }
    );
    res.status(200).json({ message: "removed" });
  } catch (error) {
    console.log(error);
  }
};
