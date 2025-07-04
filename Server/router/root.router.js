import { Router } from "express";
import {
  fileUploader,
  razorpayOrder,
  razorpayVerify,
} from "../controller/root.controller.js";
import multer from "multer";

export const rootRouter = Router();

const store = multer.memoryStorage();
const upload = multer({ storage: store });

rootRouter.post("/razorpay-order", razorpayOrder);
rootRouter.post("/verifyOrder", razorpayVerify);
rootRouter.post("/uploader", upload.single("file"), fileUploader);
