import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: String,
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const teamData = mongoose.model("Team", teamSchema);
export default teamData;
