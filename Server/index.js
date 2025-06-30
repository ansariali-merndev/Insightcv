import { configDotenv } from "dotenv";
import express from "express";
import { connectdb } from "./config/db.js";
import { authRouter } from "./router/auth.router.js";
import cookieParser from "cookie-parser";

configDotenv();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);

connectdb().then(() => {
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
});
