import { Router } from "express";
import {
  authGoogle,
  authHome,
  authLogin,
  authLogout,
  authRegister,
  authVerify,
} from "../controller/auth.controller.js";

export const authRouter = Router();

authRouter.get("/", authHome);
authRouter.post("/register", authRegister);
authRouter.post("/login", authLogin);
authRouter.get("/logout", authLogout);
authRouter.get("/verify", authVerify);
authRouter.post("/google", authGoogle);
