import { UserDB } from "../model/auth.model.js";
import { handleError } from "../utils/constant.js";

export const searchUser = async (username) => {
  try {
    const user = await UserDB.findOne({ username });
    return user;
  } catch (error) {
    handleError(error, "Searching user in db Error: ");
  }
};

export const createUser = async ({ username, image, password }) => {
  try {
    return await UserDB.create({
      username,
      image,
      password,
    });
  } catch (error) {
    handleError(error, "user creating error");
  }
};
