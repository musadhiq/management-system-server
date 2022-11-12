import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    workName: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      default: "pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  {
    timestamps: true,
  }
);
export const workData = mongoose.model("Work", workSchema);

// team
const splitWorkSchema = new mongoose.Schema(
  {
    workid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Work",
    },
    teamid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    workName: {
      type: String,
    },
    description: String,
    status: {
      type: String,
      default: "pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const splitWork = mongoose.model("SplitWork", splitWorkSchema);
