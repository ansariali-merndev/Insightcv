import mongoose from "mongoose";
import { handleError } from "../utils/constant.js";
import { configDotenv } from "dotenv";

configDotenv();
const uri = process.env.MONGODB_URI;

export const connectdb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already db connected");
      return;
    }
    await mongoose.connect(uri, {
      dbName: "Insight",
    });
    console.log("db connect successfully");
  } catch (error) {
    handleError(error, "Database connection error");
  }
};
