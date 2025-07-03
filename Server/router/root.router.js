import { Router } from "express";
import {
  razorpayOrder,
  razorpayVerify,
} from "../controller/root.controller.js";

export const rootRouter = Router();

rootRouter.post("/razorpay-order", razorpayOrder);
rootRouter.post("/verifyOrder", razorpayVerify);
