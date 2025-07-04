import { InsightDB } from "../model/insight.model.js";
import { handleError } from "./constant.js";
import { verifyJwtToken } from "./jwt.js";

export const insightLimit = async (token) => {
  try {
    const decodedToken = verifyJwtToken(token);
    const { id, username } = decodedToken;
    console.log("Decoded Token: ", decodedToken);

    const user = await InsightDB.findOne({ userId: id });
    console.log("User: ", user);

    if (user) {
      return user.limit >= 1 ? false : true;
    }

    const createdUser = await InsightDB.create({
      userId: id,
      username,
    });

    console.log("Created user: ", createdUser);

    return true;
  } catch (error) {
    handleError(error, "Insight cv check limit error");
  }
};

export const decrementLimit = async (token) => {
  const decodedToken = verifyJwtToken(token);
  try {
    const user = await InsightDB.findOne({ userId: decodedToken.id });
    user.limit -= 1;
    user.save();
  } catch (error) {
    handleError(error, "decrementLimit error");
  }
};
