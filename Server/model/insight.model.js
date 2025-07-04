import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 1,
  },
});

export const InsightDB =
  mongoose.models.Insight || mongoose.model("Insight", insightSchema);
