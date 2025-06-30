import jwt from "jsonwebtoken";
import { handleError } from "./constant.js";

const secretKey = process.env.JWT_SECRET;
export const createJwtToken = (username, id) => {
  try {
    return jwt.sign({ username, id }, secretKey, {
      expiresIn: "7d",
    });
  } catch (error) {
    handleError(error, "Creating jwt token error");
  }
};

export const verifyJwtToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    handleError(error, "Jwt token verify error");
  }
};
