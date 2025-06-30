import { handleError } from "./constant.js";
import bcrypt from "bcrypt";

export const hashBcrypt = async (password) => {
  try {
    const saltRound = 10;
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    handleError(error, "Bcrypt hashing error");
  }
};

export const compareBcrypt = async (password, hashedPass) => {
  try {
    return await bcrypt.compare(password, hashedPass);
  } catch (error) {
    handleError(error, "Bcrypt comparing error");
  }
};
